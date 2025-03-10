import { AuthToken, FakeData, Status } from "tweeter-shared";


export class StatusService {
    public async loadMoreFeedItems (
        authToken: AuthToken,
        alias: string,
        pageSize: number,
        lastItem: Status | null
      ): Promise<[Status[], boolean]> {
        // Please note, that this function requires a binded this, otherwise the function will not work as intended
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
      }

      public async loadMoreStoryItems (
        authToken: AuthToken,
        alias: string,
        pageSize: number,
        lastItem: Status | null
      ): Promise<[Status[], boolean]> {
        // Please note, that this function requires a binded this, otherwise the function will not work as intended
        return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
      };

      public async postStatus(authToken: AuthToken,newStatus: Status): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };
}