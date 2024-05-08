/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import constant from "../constant";
import api from "../api";
import globalRequest from "./globalRequest";

export default {
  REGISTER_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Auth.REGISTER(),
          data
        );

        //
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  VERIFY_EMAIL: (data) => {
    let encodeEmail = data?.value;
    if (encodeEmail.includes("+")) {
      encodeEmail = encodeEmail.replace("+", "%2B");
    }
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.Auth.VALIDATE_EMAIL(encodeEmail)
        );

        //
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  VERIFY_DOMAIN_NAME: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.Auth.VALIDATE_DOMAIN_NAME(data)
        );

        //
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },

  GET_LOGIN_STATE: (accessToken, id, params = {}) => {
    let url = constant.BASE_URL + api.Auth.GET_USER_DETAILS(id);
    return globalRequest("get", url, {}, { params: params }, true, accessToken);
  },
  UPDATE_LOGIN_STATE: (accessToken, params = {}) => {
    let url = constant.BASE_URL + api.Auth.UPDATE_LOGIN_STATE();
    return globalRequest(
      "post",
      url,
      {},
      { params: params },
      true,
      accessToken
    );
  },
  LOGIN_USER: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Auth.LOGIN(),
          data,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        localStorage.setItem("access_token", response.data.data.access_token);
        Axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("access_token");
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  VERIFY_OTP: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Login.OTP(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RESEND_OTP: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.ResendOTP.RESENDOTP(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  FORGOT_PASSWORD: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.ForgotPassword.FORGOTPASSWORD(data)
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  RESET_PASSWORD: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.ResetPassword.RESETPASSWORD(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
  GET_INSTALLER_DETAILS: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.get(
          constant.BASE_URL + api.GetinstallerDetails.GETINSTALLERDETAILS(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  }
};
