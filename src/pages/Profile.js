import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import { useHistory } from 'react-router-dom';
import LayoutContainer from "../components/LayoutContainer";
import User_bids from "./User_bids";
import My_Profile from "./My_Profile";
import User_items from "./User_items";
import Breadcrumb from "./Breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars, faUser, faDollar } from "@fortawesome/free-solid-svg-icons";

function Profile({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);
  const history = useHistory();
  const [selectedTab, setSelectedTab] = useState(1);
  const [mainPage, setMainPage] = useState("Profile");
  const [subPage, setSubPage] = useState("My Account -> Profile");
  const [breadCrumb, setBreadCrum] = useState(
    <Breadcrumb mainPage="Profile" subPage="My Account -> Profile" />
  );
  const [tebContent, setTabContent] = useState(null);

  const setBreadCrumb = (page) => {
    if (page === "Profile") {
      setBreadCrum(
        <Breadcrumb mainPage="Profile" subPage="My Account -> Profile" />
      );
    } else if (page === "Items") {
      setBreadCrum(
        <Breadcrumb mainPage="Items" subPage="My Account -> My items" />
      );
    } else if (page === "Bids") {
      setBreadCrum(
        <Breadcrumb mainPage="Items" subPage="My Account -> My bids" />
      );
    }
  };

  return (
    <div>
      <div className={classes.page_heading}>{breadCrumb}</div>
      <LayoutContainer>
        <div className={classes.btn_container}>
          <div className={classes.main_menu}>
            {selectedTab === 1 ? (
              <div>
                <button
                  className={`${classes.section_button} ${classes.selected_section_button}`}
                >
                  <FontAwesomeIcon className={classes.btn_icon} icon={faUser} />
                  Profile
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedTab(1);
                  setBreadCrumb("Profile");
                }}
                className={classes.section_button}
              >
                <FontAwesomeIcon className={classes.btn_icon} icon={faUser} />
                Profile
              </button>
            )}
            {selectedTab === 2 ? (
              <button
                className={`${classes.section_button} ${classes.selected_section_button}`}
              >
                <FontAwesomeIcon className={classes.btn_icon} icon={faBars} />
                Seller
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedTab(2);
                  setBreadCrumb("Items");
                }}
                className={classes.section_button}
              >
                <FontAwesomeIcon className={classes.btn_icon} icon={faBars} />
                Seller
              </button>
            )}
                        {selectedTab === 3 ? (
              <div>
                <button
                  className={`${classes.section_button} ${classes.selected_section_button}`}
                >
                  <FontAwesomeIcon className={classes.btn_icon} icon={faDollar} />
                  Bids
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedTab(3);
                  setBreadCrumb("Bids");
                }}
                className={classes.section_button}
              >
                <FontAwesomeIcon className={classes.btn_icon} icon={faDollar} />
                Bids
              </button>
            )}
          </div>
          {selectedTab === 2 && (
            <button
              className={`${classes.section_button} ${classes.selected_section_button} ${classes.add_item_button}`}
              onClick = {() => {history.push('/additem')}}
           >
              <FontAwesomeIcon className={classes.btn_icon} icon={faPlus} />
              ADD ITEM
            </button>
          )}
        </div>
        {selectedTab === 1 && <My_Profile />}
        {selectedTab === 2 && <User_items />}
        {selectedTab === 3 && <User_bids />}
      </LayoutContainer>
    </div>
  );
}

export default Profile;
