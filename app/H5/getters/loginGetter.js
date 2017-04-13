/**
 * Created by girl on 16/8/16.
 */
// 这个 getter 函数会返回 相应的值

export const loginGetResulte = state => state.login.loginTab.resulte;   //登录请求后返回的json
export const loginGetBounced = state => state.login.loginTab.bouncFlg;  //切换的标志
export const loginGetBtmCnt  = state  => state.login.loginTab.btmCnt;  //切换的标志
export const loginLoadFlag   = state   => state.login.loginTab.btnFlag;  //切换的标志
