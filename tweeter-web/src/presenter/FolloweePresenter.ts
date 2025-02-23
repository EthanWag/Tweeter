import { PagedItemView } from "./Presenter";
import { PAGE_SIZE, UserItemPresenter } from "./UserItemPresenter";
import { AuthToken, User } from "tweeter-shared";

export class FolloweePresenter extends UserItemPresenter {

  public constructor(view: PagedItemView<User>) {
    super(view);
  }

  protected getItemDescription(): string {
    return "load followees";
  }
  
  protected getMoreItems(authToken: AuthToken, userAlias: string): Promise<[User[], boolean]> {
    return this.serviceInstance.loadMoreFollowees(
      authToken,
      userAlias,
      PAGE_SIZE,
      this.lastItem
    );
  }
}