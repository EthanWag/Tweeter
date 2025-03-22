import { GetUserRequest, GetUserResponse, isNull } from "tweeter-shared";
import { PostsService } from "../../model/service/PostService";

export const handler = async (request: GetUserRequest): Promise<GetUserResponse> => {

    const postService = new PostsService(); 
    const user = await postService.getPosts(request.alias);

    const validUser = !isNull(user);
    const message = validUser ? null : "User not found";
    const myUser = validUser ? {
        firstname: user!.firstName,
        lastname: user!.lastName,
        alias: user!.alias,
        imageUrl: user!.imageUrl
    } : null;


    return {
        success: true,
        message: message,
        user: myUser,
        found: validUser
    }
}