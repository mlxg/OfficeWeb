
/**
 * Created by girl on 16/6/2.
 */
import checkRule from "./checkRule";
import returnJson from "./returnJson";
/**
 *单个体系的校验
 * @param name  节点名
 * @param rules 规则[{rule:"",errorMsg:{},{}]
 * @param paraName  参数名
 * @param isParam   是否返回json,默认为true
 * @param checkName 对比参数,主要是俩次密码校验
 * @param checkClass 选中的name,一般为class,默认为false
 */
const core = (
    {
        name="",
        rules=[],
        paraName=name,
        isParam=true,
        checkName="",
        checkClass=false
    }={}
) =>{
    let result={"error":{},"success":{}};
    rules.map(({rule,errorMsg,prepId=""})=>{
        let checkRst=checkRule({name:name,prepId:prepId,rule:rule,checkClass:checkClass});
         if(!checkRst){
             let className = checkClass?`.${checkClass}`:'',
                 key = `[name='${name}']${className}`;
             result.error[key]=errorMsg;
         }
    });
    result.success = returnJson({name:name,paraName:paraName,checkClass:checkClass,isParam:isParam});   //返回成功的json数据
    return result;
};

module.exports =  core;
