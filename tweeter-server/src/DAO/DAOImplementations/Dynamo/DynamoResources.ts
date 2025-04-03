import {
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Command } from "@smithy/smithy-client";

// for the followers and followees tables
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

    public errorMessage(warning:string, error: string): string {
        return `Failed to ${warning} with error: ${error}`;
    }

}