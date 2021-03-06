import axios from "axios";

export const getProductsAPI = (keywordSearch) => {
  return axios.get(
    `${process.env.REACT_APP_API_URL}/products/search?name=${keywordSearch}&sortBy=product_id&orderBy=ASC&limit=100&page=1`
  );
};

export const addProductsAPI = (body) => {
  return axios.post(`${process.env.REACT_APP_API_URL}/products/add`, body, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const editProductsAPI = (id,body) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}/products/update/${id}`, body, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const deleteProductsAPI = (id) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}/products/delete/${id}`, {
    headers: {
      "content-type": "multipart/form-data",
      "x-access-token": `bearer ${localStorage.getItem("token")}`,
    },
  });
};
