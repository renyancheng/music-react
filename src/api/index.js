import { get } from "./request";

export const urls = {
  // 登录
  loginByPhone: "/login/cellphone",

  // 获取数据
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
  getToplistDetail: "/toplist/detail",
  getToplistArtist: "/toplist/artist",
  getArtistDetail: "/artist/detail",
  getArtistDesc: "/artist/desc",
  getSimiArtist: "/simi/artist",
  getArtistTopSong: "/artist/top/song",

  // 操作
  subscribePlaylist: "/playlist/subscribe",
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

// 收藏歌单
export function subscribePlaylist(id, type) {
  let t = type ? "1" : "2";
  return get(urls.subscribePlaylist, { id, t });
}

// 获取排行榜
export function getToplistDetail() {
  return get(urls.getToplistDetail, {});
}

// 获取歌手排行榜
export function getToplistArtist() {
  return get(urls.getToplistArtist, {});
}

// 获取歌手详情
export function getArtistDetail(id) {
  return get(urls.getArtistDetail, { id });
}
// 获取歌手介绍
export function getArtistDesc(id) {
  return get(urls.getArtistDesc, { id });
}
// 获取相似歌手
export function getSimiArtist(id) {
  return get(urls.getSimiArtist, { id });
}

// 获取歌手热门50首歌曲
export function getArtistTopSong(id) {
  return get(urls.getArtistTopSong, { id });
}
