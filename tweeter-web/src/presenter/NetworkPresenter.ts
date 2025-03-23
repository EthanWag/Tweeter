import { AuthToken , User } from "tweeter-shared";
import { FollowService } from "../model/service/FollowService";
import { NetworkView, Presenter } from "./Presenter";

export class NetworkPresenter extends Presenter<NetworkView>{

    private followService : FollowService;

    public constructor(view: NetworkView) {
        super(view);
        this.followService = new FollowService();
    }

    public async setIsFollowerStatus(authToken: AuthToken,currentUser: User,displayedUser: User) {
        
    this.doTryOperation(async () => {
        this.view.setIsFollower(
            currentUser === displayedUser 
                ? false 
                : await this.followService.getIsFollowerStatus(authToken.token!, currentUser!, displayedUser!)
            );
        },"determine follower status");
    };

    public async setNumbFollowees(authToken: AuthToken,displayedUser: User){
        this.doTryOperation(async () => {
            this.view.setFolloweeCount(
                await this.followService.getFolloweeCount(authToken.token,displayedUser)
            );
        },"get followees count");
    };

    public async setNumbFollowers(authToken: AuthToken,displayedUser: User){
        this.doTryOperation(async () => {
            this.view.setFollowerCount(
                await this.followService.getFollowerCount(authToken.token,displayedUser)
            );
        },"get followers count");
    };


    // these two I'll leave in even thought they are duplicate, this is because their funcationallity can change
    public async follow(authToken: AuthToken,userToFollow: User): Promise<[followerCount: number, followeeCount: number]>{
        // Pause so we can see the follow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.followService.getFollowerCount(authToken.token, userToFollow);
        const followeeCount = await this.followService.getFolloweeCount(authToken.token, userToFollow);

        return [followerCount, followeeCount];
    };
  
    public async unfollow(authToken: AuthToken,userToUnfollow: User): Promise<[followerCount: number, followeeCount: number]>{
        // Pause so we can see the unfollow message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));

        // TODO: Call the server

        const followerCount = await this.followService.getFollowerCount(authToken.token, userToUnfollow);
        const followeeCount = await this.followService.getFolloweeCount(authToken.token, userToUnfollow);

        return [followerCount, followeeCount];
    };

}