import { get } from "./request";

export const urls = {
  // 登录
  loginByPhone: "/login/cellphone",

  // 获取数据
  getUserAccount: "/user/account",
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
  getTopMv: "/top/mv",
  getMvDetail: "/mv/detail",
  getMvDetailInfo: "/mv/detail/info",
  getMvUrl: "/mv/url",
  getMvComment: "/comment/mv",
  getSimiMv: "/simi/mv",
  getPersonalizedMv: "/personalized/mv",
  getLastMv: "/mv/first",
  getQrKey: "/login/qr/key",
  getUserEvents: "/user/event",
  getPlaylistComment: "/comment/playlist",
  getRelatedPlaylist: "/related/playlist",

  // 操作
  subscribePlaylist: "/playlist/subscribe",
  createQr: "/login/qr/create",
  checkQr: "/login/qr/check",
};

// 手机号登录
export function loginByPhone(phone, password) {
  return get(urls.loginByPhone, { phone, password });
}

// 账户详情
export function getUserAccount(cookie) {
  return get(urls.getUserAccount, { cookie });
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
export function getSearchResult(keywords, type = 1) {
  return get(urls.getSearchResult, { keywords, type });
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
export function getToplistArtist(type = 1) {
  return get(urls.getToplistArtist, { type });
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

// 获取MV排行榜
export function getTopMv() {
  return get(urls.getTopMv, {});
}

// 获取MV详情
export function getMvDetail(mvid) {
  return get(urls.getMvDetail, { mvid });
}

// 获取MV点赞转发评论数数据
export function getMvDetailInfo(mvid) {
  return get(urls.getMvDetailInfo, { mvid });
}
//获取MV播放地址
export function getMvUrl(id) {
  return get(urls.getMvUrl, { id });
}

// 获取MV评论
export function getMvComment(id, page = 1) {
  return get(urls.getMvComment, { id, limit: 5, offset: (page - 1) * 5 });
}

// 获取相似MV
export function getSimiMv(mvid) {
  return get(urls.getSimiMv, { mvid });
}

// 获取推荐MV
export function getPersonalizedMv() {
  return get(urls.getPersonalizedMv, {});
}

// 获取最新MV
export function getLastMv() {
  return get(urls.getLastMv, {});
}

// 获取二维码Key
export function getQrKey() {
  return get(urls.getQrKey, {});
}

// 创建二维码
export function createQr(key) {
  return get(urls.createQr, { key, qrimg: true });
}

// 检测二维码状态
export function checkQr(key) {
  return get(urls.checkQr, { key });
}

// 获取用户动态
export function getUserEvents(uid) {
  return get(urls.getUserEvents, { uid });
}

// 获取歌单评论
export function getPlaylistComment(id, page) {
  return get(urls.getPlaylistComment, {
    id,
    limit: 20,
    offset: (page - 1) * 20,
  });
}

//获取相似歌单
export function getRelatedPlaylist(id) {
  return get(urls.getRelatedPlaylist, { id });
}
