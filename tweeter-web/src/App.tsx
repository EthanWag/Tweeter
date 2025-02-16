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
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import useUserInfo from "./components/hooks/useUserInfo";
import { FolloweePresenter} from './presenter/FolloweePresenter';
import { UserItemView } from "./presenter/UserItemPresenter";
import { FollowerPresenter } from "./presenter/FollowerPresenter";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import { StatusItemView } from "./presenter/StatusItemPresenter";
import { FeedPresenter } from "./presenter/FeedPresenter";
import { StoryPresenter } from "./presenter/StoryPresenter";
import { LoginPresenter } from "./presenter/LoginPresenter";
import { RegisterPresenter } from './presenter/RegisterPresenter';
import { AccountView } from "./presenter/AccountPresenter";

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
            <StatusItemScroller
              key={1}
              presenterGenerator={(view: StatusItemView) => new FeedPresenter(view)}
              />
          }
        />

      <Route
        path="story"
        element={
          <StatusItemScroller
            key={2}
            presenterGenerator={(view: StatusItemView) => new StoryPresenter(view)}
            />
          }
        />
        
        <Route
          path="followees"
          element={
            <UserItemScroller
              key={3}
                presenterGenerator={(view: UserItemView) => new FolloweePresenter(view)}
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              key={4} 
              presenterGenerator={(view: UserItemView) => new FollowerPresenter(view)}
            />
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
