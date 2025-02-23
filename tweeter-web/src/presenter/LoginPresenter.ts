import { UserService } from "../model/service/UserService";
import { AccountPresenter } from "./AccountPresenter";
import { AccountView } from "./Presenter";

export class LoginPresenter extends AccountPresenter {
    
  private userService : UserService;

  public constructor(view: AccountView){
      super(view);
      this.userService = new UserService();
  }

  public async doLogin(alias:string,password:string,rememberMe:boolean,originalUrl?:string){

    this.doTryOperation(async () => {
      this.view.setIsLoading(true);
      const [user, authToken] = await this.userService.login(alias,password);
      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!originalUrl) {
        this.view.navigate(originalUrl);
      }
      this.view.navigate("/");
    },"login user");
  };
}