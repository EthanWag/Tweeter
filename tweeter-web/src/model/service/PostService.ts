import { FakeData, User } from "tweeter-shared";

export class PostsService {
  
    // does not need to be static, but because I'm lazy, I just decided to
    public static async getPosts(alias:string): Promise<User | null> {
        return FakeData.instance.findUserByAlias(alias);
    }

}