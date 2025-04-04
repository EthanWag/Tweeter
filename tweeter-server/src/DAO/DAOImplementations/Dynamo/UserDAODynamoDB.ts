import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { DynamoResources } from "./DynamoResources";
import { UserDAO } from '../../DAOInterfaces/UserDAO';
import { User } from "tweeter-shared";



export class UserDAODynamoDB extends DynamoResources implements UserDAO {

    private readonly tableName = "User"; // maybe pull that one out
    private readonly REGION = "us-east-1";
    private readonly BUCKET = "tweeterbin";

    public async getUser(alias: string): Promise<User> {
        try {
            const result = await this.dbClientOperation(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        alias: alias
                    }
                }),
                "get user"
            );
            if (result.Item === undefined) {
                throw new Error(this.errorMessage("get user", "User does not exist"));
            }
            return new User(result.Item.firstName, result.Item.lastName, result.Item.alias, result.Item.userImage);
        } catch (error) {
            throw error;
        }
    }

    public async createUser(alias: string, firstName: string, lastName: string, encryptedPassword: string, userImageBytesString: string, imageExtention: string): Promise<User> {
        try{
          await this.doesExistsNot(alias); // will throw an error if a user is already registered

          // here we need to be able to store and create the image link
          const filename = this.generateFileName(alias, imageExtention);
          const userImageLink = await this.putImage(filename, userImageBytesString);

          const user = new User(firstName, lastName, alias, userImageLink);

          await this.dbClientOperation(
            new PutCommand({
                TableName: this.tableName,
                Item: {
                    alias: user.alias,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userImage: user.imageUrl,
                    password: encryptedPassword
                }
            }),
            "create user"
          );
          return user;
        }catch(error:any){
            throw error;
        }
    }

    public async getPassword(alias: string): Promise<string> {
        try {
            const result = await this.dbClientOperation(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        alias: alias
                    }
                }),
                "get password"
            );
            if (result.Item === undefined) {
                throw new Error(this.errorMessage("get password", "User does not exist"));
            }
            return result.Item.password;
        } catch (error) {
            throw error;
        }
    }

    public async doesExistsNot(alias: string): Promise<void> {
      try {
          const result = await this.dbClientOperation(
              new GetCommand({
                  TableName: this.tableName,
                  Key: {
                      alias: alias
                  }
              }),
              "check if user exists"
          )
          // if the user exists, we throw an error
          if (result.Item !== undefined) {
              throw new Error(this.errorMessage("check if user exists", "User already exists"));
          }
      } catch (error) {
          throw error;
      }
    } 

    private generateFileName(alias: string, imageExtention: string): string {
        return alias + "-profile-picture." + imageExtention;
    }

    private async putImage(
        fileName: string,
        imageStringBase64Encoded: string
    ): Promise<string> {
      let decodedImageBuffer: Buffer = Buffer.from(
        imageStringBase64Encoded,
        "base64"
      );
      const s3Params = {
        Bucket: this.BUCKET,
        Key: "image/" + fileName,
        Body: decodedImageBuffer,
        ContentType: "image/png",
      };
      const c = new PutObjectCommand(s3Params);
      const client = new S3Client({ region: this.REGION });
      try {
        await client.send(c);
        return (
        `https://${this.BUCKET}.s3.${this.REGION}.amazonaws.com/image/${fileName}`
        );
      } catch (error) {
        throw Error("s3 put image failed with: " + error);
      }
    }
}