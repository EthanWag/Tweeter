import { SetCountFollowRequest, User, isNull, IsValidResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request:SetCountFollowRequest): Promise<IsValidResponse> => {

    if(isNull(request.user)) {
        return {
            success: false,
            message: "invalid user",
            valid: false
        }
    }
    const followService = new FollowService();
    await followService.setFollowerCount(request.token, User.fromDto(request.user)!,request.count);

    return {
        success: true,
        message: null,
        valid: true
    }
}