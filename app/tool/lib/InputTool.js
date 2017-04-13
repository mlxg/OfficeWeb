/**
 * Created by girl on 16/6/8.
 */
/**
 *                          处理input格式的工具类
 *                                       目录
 *							改变密码款的显示隐藏	       psdVisiblity
*						    解决type=chexbox类型的单选   choiceChexBox
 *						    对比日期                     contrastDate
 */
import  $ from  'jquery';
const InputTool = {
    /**
     * 改变密码的显隐藏
     * @param id
     */
    psdVisiblity: (id="")=>{
        var theEl = document.getElementById(id);
        theEl.type=='text' ? theEl.type="password" :theEl.type="text";
    },

    /**
     * 解决type=chexbox类型的单选
     * @param name
     * @param index
     */
    choiceChexBox :({name='',index=0}={})=>{
        const nm = `[name="${name}"]`,
            choiceNm =`${nm}.choice`;
        $(choiceNm).removeClass('choice');
        $(nm).eq(index).addClass('choice');
        $(nm).not('.choice').attr('checked',false);
        $(choiceNm).attr('checked',true);
    },
    /**
     * 对比时间  d1 > d2 为true
     * @param d1
     * @param d2
     * @returns {boolean}
     */
    contrastDate : ({d1 = new Date() ,d2 = new Date()})=>{
        const date1 = typeof(d1) =="string" ? new Date(d1) : d1,
              date2 = typeof(d2) =="string" ? new Date(d2) : d2,
              flag = date1 > date2;
        return flag;

    }
};
module.exports = InputTool;
