import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { StatusService } from "../../model/service/StatusService";
import { PostRequest } from 'tweeter-shared';

const FEEDQUEUE = 'https://sqs.us-east-1.amazonaws.com/324037310840/TweeterFeedQueue'

// 1. Import necessary modules
export const handler = async (event:any) => {

    try {
        event.Records.forEach(async(record:any) => {
            const request:PostRequest = JSON.parse(record.body);

            const service = new StatusService();

            // 2. Make a feed service object and call the associated method
            const followers = await service.getUsersBunch(request.alias);

            const sqsClient = new SQSClient();

            // 6. put bunch inside the queue the bunches of UpdateFeedRequests
            followers.forEach(async(batch:string[]) => {
                await sqsClient.send(new SendMessageCommand({
                    QueueUrl: FEEDQUEUE,
                    MessageBody: JSON.stringify({
                        post: request.post,
                        followeesAlias: batch,
                    }),
                }));
            });
            // are done after this
        });
    }catch(error){
        console.error("Error processing SQS message:", error);
    }
}