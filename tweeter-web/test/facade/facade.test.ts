import { mock, instance, spy, verify, when, capture, anything } from "@typestrong/ts-mockito"
import 'whatwg-fetch';

import { ServerFacade } from "../../src/model/ServerFacade";
import { RegisterRequest } from '../../../tweeter-shared/dist/model/net/request/RegisterRequest';

describe("Server Facade", () => {

    it("can register a new user with the server", async () => {
    
        const spyServerFacade = spy(new ServerFacade());
        const realServerFacade = instance(spyServerFacade);

        const request: RegisterRequest = {
            firstName: "aaaa",
            lastName: "bbbb",
            alias: "cccc",
            password: "dddd",
            userImageBytes: "eeee",
            imageFileExtension: "ffff"
        };

        const res = await realServerFacade.register(request);

        console.log(res)

    });
});