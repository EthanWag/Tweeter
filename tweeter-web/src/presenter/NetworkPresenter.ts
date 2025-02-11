import { AuthToken , User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";

export interface NetworkView {
    displayErrorMessage: (message: string) => void;
}

export class NetworkPresenter {

    private view : NetworkView;
    private followService : FollowService;

    public constructor(private myView: NetworkView) {
        this.view = myView;
        this.followService = new FollowService();
    }

    public async setIsFollowerStatus(authToken: AuthToken,currentUser: User,displayedUser: User) {
        try {
            return currentUser === displayedUser 
                ? false 
                : await this.followService.getIsFollowerStatus(authToken!, currentUser!, displayedUser!);
        } catch (error) {
            this.view.displayErrorMessage(`Failed to determine follower status because of exception: ${error}`);
            return false;
        }
    };

    public async setNumbFollowees(authToken: AuthToken,displayedUser: User){
        try {
            return await this.followService.getFolloweeCount(authToken, displayedUser);
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to get followees count because of exception: ${error}`
            );
            return -1;
        }
    };

    public async setNumbFollowers(authToken: AuthToken,displayedUser: User){
        try {
            return await this.followService.getFollowerCount(authToken, displayedUser);
        } catch (error) {
            this.view.displayErrorMessage(
            `Failed to get followers count because of exception: ${error}`
            );
            return -1;
        }
    };

    public async follow(authToken: AuthToken,userToFollow: User): Promise<[followerCount: number, followeeCount: number]>{
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.followService.getFollowerCount(authToken, userToFollow);
        const followeeCount = await this.followService.getFolloweeCount(authToken, userToFollow);

        return [followerCount, followeeCount];
    };
  
    public async unfollow(authToken: AuthToken,userToUnfollow: User): Promise<[followerCount: number, followeeCount: number]>{
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.followService.getFollowerCount(authToken, userToUnfollow);
        const followeeCount = await this.followService.getFolloweeCount(authToken, userToUnfollow);

        return [followerCount, followeeCount];
    };

}