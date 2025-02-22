import { User } from "tweeter-shared";
import { PostsService } from "../model/service/PostService";

export class PostPresenter {

    postService : PostsService;

    constructor() {
        this.postService = new PostsService();
    }
    public getPosts(alias: string): Promise<User | null> {
        return this.postService.getPosts(alias);
    }
}