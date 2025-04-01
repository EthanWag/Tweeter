import { UserDAO } from "../DAOInterfaces/UserDAO";

export interface DAOFactory {
    createUserDAO(): UserDAO;
    // you'll have others here
}