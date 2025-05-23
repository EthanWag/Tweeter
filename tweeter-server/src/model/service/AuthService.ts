import { AuthToken, User } from "tweeter-shared";
import { DAOProvider } from "../../DAO/DAOProvider";
import { UserDAO } from "../../DAO/DAOInterfaces/UserDAO";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";

import { Buffer } from "buffer";
import  bcrypt  from "bcryptjs"

export class AuthService {

  private readonly userDAO: UserDAO;
  private readonly authDAO: AuthDAO;

  constructor(){
    const factory = new DAOProvider();
    this.userDAO = factory.makeUserDAO();
    this.authDAO = factory.makeAuthDAO();
  }

  // these two functions require data so that's good
  public async login(alias: string,password: string): Promise<[User, AuthToken]>{

    const encryptedPassword = await this.userDAO.getPassword(alias);

    // checks the password here, if it is not correct it will throw an error
    if(!await bcrypt.compare(password, encryptedPassword)){
      throw new Error("Invalid password");
    }

    const authToken = await this.authDAO.createAuth(alias);
    const user = await this.userDAO.getUser(alias);
    
    return [user, authToken]; // This one will need to be replaced by a server call
  }
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

    const encryptedPassword = await bcrypt.hash(password, 5);
    // const encryptedPassword = password; // for the life of me, bcrypt does want to courprate, so no encryption


    const user = await this.userDAO.createUser(alias, firstName, lastName, encryptedPassword, imageStringBase64, imageFileExtension);
    const authToken = await this.authDAO.createAuth(alias);

    // you will want to create a better check than this
    return [user, authToken];
  }

  // pretty sure I need a lambda for this
  public async logout(authToken: AuthToken): Promise<void>{
    // go back to how it was before
    await this.authDAO.deleteAuth(authToken.token);
  }
}