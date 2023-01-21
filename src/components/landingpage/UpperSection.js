import LandingPageItem from "./LandingPageItem";
import classes from "./UpperSection.module.css";

function UpperSection({items}) {
  console.log(items);
  return (
    <div className={classes.section_container}>
      <div className={classes.section_title_div}>
        <h3 className={classes.upper_section_title}>Feature Collection</h3>
      </div>
        {items && (
        <div className={classes.feature_items_container}>
        <LandingPageItem
          item_type="LARGE"
          name={items[0].name}
          price={items[0].startingPrice}
          itemId={items[0].itemId}
          photo = {items[0].photo}
          url="images/featurepic.png"
        />
        <LandingPageItem
          item_type="LARGE"
          name={items[1].name}
          price={items[1].startingPrice}
          itemId={items[1].itemId}
          photo = {items[1].photo}
          url="images/featurepic.png"
        />
        <LandingPageItem
          item_type="LARGE"
          name={items[2].name}
          price={items[2].startingPrice}
          itemId={items[2].itemId}
          photo = {items[2].photo}
          url="images/featurepic.png"
        />
        </div>)}
      
    </div>
  );
}

export default UpperSection;
