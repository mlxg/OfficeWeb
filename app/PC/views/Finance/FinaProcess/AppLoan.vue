<!-- 借款详情 -->
<template>
<h3 class="u-fs20 g-tc">{{post.title}}</h3>
    <button type="button" v-if="this.types=='application'" class="btn btn-primary g-marginR30" @click="queryEmployee">打印</button>
    <Tip-border tip="借款基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">报销编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">借款人：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.createName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.urgencyDegreeDisplay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">所属部门：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.officeName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">职位：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.positionsDisplay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">收款单位：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.payeeDispay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">所属项目：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.projectValueDispay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">所属公司：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.companyDispay}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="借款详细信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">账户名称：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.loanName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">账号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.bankNo}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">开户行：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.bankBranch}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">借款金额：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.loanAmount}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">预计还款时间：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.repaymentDate}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">申请理由：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.applyReasons}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label class="col-sm-2 control-label">附件下载：</label>
            <div class="col-sm-4">
                <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
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
    import Crumb from '../../../components/public/PublicCrumb.vue';
    import TipBorder from '../../../components/public/TipBorder.vue';
    import ProcessDiagram from '../../../components/others/ProcessDiagram';
    import ApproveList from '../../../components/others/ApproveList';
    import * as content from '../../../constants/contentTypes';
    import * as interfaces from '../../../constants/interfaceTypes';
    import PublicModal from '../../../components/public/PublicModal'
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
                fileList: [],
                post:{},
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
            queryEmployee:function () {
              let vm = this;
              let getUrl = content.STAROFFICE_ACT + interfaces.INTERFACE_GETHISTORYNAME+'?processInstanceId='+this.taskId;

              vm.$http.get(getUrl).then((aprRes)=>{
                vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETACCOUNTLOAN, {'bussinessData':this.businessKey}).then((response)=>{
                  let responseData = JSON.parse(response.data);
                  responseData = responseData.result
                  let pageName = 'loantwo.html';
                  let createDate = responseData.createDate
                  createDate = createDate.split(' ')[0]
                  let url = '/'+pageName+
                    '?createDate='+createDate+
                    '&serialNo='+responseData.serialNo+
                    '&createName='+responseData.createName+
                    '&officeName='+responseData.officeName+
                    '&projectValueDispay='+responseData.projectValueDispay+
                    '&companyDispay='+responseData.companyDispay+
                    '&payeeDispay='+responseData.payeeDispay+
                    '&loanAmount='+responseData.loanAmount+
                    '&repaymentDate='+responseData.repaymentDate+
                    '&applyReasons='+responseData.applyReasons+
                    '&loanName='+responseData.loanName+
                    '&bankNo='+responseData.bankNo+
                    '&status='+vm.status+
                    '&aprRes='+aprRes.body+
                    '&bankBranch='+responseData.bankBranch;
                  url = encodeURI(encodeURI(url))
                  window.open(url);
                });
              })
            },
            loadData: function () {
                let that = this;
                that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETACCOUNTLOAN,{'bussinessData':{'id':this.businessKey}}).then(function (response) {
                    let Data = response.json().result;
                    that.post = Data;
                    that.post.title= Data.officeName + ' - ' + Data.createName + ' 的借款申请';
                })
                that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                        that.fileList = response.json().result
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
