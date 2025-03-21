import { CountFollowRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowService } from "../../model/service/FollowService";

export const handler = async (request:CountFollowRequest): Promise<PagedUserItemResponse> => {

    const followService = new FollowService();
    const [items, hasMore] = await followService.getFolloweeCount(request.token, request.user);

    return {
        success: true,
        message: null,
        items: items,
        hasMore: hasMore
    }
}