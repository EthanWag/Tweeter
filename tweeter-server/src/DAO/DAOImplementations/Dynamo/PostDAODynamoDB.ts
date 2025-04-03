import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { Status, isNull } from "tweeter-shared";
import { PostDAO } from "../../DAOInterfaces/PostDAO";
import { DynamoResources } from "./DynamoResources";

export class PostDAODynamoDB extends DynamoResources implements PostDAO {

    private readonly FeedTable = "Feed";
    private readonly StoryTable = "Story";


    public async post(alias: string, newStatus: Status,followeeList:string[]): Promise<void> {
        try{
            await this.dbClientOperation(
                new PutCommand({
                    TableName: this.StoryTable,
                    Item: {
                        alias: alias,
                        timestamp: newStatus.timestamp,
                        post: newStatus.post,

                        // info about the user who posted the story
                        authorAlias: newStatus.user.alias,
                        authorFirstName: newStatus.user.firstName,
                        authorLastName: newStatus.user.lastName,
                        authorImage: newStatus.user.imageUrl
                    },
                }),
                "putting post into story"
            )
            // now we need to add this post to every single feed of all their followers, ugh

            // oof will take a long time
            for(let i = 0; i < followeeList.length; i++){
                const followeeAlias = followeeList[i];
                await this.dbClientOperation(
                    new PutCommand({
                        TableName: this.FeedTable,
                        Item: {
                            alias: followeeAlias,
                            timestamp: newStatus.timestamp,
                            post: newStatus.post,

                            // info about the user who posted the story
                            authorAlias: newStatus.user.alias,
                            authorFirstName: newStatus.user.firstName,
                            authorLastName: newStatus.user.lastName,
                            authorImage: newStatus.user.imageUrl
                        },
                    }),
                    "putting post into feed"
                )
            }

        }catch(error){
            throw error // just rethrow it, other functions handle message spesfics
        }
    }
    getMostRecentPost(alias: string): Promise<Status> {
        throw new Error("Method not implemented.");
    }
    public async getStoryPaged(alias: string, lastPost: Status | null, pageNumber: number): Promise<Status[]> {
        try{
            const userPosts = await this.dbClientOperation(
                new QueryCommand({
                    TableName: this.StoryTable,
                    KeyConditionExpression: "alias = :alias",
                    ExpressionAttributeValues: {
                        ":alias": alias,
                    },
                    Limit: pageNumber,
                    ExclusiveStartKey: lastPost ? { alias, timestamp: lastPost.timestamp } : undefined,
                }),
                "getting story"
            )

            return this.convertItemsToStatus(userPosts);

        }catch(error){
            throw error
        }
    }
    public async getFeedPaged(alias: string, lastPost: Status | null, pageNumber: number): Promise<Status[]> {

        const followeeAlias = alias;
        
        const userFeed = await this.dbClientOperation(
            new QueryCommand({
                TableName: this.FeedTable,
                KeyConditionExpression: "followeeAlias = :followeeAlias",
                ExpressionAttributeValues: {
                    ":followeeAlias": followeeAlias,
                },
                Limit: pageNumber,
                ExclusiveStartKey: lastPost ? { followeeAlias, alias:lastPost.user.alias } : undefined,
            }),
            "getting feed"
        )

        return this.convertItemsToStatus(userFeed);
    }

    // kinda spotty code because we are using any, so be sure to check to make sure this works properly...
    private convertItemsToStatus(userPosts:any): Status[] {

        if(isNull(userPosts)) return [];

        // convert userPosts into actual status
        const posts: Status[] = userPosts.Items.map((item:{post:string,timestamp:number,authorAlias:string,authorFirstName:string,authorLastName:string,authorImage:string}) => ({
            post: item.post,
            timestamp: item.timestamp,
            user: {
                alias: item.authorAlias,
                firstName: item.authorFirstName,
                lastName: item.authorLastName,
                imageUrl: item.authorImage,
            },
        })) as Status[];

        return posts;
    }
    
}