<!-- 流程中心 --- 待办审批流程 --- 离职申请审批 -->
<template>
<h3 class="u-fs20 g-tc">{{post.title}}</h3>
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.urgencyDegreeDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">拟解聘人姓名：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.dismissalName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">工号：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.employeeNo}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">职位：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.positionsDisplay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">入职日期：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.entrantTime}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">工龄（年）：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.entrantAge}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">预定离职日期：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.leaveDate}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="解聘细节">
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">解聘原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.dismissalReason}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">平均月薪：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.monthlySalary}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">最大可能经济补偿：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.maxCompensation}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">补偿原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.compensationReason}}</span>
            </div>
        </div>
    </Tip-border>
    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
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
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import PublicModal from '../../components/public/PublicModal'
    export default{
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            Crumb,
            TipBorder,
            ProcessDiagram,
            ApproveList,
            PublicModal
        },
        data: function(){
            return {
                post:{

                },
                isShow: false,
                types:'',
                status:'',
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                apiUrl:''
            }
        },
        created: function(){
          let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
          this.businessKey = hash[3].match(/\w+/)[0];
          this.humanTaskId = hash[1].match(/\w+/)[0];
          this.taskId = hash[2].match(/\w+/)[0];
          this.types = hash[5].match(/\w+/)[0];
          this.taskform = hash[0].match(/\w+/)[0];
          this.loadData();
          if (this.humanTaskId!=0) {
            this.processStatus();
          };
        },
        methods:{
            cancelProcess: function () {
            this.$router.go('/process/dispose')
            },
            loadData: function () {
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEDISMISSAL,{id:this.businessKey}).then(function (response) {
                    let Data = response.json().result;
                    that.post = Data;
                })
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
        }
    }
</script>
