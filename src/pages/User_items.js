import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import LayoutContainer from "../components/LayoutContainer";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { computeTimeLeft } from "../utils/itemUtils";
import { fetchItemByUserToken } from "../utils/userUtils";
import ItemList from "../components/myItems/ItemList";

function User_items({ setCurrentPage }) {
  //   setCurrentPage(PAGES.MY_ACCOUNT);
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState(1);
  const [items, setItems] = useState(null);
  const [noActiveItems, setNoActiveItems] = useState([]);
  const [noFinishedItems, setNoFinishedItems] = useState(null);

  useEffect(() => {
    (async ()=> {
    // const history = browserHistory();
    // if (token === null) {
    //   history.push("/login");
    //   window.location.reload(false);
    // }
    setItems(await fetchItemByUserToken(token));

  })()
  }, [token]);

  useEffect(() => {
    (async ()=>{
    if (items !== null && items !== undefined) {
      const nesto = items.filter((item) => {
        return computeTimeLeft(new Date(item.auctionEndDate)) !== 0;
      });
      const nesto2 = items.filter((item) => {
        return computeTimeLeft(new Date(item.auctionEndDate)) === 0;
      });
      // setNoActiveItems(
      //   nesto
      // );
      // setNoFinishedItems(
      //   nesto2
      // );
      setNoActiveItems(<ItemList items={nesto}/>);
      setNoFinishedItems(<ItemList items={nesto2}/>);
    }
    
console.log(items);
})()
  }, [items]);

  // useEffect(async () => {
  //   console.log(noFinishedItems);
  // }, [noFinishedItems]);

  const getHighestBid = (item) => {
    if (item.bids.length > 0) {
      const amounts = item.bids.map((bid) => bid.amount);
      return Math.max(amounts);
    } else return item.startingPrice;
  };

  function getImage(image) {
    const imagesArr = image
      ? image.split(";").filter((el) => el.length !== 0)
      : [];

    console.log(imagesArr);
    if (imagesArr) {
      return imagesArr[0];
    }
    return null;
  }

  return (
    <div>
      <LayoutContainer>
        <div className={classes.btn_container2}>
          {selectedTab === 1 ? (
            <div>
              <button
                className={`${classes.section_button} ${classes.selected_section_button}`}
              >
                Active
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSelectedTab(1)}
              className={classes.section_button}
            >
              Active
            </button>
          )}
          {selectedTab === 2 ? (
            <button
              className={`${classes.section_button} ${classes.selected_section_button}`}
            >
              Sold
            </button>
          ) : (
            <button
              onClick={() => setSelectedTab(2)}
              className={classes.section_button}
            >
              Sold
            </button>
          )}
        </div>
        <div className={classes.required_container}>
          <div className={classes.section_heading}>
            <Row className={classes.header_row}>
              <Col>Item</Col>
              <Col>Name</Col>
              <Col>Time Left</Col>
              <Col>Starting Price</Col>
              <Col>No. Bids</Col>
              <Col>Highest Bid</Col>
              <Col></Col>
            </Row>
          </div>
          {items && selectedTab==1 && noActiveItems}
          {items && selectedTab==2 && noFinishedItems}
        </div>
      </LayoutContainer>
    </div>
  );
}

export default User_items;
