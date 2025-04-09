import { Status, User } from "tweeter-shared";
import { UserDAO } from "../../DAO/DAOInterfaces/UserDAO";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";
import { PostDAO } from "../../DAO/DAOInterfaces/PostDAO";
import { DAOProvider } from "../../DAO/DAOProvider";
import { FolloweesDAO } from "../../DAO/DAOInterfaces/FolloweesDAO";

export class PostsService {

    private readonly followeeDAO: FolloweesDAO;
    private readonly userDAO: UserDAO;
    private readonly authDAO: AuthDAO;
    private readonly postDAO: PostDAO;

    constructor(){
        const factory = new DAOProvider();
        this.followeeDAO = factory.makeFolloweesDAO();
        this.userDAO = factory.makeUserDAO();
        this.authDAO = factory.makeAuthDAO();
        this.postDAO = factory.makePostDAO();
    }
  
    public async getPosts(alias:string): Promise<User | null> {
        try{
            return await this.userDAO.getUser(alias);
        }catch(e){
            // could not find the user
            return null;
        }
        
    }

    public async addToStory(authToken: string,newStatus: Status): Promise<void> {
        const alias = await this.authDAO.getAlias(authToken); 
        if(alias === null) throw new Error("Invalid auth token"); // pull out duplicate logic

        const followees = await this.followeeDAO.getFolloweesPaged(alias,null);
        await this.postDAO.addToStory(alias,newStatus,followees);
    }

    // have this functio add items to a feed
    public async addToFeed(newStatus: Status, followeeAlias: string[]): Promise<void> {

    } // after that we are done

    
}