import { get, post } from "./request";

export const urls = {
  loginByPhone: "/login/cellphone",
  getUserDetail: "/user/detail",
  getPersonalizedPlaylist: "/personalized",
};

// 手机号登录
export function loginByPhone(phone, password) {
  return get(urls.loginByPhone, { phone, password });
}

// 用户详情
export function getUserDetail(uid) {
  return get(urls.getUserDetail, { uid });
}

// 推荐歌单
export function getPersonalizedPlaylist(limit = 30) {
  return get(urls.getPersonalizedPlaylist, { limit });
}
