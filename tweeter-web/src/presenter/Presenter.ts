import { AuthToken, User } from "tweeter-shared";

export interface View {
    displayErrorMessage: (message: string) => void;
}

export interface PagedItemView<T> extends View { 
    addItems: (newItems: T[]) => void;
}

export interface AccountView extends UpdateView{
    updateUserInfo: (user1: User, user2: User, authToken: AuthToken, rememberMe: boolean) => void;
    navigate: (url: string) => void;
}

export interface NetworkView extends View {
    setIsFollower: (isFollower: boolean) => void;
    setFolloweeCount: (followeeCount: number) => void;
    setFollowerCount: (followerCount: number) => void;
}

export interface PostView extends ClearMessageView, UpdateView {
    setPost: (post: string) => void;
}

export interface LogoutView extends ClearMessageView {
    clearUserInfo: () => void;
}

interface ClearMessageView extends View {
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
}

interface UpdateView extends View {
    setIsLoading: (isLoading: boolean) => void;
}

export class Presenter<V extends View>{

    private _view: V;

    protected constructor (view:V) {
        this._view = view;
    }
    protected get view(): V {
        return this._view;
    }
    protected async doTryOperation(operation:() => Promise<void>,operationDiscription:string) {
        try {
            await operation();
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to ${operationDiscription} because of exception: ${(error as Error).message}`
            );
        }
    };

    // be sure only to use when talking about views with the setIsLoading function
    protected async doUpdateOperation
    <L extends UpdateView>(
        operation:() => Promise<void>,
        operationDiscription:string,
        view: L
    ) {
        try {
            view.setIsLoading(true);
            await operation();
        }catch(error){
            view.displayErrorMessage(
                `Failed to ${operationDiscription} because of exception: ${(error as Error).message}`
            );
        }finally{
            view.setIsLoading(false);
        }
    };
}