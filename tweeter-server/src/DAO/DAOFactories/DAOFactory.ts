import { UserDAO } from "../DAOInterfaces/UserDAO";
import { FollowersDAO } from "../DAOInterfaces/FollowersDAO";
import { AuthDAO } from "../DAOInterfaces/AuthDAO";
import { FolloweesDAO } from "../DAOInterfaces/FolloweesDAO";

export interface DAOFactory {
    createUserDAO(): UserDAO;
    createAuthDAO(): AuthDAO;
    createFollowersDAO(): FollowersDAO;
    createFolloweesDAO(): FolloweesDAO;
    // you'll have others here
}