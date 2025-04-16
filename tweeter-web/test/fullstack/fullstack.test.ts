import { instance, mock, spy, verify, when } from "@typestrong/ts-mockito"
import 'whatwg-fetch';

import { ServerFacade } from "../../src/model/ServerFacade";
import { AuthToken, Status, User } from "tweeter-shared";
import { PostStatusPresenter } from '../../src/presenter/PostStatusPresenter';
import { PostsService } from '../../src/model/service/PostService';
import { PostView } from "../../src/presenter/Presenter";


describe("Tweeter Appliation", () => {

    const server = new ServerFacade();
    let auth: AuthToken;
    let myUser: User | null = null;
    const password = "admin"
    const alias = "@C"


    beforeEach(async() => {
        if(auth === undefined) {
            const [user,token,valid] = await server.login({alias,password});

            if(valid && token !== null && user !== null) {
                auth = token
                myUser = user;

                console.log("User: " + JSON.stringify(user));

            }else{
                throw new Error("Login failed");
            }
        }
    });

    

    it("can update 10000 feeds in about 30 seconds", async () => {
        const status = new Status("This is a post from carol",myUser!,1000);        

        const valid = await server.postStatus({
            token: auth.token,
            user: status.dto
        });
        expect(valid).toBe(true);
    });

/*    

    it("posts a status from the user", async () => {

        // need to make a new user to test it on
    });

    it("is able to get the post from the story", async () => {

        const res = await server.getMoreStoryItems({
            token: auth.token,
            userAlias:alias,
            pageSize: 10,
            lastItem: null,
        });

        const items = res[0];
        const more = res[1];

        expect(items.length).toBe(1);
        expect(more).toBe(false);
        expect(items[0].user.alias).toBe(alias);
    });

    it("checks to see if the toast is called", async () => {

        const mockPostStatusView = mock<PostView>();
        const mockPostStatusService = mock<PostsService>();
        const mockPostStatusViewInstance = instance(mockPostStatusView);
        const mockPostStatusServiceInstance = instance(mockPostStatusService);
        
        // Spy on the displayInfoMessage method
        const displayInfoMessageSpy = jest.spyOn(mockPostStatusViewInstance, 'displayInfoMessage');
        
        when(mockPostStatusService.postStatus).thenResolve(); // Ensure postStatus resolves
        
        const postStatusPresenter = new PostStatusPresenter(mockPostStatusViewInstance);
        postStatusPresenter.createPostService(mockPostStatusServiceInstance);
        
        // Call submitPost directly in the test
        await postStatusPresenter.submitPost(null, "Test post", myUser!, auth);
        
        // Now check if displayInfoMessage was called
        expect(displayInfoMessageSpy).toHaveBeenCalledWith("Posting status...", 0);
        expect(displayInfoMessageSpy).toHaveBeenCalledWith("Status posted!", 2000);

    });
    */
});
