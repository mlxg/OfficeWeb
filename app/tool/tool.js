/**
 * Created by girl on 16/5/24.
 */
import JsnTool from "./lib/JsonTool";
import UrlTool from "./lib/UrlTool";
import BoxTool from "./lib/BoxTool";
import InputTool from "./lib/InputTool";
import Flexslider from "./lib/Flexslider";
import Cookie from "./lib/Cookie";
/**
 **                                        目录
 *							处理json的工具		JsnTool
 *							处理url的工具		    urlTool
 *							弹窗蒙版处理	        BoxTool
 *							处理input的工具		InputTool
 *							banner图轮播		    Flexslider
 *							Cookie控制工具		Cookie
 * @type {{JsnTool}}
 */
const tool = {
    JsnTool:JsnTool,
    UrlTool:UrlTool,
    BoxTool:BoxTool,
    InputTool:InputTool,
    Flexslider:Flexslider,
    Cookie:Cookie
}

module.exports =  tool;
