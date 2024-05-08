/* eslint-disable import/no-anonymous-default-export */
export default {
  REGISTER: () => `/user/register`,
  LOGIN: () => `/user/login`,
  GET_USER_DETAILS: (id) => `/user/${id}/details`,
  UPDATE_LOGIN_STATE: () => `/user/login-state`,
  VALIDATE_EMAIL: (encodeEmail) =>
    `/user/validate?key=email&value=${encodeEmail}`,
  VALIDATE_DOMAIN_NAME: (data) =>
    `/user/validate?key=storename&value=${data?.value}`
};
