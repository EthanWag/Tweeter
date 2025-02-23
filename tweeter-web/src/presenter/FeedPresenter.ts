import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";
import { PagedItemView } from "./Presenter";

export class FeedPresenter extends StatusItemPresenter {

  public constructor(view: PagedItemView<Status>) {
    super(view);
  }

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