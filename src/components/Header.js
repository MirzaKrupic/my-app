import { Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import SocialMedia from "./SocialMedia";
import LayoutContainer from "./LayoutContainer";
import { AuthContext } from "../hooks";
import { useContext } from "react";
import {logout} from "../utils/userUtils";

function Header() {
  const { token, isUserLoggedIn, setToken } = useContext(AuthContext);

  function handleLogout() {
    logout(token);
    setToken(null);
    localStorage.removeItem("token");
    
  }

  return (
    <div className={classes.headercontainer}>
      <LayoutContainer>
        <Row>
          <Col className={classes.socialmediafit}>
            <SocialMedia />
          </Col>
          <Col className={classes.login_register_position}>
            {!isUserLoggedIn() ? (
              <p className={classes.login_register_section}>
                <Link to="/login">Login</Link> or
                <Link to="/registration">Register</Link>
              </p>
            ) : (
              <p className={`${classes.logout} ${classes.login_register_section}`}>
                <Link onClick={handleLogout} to="/">Logout</Link>
              </p>
            )}
          </Col>
        </Row>
      </LayoutContainer>
    </div>
  );
}

export default Header;
