import { AuthToken } from "tweeter-shared";
import { DAO } from "./DAO";

export interface AuthDAO extends DAO {

    createAuth(alias: string): Promise<AuthToken>;

    deleteAuth(token: string): Promise<void>;

    getAuth(token: string): Promise<AuthToken>;

    getAlias(token: string): Promise<string>;

    isAuthorized(token: string,alias:string): Promise<boolean>;

}