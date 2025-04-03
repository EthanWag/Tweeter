import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoResources } from './DynamoResources';
import { FollowersDAO } from '../../DAOInterfaces/FollowersDAO';

export class FollowersDAODynamoDB extends DynamoResources implements FollowersDAO {
    private readonly tableName = "Followers";

    public async getFollowersCount(alias: string): Promise<number> {
        // maybe make a count method
        try {
            const count = await this.dbClientOperation(
                new QueryCommand({
                    TableName: this.tableName,
                    KeyConditionExpression: "alias = :alias",
                    ExpressionAttributeValues: {
                        ":alias": alias
                    },
                    Select: "COUNT"
                }),
                "get followers count"
            )

            // returns how many items their are
            return count.Count ?? 0;

        }catch(error){
            throw error;
        }
    }
    public async getFollowersPaged(alias: string, lastAlias: string | null, pageNumber: number): Promise<string[]> {
        try {
            const result = await this.dbClientOperation(
                new QueryCommand({
                    TableName: this.tableName,
                    KeyConditionExpression: "alias = :alias",
                    ExpressionAttributeValues: {
                        ":alias": alias
                    },
                    Limit: pageNumber,
                    ExclusiveStartKey: lastAlias ? { alias, followersAlias: lastAlias } : undefined
                }),
                "get followers paged"
            )

            // typescript gotta type check...
            const pagedItems:{alias:string,followersAlias:string,isFollower:boolean}[] = result.Items

            return pagedItems.map((item) => item.followersAlias) ?? [];

        }catch(error){
            throw error;
        }

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
                        followersAlias: followersAlias,
                        isFollower: true
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

            // if the relationship hasn't been created yet,than we know it's false
            if(!result.Item) return false;

            return result.Item.isFollower
        }catch(error){
            throw error;
        }
    }
    public async setIsFollower(alias: string, followerAlias: string, isFollower: boolean): Promise<void> {
        try {
            await this.dbClientOperation(
                new UpdateCommand({
                    TableName: this.tableName,
                    Key: {
                        alias: alias,
                        followersAlias: followerAlias
                    },
                    UpdateExpression: "SET isFollower = :isFollower",
                    ExpressionAttributeValues: {
                        ":isFollower": isFollower
                    }
                }),
                "set is follower"
            )
        }catch(error){
            throw error;
        }
    }
    public async removeFollower(alias: string, followerAlias: string): Promise<void> {
        try {
            await this.dbClientOperation(
                new DeleteCommand({
                    TableName: this.tableName,
                    Key: {
                        alias: alias,
                        followersAlias: followerAlias
                    }
                }),
                "remove follower"
            )
        }catch(error){
            throw error;
        }
    }
}