/**
 * Created by girl on 16/6/3.
 */
import $ from 'jquery';
/**
 *
 * @param name
 * @param paraName
 * @param isParam
 * @returns {{paraName}}
 */
const returnJson =(
    {
    name='',
    paraName=name,
    isParam = true,
    checkClass=false
    }={}
)=>{

    let check = checkClass?`.${checkClass}`:'',
        elemName=`[name='${name}']${check}`,
        value = $(elemName).val()=='undefined'?$(elemName).attr("value"):$(elemName).val(),
        param = {};
        isParam && (param[paraName]=value);
    return param;
}

module.exports =  returnJson;
