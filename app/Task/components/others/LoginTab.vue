<template>
    <div class="login">
        <div class="logo g-tc">
            <img src="../../images/logo.png">
        </div>
        <div class="main">
            <div class="nav_bar">
                <ul>
                    <li  :class="{'current':loginGetBouncedFlag}"  @click="loginLoginTabBouncedFun(true)"  value="0" name="type"  >账号登录</li>
                    <li  :class="{'current':!loginGetBouncedFlag}" @click="loginLoginTabBouncedFun(false)" value="1" name="type" >手机登录</li>
                </ul>
            </div>
            <div class="nav_list">
                <ul>
                    <li v-if="loginGetBouncedFlag">
                        <form>
                            <div class="user_name">
                                <input  class="icon" name="username" type="text" placeholder="请输入用户名" maxlength="40">
                            </div>
                            <div class="password">
                                <input  class="icon" name="password" type="password" placeholder="请输入密码" maxlength="20">
                            </div>
                            <div class="rember">
                                <label><input type="checkbox" name="autoLogin" value="1" >记住我</label>
                                <a @click="$route.router.go({name:'forgetPwd'})">忘记密码？</a>
                            </div>
                            <Tool-btm-cnt
                                    :params="loginGetBtmCnt"
                                    :loadflag = "loginGetBtmCnt.btnFlag"
                                    :onclick="loginLoginTabLoginFun">
                            </Tool-btm-cnt>
                        </form>

                    </li>
                    <li v-else >
                        <form>
                            <div class="p_num">
                                <input type="text" class="icon" placeholder="输入手机号" maxlength="11"  name="mobile"/>
                            </div>

                            <div class="ver_code">
                                <div class="ver_code_l">
                                    <input type="text" class="icon" placeholder="输入验证码" maxlength="4"  name="verificationCode"/>
                                </div>
                                    <Tool-get-otp
                                            :params="loginGetOtp"
                                            :onclick="loginLoginTabGetOtpFun"
                                            :stop-otp ="loginLoginTabGetStopOtpFun"
                                    >
                                    </Tool-get-otp>
                            </div>

                            <Tool-btm-cnt
                                    :params="loginGetBtmCnt"
                                    :loadflag = "loginGetBtmCnt.btnFlag"
                                    :onclick="loginLoginTabLoginFun">
                            </Tool-btm-cnt>
                        </form>
                    </li>
                </ul>
                <div v-if="showErroFlag" class="prompt" >
                    <p class="icon">错误：{{loginGetResult.message}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ToolBtmCnt from '../public/ToolBtmCnt.vue';
    import ToolGetOtp from '../public/ToolGetOtp.vue';
    import { loginGetBouncedFlag,loginGetBtmCnt,loginGetOtp,loginGetResult } from '../../getters/loginGetter';
    import { loginLoginTabLoginFun,loginLoginTabBouncedFun,loginLoginTabGetOtpFun,loginLoginTabGetStopOtpFun} from '../../actions/loginAction';
    export default{
        data(){
            return{
                showErroFlag:false
            }
        },
        vuex: {
            getters: {
                loginGetResult,    //登录后返回的参数
                loginGetBouncedFlag,//切换的标志
                loginGetBtmCnt,     //登录按钮的参数
                loginGetOtp        //手机验证码参数

            },
            actions: {  //行为  所有公共的方法 执行请加bouncedFun()
                loginLoginTabBouncedFun,
                loginLoginTabLoginFun,
                loginLoginTabGetOtpFun,     //
                loginLoginTabGetStopOtpFun  //停止计数
            }
        },
        components:{
            ToolBtmCnt,
            ToolGetOtp
        },
        ready(){
            this.$watch('loginGetResult',() => {
                this.loginLoginTabGetStopOtpFun();   //停止计数
                if(this.loginGetResult.status == '0') {(this.$route.router.go({name:"taskIndex"}));}
                else {this.showErroFlag = true;}
            });
        }
    };

</script>
