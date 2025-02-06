import { AuthToken, User } from "tweeter-shared";

export interface UserItemView { 
    addItems: (newItems: User[]) => void;
    displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {

    private _lastItem : User | null = null
    private _hasMoreItems = true;

    private _view: UserItemView;

    protected constructor(view: UserItemView){
        this._view = view;
    }   

    protected get view() {
        return this._view;
    }

    protected get lastItem() {
        return this._lastItem;
    }

    protected set lastItem(item: User | null) {
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

    public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;

}