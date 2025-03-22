import {AuthToken,User,FakeData} from "tweeter-shared";
import { Buffer } from "buffer";

export class AuthService {

  // these two functions require data so that's good
  public async login(alias: string,password: string): Promise<[User, AuthToken]>{

    const user = FakeData.instance.firstUser; // This one will need to be replaced by a server call

    if (user === null) {
      throw new Error("Invalid alias or password");
    }
    return [user, FakeData.instance.authToken]; // This one will need to be replaced by a server call
  };

  public async register(
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string
  ): Promise<[User, AuthToken]>{
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }
    return [user, FakeData.instance.authToken];
  };

  public async logout(authToken: AuthToken): Promise<void>{
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };

}