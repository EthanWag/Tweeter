import { UserDAO } from "../DAOInterfaces/UserDAO";
import { FollowersDAO } from "../DAOInterfaces/FollowersDAO";
import { AuthDAO } from "../DAOInterfaces/AuthDAO";

export interface DAOFactory {
    createUserDAO(): UserDAO;
    createFollowersDAO(): FollowersDAO;
    createAuthDAO(): AuthDAO;
    // you'll have others here
}