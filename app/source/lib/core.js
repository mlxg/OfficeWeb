/**
 * Created by girl on 16/5/25.
 */
import $ from 'jquery';
const core = (  obj,{
                    url=obj.props.source,
                    type="POST",
                    date="",
                    dateType='JSON',
                    contentType='application/x-www-form-urlencoded',
                    success=(result)=>{
                      obj.setState({result:result},true)
                    },
                    error=()=>{obj.setState({result:{'message':'请求超时,检查网络','status':'9' }},true)}
                }={}) => {
        let otp ={
            'url': url,
            'type':type,
            'data':date,
            'dataType':dateType,
            'contentType':contentType,
            'error':error,
            'success':success
        };
    //jsop特殊处理
    if(dateType=="JSONP"){
        otp.jsonpCallback="success_jsonpCallback";
        otp.jsonp="callback";
    }
       return $.ajax(otp);
};

module.exports =  core;
