import { AuthToken, User , Status } from 'tweeter-shared';
import { StatusService } from '../model/service/StatusService';

export interface PostView {
    setIsLoading: (isLoading: boolean) => void;
    displayInfoMessage: (message: string, duration: number) => void;
    displayErrorMessage: (message: string) => void;
    clearLastInfoMessage: () => void;
    setPost: (post: string) => void;
}

export class PostStatusPresenter {

    private view: PostView;
    private statusService: StatusService;

    public constructor(view: PostView) {
        this.view = view;
        this.statusService = new StatusService();
    }

    public async submitPost(event: React.MouseEvent, post: string, currentUser: User, authToken: AuthToken) {
        event.preventDefault();
        try {
          this.view.setIsLoading(true);
          this.view.displayInfoMessage("Posting status...", 0);
    
          const status = new Status(post, currentUser!, Date.now());
    
          await this.statusService.postStatus(authToken!, status);
    
          this.view.setPost("");
          this.view.displayInfoMessage("Status posted!", 2000);
        } catch (error) {
          this.view.displayErrorMessage(
            `Failed to post the status because of exception: ${error}`
          );
        } finally {
          this.view.clearLastInfoMessage();
          this.view.setIsLoading(false);
        }
      };




}