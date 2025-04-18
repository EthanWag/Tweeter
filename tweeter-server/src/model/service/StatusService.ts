import { StatusDto, Status, User} from "tweeter-shared";
import { ServiceResources } from './ServiceResources';
import { DAOProvider } from "../../DAO/DAOProvider";
import { PostDAO } from "../../DAO/DAOInterfaces/PostDAO";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";
import { UserDAO } from "../../DAO/DAOInterfaces/UserDAO";
import { FolloweesDAO } from "../../DAO/DAOInterfaces/FolloweesDAO";

export class StatusService {

  // temp do not keep
  private count = 0


  private readonly postDAO: PostDAO;
  private readonly authDAO: AuthDAO;
  private readonly userDAO: UserDAO;
  private readonly followeeDAO: FolloweesDAO;

  private readonly serviceResources: ServiceResources;

  private readonly MAX_FEED_SIZE = 100;
  private readonly BUNCH_SIZE = 25;

  constructor() {
    const factory = new DAOProvider();
    this.authDAO = factory.makeAuthDAO();
    this.userDAO = factory.makeUserDAO();
    this.postDAO = factory.makePostDAO();
    this.followeeDAO = factory.makeFolloweesDAO();

    this.serviceResources = new ServiceResources();
  }

  public async loadMoreFeedItems (
    authToken: string,
    alias: string,
    pageSize: number,
    lastItem: StatusDto | null // we need to make a status dto
  ): Promise<[StatusDto[], boolean]> {
    
    await this.serviceResources.checkAuth(authToken, alias);

    const last = lastItem ? Status.fromDto(lastItem) : null;

    const feed = await this.postDAO.getFeedPaged(alias, last, pageSize);
    const dtos = feed.map((status) => status.dto);
    const hasMore = feed.length === pageSize;

    return [dtos, hasMore];
  }

  public async loadMoreStoryItems (
    authToken: string,
    alias: string,
    pageSize: number,
    lastItem: StatusDto | null
  ): Promise<[StatusDto[], boolean]> {

    await this.serviceResources.checkAuth(authToken, alias);
    const last = lastItem ? Status.fromDto(lastItem) : null;

    const story = await this.postDAO.getStoryPaged(alias, last, pageSize);
    const dtos = story.map((status) => status.dto);
    const hasMore = story.length === pageSize;

    return [dtos, hasMore];
  }

  public async addToStory(authToken: string,newStatus: Status): Promise<void> {
      const alias = await this.authDAO.getAlias(authToken); 
      if(alias === null) throw new Error("Invalid auth token");

      await this.postDAO.addToStory(alias,newStatus);
  }

  public async addToFeed(newStatus: Status, followeeAlias: string[]): Promise<void> {
    await this.postDAO.addToFeed(newStatus,newStatus.user.alias,followeeAlias)
  }

  public async getUsersBunch(alias:string):Promise<string[][][]>{

    const allFollowers = await this.followeeDAO.getFolloweesPaged(alias, null)

    return this.bunchFollowers(allFollowers);
  }
  
  public async getPosts(alias:string): Promise<User | null> {
    try{
        return await this.userDAO.getUser(alias);
    }catch(e){
        // could not find the user
        return null;
    }
  }

  private bunchFollowers(followers:string[]):string[][][] {

    const result: string[][][] = [];
    const rowSize = 100;
    const blockRows = 10;
    const blockSize = rowSize * blockRows;
  
    for (let i = 0; i < followers.length; i += blockSize) {
      const block: string[][] = [];
  
      for (let j = i; j < i + blockSize && j < followers.length; j += rowSize) {
        const row = followers.slice(j, j + rowSize);
        block.push(row);
      }
  
      result.push(block);
    }
  
    return result;


  }

}