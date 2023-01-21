import "bootstrap/dist/css/bootstrap.min.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import LandingPageItem from "./LandingPageItem";
import { Row } from "react-bootstrap";
import {fetchItems} from '../../utils/itemService';
import {LANDING_PAGE_TAB_VALUES, SORT_BY, ORDER} from '../../utils/constants';

function InfiniteScrollComponent(props) {
  const [items, setItems] = useState([]);

  const [hasMoreItems, setHasMoreItems] = useState(true);

  const [page, setPage] = useState(0);

  const infiniteScrollStyles = {
    landing_page_row: {
      display: "flex",
      justifyContent: "space-between"
    }
  };

  useEffect(() => {
  (async ()=> {let data = "";
    if(props.criteria === LANDING_PAGE_TAB_VALUES.NORMAL){
      data = await fetchItems(page, 20);
    }else if(props.criteria === LANDING_PAGE_TAB_VALUES.LAST_CHANCE){
      data = await fetchItems(page, 20, ORDER.ASC, SORT_BY.TIME_LEFT);
    }

    setItems([...items, ...data.content]);
    setHasMoreItems(!data.last);
  })()
  }, [page]);

  const fetchData = async () => {
    setPage(page + 1);
  };

  return (
    <InfiniteScroll
      dataLength={items.length} //This is important field to render the next data
      next={fetchData}
      hasMore={hasMoreItems}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="container">
        <Row style={infiniteScrollStyles.landing_page_row}>
          {items.map((item) => {
            return (
              <LandingPageItem
                item_type="SMALL"
                key={item.itemId}
                {...item}
              />
            );
          })}
        </Row>
      </div>
    </InfiniteScroll>
  );
}

export default InfiniteScrollComponent;
