<template>
    <div class="m-forgetPwd">
        <img src="../../images/logo.png" alt="logo" class="g-marginB20"/>
        <p class="title g-pr t-green g-padding20 g-marginB20">请输入您的电话号码，在收到验证码之后，您就可以重置您的密码。</p>
        <div class="cnt g-marginB20 g-padding20">
            <form>
                <div class="form-group">
                    <label >手机号码:</label>
                    <input type="tel" class="form-control" v-model="params.mobile" placeholder="请输入手机号码" v-on:focus="errorMsg=''">
                    <label >验证码:</label>
                  <div class="clearfix">
                    <input type="text" class="form-control g-ib" v-model="params.code" placeholder="请输入验证码" v-on:focus="errorMsg=''">
                    <button type="button" class="btn btn-success pull-right" @click="sendCode($event)"
                            :class="{'btn-disabled' : btnTxt}" style="width: 100px; height: 34px;">{{btnTxt ? btnTxt : '获取验证码'}}</button>
                  </div>
                    <label >新密码:</label>
                    <input type="password" class="form-control" v-model="params.newPassword" placeholder="请输入新密码" v-on:focus="errorMsg=''">
                </div>
                <div class="prompt" >
                  <p class="icon" v-if="errorMsg">错误：{{errorMsg}}</p>
                </div>
                <div class="clearfix">
                    <button type="submit" class="btn btn-blue pull-right" @click="resetPwd">确 认</button>
                </div>
            </form>
        </div>
        <a @click="$route.router.go({name:'login'})">返回登录页面</a>
    </div>
</template>
<script>
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        data(){
          return {
            params: {
              newPassword: '',
              mobile: '',
              code: ''
            },
            errorMsg: '',
            timer: '',
            maxS: 60,
            btnTxt: ''
          }
        },
      methods: {
          stop(){
            clearTimeout(this.timer);
            this.btnTxt = ''
          },
        change(startTime,initS, maxS, el){
          let curTime = (new Date).getTime(),
              interval = (curTime - startTime)/1000,
              vm = this;
          if(interval > 0){
            --initS;
            startTime += 1000;
            if(initS > 0) {
              el.setAttribute('disabled', true);
              vm.btnTxt = `${initS}s`;
            }else{
              el.setAttribute('disabled', false);
              return vm.btnTxt = ''
            }
          }
          vm.timer = setTimeout(function () {
            vm.change(startTime,initS, maxS, el);
          }, 50);
        },
        validateMobile(mobile){
          if(!mobile)
            return this.errorMsg = '请输入手机号码';
          else if(!mobile.match(/^(13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0|6|7|8])\d{8}$/))
            return this.errorMsg = '请输入正确的手机号码';
        },
        validateRequired(name, value){
          if(!value) return this.errorMsg = `请输入${name}`
        },
        sendCode(e){
          let vm = this,
            mobile = vm.params.mobile;
          if(!vm.validateMobile(mobile)){
            vm.change((new Date).getTime(), vm.maxS, vm.maxS, e.target);
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SENDCODE, {mobile}).then((response)=> {
              let status = response.json().status;
              if (status != 0) {
                // 取消读秒
                vm.stop()
              }
            })
          }
        },
        resetPwd(){
          let vm = this,
            mobile = vm.params.mobile;
          if(!vm.validateMobile(mobile) && !vm.validateRequired('验证码', vm.params.code) && !vm.validateRequired('新密码', vm.params.newPassword)){
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SETNEWPASSWORD, vm.params).then((response)=>{
              let status = response.json().status;
              if (status == 0) vm.$route.router.go({name:'login'})
            })
          }
        }
      }
    }
</script>
