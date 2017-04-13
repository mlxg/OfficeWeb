<template>
    <div class="{{params.class}}" style="cursor: pointer;" v-if="params.otpFlag && params.otpLoadFlag" @click="onclick">获取验证码</div>
    <div class="{{params.class}}" style="cursor: pointer;background-color: #CBCBCB;border-color: #DDDDDD;" v-if="params.otpFlag && !params.otpLoadFlag">获取中...</div>
    <div class="{{params.class}}" style="cursor: pointer;background-color: #CBCBCB;border-color: #DDDDDD;" v-else v-if="!params.otpFlag && params.otpLoadFlag">{{ time }}秒</div>

</template>
<script>
    export default{
        props: ['params', 'onclick', 'stopOtp'],
        data() {
            return {
                time: 0
            };
        },
        methods: {
            bottom(){
              this.time = this.params.otpTime;
            const bottomFun =  setInterval(() => {
                (this.time == 0) && ( this.cleanBottom(bottomFun));
                this.time -= 1
            },1000);
            },
            cleanBottom(bottomFun){  //停止计数并恢复初始化
                clearInterval(bottomFun);
                this.stopOtp();
            }
        },
        ready(){
            this.$watch('params.otpFlag', () => {
            this.params.otpFlag ? this.cleanBottom() : this.bottom();
        });
        }
    }

</script>
