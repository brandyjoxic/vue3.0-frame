import request from "@/axios/axios.js";
/**
 * @description 用微信临时票据code参数登录用户中心获取token
 * @param {string} code - 微信网页授权获取的临时票据code参数
 */
export function login(code) {
  return request.post(`${process.env.VUE_APP_SERVICE_API_URL}/v1/user/login`, {
    appid: process.env.VUE_APP_APPID,
    source: process.env.VUE_APP_SOURCE,
    third_platform_token: code
  });
}

/**
 * @description 前端刷新token
 * @param refresh_token 用来获取最新token的refresh_token
 */
export function refreshToken(refresh_token) {
  return request.post(
    `${process.env.VUE_APP_SERVICE_API_URL}/v1/user/refreshToken`,
    {
      appid: process.env.VUE_APP_APPID,
      refresh_token
    }
  );
}

/**
 * @description 获取用户数据
 * @param token 登录所得到的token
 */
export function userData(token) {
  return request.get(`${process.env.VUE_APP_SERVICE_API_URL}//v1/user/query`, {
    token: token
  });
}
