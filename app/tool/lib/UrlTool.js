/**
 * Created by girl on 16/6/6.
 */
/**
 *                                  处理url的工具类
 *                                       目录
 *                            获取当前页面名称        getHtml
 *                            获取url值健对        getUrlArgs
 *                            获取url参数中key值    getHtml
 *                            跳转到相应的url    goToUrl
 *                            请求后台根目录        sourceRoot
 */
class UrlTool {
    constructor() {

    }

    /**
     *
     * @returns {*}
     */
    getHtml() {
        let urlPath = window.location.pathname.split("/"),
            len = urlPath.length;
        return len == 1 ? urlPath[0] : urlPath[1];
    }

    /**
     * 获取url参数值健对
     * @returns {*}
     */
    getUrlArgs() {
        // 获取查询字符串参数，去除该字符串问号开关符号
        let qs = window.location.search.length > 10 ? window.location.search.substring(1) : "",
            args = {},//存放所有查询字符串参数对
            items = qs.split("&"),
            len = items.length,
            name = null,
            value = null;
        if (qs.length == 0) {
            return false;
        }
        ;
        for (let i = 0; i < len; i++) {
            let item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            args[name] = value;
        }
        return args;
    }

    /**
     * 获取url其中一个参数
     */
    getValue(key) {
        let args = this.getUrlArgs();
        return args[key];
    }

    /**
     *
     * @param url   路径名
     * @param obj   当前位置的this,可做热点处理
     */
    goToUrl({url='',obj=''}={}) {
        window.location.href = url;
    }

    /**
     * 请求系统根路径
     * @returns {string}
     */
    sourceRoot() {
        //return 'http://192.168.201.167:8881/';
        return '/escar/';
    }


}

module.exports = UrlTool;
