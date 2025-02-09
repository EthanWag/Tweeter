import { AuthToken, Status } from "tweeter-shared";

export interface StatusItemView {
    addItems: (newItems: Status[]) => void;
    displayErrorMessage: (message: string) => void;
}

export abstract class StatusItemPresenter {

    private _lastItem: Status | null = null;
    private _hasMoreItems = true;
    private _view: StatusItemView;

    protected constructor(view: StatusItemView) {
        this._view = view;
    }

    protected get view() {
        return this._view;
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(item: Status | null) {
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

    public abstract loadMoreItems(authToken:AuthToken, userAlias:string): void;

}