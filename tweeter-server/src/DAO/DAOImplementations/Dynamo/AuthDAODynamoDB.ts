import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoResources } from "./DynamoResources";

import { AuthDAO } from '../../DAOInterfaces/AuthDAO';
import { AuthToken } from "tweeter-shared";
import { v4 as uuidv4 } from "uuid";

export class AuthDAODynamoDB extends DynamoResources implements AuthDAO {

    private readonly tableName = "Session";

    public async createAuth(alias: string): Promise<AuthToken> {
        try {
            // maybe check to see if they are already authenticated?

            const now = Math.floor(Date.now()/1000);
            const ttl = now + (60 * 60) * 2; // 1 hour to live

            const authToken = new AuthToken(uuidv4(), now);

            await this.dbClientOperation(
                new PutCommand({
                    TableName: this.tableName,
                    Item: {
                        token: authToken.token,
                        alias: alias,
                        timestamp:authToken.timestamp,
                        expiresAt: ttl,
                    }
                }),"create Auth"
            );

            return authToken;
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
                throw new Error(this.errorMessage("get Auth", "Token does not exist"));
            }
            return new AuthToken(res.Item.token, res.Item.alias);
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
    public async isAuthorized(token: string, alias: string): Promise<boolean> {
        try {
            const check = await this.dbClientOperation(
                new GetCommand({
                    TableName: this.tableName,
                    Key: {
                        token: token
                    }
                }),"check if authorized"
            );

            // in the future if you wanted to add a is outdated function you could add it here
            return check.Item.alias === alias;

        } catch (error) {
            throw error;
        }
    }

    // another function could be a an is authorized function that checks if the user is authorized to do the action
    // have one mainstream function that checks if the user is authorized to do the action

    // possbily a does exsist function here
}