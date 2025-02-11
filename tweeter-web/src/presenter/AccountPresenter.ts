import { AuthToken, User } from "tweeter-shared";

export interface AccountView {
    displayErrorMessage: (message: string) => void;
    setIsLoading: (isLoading: boolean) => void;
    updateUserInfo: (user1: User, user2: User, authToken: AuthToken, rememberMe: boolean) => void;
    navigate: (url: string) => void;
}

export abstract class AccountPresenter {
    
    private _alias : string;
    private _password : string;
    private _view: AccountView;

    protected constructor(view: AccountView, alias: string, password: string){
        this._view = view;
        this._alias = alias;
        this._password = password;
    }

    protected get view() {
        return this._view;
    }

    protected get alias() {
        return this._alias;
    }

    protected get password() {
        return this._password;
    }

    protected set alias(alias: string) {
        this._alias = alias;
    }

    protected set password(password: string) {
        this._password = password;
    }

    public abstract checkSubmitButtonStatus(): boolean;


}