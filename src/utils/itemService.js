import axios from "axios";
import { handleResponse } from "./requestHandler";
import { HOST } from "./constants";

let api = "";
if (process.env.REACT_APP_URL) {
  api = process.env.REACT_APP_URL;
} else {
  api = HOST;
}

export const fetchItems = async (page, size, order, orderColumn, superCategoryId, categories, minPrice, maxPrice, searchParam) => {
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
  if(searchParam){
    url = url + `&searchParam=${searchParam}`
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

export const addItem = async (token, item) => {
  return axios
    .post(`${api}/api/v1/item/additem`, item, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};

export const fetchRecommended = async (token) => {
  return axios
    .get(`${api}/api/v1/item/recommended`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};

export const fetchUnrecommended = async () => {
  return axios
    .get(`${api}/api/v1/item/unrecommended`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((error) => {
      handleResponse(error.response);
    });
};
