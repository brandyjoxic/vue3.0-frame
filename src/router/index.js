import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import { wechatWebsiteAuth, getWeixinJsBridgeService } from "@/axios/wechat.js";
import { login, userData } from "@/axios/userService.js";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/learn",
    name: "Learn",
    component: () => import("../views/Learn.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const whiteList = ["Other"];
router.beforeEach(async (to, from, next) => {
  // 若没有token, 则需要登录,白名单的不需要登录
  if (whiteList.indexOf(to.name) == 0) {
    next();
    return;
  }
  // if (!localStorage.getItem("token")) {
  //   const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  //   //微信浏览器登录
  //   if (localStorage.getItem("browser") == "micromessenger") {
  //     // 若url的search中包含微信code参数，则用此参数登录用户中心换取token
  //     if (query.code) {
  //       const { data } = await login(query.code);
  //       if (data && data.token && data.refresh_token) {
  //         localStorage.setItem("token", data.token);
  //         localStorage.setItem("refresh_token", data.refresh_token);
  //         localStorage.setItem("expire_in", data.expire_in);
  //         localStorage.setItem(
  //           "login_time",
  //           Date.parse(new Date().toString()).toString()
  //         );
  //         let user_info = await userData(data.token);
  //         localStorage.setItem("user_info", JSON.stringify(user_info.data));
  //         next();
  //       }
  //     } else {
  //       // 若url的search中不包含code，则需要微信网页授权换取ccode参数登录用户中心
  //       const queryObj = {};
  //       for (const key in query) {
  //         if (key !== "code" && key !== "state") {
  //           queryObj[key] = query[key];
  //         }
  //       }
  //       const redirect_uri = `${location.origin}${location.pathname}${
  //         qs.stringify(queryObj) ? `?${qs.stringify(queryObj)}` : ""
  //       }${location.hash}`;
  //       console.log("当前路径:", location.href);
  //       console.log("跳转路径:", redirect_uri);
  //       wechatWebsiteAuth(redirect_uri);
  //     }
  //   }
  // } else {
  //   next();
  // }
  next();
  // getWeixinJsBridgeService().then(res => {
  //   wx.config({
  //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //     appId: process.env.VUE_APP_APPID, // 必填，公众号的唯一标识
  //     timestamp: res.data.timestamp, // 必填，生成签名的时间戳
  //     nonceStr: res.data.noncestr, // 必填，生成签名的随机串
  //     signature: res.data.signature, // 必填，签名
  //     jsApiList: [
  //       "showMenuItems",
  //       "hideMenuItems",
  //       "updateAppMessageShareData",
  //       "updateTimelineShareData",
  //       "onMenuShareAppMessage",
  //       "onMenuShareTimeline"
  //     ] // 必填，需要使用的JS接口列表
  //   });
  // });
});
export default router;
