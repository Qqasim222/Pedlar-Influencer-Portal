export const gtmEvents = (data) => {
  const pageEvent = {
    ...data,
  };

  //@ts-ignore
  window?.dataLayer?.push({ ecommerce: null });
  window?.dataLayer?.push(data);
};

export const loginSuccess = (userID) => {
  return gtmEvents({
    event: "login_success",
    user_id: userID,
    login_status: "logged_in",
  });
};

export const signUpSucess = (userID) => {
  return gtmEvents({
    event: "create_account",
    user_id: userID,
  });
};
export const userIsLOggedIn = (userID) => {
  return gtmEvents({
    user_id: userID,
    login_status: "logged_in",
  });
};
