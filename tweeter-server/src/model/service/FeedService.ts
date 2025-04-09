import { Status, User } from "tweeter-shared";

export class FeedService {
    // private readonly userDAO: UserDAO;
    // private readonly followersDAO: FollowersDAO;
    // private readonly followeesDAO: FolloweesDAO;
    // private readonly authDAO: AuthDAO;
    
    constructor() {
        // const factory = new DAOProvider();
        // this.userDAO = factory.makeUserDAO();
        // this.followersDAO = factory.makeFollowersDAO();
        // this.followeesDAO = factory.makeFolloweesDAO();
        // this.authDAO = factory.makeAuthDAO();
    }

    // 3. This, given a user alias and authToken, will return a list of users the that follow the user in bunches of 100
    public async getUsersBunch(token:string, alias:string):Promise<User[][]>{

        // 4. get the users from the database


        // 5. bunch those users up in to 100s and return the array/data structure of some kind
        throw new Error("Method not implemented.");
    }


}