import {
  getProducts,
  selectProducts,
  changeQuantity,
  cancelOrder,
  resetStatus,
} from "./actionTypes";
import { createAsyncAction } from "redux-promise-middleware-actions";
// import axios from "axios";
import { getProductsAPI, addProductsAPI, editProductsAPI, deleteProductsAPI} from "../../utils/requestProducts";
import { postOrderAPI, getAllOrderAPI, getOrderCustomerAPI } from "../../utils/requestOrder";

export const getProductsAPICreator = createAsyncAction(
  getProducts,
  async (key) => {
    const res = await getProductsAPI(key);
    return res.data;
  }
);
export const postOrderAPICreator = createAsyncAction(
  "postOrder",
  async (body) => {
    const res = await postOrderAPI(body);
    return res.data;
  }
);

export const getAllOrderAPICreator = createAsyncAction(
  "getAllOrder",
  async () => {
    const res = await getAllOrderAPI();
    return res.data;
  }
);

export const getOrderCustomerAPICreator = createAsyncAction(
  "getAllOrder",
  async () => {
    const res = await getOrderCustomerAPI();
    return res.data;
  }
);

export const addProductsAPICreator = createAsyncAction(
  "ADDPRODUCTS",
  async (body) => {
    const res = await addProductsAPI(body);
    return res.data;
  }
);

export const deleteProductsAPICreator = createAsyncAction(
  "DELETEPRODUCTS",
  async (product_id,index) => {
    const res = await deleteProductsAPI(product_id);
    return res.data;
  }
);

export const editProductsAPICreator = createAsyncAction(
  "EDITPRODUCTS",
  async (id,body) => {
    const res = await editProductsAPI(id,body);
    return res.data;
  }
);

export const selectProductCreator = (event) => {
  return {
    type: selectProducts,
    payload: event,
  };
};
export const changeQuantityCreator = (event) => {
  return {
    type: changeQuantity,
    payload: event,
  };
};
export const cancelOrderCreator = () => {
  return {
    type: cancelOrder,
  };
};

export const toastPostOrderCreator = () => {
  return {
    type: "TOAST_POST_ORDER",
  };
};

export const resetStatusCreator = (event) => {
  return {
    type: resetStatus,
  };
};
