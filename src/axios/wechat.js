import request from "@/axios/axios.js";

/**
 * @description 微信网页授权
 * @param {string} appId 公众号唯一标识
 * @param {string} redirectUri 授权后重定向的回调链接地址
 * @param {string} scope 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
 * @param {string?} state 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
 */
export async function wechatWebsiteAuth(redirect_uri, state) {
  location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${
    process.env.VUE_APP_APPID
  }&redirect_uri=${encodeURIComponent(redirect_uri)}&response_type=code&scope=${
    process.env.VUE_APP_SCOPE
  }${state ? `&state=${state}` : ""}#wechat_redirect`;
}

/**
 * @description 微信js bridge
 * @param {string} source 用户中心source
 */
export function getWeixinJsBridgeService(source = process.env.VUE_APP_SOURCE) {
  const options = { params: {} };
  if (source) {
    options.params.source = source;
  }
  return request.get(
    `${process.env.VUE_APP_SERVICE_API_URL}/v1/user/getWeixinJsBridge`,
    options
  );
}
