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

export class UserDAODynamoDB implements UserDAO {

    private readonly tableName = "User"; // maybe pull that one out
    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());


    public async getUser(alias: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    public async createUser(alias: string, firstName: string, lastName: string, encryptedPassword: string, userImageBytesString: string, imageExtention: string): Promise<User> {

        // generate a file name here???? huhh 

        try{
          await this.client.send(
            new PutCommand({
                TableName: this.tableName,
                Item: {
                    alias: alias,
                    firstName: firstName,
                    lastName: lastName,
                    password: encryptedPassword,
                    // userImage: await this.putImage(this.generateFileName(alias, imageExtention), userImageBytesString)
                }
            })
          );
          // userImage: await this.putImage(this.generateFileName(alias, imageExtention), userImageBytesString)
          return new User(firstName, lastName, alias, "nutty");
        }catch(error){
            throw new Error("Failed to create user with error: " + error);
        }
    }


    public async getPassword(alias: string): Promise<string> {
        throw new Error('Method not implemented.');
    }

    // just makes a name for the user, nothing to crazy
    private generateFileName(alias: string, imageExtention: string): string {
        return alias + "." + imageExtention;
    }

    /*
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
      */
}