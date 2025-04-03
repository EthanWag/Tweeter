import {
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Command } from "@smithy/smithy-client";

export abstract class DynamoResources {
    protected readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    protected async dbClientOperation(
        params: Command<any, any, any, any>,
        location: string
    ){
        try{
            return await this.client.send(
                params
            )
        }catch(error:any){
            throw this.errorMessage(location, (error as Error).message);
        }
    }

    // TODO: possible QOL imporvements
    // maybe make a count function because that logic is all the same

    // also maybe make a preflight function that checks if the item exists

    // another function could be a an is authorized function that checks if the user is authorized to do the action

    // this needs to be implemented by the DAO class
    public errorMessage(warning:string, error: string): string {
        return `Failed to ${warning} with error: ${error}`;
    }

}