import { AuthToken, FakeData, Status, User } from "tweeter-shared";

export class PostsService {
  
    public async getPosts(alias:string): Promise<User | null> {
        return FakeData.instance.findUserByAlias(alias);
    }

    public async postStatus(authToken: string,newStatus: Status): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };

}