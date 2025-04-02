import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { FollowersDAO } from '../../DAOInterfaces/FollowersDAO';
import { User } from "tweeter-shared";



export class FollowersDAODynamoDB implements FollowersDAO {

    private readonly tableName = "Followers";
    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    public async getFollowersCount(alias: string): Promise<number> {
        throw new Error('Method not implemented.');
    }

    public async getFollowersPaged(alias: string, lastAlias: string | null, pageNumber: number): Promise<string[]> {
        throw new Error('Method not implemented.');
    }

    public async addFollower(alias: string, followerAlias: string): Promise<void> {
        
        // This does not make any sense, it just means they don't follow anyone
        // await this.doesExists(alias);

        await this.client.send(
            new PutCommand({
                TableName: this.tableName,
                Item: {
                    alias: alias,
                    followerAlias: followerAlias
                }
            })
          );
    }

    public async removeFollower(alias: string, followerAlias: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async doesExists(alias: string): Promise<void> {
        try {
            const result = await this.client.send(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        alias: alias
                    }
                })
            );
            if (result.Item === undefined) {
                throw new Error("User does not exist");
            }
        } catch (error) {
            throw error;
        }
    }
    errorMessage(warning: string, error: string): string {
        throw new Error("Method not implemented.");
    }
}