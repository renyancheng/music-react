import { Fragment } from "react";
import { get, post } from "./request";

export const urls = {
  loginByPhone: "/login/cellphone",
  getUserDetail: "/user/detail",
  getPersonalizedPlaylist: "/personalized",
  getPlaylistDetail: "/playlist/detail",
  getSongDetail: "/song/detail"
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

// 歌单详情
export function getPlaylistDetail(id) {
  return get(urls.getPlaylistDetail, { id });
}

// 获取歌曲详情
export function getSongDetail(ids) {
  return get(urls.getSongDetail, { ids });
}
