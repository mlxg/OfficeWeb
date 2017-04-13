/**
 * Created by girl on 16/5/25.
 */
import core from './core';

const JpGet = (obj,date="",result,contentType) => {
    const params ={dateType:"JSONP",type:"GET",date:date,contentType:contentType};
    result && (params.success=result);
    core(obj,params);
}

module.exports =  JpGet;



//$.ajax({
//    'url': '?ac=do&'+$('#form1').serialize(),
//    'type':'POST',
//    'dataType':'JSONP',
//    'jsonp':'jsonpcallback',
//    'error':function(e){
//    },
//    'success':function(data){
//        alert(data[0].msg);
//    }
//});
