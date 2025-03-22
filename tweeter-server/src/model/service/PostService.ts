import { FakeData, User } from "tweeter-shared";

export class PostsService {
  
    public async getPosts(alias:string): Promise<User | null> {
        return FakeData.instance.findUserByAlias(alias);
    }

}