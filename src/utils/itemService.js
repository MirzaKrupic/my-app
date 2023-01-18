import axios from "axios";
import { handleResponse } from "./requestHandler";
import { HOST } from "./constants";

let api = "";
if (process.env.REACT_APP_URL) {
  api = process.env.REACT_APP_URL;
} else {
  api = HOST;
}

export const fetchItems = async (page, size, order, orderColumn, superCategoryId, categories, minPrice, maxPrice) => {
  let url = `${api}/api/v1/items?page=${page}&size=${size}`;
  if(!!order){
    url = url + `&order=${order}`
  }
  if(orderColumn && orderColumn!== null){
    url = url + `&orderColumn=${orderColumn}`
  }
  if(superCategoryId && superCategoryId !== 0){
    url = url + `&superCategoryId=${superCategoryId}`
  }
  if(categories && categories.length > 0){
    url = url + `&categories=${categories}`
  }
  if(minPrice){
    url = url + `&minPrice=${minPrice}`
  }
  if(maxPrice){
    url = url + `&maxPrice=${maxPrice}`
  }
  const items = await fetch(
    url
  );
  return items.json();
};

export const fetchItemById = async (id, token) => {
  return axios
    .get(`${api}/api/v1/item/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};

export const itemBid = async (token, item) => {
  return axios
    .post(`${api}/api/v1/item/${item.itemId}/bid`, item.amount, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};
