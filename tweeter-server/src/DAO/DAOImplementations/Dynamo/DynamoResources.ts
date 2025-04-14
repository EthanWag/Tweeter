import {
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Command } from "@smithy/smithy-client";

// for the followers and followees tables
export abstract class DynamoResources {
    protected readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

    protected async dbClientOperation<T extends Command<any,any,any,any>>(
        params: T,//Command<any, any, any, any>,
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

    public errorMessage(warning:string, error: string): string {
        return `Failed to ${warning} with error: ${error}`;
    }

}