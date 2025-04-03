import { StatusDto, Status} from "tweeter-shared";
import { DAOProvider } from "../../DAO/DAOProvider";
import { PostDAO } from "../../DAO/DAOInterfaces/PostDAO";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";

export class StatusService {

  private readonly postDAO: PostDAO;
  private readonly authDAO: AuthDAO;

  constructor() {
    const factory = new DAOProvider();
    this.postDAO = factory.makePostDAO();
    this.authDAO = factory.makeAuthDAO();
  }

  public async loadMoreFeedItems (
    authToken: string,
    alias: string,
    pageSize: number,
    lastItem: StatusDto | null // we need to make a status dto
  ): Promise<[StatusDto[], boolean]> {
    
    await this.checkToken(authToken, alias);

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

    await this.checkToken(authToken, alias);
    const last = lastItem ? Status.fromDto(lastItem) : null;

    const story = await this.postDAO.getStoryPaged(alias, last, pageSize);
    const dtos = story.map((status) => status.dto);
    const hasMore = story.length === pageSize;

    return [dtos, hasMore];
  };
  private async checkToken(token:string,alias:string): Promise<void> {
    const isAuthorized = await this.authDAO.isAuthorized(token,alias);
    if(!isAuthorized){
      throw new Error("Unauthorized");
    }
  }
}