import { AuthToken, FakeData, Status } from "tweeter-shared";


export class StatusService {
    // TODO: Implement the StatusService class

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
}