import { DAOFactory } from "./DAOFactories/DAOFactory";

export class DAOProvider {

    private factory: DAOFactory;

    constructor(factory: DAOFactory) {
        this.factory = factory;
    }

    public makeUserDAO() {
        return this.factory.createUserDAO();
    }

    public makeFollowersDAO() {
        return this.factory.createFollowersDAO();
    }

    // add more of these in the future
}