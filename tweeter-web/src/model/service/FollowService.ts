import { AuthToken, User, PagedUserItemRequest, UserDto, CountFollowRequest, isNull, IsFollowRequest } from "tweeter-shared";
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
  let facade = new ServerFacade();
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

private askRequestBuilder(authToken: string, user: User, selectedUser: User): IsFollowRequest {

  // redundent
  if (isNull(user)) {
    user = new User("", "", "", "");
  }
  if (isNull(selectedUser)) {
    selectedUser = new User("", "", "", "");
  }

  return {
    token: authToken,
    user: this.toDto(user)!,
    selectedUser: this.toDto(selectedUser)!
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
    const facade = new ServerFacade();
    return facade.AskIfFollower(this.askRequestBuilder(token, user, selectedUser));
  };

  public async getFolloweeCount(token: string,user: User): Promise<number> {
    const facade = new ServerFacade();
    return facade.getFolloweeCount(this.countRequestBuilder(token, user));
  };

  public async getFollowerCount(token: string,user: User): Promise<number>{
    const facade = new ServerFacade();
    return facade.getFollowerCount(this.countRequestBuilder(token, user));
  };

  public async follow(): Promise<boolean> {
    return true;
  };

  public async unfollow(): Promise<boolean> {
    return true;
  };


}