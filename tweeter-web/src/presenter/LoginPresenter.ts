import { UserService } from "../model/service/UserService";
import { AccountPresenter, AccountView } from "./AccountPresenter";



export class LoginPresenter extends AccountPresenter {
    
    private userService : UserService;

    public constructor(view: AccountView, alias: string, password: string){
        super(view, alias, password); // pass the isloading function here
        this.userService = new UserService();
    }

  public checkSubmitButtonStatus (): boolean {
    return !super.alias || !super.password;
  };

  public async doLogin(){ // maybe pass in a state function???
    try {
      this.view.setIsLoading(true);

      const [user, authToken] = await this.userService.login(super.alias, super.password);

      this.view.updateUserInfo(user, user, authToken, rememberMe);

      if (!!props.originalUrl) {
        this.view.navigate(props.originalUrl);
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