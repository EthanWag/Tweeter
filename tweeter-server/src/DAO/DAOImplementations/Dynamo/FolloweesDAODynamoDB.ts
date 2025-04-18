import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoResources } from "./DynamoResources";
import { FolloweesDAO } from "../../DAOInterfaces/FolloweesDAO";

export class FolloweesDAODynamoDB extends DynamoResources implements FolloweesDAO {
    private readonly tableName = "Followees";

    public async getFolloweesCount(alias: string): Promise<number> {
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
                "get followees count"
            )

            // returns how many items their are
            return count.Count ?? 0;

        }catch(error){
            throw error;
        }  
    }
    public async getFolloweesPaged(alias: string, lastAlias: string | null, pageNumber?: number): Promise<string[]> {
        try {
            const result = await this.dbClientOperation(
                new QueryCommand({
                    TableName: this.tableName,
                    KeyConditionExpression: "alias = :alias",
                    ExpressionAttributeValues: {
                        ":alias": alias
                    },
                    Limit: pageNumber,
                    ExclusiveStartKey: lastAlias ? { alias, followeeAlias: lastAlias } : undefined
                }),
                "get followees paged"
            )

            const pagedItems:{alias:string,followeeAlias:string,isFollowee:boolean}[] = result.Items

            return pagedItems.map((item) => item.followeeAlias) ?? [];
        }catch(error){
            throw error;
        }
    }
    public async addFollowee(alias: string, followeeAlias: string): Promise<void> {
        try {

            // maybe add some error checking here to take care of edge cases
            await this.dbClientOperation(
                new PutCommand({
                    TableName: this.tableName,
                    Item: {
                        alias: alias,
                        followeeAlias: followeeAlias,
                        isFollowee: true
                    }
                }),
                "add followee"
            )
        }catch(error){
            throw error;
        }
    }
    public async removeFollowee(alias: string, followeeAlias: string): Promise<void> {
        await this.dbClientOperation(
            new DeleteCommand({
                TableName: this.tableName,
                Key: {
                    alias: alias,
                    followeeAlias: followeeAlias
                }
            }),
            "remove followee"
        )
    }
    public async isFollowee(alias: string, followeeAlias: string): Promise<boolean> {
        const check = await this.dbClientOperation(
            new GetCommand({
                TableName: this.tableName,
                Key: {
                    alias: alias,
                    followeeAlias: followeeAlias
                }
            }),
            "is followee"
        )
        return check.Item !== undefined;
    }
}