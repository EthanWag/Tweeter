import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { DynamoResources } from "./DynamoResources";
import { FollowersDAO } from '../../DAOInterfaces/FollowersDAO';
import { User } from "tweeter-shared";

export class FollowersDAODynamoDB extends DynamoResources implements FollowersDAO {

    private readonly tableName = "Followers";

    public async getFollowersCount(alias: string): Promise<number> {
        throw new Error('Method not implemented.');
    }
    public async getFollowersPaged(alias: string, lastAlias: string | null, pageNumber: number): Promise<string[]> {
        throw new Error('Method not implemented.');
    }
    public async addFollower(alias: string, followersAlias: string): Promise<void> {
        try {

            // can't follow yourself
            if(alias === followersAlias){
                throw new Error(this.errorMessage("add follower", "Cannot follow yourself"));
            }

            // already follows this
            if(await this.doesFollow(alias, followersAlias)){
                return;
            }
            
            this.dbClientOperation(
                new PutCommand({
                    TableName: this.tableName,
                    Item: {
                        alias: alias,
                        followersAlias: followersAlias
                    }
                }),
                "add follower"
            );
        }catch(error){
            throw error;
        }
    }

    public async doesFollow(alias: string, followerAlias: string): Promise<boolean> {
        try {
            const result = await this.dbClientOperation(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        alias: alias,
                        followersAlias: followerAlias
                    }
                }),
                "does follow"
            );

            return result.Item !== undefined;
        }catch(error){
            throw error;
        }
    }
    public async removeFollower(alias: string, followerAlias: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}