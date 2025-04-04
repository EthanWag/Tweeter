import { useState, useEffect, JSX } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { User,Status } from "tweeter-shared";
import { PagedItemView } from "../../presenter/Presenter";
import { PagedItemPresenter } from "../../presenter/PagedItemPresenter";

import useToastListener from "../toaster/ToastListenerHook";
import useUserInfo from "../hooks/useUserInfo";

export const PAGE_SIZE = 10;

interface Props<T extends User | Status ,V extends PagedItemView<T>,S,P extends PagedItemPresenter<T,S>>{
  presenterGenerator: (view: V) => P;
  itemGenerator: (index: number, item: T) => JSX.Element;
}

const ItemScroller = <T extends User | Status,V extends PagedItemView<T>,S,P extends PagedItemPresenter<T,S>>(props: Props<T,V,S,P>) => {

  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<T[]>([]);
  const [newItems, setNewItems] = useState<T[]>([]);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);
  const{ displayedUser, authToken} = useUserInfo();

  const listener: V = ({
      addItems: (newItems: T[]) =>
      setNewItems(newItems),
      displayErrorMessage: displayErrorMessage
  }) as V;

  const [presenter] = useState(props.presenterGenerator(listener));

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
    presenter.loadMoreItems(authToken!, displayedUser!.alias);
    setChangedDisplayedUser(false);
  }

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
      className="pr-0" mr-0
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
            {props.itemGenerator(index, item)}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default ItemScroller;