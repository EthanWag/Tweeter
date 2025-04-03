import { Follow, User } from "tweeter-shared";
import { AuthService } from "../model/service/AuthService"
import { FollowService } from '../model/service/FollowService';

const main = async () => {

    let authService = new AuthService();
    let followService = new FollowService();

    const token = "77059278-49ca-4e67-89da-ded77c49b2d9"

    try{
        //const val1 = await authService.register("pipper", "boy", "pp", "notpassword", new Uint8Array(0), "png");
        //const val2 = await authService.register("John", "Doe", "johndoe", "password", new Uint8Array(0), "png");
        //console.log(val1)
        //console.log(val2)

        //const val3 =  await followService.follow(val1[1].token,val2[0])
        //console.log(val3)



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