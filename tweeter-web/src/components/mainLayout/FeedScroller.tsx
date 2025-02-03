import {FakeData} from "tweeter-shared";
import StatusItem from "./StatusItem";

const FeedScroller = () => {

// TODO: Replace with the result of calling server
// NOTE: FakeData needs to be binded to the this function, otherwise doesn't work


  return ( // makes it so you can put whatever you want in the feed
    <StatusItem 
      posts={FakeData.instance.getPageOfStatuses}
      users={FakeData.instance.findUserByAlias}
    />
  )
};

export default FeedScroller;
