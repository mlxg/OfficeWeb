<!-- 流程中心 --- 待办审批流程 --- 报销申请审批 -->
<template>
  <h3 class="u-fs20 g-tc">{{post.createByName}}的报销申请</h3>
  <button type="button" v-if="this.types=='application'" class="btn btn-primary g-marginR30" @click="queryEmployee">打印</button>
  <Tip-border tip="报销基本信息">
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">报销编号：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.serialNo}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">所属部门：</label>
      <div class="col-sm-4">
        <span class="writing g-tf">{{post.applyOfficeName}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">报销人：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.createByName}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">职位：</label>
      <div class="col-sm-4">
        <span class="writing g-tf">{{post.postionName}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">紧急程度：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.urgencyDegreeDisplay}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">付款用途：</label>
      <div class="col-sm-4">
        <span class="writing g-tf">{{post.typeName}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">所属项目：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.projectTypeDisplay}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">报销科目：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.paymentCategoryDisplay}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">是否借款：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.expenseLoanDisplay}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">所属公司：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.belongCompanyDisplay}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">发票类型：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.invoiceTypeDisplay}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">收款单位：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.payeeTypeDisplay}}</span>
      </div>
    </div>
    <section v-if="post.invoiceTypeValue != 0">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label g-tr">发票号码：</label>
        <div class="col-sm-4">
          <span class="writing">{{post.invoiceCode}}</span>
        </div>
      </div>
    </section>
  </Tip-border>
  <Tip-border tip="报销项目信息">
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">账户名称：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.accountName}}</span>
      </div>
      <label class="col-sm-2 control-label g-tr">账号：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.accountNumber}}</span>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">开户行：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.bankBranch}}</span>
      </div>
    </div>
    <section v-if="post.typeCode == 'CLF'">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label g-tr">出差地点：</label>
        <div class="col-sm-4">
          <span class="writing">{{post.evectionSite}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label g-tr">出差日期：</label>
        <div class="col-sm-4">
          <span class="writing">{{post.evectionStart}} ~~ {{post.evectionEnd}}</span>
        </div>
      </div>
    </section>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label g-tr">报销金额：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.expenseAmount}}</span>
      </div>
      <section v-if="post.expenseLoanValue == 1">
        <label class="col-sm-2 control-label">借款时间：</label>
        <div class="col-sm-4">
          <span class="writing">{{post.loanDate}}</span>
        </div>
      </section>
    </div>
    <section v-if="post.expenseLoanValue == 1">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">借款金额：</label>
        <div class="col-sm-4">
          <span class="writing">{{post.loanAmount}}</span>
        </div>
        <label class="col-sm-2 control-label">预计还款时间：</label>
        <div class="col-sm-4">
          <span class="writing">{{post.repaymentDate}}</span>
        </div>
      </div>
    </section>
    <section v-if="post.expenseLoanValue == 1">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">应付金额：</label>
        <div class="col-sm-4">
          <span class="writing">{{total}}</span>
        </div>
      </div>
    </section>
    <div class="form-group g-marginB20 clearfix">
      <label class="col-sm-2 control-label">申请理由：</label>
      <div class="col-sm-10">
        <textarea class="form-control" rows="3" v-model="post.expenseReason" readonly></textarea>
        <p class="v-red">{{valida.testcomment}}</p>
      </div>
    </div>
    <div class="form-group clearfix">
      <label class="col-sm-2 control-label">实际应付金额：</label>
      <div class="col-sm-4">
        <span class="writing">{{post.actualExpenseAmount}}</span>
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
        post:{

        },
        isShow: false,
        types:'',
        status:'',
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        apiUrl:'',
        fileList:[]
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
    computed:{
      total: function () {
        let vm = this;
        let totals = vm.post.expenseAmount - vm.post.loanAmount
        return totals;
      },
    },
    methods:{
      cancelProcess: function () {
        this.$router.go('/process/dispose')
      },
      queryEmployee:function () {
        let vm = this;
        let getUrl = content.STAROFFICE_ACT + interfaces.INTERFACE_GETHISTORYNAME+'?processInstanceId='+this.taskId;
        vm.$http.get(getUrl).then((aprRes)=>{
          vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSE, {'bussinessData':this.businessKey}).then((response)=>{
            let responseData = JSON.parse(response.data);
            responseData = responseData.result
            let pageName = 'rembursetwo.html';
            let createDate = responseData.createDate
            createDate = createDate.split(' ')[0]
            if (!responseData.evectionSite) {
              responseData.evectionSite = ''
            };
            let evectionStart = responseData.evectionStart
            if (responseData.evectionStart) {
              evectionStart = evectionStart.split(' ')[0] + ' 至 ' + (responseData.evectionEnd).split(' ')[0]
            }else{
              evectionStart = ''
            };
            let loanAmount = ''
            if (responseData.loanAmount) {
              loanAmount = responseData.loanAmount
            };
            let repaymentDate = ''
            if (responseData.repaymentDate) {
              repaymentDate = responseData.repaymentDate
            };
            let url = '/'+pageName+
              '?createDate='+createDate+
              '&serialNo='+responseData.serialNo+
              '&createByName='+responseData.createByName+
              '&applyOfficeName='+responseData.applyOfficeName+
              '&typeName='+responseData.typeName+
              '&paymentCategoryDisplay='+responseData.paymentCategoryDisplay+
              '&projectTypeDisplay='+responseData.projectTypeDisplay+
              '&evectionSite='+responseData.evectionSite+
              '&evectionStart='+evectionStart+
              '&belongCompanyDisplay='+responseData.belongCompanyDisplay+
              '&payeeTypeDisplay='+responseData.payeeTypeDisplay+
              '&expenseLoanDisplay='+responseData.expenseLoanDisplay+
              '&loanAmount='+loanAmount+
              '&repaymentDate='+repaymentDate+
              '&expenseAmount='+responseData.expenseAmount+
              '&actualExpenseAmount='+responseData.actualExpenseAmount+
              '&invoiceAmount='+responseData.invoiceAmount+
              '&expenseReason='+responseData.expenseReason+
              '&accountName='+responseData.accountName+
              '&accountNumber='+responseData.accountNumber+
              '&status='+vm.status+
              '&aprRes='+aprRes.body+
              '&bankBranch='+responseData.bankBranch;
            url = encodeURI(encodeURI(url))
            // console.log(url)
            window.open(url);
          });
        })
      },

      loadData: function () {
        let that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSE,{bussinessData:{id:this.businessKey}}).then(function (response) {
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
