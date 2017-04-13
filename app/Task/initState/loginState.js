export default {
    // 应用启动时，初始化的state
        loginTabCmp: { //LoginTab登陆框组建
            bouncFlg: true,
            btmCntCmp: { //BtmCnt提交组建
                class: "login_btn btn2",
                btnName: "登录",
                loadName: "登录中...",
                btnFlag: true, //BtmCnt的loading控制器
                source: '/f/web/login', //login的路径
                result:''
            },
            getOtpCmp:{                //GetOtp 获取手机验证码组建
                class : "ver_code_r",         //样式类名
                otpTime : 60,        //倒数
                otpFlag : true,     //倒数进行标志,true不倒数,false倒数
                otpLoadFlag:true,    //获取手机验证码laoading控制器,false 等待,true正常
                source : '/f/sms/sendSMS',
                result:''
            }
        }
};
