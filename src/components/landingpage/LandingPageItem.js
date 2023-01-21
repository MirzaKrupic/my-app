import "./LandingPageItem.css";
import ItemImage from "../../assets/lowersectpic.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../hooks";
import { useContext } from "react";

function LandingPageItem(props) {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div
      className={`item_box_common ${props.item_type.toLowerCase()}_item_box`}
    >
      <div className={`${props.item_type.toLowerCase()}_image_container`}>
        {props.photo && <img className={`full_size_picture`} src={props.photo.split(";")[0]} />}
      </div>

        <Link className={`item_link`} to={`/items/${props.itemId}`}>
          <h3 className={`card_title`}>{props.name}</h3>
        </Link>
      <p className={`card_description`}>
        Start from <span className={`card_price`}>${props.price}</span>
      </p>
    </div>
  );
}

export default LandingPageItem;
