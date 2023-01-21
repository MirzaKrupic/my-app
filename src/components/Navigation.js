import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import React from "react";
import classes from "./Navigation.module.css";
import { ReactComponent as LogoSvg } from "../assets/auction-app-logo 1.svg";
import { Link } from "react-router-dom";
import LayoutContainer from "./LayoutContainer";
import { PAGES } from "../utils/constants";
import { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from 'react-router-dom';

function Navigation({ currentPage }) {
  const [searchTerm, setSearchTerm] = useState(null);
  const history = useHistory();

  return (
    <div>
      <LayoutContainer>
        <Navbar className={classes.navigation_bar} collapseOnSelect expand="sm">
          <Container className="no-gutters mx-0 px-0">
            <LogoSvg className={classes.application_logo} />
            <input
              className={classes.search_bar}
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={event => {setSearchTerm(event.target.value)}}
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  history.push('/shop/'+searchTerm);
                }
              }}
            />
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                {currentPage === PAGES.HOME ? (
                  <Link
                    className={`${classes.navigation_option} ${classes.active_navigation_option}`}
                    to="/"
                  >
                    Home
                  </Link>
                ) : (
                  <Link className={`${classes.navigation_option}`} to="/">
                    Home
                  </Link>
                )}
                {currentPage === PAGES.SHOP ? (
                  <Link
                    className={`${classes.navigation_option} ${classes.active_navigation_option}`}
                    to="/shop"
                  >
                    Shop
                  </Link>
                ) : (
                  <Link className={`${classes.navigation_option}`} to="/shop">
                    Shop
                  </Link>
                )}
                {currentPage == PAGES.MY_ACCOUNT ? (
                  <Link
                    className={`${classes.navigation_option} ${classes.active_navigation_option}`}
                    to="/myaccount"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link className={classes.navigation_option} to="/myaccount">
                    My Account
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </LayoutContainer>
    </div>
  );
}

export default Navigation;
