import {FakeData} from "tweeter-shared";
import StatusItemScroller from "./StatusItemScroller";

export const PAGE_SIZE = 10;

const StoryScroller = () => {

  // TODO: Replace with the result of calling server
  // NOTE: FakeData needs to be binded to the this function, otherwise doesn't work

  return ( // makes it so you can put whatever you want in the feed
    <StatusItemScroller 
      posts={FakeData.instance.getPageOfStatuses}
      fetchUser={(alias:string) => {
        return Promise.resolve(FakeData.instance.findUserByAlias(alias)); // TODO: Replace with REAL VALUES, RIGHT NOW IT'S DUMMY FAKE
      }}
      parent="Story"
    />
  )
};

export default StoryScroller;