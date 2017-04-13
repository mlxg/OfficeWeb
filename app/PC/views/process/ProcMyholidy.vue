<!-- 流程中心 --- 我的申请 -- 请假申请 -->
<template>
<h2 class="g-tc u-fs20 g-marginB20">{{datas.title}}</h2>
<validator name="validation">
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

  <Tip-border tip="审批意见">
    <Approve-List :human-task-id="humanTaskId"></Approve-List>
  </Tip-border>
  <div class="form-group g-tc g-marginT20">
    <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)">同意</button>
    <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)">驳回</button>
    <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
  </div>
  </validator>
  <Process-Approve v-if="humanTaskId" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
  <Process-Diagram :process-instance-id="taskId"></Process-Diagram>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ToolSelection from '../../components/public/ToolSelection';
    import ApproveList from '../../components/others/ApproveList';
    import * as type from '../../constants/globalSelectTypes';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
      props: ['taskId', 'businessKey', 'humanTaskId','taskformKey','hr','deptheader','kqgly','zc','zjl','edit'],
        components: {
            Crumb,
            TipBorder,
            ProcessApprove,
            ToolSelection,
            ProcessDiagram,
            ApproveList
        },

        data: function(){
            return{
                comments:false,
                comment:'',
                isShow: false,

                datas: {

                },
                fileList:[],
            }
        },

        created: function(){
            this._load()
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
          approveProcess: function (e,comments) {
              let vm = this;
              vm.comments = comments;
              if(comments){
                  vm.comment = '同意'
              }else{
                  vm.comment = '不同意'
              }
              if(this.kqgly == '-1' ){
                  vm.isShow = true
              }else{
                  if(this.datas.overtimeSubsidyType == 4){
                    this.$validate(true, function () {
                      if (vm.$validation.invalid) {
                        e.preventDefault()
                      }else{
                        vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEOVERTIME, {bussinessData:vm.datas}).then((response) => {
                          let status = response.json().status;
                        if(status == 0){
                          vm.isShow = true
                        }
                      });
                      }
                    })
                  }else{
                    vm.isShow = true
                  }

              }
          },
          //取消
          cancelProcess: function () {
              this.$router.go('/process/todo')
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
