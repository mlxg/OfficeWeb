/**
 * Created by Huhy on 2016/8/30.
 */
/**
 * 获取url
 * @param state
 */
export const getUrl = state => state.globalSelect.url;
/**
 * 获取curType
 * @param state
 */
export const getCurType = state => state.globalSelect.curType;
/**
 * 获取当前type对应的数据
 * @param state
 * @returns {*}
 */
export const getCurData = state => {
  let type = state.globalSelect.curType;
  let result = {};
  type.forEach((item) => {
    result[item] = state.globalSelect[item]
  });
  return result;
}
