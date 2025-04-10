import { StatusService } from "../../model/service/StatusService";
import { PostRequest } from 'tweeter-shared';

// 1. Import necessary modules
export const handler = async (event:any) => {

    try {
        event.Records.forEach(async(record:any) => {
            const request:PostRequest = JSON.parse(record.body);

            const service = new StatusService();

            // 2. Make a feed service object and call the associated method
            const followers = await service.getUsersBunch(request.alias);

            followers.forEach((bunch) => {
                // 6. put bunch inside the queue the bunches of UpdateFeedRequests
            });
        });
    }catch(error){
        console.error("Error processing SQS message:", error);
    }
}