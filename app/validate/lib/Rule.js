/**
 * Created by girl on 16/6/3.
 */
/**
 *										目录
 *							判断非空				isEmpty
 *							身份证姓名规则校验		isName
 *							Emile规则校验		isEmile
 *							纯数字规则校验		isFigure
 *							电话号码规则校验		isPhone
 *							身份证号码规则校验		isIdentityCard
 *							金钱规则校验			isMoney
 *							银行卡号的校验规则		isBankNum
 *							验证码的校验规则		isOtpNum
 *				6~12位数字加字母密码的校验规则		isPassword
 *				        大于某个数小于某个数		[min]more[max]
 *				        是否跟某值一样            contrast
 * @type {{isEmpty: RegExp, isName: RegExp, isEmile: RegExp, isFigure: RegExp, isQQ: RegExp,[min]more[max]
 * isPhone: RegExp, isMoney: RegExp, isOtpNum: RegExp}}
 */
import InputTool from '../../tool/lib/InputTool';
const rules = {
    'isEmpty':/[^\s]+/,
    'isName':/^([\u4e00-\u9fa5]|[a-zA-Z0-9]){2,20}$/,
    'isEmile':/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
    'isFigure':/\d+$/,
    'isQQ':/^[0-9]+$/,
    'isPhone':/^(13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0|6|7|8])\d{8}$/,
    'isMoney':/^([1-9]\d*|0)(\.\d{1,2})?$/,
    'isNumber':/^([1-9]\d*)?$/,
    'isOtpNum':/^[0-9]{6}$/,
    'isBankNum':/^([0-9]{15}|[0-9]{16}|[0-9]{17}|[0-9]{18}|[0-9]{19})$/,
    'isPassword':/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,
    'isImg':/\.(jpg|png|JPG|PNG)$/,
    'isXlsx':/\.(xlsx|excel|xls)$/,
    'isEmail':/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
    'contrast':(value,prepId)=>{
      const prepValue = document.getElementById(prepId).value;
        return value == prepValue;
    },
    'more': (value,max=300,min=0) =>{
        return (value -min >= 0 && value - max <= 0 );
    },
    'thanNow':(value)=>{
       return InputTool.contrastDate({d1:value});
    },
    'compareTow':(value,id)=>{
        const  d2 = document.getElementById(id).value;
        return InputTool.contrastDate({d1:value,d2:d2})
    }
};
/**
 *
 * @param rl
 * @returns {*}
 * is 表示正则校验
 * 非 is 表示
 */
const rule =  (rl,value,three = '')=>{
    const  flag = rl.substring(0,2)=='is';
    let returnValue = true;
    if(flag){
        const reg = rules[rl];
        returnValue = reg.test(value) ;
    }else if(rl.indexOf('more') > -1){
       let lst = rl.split('more');
        returnValue =rules.more(value,lst[1],lst[0]);
    }else {
        returnValue = rules[rl](value,three);
    }
   return returnValue;
};



module.exports = rule;
