import { User } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserItem from "../userItem/UserItem";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../hooks/useUserInfo";
import { UserItemPresenter, UserItemView } from "../../presenter/UserItemPresenter";

interface Props {
  presenterGenerator: (view: UserItemView) => UserItemPresenter; // this builds the connection between the presenter and the view
}
// Notice that all the whole file is JUST FOCUSED ON THE UI, NO logic here

const UserItemScroller = (props: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<User[]>([]);
  const [newItems, setNewItems] = useState<User[]>([]);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);
  const { displayedUser, authToken } = useUserInfo();

  const listener: UserItemView = {
    addItems: (newItems: User[]) =>
      setNewItems(newItems),
      displayErrorMessage: displayErrorMessage
  }

  const [presenter] = useState(props.presenterGenerator(listener)); // this is the actual presenter


  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
  }, [displayedUser]);

  // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
  useEffect(() => {
    if(changedDisplayedUser) {
      loadMoreItems();
    }
  }, [changedDisplayedUser]);

  // Add new items whenever there are new items to add
  useEffect(() => {
    if(newItems) {
      setItems([...items, ...newItems]);
    }
  }, [newItems])

  const reset = async () => {
    setItems([]);
    setNewItems([]);
    setChangedDisplayedUser(true);
    presenter.reset();
  }

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUser!.alias); // we know this can never be null, but the IDE doesn't, so ! is used
    setChangedDisplayedUser(false);
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <UserItem value={item} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserItemScroller;
