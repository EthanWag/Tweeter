import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";
import { LogoutView, Presenter } from "./Presenter";

export class LogoutPresenter extends Presenter<LogoutView>{

  private userService : UserService;

  public constructor(view: LogoutView) {
    super(view)
    this.userService = new UserService();
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