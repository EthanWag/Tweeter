import { DAO } from "./DAO";

export interface FolloweesDAO extends DAO {

    getFolloweesCount(alias: string): Promise<number>;

    getFolloweesPaged(alias: string, lastAlias: string | null, pageNumber?: number): Promise<string[]>;

    addFollowee(alias: string, followeeAlias: string): Promise<void>;

    removeFollowee(alias: string, followeeAlias: string): Promise<void>;

    isFollowee(alias: string, followeeAlias: string): Promise<boolean>;
}