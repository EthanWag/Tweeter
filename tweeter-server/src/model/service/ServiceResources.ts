import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";
import { DAOProvider } from "../../DAO/DAOProvider";

export class ServiceResources {

    private readonly authDAO: AuthDAO;

    constructor() {
        const factory = new DAOProvider();
        this.authDAO = factory.makeAuthDAO();
    }

    public async checkAuth(token: string, alias: string): Promise<void> {

        const isAuthorized = await this.authDAO.isAuthorized(token,alias);
        if(!isAuthorized){
        throw new Error("Unauthorized");
        }
    }
}


