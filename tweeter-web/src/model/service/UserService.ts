import { AuthToken, User, FakeData } from "tweeter-shared";
import { ServerFacade } from "../ServerFacade";
import { Buffer } from "buffer";

export class UserService {

  // these two functions require data so that's good
  public async login(alias: string,password: string): Promise<[User, AuthToken]>{
    const facade = new ServerFacade();

    // NOTE: This is a temporary solution; user and token could be null
    // valid, should let you know if the login was successful, so use it to check if it was successful
    const [user,token,valid] = await facade.login({alias, password});
    return [user!, token!];
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

    // TODO: Replace with the result of calling the server
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