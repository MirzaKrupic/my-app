import { Button } from "react-bootstrap";
import ItemImage from "../../assets/maincardplaceholder.png";
import classes from "./MainItemCard.module.css";

function MainItemCard(props) {
  return (
    <section className={classes.main_card_section}>
      <div className={classes.card_details}>
        <h3 className={classes.card_title}>{props.title}</h3>
        <h3 className={classes.card_price}>Start from {props.price}$</h3>
        <p className={classes.card_description}>
          {props.description}
        </p>
        <Button className={classes.main_item_btn} variant="outline-secondary">
          BID NOW
        </Button>
      </div>
      <div className={classes.main_pic}>
        <img src={ItemImage} />
      </div>
    </section>
  );
}

export default MainItemCard;
