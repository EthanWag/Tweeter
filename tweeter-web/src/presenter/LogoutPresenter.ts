import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { LogoutView, Presenter } from "./Presenter";

export class LogoutPresenter extends Presenter<LogoutView>{

  private _userService : UserService | null = null;

  public constructor(view: LogoutView) {
    super(view);
  }

  public get userService() : UserService {
    if(this._userService === null){
      this._userService = new UserService();
    }
    return this._userService;
  }

  public async logout(authToken : AuthToken | null){
    this.doTryOperation(async () => {
      this.view.displayInfoMessage("Logging out...", 0);
      await this.userService.logout(authToken!);
      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();

    },"logout user");
  };
}