import { UserDAO } from "../DAOInterfaces/UserDAO";
import { FollowersDAO } from "../DAOInterfaces/FollowersDAO";
import { FolloweesDAO } from "../DAOInterfaces/FolloweesDAO";
import { AuthDAO } from "../DAOInterfaces/AuthDAO";

// factory stuff
import { DAOFactory } from "./DAOFactory";
import { UserDAODynamoDB } from "../DAOImplementations/Dynamo/UserDAODynamoDB";
import { FollowersDAODynamoDB } from "../DAOImplementations/Dynamo/FollowersDAODynamoDB";
import { FolloweesDAODynamoDB } from "../DAOImplementations/Dynamo/FolloweesDAODynamoDB";
import { AuthDAODynamoDB } from "../DAOImplementations/Dynamo/AuthDAODynamoDB";

export class DyanmoDAOFactory implements DAOFactory {
    createUserDAO(): UserDAO {
        return new UserDAODynamoDB();
    }
    createAuthDAO(): AuthDAO {
        return new AuthDAODynamoDB();
    }
    createFollowersDAO(): FollowersDAO {
        return new FollowersDAODynamoDB();
    }
    createFolloweesDAO(): FolloweesDAO {
        return new FolloweesDAODynamoDB();
    }

    // you'll have others here
    
}