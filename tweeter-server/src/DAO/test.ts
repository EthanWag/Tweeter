import { Follow, User } from "tweeter-shared";
import { AuthService } from "../model/service/AuthService"
import { FollowService } from '../model/service/FollowService';

const main = async () => {

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