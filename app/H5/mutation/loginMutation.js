/**
 * Created by girl on 16/8/1.
 */
import {LOGINTAB_BOUNCED} from'../constants/loginActionTypes';
import {loginState} from'../initState/loginState';

export  const loginMutation = {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    LOGINTAB_BOUNCED (loginState,param) {
        loginState.login.loginTab.bouncFlg = param;
    }
};
