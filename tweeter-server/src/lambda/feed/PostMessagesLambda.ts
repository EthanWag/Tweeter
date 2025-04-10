import { StatusService } from "../../model/service/StatusService";
import { PostRequest } from '../../../../tweeter-shared/dist/model/net/request/PostRequest';

// 1. Import necessary modules
export const handler = async (request:PostRequest) => {

    const service = new StatusService();

    // 2. Make a feed service object and call the associated method
    const followers = await service.getUsersBunch(request.alias);

    followers.forEach((bunch) => {

        // 6. put bunch inside the queue the bunches of UpdateFeedRequests

    });
    

}