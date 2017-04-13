export const loginState = {
    // 应用启动时，初始化的state
    login: {    //Login组建
        loginTab: { //LoginTab组建
            bouncFlg: false,
            btnFlag: true,  //btmCnt的控制器
            source: 'json/login.json',   //login的路径
            btmCnt: {   //BtmCnt组建
                class:"public_btn login_btn public_pnt",
                btnName:"登录",
                loadName:"登录中..."

            }
        }
    }
};

