import { Follow, User } from "tweeter-shared";
import { AuthService } from "../model/service/AuthService"
import { FollowService } from '../model/service/FollowService';

const main = async () => {

    const service = new FollowService();
    const madeUpUser = new User("userAlias", "firstName", "lastName", "imageUrl");
    
    try{
        await service.follow("token", madeUpUser);
        console.log("followed");
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


