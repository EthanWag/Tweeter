import { User, UserDto } from "tweeter-shared";
import { DAOProvider } from "../../DAO/DAOProvider";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";
import { FollowersDAO } from "../../DAO/DAOInterfaces/FollowersDAO";
import { FolloweesDAO } from "../../DAO/DAOInterfaces/FolloweesDAO";
import { UserDAO } from "../../DAO/DAOInterfaces/UserDAO";
import { ServiceResources } from "./ServiceResources";

export class FollowService {

  private readonly userDAO: UserDAO;
  private readonly followersDAO: FollowersDAO;
  private readonly followeesDAO: FolloweesDAO;
  private readonly authDAO: AuthDAO;
  private readonly serverResources: ServiceResources;

  constructor() {
    const factory = new DAOProvider();
    this.userDAO = factory.makeUserDAO();
    this.followersDAO = factory.makeFollowersDAO();
    this.followeesDAO = factory.makeFolloweesDAO();
    this.authDAO = factory.makeAuthDAO();

    this.serverResources = new ServiceResources();
  }

  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {

    await this.serverResources.checkAuth(token, userAlias);

    const userFollowsAlias = await this.followersDAO.getFollowersPaged(userAlias, lastItem ? lastItem.alias : null, pageSize);

    // this is nasty but it should work
    const dtos = await Promise.all(userFollowsAlias!.map(async(alias) => (await this.userDAO.getUser(alias)).dto));
    const hasMore = dtos.length === pageSize;
    return [dtos,hasMore]
  }
  
  public async loadMoreFollowees (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    const userFollowsAlias = await this.followeesDAO.getFolloweesPaged(userAlias, lastItem ? lastItem.alias : null, pageSize);

    // this is nasty but it should work
    const dtos = await Promise.all(userFollowsAlias!.map(async(alias) => (await this.userDAO.getUser(alias)).dto));
    const hasMore = dtos.length === pageSize; // this would cause a problem if there were actually where pageSize items
    return [dtos,hasMore]
  }

  public async getFolloweeCount(token: string,user: User): Promise<number> {
    await this.serverResources.checkAuth(token,user.alias);
    return await this.followeesDAO.getFolloweesCount(user.alias);
  }

  public async getFollowerCount(token: string,user: User): Promise<number>{
    await this.serverResources.checkAuth(token,user.alias);
    return await this.followersDAO.getFollowersCount(user.alias);
  }

  public async follow(token: string, userToFollow: User): Promise<[number,number]> {
    // first we need to grab the user that is requesting to follow
    const userAlias = await this.authDAO.getAlias(token); // this will throw an error if the token is invalid

    await this.followersDAO.addFollower(userAlias, userToFollow.alias);
    await this.followeesDAO.addFollowee(userToFollow.alias, userAlias);
    const followerCount = await this.followersDAO.getFollowersCount(userAlias);
    const followeeCount = await this.followeesDAO.getFolloweesCount(userAlias);
    
    return [followerCount,followeeCount];
  }

  public async unfollow(token: string, userToFollow: User): Promise<[number,number]> {

    const userAlias = await this.authDAO.getAlias(token); // this will throw an error if the token is invalid
    
    await this.followersDAO.removeFollower(userAlias, userToFollow.alias);
    await this.followeesDAO.removeFollowee(userToFollow.alias, userAlias);
    const followerCount = await this.followersDAO.getFollowersCount(userAlias);
    const followeeCount = await this.followeesDAO.getFolloweesCount(userAlias);

    return [followerCount,followeeCount];
  }

  public async setIsFollowerStatus(token: string, user: User, selectedUser: User, isFollower: boolean): Promise<void> {
    await this.serverResources.checkAuth(token,user.alias);
    await this.followersDAO.setIsFollower(user.alias, selectedUser.alias, isFollower);
  }

  public async getIsFollowerStatus(token: string, user: User, selectedUser: User): Promise<boolean> {
    await this.serverResources.checkAuth(token,user.alias);
    return await this.followersDAO.doesFollow(user.alias, selectedUser.alias);
  }
}