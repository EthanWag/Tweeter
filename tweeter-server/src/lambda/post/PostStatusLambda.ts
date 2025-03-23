import { PostStatusRequest, IsValidResponse, isNull, Status } from "tweeter-shared";
import { PostsService } from "../../model/service/PostService";

export const handler = async (request: PostStatusRequest): Promise<IsValidResponse> => {

    if (isNull(request.user)){
        return {
            success: false,
            message: "User is null",
            valid: false
        }
    }

    const postService = new PostsService(); 
    await postService.postStatus(request.token, Status.fromDto(request.user)!);

    return {
        success: true,
        message: null,
        valid: true

    }
}