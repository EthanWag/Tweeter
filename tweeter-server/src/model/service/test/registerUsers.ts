import { User } from "tweeter-shared";
import { AuthService } from "../AuthService";
import { FollowService } from "../FollowService";


async function registerUsers():Promise<void>{

    const userToFollow = new User("Carol","Bergman" ,"@C" , "https://tweeterbin.s3.us-east-1.amazonaws.com/image/@C-profile-picture.jpg" )

    const firstName = "dumby"
    const lastName = "dumby"
    const alias = "@dumby"
    const password = "admin";

    const authService = new AuthService();
    const followService = new FollowService();

    for(let i = 0; i < 10000; i++){
        console.log("Registering user " + i);
        const[user,auth] = await authService.register(
            firstName,
            lastName,
            alias + i,
            password,
            new Uint8Array(0),
            "test"
        )

        await followService.follow(auth.token, userToFollow);
    }
}

registerUsers();
