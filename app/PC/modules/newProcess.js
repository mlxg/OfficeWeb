/**
 * Created by Huhy on 2016/8/29.
 */
import * as type from '../constants/newProcessTypes'

const state = {
  menus: [],                                // 菜单数据
  url: '/a/sys/menu/getSecondLevelMenus',   // 请求地址
  route: '/process/new'                     // 新建流程的路由
}

const mutations = {
  [type.NEWPROCESS_SETMENUS] (state, menus) {
    state.menus = menus
  }
}

export default {
  state,
  mutations
}
