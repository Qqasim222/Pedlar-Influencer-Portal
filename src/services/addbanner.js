/* eslint-disable import/no-anonymous-default-export */
import constant from "../constant";
import api from "../api";
import globalRequest from "./globalRequest";
//import { auth } from "../firebase";//auth, LogOut
export default {
  GET_USER: (accessToken, uid, params) => {
    let url =
      constant.BASE_URL + api.Addbanner.GETUSER() + "/" + uid + "/details";
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  ADD_DESCRIPTION_TO_STORE: async (accessToken, body) => {
    let url = constant.BASE_URL + api.Addbanner.ADDDESCRIPTIONTOSTORE();
    return await globalRequest("post", url, body, {}, true, accessToken);
  },
  ADD_SOCIALLINK_TO_STORE: async (accessToken, body) => {
    let url = constant.BASE_URL + api.Addbanner.ADDSOCIALLINKTOSTORE();
    return await globalRequest("post", url, body, {}, true, accessToken);
  },
  ADD_BANNERIMAGE_TO_STORE: async (accessToken, body) => {
    let url = constant.BASE_URL + api.Addbanner.ADDBANNERIMAGETOSTORE();
    return await globalRequest("post", url, body, {}, true, accessToken, {
      "Content-Type": "multipart/form-data",
    });
  },
  GET_ACCESS_TOKEN: async (body) => {
    let url = constant.BASE_URL + api.Addbanner.GETACCESSTOKEN();
    return await globalRequest("post", url, body, {}, true, {
      "Content-Type": "application/json",
    });
  },
};
