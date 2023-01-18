import { Slider } from "@material-ui/core";
import classes from "./PriceFilter.module.css";
import ShopCategoryItem from "./ShopCategoryItem";
import * as React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {PRICE_VALUES} from "../../utils/constants"

function PriceFilter({ onPriceChange, price, onPriceInputChange }) {
  const SLIDER_COLOR = "#8367d8";

  const muiTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: SLIDER_COLOR,
        },
        track: {
          color: SLIDER_COLOR,
        },
        rail: {
          color: SLIDER_COLOR,
        },
      },
    },
  });

  return (
    <div className={classes.categories_container}>
      <p className={classes.categories_heading}>FILTER BY PRICE</p>
      <div className={classes.price_text_boxes}>
        <input
          className={classes.price_input}
          name="min"
          placeholder={"eg. $" + PRICE_VALUES.MIN}
          onChange={onPriceInputChange}
        />
        <input
          className={classes.price_input}
          name="max"
          placeholder={"eg. $" + PRICE_VALUES.MAX}
          onChange={onPriceInputChange}
        />
      </div>
      <ThemeProvider theme={muiTheme}>
        <Slider value={[price.min, price.max]} onChange={onPriceChange} min={PRICE_VALUES.MIN} max={PRICE_VALUES.MAX} />
      </ThemeProvider>
      <p className={classes.current_prices}>
        ${price.min}-${price.max}
      </p>
      <p className={classes.average_price}>The average price is ${((price.max+price.min)/2).toFixed(2)}</p>
    </div>
  );
}

export default PriceFilter;
