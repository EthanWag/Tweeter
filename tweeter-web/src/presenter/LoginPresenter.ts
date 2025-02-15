import { UserService } from "../model/service/UserService";
import { AccountPresenter } from "./AccountPresenter";
import { AccountView } from "./Presenter";

export class LoginPresenter extends AccountPresenter {
    
  private userService : UserService;

  public constructor(view: AccountView){
      super(view);
      this.userService = new UserService();
  }

  public checkSubmitButtonStatus (alias:string, password:string): boolean {
    return !alias || !password;
  };

  public async doLogin(alias:string,password:string,rememberMe:boolean,originalUrl?:string){ // maybe pass in a state function???
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.userService.login(alias,password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      } else {
        this.view.navigate("/");
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    } finally {
      this.view.setIsLoading(false);
    }
  };
}