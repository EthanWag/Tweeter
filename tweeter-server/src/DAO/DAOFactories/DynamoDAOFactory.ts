import { UserDAO } from "../DAOInterfaces/UserDAO";
import { DAOFactory } from "./DAOFactory";
import { UserDAODynamoDB } from "../DAOImplementations/Dynamo/UserDAODynamoDB";

export class DyanmoDAOFactory implements DAOFactory {
    createUserDAO(): UserDAO {
        return new UserDAODynamoDB();
    }

    
    // you'll have others here
    
}