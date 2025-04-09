import { StatusDto, Status} from "tweeter-shared";
import { DAOProvider } from "../../DAO/DAOProvider";
import { PostDAO } from "../../DAO/DAOInterfaces/PostDAO";
import { ServiceResources } from './ServiceResources';

export class StatusService {

  private readonly postDAO: PostDAO;
  private readonly serviceResources: ServiceResources;

  constructor() {
    const factory = new DAOProvider();
    this.postDAO = factory.makePostDAO();

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
  };
}