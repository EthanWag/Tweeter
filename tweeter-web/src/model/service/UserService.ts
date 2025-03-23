import { AuthToken, User, ImageCompressor } from "tweeter-shared";
import { ServerFacade } from "../ServerFacade";

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
    image: Uint8Array, // note, this had the following name userImageBytes
    imageFileExtension: string
  ): Promise<[User, AuthToken]>{

    // Convert the image to a base64 string, so that it can be sent
    const compressor = new ImageCompressor();
    const userImageBytes = await compressor.compressImage(image,imageFileExtension);

    const facade = new ServerFacade();
    const [user, token, valid] = await facade.register({
      firstName,
      lastName,
      alias,
      password,
      userImageBytes,
      imageFileExtension
    });
    // NOTE: you can use the valid to check to see if the register was successful
    return [user!, token!];
  };

  public async logout(authToken: AuthToken): Promise<void>{
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };

}