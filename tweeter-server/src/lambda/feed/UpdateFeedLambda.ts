import { FeedRequest, Status } from 'tweeter-shared';
import { StatusService } from '../../model/service/StatusService';

// 7. this lambda should recieve a list of users and a post
// type should be [User[],Status], possibly an authToken(try not to)
export const handler = async (event:any) => {

    

    try{

        event.Records.forEach(async(record:any) => {

            const request:FeedRequest = JSON.parse(record.body);

            if (!request.post) {
                throw new Error("No post provided");  
            }
        
            const service = new StatusService();
            service.addToFeed(Status.fromDto(request.post)!, request.followeesAlias);

        });

    }catch(error){
        console.error("Error processing SQS message:", error);
    }
    
    // after this, we are done because now they are posted

}