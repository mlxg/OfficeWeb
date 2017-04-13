/**
 * Created by girl on 16/6/2.
 */
import Core from './lib/core' ;
import JsonTool from '../tool/lib/JsonTool' ;
/**
 *数据校验,成功返回一个success的拼装json,失败返回一个error错误json
 * params参数格式
 * moreParams 更多的参数
 *  {
 *      'name':'节点名',                                      //节点的name值
 *      'rules':[                                            //校验规则,以及错误信息
 *          {'rule':'isEmpty','errorMsg':'用户名不能为空'},
 *          {'rule':'isEmpty','errorMsg':'用户名不能为空'}],
 *      'paraName  '成功时返回json的参数名',
 *      'checkName  '对比参数,主要是俩次密码校验',
 *      'isParam  '是否返回输入json,默认为true',
 *      'checkClass  '选中的name,一般为class,默认为false',
 *  },
 *                              rules中rule的目录
 *							判断非空				isEmpty
 *							身份证姓名规则校验		isName
 *							Emile规则校验		isEmile
 *							纯数字规则校验		isFigure
 *							电话号码规则校验		isPhone
 *							身份证号码规则校验		isIdentityCard
 *							金钱规则校验			isMoney
 *							银行卡号的校验规则		isBankNum
 *							验证码的校验规则		isOtpNum
 *
 *
 * 返回的json格式:{"error":{},"success":{}}
 */
const valiDate = (params=[],moreParams={})=>{
    let result={"error":{},"success":{}},
        Jsn = new JsonTool();
    params.map((item)=>{
        let coreJsn = Core(item);
        result.error= Jsn.concat(result.error,coreJsn.error) ;
        result.success= Jsn.concat(result.success,coreJsn.success);
    });
    result.success = Jsn.concat(result.success,moreParams);
    return result;
};

module.exports =  valiDate;
