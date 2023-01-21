import LandingPageItem from "./LandingPageItem";
import classes from "./MiddleSection.module.css";

function MiddleSection({ items }) {
  return (
    <div className={classes.section_container}>
      <div className={classes.section_title_div}>
        <h3 className={classes.upper_section_title}>Feature Collection</h3>
      </div>
      {items && (
        <div className={classes.feature_items_container}>
          <LandingPageItem
            item_type="MEDIUM"
            name={items[0].name}
            price={items[0].startingPrice}
            itemId = {items[0].itemId}
            photo = {items[0].photo}
            url="images/secondayfeaturepic.png"
          />
          <LandingPageItem
            item_type="MEDIUM"
            name={items[1].name}
            price={items[1].startingPrice}
            itemId = {items[1].itemId}
            photo = {items[1].photo}
            url="images/secondayfeaturepic.png"
          />
          <LandingPageItem
            item_type="MEDIUM"
            name={items[2].name}
            price={items[2].startingPrice}
            itemId = {items[2].itemId}
            photo = {items[2].photo}
            url="images/secondayfeaturepic.png"
          />
          <LandingPageItem
            item_type="MEDIUM"
            name={items[3].name}
            price={items[3].startingPrice}
            itemId = {items[3].itemId}
            photo = {items[3].photo}
            url="images/secondayfeaturepic.png"
          />
        </div>
      )}
    </div>
  );
}

export default MiddleSection;
