import { FollowService } from "../model/service/FollowService";
import { UserItemView } from "./Presenter";
import { UserItemPresenter } from "./UserItemPresenter";
import { AuthToken } from "tweeter-shared";

export const PAGE_SIZE = 10;

export class FollowerPresenter extends UserItemPresenter {

  private followService: FollowService;

  public constructor(view: UserItemView) {
    super(view);
    this.followService = new FollowService();
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string): Promise<void> {

    this.doTryOperation(async () => {
      const [newItems, hasMore] = await this.followService.loadMoreFollowers(
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
}