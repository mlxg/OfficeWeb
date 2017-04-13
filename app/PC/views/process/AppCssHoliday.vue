<!-- 流程中心 --- 我的申请 -- 请假申请 -->
<template>
  <h2 class="g-tc u-fs20 g-marginB20">{{datas.title}}</h2>
    <Tip-border tip="请休假申请基本信息">
      <div class="g-padding20">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">编号：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.serialNo}}</span>
          </div>
          <label class="col-sm-2 control-label">紧急程度：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.urgencyDegreeDisplay}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">类型：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.typeDisplay}}</span>
          </div>
        </div>
      </div>
    </Tip-border>

    <Tip-border tip="请（休）假时间">
      <div class="g-padding20">
        <div class="clearfix">
          <div class="col-sm-10 g-fr">
            <table class=" table table-striped table-bordered table-layout">
              <tr>
                <th><label>请（休）假开始时间</label></th>
                <th><label>请（休）假结束日期</label></th>
                <th width="10%" class="g-tc"><label>小时</label></th>
                <th class="g-tc"><label>事由</label></th>
                <th width="13%" class="g-tc"><label>操作</label></th>
              </tr>
              <tr v-for="item in datas.employeeHolidayDetail">
                <td class="g-pr">
                  {{item.leaveStartDate}}
                </td>
                <td class="g-pr">
                  {{item.leaveEndDate}}
                </td>
                <td>
                  {{item.leaveTime}}
                </td>
                <td style="white-space: inherit;">
                  {{item.leaveReason}}
                </td>
                <td class="g-tc">
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="form-group clearfix">
          <label for="" class="col-sm-2 control-label">请休假合计小时：</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" readonly v-model="datas.leaveTime">
          </div>
        </div>
        <div class="form-group clearfix" v-if="fileList && fileList.length">
          <label class="col-sm-2 control-label">附件下载：</label>
          <div class="col-sm-4">
            <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
          </div>
        </div>
      </div>
    </Tip-border>

    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
      <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <Tip-border v-if="this.humanTaskId != 0 && isShowCopiesList" tip="抄送列表">
      <Copy-List :human-task-id="humanTaskId"></Copy-List>
    </Tip-border>
</template>

<script>
  import TipBorder from '../../components/public/TipBorder.vue'
  import * as content from '../../constants/contentTypes';
  import * as interfaces from '../../constants/interfaceTypes';
  import ProcessDiagram from '../../components/others/ProcessDiagram';
  import ApproveList from '../../components/others/ApproveList';
  import CopyList from '../../components/others/CopyList';
  import { copiesNumberGetter } from '../../getters/noticesNumberGetter'
  import { updateCopiesListNum } from '../../actions/noticesNumberActions';
  export default{
    vuex:{
      actions: {
        updateCopiesListNum:updateCopiesListNum
      },
      getters: {
        copiesListNum: copiesNumberGetter
      }
    },
    components: {
      TipBorder,
      ProcessDiagram,
      ApproveList,
      CopyList
    },

    data: function(){
      return{
        lookscreen:{
          isShow:false,
        },
        isShow: false,
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        status:'',
        datas: {

        },
        fileList:[],
      }
    },

    created: function(){
      //初始化数据
      let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
      this.businessKey = hash[2].match(/\w+/)[0];
      this.humanTaskId = hash[0].match(/\w+/)[0];
      this.taskId = hash[1].match(/\w+/)[0];
      this.types = hash[4].match(/\w+/)[0];
      this._load()
      this.updateProcessCopy(this.humanTaskId)
    },
    methods: {
      //审批
      _load: function () {
        let vm = this
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEHOLIDAY, {bussinessData:{id:vm.businessKey}}).then((response)=>{
          let status = response.json().status;
          if(status == 0){
            vm.datas = response.json().result;
          }
        });
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: vm.businessKey}).then((response) => {
          vm.fileList = response.json().result
        })
      },
      cancelProcess: function () {
        this.$router.go('/process/dispose')
      },
      initCopiesNum:function (userId) {
        let vm = this;
        let params = {};
        params.userId = userId;
        vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSCOPYSNUM,params).then((response) => {
          let responseData = response.json().result;
        vm.updateCopiesListNum({num:responseData});
      });
      },
      updateProcessCopy: function (id) {
        let vm = this;
        let userId = sessionStorage.getItem("loginName")
        this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_UPDATEPROCESSCOPY,{'humanTaskId':id,'userId':userId}).then((response) => {
          if(response.ok){
          vm.initCopiesNum(userId)
        }
        });
      },
    }
  }
</script>
<style lang="less">
  table.w83{
    width:83%
  }

  span.totalRed{
    color: red;
    font-size: 20px;
    line-height: 20px;
  }

</style>
