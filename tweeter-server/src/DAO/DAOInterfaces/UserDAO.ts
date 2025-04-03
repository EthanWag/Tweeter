import { User } from "tweeter-shared";
import { DAO } from "./DAO";

// This interface has anything to do with user information in the database

export interface UserDAO extends DAO{
    getUser(alias: string): Promise<User>; // don't think I want any but it's good for now

    createUser(
        alias: string,
        firstName: string,
        lastName: string,
        encryptedPassword: string,
        userImageBytesString: string,
        imageExtention: string
    ): Promise<User>; // throw an error if things go wrong???

    // does exist?

    // delete user?

    getPassword(alias: string): Promise<string>;
}