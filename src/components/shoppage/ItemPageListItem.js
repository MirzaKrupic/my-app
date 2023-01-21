import classes from "./ItemPageListItem.module.css";
import { AuthContext } from "../../hooks";
import { useContext } from "react";
import { Link } from "react-router-dom";

function ItemPageListItem({ name, price, photo, details, itemId }) {
  const { isUserLoggedIn } = useContext(AuthContext);

  return (
    <div className={classes.item_container}>
      <img className={classes.item_picture} src={photo.split(";")[0]} />
      <div className={classes.details_section}>
        {isUserLoggedIn() ? (
          <Link className={`item_link`} to={`/items/${itemId}`}>
            <p className={classes.item_name}>{name}</p>
          </Link>
        ) : (
          <p className={classes.item_name}>{name}</p>
        )}
        <p className={classes.item_description}>
          {details.length > 100 ? details.substring(0, 100) + "..." : details}
        </p>
        <p className={classes.item_price}>Start From ${price}</p>

      </div>
    </div>
  );
}

export default ItemPageListItem;
