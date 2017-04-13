/**
 * Created by girl on 16/8/16.
 */
// 这个 getter 函数会返回 相应的值

export const loginGetResult     = state => state.loginCmp.loginTabCmp.btmCntCmp.result;   //登录请求后返回的json
export const loginGetBouncedFlag = state => state.loginCmp.loginTabCmp.bouncFlg;  //切换的标志
export const loginGetBtmCnt      = state => state.loginCmp.loginTabCmp.btmCntCmp;  //登录按钮参数
export const loginGetOtp         = state => state.loginCmp.loginTabCmp.getOtpCmp;  //获取手机验证码的参数
