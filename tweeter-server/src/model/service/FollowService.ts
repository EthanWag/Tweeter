import { AuthToken, User, FakeData, UserDto } from "tweeter-shared";

export class FollowService {
  public async loadMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[User[], boolean]> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfUsers(this.getDomainObject(lastItem), pageSize, userAlias);
  };
  
  public async loadMoreFollowees (
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null
  ): Promise<[UserDto[], boolean]> {
    // TODO: Replace with the result of calling server
    const [items,hasMore] = FakeData.instance.getPageOfUsers(this.getDomainObject(lastItem), pageSize, userAlias);
    const dtos = items.map((user) => this.createDto(user));
    return [dtos, hasMore];
  };

  private createDto(user: User) : UserDto {
    return {
      firstname: user.firstName,
      lastname: user.lastName,
      alias: user.alias,
      imageUrl: user.imageUrl
    }
  }

  private getDomainObject(dto: UserDto | null): User | null {
     return dto == null ? null : new User(dto.firstname, dto.lastname, dto.alias, dto.imageUrl);
  }

  public async getIsFollowerStatus(authToken: AuthToken, user: User, selectedUser: User): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  };

  public async getFolloweeCount(authToken: AuthToken,user: User): Promise<number> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFolloweeCount(user.alias);
  };

  public async getFollowerCount(authToken: AuthToken,user: User): Promise<number>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  };


}