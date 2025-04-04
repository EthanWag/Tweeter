import { Follow, Status, User } from "tweeter-shared";
import { AuthService } from "../model/service/AuthService"
import { FollowService } from '../model/service/FollowService';
import { PostsService } from "../model/service/PostService";
import { StatusService } from "../model/service/StatusService";

const main = async () => {

    let authService = new AuthService();
    let followService = new FollowService();
    let postService = new PostsService();
    let statusService = new StatusService();

    try{
      
        const val1 = await authService.register("Peter", "Griffin", "@BrianTheDog", "roadhouse", new Uint8Array(1), "png");
        // const val2 = await authService.register("Luke", "Skywalker", "@JediLover", "R2D2", new Uint8Array(4), "png");
        for(let i = 0; i < 30; i++){
            let hmmmmmmmmmmm = ""
            for(let j = 0; j < i; j++){
                hmmmmmmmmmmm += "!"
            }

            postService.postStatus(val1[1].token, new Status("Shutup Meg" + hmmmmmmmmmmm, new User("Peter", "Griffin", "@BrianTheDog", "imageUrl"), i * 4 / 2 - 17));
        }

        //console.log(val1)
        //console.log(val2)

        /*
        for(let i = 0; i < 15; i++){
            const status = new Status("This is a test post",new User("Doe", "John", "johndoe", "imageUrl"),85 + i);
            await postService.postStatus(token,status);
        }

        const val3 = await statusService.loadMoreStoryItems(token, "johndoe",10, null);
        console.log(val3);
        const val4 =  await statusService.loadMoreFeedItems(feedToken, "pp", 10, null);
        console.log(val4);
        */


    }catch(error:any){
        console.log(error);
    }

}

main();


// old tests

    /*
    let service = new AuthService();

    try{
        const val = await service.register("John", "Doe", "johndoe", "password", new Uint8Array(0), "png");
        console.log(val)
    }catch(error:any){
        console.log(error);
    }
    */

    /*
    const service = new FollowService();
    const madeUpUser = new User("userAlias", "firstName", "lastName", "imageUrl");
    
    await service.follow("token", madeUpUser);
    */



    /*

    let authService = new AuthService();
    let followService = new FollowService();

    try{
        // const val1 = await authService.register("pipper", "boy", "pp", "notpassword", new Uint8Array(0), "png");
        // const val2 = await authService.register("John", "Doe", "johndoe", "password", new Uint8Array(0), "png");
        // console.log(val1)
        // console.log(val2)

        const val3 =  await authService.login("johndoe", "differentpassword");
        console.log(val3)
    }catch(error:any){
        console.log(error);
    }
    */


        /*
        const val4 = await followService.loadMoreFollowers(token, "pp", 10, null);

        const val5 = await followService.loadMoreFollowers(token, "pp", 10, val4[0][val4[0].length - 1]);
        console.log(val4);
        console.log("done with first round");
        console.log(val5);
        */