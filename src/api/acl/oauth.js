import request from "@utils/request";

const BASE_URL = "/oauth";
// http://localhost:5000/oauth/sign_in/digits

// 获取验证码的api方法
export function reqGetVerifyCode (mobile) {
  return request({
    url: `${BASE_URL}/sign_in/digits`,
    method: "POST",
    data: {
      mobile: mobile
    }
  });
}

// 手机登陆api
export function reqMobileLogin (mobile, code) {
  return request({
    url: `${BASE_URL}/mobile`,
    method: "POST",
    data: {
      mobile: mobile,
      code: code
    }
  });
}