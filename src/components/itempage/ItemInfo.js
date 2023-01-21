import classes from "./ItemInfo.module.css";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../hooks";
import { useContext } from "react";
import { itemBid } from "../../utils/itemService";
import { useEffect, useState } from "react";
import ItemDetails from "./ItemDetails";
import { computeTimeLeft } from "../../utils/itemUtils";
import {connect} from "../../utils/socket";

function ItemInfo({
  bids,
  auctionEndDate,
  itemId,
  name,
  startingPrice,
  details,
}) {
  const { token, isUserLoggedIn } = useContext(AuthContext);
  const [bidResponse, setBidResponse] = useState();
  const [currentAmount, setCurrentAmount] = useState(0);
  const [currentNumberOfBids, setCurrentNumberOfBids] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentItemState, setCurrentItemState] = useState(null);

  useEffect( () => {
    (async ()=> {
    if (bids) {
      connect(setCurrentItemState);
      setCurrentNumberOfBids(bids.length);
      setCurrentAmount(getHighestBid(bids));
      setTimeLeft(computeTimeLeft(new Date(auctionEndDate)));
    }
  })()
  }, [bids]);

  useEffect(() => {
    (async ()=> {
    if (currentItemState !== null) {
      console.log(currentItemState)
      setCurrentNumberOfBids(currentItemState.bids.length);
      setCurrentAmount(getHighestBid(currentItemState.bids));
      setTimeLeft(computeTimeLeft(new Date(currentItemState.auctionEndDate)));
    }
  })()
  }, [currentItemState]);

  const handleSubmit = async (item) => {
    const { amount } = item;
    if (amount <= currentAmount) {
      setBidResponse(`Minimal amount required is ${currentAmount + 1}`);
    } else {
      try {
        const itemRes = await itemBid(token, {
          itemId,
          amount: parseFloat(amount),
        });
        setBidResponse(itemRes.body);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getHighestBid = (bids) => {
    if (bids.length > 0) {
      const amounts = bids.map((bid) => bid.amount);
      return Math.max.apply(Math,amounts);
    } else return startingPrice;
  }

  return (
    <div className={classes.item_info_container}>
      <div className={classes.item_heading}>
        <p className={classes.item_title}>{name}</p>
        <p className={classes.item_starting_price}>
          {"Starts from "}
          <span className={classes.starting_price}>${startingPrice}</span>
        </p>
      </div>
      <div className={classes.bidding_section}>
        <div className={classes.bidding_info}>
          <p>
            {"Highest Bid: "}
            <span className={classes.detail_value}>{currentAmount}$</span>
          </p>
          <p>
            {"Number of bids: "}
            <span className={classes.detail_value}>{currentNumberOfBids}</span>
          </p>
          <p>
            {"Time left: "}
            <span className={classes.detail_value}>{timeLeft}</span>
          </p>
        </div>
        <div className={classes.bidding_form_container}>
          <Formik
            onSubmit={handleSubmit}
            initialValues={{
              itemId: itemId,
              amount: "",
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  name="amount"
                  type="text"
                  className={classes.bidding_input}
                />
                <Button
                  className={classes.bidding_button}
                  type="submit"
                  variant="outline-*"
                  disabled = {!isUserLoggedIn()}
                >
                  PLACE BID
                </Button>
              </Form>
            )}
          </Formik>
          <div>{bidResponse}</div>
        </div>
        <ItemDetails details={details} />
      </div>
    </div>
  );
}

export default ItemInfo;
