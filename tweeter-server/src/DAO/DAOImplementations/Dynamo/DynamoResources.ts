import {
    DynamoDBDocumentClient,
} from "@aws-sdk/lib-dynamodb";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Command } from "@smithy/smithy-client";



export class DynamoResources {
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

    // this needs to be implemented by the DAO class
    public errorMessage(warning:string, error: string): string {
        return `Failed to ${warning} with error: ${error}`;
    }

}