import {
  PagedStatusItemRequest,
    TweeterRequest,
    TweeterResponse,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    Status,
    User,
    AuthToken,
    UserDto,
    StatusDto,
    CountFollowRequest,
    CountResponse,
    IsFollowRequest,
    PagedItemRequest,
    PagedItemResponse,
    IsValidResponse,
    GetUserRequest,
    GetUserResponse,
    NoAuthTweeterRequest,
    isNull,
    LoginRequest,
    AuthPassResponse,
    RegisterRequest,
    FollowRequest,
    FollowResponse,
    SetIsFollowerRequest,
    PostStatusRequest
  } from "tweeter-shared";
  import { ClientCommunicator } from "./network/ClientCommunicator";
  
  export class ServerFacade {
    private SERVER_URL = "https://799n9hdm1i.execute-api.us-east-1.amazonaws.com/dev"; // ask about this a bit, seems like a security risk and it's might not remain the same
  
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  
    public async getMoreFollowees(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      try{
        const response = this.makePagedRequest<UserDto,User,PagedUserItemRequest,PagedUserItemResponse>(
          request,
          "/followee/list",
          (dto) => User.fromDto(dto) as User,
          "Followees unavailable"
        )
        return response;
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async getMoreFollowers(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      try{
        const response = this.makePagedRequest<UserDto,User,PagedUserItemRequest,PagedUserItemResponse>(
          request,
          "/follower/list",
          (dto) => User.fromDto(dto) as User,
          "Followers unavailable"
        )
        return response;
      
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async getMoreStoryItems(
      request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
      try{
        const response = this.makePagedRequest<StatusDto,Status,PagedStatusItemRequest,PagedStatusItemResponse>(
          request,
          "/story/list",
          (dto) => Status.fromDto(dto) as Status,
          "Story unavailable"
        )
        return response;
      
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async getMoreFeedItems(
      request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
      try{
        const response = this.makePagedRequest<StatusDto,Status,PagedStatusItemRequest,PagedStatusItemResponse>(
          request,
          "/feed/list",
          (dto) => Status.fromDto(dto) as Status,
          "Feed unavailable"
        )
        return response;
      
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async getFolloweeCount(request:CountFollowRequest): Promise<number>{
      try{
        const response = await this.callServer<CountFollowRequest,CountResponse>(
          request,
          "/followee/count"
        )
        return response.count;
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async getFollowerCount(request:CountFollowRequest): Promise<number>{
      try{
        const response = await this.callServer<CountFollowRequest,CountResponse>(
          request,
          "/follower/count"
        )
        return response.count;
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async AskIfFollower(request:IsFollowRequest): Promise<boolean>{
      try{
        const response = await this.callServer<IsFollowRequest,IsValidResponse>(
          request,
          "/follower/check"
        )
        return response.valid;
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async GetUser(request:GetUserRequest): Promise<[User|null,boolean]>{
      try{
        const response = await this.callServer<GetUserRequest,GetUserResponse>(
          request,
          "/post/user"
        )

        let user: User | null = null;

        if(!isNull(response.user)){
          user = User.fromDto(response.user);
        }

        return [user, response.found];
      }catch(error){
          console.error(error);
          throw error;
      }
    }

    public async login(request: LoginRequest): Promise<[User|null,AuthToken|null, boolean]> {
      try {
        const response = await this.callServer<LoginRequest, AuthPassResponse>(
          request,
          "/auth/login"
        );
        let user = null;
        let token = null;

        if(response.valid){
          user = User.fromDto(response.user);
          token = AuthToken.fromDto(response.authToken);
        }

        return [user, token, response.valid];
      } catch (error) {
        console.error(error);
        throw error;
      }
    }

    public async register(request: RegisterRequest): Promise<[User|null,AuthToken|null, boolean]> {
      try {
        const response = await this.callServer<RegisterRequest, AuthPassResponse>(
          request,
          "/auth/register"
        );
        // duplicate code, you can probaly get rid of some of this stuff
        let user = null;
        let token = null;

        if(response.valid){
          user = User.fromDto(response.user);
          token = AuthToken.fromDto(response.authToken);
        }

        return [user, token, response.valid];
      } catch (error) {
        console.error(error);
        throw error
      }
    }

    public async follow(request: FollowRequest):Promise<[number,number]>{
      try {
        const response = await this.callServer<FollowRequest, FollowResponse>(
          request,
          "/follow"
        );
        return [response.followerCount, response.followeeCount];
      } catch (error) {
        console.error(error);
        throw error
      }
    }

    public async unfollow(request:FollowRequest):Promise<[number,number]>{
      try {
        const response = await this.callServer<FollowRequest, FollowResponse>(
          request,
          "/unfollow"
        );
        return [response.followerCount, response.followeeCount];
      } catch (error) {
        console.error(error);
        throw error
      }
    }

    public async setIsFollowerStatus(request:SetIsFollowerRequest):Promise<boolean>{
      try {
        const response = await this.callServer<SetIsFollowerRequest, IsValidResponse>(
          request,
          "/follower/set"
        );
        return response.valid // this will tell you if you were successful
      } catch (error) {
        console.error(error);
        throw error
      }
    }

    public async postStatus(request:PostStatusRequest):Promise<boolean>{
      try {
        const response = await this.callServer<PostStatusRequest, IsValidResponse>(
          request,
          "/post/deploy"
        );
        return response.valid
      } catch (error) {
        console.error(error);
        throw error
      }


    }

    private async makePagedRequest<D extends UserDto | StatusDto ,O extends User | Status,T extends PagedItemRequest<D>,S extends PagedItemResponse<D>>(
      request: T, 
      endpoint: string,
      converter: (dto: D) => O,
      errorMsg: string
    ): Promise<[O[], boolean]>
    {
      try{
      let response = await this.callServer<T,S>(request, endpoint);
      const items: O[] | null = response.items
      ? response.items.map(converter): null;

      if(items == null){
        throw new Error(errorMsg);
      }
      return [items, response.hasMore];
      }catch(error){
        throw error;
      }
    }

    private async callServer<T extends TweeterRequest | NoAuthTweeterRequest ,S extends TweeterResponse>(
        request: T,
        endpoint: string
      ): Promise<S> {
        return this.clientCommunicator.doPost<T, S>(
          request,
          endpoint
        ).then((response) => {
          if (response.success) {
            return response;
          } else {
            throw new Error(response.message ?? "An unknown error occurred");
          }
        }).catch((error) => {
          throw error;
        }
      )
    }
  }