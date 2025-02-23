import { PagedItemView } from "./Presenter";
import { PAGE_SIZE, UserItemPresenter } from "./UserItemPresenter";
import { AuthToken, User } from "tweeter-shared";

export class FollowerPresenter extends UserItemPresenter {

  public constructor(view: PagedItemView<User>) {
    super(view);
  }

  protected getItemDescription(): string {
    return "load followers";
  }

  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
    return this.serviceInstance.loadMoreFollowers(
      authToken,
      userAlias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}