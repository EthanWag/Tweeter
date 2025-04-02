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
        
    }

    public async removeFollower(alias: string, followerAlias: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    doesExsist(alias: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    errorMessage(warning: string, error: string): string {
        throw new Error("Method not implemented.");
    }
}