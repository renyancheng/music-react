import { set, get } from "lockr";
import { USER_LOGIN } from "../constant";

const initState = {
  profile: get("profile") || null,
  cookie: get("cookie") || null,
  isLogin: get("isLogin") || false,
};

export default function auth(perState = initState, { type, data }) {
  switch (type) {
    case USER_LOGIN:
      set("profile", data.profile);
      set("cookie", data.cookie);
      set("isLogin", true);
      return {
        profile: data.profile,
        cookie: data.cookie,
        isLogin: true,
      };
    default:
      return perState;
  }
}
