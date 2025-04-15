

import { mock, instance, spy, verify, when, capture, anything } from "@typestrong/ts-mockito"
import { AuthToken } from "tweeter-shared";
import { LogoutView } from "../../src/presenter/Presenter";
import { LogoutPresenter } from "../../src/presenter/LogoutPresenter";
import { UserService } from "../../src/model/service/UserService";


describe("AppNavbarPresenter", () => {

    /*

    let mockAppNavbarPresenterView: LogoutView;
    let appNavbarPresenter: LogoutPresenter;
    let mockUserService: UserService;

    const authToken = new AuthToken("You a mega hoe", Date.now());

    beforeEach(() => {
        mockAppNavbarPresenterView = mock<LogoutView>();
        const mockAppNavbarPresenterViewInstance = instance(mockAppNavbarPresenterView);

        const AppNavbarPresenterSpy = spy(new LogoutPresenter(mockAppNavbarPresenterViewInstance)); // this is a spy
        appNavbarPresenter = instance(AppNavbarPresenterSpy); // this is a mock

        mockUserService = mock<UserService>();
        const mockUserServiceInstance = instance(mockUserService);

        when(AppNavbarPresenterSpy.userService).thenReturn(mockUserServiceInstance);
        
    });

    it("tells the view to display a logging out message", async () => {
        await appNavbarPresenter.logout(authToken);
        verify(mockAppNavbarPresenterView.displayInfoMessage("Logging out...", 0)).once();
    });

    it("calls logout on the user service with the correct auth token", async () => {
        await appNavbarPresenter.logout(authToken)
        verify(mockUserService.logout(authToken)).once();

        let [capturedAuthToken] = capture(mockUserService.logout).last();
        expect(capturedAuthToken).toEqual(authToken);
    });

    it("tells the view to clear the last info message, clear the user info, and navigate to the login page when logout is successful", async () => {

        await appNavbarPresenter.logout(authToken);

        verify(mockAppNavbarPresenterView.clearLastInfoMessage()).once();
        verify(mockAppNavbarPresenterView.clearUserInfo()).once();
        verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).never();
    });

    it("displays an error message and does not clear the last info message, clear the user info, and navigate to the login page when logout is not successful", async () => {

        const error = new Error("An error occurred");
        when(mockUserService.logout(authToken)).thenThrow(error);

        await appNavbarPresenter.logout(authToken);

        verify(mockAppNavbarPresenterView.displayErrorMessage("Failed to logout user because of exception: An error occurred")).once();

        verify(mockAppNavbarPresenterView.clearLastInfoMessage()).never();
        verify(mockAppNavbarPresenterView.clearUserInfo()).never();

    });

    */
});
