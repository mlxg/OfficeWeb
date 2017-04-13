/**
 * Created by girl on 16/6/15.
 */
import $ from 'jquery';
import Ajax from '../../source/ajax';
import validate from '../../validate/validate';
import JsonTool from '../../tool/lib/JsonTool' ;
import RSA from '../../rsa/lib/RSA' ;
/**
 *
 * @param validates     校验类 不填是直接查询
 * @param submitType    提交类型GET,POST
 * @param moreParams    更多的params
 * @param isCheck       只需要校验,默认false,为false只校验提交,不提交 如果为true 校验通过整个函数返回为json且不提交
 * @param loadFlg       解除按钮加载的prop标志 例如:btnflg
 * @param dispatch      redux dispatch方法
 * @param getState      所有的props
 * @param componentLst  逐渐的顺序(必填)
 */
const validateAndSubmit=({
    dispatch,
    getState,
    componentLst=[],
    validates=[],
    submitType='Get',
    moreParams={},
    loadFlg=false,
    isCheck=false
    }={})=>{
    getState= JSON.parse(JSON.stringify(getState));
    const obj =myObj(dispatch,getState,componentLst,loadFlg);
    let params={},
        loading = {};
    if(loadFlg) {loading[loadFlg]=!loadFlg;obj.setState(loading)} //加载
    if (validates !== []){
        params = validate(validates);
        //弹出错误
        const errors=params.error;
        $('.public_errMsg').attr('errMsg','');          //去除错误
            //表单提交
        let isNull =false;
        for(let key in errors){
            $(key).parents('.public_errMsg').attr('errMsg',`  *${errors[key]}`);  //显示错误
            isNull = key;
        }
        if (isNull) {
            if(loadFlg) {loading[loadFlg]=!!loadFlg;obj.setState(loading)}; //加载
            return !isNull;
        }
    }
    let jsonTool = new JsonTool(),
        sucParams=jsonTool.concat(params.success,moreParams);
    for(let key in sucParams){  //进行前后排空 并将密码进行rsa加密
        sucParams[key] = $.trim(sucParams[key]);
        //const  pswLength = sucParams[key].length,
        //       flag= ((key =='password' || key =='userPsw' ) && sucParams.loginType != '1' && pswLength < 14 ); //判断是否是密码,排除验证码,排除token
        //sucParams[key] = flag  ? RSA(sucParams[key]) : sucParams[key];
    }
    isCheck || Ajax[submitType](obj,sucParams);
    return sucParams;
};

/**
 * 拼接返回的obj,并返回当前的props
 * @param getState
 * @param familyNameLst
 * @param result
 */
validateAndSubmit.undidObj=function(getState,familyNameLst,result,loadFlg){
    let newState = getState;
    const length = familyNameLst.length;
    familyNameLst.forEach(function(item,i){
        newState = newState[item];
        if(i == length-1) {
            if( loadFlg && !newState[loadFlg]) {
                const loadJson = {};
                loadJson[loadFlg] =true;
                concat(newState,loadJson)
            }
            concat(newState,result)
        }

    });
    return newState;
}
/**
 *对应core的方法调整obj参数
 * @param dispatch 分派的方法,更新组建
 * @param getState redux框架的整体state
 * @param familyNameLst 组建的层级lst
 * @returns {{props: {source: *}, setState: setState}}
 */
function myObj(dispatch, getState,familyNameLst,loadFlg){
    const sta = getState,
          nowProps=validateAndSubmit.undidObj(sta,familyNameLst,{});
    return{
       props:{source:nowProps.source},
       setState :(result={})=>{
           const sta = getState;
           dispatch('SUBMITE',{familyNameLst:familyNameLst,result:result,loadFlg:loadFlg});
       }
   }
};


function concat(json1,json2){
    for(let key in json2){
        json1[key] = json2[key];
    }
}

module.exports =  validateAndSubmit;
