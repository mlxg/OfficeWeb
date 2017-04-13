/**
 * Created by girl on 16/8/5.
 */
import * as types from '../constants/loginActionTypes';
import $ from 'jquery';
import validateAndSubmit from '../js/validateAndSubmit';
//导出登录的方法
//所有的方法必须加 fun
export const loginLoginTabLoginFun = function ({ dispatch, state }) {
    const loginType = $('[name="type"].current').attr('value') == '1',
          autoLogin = $('[name="autoLogin"]:checked').val();    //自动登录标志
    let [userName,nameMsg,password,pswMsg]=['username', '用户名', 'password', '密码'];
    if (loginType) {
        [userName,nameMsg,password,pswMsg]=['mobile', '手机号', 'verificationCode', '验证码'];
    }
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        contentType:"application/x-www-form-urlencoded",
        componentLst: ['loginCmp', 'loginTabCmp', 'btmCntCmp'],
        loadFlg: 'btnFlag',
        moreParams: {autoLogin: autoLogin},
        validates: [
            {'name': userName, 'rules': [{'rule': 'isEmpty', 'errorMsg': `${nameMsg}不能为空`}]},
            {'name': password, 'rules': [{'rule': 'isEmpty', 'errorMsg': `${pswMsg}不能为空`}]},
            {'name': 'type', 'checkClass': 'current'}
        ]
    });
};

//获取手机验证码
export const loginLoginTabGetOtpFun = function ({ dispatch, state }) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        submitType:'Get',
        componentLst: ['loginCmp', 'loginTabCmp', 'getOtpCmp'],
        loadFlg: 'otpLoadFlag', //loading标志
        otpFlag: 'otpFlag',     //倒数标志
        validates: [
            {'name': 'mobile', 'rules': [{'rule': 'isPhone', 'errorMsg': '手机号必须为11位纯数子'}, {'rule': 'isEmpty', 'errorMsg': '手机号不能为空'}]}
        ]
    });
};
//停止otp倒数
export const loginLoginTabGetStopOtpFun = function ({ dispatch }) {
    dispatch(types.LOGINTAB_STOPOTP);
};

//导出弹框的方法
export const loginLoginTabBouncedFun = function ({ dispatch }, param) {
    dispatch(types.LOGINTAB_BOUNCED, param);
};


//这些方法都导出,在其他文件导入时候,使用import * as actions 就可以生成一个actions对象包含所有的export
