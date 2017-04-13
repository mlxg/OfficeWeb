<!-- 流程中心 --- 待办审批流程 --- 录用申请审批 -->
<template>
    <h3 class="u-fs20 g-tc">录用审批申请</h3>
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">录用编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">被录用人：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.cnName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr" type="date">录用部门：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.officeName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">职级：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.positionsLevelIdLabel}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">申请部门：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.applyOfficeName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">职位：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.postionName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.urgencyDegreeIdLabel}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">录用时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.entrantTime}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">性质：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.employeeNatureIdLabel}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">入职地点：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.workplaceIdLabel}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">入职方式：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.inductionFormIdLabel}}</span>
            </div>
            <!-- <label for="" class="col-sm-2 control-label g-tr">合同所属公司：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.contractCompanyDisplay}}</span>
            </div> -->
        </div>
    </Tip-border>
    <Tip-border tip="人力资源部初试">
        <div class="form-group clearfix">
            <div class="col-sm-12">
                <table width="83%" class="table table-striped table-hover table-bordered w83 g-fr">
                    <thead>
                    <th>项目</th>
                    <th>优</th>
                    <th>良</th>
                    <th>中</th>
                    <th>差</th>
                    </thead>
                    <tbody>
                    <tr v-for="items in datas.assessmentList">
                        <th>{{ items.label }}</th>
                        <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="0" disabled></td>
                        <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="1" disabled></td>
                        <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="2" disabled></td>
                        <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="3" disabled></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="form-group g-marginB20 clearfix">
            <label class="col-sm-2 control-label">简况及评语：</label>
            <div class="col-sm-10">
                <span class="writing">{{datas.testComment}}</span>
            </div>
        </div>
    </Tip-border>
    <!-- <Tip-border tip="职位薪酬">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">试用薪酬  (元）：</label>
            <div class="col-sm-4">
                <span class="writing">{{datas.testSalary}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正薪酬  (元）：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.formalSalary}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label class="col-sm-2 control-label">附件下载：</label>
            <div class="col-sm-4">
                <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
            </div>
        </div>
    </Tip-border> -->
    <Tip-border tip="部门复试">
        <div class="form-group clearfix">
            <div class="col-sm-12">
                <table width="83%" class="table table-striped table-hover table-bordered w83 g-fr">
                    <thead>
                    <th>项目</th>
                    <th>优</th>
                    <th>良</th>
                    <th>中</th>
                    <th>差</th>
                    </thead>
                    <tbody>
                    <tr v-for="reass in datas.reAssessmentList">
                        <th>{{ reass.label }}</th>
                        <td><input type="radio" name="{{$index}}" v-model="reass.score" value="0" disabled></td>
                        <td><input type="radio" name="{{$index}}" v-model="reass.score" value="1" disabled ></td>
                        <td><input type="radio" name="{{$index}}" v-model="reass.score" value="2" disabled></td>
                        <td><input type="radio" name="{{$index}}" v-model="reass.score" value="3" disabled></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="form-group g-marginB20 clearfix">
            <label class="col-sm-2 control-label">简况及评语：</label>
            <div class="col-sm-10">
                <span class="writing g-tf">{{datas.retestComment}}</span>
            </div>
        </div>
    </Tip-border>
    <!-- 部门建议-可以编辑-->
    <!-- <Tip-border tip="部门建议">
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">建议工资*(试用期)</label>
            <div class="col-sm-4" v-validate-class>
                <span class="writing g-tf">{{datas.suggesTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4" v-validate-class>
                <span class="writing g-tf">{{datas.suggesFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
            <div class="col-sm-4" v-validate-class>
                <span class="writing g-tf">{{datas.performanceTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4" v-validate-class>
                <span class="writing g-tf">{{datas.performancesFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">其他津贴*(试用期)</label>
            <div class="col-sm-4" v-validate-class>
                <span class="writing g-tf">{{datas.otherTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4" v-validate-class>
                <span class="writing g-tf">{{datas.otherFormalSalary}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="人事部确定">
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">基本工资*(试用期)</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.baseTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.baseFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">保密工资*(试用期)</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.secrecyTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.secrecyFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">其他补贴*(试用期)</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.otherSubsidyTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.otherSubsidyFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">加班补贴*(试用期)</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.overSubsidyTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.overSubsidyFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">午餐补助*(试用期)</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.lunchSubsidyTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.lunchSubsidyFormalSalary}}</span>
            </div>
        </div>
        <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.achievementTestSalary}}</span>
            </div>
            <label class="col-sm-2 control-label g-tr">（转正后）</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{datas.achievementFormalSalary}}</span>
            </div>
        </div>
    </Tip-border> -->
    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <div class="showListBtn" @click='isShowCopiesListFun' >{{isShowCopiesText}}</div>
    <Tip-border v-if="this.humanTaskId != 0&&!isShowCopiesList" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <Tip-border v-if="isShowCopiesList" tip="抄送列表">
      <Copy-List :human-task-id="humanTaskId"></Copy-List>
    </Tip-border>
    <div class="form-group g-tc g-marginT20" v-if="this.status == '1' || this.status == '6'">
        <button type="button" class="btn btn-primary g-marginR30" @click="deleteTask" v-if='types == "application"'>删除</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="withdraw">撤回</button>
        <button v-if="this.types=='application'" type="button" class="btn btn-primary g-marginR30" @click="reminders">催办</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>


<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    import CopyList from '../../components/others/CopyList';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import PublicModal from '../../components/public/PublicModal'
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
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            Crumb,
            CopyList,
            TipBorder,
            ProcessApprove,
            ProcessDiagram,
            ApproveList,
            PublicModal
        },
        data: function(){
            return{
                isShowCopiesText:'抄送列表 >',
                isShowCopiesList:false,
                isShow: false,
                humanTaskId: '',
                businessKey:'',
                taskId:'',
                //权限
                datas: {
                },
                fileList: [],
                types:'',
                status:'',
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                apiUrl:''
            }
        },
        asyncData: function (resolve, reject) {
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                resolve({
                    'fileList': response.json().result
                })
            })
        },
        created: function(){
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[2].match(/\w+/)[0];
            this.humanTaskId = hash[0].match(/\w+/)[0];
            this.taskId = hash[1].match(/\w+/)[0];
            this.types = hash[4].match(/\w+/)[0];
            //显示数据接口
            if (this.humanTaskId!=0) {
                this.processStatus();
            };
            this.updateProcessCopy(this.humanTaskId)

            this.loadData();
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
            //查询接口
            loadData: function () {
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDAPPLICATION,{id:this.businessKey}).then(function (response) {
                    let Data = response.json().result;
                    that.datas = Data;
                })
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
            },
          cancelProcess: function () {
            this.$router.go('/process/dispose')
            /*if(this.types == 'dispose'){
                this.$router.go('/process/dispose');
            }else{
                this.$router.go('/process/application');
            }*/
          }
        }
    }
</script>
<style lang="less">
    table.w83{
        width:83%
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
