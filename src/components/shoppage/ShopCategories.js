import classes from "./ShopCategories.module.css";
import ShopCategoryItem from "./ShopCategoryItem";

function ShopCategories({
  categories,
  onCategoryChange,
  selectedCategories,
  selectedSuperCategory,
  onSuperCategoryChange,
}) {
  return (
    <div className={classes.categories_container}>
      <p className={classes.categories_heading}>PRODUCT CATEGORIES</p>
      {categories.length > 0 && (
        <div>
          {categories
            .filter((category) => {
              return category.supercategoryId === null;
            })
            .map((category) => (
              <ShopCategoryItem
                onSuperCategoryChange={onSuperCategoryChange}
                selectedSuperCategory={selectedSuperCategory}
                onItemChange={onCategoryChange}
                category={category}
                selectedCategories={selectedCategories}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ShopCategories;
