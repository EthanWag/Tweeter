import { AccountView, Presenter } from "./Presenter";

export abstract class AccountPresenter extends Presenter<AccountView>{

    protected constructor(view: AccountView){
        super(view);
    }

    protected checkSubmitButtonStatus(...values: string[]): boolean {
        return values.some(value => !value);
    }
}