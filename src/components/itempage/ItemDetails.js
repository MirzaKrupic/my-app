import "./ItemDetails.css";
import { ITEM_PAGE_TAB_VALUES } from "../../utils/constants";
import { useState } from "react";

function ItemDetails({ details }) {
  const [selectedTab, setSelectedTab] = useState(
    ITEM_PAGE_TAB_VALUES.DETAILS
  );

  const renderButton = (title, value) => {
    const notSupportedValue = value === ITEM_PAGE_TAB_VALUES["SELER_INFO"] || value === ITEM_PAGE_TAB_VALUES["CUSTOMER_REVIEWS"]
    return (
      <button
        disabled={notSupportedValue}
        className={
          selectedTab === value
            ? "item_option_button selected_item_option_button"
            : "item_option_button"
        }
        onClick={() => {setSelectedTab(value)}}
      >
        {title}
      </button>
    );
  };

  return (
    <div>
      <div className="details_buttons_container">
        {renderButton("Details", ITEM_PAGE_TAB_VALUES.DETAILS)}
        {/* {renderButton("Seller information", ITEM_PAGE_TAB_VALUES.SELER_INFO)}
        {renderButton(
          "Customer reviews",
          ITEM_PAGE_TAB_VALUES.CUSTOMER_REVIEWS
        )} */}
      </div>
      <div className="product_details">
        {selectedTab === ITEM_PAGE_TAB_VALUES["DETAILS"] && (
          <p>{details}</p>
        )}
      </div>
    </div>
  );
}

export default ItemDetails;
