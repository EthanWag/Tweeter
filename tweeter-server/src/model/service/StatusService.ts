import { AuthToken, FakeData, StatusDto, Status} from "tweeter-shared";

export class StatusService {
    public async loadMoreFeedItems (
        authToken: string,
        alias: string,
        pageSize: number,
        lastItem: StatusDto | null // we need to make a status dto
      ): Promise<[StatusDto[], boolean]> {
        // Please note, that this function requires a binded this, otherwise the function will not work as intended
        return this.getFakeData(lastItem, pageSize);
      }

      public async loadMoreStoryItems (
        authToken: string,
        alias: string,
        pageSize: number,
        lastItem: StatusDto | null
      ): Promise<[StatusDto[], boolean]> {
        // Please note, that this function requires a binded this, otherwise the function will not work as intended
        return this.getFakeData(lastItem, pageSize);
      };

      private async getFakeData(lastItem: StatusDto | null, pageSize: number): Promise<[StatusDto[], boolean]> {
        const [items, hasMore] = FakeData.instance.getPageOfStatuses(Status.fromDto(lastItem), pageSize);
        const dtos = items.map((status) => status.dto);
        return [dtos, hasMore];
      }

      public async postStatus(authToken: AuthToken,newStatus: Status): Promise<void> {
        // Pause so we can see the logging out message. Remove when connected to the server
        await new Promise((f) => setTimeout(f, 2000));
    
        // TODO: Call the server to post the status
      };
}