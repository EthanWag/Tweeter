import { AuthToken, User } from "tweeter-shared";

export interface View {
    displayErrorMessage: (message: string) => void;
}

export interface PagedItemView<T> extends View { 
    addItems: (newItems: T[]) => void;
}

export interface AccountView extends View{
    setIsLoading: (isLoading: boolean) => void;
    updateUserInfo: (user1: User, user2: User, authToken: AuthToken, rememberMe: boolean) => void;
    navigate: (url: string) => void;
}

export interface NetworkView extends View {
    setIsFollower: (isFollower: boolean) => void;
    setFolloweeCount: (followeeCount: number) => void;
    setFollowerCount: (followerCount: number) => void;
}

export interface PostView extends View{
    setIsLoading: (isLoading: boolean) => void;
    displayInfoMessage: (message: string, duration: number) => void;
    clearLastInfoMessage: () => void;
    setPost: (post: string) => void;
}

export interface LogoutView extends View {
    displayInfoMessage(message: string, duration: number): void;
    clearUserInfo(): void;
    clearLastInfoMessage(): void;
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
            `Failed to ${operationDiscription} because of exception: ${error}`
            );
        }
    };



}