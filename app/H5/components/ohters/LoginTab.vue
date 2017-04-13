<template>
    <div>
        <div class="login_form">
            <ul class="login_choice">
                <li class='public_pnt' :class="{'choice':loginGetBounced}" @click="bouncedFun(true)" value="2" name="loginType"  >账号登录</li>
                <li class="public_pnt" :class="{'choice':!loginGetBounced}" @click="bouncedFun(false)" value="1" name="loginType" >手机登录</li>
            </ul>
            <div class="login_ursName public_errMsg" >
                <label></label><input type="text" name="loginName"  placeholder="手机号码/用户名" />
            </div>
            <div style='position:relative;' >
                <div class="login_psd public_errMsg">
                    <label></label>
                    <input type="password" id="password" name="password" placeholder="6到12位数字与字母" />
                </div>
            </div>
            <p class="login_rmk">
                <input type="checkbox" class="public_pnt" name="autoLogin" value="1"  />
                <span class="login_longLg" >自动登录</span>
                <span class="login_gtBkPsd public_pnt" >忘记密码?</span>
            </p>
            <Btm-cnt
                    :params='loginGetBtmCnt'
                    :onclick='loginFun'
                    :loadflag='loginLoadFlag'
            >
            </Btm-cnt>
            <p class="login_gtRegister public_pnt" ><em></em>注册申请{{loginLoadFlag}}</p>
        </div>
    </div>
</template>

<script>
    import BtmCnt from './BtmCnt.vue';
    import { loginGetResulte,loginGetBounced,loginGetBtmCnt,loginLoadFlag } from '../../getters/loginGetter';
    import { loginFun,bouncedFun } from '../../actions/loginAction';
    export default{
        vuex: {
            getters: {
                loginGetResulte,
                loginGetBounced,
                loginGetBtmCnt,
                loginLoadFlag

            },
            actions: {  //行为  所有公共的方法 执行请加bouncedFun()
                bouncedFun,
                loginFun
            }
        },
        components:{
            BtmCnt
        }

    }
  ;

</script>
