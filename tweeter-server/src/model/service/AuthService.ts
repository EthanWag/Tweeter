import {AuthToken,User,FakeData} from "tweeter-shared";
import { UserDAO } from "../../DAO/DAOInterfaces/UserDAO";
import { UserDAODynamoDB } from "../../DAO/DAOImplementations/Dynamo/UserDAODynamoDB";
import { Buffer } from "buffer";
import { DAOProvider } from "../../DAO/DAOProvider";
import { DyanmoDAOFactory } from "../../DAO/DAOFactories/DynamoDAOFactory";
import { DAOFactory } from "../../DAO/DAOFactories/DAOFactory";

export class AuthService {

  private userDAO: UserDAO;

  constructor(){
    const factory = new DAOProvider(new DyanmoDAOFactory());
    this.userDAO = factory.makeUserDAO();
  }

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

    const user = await this.userDAO.createUser(alias, firstName, lastName, password, imageStringBase64, imageFileExtension);

    // you will want to create a better check than this

    // check in the lambda function
    return [user, FakeData.instance.authToken];
  };

  public async logout(authToken: AuthToken): Promise<void>{
    // Pause so we can see the logging out message. Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };

}