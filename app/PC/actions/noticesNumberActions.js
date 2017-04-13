/**
 * 修改待办事宜通知数目
 * @param dispatch
 * @param params
 */
export const updateTodolistNum = function ({ dispatch}, params){
  dispatch('UPDATETODOLISTNUM',params);
}

/**
 * 修改待我的抄送通知数目
 * @param dispatch
 * @param params
 */
export const updateCopiesListNum = function ({ dispatch}, params){
  dispatch('UPDATECOPIESLISTNUM',params);
}