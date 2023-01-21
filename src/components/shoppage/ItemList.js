import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState, useRef } from "react";
import { Row, Container } from "react-bootstrap";
import ItemPageListItem from "./ItemPageListItem";
import classes from "./ItemList.module.css";
import { fetchItems } from "../../utils/itemService";
import { VIEWS } from "../../utils/constants";
import LandingPageItem from "../landingpage/LandingPageItem";

function ItemList(props) {
  const [items, setItems] = useState([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedSupercategory, setSelectedSupercategory] = useState(
    props.selectedSuperCategory
  );
  const PAGE_SIZE = 4;
  const [refreshState, setRefreshState] = useState(true);

  useEffect(() => {
    (async ()=> {
    setItems([]);
    setHasMoreItems(true);
    setPage(0);
    if (props.selectedSuperCategory != null) {
      setSelectedSupercategory(props.selectedSuperCategory);
    }
    if (props.selectedCategories.length > 0) {
      setSelectedSupercategory(0);
    }
    console.log(props.searchedParam);
    setRefreshState(!refreshState);
  })()
  }, [
    props.selectedSuperCategory,
    props.selectedCategories,
    props.price,
    props.selectedSort,
    props.searchedParam
  ]);

  useEffect(() => {
    (async ()=> {
    let data = "";
    if (selectedSupercategory !== null || props.searchedParam !== null) {
      console.log(props.searchedParam)
      data = await fetchItems(
        page,
        PAGE_SIZE,
        props.selectedSort.direction,
        props.selectedSort.order,
        selectedSupercategory,
        props.selectedCategories,
        props.price.min,
        props.price.max,
        props.searchedParam
      );
      setItems([...items, ...data.content]);
      setHasMoreItems(!data.last);
    }
  })()
  }, [selectedSupercategory, page, refreshState, props.searchedParam]);

  const fetchData = async () => {
    setPage(page + 1);
  };

  return (
    <div>
      {props.categories && (
        <div>
          <Container fluid className={classes.no_padding_left}>
            <Row no-gutters>
              {props.selectedView === VIEWS.LIST
                ? items.map((item) => {
                    return (
                      <ItemPageListItem
                        itemId={item.itemId}
                        details={item.details}
                        name={item.name}
                        photo={item.photo}
                        price={item.startingPrice}
                      />
                    );
                  })
                : items.map((item) => {
                    return (
                      <LandingPageItem
                        item_type="SMALL"
                        itemId={item.itemId}
                        details={item.details}
                        name={item.name}
                        photo={item.photo}
                        price={item.startingPrice}
                      />
                    );
                  })}
            </Row>
          </Container>
          {hasMoreItems && (
            <button className={classes.fetch_button} onClick={fetchData}>
              EXPLORE MORE
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default ItemList;
