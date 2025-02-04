import { AuthToken, Status, User } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "./StatusItem";
import useUserNavigation from "../useUserNavigation";
import useUserInfo from "../useUserInfo";

export const PAGE_SIZE = 10;

interface Props {
  posts:(lastItem:Status | null, pageSize:number) => [Status[], boolean],
  fetchUser:(alias:string) => Promise<User | null>,
  parent: string
}

const StatusItemScroller = (props: Props) => {
  const { navigateToUser } = useUserNavigation(props.fetchUser);
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);
  const [newItems, setNewItems] = useState<Status[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [lastItem, setLastItem] = useState<Status | null>(null);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

  const addItems = (newItems: Status[]) =>
    setNewItems(newItems);

  const{ displayedUser, authToken} = useUserInfo();

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
    setLastItem(null);
    setHasMoreItems(true);
    setChangedDisplayedUser(true);
  }

  const loadMoreItems = async () => {
    try {
      const [newItems, hasMore] = await loadMoreStoryItems(
        authToken!,
        displayedUser!.alias,
        PAGE_SIZE,
        lastItem
      );

      setHasMoreItems(hasMore);
      setLastItem(newItems[newItems.length - 1]);
      addItems(newItems);
      setChangedDisplayedUser(false)
    } catch (error) {
      displayErrorMessage(
        `Failed to load ${parent} items because of exception: ${error}`
      );
    }
  };
  const loadMoreStoryItems = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> => {
    // Please note, that this function requires a binded this, otherwise the function will not work as intended
    return props.posts(lastItem, pageSize);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <StatusItem key={index} index={index} item={item} navigateToUser={navigateToUser} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default StatusItemScroller;