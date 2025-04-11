import { SQSClient, SendMessageCommand, SendMessageBatchCommand } from "@aws-sdk/client-sqs";
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
            const bunches = await service.getUsersBunch(request.alias);
            const sqsClient = new SQSClient();

            for (const batch of bunches) {
                const command = new SendMessageBatchCommand({
                    QueueUrl: FEEDQUEUE,
                    Entries: batch.map((group, index) => ({
                        Id: `msg-${index}`,
                        MessageBody: JSON.stringify(group)
                    }))
                });
                await sqsClient.send(command);
            }
        });
    }catch(error){
        console.error("Error processing SQS message:", error);
    }
}