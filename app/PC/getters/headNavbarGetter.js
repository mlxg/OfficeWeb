/**
 * Created by Huhy on 2016/8/26.
 */
/**
 * 获取一级菜单
 * @param state
 */
export const getNavBar = state => state.headNavBar.navData;
/**
 * 获取二级菜单
 * @param state
 */
export const getSubMenus = (state) => state.headNavBar.subMenus
/**
 * 获取二级菜单的标题
 * @param state
 */
export const getSubMenuTitle = (state) => state.headNavBar.subMenuTitle
/**
 * 获取url
 * @param state
 */
export const getUrl = state => state.headNavBar.url;
/**
 * 获取当前选中的一级菜单路由
 * @param state
 */
export const getCurRoute = state => state.headNavBar.curRoute;
/**
 * 获取屏蔽不展示的一级菜单的路由
 * @param state
 */
export const getIgnoreRoute = state => state.headNavBar.ignoreRoute;
/**
 * 获取设定为没有二级菜单的路由
 * @param state
 */
export const getSingleRoute = state => state.headNavBar.singleRoute;

/**
 * 获取当前未读消息总数
 * @param state
 * */
 export const getMessageCount = state => state.headNavBar.messageCount;
