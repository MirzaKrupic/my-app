import classes from "./Categories.module.css";
import { fetchCategories } from "../../utils/categoryService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);})()
  }, []);

  return (
    <section className={classes.categories_list}>
      <div
        className={`${classes.category_item} ${classes.category_item_heading}`}
      >
        <p className={classes.categoriesheading}>CATEGORIES</p>
      </div>
      {categories
        .filter((category) => category.supercategoryId === null)
        .sort(() => Math.random() - Math.random())
        .slice(0, 8)
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
        <Link className={classes.category_item_content} to={`/shop`}>
          <p>All Categories</p>
        </Link>
      </div>
    </section>
  );
}

export default Categories;
