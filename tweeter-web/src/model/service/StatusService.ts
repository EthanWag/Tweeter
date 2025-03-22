import { AuthToken, PagedStatusItemRequest, Status, StatusDto } from "tweeter-shared";
import { ServerFacade } from "../ServerFacade";

export class StatusService {
    public async loadMoreFeedItems (
        authToken: AuthToken,
        alias: string,
        pageSize: number,
        lastItem: Status | null
      ): Promise<[Status[], boolean]> {
        let facade = new ServerFacade();
        return facade.getMoreFeedItems(this.followeesRequestBuilder(authToken, alias, pageSize, lastItem));
      }

      public async loadMoreStoryItems (
        authToken: AuthToken,
        alias: string,
        pageSize: number,
        lastItem: Status | null
      ): Promise<[Status[], boolean]> {
        let facade = new ServerFacade();
          return facade.getMoreStoryItems(this.followeesRequestBuilder(authToken, alias, pageSize, lastItem));
      };


      // nice clean functions
      // =============================================================================================================

      // this can be made a generic function, for now though it works for the followees
      private followeesRequestBuilder(authToken: AuthToken, userAlias: string,pageSize: number, lastItem: Status | null): PagedStatusItemRequest {
        return {
          token: authToken.token,
          userAlias: userAlias,
          pageSize: pageSize,
          lastItem: this.toDto(lastItem)
        }
      }

      // same here to, this could be made into a generic function
      private toDto(status: Status | null): StatusDto | null {

        return status == null ? null : {
          post: status.post,
          user: status.user.dto,
          timestamp: status.timestamp
        }
      }

      // =============================================================================================================

      public async postStatus(authToken: AuthToken,newStatus: Status): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
        // end point here
      };
}