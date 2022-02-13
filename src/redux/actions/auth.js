import { USER_LOGIN } from "../constant";

export const userLogin = (data) => ({
  type: USER_LOGIN,
  data,
});
