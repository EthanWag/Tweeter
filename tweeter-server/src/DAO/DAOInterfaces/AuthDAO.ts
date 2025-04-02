import { AuthToken } from "tweeter-shared";
import { DAO } from "./DAO";

export interface AuthDAO extends DAO {

    createAuth(token: string, alias: string): Promise<void>;

    deleteAuth(token: string): Promise<void>;

    getAuth(token: string): Promise<AuthToken>;

    getAlias(token: string): Promise<string>;

}