import sour from  '../js/taskSource';
export default {
    // 应用启动时，初始化的state
    taskIndexTabCmp:{ //ForgetPwd登陆框组建
        source:sour.findMyProject,
        result:'',
        taskIndexAddCmp:{
            showFlag:false, //显示的表示
            source:sour.save,
            result:'',
            btmCntCmp:{
                class:'btmCnt',          //按钮样式
                btnName:'创 建',                    //可提交状态按钮名
                loadName:'创建中...',              //等待请求返回时按钮名
                btnFlag:true
            }
        }
    }
};
