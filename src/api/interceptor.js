import axios from "axios";
import { store } from "../redux/store";

// 创建一个独立的axios实例
const service = axios.create({
  // 设置baseUr地址,如果通过proxy跨域可直接填写base地址
  // baseURL: "https://neteasemusicapi.vercel.app",
  // baseURL: "https://api-music.imsyy.top/",
  // baseURL: "http://cloud-music.pl-fe.cn/",
  // baseURL: "http://localhost:4000",
  baseURL: "https://mu-api.yuk0.com/",
  // 定义统一的请求头部
  headers: {},
  // 配置请求超时时间
  timeout: 10000,
  // 如果用的JSONP，可以配置此参数带上cookie凭证，如果是代理和CORS不用设置
  withCredentials: true,
});
// 请求拦截
service.interceptors.request.use((config) => {
  const state = store.getState();
  // 自定义header，可添加项目token
  // console.log(config);
  if (state.auth.cookie) config.params.cookie = state.auth.cookie;
  config.params.realIP = "183.197.189.111";
  config.params.timestamp = Date.now();
  return config;
});
// 返回拦截
service.interceptors.response.use(
  (response) => {
    // 获取接口返回结果
    const res = response.data;
    // code为200，直接把结果返回回去
    if (res.code === 200) {
      return res;
      // code为301让它去登录
    } else if (response.status === 301) {
      // 也可使用router进行跳转
      window.location.href = "/#/login";
      return res;
    } else {
      return res;
    }
  },
  (error) => {
    const res = error.response.data;
    return res;
  }
);
export default service;
