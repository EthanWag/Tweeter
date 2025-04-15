import { Status, User, AuthToken } from "tweeter-shared";
import { ServerFacade } from "../ServerFacade";

export class PostsService {
  
    public async getPosts(alias:string): Promise<User | null> {
        const facade = new ServerFacade();
        const res = await facade.GetUser({alias});

        // you can put extra logic here if you want to if it can't be found, you have a [1] in the return
        return res[0];
    }

    public async postStatus(authToken: AuthToken,newStatus: Status): Promise<void> {    
        const facade = new ServerFacade();
        const res = await facade.postStatus({token: authToken.token,user: newStatus.dto});
        
        // optional, you don't need to return res, it just tells you you succesfully posted
        return;
      };
}