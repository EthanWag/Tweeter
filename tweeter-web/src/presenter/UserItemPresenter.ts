import { AuthToken, User } from "tweeter-shared";
import { Presenter, UserItemView, View } from "./Presenter";

export abstract class UserItemPresenter extends Presenter<UserItemView>{

    private _lastItem : User | null = null
    private _hasMoreItems = true;

    protected constructor(view: UserItemView) {
        super(view);
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