/**
 * Created by Huhy on 2016/8/29.
 */
/**
 * 获取标题
 * @param state
 */
export const getTitle = state => state.globalDialog.title;
/**
 * 获取提示信息
 * @param state
 */
export const getMessage = state => state.globalDialog.message;
/**
 * 获取图标
 * @param state
 */
export const getIcon = state => state.globalDialog.icon;
/**
 * 获取是否显示
 * @param state
 */
export const getIsShow = state => state.globalDialog.isShow;
/**
 * 获取确认按钮
 * @param state
 */
export const getConfirm = state => state.globalDialog.confirm;
/**
 * 获取取消按钮
 * @param state
 */
export const getCancel = state => state.globalDialog.cancel;
/**
 * 获取关闭按钮
 * @param state
 */
export const getClose = state => state.globalDialog.close;
