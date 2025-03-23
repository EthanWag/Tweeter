import { IsFollowRequest, IsValidResponse, User, isNull, SetIsFollowerRequest } from 'tweeter-shared';
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request: SetIsFollowerRequest): Promise<IsValidResponse> => {

    if(isNull(request.user) || isNull(request.selectedUser)){
        return {
            success: false,
            message: "both users must be provided",
            valid: false
        }
    }

    const followService = new FollowService();
    const valid = await followService.getIsFollowerStatus(request.token, User.fromDto(request.user)!, User.fromDto(request.selectedUser!)!);

    return {
        success: true,
        message: null,
        valid: valid
    }
}