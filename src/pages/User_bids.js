import { PAGES } from "../utils/constants";
import { AuthContext } from "../hooks";
import { useContext, useEffect, useState, useRef, React } from "react";
import classes from "./User_items.module.css";
import browserHistory from "history/createBrowserHistory";
import LayoutContainer from "../components/LayoutContainer";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faBars, faCart } from "@fortawesome/free-solid-svg-icons";
import { computeTimeLeft } from "../utils/itemUtils";
import { fetchUserBids } from "../utils/userUtils";
import ItemList from "../components/myItems/ItemList";

function User_bids({ setCurrentPage }) {
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
    setItems(await fetchUserBids(token));

  })()
  }, [token]);

  useEffect(() => {
    (async ()=> {
    if (items !== null && items !== undefined) {
      console.log(items);
      setNoActiveItems(<ItemList items={items}/>);
    }
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
          {items && noActiveItems}
        </div>
      </LayoutContainer>
    </div>
  );
}

export default User_bids;
