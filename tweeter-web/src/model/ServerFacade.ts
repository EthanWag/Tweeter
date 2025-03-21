import {
  PagedStatusItemRequest,
    TweeterRequest,
    TweeterResponse,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    Status,
    User,
    UserDto,
    StatusDto,
    CountResponse,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./network/ClientCommunicator";
import { PagedItemRequest } from "tweeter-shared/dist/model/net/request/PagedItemRequest";
import { PagedItemResponse } from "tweeter-shared/dist/model/net/response/PagedItemResponse";
import { CountFollowRequest } from '../../../tweeter-shared/dist/model/net/request/CountFollowRequest';
  
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

    private async callServer<T extends TweeterRequest,S extends TweeterResponse>(
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


  // make a function that handles all of these errors and lets the other functions know, so ya