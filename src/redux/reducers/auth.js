import { set, get, rm } from "lockr";
import { USER_LOGIN, USER_LOGOUT } from "../constant";

const initState = {
  profile: get("profile") || null,
  cookie: get("cookie") || null,
  isLogin: get("isLogin") || false,
};

export default function auth(perState = initState, { type, data }) {
  switch (type) {
    // 用户登录
    case USER_LOGIN:
      set("profile", data.profile);
      set("cookie", data.cookie);
      set("isLogin", true);
      return {
        profile: data.profile,
        cookie: data.cookie,
        isLogin: true,
      };
    // 用户退出登录
    case USER_LOGOUT:
      rm("profile");
      rm("cookie");
      rm("isLogin");
      return {
        profile: null,
        cookie: null,
        isLogin: null,
      };
    default:
      return perState;
  }
}
