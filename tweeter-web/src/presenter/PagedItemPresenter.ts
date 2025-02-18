import { AuthToken } from "tweeter-shared";
import { PagedItemView, Presenter, View } from "./Presenter";

export const PAGE_SIZE = 10;

export abstract class PagedItemPresenter<T,S> extends Presenter<PagedItemView<T>>{

    private service: S;
    private _lastItem : T | null = null
    private _hasMoreItems = true;

    protected constructor(view: PagedItemView<T>) {
        super(view);
        this.service = this.createService()
    }

    protected abstract createService(): S;

    protected get lastItem() {
        return this._lastItem;
    }

    protected get serviceInstance() {
        return this.service;
    }

    protected set lastItem(item: T | null) {
        this._lastItem = item;
    }

    public get hasMoreItems() {
        return this._hasMoreItems;
    }

    protected set hasMoreItems(hasMore: boolean) {
        this._hasMoreItems = hasMore;
    }

    reset() {
        this._lastItem = null;
        this._hasMoreItems = true;
    }

    public async loadMoreItems(authToken: AuthToken, userAlias: string): Promise<void> {
        this.doTryOperation(async () => {
          const [newItems, hasMore] = await this.getMoreItems(
            authToken,
            userAlias
          );
          this.hasMoreItems = hasMore;
          this.lastItem = newItems[newItems.length - 1];
          this.view.addItems(newItems);
    
        },this.getItemDescription());
      };

      protected abstract getItemDescription() : string;

      protected abstract getMoreItems(authToken: AuthToken, userAlias: string): Promise<[T[], boolean]>;

}


