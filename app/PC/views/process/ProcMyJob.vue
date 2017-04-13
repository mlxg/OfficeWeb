<style lang="less">
  .upload-down{
    display: block;
    padding-top: 9px;
  }
  .showListBtn{
    display: inline-block;
    box-sizing: content-box;
    height: 30px;
    padding-right: 26px;
    padding-left: 26px;
    color: #fff;
    background-color: #2f90ea;
    line-height: 30px;
    cursor: pointer;
    margin-top: 30px;
  }
</style>
<template>
    <h3 class="u-fs20 g-tc g-marginB20" >招聘申请单</h3>
  <Tip-border tip="招聘基本信息">
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label">编号：</label>
      <div class="col-sm-4">
        <span class="writing">{{serialNo}}</span>
      </div>
      <label class="col-sm-2 control-label">申请人数：</label>
      <div class="col-sm-4">
        <span class="writing">{{requireNum}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label">紧急程度：</label>
      <div class="col-sm-4">
        <span class="writing">{{urgencyDegreeDisplay}}</span>
      </div>
      <label class="col-sm-2 control-label">期望入职时间：</label>
      <div class="col-sm-4">
        <span class="writing">{{toWorkTime}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label">部门名称：</label>
      <div class="col-sm-4">
        <span class="writing">{{officeName}}</span>
      </div>
      <label v-show="depRequireId != 5" class="col-sm-2 control-label">职位名称：</label>
      <div class="col-sm-4" v-show="depRequireId != 5">
        <span class="writing">{{positionNameDisplay}}</span>
      </div>
    </div>
  </Tip-border>
  <Tip-border tip="岗位职责/要求">
    <validator name="validation">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">年龄要求：</label>
        <div class="col-sm-4">
          <span class="writing">{{ ageStart + ' - ' + ageEnd}}</span>
        </div>
        <label class="col-sm-2 control-label">性别要求：</label>
        <div class="col-sm-4">
          <span class="writing">{{sexRequireDisplay}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">学历要求：</label>
        <div class="col-sm-4">
          <span class="writing">{{educationDisplay}}</span>
        </div>
        <label class="col-sm-2 control-label">招聘方式：</label>
        <div class="col-sm-4">
          <span class="writing">{{recruitWayDisplay}}</span>
        </div>
      </div>
      <div class="form-group g-marginB20 clearfix">
        <label class="col-sm-2 control-label">职责描述：</label>
        <div class="col-sm-10">
          <span class="writing">{{responsibility}}</span>
        </div>
      </div>
      <div class="form-group g-marginB20 clearfix">
        <label class="col-sm-2 control-label">任职要求：</label>
        <div class="col-sm-10">
          <span class="writing">{{requirement}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">试用薪酬（元）：</label>
        <div class="col-sm-4">
          <span class="writing">{{ testSalaryStart+' - '+testSalaryEnd}}</span>
        </div>
        <label class="col-sm-2 control-label">转正薪酬（元）：</label>
        <div class="col-sm-4">
          <span class="writing">{{formalSalaryStart+' - '+formalSalaryEnd}}</span>
        </div>
      </div>
      <section v-if="depRequireId != 4 && depRequireId != 5">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">职位定编人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{requireCount}}</span>
          </div>
          <label class="col-sm-2 control-label">职位在职人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{officeCount}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">部门定编人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{officeList[0].officeRequireCount}}</span>
          </div>
          <label class="col-sm-2 control-label">部门在职人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{officeList[0].officeAllCount}}</span>
          </div>
        </div>
      </section>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">部门需求性质：</label>
        <div class="col-sm-4">
          <span class="writing">{{depRequireDisplay}}</span>
        </div>
      </div>
      <section v-show="depRequireId == 4">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">扩编职位名称：</label>
          <div class="col-sm-4">
            <span class="writing">{{positionNameDisplay}}</span>
          </div>
          <section v-if="taskformKey == 'acceptance_hr'">
          <label class="col-sm-2 control-label">职位扩编人数：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" v-model="post.enlargeNum" maxlength="5" initial='off'
                   v-validate:enlargenum="['required', 'plus']">
            <span class="fc-red" v-show="($validation.enlargenum.touched || validating) && $validation.enlargenum.required">必填项</span>
            <span class="fc-red" v-show="post.enlargeNum && $validation.enlargenum.touched && $validation.enlargenum.plus">格式错误</span>
          </div>
          </section>
          <section v-else="">
            <label class="col-sm-2 control-label">职位扩编人数：</label>
            <div class="col-sm-4">
              <span class="writing">{{enlargeNum}}</span>
            </div>
          </section>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">原职位定编人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{requireCount}}</span>
          </div>
          <label class="col-sm-2 control-label">原职位在职人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{officeCount}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">原部门定编人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{officeList[0].officeRequireCount}}</span>
          </div>
          <label class="col-sm-2 control-label">原部门在职人数：</label>
          <div class="col-sm-4">
            <span class="writing">{{officeList[0].officeAllCount}}</span>
          </div>
        </div>
      </section>
      <section v-show="depRequireId == 5">
        <section v-if="taskformKey == 'acceptance_hr'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label field-require">新增职位名称：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="post.enlargePositionName" initial='off' v-validate:addnew="{required: true,existDepartName: { rule: true, initial: 'off' }}">
              <span class="fc-red" v-show="($validation.addnew.touched || validating) && $validation.addnew.required">必填项</span>
              <span class="fc-red" v-show="($validation.addnew.touched || validating) && $validation.addnew.existDepartName">职位已存在</span>
            </div>
            <label class="col-sm-2 control-label field-require">职位定编人数：</label>
            <div class="col-sm-4"  v-validate-class>
              <input type="text" class="form-control" v-model="post.enlargeNum" maxlength="5" initial='off'
                     v-validate:enlargenum2="['required', 'plus']">
              <span class="fc-red" v-show="($validation.enlargenum2.touched || validating) && $validation.enlargenum2.required">必填项</span>
              <span class="fc-red" v-show="post.enlargeNum && $validation.enlargenum2.touched && $validation.enlargenum2.plus">格式错误</span>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label field-require">职位性质：</label>
            <div class="col-sm-4" v-validate-class>
              <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.positionNatureValue" initial='off'
                              v-validate:zwxz="['required']"></Tool-Selection>
              <span class="fc-red" v-show="($validation.zwxz.touched || validating) && !post.positionNatureValue">必填项</span>
            </div>
          </div>
        </section>
        <section v-else="">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">新增职位名称：</label>
            <div class="col-sm-4">
              <span class="writing">{{post.enlargePositionName}}</span>
            </div>
            <label class="col-sm-2 control-label">职位定编人数：</label>
            <div class="col-sm-4">
              <span class="writing">{{post.enlargeNum}}</span>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">职位性质：</label>
            <div class="col-sm-4">
              <span class="writing">{{post.positionNatureDisplay}}</span>
            </div>
          </div>
        </section>
      </section>
      <section v-show="depRequireId == 3">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">替换人：</label>
          <div class="col-sm-4">
            <span class="writing">{{replacePersonNames}}</span>
          </div>
        </div>
        <div class="form-group g-marginB20 clearfix">
          <label class="col-sm-2 control-label">替换原因：</label>
          <div class="col-sm-10">
            <span class="writing">{{replaceReason}}</span>
          </div>
        </div>
      </section>
      <section v-show="depRequireId == 2">
        <div class="form-group g-marginB20 clearfix">
          <label class="col-sm-2 control-label">新增原因：</label>
          <div class="col-sm-10">
            <span class="writing">{{newReason}}</span>
          </div>
        </div>
      </section>
      <div class="form-group clearfix" v-if="fileList && fileList.length">
        <label class="col-sm-2 control-label">附件下载：</label>
        <div class="col-sm-4">
            <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
        </div>
      </div>
    </validator>
  </Tip-border>
    <div class="showListBtn" v-if="humanTaskId" @click='isShowCopiesListFun' >{{isShowCopiesText}}</div>
    <Tip-border v-if="humanTaskId&&!isShowCopiesList" tip="审批意见">
      <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <Tip-border v-if="isShowCopiesList" tip="抄送列表">
      <Copy-List :human-task-id="humanTaskId"></Copy-List>
    </Tip-border>
    <div class="form-group g-tc g-marginT20" v-if="!info">
      <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess(true)">同意</button>
      <button type="button" class="btn btn-default g-marginR30" @click="approveProcess(false)">驳回</button>
      <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <div v-if="info">
      <div class="form-group g-tc g-marginT20" v-if="this.status == '1' || this.status == '6'">
        <button type="button" class="btn btn-primary g-marginR30" @click="deleteTask" v-if='types == "application"'>删除</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="withdraw">撤回</button>
        <button v-if="this.types=='application'" type="button" class="btn btn-primary g-marginR30" @click="reminders">催办</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
      </div>
    </div>
    <Process-Approve v-if="!info" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
    <Process-Diagram v-if="taskId" :process-instance-id="taskId"></Process-Diagram>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue'
    import TipBorder from '../../components/public/TipBorder.vue'
    import ProcessApprove from '../../components/others/ProcessApprove'
    import ProcessDiagram from '../../components/others/ProcessDiagram'
    import ApproveList from '../../components/others/ApproveList';
    import CopyList from '../../components/others/CopyList';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import * as type from '../../constants/globalSelectTypes'
    import PublicModal from '../../components/public/PublicModal'
    import ToolSelection from '../../components/public/ToolSelection'
    export default{

        props: ['taskId', 'businessKey', 'humanTaskId', 'info','copy','taskformKey'],
        components: {
            Crumb,
            TipBorder,
            ProcessApprove,
            ProcessDiagram,
            ApproveList,
            PublicModal,
            ToolSelection,
            CopyList,
        },
        data(){
          return {
            isShowCopiesText:'抄送列表 >',
            isShowCopiesList:false,
            post:{},
            comments:false,
            comment:'',
            isShow: false,
            serialNo: '',
            projectDisplay: '',
            urgencyDegreeDisplay: '',
            positionNameDisplay: '',
            requireNum: '',
            toWorkTime: '',
            ageStart: '',
            ageEnd: '',
            sexRequireDisplay: '',
            educationDisplay: '',
            recruitWayDisplay: '',
            trainExperience: '',
            workExperience: '',
            technicalSkills: '',
            professionalism: '',
            testSalaryStart: '',
            testSalaryEnd: '',
            formalSalaryStart: '',
            formalSalaryEnd: '',
            depNumber: '',
            officeCount: '',
            depRequireDisplay: '',
            newReason: '',
            officeName: '',
            replacePersonNames: '',
            replaceReason: '',
            responsibility: '',
            requirement: '',
            depRequireId: '',
            enlargeNum:'',
            fileList: [],
            officeList: [],
            officeRequireCount:'',
            requireCount:'',
            officeCount:'',
            officeAllCount:'',
            types:'',
            status:'',
            options: undefined,
            confirm: undefined,
            cancel: undefined,
            close: undefined,
            apiUrl:'',
            isShow: false,
            type: [
              type.POSITION_NATURE
            ],
          }
        },
        asyncData: function (resolve, reject) {
          let vm = this;
//          this.loginName = sessionStorage.getItem("loginName");
          this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEERECRUIT, {id: this.businessKey}).then((response) => {
            let result = response.json().result;
            vm.post = result;
            resolve({
              serialNo: result.serialNo,
              projectDisplay: result.projectDisplay,
              urgencyDegreeDisplay: result.urgencyDegreeDisplay,
              positionNameDisplay: result.positionNameDisplay,
              requireNum: result.requireNum,
              toWorkTime: result.toWorkTime,
              ageStart: result.ageStart ? result.ageStart :'',
              ageEnd: result.ageEnd ? result.ageEnd :'',
              sexRequireDisplay: result.sexRequireDisplay,
              officeId: result.officeId,
              educationDisplay: result.educationDisplay,
              recruitWayDisplay: result.recruitWayDisplay,
              trainExperience: result.trainExperience,
              workExperience: result.workExperience,
              technicalSkills: result.technicalSkills,
              professionalism: result.professionalism,
              testSalaryStart: result.testSalaryStart ? result.testSalaryStart :'',
              testSalaryEnd: result.testSalaryEnd ? result.testSalaryEnd :'',
              formalSalaryStart: result.formalSalaryStart ? result.formalSalaryStart :'',
              formalSalaryEnd: result.formalSalaryEnd ? result.formalSalaryEnd :'',
              depNumber: result.depNumber,
              officeCount: result.officeCount,
              depRequireDisplay: result.depRequireDisplay,
              newReason: result.newReason,
              officeName: result.officeName,
              replacePersonNames: result.replacePersonNames,
              replaceReason: result.replaceReason,
              responsibility: result.responsibility,
              requirement: result.requirement,
              officeList: result.officeList,
              depRequireId: result.depRequireId,
              enlargeNum: result.enlargeNum,
              requireCount: result.requireCount,
              officeCount: result.officeCount,
              officeRequireCount: result.officeRequireCount,
              officeAllCount: result.officeAllCount,

            });
          });
          this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
            resolve({
              'fileList': response.json().result
            })
          })
        },
        created: function(){
          let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
          let vm = this;
          vm.types = hash[5].match(/\w+/)[0];
          if(vm.humanTaskId != 0){
            vm.processStatus();
          }
          // this.taskId = 0;
          vm.isHasFlowChart(vm.taskId)

        },
        validators: {
          plus (val) {
            val = val.trim();
            if(!val) return true;
            if(val.indexOf('.') !== -1) return false;
            val = Number(val);
            if(!val) return false;
            if(val < 0) return false;
            return true
          },
          existDepartName (val) { // 验证新增部门
            val = val.trim();
            if (!val) return Promise.resolve();

            let vm = this.vm;
            return vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_CHECKPOSTION, {
                officeId: vm.post.officeId,
                enlargePositionName: val
              }).then((response) => {
                response = response.json();
            if (response.status == 0) {
              // vm.post.enlargePositionName = val;
              if (response.result == false) return Promise.reject('重名')
              else return Promise.resolve();
            } else {
              return Promise.reject(response.message)
            }
          })
          }
        },
        methods: {
          isShowCopiesListFun:function () {
              let vm = this;
              vm.isShowCopiesList = !vm.isShowCopiesList
              if (vm.isShowCopiesList) {
                  vm.isShowCopiesText = '审批意见列表 >'
              }else{
                  vm.isShowCopiesText = '抄送列表 >'
              };
          },
          isHasFlowChart:function (taskId) {
            let vm = this;
            vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_PROCESSEXISTS,{processInstanceId:taskId}).then(function (response) {
                let result = response.json().result;
                if (!result) {
                  vm.taskId = false;
                };
            })
          },
          approveProcess: function (comments) {
            this.comments = comments;
            if(comments){
              this.comment = '同意'
              if(this.$validation.invalid)return false;
              if(this.post.depRequireId == 4 || this.post.depRequireId == 5){
                this.post.requireNum = this.post.enlargeNum
              }
              this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVERECRUIT, this.post).then((response) => {});
            }else{
              this.comment = '不同意'
            }
            this.isShow = true
          },
          cancelProcess: function () {
            this.$router.go('/process/todo')
          },
            //删除流程
            deleteTask: function(){
                let vm = this;
                vm.options = {
                  title: '温馨提示',
                  message: '确认删除吗？删除后数据不可恢复哦',
                  icon: 'warning',
                  isShow: true
                };
                vm.confirm = {
                  text: '确定',
                  callback: function () {
                vm.apiUrl = interfaces.INTERFACE_DELETEPROCESS
                vm.userId = sessionStorage.getItem("loginName");
                vm.$http.post(content.STAROFFICE_ACT + vm.apiUrl,{humanTaskId:vm.humanTaskId,userId:vm.userId}).then(function (response) {
                    let Data = response.json().status;
                    if(Data == '0'){
                        vm.options = {
                            title: '温馨提示',
                            message: '删除成功！',
                            icon: 'success',
                            isShow: true
                        };
                        vm.confirm = {
                            text: '确定',
                            callback: function () {
                                if(vm.types == 'dispose'){
                                    vm.$router.go('/process/dispose');
                                }else{
                                    vm.$router.go('/process/application');
                                }
                                vm.options.isShow = false;
                            }
                        };
                    }
                })
                    vm.options.isShow = false;
                  }
                };
                vm.close = {
                  callback: function () {
                    vm.options.isShow = false;
                  }
                };
                vm.cancel = {
                  text: '取消',
                  callback: function () {
                    vm.options.isShow = false;
                  }
                }
            },
          //我的申请撤回  我的经办撤回
          withdraw: function(){
            let that = this;
            if(!this.types)return false;
            if(this.types == 'dispose'){
              this.apiUrl = interfaces.INTERFACE_WITHDRAWTASK
            }else{
              this.apiUrl = interfaces.INTERFACE_ABORTAPPLYPROCESS
            }
            this.userId = sessionStorage.getItem("loginName");
            this.$http.post(content.STAROFFICE_ACT + this.apiUrl,{humanTaskId:this.humanTaskId,userId:this.userId}).then(function (response) {
              let Data = response.json().status;
              if(Data == '0'){
                that.options = {
                  title: '温馨提示',
                  message: '撤回成功！',
                  icon: 'success',
                  isShow: true
                };
                that.confirm = {
                  text: '确定',
                  callback: function () {
                    if(that.types == 'dispose'){
                      that.$router.go('/process/dispose');
                    }else{
                      that.$router.go('/process/application');
                    }
                    that.options.isShow = false;
                  }
                };
              }
            })
          },
          //催办
          reminders: function () {
            let that = this;
            if(!this.types)return false;
            this.userId = sessionStorage.getItem("loginName");
            this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_REMINDERTASK,{humanTaskId:this.humanTaskId,userId:this.userId}).then(function (response) {
              let Data = response.json().status;
              if(Data == '0'){
                that.options = {
                  title: '温馨提示',
                  message: '催办成功！',
                  icon: 'success',
                  isShow: true
                };
                that.confirm = {
                  text: '确定',
                  callback: function () {
                    that.$router.go('/process/application');
                    that.options.isShow = false;
                  }
                };
              }
            })
          },
          //判断流程状态
          processStatus: function(){
            let that = this;
            this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSSTATUS,{humanTaskId:this.humanTaskId}).then(function (response) {
              let Data = response.json().result;
              that.status = Data.status;
            })
          }
        },

    }
</script>
