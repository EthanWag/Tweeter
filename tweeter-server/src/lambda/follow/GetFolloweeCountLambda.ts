import { CountFollowRequest, CountResponse, User, isNull} from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request:CountFollowRequest): Promise<CountResponse> => {

    if(isNull(request.user)) {
        return {
            success: false,
            message: "invalid user",
            count: 0
        }
    }

    const followService = new FollowService();
    const numFollowees = await followService.getFolloweeCount(request.token, User.fromDto(request.user)!); // turned this off because we checked to see if it is not null

    return {
        success: true,
        message: null,
        count: numFollowees
    }
}