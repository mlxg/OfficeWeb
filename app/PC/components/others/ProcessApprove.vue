<style lang="less">
  .mask .notice-panel.approve-panel{
    height: auto;
    width: 550px;
  }
  .approve-content{
    padding-right: 20px;
    padding-top: 10px;
    .checkbox-inline{
      display: block;
      margin-left: 0 !important;
      text-align: left;
      position: relative;
      padding-left: 18px;
      padding-bottom: 5px;
      > input{
        position: absolute;
        left: 0;
        margin-top: 3px;
      }
    }
    .control-label{
      padding-right: 0;
    }
  }
  .btn-container{
    padding-bottom: 20px;
  }
</style>
<template>
  <div class="mask" v-show="show">
    <div class="mask-align"></div>
    <div class="notice-panel approve-panel">
      <div class="notice-title">
        <div @click="close" class="exit">
        </div>
        <h1>审核意见</h1>
      </div>
      <div class="approve-content">
        <!--<div class="form-group clearfix approve-list">-->
          <!--<label class="col-sm-2 control-label">审批：</label>-->
          <!--<div class="col-sm-10">-->
            <!--<label class="checkbox-inline">-->
              <!--<input type="radio" value="true" v-model="appros">{{agree}}-->
            <!--</label>-->
            <!--<label class="checkbox-inline">-->
              <!--<input type="radio" value="false" v-model="appros">{{disagree}}-->
            <!--</label>-->
          <!--</div>-->
        <!--</div>-->
        <div class="form-group clearfix m-check-list">
          <label class="col-sm-2 control-label" style="padding-top: 0">意见：</label>
          <Text :text-value='comment' :max-length="200" :class-name="'col-sm-10'">
            <textarea class="form-control" rows="4" v-model="comment" maxlength="200"></textarea>
          </Text>
        </div>
      </div>
      <div class="btn-container">
        <button @click="submit($event)" class="btn btn-primary g-marginR30" type="button">提交</button>
        <button @click="close" class="btn btn-default" type="button">取消</button>
      </div>
    </div>
  </div>
  <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>
<script>
  import Text from '../public/PublicTextLength.vue';
  import LookScreen from '../public/LockScreen.vue';
  import * as content from '../../constants/contentTypes';
  import * as interfaces from '../../constants/interfaceTypes';
  export default{
    props: {
//      agree: String,
//      disagree: String,
      id: [String, Number],
      show: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      comments: {
        type: Boolean
      },
      comment:{
        type: String
      },
      amount:[String, Number],
    },
    components:{
      Text,
      LookScreen
    },
    data(){
      return {
        lookscreen:{
            isShow:false,
        }
      }
    },
//    watch:{
//      'appros': function (val) {
//        if(val === 'true') this.comment = this.agree;
//        else this.comment = this.disagree
//      }
//    },
    methods: {
      close: function () {
        this.show = false
      },
      submit: function (e) {
        let vm = this;
        e.target.disabled = true;
        this.lookscreen.isShow = true;
        let userId = sessionStorage.getItem("loginName");
        vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
          'humanTaskId': vm.id,
          'appros': vm.comments,
          'comment': vm.comment,
          'amount' : vm.amount,
          'userId' : userId
        }).then((response) => {
          let result = response.json();
          if(result.status == 0){
            vm.$router.go('/process/todo');
            vm.lookscreen.isShow = false;
            e.target.disabled = false;
          }else{
            vm.lookscreen.isShow = false;
            e.target.disabled = false;
          }
        })
      }
    }
  }
</script>
