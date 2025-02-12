import { AuthToken, User } from "tweeter-shared";

export interface AccountView {
    displayErrorMessage: (message: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    updateUserInfo: (user1: User, user2: User, authToken: AuthToken, rememberMe: boolean) => void;
    navigate: (url: string) => void;
}

export abstract class AccountPresenter {
    
    private _view: AccountView;

    protected constructor(view: AccountView){
        this._view = view;
    }

    protected get view() {
        return this._view;
    }

    // public abstract checkSubmitButtonStatus(): boolean;


}