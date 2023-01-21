import classes from "./Item.module.css";
import LayoutContainer from "../components/LayoutContainer";
import ImageGallery from "../components/itempage/ImageGallery";
import ItemInfo from "../components/itempage/ItemInfo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchItemById } from "../utils/itemService";
import { AuthContext } from "../hooks";
import { useContext } from "react";

function Item() {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const { token, setToken, isUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
    const fetchedItem = await fetchItemById(itemId);

    setItem(fetchedItem);
  })()
  }, [token]);

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <ImageGallery image={item.photo} />
        <ItemInfo {...item} />
      </div>
    </LayoutContainer>
  );
}

export default Item;
