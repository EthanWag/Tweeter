import { DAOFactory } from "./DAOFactories/DAOFactory";
import { DyanmoDAOFactory } from "./DAOFactories/DynamoDAOFactory";

export class DAOProvider {

    private factory: DAOFactory;

    constructor() {
        this.factory = new DyanmoDAOFactory(); // so you would change this if you wanted to swap databases
    }

    public makeUserDAO() {
        return this.factory.createUserDAO();
    }

    public makeFollowersDAO() {
        return this.factory.createFollowersDAO();
    }

    // add more of these in the future
}