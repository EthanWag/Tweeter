import {
    DeleteCommand,
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

import { AuthDAO } from '../../DAOInterfaces/AuthDAO';
import { User } from "tweeter-shared";


export class AuthDAODynamoDB implements AuthDAO {

    private readonly tableName = "Followers";
    private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    public async createAuth(token: string, alias: string): Promise<void> {
        try {
            await this.client.send(
                new PutCommand({
                    TableName: this.tableName,
                    Item: {
                        token: token,
                        alias: alias
                    }
                })
            );
        } catch (error) {
            throw error;
        }
    }
    public async deleteAuth(token: string): Promise<void> {
        try {
            await this.client.send(
                new DeleteCommand({
                    TableName: this.tableName,
                    Key: {
                        token: token
                    }
                })
            );
        } catch (error) {
            throw error;
        }
    }
    public async getAlias(token: string): Promise<string> {
        try {
            const res = await this.client.send(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        token: token
                    }
                })
            );
            if(res.Item === undefined){
                throw new Error("Token does not exist");
            }
            return res.Item.alias; // maybe the right syntax, but honestly I'm not that sure
        } catch (error) {
            throw error;
        }
    }
    doesExists(alias: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    errorMessage(warning: string, error: string): string {
        throw new Error("Method not implemented.");
    }
}