import instance from "./interceptor";
/**
 * 核心函数，可通过它处理一切请求数据，并做横向扩展
 * @param {url} 请求地址
 * @param {params} 请求参数
 * @param {options} 请求配置，针对当前本次请求；
 */
export function request(url, params, method) {
  return new Promise((resolve, reject) => {
    let data = {};
    // get请求使用params字段
    if (method == "get") data = { params };
    // post请求使用data字段
    if (method == "post") data = { data: params };
    instance({
      url,
      method,
      ...data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        resolve(error);
      });
  });
}

// 封装GET请求
export function get(url, params) {
  return request(url, params, "get");
}
// 封装POST请求
export function post(url, params) {
  return request(url, params, "post");
}
export default {
  get,
  post,
};
