/* eslint-disable import/no-anonymous-default-export */
import constant from "../constant";
import api from "../api";
import globalRequest from "./globalRequest";
//import { auth } from "../firebase";//auth, LogOut
export default {
  ADD_PRODUCT_TO_STORE: async (accessToken, body) => {
    let url = constant.BASE_URL + api.Product.ADDPRODUCTTOSTORE();
    return await globalRequest("post", url, body, {}, true, accessToken);
  },
  DELETE_PRODUCT_FROM_STORE: async (accessToken, body) => {
    body = JSON.stringify(body);
    let url = constant.BASE_URL + api.Product.ADDPRODUCTTOSTORE();
    let response = await globalRequest(
      "delete",
      url,
      body,
      {},
      true,
      accessToken
    );
    return response;
  },
  GET_ALL: (accessToken, params) => {
    let url = constant.BASE_URL + api.Product.GETALL();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_PRODUCTS_ADD_BANNER_PAGE: (accessToken, params) => {
    let url = constant.BASE_URL + api.Product.GETPRODUCTSOFADDBANNERPAGE();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_CURATED_BRANDS: (accessToken, params) => {
    let url = constant.BASE_URL + api.Product.GETCURATEDBRANDS();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_PRODUCTS_MODAL: (accessToken, params, paginationData) => {
    let url = constant.BASE_URL + api.Product.GETPRODUCTSMODAL(paginationData);
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_INVENTORY_INITIAL_PRODUCTS: (accessToken, params) => {
    let url = constant.BASE_URL + api.Product.GETINVENTORYINITIALPRODUCTS();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_ALL_PAGINATION_DATA: (accessToken, params, paginationData) => {
    let url =
      constant.BASE_URL + api.Product.GETALLPAGINATIONDATA(paginationData);
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_ALL_PAGINATION_DATA_BACKWARD: (accessToken, params, paginationData) => {
    let url =
      constant.BASE_URL +
      api.Product.GETALLPAGINATIONDATABACKWARD(paginationData);
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_PRODUCT: (accessToken, id) => {
    let url = constant.BASE_URL + api.Product.GETALL() + "/" + id;
    return globalRequest("get", url, {}, {}, true, accessToken);
  },
  GET_PRODUCT_DETAIL: (accessToken, id) => {
    let url = constant.BASE_URL + api.Product.GETALLPRODUCTDETAIL() + "/" + id;
    return globalRequest("get", url, {}, {}, true, accessToken);
  },
  GET_ALL_VENDORS: (accessToken, params) => {
    let url = constant.BASE_URL + api.Product.GETALLVENDORS();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_ALL_TYPES: (accessToken, params) => {
    let url = constant.BASE_URL + api.Product.GETALLTYPES();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  GET_COUNT: (accessToken, params = {}) => {
    let url = constant.BASE_URL + api.Product.GETCOUNT();
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
};
