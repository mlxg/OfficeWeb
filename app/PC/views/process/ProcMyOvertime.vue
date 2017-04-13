<!-- 流程中心 --- 我的申请 -- 我的加班申请 -->
<template>
<h2 class="g-tc u-fs20 g-marginB20">{{datas.title}}</h2>
<validator name="validation">
  <Tip-border tip="加班申请基本信息">
    <div class="g-padding20">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">报销编号：</label>
        <div class="col-sm-4">
          <span class="writing">{{datas.serialNo}}</span>
        </div>
        <label class="col-sm-2 control-label">所属部门：</label>
        <div class="col-sm-4">
          <span class="writing">{{applyOfficeName}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">紧急程度：</label>
        <div class="col-sm-4">
          <span class="writing">{{urgencyDegreeDisplay}}</span>
        </div>
        <label class="col-sm-2 control-label">加班类型：</label>
        <div class="col-sm-4">
          <span class="writing">{{overtimeType}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">补贴类型：</label>
        <div class="col-sm-4">
          <span class="writing">{{subsidyType}}</span>
        </div>
      </div>
    </div>
  </Tip-border>

  <Tip-border tip="加班申请详细信息">
    <div class="g-padding20">
      <div class="form-group clearfix" v-for="item in datas.overtimeDetailList">
        <label class="col-sm-2 control-label">加班日期：</label>
        <div class="col-sm-4">
          <span class="writing">{{item.beginTime}}</span> —— <span class="writing">{{item.endTime}}</span>
        </div>
        <label class="col-sm-2 control-label">加班小时：</label>
        <div class="col-sm-4">
          <span class="writing">{{item.hours}}</span>
        </div>
      </div>
      <section v-if="datas.overtimeSubsidyType == '1'">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">合计小时：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.timeAmount}}</span>
          </div>
          <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.dinnerAmount}}</span>
          </div>
        </div>
      </section>
      <section v-if="datas.overtimeSubsidyType == '3'">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">合计小时：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.timeAmount}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">合计午餐餐补天数：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.lunchAmount}}</span>
          </div>
          <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.dinnerAmount}}</span>
          </div>
        </div>
      </section>
      <section v-if="datas.overtimeSubsidyType == '4'">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">合计午餐餐补天数：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.lunchAmount}}</span>
          </div>
          <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.dinnerAmount}}</span>
          </div>
        </div>
      </section>
      <section v-if="datas.overtimeSubsidyType == '2'">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.dinnerAmount}}</span>
          </div>
        </div>
      </section>
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label g-tr">申请理由：</label>
        <div class="col-sm-8">
          <span class="writing">{{datas.overtimeReason}}</span>
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

  <Tip-border tip="计薪/计时信息" v-if="this.kqgly != '-1' && datas.overtimeSubsidyType =='4'">
    <div class="g-padding20">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">计薪时数：</label>
        <div class="col-sm-4" v-validate-class>
          <input type="text" class="form-control" v-model="datas.paymentHours"
                 v-validate:paymenthours="{required: true, pattern: '/^[0-9]{1}\\d*([.][0-9])?$/'}">
          <span class="fc-red" v-show="($validation.paymenthours.touched || validating) && $validation.paymenthours.required">必填项</span>
          <span class="fc-red" v-show="($validation.paymenthours.touched || validating) && $validation.paymenthours.pattern">时间格式为X.X</span>
        </div>
        <label class="col-sm-2 control-label">加班时数：</label>
        <div class="col-sm-4" v-validate-class>
          <input type="text" class="form-control" v-model="datas.overtimeHours"
                 v-validate:overtimehours="{required: true, pattern: '/^[0-9]{1}\\d*([.][0-9])?$/'}">
          <span class="fc-red" v-show="($validation.overtimehours.touched || validating) && $validation.overtimehours.required">必填项</span>
          <span class="fc-red" v-show="($validation.overtimehours.touched || validating) && $validation.overtimehours.pattern">时间格式为X.X</span>
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
                isShowFormalSalary:false,
                comments:false,
                comment:'',
                isShow: false,

                applyOfficeName: '',
                urgencyDegreeDisplay:'',
                overtimeType:'',
                subsidyType:'',
                datas: {
                    id:'',
                    serialNo:'',                            //录用申请编号
                  paymentHours:'',
                  overtimeHours:'',
                },
                fileList:[],
            }
        },
        asyncData: function (resolve, reject) {
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOVERTIME,{bussinessData: this.businessKey}).then(function (response) {
                var Data = response.json().result;
                resolve({
                    'datas.id' : Data.id,                                                    //加班申请信息主键
                    'datas.serialNo': Data.serialNo,                                         //录用申请编号
                    'datas.title': Data.title,
                    'datas.urgencyDegreeId': Data.urgencyDegreeId,
                    'datas.overtimeSubsidyType': Data.overtimeSubsidyType,
                    'datas.timeAmount': Data.timeAmount,
                    'datas.lunchAmount': Data.lunchAmount,
                    'datas.dinnerAmount': Data.dinnerAmount,
                    'datas.overtimeReason': Data.overtimeReason,
                    'applyOfficeName': Data.applyOfficeName,
                    'urgencyDegreeDisplay': Data.urgencyDegreeDisplay,
                    'overtimeType': Data.overtimeType,
                    'subsidyType': Data.subsidyType,

                    'datas.overtimeDetailList': Data.overtimeDetailList,
                })
            })
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                resolve({
                    'fileList': response.json().result
                })
            })
        },
        created: function(){
        },
        methods: {
            //审批
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
            //调用部门复试考核接口
            depart: function () {
                let vm = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDASSESSMENTLIST, {type: this.datas.departtype}).then(function (response) {
                    let Data = response.json().result;
                    //判断是否为部门负责人进入
                    if(vm.Competence.taskFormKey == "acceptance_deptrespon"){
                        vm.datas.reAssessmentList = Data;         //调用部门复试接口
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
