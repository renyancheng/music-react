import { get, post } from "./request";

export const urls = {
  loginByPhone: "/login/cellphone",
};

export function loginByPhone(phone, password) {
  return get(urls.loginByPhone, { phone, password });
}
