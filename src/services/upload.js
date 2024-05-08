/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import constant from "../constant";
import api from "../api";

export default {
  UPLOAD_IMAGE: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post(
          constant.BASE_URL + api.Upload.UPLOAD(),
          data
        );
        resolve(response);
      } catch (err) {
        reject(err);
      }
    });
  },
};
