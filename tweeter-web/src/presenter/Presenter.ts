import { AuthToken, Status, User } from "tweeter-shared";

export interface View {
    displayErrorMessage: (message: string) => void;
}

export interface UserItemView extends View { 
    addItems: (newItems: User[]) => void;
}

export interface StatusItemView extends View {
    addItems: (newItems: Status[]) => void;
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

export class Presenter<T extends View>{

    private _view: T;
    // put more stuff here


    protected constructor (view:T) {
        this._view = view;
    }

    protected get view(): T {
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