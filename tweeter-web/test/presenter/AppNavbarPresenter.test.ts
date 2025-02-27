import { LogoutView } from "../../src/presenter/Presenter";
import { LogoutPresenter } from "../../src/presenter/LogoutPresenter";
import { AuthToken } from "tweeter-shared";
import { mock, instance, verify } from "ts-mockito";


describe("AppNavbarPresenter", () => {

    let mockAppNavbarPresenterView: LogoutView;
    let appNavbarPresenter: LogoutPresenter;

    const authToken = new AuthToken("You a mega hoe", Date.now());

    beforeEach(() => {
        mockAppNavbarPresenterView = mock<LogoutView>();
        const mockAppNavbarPresenterViewInstance = instance(mockAppNavbarPresenterView);

        appNavbarPresenter = new LogoutPresenter(mockAppNavbarPresenterViewInstance);
    });

    it("tells the view to display a logging out message", () => {

        appNavbarPresenter.logout(authToken);
        verify(mockAppNavbarPresenterView.displayInfoMessage("Logging out...", 0)).once();
    });

});
