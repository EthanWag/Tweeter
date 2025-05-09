import "./AppNavbar.css";
import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";

import { LogoutView } from "../../presenter/Presenter";
import { LogoutPresenter } from "../../presenter/LogoutPresenter";
import useUserInfo from "../hooks/useUserInfo";
import useToastListener from "../toaster/ToastListenerHook";

interface Props {
  presenterGenerator: (view: LogoutView) => LogoutPresenter; 
}

const AppNavbar = (props:Props) => {
  const location = useLocation();
  const { authToken, clearUserInfo } = useUserInfo();
  const { displayInfoMessage, displayErrorMessage, clearLastInfoMessage } =
    useToastListener();

  const listener: LogoutView = {
    displayErrorMessage: displayErrorMessage,
    displayInfoMessage: displayInfoMessage,
    clearUserInfo: clearUserInfo,
    clearLastInfoMessage: clearLastInfoMessage,
  };

  const [presenter] = useState(props.presenterGenerator(listener));

  return (
    <Navbar
      collapseOnSelect
      className="mb-4"
      expand="md"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>
          <div className="d-flex flex-row">
            <div className="p-2">
              <NavLink className="brand-link" to="/">
                <Image src={"./bird-white-32.png"} alt="" />
              </NavLink>
            </div>
            <div id="brand-title" className="p-3">
              <NavLink className="brand-link" to="/">
                <b>Tweeter</b>
              </NavLink>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"> 
          <Nav className="ml-auto">
            <Nav.Item>
              <NavLink to="/feed">Feed</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/story">Story</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/followees">Followees</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/followers">Followers</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink id="logout" onClick={() => presenter.logout(authToken)} to={location.pathname}>
                Logout
              </NavLink>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
