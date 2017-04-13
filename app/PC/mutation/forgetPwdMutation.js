export default {
  SETERRORMSG (state, {status, message}) {
    state.forgetPwdTabCmp.btmCntCmp.result = {
      status, message
    }
  }
};
