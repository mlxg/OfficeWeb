<template>
    <div class="m-forgetPwd">
        <img src="" alt="logo" class="g-marginB20"/>
        <p class="title g-pr t-green g-padding20 g-marginB20">请输入您的用户名或电子邮件地址，您会收到一封包含创建新密码内容的电子邮件</p>
        <div class="cnt g-marginB20 g-padding20">
            <form>
                <div class="form-group">
                    <label >用户名或电子邮件地址:</label>
                    <input type="text" class="form-control" name="email" placeholder="Email"  >
                </div>
                <div class="clearfix">
                    <Tool-btm-cnt
                            :params="forgetPwdGetBtmCntCmp"
                            :loadflag = "forgetPwdGetBtmCntCmp.btnFlag"
                            :onclick="forgetPwdGetNewPwd">
                    </Tool-btm-cnt>
                </div>
            </form>
        </div>
        <a @click="$route.router.go({name:'login'})">登录</a>
    </div>
</template>
<script>
    import ToolBtmCnt from '../public/ToolBtmCnt.vue';
    import { forgetPwdGetBtmCntCmp} from '../../getters/forgetPwdGetter';
    import { forgetPwdGetNewPwd } from '../../actions/forgetPwdAction';

    export default{
        vuex: {
            getters: {
                forgetPwdGetBtmCntCmp
            },
            actions: {
                forgetPwdGetNewPwd
            }
        },
        components:{
            ToolBtmCnt
        },
        ready(){
            this.$watch('forgetPwdGetBtmCntCmp.result',() => {
            (this.loginGetResult.code == '000') && (this.$route.router.go({name:"index"})) ;    //成功后跳转
        });
        }
    }
</script>
