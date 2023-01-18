import LandingPageItem from "./LandingPageItem";
import classes from "./UpperSection.module.css";

function UpperSection() {
  return (
    <div className={classes.section_container}>
      <div className={classes.section_title_div}>
        <h3 className={classes.upper_section_title}>Feature Collection</h3>
      </div>
      <div className={classes.feature_items_container}>
        <LandingPageItem
          item_type="LARGE"
          name="test"
          price="22"
          url="images/featurepic.png"
        />
        <LandingPageItem
          item_type="LARGE"
          name="test"
          price="22"
          url="images/featurepic.png"
        />
        <LandingPageItem
          item_type="LARGE"
          name="test"
          price="22"
          url="images/featurepic.png"
        />
      </div>
    </div>
  );
}

export default UpperSection;
