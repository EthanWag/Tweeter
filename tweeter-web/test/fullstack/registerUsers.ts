import {ServerFacade} from "../../src/model/ServerFacade";
import {User} from "tweeter-shared";


async function registerUsers(server:ServerFacade,userToFollow:User):Promise<void>{

    const firstName = "dumby"
    const lastName = "dumby"
    const alias = "@dumby"
    const password = "admin";

    for(let i = 0; i < 10000; i++){
        console.log("Registering user " + i);
        const[user,auth] = await server.register({alias: alias + 1, 
                        password: password, 
                        firstName: firstName, 
                        lastName: lastName,
                        userImageBytes: "nada",
                        imageFileExtension: "nada"})

        if(user === null || auth === null) {
            throw new Error("Registration failed");
        }

        await server.follow({user: userToFollow.dto, token: auth.token});
    }
}

await registerUsers(new ServerFacade(),new User("Carol","Bergman" ,"@C" , "https://tweeterbin.s3.us-east-1.amazonaws.com/image/@C-profile-picture.jpg" ))
