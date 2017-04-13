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
                timer: '',
                time: 0
            };
        },
        methods: {
          change(startTime,initS, maxS){
            let curTime = (new Date).getTime(),
              interval = (curTime - startTime)/1000,
              vm = this;
            if(interval > 0){
              --initS;
              startTime += 1000;
              if(initS > 0) {
                vm.time = initS;
              }
            }
            vm.timer = setTimeout(function () {
              vm.change(startTime,initS, maxS);
            }, 50);
          },
          cleanBottom(){
              clearTimeout(this.timer)
          }
        },
        ready(){
            let vm = this;
            this.$watch('params.otpFlag', () => {
              let otpTime = vm.params.otpTime;
              this.params.otpFlag ? this.cleanBottom() : this.change((new Date).getTime(), otpTime, otpTime);
            });
        }
    }

</script>
