import LayoutContainer from "../components/LayoutContainer";
import ShopCategories from "../components/shoppage/ShopCategories";
import classes from "./Shop.module.css";
import { fetchCategories } from "../utils/categoryService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemList from "../components/shoppage/ItemList";
import PriceFilter from "../components/shoppage/PriceFilter";
import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/styles";
import { SORT_BY, ORDER, VIEWS } from "../utils/constants";
import { PAGES } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faBars } from "@fortawesome/free-solid-svg-icons";

function Shop({ setCurrentPage }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSuperCategory, setSelectedSuperCategory] = useState(null);
  const [selectedView, setSelectedView] = useState(VIEWS.LIST);
  const [price, setPrice] = useState({
    min: null,
    max: null,
  });
  const { categoryId } = useParams();
  const options = [
    {
      value: { order: SORT_BY.DEFAULT, direction: ORDER.ASC },
      name: "Default Sorting",
    },
    {
      value: { order: SORT_BY.DATE_ADDED, direction: ORDER.ASC },
      name: "Added: New to old",
    },
    {
      value: { order: SORT_BY.TIME_LEFT, direction: ORDER.ASC },
      name: "Time Left",
    },
    {
      value: { order: SORT_BY.PRICE, direction: ORDER.ASC },
      name: "Price: Low to High",
    },
    {
      value: { order: SORT_BY.PRICE, direction: ORDER.DESC },
      name: "Price: High to Low",
    },
  ];
  const [selectedSort, setSelectedSort] = useState(options[0].value);

  const onCategoryChange = (item) => {
    if (!selectedCategories.includes(parseInt(item.target.value))) {
      setSelectedCategories([
        ...selectedCategories,
        parseInt(item.target.value),
      ]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((val) => val !== parseInt(item.target.value))
      );
    }
  };

  const onSuperCategoryChange = (superCategory) => {
    if (selectedSuperCategory === 0) {
      setSelectedSuperCategory(parseInt(superCategory));
    } else if (selectedSuperCategory === superCategory) {
      setSelectedSuperCategory(0);
      setSelectedCategories([]);
    } else {
      setSelectedSuperCategory(parseInt(superCategory));
    }
  };

  const onPriceChange = (event, newPrice) => {
    setPrice({ min: newPrice[0], max: newPrice[1] });
  };

  useEffect(async () => {
    if (categoryId) {
      setSelectedSuperCategory(parseInt(categoryId));
    } else {
      setSelectedSuperCategory(0);
    }
    const fetchedCategories = await fetchCategories();
    setCategories(fetchedCategories);
  }, []);

  const chipDelete = (id) => {
    if (id === selectedSuperCategory) {
      setSelectedSuperCategory(0);
      setSelectedCategories([]);
    } else if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((val) => val !== parseInt(id))
      );
    } else {
      setPrice({ min: null, max: null });
    }
  };

  const onPriceInputChange = (field) => {
    if (field.target.value !== "") {
      if (field.target.name === "max") {
        setPrice({ min: price.min, max: field.target.value });
      } else {
        setPrice({ min: field.target.value, max: price.max });
      }
    }
  };

  const CustomChip = styled(Chip)({
    backgroundColor: "#8367d8",
    color: "#fff",
    marginBottom: "10px",
  });

  const onSortChange = (e) => {
    setSelectedSort(JSON.parse(e.target.value));
  };

  setCurrentPage(PAGES.SHOP);

  return (
    <LayoutContainer>
      <div className={classes.items_positioning}>
        <div className={classes.shop_left_section}>
          <ShopCategories
            onCategoryChange={onCategoryChange}
            categories={categories}
            selectedCategories={selectedCategories}
            selectedSuperCategory={selectedSuperCategory}
            onSuperCategoryChange={onSuperCategoryChange}
          />
          <PriceFilter
            onPriceInputChange={onPriceInputChange}
            onPriceChange={onPriceChange}
            price={price}
          />
        </div>
        <div className={classes.shop_right_section}>
          <div className={classes.sort_and_view_section}>
            <select name="sorting" id="sorting" onChange={onSortChange}>
              {options.map((option) => (
                <option value={JSON.stringify(option.value)}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className={classes.view_options}>
              {selectedView === VIEWS.GRID ? (
                <button
                  className={`${classes.view_btn} ${classes.view_btn_selected}`}
                  onClick={() => {
                    setSelectedView(VIEWS.GRID);
                  }}
                >
                  <FontAwesomeIcon
                    className={classes.btn_icon}
                    icon={faTableCells}
                  />
                  grid
                </button>
              ) : (
                <button
                  className={classes.view_btn}
                  onClick={() => {
                    setSelectedView(VIEWS.GRID);
                  }}
                >
                  <FontAwesomeIcon
                    className={classes.btn_icon}
                    icon={faTableCells}
                  />
                  grid
                </button>
              )}
              {selectedView === VIEWS.LIST ? (
                <button
                  className={`${classes.view_btn} ${classes.view_btn_selected}`}
                  onClick={() => {
                    setSelectedView(VIEWS.LIST);
                  }}
                >
                  <FontAwesomeIcon className={classes.btn_icon} icon={faBars} />
                  list
                </button>
              ) : (
                <button
                  className={classes.view_btn}
                  onClick={() => {
                    setSelectedView(VIEWS.LIST);
                  }}
                >
                  <FontAwesomeIcon className={classes.btn_icon} icon={faBars} />
                  list
                </button>
              )}
            </div>
          </div>
          <Stack direction="row" spacing={1}>
            {categories
              .filter((category) => {
                return (
                  selectedCategories.includes(category.categoryId) ||
                  selectedSuperCategory === category.categoryId
                );
              })
              .map((category) => (
                <CustomChip
                  label={category.name}
                  onDelete={() => chipDelete(category.categoryId)}
                />
              ))}
            {(price.min !== null || price.max !== null) && (
              <CustomChip
                label={"$" + price.min + "-$" + price.max}
                onDelete={() => chipDelete(-1)}
              />
            )}
          </Stack>
          <div className={classes.item_list}>
            <ItemList
              selectedCategories={selectedCategories}
              selectedSuperCategory={selectedSuperCategory}
              categories={categories}
              price={price}
              selectedSort={selectedSort}
              selectedView={selectedView}
            />
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

export default Shop;
