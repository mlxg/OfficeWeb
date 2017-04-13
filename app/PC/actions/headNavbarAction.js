/**
 * Created by Huhy on 2016/8/26.
 */
import * as navBar from '../constants/headNarbarTypes'

/**
 * 获取菜单数据
 * @param dispatch
 */
export const getData = function ({ dispatch }) {
  let vm = this;
  let path = this.$route.path,
      res = path.match(/\/\w+/g);
	getNavBar(vm.$http, vm.url, vm.ignoreRoute, vm.singleRoute, vm.curRoute, function(navData){
		dispatch(navBar.HEADNAVBAR_SETNAVBAR, navData)
	}, function(param){
		dispatch(navBar.HEADNAVBAR_SETSUBMENU, param);
    param.subMenus.length && (!res || !res[1]) && vm.$router.replace(param.subMenus[0].route)
	})
}

/**
 * 改变当前一级菜单路由触发
 * @param dispatch
 * @param route
 */
export const changeCurRoute = function ({ dispatch }, route, subRoute) {
	if(!route && route !== 0) return;

  let vm = this;

	if(typeof route == 'number'){
		route = vm.navData[route].route;
	}

	if (vm.curRoute == route) return vm.$router.replace(vm.subMenus[0].route);

	dispatch(navBar.HEADNAVBAR_SETCURROUTE, route);

	let temp = vm.navData.find((item) => item.route == vm.curRoute);
  if(vm.singleRoute.find((item) => temp.route == item)) {
    dispatch(navBar.HEADNAVBAR_SETSUBMENU, {
      'subMenus': [],
      'title': ''
    })
  } else getSubMenu(vm.$http, vm.url, temp.id, function(param){
		dispatch(navBar.HEADNAVBAR_SETSUBMENU, param);
    if(!subRoute) vm.$router.replace(param.subMenus[0].route)
	})
}

/**
 * 初始化curRoute
 * @param dispatch
 */
export const initCurRoute = function({ dispatch }){
	let path = this.$route.path,
		res = path.match(/^\/\w+/);

    dispatch(navBar.HEADNAVBAR_SETCURROUTE, res ? res[0] : '');
}

/**
 * 更新当前消息未读数
 * @param dispatch
 */
export const updateMsgCount = function({ dispatch }, url){
  let vm = this;
  updateMessageCount(vm.$http,url,function(currentCount){
    dispatch(navBar.HEADNAVBAR_SETMESSAGE,currentCount);
  });
}

/**
 * 请求一级菜单数据
 * @param $http
 * @param url
 * @param ignoreRoute
 * @param curRoute
 * @param callback
 * @param subCallback
 */
function getNavBar($http, url, ignoreRoute, singleRoute, curRoute, callback, subCallback){
		$http.post(url, {pId: ''}).then((response) => {
			let data = response.json();

			let arr = data.result;
			let res = [];

			for (let i = 0, len = arr.length; i < len; i++) {
				let temp = arr[i];
				if (!temp.route || ignoreRoute.find((item) => temp.route == item)) continue;
        if (temp.route == curRoute) {
          if(singleRoute.find((item) => temp.route == item)){
            subCallback({
              'subMenus': [],
              'title': ''
            })
          } else getSubMenu($http, url, temp.id, subCallback)
        }
				res.push(temp);
			}

			callback(res);

		}, (response) => {
			// error callback
		});
}

/**
 * 请求二级菜单数据
 * @param $http
 * @param url
 * @param pId
 * @param callback
 */
function getSubMenu($http, url, pId, callback){

	$http.post(url, {pId: pId}).then((response) => {

		let data = response.json();

		callback({
			'subMenus': data.result,
			'title': data.message
		})

	});
}

/**
 * 请求未读消息总数
 *
 * */
function updateMessageCount($http, url,callback){
  $http.post(url).then((response) => {
    let currentCount = response.json().result;
    callback(currentCount);
  });
}
