import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../hooks/useUserInfo";
import { LoginPresenter } from "../../../presenter/LoginPresenter";
import { AccountView } from "../../../presenter/AccountPresenter";

interface Props {
  originalUrl?: string;
  presenterGenerator: (view: AccountView) => LoginPresenter; 
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

  const [presenter] = useState(props.presenterGenerator(listener));
  
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
