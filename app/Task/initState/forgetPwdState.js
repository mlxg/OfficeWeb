export default {
    // 应用启动时，初始化的state
        forgetPwdTabCmp:{ //ForgetPwd登陆框组建
            btmCntCmp: { //BtmCnt提交组建
                class: "btn btn-info pull-right",
                btnName: "获取新密码",
                loadName: "获取中...",
                btnFlag: true, //BtmCnt的loading控制器
                source: '/a/sys/user/resetNewPassword', //login的路径
                result:''
            }
        }
};
