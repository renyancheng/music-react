import { USER_LOGIN, USER_LOGOUT } from "../constant";

export const userLogin = (data) => ({
  type: USER_LOGIN,
  data,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
