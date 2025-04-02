import { UserDAO } from "../DAOInterfaces/UserDAO";
import { FollowersDAO } from "../DAOInterfaces/FollowersDAO";

export interface DAOFactory {
    createUserDAO(): UserDAO;
    createFollowersDAO(): FollowersDAO;
    // you'll have others here
}