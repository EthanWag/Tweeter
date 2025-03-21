import { AuthToken, User, FakeData, PagedUserItemRequest, UserDto, CountFollowRequest, isNull } from "tweeter-shared";
import { ServerFacade } from "../ServerFacade";

export class FollowService {
  public async loadMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null
  ): Promise<[User[], boolean]> {
    let facade = new ServerFacade();
    return facade.getMoreFollowers(this.followRequestBuilder(authToken, userAlias, pageSize, lastItem));
  };

public async loadMoreFollowees (
  authToken: AuthToken,
  userAlias: string,
  pageSize: number,
  lastItem: User | null
): Promise<[User[], boolean]> {
  let facade = new ServerFacade(); // I don't know if I like this
  return facade.getMoreFollowees(this.followRequestBuilder(authToken, userAlias, pageSize, lastItem));
};

// nice clean functions
// =============================================================================================================

// this can be made a generic function, for now though it works for the followees
private followRequestBuilder(authToken: AuthToken, userAlias: string,pageSize: number, lastItem: User | null): PagedUserItemRequest {

  return {
    token: authToken.token,
    userAlias: userAlias,
    pageSize: pageSize,
    lastItem: this.toDto(lastItem)
  }
}

private countRequestBuilder(authToken: string, user: User): CountFollowRequest {
  let myUser = user;
  if (isNull(user)) {
    myUser = new User("", "", "", "");
  }
  return {
    token: authToken,
    user: this.toDto(myUser)!
  }
}

// same here to, this could be made into a generic function
private toDto(user: User | null): UserDto | null {

  return user == null ? null : {
    firstname: user.firstName,
    lastname: user.lastName,
    alias: user.alias,
    imageUrl: user.imageUrl
  }
}

// =============================================================================================================

  // btw, these are going to all be strings 

  public async getIsFollowerStatus(token: string, user: User, selectedUser: User): Promise<boolean> {
    // TODO: Replace with the result of calling server
    return FakeData.instance.isFollower();
  };

  public async getFolloweeCount(token: string,user: User): Promise<number> {
    const facade = new ServerFacade();

    let test = this.countRequestBuilder(token, user);

    console.log(test);

    return facade.getFolloweeCount(test);
  };

  public async getFollowerCount(token: string,user: User): Promise<number>{
    // TODO: Replace with the result of calling server
    return FakeData.instance.getFollowerCount(user.alias);
  };


}