
import { instance, spy } from "@typestrong/ts-mockito"
import 'whatwg-fetch';

import { ServerFacade } from "../../src/model/ServerFacade";
import { RegisterRequest } from '../../../tweeter-shared/dist/model/net/request/RegisterRequest';
import { LoginRequest, PagedItemRequest } from "tweeter-shared";

describe("Server Facade", () => {

    /*

    const spyServerFacade = spy(new ServerFacade());
    const realServerFacade = instance(spyServerFacade);

    it("can register a new user with the server", async () => {

        const request: RegisterRequest = {
            firstName: "aaaa",
            lastName: "bbbb",
            alias: "cccc",
            password: "dddd",
            userImageBytes: "eeee",
            imageFileExtension: "ffff"
        };
        let [user, token, valid] = await realServerFacade.register(request);
        expect(valid).toBe(true);
    });

    it("can login a user using api", async () => {

        const request: LoginRequest = {
            alias: "cccc",
            password: "dddd"
        };
        let [user, token, valid] = await realServerFacade.login(request);
        expect(valid).toBe(true);
    });

    it("can login a user using api", async () => {

        const request: LoginRequest = {
            alias: "cccc",
            password: "dddd"
        };
        let [user, token, valid] = await realServerFacade.login(request);
        expect(valid).toBe(true);
    });

    it("can get a list of followers", async () => {

        const request = {
            token: "aaaa",
            userAlias: "bbbb",
            pageSize: 10,
            lastItem: null
        };
        let [items,hasMore] = await realServerFacade.getMoreFollowers(request);
        expect(hasMore).toBe(true);
    });

    it("can get a list of followees", async () => {

        const request = {
            token: "aaaa",
            userAlias: "bbbb",
            pageSize: 10,
            lastItem: null
        };
        let [items,hasMore] = await realServerFacade.getMoreFollowees(request);
        expect(hasMore).toBe(true);
    });

    it("can get a list of story Items", async () => {

        const request = {
            token: "aaaa",
            userAlias: "bbbb",
            pageSize: 10,
            lastItem: null
        };
        let [items,hasMore] = await realServerFacade.getMoreStoryItems(request);
        expect(hasMore).toBe(true);
    });

    it("can get a list of feed items", async () => {

        const request = {
            token: "aaaa",
            userAlias: "bbbb",
            pageSize: 10,
            lastItem: null
        };
        let [items,hasMore] = await realServerFacade.getMoreFeedItems(request);
        expect(hasMore).toBe(true);
    });

    it("can get the number of followees", async () => {

        const request = {
            token: "aaaa",
            user: {
                firstname: "aaaa",
                lastname: "bbbb",
                alias: "cccc",
                imageUrl: "dddd"
            }
        };
        let count = await realServerFacade.getFolloweeCount(request);
        expect(count > 0).toBe(true);
    });

    it("can get the number of followers", async () => {

        const request = {
            token: "aaaa",
            user: {
                firstname: "aaaa",
                lastname: "bbbb",
                alias: "cccc",
                imageUrl: "dddd"
            }
        };
        let count = await realServerFacade.getFollowerCount(request);
        expect(count > 0).toBe(true);
    });

    it("can allow for users to follow other users", async () => {

        const request = {
            token: "aaaa",
            user: {
                firstname: "aaaa",
                lastname: "bbbb",
                alias: "cccc",
                imageUrl: "dddd"
            }
        };
        let [followers,followees] = await realServerFacade.follow(request);
        expect(followers === 0).toBe(true); // BTW, because this is WIP, it returns dumby values
    });

    it("can allow for users to unfollow other users", async () => {

        const request = {
            token: "aaaa",
            user: {
                firstname: "aaaa",
                lastname: "bbbb",
                alias: "cccc",
                imageUrl: "dddd"
            }
        };
        let [followers,followees] = await realServerFacade.unfollow(request);
        expect(followees === 999).toBe(true);
    });

    it("can check to see if a user follows another user", async () => {

        const request = {
            token: "12345",
            user: {
              firstname: "boo",
              lastname: "fart",
              alias: "nugget",
              imageUrl: "pee"
            },
            selectedUser: {
              firstname: "boo",
              lastname: "fart",
              alias: "nugget",
              imageUrl: "pee"
            }
        };
        let val = await realServerFacade.AskIfFollower(request);
        expect(val).toBe(true);
    });

    it("can change if someone is signaled as a follower", async () => {

        const request = {
            token: "12345",
            user: {
              firstname: "boo",
              lastname: "fart",
              alias: "nugget",
              imageUrl: "pee"
            },
            selectedUser: {
              firstname: "boo",
              lastname: "fart",
              alias: "nugget",
              imageUrl: "pee"
            },
            doesFollow: false
        };
        let val = await realServerFacade.setIsFollowerStatus(request);
        expect(val).toBe(true);
    });

    it("can post a status", async () => {

        const request = {
            "token": "value1",
            "user": {
              "post": "jargon",
              "user": {
                "firstname": "boo",
                "lastname": "fart",
                "alias": "nugget",
                "imageUrl": "pee"
              },
              "timestamp": 8
            }
          };
        let val = await realServerFacade.postStatus(request);
        expect(val).toBe(true);
    });

    */

});
