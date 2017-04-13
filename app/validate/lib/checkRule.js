/**
 * Created by girl on 16/6/3.
 */
import Rule from "./Rule";
import $ from "jquery";
/**
 * 校验规则并返回false或者true
 * @param name
 * @param rule
 * @param paraName
 * @param isParam
 * @param checkName
 */
const checkRule =(
        {name,
        rule,
        prepId,
        checkClass
        }={}
)=>{
    let check = checkClass?`.${checkClass}`:'',
        elemName = `[name='${name}']${check}`,
        text = $(elemName).val()=='undefined'?$(elemName).attr('value'):$(elemName).val(),
        flag =Rule(rule,text,prepId);
    return flag;
};
module.exports = checkRule;
