import { Status } from "tweeter-shared";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { StatusService } from "../model/service/StatusService";

// for now they are the same
export const PAGE_SIZE = 10;

export abstract class StatusItemPresenter extends PagedItemPresenter<Status,StatusService> {

    protected createService(): StatusService{
        return new StatusService();
    }

}