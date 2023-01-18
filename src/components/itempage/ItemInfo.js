import classes from "./ItemInfo.module.css";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../hooks";
import { useContext } from "react";
import { itemBid } from "../../utils/itemService";
import { useEffect, useState } from "react";
import ItemDetails from "./ItemDetails";
import { computeTimeLeft } from "../../utils/itemUtils";

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

  useEffect(async () => {
    if (bids) {
      setCurrentNumberOfBids(bids.length);
      setCurrentAmount(getHighestBid());
      setTimeLeft(computeTimeLeft(new Date(auctionEndDate)));
    }
  }, [bids]);

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
        setCurrentAmount(amount);
        setCurrentNumberOfBids(currentNumberOfBids + 1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getHighestBid = () => {
    if (bids.length > 0) {
      const amounts = bids.map((bid) => bid.amount);
      return Math.max(amounts);
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
                >
                  PLACE BID
                </Button>
              </Form>
            )}
          </Formik>
          {bidResponse}
        </div>
        <ItemDetails details={details} />
      </div>
    </div>
  );
}

export default ItemInfo;
