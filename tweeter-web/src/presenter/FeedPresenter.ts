import { AuthToken } from "tweeter-shared";
import { StatusService } from "../model/service/StatusService";
import { StatusItemPresenter } from "./StatusItemPresenter";
import { StatusItemView } from "./Presenter";

export const PAGE_SIZE = 10;

export class FeedPresenter extends StatusItemPresenter {

    private statusService: StatusService;

    constructor(view: StatusItemView) {
        super(view);
        this.statusService = new StatusService();
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string) {
        try {
          const [newItems, hasMore] = await this.statusService.loadMoreFeedItems(
            authToken,
            userAlias,
            PAGE_SIZE,
            this.lastItem
          );
    
          this.hasMoreItems = hasMore;
          this.lastItem = newItems[newItems.length - 1];
          this.view.addItems(newItems);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to load feed because of exception: ${error}`
          );
        }
      }
    
}