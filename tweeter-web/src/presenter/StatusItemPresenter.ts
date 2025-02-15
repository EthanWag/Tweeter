import { AuthToken, Status } from "tweeter-shared";
import { Presenter, StatusItemView } from "./Presenter";

export abstract class StatusItemPresenter extends Presenter<StatusItemView> {

    private _lastItem: Status | null = null;
    private _hasMoreItems = true;

    protected constructor(view: StatusItemView) {
        super(view);
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