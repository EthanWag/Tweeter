import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { DynamoResources } from "./DynamoResources";
import { FolloweesDAO } from "../../DAOInterfaces/FolloweesDAO";


export class FolloweesDAODynamoDB extends DynamoResources implements FolloweesDAO {

    private readonly tableName = "Followees";

    getFolloweesCount(alias: string): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getFolloweesPaged(alias: string, lastAlias: string | null, pageNumber: number): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
    public async addFollowee(alias: string, followeeAlias: string): Promise<void> {
        try {

            // maybe add some error checking here to take care of edge cases
            await this.dbClientOperation(
                new PutCommand({
                    TableName: this.tableName,
                    Item: {
                        alias: alias,
                        followeeAlias: followeeAlias
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
    isFollowee(alias: string, followeeAlias: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}