import { AuthToken, User , Status } from 'tweeter-shared';
import { StatusService } from '../model/service/StatusService';
import { PostView, Presenter } from './Presenter';



export class PostStatusPresenter extends Presenter<PostView> {

    private statusService: StatusService;

    public constructor(view: PostView) {
        super(view);
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