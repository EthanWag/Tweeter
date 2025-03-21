import {
  PagedStatusItemRequest,
    PagedStatusItemResponse,
    PagedUserItemRequest,
    PagedUserItemResponse,
    Status,
    TweeterRequest,
    TweeterResponse,
    User,
  } from "tweeter-shared";
  import { ClientCommunicator } from "./network/ClientCommunicator";
  
  export class ServerFacade {
    private SERVER_URL = "https://799n9hdm1i.execute-api.us-east-1.amazonaws.com/dev"; // ask about this a bit, seems like a security risk and it's might not remain the same
  
    private clientCommunicator = new ClientCommunicator(this.SERVER_URL);
  
    // duplicate code, please remove a lot of this
    public async getMoreFollowees(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.callServer<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/followee/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No followees found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred");
      }
    }

    public async getMoreFollowers(
      request: PagedUserItemRequest
    ): Promise<[User[], boolean]> {
      const response = await this.callServer<
        PagedUserItemRequest,
        PagedUserItemResponse
      >(request, "/follower/list");
  
      // Convert the UserDto array returned by ClientCommunicator to a User array
      const items: User[] | null =
        response.success && response.items
          ? response.items.map((dto) => User.fromDto(dto) as User)
          : null;
  
      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`No followers found`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred");
      }
    }

    public async getMoreStoryItems(
      request: PagedStatusItemRequest
    ): Promise<[Status[], boolean]> {
      const response = await this.callServer<
        PagedStatusItemRequest,
        PagedStatusItemResponse
      >(request, "/story/list");

      const items: Status[] | null =
        response.success && response.items
          ? response.items.map((dto) => Status.fromDto(dto) as Status)
          : null;

      // Handle errors    
      if (response.success) {
        if (items == null) {
          throw new Error(`Story unavailable`);
        } else {
          return [items, response.hasMore];
        }
      } else {
        console.error(response);
        throw new Error(response.message ?? "An unknown error occurred");
      }
    }


    private async callServer<T extends TweeterRequest,S extends TweeterResponse>(
        request: T,
        endpoint: string
      ): Promise<S> {
        return this.clientCommunicator.doPost<T, S>(
          request,
          endpoint
        );
      }

  }