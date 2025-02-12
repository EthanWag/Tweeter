import { AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface LogoutView{
    displayErrorMessage(message: string): void;
    displayInfoMessage(message: string, duration: number): void;
    clearUserInfo(): void;
    clearLastInfoMessage(): void;
}

export class LogoutPresenter {

    private userService : UserService;
    private view : LogoutView;

    public constructor(view: LogoutView) {
        this.view = view;
        this.userService = new UserService();
    }

    public async logOut(authToken : AuthToken | null){
        this.view.displayInfoMessage("Logging Out...", 0);

        try {
            await this.userService.logout(authToken!);

            this.view.clearLastInfoMessage();
            this.view.clearUserInfo();
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to log user out because of exception: ${error}`
            );
        }
    };

}