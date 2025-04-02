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

import { AuthDAO } from '../../DAOInterfaces/AuthDAO';
import { AuthToken, User } from "tweeter-shared";



export class AuthDAODynamoDB extends DynamoResources implements AuthDAO {

    private readonly tableName = "Followers";

    public async createAuth(token: string, alias: string): Promise<void> {
        try {
            // maybe check to see if they are already authenticated?

            await this.dbClientOperation(
                new PutCommand({
                    TableName: this.tableName,
                    Item: {
                        token: token,
                        alias: alias,
                        timestamp: Date.now()
                    }
                }),"create Auth"
            );
        } catch (error) {
            throw error;
        }
    }
    public async getAuth(token: string): Promise<AuthToken> {
        try {
            const res = await this.dbClientOperation(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        token: token
                    }
                }),"get Auth"
            );

            if(res.Item === undefined){
                throw new Error("Token does not exist");
            }
            return new AuthToken(res.Item.token, res.Item.alias); // maybe the right syntax, but honestly I'm not that sure
        } catch (error) {
            throw error;
        }
    }
    public async deleteAuth(token: string): Promise<void> {
        try {
            await this.dbClientOperation(
                new DeleteCommand({
                    TableName: this.tableName,
                    Key: {
                        token: token
                    }
                }),"delete Auth"
            );
        } catch (error) {
            throw error;
        }
    }
    public async getAlias(token: string): Promise<string> {
        try {

            const res = await this.dbClientOperation(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        token: token
                    }
                }),"get Alias using token"
            );

            if(res.Item === undefined){
                throw new Error("Token does not exist");
            }
            return res.Item.alias; // maybe the right syntax, but honestly I'm not that sure
        } catch (error) {
            throw error;
        }
    }

    // possbily a does exsist function here
}