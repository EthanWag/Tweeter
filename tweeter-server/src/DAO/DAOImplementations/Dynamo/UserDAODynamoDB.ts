import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutObjectCommand, S3Client, ObjectCannedACL } from '@aws-sdk/client-s3';

import { UserDAO } from '../../DAOInterfaces/UserDAO';
import { User } from "tweeter-shared";

import { BUCKET, REGION } from ".env";

export class UserDAODynamoDB implements UserDAO {

    private readonly tableName = "User"; // maybe pull that one out
    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    public async getUser(alias: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async createUser(alias: string, firstName: string, lastName: string, encryptedPassword: string, userImageBytesString: string, imageExtention: string): Promise<User> {

        try{
          await this.doesExsist(alias); // will throw an error if a user is already registered

          // here we need to be able to store and create the image link
          const filename = this.generateFileName(alias, imageExtention);
          const userImageLink = await this.putImage(filename, userImageBytesString);

          const user = new User(firstName, lastName, alias, userImageLink);

          await this.client.send(
            new PutCommand({
                TableName: this.tableName,
                Item: {
                    alias: user.alias,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userImage: user.imageUrl,
                    password: encryptedPassword
                }
            })
          );
          // returns the user if everything went well
          return user;
        }catch(error:any){
            throw this.errorMessage("create user", (error as Error).message);
        }
    }


    public async getPassword(alias: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    // just makes a name for the user, nothing to crazy
    private generateFileName(alias: string, imageExtention: string): string {
        return alias + "-profile-picture." + imageExtention;
    }

    public async doesExsist(alias: string): Promise<void> {
      try {
          const result = await this.client.send(
              new GetCommand({
                  TableName: this.tableName,
                  Key: {
                      alias: alias
                  }
              })
          );
          const check = result.Item !== undefined;

          if (check) {
              throw new Error("User already exists");
          }

      } catch (error) {
          throw error;
      }
    }

    public errorMessage(warning:string, error: string): string {
      return `Failed to ${warning} with error: ${error}`;
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
          Bucket: BUCKET,
          Key: "image/" + fileName,
          Body: decodedImageBuffer,
          ContentType: "image/png",
          ACL: ObjectCannedACL.public_read,
        };
        const c = new PutObjectCommand(s3Params);
        const client = new S3Client({ region: REGION });
        try {
          await client.send(c);
          return (
          `https://${BUCKET}.s3.${REGION}.amazonaws.com/image/${fileName}`
          );
        } catch (error) {
          throw Error("s3 put image failed with: " + error);
        }
      }
}