import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AccountView } from "../../../presenter/Presenter";
import { LoginPresenter } from "../../../presenter/LoginPresenter";

import AuthenticationFormLayout from "../AuthenticationFormLayout";
import AuthenticationFields from "../AuthenticationFields";
import useToastListener from "../../toaster/ToastListenerHook";
import useUserInfo from "../../hooks/useUserInfo";

interface Props {
  originalUrl?: string;
  presenter? : LoginPresenter;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const listener : AccountView = {
    displayErrorMessage: displayErrorMessage,
    setIsLoading: setIsLoading,
    updateUserInfo: updateUserInfo,
    navigate: navigate
  }

  const [presenter] = useState(props.presenter ? props.presenter : new LoginPresenter(listener));
  
  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {

    if (event.key == "Enter" && !presenter.checkSubmitButtonStatus(alias, password)){
      presenter.doLogin( alias, password, rememberMe, props.originalUrl);
    }
  };


  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationFields
          onEvent={loginOnEnter}
          setAlias={setAlias}
          setPassword={setPassword} />
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={() => presenter.checkSubmitButtonStatus(alias, password)}
      isLoading={isLoading}
      submit={() => presenter.doLogin(alias, password, rememberMe, props.originalUrl)}
    />
  );
};

export default Login;