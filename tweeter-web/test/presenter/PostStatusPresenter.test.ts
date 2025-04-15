
import { mock, instance, verify, spy, when, capture, anything } from "@typestrong/ts-mockito"
import { AuthToken, Status, User } from "tweeter-shared";
import { PostView } from "../../src/presenter/Presenter";
import { PostStatusPresenter } from "../../src/presenter/PostStatusPresenter"
import { StatusService } from '../../src/model/service/StatusService';

describe("PostStatusPresenter", () => {

    /*

    let mockPostStatusPresenterView: PostView;
    let postStatusPresenter: PostStatusPresenter;
    let mockStatusService: StatusService;

    const authToken = new AuthToken("You a mega hoe", Date.now());
    const myUser = new User("not nathan","not david","booger","not a very good image")
    const post = "Omeaga post"
    const status = new Status(post, myUser!, Date.now());

    beforeEach(() => {
        mockPostStatusPresenterView = mock<PostView>();
        const mockPostStatusViewInstance = instance(mockPostStatusPresenterView);

        const postStatusPresenterSpy = spy(new PostStatusPresenter(mockPostStatusViewInstance));
        postStatusPresenter = instance(postStatusPresenterSpy);

        mockStatusService = mock<StatusService>();
        const mockStatusServiceInstance = instance(mockStatusService);

        when(postStatusPresenterSpy.statusService).thenReturn(mockStatusServiceInstance);

    });

    it("tells the view to display a posting status message", () => {
        postStatusPresenter.submitPost(null,"Omeaga post",myUser,authToken)

        verify(mockPostStatusPresenterView.displayInfoMessage("Posting status...", 0));
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000));
    });

    it("calls postStatus on the post status service with the correct status string and auth token", async () => {

        await postStatusPresenter.submitPost(null,"Omeaga post",myUser,authToken);
        verify(mockStatusService.postStatus(authToken,status))

        let [capturedAuthToken, capturedStatus] = capture(mockStatusService.postStatus).last();
        expect(capturedAuthToken).toEqual(authToken);
        expect(capturedStatus).toMatchObject({
            post: "Omeaga post",
            user: myUser,
        });
    });

    it("tells the view to clear the last info message, clear the post, and display a status posted message when successful", async () => {
        await postStatusPresenter.submitPost(null,"Omeaga post",myUser,authToken);

        verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
        verify(mockPostStatusPresenterView.setPost("")).once();
        verify(mockPostStatusPresenterView.displayInfoMessage("Status posted!", 2000)).once();

        verify(mockPostStatusPresenterView.displayErrorMessage(anything())).never();
    });

    it("tells the view to display an error message and clear the last info message and does not tell it to clear the post or display a status posted message when not successful", async () => {

        const error = new Error("An error occurred");
        when(mockStatusService.postStatus(authToken,anything())).thenThrow(error);

        await postStatusPresenter.submitPost(null,post,myUser,authToken);

        verify(mockPostStatusPresenterView.displayErrorMessage("Failed to post the status because of exception: An error occurred"));
        verify(mockPostStatusPresenterView.displayInfoMessage(anything(),anything())).once(); // this is the start posting status
        verify(mockPostStatusPresenterView.setPost("")).never();

        verify(mockPostStatusPresenterView.clearLastInfoMessage()).once();
    });

    */

});