import { StatusDto, Status, User} from "tweeter-shared";
import { ServiceResources } from './ServiceResources';
import { DAOProvider } from "../../DAO/DAOProvider";
import { PostDAO } from "../../DAO/DAOInterfaces/PostDAO";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";
import { UserDAO } from "../../DAO/DAOInterfaces/UserDAO";
import { FolloweesDAO } from "../../DAO/DAOInterfaces/FolloweesDAO";

export class StatusService {

  private readonly postDAO: PostDAO;
  private readonly authDAO: AuthDAO;
  private readonly userDAO: UserDAO;
  private readonly followeeDAO: FolloweesDAO;

  private readonly serviceResources: ServiceResources;

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

    await this.addToFeed(newStatus,followeeAlias)
    // we are simple done after this
  }

  public async getUsersBunch(alias:string):Promise<string[][][]>{

    let bunches:string[][][] = []
    do{
      const bunch = await this.getUsersGroup(alias)
      bunches.push(bunch)
    }while(bunches.length === 10 && bunches[9].length === 100); // MAGIC NUMBERS, SOLVE THIS

    return bunches;
  }
  
  public async getPosts(alias:string): Promise<User | null> {
    try{
        return await this.userDAO.getUser(alias);
    }catch(e){
        // could not find the user
        return null;
    }
  }

  private async getUsersGroup(alias:string):Promise<string[][]>{

        // we want to first get them in groups of 100 alias
        let group:string[][] = []
        let aliases:string[] = []
        do{
          // 4. get the users from the database
          const aliases = await this.followeeDAO.getFolloweesPaged(alias, null, 100)
          group.push(aliases)
    
          // 5. bunches these up in aliases of 100 and then groups of 10
        } while((aliases.length === 100) && (group.length < 10));

        return group; 

  }
}