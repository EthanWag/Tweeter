import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import useUserInfo from "./components/hooks/useUserInfo";
import { FolloweePresenter} from './presenter/FolloweePresenter';
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { LoginPresenter } from "./presenter/LoginPresenter";
import { RegisterPresenter } from './presenter/RegisterPresenter';
import ItemScroller from "./components/mainLayout/ItemScroller";
import { Status, User } from "tweeter-shared";
import { AccountView, PagedItemView } from "./presenter/Presenter";
import { PagedItemPresenter } from "./presenter/PagedItemPresenter";
import { StatusService } from "./model/service/StatusService";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";
import { FollowService } from "./model/service/FollowService";
import { JSX } from "react";

const App = () => {
  const { currentUser, authToken } = useUserInfo();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />

        <Route
          path="feed"
          element={
            <ItemScroller<Status,PagedItemView<Status>,StatusService,PagedItemPresenter<Status,StatusService>>
              key={1}
              presenterGenerator={(view: PagedItemView<Status>) => new FeedPresenter(view)} 
              itemGenerator={function (index: number, item: Status): JSX.Element {
                return <StatusItem index={index} item={item}/>;
            }}/>
          }
        />

      <Route
        path="story"
        element={
          <ItemScroller<Status,PagedItemView<Status>,StatusService,PagedItemPresenter<Status,StatusService>>
            key={2}
            presenterGenerator={(view: PagedItemView<Status>) => new StoryPresenter(view)} 
            itemGenerator={function (index: number, item: Status): JSX.Element {
              return <StatusItem index={index} item={item}/>;
          }}/>
        }
      />
        
        <Route
          path="followees"
          element={
            <ItemScroller<User,PagedItemView<User>,FollowService,PagedItemPresenter<User,FollowService>>
              key={3}
              presenterGenerator={(view: PagedItemView<User>) => new FolloweePresenter(view)} 
              itemGenerator={function (index: number, item: User): JSX.Element {
                return <UserItem index={index} value={item}/>;
            }}/>
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller<User,PagedItemView<User>,FollowService,PagedItemPresenter<User,FollowService>>
              key={3}
              presenterGenerator={(view: PagedItemView<User>) => new FollowerPresenter(view)} 
              itemGenerator={function (index: number, item: User): JSX.Element {
                return <UserItem index={index} value={item}/>;
            }}/>
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();


  // the little red squiggles are because it wants login, alise and others, which we don't have yet ...
  return (
    <Routes>
      <Route path="/login" element={<Login presenterGenerator={(view: AccountView) => new LoginPresenter(view)}/>}/>
      <Route path="/register" element={<Register presenterGenerator={(view: AccountView) => new RegisterPresenter(view)}/>}/>
      <Route path="*" element={<Login 
      presenterGenerator={(view: AccountView) => new LoginPresenter(view)}
      originalUrl={location.pathname}
      />}/>
    </Routes>
  );
};

export default App;
