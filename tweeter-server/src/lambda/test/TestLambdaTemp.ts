import { handler } from '../follow/GetFollowersLambda';
import { PagedUserItemRequest, PagedUserItemResponse  } from "tweeter-shared";


async function main(){
    const request: PagedUserItemRequest = {
        token: "",
        userAlias: "",
        pageSize: 0,
        lastItem: null
    };

    await handler(request);

}

main();