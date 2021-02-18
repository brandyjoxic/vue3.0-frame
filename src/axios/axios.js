import axios from "axios";
import { refreshToken } from "./userService.js";
import { wechatWebsiteAuth } from "./wechat.js";
import qs from "qs";
// 将对象中值为空的过滤掉
function filterObject(obj) {
  if (obj && obj instanceof Object) {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        if (obj[key] === "" || obj[key] === undefined || obj[key] === null) {
          delete obj[key];
        }
      }
    }
  }
}
// check是否是对象
function checkJSON(obj) {
  let ret = false;
  if (obj && obj instanceof Object) {
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof Object || obj[key] instanceof Array) {
          ret = true;
        }
      }
    }
  }
  return ret;
}

const instance = axios.create({
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  timeout: 15000,
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`
});

// 是否在刷新的flag
let isRefreshing = false;
// 重试队列，每一项是一个待执行的函数形式
let requests = [];

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      if (config.method === "GET" || config.method === "get") {
        filterObject(config.params);
        config.params = config.params || {};
        config.params.token = token;
      }
      if (config.method === "POST" || config.method === "post") {
        filterObject(config.data);
        config.data = config.data || {};
        config.data.token = token;
      }
      // if (checkJSON(config.data) || config.type === "json") {
      //   config.headers["Content-Type"] = "application/json;charset=utf-8";
      // }
      // if (config.type === "upload") {
      //   config.headers["Content-Type"] = "multipart/form-data";
      // }
      // if (
      //   config.headers["Content-Type"] === "application/x-www-form-urlencoded"
      // ) {
      //   config.data = qs.stringify(config.data);
      // }
    }
    config.data = qs.stringify(config.data);
    return config;
  },
  err => Promise.reject(err)
);
instance.interceptors.response.use(
  async res => {
    // 获取当前失败的请求
    const config = res.config;
    if (res.data.code == 40003) {
      // 防止多次刷新，判断flag是否正在刷新token的状态
      if (!isRefreshing) {
        isRefreshing = true;
        const refreshTokenRes = await refreshToken(
          localStorage.getItem("refresh_token")
        );
        // console.log(refreshTokenRes);
        if (
          refreshTokenRes.code === 0 &&
          Object.keys(refreshTokenRes.data).length
        ) {
          localStorage.setItem("token", refreshTokenRes.data.token);
          localStorage.setItem(
            "refresh_token",
            refreshTokenRes.data.refresh_token
          );
          localStorage.setItem("expire_in", refreshTokenRes.data.expire_in);
          localStorage.setItem(
            "login_time",
            Date.parse(new Date().toString()).toString()
          );
          // config.baseURL = "";
          config.data = qs.parse(config.data);
          // 已经刷新了token，将所有队列中的请求进行重试
          requests.forEach(cb => cb(localStorage.getItem("token")));
          requests = [];
          isRefreshing = false;
          return instance(config);
        }
      } else {
        return new Promise(resolve => {
          requests.push(token => {
            // config.baseURL = "";
            config.data = qs.parse(config.data);
            if (config.method === "GET" || config.method === "get") {
              config.params.token = token;
            }
            if (config.method === "POST" || config.method === "post") {
              config.data.token = token;
            }
            resolve(instance(config));
          });
        });
      }
    } else if (res.data.code === 400031 || res.data.code === 40001) {
      localStorage.removeItem("token");
      const query = qs.parse(location.search, { ignoreQueryPrefix: true });
      const queryObj = {};
      for (const key in query) {
        if (key !== "code" && key !== "state") {
          queryObj[key] = query[key];
        }
      }
      const redirect_uri = `${location.origin}${location.pathname}${
        qs.stringify(queryObj) ? `?${qs.stringify(queryObj)}` : ""
      }${location.hash}`;
      await wechatWebsiteAuth(redirect_uri);
    }
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
