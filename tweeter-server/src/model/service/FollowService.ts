import { User, FakeData, UserDto } from "tweeter-shared";
import { DAOProvider } from "../../DAO/DAOProvider";
import { FollowersDAO } from "../../DAO/DAOInterfaces/FollowersDAO";
import { AuthDAO } from "../../DAO/DAOInterfaces/AuthDAO";

export class FollowService {

  private readonly followersDAO: FollowersDAO;
  private readonly authDAO: AuthDAO;

  constructor() {
    const factory = new DAOProvider();
    this.followersDAO = factory.makeFollowersDAO();
    this.authDAO = factory.makeAuthDAO();

  }

  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize, userAlias)
  };
  
  public async loadMoreFollowees (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize, userAlias);
  };

  private async getFakeData(lastItem: UserDto | null, pageSize: number, userAlias: string): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(User.fromDto(lastItem), pageSize, userAlias);
    const dtos = items.map((user) => user.dto);
    return [dtos, hasMore];
  }

  public async getIsFollowerStatus(token: string, user: User, selectedUser: User): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  };

  public async getFolloweeCount(token: string,user: User): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  };

  public async getFollowerCount(token: string,user: User): Promise<number>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  };

  public async follow(token: string, userToFollow: User): Promise<[number,number]> {
    // first we need to grab the user that is requesting to follow
    const userAlias = await this.authDAO.getAlias(token);
    await this.followersDAO.addFollower(userAlias, userToFollow.alias);
    // we need to get the count of the followers and followees
    return [0,0];
  }

  public async unfollow(token: string, userToFollow: User): Promise<[number,number]> {
    const userAlias = await this.authDAO.getAlias(token);
    await this.followersDAO.removeFollower(userAlias, userToFollow.alias);
    // need someway of getting the updated counts
    return [999,999];
  }

  public async setIsFollowerStatus(token: string, user: User, selectedUser: User, isFollower: boolean): Promise<void> {
    // do logic here that sets the isFollower status
    return;
  }


}