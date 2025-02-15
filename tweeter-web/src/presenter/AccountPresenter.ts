import { AccountView, Presenter } from "./Presenter";

export abstract class AccountPresenter extends Presenter<AccountView>{

    protected constructor(view: AccountView){
        super(view);
    }

    // public abstract checkSubmitButtonStatus(): boolean;


}