import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE, StatusItemPresenter } from "./StatusItemPresenter";

export class StoryPresenter extends StatusItemPresenter {

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