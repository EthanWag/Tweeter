import { AuthToken, User , Status } from 'tweeter-shared';
import { StatusService } from '../model/service/StatusService';
import { PostView, Presenter } from './Presenter';
import { PostsService } from '../model/service/PostService';



export class PostStatusPresenter extends Presenter<PostView> {

    private _postService: PostsService | null = null;

    public constructor(view: PostView) {
        super(view);
    }

    public get postService() {
        if(this._postService === null) {
            this._postService = new PostsService();
        }
        return this._postService;
    }

    public async submitPost(event: React.MouseEvent | null, post: string, currentUser: User, authToken: AuthToken) {
        if(event){
            event.preventDefault();
        }
        this.doUpdateOperation(async () => {
            this.view.displayInfoMessage("Posting status...", 0);
            const status = new Status(post, currentUser!, Date.now());
            await this.postService.postStatus(authToken!, status);
            this.view.setPost("");
            this.view.displayInfoMessage("Status posted!", 2000);
        },
        "post the status",
        this.view);

        this.view.clearLastInfoMessage();
    }




}