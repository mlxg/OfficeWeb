/**
 * Created by Huhy on 2016/8/26.
 */
import * as navBar from '../constants/headNarbarTypes'

const state = {
	curRoute: '/process',					// 当前项 默认为 /process
	ignoreRoute: ['/setting'],		// 屏蔽项
  singleRoute: ['/task'],       // 设定死没有子菜单的
	url: '/a/sys/menu/getMenus',	// 请求数据的地址
	navData: [],									// 一级菜单
	subMenuTitle: '',							// 二级菜单的标题
	subMenus: [],								  // 左侧二级菜单
	messageCount: 0,							// 未读消息数
}

const mutations = {
	[navBar.HEADNAVBAR_SETNAVBAR] (state, navData) {
		state.navData = navData
	},
	[navBar.HEADNAVBAR_SETSUBMENU] (state, param) {
		state.subMenuTitle = param.title;
		state.subMenus = param.subMenus;
	},
	[navBar.HEADNAVBAR_SETCURROUTE] (state, route){
		state.curRoute = route || '/process'
	},
	[navBar.HEADNAVBAR_SETMESSAGE] (state, param){
		state.messageCount = param;
	},
}

export default {
	state,
	mutations
}
