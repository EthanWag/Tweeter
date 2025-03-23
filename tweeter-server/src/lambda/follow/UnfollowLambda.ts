import { FollowRequest, FollowResponse, User, isNull } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request:FollowRequest): Promise<FollowResponse> => {

    if(isNull(request.user)) { // we check it here
        return {
            success: false,
            message: "invalid user",
            followerCount: -1,
            followeeCount: -1
        }
    }

    const followService = new FollowService();
    const [followers,followees] = await followService.unfollow(request.token, User.fromDto(request.user)!);

    return {
        success: true,
        message: null,
        followerCount: followers,
        followeeCount: followees
    }
}