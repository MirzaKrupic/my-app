import { HOST } from "./constants";

let api = "";
if (process.env.REACT_APP_URL) {
  api = process.env.REACT_APP_URL;
} else {
  api = HOST;
}

export const fetchCategories = async () => {
  const items = await fetch(`${api}/api/v1/categories`);
  return items.json();
};
