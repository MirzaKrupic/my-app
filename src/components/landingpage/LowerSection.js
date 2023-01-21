import { useState, useContext } from "react";
import InfiniteScrollComponent from "./InfiniteScrollComponent";
import "./LowerSection.css";
import { LANDING_PAGE_TAB_VALUES } from "../../utils/constants";
import { AuthContext } from "../../hooks";

function MiddleSection() {
  

  const [items, setItems] = useState(
    <InfiniteScrollComponent criteria={LANDING_PAGE_TAB_VALUES.NORMAL} />
  );
  const [selectedTab, setSelectedTab] = useState(
    LANDING_PAGE_TAB_VALUES.NORMAL
  );

  const renderButton = (title, value) => {
    if (value === LANDING_PAGE_TAB_VALUES.TOP_RATED) {
      return (
        <button disabled className="option_button">
          {title}
        </button>
      );
    }
    return (
      <button
        className={
          selectedTab === value ? "option_button_selected" : "option_button"
        }
        onClick={() => {
          setItems(<InfiniteScrollComponent key={value} criteria={value} />);
          setSelectedTab(value);
        }}
      >
        {title}
      </button>
    );
  };

  return (
    <div className="section_container">
      <div className="section_title_div">
        {renderButton("New Arrivals", LANDING_PAGE_TAB_VALUES.NORMAL)}
        {renderButton("Last Chance", LANDING_PAGE_TAB_VALUES.LAST_CHANCE)}
      </div>
      <div className="feature_items_container">{items}</div>
    </div>
  );
}

export default MiddleSection;
