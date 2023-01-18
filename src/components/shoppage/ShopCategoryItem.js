import classes from "./ShopCategoryItem.module.css";
import { useEffect, useState } from "react";

function ShopCategoryItem({
  category,
  onItemChange,
  selectedCategories,
  selectedSuperCategory,
  onSuperCategoryChange,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    if (selectedSuperCategory === category.categoryId) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [category, selectedSuperCategory]);

  return (
    <div>
      <div className={classes.category_item_container}>
        <p className={classes.category_item_text}>
          {category && category.name}
        </p>
        <p
          className={`${classes.collapse_option} ${classes.category_item_text}`}
          onClick={() => {
            setIsCollapsed(!isCollapsed);
            onSuperCategoryChange(category.categoryId);
          }}
        >
          {!isCollapsed ? "-" : "+"}
        </p>
      </div>
      {category && !isCollapsed && (
        <div>
          {category.subcategories.map((category) => (
            <div className={classes.subcategoriy_item}>
              <input
                className={classes.category_checkbox}
                type="checkbox"
                name={category.categoryId}
                value={category.categoryId}
                onChange={onItemChange}
                checked={
                  selectedCategories.includes(category.categoryId)
                    ? "checked"
                    : ""
                }
              />
              {`${category.name} (${category.numberOfItems})`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopCategoryItem;
