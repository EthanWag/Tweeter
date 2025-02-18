import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";

export class FeedPresenter extends StatusItemPresenter {

/*
  constructor(view: StatusItemView) {
      super(view);
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    
    this.doTryOperation(async () => {
      const [newItems, hasMore] = await this.serviceInstance.loadMoreFeedItems(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );
      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    },"load followers");
  }; 
  */

  protected getItemDescription(): string {
    return "load feed";
  }
  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
    return this.serviceInstance.loadMoreFeedItems(
      authToken,
      userAlias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}