/**
 * Created by girl on 16/8/1.
 */
export default {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    LOGINTAB_BOUNCED (state,param) {
        state.loginTabCmp.bouncFlg = param;
    },
    LOGINTAB_STOPOTP (state){
      const getOtp = state.loginTabCmp.getOtpCmp;
        getOtp.otpFlag = true;
    }
};
