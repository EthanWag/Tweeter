import "./PostStatus.css";
import { useState } from "react";

import { PostView } from "../../presenter/Presenter";
import { PostStatusPresenter } from "../../presenter/PostStatusPresenter";

import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../hooks/useUserInfo";

interface Props {
  presenterGenerator: (view: PostView) => PostStatusPresenter;
}

const PostStatus = (props:Props) => {
const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
  useToastListener();

const { currentUser, authToken } = useUserInfo();
const [post, setPost] = useState("");
const [isLoading, setIsLoading] = useState(false);

const listener: PostView = {
  setIsLoading: setIsLoading,
  displayInfoMessage: displayInfoMessage,
  displayErrorMessage: displayErrorMessage,
  clearLastInfoMessage: clearLastInfoMessage,
  setPost: setPost,
};

const [presenter] = useState(props.presenterGenerator(listener));

const clearPost = (event: React.MouseEvent) => {
  event.preventDefault();
  setPost("");
};

const checkButtonStatus: () => boolean = () => {
  return !post.trim() || !authToken || !currentUser;
};

return (
  <div className={isLoading ? "loading" : ""}>
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          rows={10}
          placeholder="What's on your mind?"
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          disabled={checkButtonStatus()}
          style={{ width: "8em" }}
          onClick={(event) => presenter.submitPost(event, post, currentUser!, authToken!)}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <div>Post Status</div>
          )}
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          disabled={checkButtonStatus()}
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  </div>
);
};

export default PostStatus;
