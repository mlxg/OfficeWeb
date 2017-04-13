<style lang="less">
  .mask .update-panel{
    height: auto;
    .update-content{
      padding-right: 20px;
      padding-top: 15px;
    }
  }
  .notice{
    position: relative;
    &:hover{
      cursor: pointer;
    }
    .notice-panel{
      position: absolute;
      top: 48px;
      right: -60px;
      z-index: 999;
      background-color: white;
      box-shadow: 0 2px 10px #999;
      border:1px solid #ccc;
      &:before{
        content: "";
        position: absolute;;
        top: -10px;
        right: 62px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid white;
      }
    }
    .content{
      display: block;
      width: 400px;
      padding: 5px;
      text-align: left;
      font-size: 14px;
      &:hover{
        background-color: #278eed;
        color: white;
      }
    }
    .text{
      display: inline-block;
      overflow-x: hidden;
      white-space:nowrap;
      text-overflow:ellipsis;
      width: 300px;
    }
    .date{
      float: right;
      display: inline-block;
    }
    .apply{
      color: #bbb;
    }
    .no-notice{
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
    }
  }
  .transparent{
    position: fixed;
    display: block;
    z-index: 960;
    background-color: rgba(0, 0, 0, 0);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    &:hover{
      cursor: default;
    }
  }
</style>
<template>
    <div class="g-hd">
        <div class="m-logo g-fl">
            <a >logo</a>
            <span style="display: inline-block;text-indent: 10135px;margin-top: 38px;color: #fff;">2.0</span>
        </div>
        <nav-bar></nav-bar>
        <div class="m-user g-fr g-marginR30">
            <div class="name g-fl"> <!--v-bind:class="{ 'active': active}" v-on:mouseover="this.active = true;" v-on:mouseleave="this.active = false;">-->
                <img src="../../images/userimg.png" width="34" height="34"/>
                <span class="g-paddingF10">{{userName}}</span>
                <strong class="m-space2"></strong>
            </div>
            <div class="transparent" v-show="showNotice" @click="showNotice = false"></div>
            <div class="message g-fl g-marginL30 g-pr notice" @click="goMessageCenter()">
            <!-- <div class="message g-fl g-marginL30 g-pr notice" @click="showNotice = true"> -->
                <i class="u-icon"></i>
                <span v-show="!!messageCount">{{messageCount}}</span>
                <div class="notice-panel" v-show="showNotice">
                  <ul>
                    <li v-for="notice in noticeList">
                      <a class="content" href="{{notice.link}}" @click.stop.prevent="setNoticeReaded(notice.id,notice.link)" title="{{notice.title}}">
                        <div class="text">{{notice.content}}</div><div class="date">{{notice.createDate}}</div>

                        <!-- <span>{{createDate}}</span> -->
                        <div class="apply">申请人：{{notice.applyAssignee}}</div>
                        <!-- <div class="apply">申请人：{{notice.applyAssignee}}</div> -->
                      </a>
                    </li>
                  </ul>
                  <div v-if="!unReadCount" class="no-notice">
                    暂无消息
                  </div>
                </div>
            </div>
            <div class="setting g-fl g-marginL25" v-bind:class="{ 'active': active1}" v-on:mouseover="this.active1 = true;" v-on:mouseleave="this.active1 = false;">
                <i class="u-icon"></i>
                <div class="m-space"></div>
                <ul>
                    <li @click="loginOut"><a class="loginOut" href="javascript:;">退出</a></li>
                    <li><a href="javascript:;" @click="showUpdatePwd = true">修改密码</a></li>
                </ul>
            </div>
        </div>
        <!--<div class="m-search g-fr">-->
            <!--<input class="u-icon" placeholder="查找通讯录，按姓名或按技能">-->
        <!--</div>-->
    </div>

  <div class="mask" v-show="showUpdatePwd">
    <div class="mask-align"></div>
    <div class="notice-panel update-panel">
      <div class="notice-title">
        <div @click="showUpdatePwd = false" class="exit ">
        </div>
        <h1>修改密码</h1>
      </div>
      <div class="update-content">
        <validator name="validation">
          <div class="form-group clearfix">
          <label class="col-sm-4 control-label">原密码：</label>
          <div class="col-sm-8" v-validate-class>
              <input type="password" v-model="password.oldPassword" class="form-control" v-validate:old="{required: true, minlength: 6}">
              <span class="fc-red" v-show="($validation.old.touched || validating) && $validation.old.required">必填项</span>
              <span class="fc-red" v-show="(!$validation.old.required) && $validation.old.touched && $validation.old.minlength">长度至少6位</span>
          </div>
        </div>
          <div class="form-group clearfix">
          <label class="col-sm-4 control-label">新密码：</label>
          <div class="col-sm-8" v-validate-class>
            <input type="password" v-model="password.newPassword" class="form-control" v-validate:new="{required: true, minlength: 6, inequal: true}">
            <span class="fc-red" v-show="($validation.new.touched || validating) && $validation.new.required">必填项</span>
            <span class="fc-red" v-show="(!$validation.new.required) && $validation.new.touched && $validation.new.minlength">长度至少6位</span>
            <span class="fc-red" v-show="(!$validation.new.required) && (!$validation.new.minlength) && $validation.new.touched && $validation.new.inequal">新密码不能与原密码相同</span>
          </div>
        </div>
          <div class="form-group clearfix">
          <label class="col-sm-4 control-label">确认密码：</label>
          <div class="col-sm-8" v-validate-class>
            <input type="password" class="form-control" v-validate:equal="{required: true, minlength: 6, equal: true}">
            <span class="fc-red" v-show="($validation.equal.touched || validating) && $validation.equal.required">必填项</span>
            <span class="fc-red" v-show="(!$validation.equal.required) && $validation.equal.touched && $validation.equal.minlength">长度至少6位</span>
            <span class="fc-red" v-show="(!$validation.equal.required) && (!$validation.equal.minlength) && $validation.equal.touched && $validation.equal.equal">两次输入密码不一致</span>
          </div>
        </div>
        </validator>
      </div>
      <div class="btn-container">
        <button @click="submit" class="btn btn-primary g-marginR30" type="button">修改</button>
        <button @click="showUpdatePwd = false" class="btn btn-default" type="button">取消</button>
      </div>
    </div>
  </div>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
    import NavBar from './NavBar.vue'
    import Message from './Message.vue'
    import PublicModal from '../../components/public/PublicModal'
    import { getProcessCode } from '../../vuex/index/getters'
    import { getData, changeCurRoute, initCurRoute, updateMsgCount } from '../../actions/headNavbarAction'
    import { getNavBar, getUrl, getCurRoute, getIgnoreRoute, getSingleRoute, getMessageCount } from '../../getters/headNavbarGetter'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';

    export default {
        data: function () {
            return {
                active : false,
                active1 : false,
                userName: sessionStorage.getItem('userName'),
                showUpdatePwd: false,
                validating: false,
                password: {
                  oldPassword: '',
                  newPassword: ''
                },
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                showNotice: false,
                unReadCount: 0,
                getUnread: {
                  isRead: '0',
                  pageNo: 1,
                  pageSize: 5,
                  orderBy: 'createDate desc'
                },
                noticeList: []
            }
        },
        vuex: {
          actions: {
            changeCurRoute,
            updateMsgCount
          },
          getters: {
            navData: getNavBar,
            url: getUrl,
            curRoute: getCurRoute,
            ignoreRoute: getIgnoreRoute,
            singleRoute: getSingleRoute,
            processCode: getProcessCode,
            messageCount: getMessageCount
          }
        },
        components: {
            NavBar,
            Message,
            PublicModal
        },
        validators: {
            equal: function (val) {
              return this.vm.password.newPassword === val
            },
            inequal: function (val) {
              return this.vm.password.oldPassword !== val
            }
        },
        asyncData:  function(resolve, reject){
          this.updateMsgCount('/a/web/message/getNoticeNum');
          // 首页顶部废弃初始读取消息内容
          // this.$http.post('/a/web/message/getNoticeNum',vm.getUnread).then((response)=>{
          //   let resultData = response.json();
          //   resolve({
          //     'unReadCount': resultData.result
          //   });
          //   if(!!resultData.result){
          //     vm._loadNoticeList();
          //   }
          // });
        },
        methods: {
            goMessageCenter: function(){
              this.$router.go('/personal/notice');
              this.changeCurRoute('/personal',true);
            },
            //退出登录
            loginOut : function(){
                var that = this;
                this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_LOGOUT).then(function (response) {
                  if(response.json().status == 0){
                    sessionStorage.clear();
                    that.$route.router.go({name: "login"});
                  }

                })
            },
            submit: function () {
              let vm = this;
              if(vm.$validation.invalid) return vm.validating = true;
              vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_RESETNEWPASSWORD, vm.password).then(function (response) {
                if(response.json().status == 0){
                  vm.showUpdatePwd = false;
                  vm.options = {
                    title: '温馨提示',
                    message: '密码修改成功!',
                    icon: 'success',
                    isShow: true
                  };
                  vm.confirm = {
                    text: '确定',
                    callback: function () {
                      vm.options.isShow = false;
                    }
                  };
                  vm.close = {
                    callback: function () {
                      vm.options.isShow = false;
                    }
                  }
                }
              })
            },
            setNoticeReaded: function(noticeId,router){
              let vm = this;
              vm.$route.router.go(router);
              this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_UPDATEISREAD,{id:noticeId}).then((response)=>{
                let result = response.json();
                if(result.status == '0'){
                  vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICENUM,vm.getUnread).then((response)=>{
                    let resultData = response.json();
                    vm.unReadCount = resultData.result;
                    vm._loadNoticeList();
                  });
                }
              });
              this.showNotice = false;

            },
            _loadNoticeUnread: function(){
              let vm = this;
              this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICENUM,vm.getUnread).then((response)=>{
                let resultData = response.json();
                vm.unReadCount = resultData.result;
              });
            },
            _loadNoticeList: function(){
              let vm = this;
              this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICELIST,vm.getUnread).then((response)=>{
                let result = response.json().result;
                let oriList = result.list;
                let noticeList = [];
                for(let i = 0 ; i < oriList.length ; i ++){
                  let notice = {};
                  Object.assign(notice,oriList[i]);
                  let obj = JSON.parse(oriList[i].bussinessDataJsonStr);
                  let process = this.processCode[obj.publishCode];
                  if (process) {
                    let router = process.chargeRoute;
                    notice.link = router +  obj.businessKey + '/' + obj.processInstanceId + '/' + obj.id;
                  } else {
                    notice.link = '/process/todo';
                  }
                  if(obj.applyAssignee){
                    notice.applyAssignee = obj.applyAssignee;
                  } else {
                    notice.applyAssignee = '后台未提供';
                  }
                  noticeList.push(notice);
                }
                vm.noticeList = noticeList;
              });
            }
        }
    }
</script>
