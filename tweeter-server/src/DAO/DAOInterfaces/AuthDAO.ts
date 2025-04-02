import { DAO } from "./DAO";

export interface AuthDAO extends DAO {

    createAuth(token: string, alias: string): Promise<void>;

    deleteAuth(token: string): Promise<void>;

    getAlias(token: string): Promise<string>;

}