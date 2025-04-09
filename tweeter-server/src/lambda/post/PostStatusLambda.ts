import { PostStatusRequest, IsValidResponse, isNull, Status } from "tweeter-shared";
import { StatusService } from "../../model/service/StatusService";

export const handler = async (request: PostStatusRequest): Promise<IsValidResponse> => {

    if (isNull(request.user)){
        return {
            success: false,
            message: "User is null",
            valid: false
        }
    }

    const postService = new StatusService(); 
    await postService.addToStory(request.token, Status.fromDto(request.user)!);

    // here you need to post to the queue
    // TODO: this is where you would call the queue 

    return {
        success: true,
        message: null,
        valid: true

    }
}