import classes from "./Categories.module.css";
import { fetchCategories } from "../../utils/categoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories(props) {
  const [categories, setCategories] = useState([]);

  useEffect(async () => {
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  }, []);

  return (
    <section className={classes.categories_list}>
      <div
        className={`${classes.category_item} ${classes.category_item_heading}`}
      >
        <p className={classes.categoriesheading}>CATEGORIES</p>
      </div>
      {categories
        .filter(category => category.supercategoryId === null)
        .map((category) => (
          <div className={classes.category_item}>
            <Link
              className={classes.category_item_content}
              to={`/shop/${category.categoryId}`}
            >
              {category.name}
            </Link>
          </div>
        ))}

      <div className={classes.category_item}>
        <p>All Categories</p>
      </div>
    </section>
  );
}

export default Categories;
