import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

import { PostStatusRequest, IsValidResponse, isNull, Status } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

const POSTQUEUE = 'https://sqs.us-east-1.amazonaws.com/324037310840/TweeterPostQueue'

export const handler = async (request: PostStatusRequest): Promise<IsValidResponse> => {

    if (isNull(request.user)){
        return {
            success: false,
            message: "User is null",
            valid: false
        }
    }

    const postService = new StatusService(); 
    await postService.addToStory(request.token, Status.fromDto(request.user)!);

    // 1. Create an SQS client
    const sqsClient = new SQSClient();

    const params = {
        QueueUrl: POSTQUEUE,
        MessageBody: JSON.stringify({
                alias: request.user.user.alias,
                post: request.user
            }),
    };

    await sqsClient.send(new SendMessageCommand(params));

    return {
        success: true,
        message: null,
        valid: true
    }
}