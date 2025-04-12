import {
    DeleteCommand,
    GetCommand,
    PutCommand,
    QueryCommand,
} from "@aws-sdk/lib-dynamodb";

import { Status, User, isNull } from "tweeter-shared";
import { PostDAO } from "../../DAOInterfaces/PostDAO";
import { DynamoResources } from "./DynamoResources";

export class PostDAODynamoDB extends DynamoResources implements PostDAO {


    private readonly FeedTable = "Feed";
    private readonly StoryTable = "Story";


    public async addToStory(alias: string, newStatus: Status): Promise<void> {
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
            // TODO: remove this code and put it in a seprate functiion for implementation
            /*
            // oof will take a long time
            followeeList.forEach(async (followeeAlias) => {
                await this.dbClientOperation(
                    new PutCommand({
                        TableName: this.FeedTable,
                        Item: {
                            followeeAlias: followeeAlias,
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
                    "putting post into feed"
                )
            });
            */

        }catch(error){
            throw error
        }
    }

    public async addToFeed(post: Status, alias: string, followeeAlias: string[]): Promise<void> {
        try{
            for(const followee of followeeAlias){
                await this.dbClientOperation(
                    new PutCommand({
                        TableName: this.FeedTable,
                        Item: {
                            followeeAlias: followee,
                            alias: alias,
                            timestamp: post.timestamp,
                            post: post.post,

                            // info about the user who posted the story
                            authorAlias: post.user.alias,
                            authorFirstName: post.user.firstName,
                            authorLastName: post.user.lastName,
                            authorImage: post.user.imageUrl
                        },
                    }),
                    "putting post into feed"
                )
            }
        }catch(error){
            throw error
        }
    }

    // come back around to this, It might be helpful in the future
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

    private convertItemsToStatus(userPosts:any): Status[] {

        if(isNull(userPosts)) return [];

        // convert userPosts into actual status
        const posts: Status[] = userPosts.Items.map((item:{post:string,timestamp:number,authorAlias:string,authorFirstName:string,authorLastName:string,authorImage:string}) => {
            return new Status(item.post, new User(item.authorFirstName, item.authorLastName, item.authorAlias, item.authorImage), item.timestamp);
        });
        return posts;
    }
}