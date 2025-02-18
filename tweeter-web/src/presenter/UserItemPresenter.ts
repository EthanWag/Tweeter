import { User } from "tweeter-shared";
import { PagedItemPresenter } from "./PagedItemPresenter";
import { FollowService } from "../model/service/FollowService";

export const PAGE_SIZE = 10;

export abstract class UserItemPresenter extends PagedItemPresenter<User,FollowService>{

    protected createService(): FollowService{
        return new FollowService();
    }
}