import { get } from "./request";

export const urls = {
  loginByPhone: "/login/cellphone",
  getUserDetail: "/user/detail",
  getPersonalizedPlaylist: "/personalized",
  getPlaylistDetail: "/playlist/detail",
  getSongDetail: "/song/detail",
  getSongUrl: "/song/url",
  getSongLyric: "/lyric",
  getUserPlaylist: "/user/playlist",
  getRecommendSongs: "/recommend/songs",
  getRecommendPlaylist: "/recommend/resource",
  getSearchSuggest: "/search/suggest",
  getSearchResult: "/cloudsearch",
  getHighQualityPlaylist: "/top/playlist/highquality",
  getHighQualityPlaylistTags: "/playlist/highquality/tags",
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

// 获取音乐Url
export function getSongUrl(id) {
  return get(urls.getSongUrl, { id });
}

// 获取音乐Lyric
export function getSongLyric(id) {
  return get(urls.getSongLyric, { id });
}

// 获取用户歌单列表
export function getUserPlaylist(uid, limit = 30, offset = 0) {
  return get(urls.getUserPlaylist, { uid, limit, offset });
}

// 获取用户推荐歌曲
export function getRecommendSongs() {
  return get(urls.getRecommendSongs, {});
}

// 获取用户推荐歌单
export function getRecommendPlaylist() {
  return get(urls.getRecommendPlaylist, {});
}

// 获取搜索建议
export function getSearchSuggest(keywords) {
  return get(urls.getSearchSuggest, { keywords, type: "mobile" });
}

// 获取搜索结果
export function getSearchResult(keywords) {
  return get(urls.getSearchResult, { keywords });
}

// 获取精品歌单
export function getHighQualityPlaylist(cat = "全部", limit = 30) {
  return get(urls.getHighQualityPlaylist, { cat, limit });
}

// 获取精品歌单标签
export function getHighQualityPlaylistTags() {
  return get(urls.getHighQualityPlaylistTags, {});
}
