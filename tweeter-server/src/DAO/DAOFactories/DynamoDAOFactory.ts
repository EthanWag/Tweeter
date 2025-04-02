import { UserDAO } from "../DAOInterfaces/UserDAO";
import { FollowersDAO } from "../DAOInterfaces/FollowersDAO";
import { AuthDAO } from "../DAOInterfaces/AuthDAO";

// factory stuff
import { DAOFactory } from "./DAOFactory";
import { UserDAODynamoDB } from "../DAOImplementations/Dynamo/UserDAODynamoDB";
import { FollowersDAODynamoDB } from "../DAOImplementations/Dynamo/FollowersDAODynamoDB";
import { AuthDAODynamoDB } from "../DAOImplementations/Dynamo/AuthDAODynamoDB";

export class DyanmoDAOFactory implements DAOFactory {
    createUserDAO(): UserDAO {
        return new UserDAODynamoDB();
    }
    createFollowersDAO(): FollowersDAO {
        return new FollowersDAODynamoDB();
    }
    createAuthDAO(): AuthDAO {
        return new AuthDAODynamoDB();
    }
    
    // you'll have others here
    
}