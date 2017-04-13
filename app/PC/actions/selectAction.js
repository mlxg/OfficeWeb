/**
 * 全局的select对应的action
 *
 * 根据一个carType来给对应类型的select请求数据，
 * 并传递给对应的mutation
 * Created by Huhy on 2016/8/30.
 */

const SELECT_CURTYPE = 'SELECT_CURTYPE';
/**
 * 重置当前type
 * @param dispatch
 * @param curTypes
 */
export const resetCurType = function({ dispatch }, types, curTypes){
    if(types == curTypes) return;
    dispatch(SELECT_CURTYPE, types)
}

/**
 * 依据当前type请求数据
 * @param dispatch
 * @param data
 * @param index
 */
export const getDataByType = function({ dispatch }, data, index){
  if(!!index) return;
  let $http = this.$http,
       url = this.url;

  Object.keys(data).forEach((item) => {
      if (!data[item]) getData($http, url, item, (data) => {
          dispatch(item, data)
      })
  })
}

function getData($http, url, type, callback) {
  $http.post(url, {'type': type}).then((response) => {
      callback(response.json().result)
  });
}
