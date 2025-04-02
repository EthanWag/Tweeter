import { UserDAO } from "../DAOInterfaces/UserDAO";
import { DAOFactory } from "./DAOFactory";
import { UserDAODynamoDB } from "../DAOImplementations/Dynamo/UserDAODynamoDB";
import { FollowersDAO } from "../DAOInterfaces/FollowersDAO";
import { FollowersDAODynamoDB } from "../DAOImplementations/Dynamo/FollowersDAODynamoDB";

export class DyanmoDAOFactory implements DAOFactory {
    createUserDAO(): UserDAO {
        return new UserDAODynamoDB();
    }
    createFollowersDAO(): FollowersDAO {
        return new FollowersDAODynamoDB();
    }    

    
    // you'll have others here
    
}