import { Button } from "react-bootstrap";
import ItemImage from "../../assets/maincardplaceholder.png";
import classes from "./MainItemCard.module.css";
import { Link } from "react-router-dom";

function MainItemCard(props) {
    function chunk(str, n) {
      var ret = [];
      var i;
      var len;

      for(i = 0, len = str.length; i < len; i += n) {
        ret.push(str.substr(i, n))
      }

      return ret
  };

  return (
    <section className={classes.main_card_section}>
      <div className={classes.card_details}>
      <Link className={`item_link`} to={`/items/${props.itemId}`}>
          <h3 className={classes.card_title}>{props.title}</h3>
      </Link>
        
        <h3 className={classes.card_price}>Start from {props.price}$</h3>
        <p className={classes.card_description}>
          {props.description.length < 38 ? chunk(props.description,40).join('\n') : chunk(props.description.substring(0, 360)+"...",40).join('\n')}
        </p>
        <Link className={`item_link`} to={`/items/${props.itemId}`}>
        <Button className={classes.main_item_btn} variant="outline-secondary">
          BID NOW
        </Button>
      </Link>
        
      </div>
      <div className={classes.main_pic}>
        <img src={props.image[0]} />
      </div>
    </section>
  );
}

export default MainItemCard;
