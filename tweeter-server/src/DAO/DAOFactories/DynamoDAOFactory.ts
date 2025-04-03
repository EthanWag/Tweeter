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
import { PostDAO } from "../DAOInterfaces/PostDAO";
import { PostDAODynamoDB } from "../DAOImplementations/Dynamo/PostDAODynamoDB";

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
    createPostDAO(): PostDAO {
        return new PostDAODynamoDB();
    }

    // you'll have others here
    
}