import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";

export class StoryPresenter extends StatusItemPresenter {

  /*
  constructor(view: PagedItemView<Status>) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {

    this.doTryOperation(async () => {
      const [newItems, hasMore] = await this.serviceInstance.loadMoreStoryItems(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem
      );
      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    },"load story");
  };
  */

  protected getItemDescription(): string {
    return "load story";
  }
  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[Status[], boolean]> {
    return this.serviceInstance.loadMoreStoryItems(
      authToken,
      userAlias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}