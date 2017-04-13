/**
 * 此处写公共的action方法
 */
//export const loginLoginTabGetOtpFun= function({ dispatch, state }){
//    dispatch(types.LOGINTAB_BOUNCED,param);
//};
import validateAndSubmit from '../../js/validateAndSubmit';


export const ajaxRequst=({ dispatch, state },params={})=>{
    console.log(params);
    params.dispatch = dispatch;
    params.getState = state;
    validateAndSubmit(params);
};
