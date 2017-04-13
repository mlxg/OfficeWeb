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
 * @param otpFlag       解除otp倒数的prop标志 例如:btnflg
 * @param dispatch      redux dispatch方法
 * @param getState      所有的props
 * @param componentLst  逐渐的顺序(必填)
 * @param result        返回后的数据处理的方法
 * @param contentType
 */
const validateAndSubmit=({
    dispatch,
    getState,
    componentLst=[],
    validates=[],
    submitType='Post',
    moreParams={},
    contentType="application/json;charset=UTF-8",
    loadFlg=false,  //loading的标志
    otpFlag=false,  //otp倒数的标志
    isCheck=false,
    result =false
    }={})=>{

    getState= JSON.parse(JSON.stringify(getState));
    const obj =myObj(dispatch,getState,componentLst,loadFlg,otpFlag);
    let params={},
        loading = {};
    if(loadFlg) {loading[loadFlg]=!loadFlg;obj.setState(loading)} //加载

    if (validates !== []){
        params = validate(validates);
        //弹出错误
        const errors=params.error;
            //表单提交
        let isNull =false;
        for(let key in errors){
            if(key == "[name='mobile']") dispatch('SETERRORMSG', {status: '', message: errors[key]});
            if(key == "[name='verificationCode']") dispatch('SETERRORMSG', {status: '', message: errors[key]});
            if(key == "[name='username']") dispatch('SETERRORMSG', {status: '', message: errors[key]});
            if(key == "[name='password']") dispatch('SETERRORMSG', {status: '', message: errors[key]});
            isNull = key;
            break
        }
        if (isNull) {
            if(loadFlg) {loading[loadFlg]=!!loadFlg;obj.setState(loading)}; //解除加载
            return !isNull;
        }
    }
    if(!params.success.concatMobile) {
      let jsonTool = new JsonTool();
      jsonTool.concat(moreParams, params.success);
    }else {
      obj.props.source += '/' + params.success.mobile
    }
    //for(let key in sucParams){  //进行前后排空 并将密码进行rsa加密
    //    sucParams[key] = $.trim(sucParams[key]);
    //}.
    let date =JSON.stringify(moreParams);
     //
     (contentType !="application/json;charset=UTF-8") &&(date =moreParams)

    isCheck || Ajax[submitType](obj,date,result,contentType);
    return moreParams;
};

/**
 * 拼接返回的obj,并返回当前的props
 * @param getState
 * @param familyNameLst
 * @param result
 * @param loadFlg
 * @param otpFlag
 * @param type 是否为ajax请求返回
 */
validateAndSubmit.undidObj=function(getState,familyNameLst,result,loadFlg,otpFlag,type){
    let newState = getState;
    const length = familyNameLst.length;
    familyNameLst.forEach(function(item,i){
        newState = newState[item];
        if(i == length-1) {
            if( loadFlg && !newState[loadFlg]) {
                const loadJson = {};
                loadJson[loadFlg] =true;    //解除loading
                ( type && (result.status=='0') ) && (newState[otpFlag] = false);  //开始倒数
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
function myObj(dispatch, getState,familyNameLst,loadFlg,otpFlag){
    const sta = getState,
          nowProps=validateAndSubmit.undidObj(sta,familyNameLst,{});
    return{
       props:{source:nowProps.source},
       setState :(result={},type)=>{
           const sta = getState;
           dispatch('SUBMITE',{familyNameLst:familyNameLst,result:result,loadFlg:loadFlg,otpFlag:otpFlag,type:type});
       }
   }
};


function concat(json1,json2){
    for(let key in json2){
        json1[key] = json2[key];
    }
}

module.exports =  validateAndSubmit;
