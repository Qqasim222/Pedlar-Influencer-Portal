import { async } from "@firebase/util";
import axios from "axios";
// import moment from "moment";
// eslint-disable-next-line
import {
  LogOut,
  getIdTokenFuntion,
  auth,
  getIdCurrentUserToken,
} from "../../src/firebase";

const globalRequest = async (
  method = "get",
  url,
  data = {},
  options = {},
  token = false,
  accessToken = "",
  userHeader = {}
) => {
  try {
    let headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      let tokenData = await getIdCurrentUserToken(false);
      headers.authorization = "Bearer " + tokenData.token; //localStorage.getItem("accessToken");
    }
    let d = {
      method: method,
      url: url,
      headers: {
        ...headers,
        userHeader,
      },
      ...options,
    };
    if (data) {
      d.data = data;
    }

    return new Promise((resolve, reject) => {
      axios(d)
        .then((response) => {
          // var res = getIdTokenFuntion();
          // if (!res) {
          //   LogOut();
          // }
          resolve(response);
        })
        .catch((err) => {
          if (err.response.status === 401) {
            // LogOut();
            //window.location.href = "/";
          }

          reject("An error occurred. Please try again.");
        });
    });
  } catch (error) {
    return new Promise((resolve, reject) => {
      reject("An error occurred. Please try again.");
    });
  }
  //gloabl axios request for post get put and delete
};

export default globalRequest;
