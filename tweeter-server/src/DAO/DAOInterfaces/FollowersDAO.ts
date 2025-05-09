import { DAO } from "./DAO";

export interface FollowersDAO extends DAO{

    getFollowersCount(alias: string): Promise<number>;

    getFollowersPaged(alias: string, lastAlias: string | null, pageNumber: number): Promise<string[]>;

    addFollower(alias: string, followerAlias: string): Promise<void>;

    removeFollower(alias: string, followerAlias: string): Promise<void>;

    doesFollow(alias: string, followerAlias: string): Promise<boolean>;

    setIsFollower(alias: string, followerAlias: string, isFollower: boolean): Promise<void>;
}