import { Status } from "tweeter-shared";
import { DAO } from "./DAO";

export interface PostDAO extends DAO{

    addToStory(alias:string,newStatus:Status): Promise<void>;

    addToFeed(post:Status, alias:string,followeeAlias:string[]): Promise<void>;

    getMostRecentPost(alias:string): Promise<Status>;

    getStoryPaged(alias:string, lastPost:Status | null, pageNumber:number): Promise<Status[]>;

    getFeedPaged(alias:string, lastPost:Status | null, pageNumber:number): Promise<Status[]>;

}