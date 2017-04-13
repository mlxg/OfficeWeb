/**
 * Created by Huhy on 2016/8/29.
 */
import * as type from '../constants/newProcessTypes'

/**
 * 获取菜单数据
 * @param dispatch
 */
export const getData = function ({ dispatch }) {
  let curNav = this.subMenus.find((menu) => menu.route == this.route);
  if(!curNav) return;
  this.$http.post(this.url, {id: curNav.id}).then((response) => {
    let data = response.json().result;
    dispatch(type.NEWPROCESS_SETMENUS, data)
  }, (response) => {
    // error callback
  });
}
