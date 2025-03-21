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
    const numFollowees = await followService.getFollowerCount(request.token, User.fromDto(request.user)!);

    return {
        success: true,
        message: null,
        count: numFollowees
    }
}