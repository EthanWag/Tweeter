import { AuthToken, User , Status } from 'tweeter-shared';
import { StatusService } from '../model/service/StatusService';
import { PostView, Presenter } from './Presenter';



export class PostStatusPresenter extends Presenter<PostView> {

    private _statusService: StatusService | null = null;

    public constructor(view: PostView) {
        super(view);
    }

    public get statusService() {
        if(this._statusService === null) {
            this._statusService = new StatusService();
        }
        return this._statusService;
    }

    public async submitPost(event: React.MouseEvent | null, post: string, currentUser: User, authToken: AuthToken) {
        if(event){
                    event.preventDefault();
        }
        
        this.doUpdateOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);
            const status = new Status(post, currentUser!, Date.now());
            await this.statusService.postStatus(authToken!, status);
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        },
        "post the status",
        this.view);

        this.view.clearLastInfoMessage();
    }




}