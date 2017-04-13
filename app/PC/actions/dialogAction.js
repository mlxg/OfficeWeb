/**
 * Created by Huhy on 2016/8/29.
 */
import * as type from '../constants/globalDialogTypes'
/**
 * 显示提示框
 * @param dispatch
 * @param params
 */
export const showDialog = function({ dispatch }, params){
  if(params.title) dispatch(type.GLOBOLDIALOG_SETTITLE, params.title);
  if(params.icon) dispatch(type.GLOBOLDIALOG_CHANGEICON, params.icon);
  if(params.message) dispatch(type.GLOBOLDIALOG_SETMESSAGE, params.message);
  if(params.confirm) dispatch(type.GLOBOLDIALOG_SETCONFIRM, params.confirm);
  if(params.close) dispatch(type.GLOBOLDIALOG_SETCLOSE, params.close);
  if(params.cancel) dispatch(type.GLOBOLDIALOG_SETCANCEL, params.cancel);

  dispatch(type.GLOBOLDIALOG_TRIGGERDIAPLAY, true);
}
/**
 * 隐藏提示框
 * @param dispatch
 */
export const hideDialog = function({ dispatch }){
  dispatch(type.GLOBOLDIALOG_TRIGGERDIAPLAY, false);
}
