import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";
import { PagedItemView } from "./Presenter";

export class StoryPresenter extends StatusItemPresenter {

  public constructor(view: PagedItemView<Status>) {
    super(view);
  }

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