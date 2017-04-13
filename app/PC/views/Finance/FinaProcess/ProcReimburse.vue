<!-- 流程中心  报销流程 -->
<template>
  <h3 class="u-fs20 g-tc g-marginB20">{{post.bussinessData.title}}</h3>
  <validator name="validation">
    <form class="clearfix" novalidate>
      <Tip-border tip="报销基本信息">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">报销编号：</label>
          <div class="col-sm-4">
            <span class="writing">{{post.bussinessData.serialNo}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">所属部门：</label>
          <div class="col-sm-4">
            <span class="writing g-tf">{{datas.applyOfficeName}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">报销人：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.createByName}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">职位：</label>
          <div class="col-sm-4">
            <span class="writing g-tf">{{datas.postionName}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">紧急程度：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.urgencyDegreeDisplay}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">付款用途：</label>
          <div class="col-sm-4">
            <span class="writing g-tf">{{datas.typeName}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">所属项目：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.projectTypeDisplay}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">报销科目：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.paymentCategoryDisplay}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">是否借款：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.expenseLoanDisplay}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">所属公司：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.belongCompanyDisplay}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">发票类型：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.invoiceTypeDisplay}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">收款单位：</label>
          <div class="col-sm-4">
            <span class="writing">{{datas.payeeTypeDisplay}}</span>
          </div>
        </div>
        <section v-if="post.bussinessData.invoiceTypeValue != 0">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label g-tr">发票号码：</label>
            <div class="col-sm-4">
              <span class="writing">{{post.bussinessData.invoiceCode}}</span>
            </div>
          </div>
        </section>
      </Tip-border>
      <Tip-border tip="报销项目信息">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">账户名称：</label>
          <div class="col-sm-4">
            <span class="writing">{{post.bussinessData.accountName}}</span>
          </div>
          <label class="col-sm-2 control-label g-tr">账号：</label>
          <div class="col-sm-4">
            <span class="writing">{{post.bussinessData.accountNumber}}</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">开户行：</label>
          <div class="col-sm-4">
            <span class="writing">{{post.bussinessData.bankBranch}}</span>
          </div>
        </div>
        <section v-if="post.bussinessData.typeCode == 'CLF'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label g-tr">出差地点：</label>
            <div class="col-sm-4">
              <span class="writing">{{post.bussinessData.evectionSite}}</span>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label g-tr">出差日期：</label>
            <div class="col-sm-4">
              <span class="writing">{{post.bussinessData.evectionStart}} — {{post.bussinessData.evectionEnd}}</span>
            </div>
          </div>
        </section>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label g-tr">报销金额：</label>
          <div class="col-sm-4">
            <span class="writing">{{post.bussinessData.expenseAmount}}</span>
          </div>
          <section v-if="post.bussinessData.expenseLoanValue == 1">
            <label class="col-sm-2 control-label">借款时间：</label>
            <div class="col-sm-4">
              <span class="writing">{{datas.loanDate}}</span>
            </div>
          </section>
        </div>
        <section v-if="post.bussinessData.expenseLoanValue == 1">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">借款金额：</label>
            <div class="col-sm-4">
              <span class="writing">{{datas.loanAmount}}</span>
            </div>
            <label class="col-sm-2 control-label">预计还款时间：</label>
            <div class="col-sm-4">
              <span class="writing">{{datas.repaymentDate}}</span>
            </div>
          </div>
        </section>
        <section v-if="post.bussinessData.expenseLoanValue == 1">
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
            <textarea class="form-control" rows="3" v-model="post.bussinessData.expenseReason" readonly></textarea>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">附件下载：</label>
          <div class="col-sm-4">
            <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
          </div>
        </div>
        <div class="form-group clearfix" v-if="kj != -1">
          <label class="col-sm-2 control-label g-tr field-require">实际应付金额：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" v-model="post.bussinessData.actualExpenseAmount" maxlength="9"
                   v-validate:sjyfje="{required: { rule: true }, pattern: '/^\-?(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/',existDepartName: { rule: true }}">
            <span class="fc-red" v-show="($validation.sjyfje.touched || validating) && $validation.sjyfje.required">必填项</span>
            <span class="fc-red" v-show="($validation.sjyfje.touched || validating) && $validation.sjyfje.existDepartName">不能大于报销金额</span>
            <span class="fc-red" v-show="post.bussinessData.actualExpenseAmount && $validation.sjyfje.touched && $validation.sjyfje.pattern">金额格式错误</span>
          </div>
        </div>
        <div class="form-group clearfix" v-if="cn != -1 || cw != -1 || dsz != -1 || zjl != -1 || zc != -1">
          <label class="col-sm-2 control-label g-tr ">实际应付金额：</label>
          <div class="col-sm-4" v-validate-class>
            <span class="writing">{{post.bussinessData.actualExpenseAmount}}</span>
          </div>
        </div>
      </Tip-border>
      <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
      </Tip-border>
      <div class="form-group g-tc g-marginT20" v-if="cn != -1">
        <button type="button" v-if="payment == '1'" class="btn btn-primary g-marginR30" @click="sfk('付款日期')">付款</button>
        <button type="button" v-else class="btn btn-primary g-marginR30" @click="sfk('收款日期')">收款</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
      </div>
      <div v-else class="form-group g-tc g-marginT20">
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)">同意</button>
        <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)">驳回</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
      </div>
    </form>
  </validator>
  <Process-Approve v-if="humanTaskId" :amount="amount" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
  <Process-Diagram :process-instance-id="taskId"></Process-Diagram>
  <div class="mask3" v-show="showtime">
    <div class="mask-align"></div>
    <div class="notice-panel">
      <div class="notice-title">
        <div @click="exit" class="exit"></div>
        <h1>收付款日期</h1>
      </div>
      <div class="notice-content">
        <label class="control-label">{{sfktime}}：</label>
        <validator name="validation2">
        <div class="g-pr" v-validate-class>
          <input type="text" class="form-control input-calendar" v-model="post.bussinessData.paymentTime" @click.stop="calendar2.show = true" readonly v-validate:sfk="{required: true}">
            <span class="fc-red" v-show="($validation2.sfk.touched || validating) && $validation2.sfk.required">必填项</span>
          <Public-Calendar
            :value.sync="post.bussinessData.paymentTime"
            :type="calendar2.type"
            :show.sync="calendar2.show"
            :x="calendar2.x"
            :y="calendar2.y"
            :sep.sync="calendar2.sep"></Public-Calendar>
        </div>
        </validator>
      </div>
      <div class="form-group g-tc" v-if="cn != -1">
        <button type="button" class="btn btn-primary g-marginR30" @click="process($event)">确认</button>
        <button type="button" class="btn btn-default" @click="exit">取消</button>
      </div>
    </div>
  </div>
  <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
  import TipBorder from '../../../components/public/TipBorder.vue';
  import ProcessDiagram from '../../../components/others/ProcessDiagram';
  import ApproveList from '../../../components/others/ApproveList';
  import * as content from '../../../constants/contentTypes';
  import * as interfaces from '../../../constants/interfaceTypes';
  import ProcessApprove from '../../../components/others/ProcessApprove';
  import PublicCalendar from '../../../components/public/PublicCalendar'
  import LookScreen from '../../../components/public/LockScreen.vue'
  export default{
    props: ['taskId', 'businessKey', 'humanTaskId','taskformKey','cn','kj','hr','deptheader','cw','zc','dsz','zjl','edit'],
    components: {
      TipBorder,
      ProcessDiagram,
      ApproveList,
      ProcessApprove,
      PublicCalendar,
      LookScreen
    },
    data: function(){
      return {
        payment:'',
        post:{
          bussinessData:{
            actualExpenseAmount:'',
            paymentTime:'',
          }
        },
        lookscreen:{
          isShow:false,
        },
        datas:{
          bussinessData:{}
        },
        isShow: false,
        types:'',
        status:'',
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        apiUrl:'',
        fileList:[],
        comment:'',
        comments:false,
        amount:'',
        showtime:false,
        sfktime:'',
        calendar2: {
          show: false,
          x: 13,
          y: 40,
          sep: '-',
        },
      }
    },
    created: function(){
    },
    computed: {
      total: function () {
        let totals;
        totals = this.post.bussinessData.expenseAmount - this.datas.loanAmount
        return totals;
      },
    },
    asyncData: function (resolve) {
      let that = this;
      this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSE,{bussinessData:{id:that.businessKey}}).then(function (response) {
        var Data = response.json().result;
        resolve({
          'post.bussinessData.id' : Data.id,
          'post.bussinessData.serialNo' : Data.serialNo,
          'post.bussinessData.loanId' : Data.loanId,
          'post.bussinessData.urgencyDegreeId' : Data.urgencyDegreeId,
          'post.bussinessData.typeCode' : Data.typeCode,
          'post.bussinessData.projectTypeValue' : Data.projectTypeValue,
          'post.bussinessData.expenseLoanValue' : Data.expenseLoanValue,
          'post.bussinessData.belongCompanyValue' : Data.belongCompanyValue,
          'post.bussinessData.invoiceTypeValue' : Data.invoiceTypeValue,
          'post.bussinessData.payeeTypeValue' : Data.payeeTypeValue,
          'post.bussinessData.accountName' : Data.accountName,
          'post.bussinessData.accountNumber' : Data.accountNumber,
          'post.bussinessData.bankBranch' : Data.bankBranch,
          'post.bussinessData.evectionSite' : Data.evectionSite,
          'post.bussinessData.evectionStart' : Data.evectionStart,
          'post.bussinessData.evectionEnd' : Data.evectionEnd,
          'post.bussinessData.expenseAmount' : Data.expenseAmount,
          'post.bussinessData.expenseReason' : Data.expenseReason,
          'post.bussinessData.paymentTime' : Data.paymentTime,
          'post.bussinessData.typeCode' : Data.typeCode,
          'post.bussinessData.title' : Data.title,
          'post.bussinessData.invoiceCode' : Data.invoiceCode,
          'post.bussinessData.actualExpenseAmount' : Data.actualExpenseAmount,

          'datas.applyOfficeName' : Data.applyOfficeName,
          'datas.urgencyDegreeDisplay' : Data.urgencyDegreeDisplay,
          'datas.typeName' : Data.typeName,
          'datas.payeeTypeDisplay' : Data.payeeTypeDisplay,
          'datas.expenseLoanValue' : Data.expenseLoanValue,
          'datas.loanDate' : Data.loanDate,
          'datas.createByName' : Data.createByName,
          'datas.postionName' : Data.postionName,
          'datas.loanAmount' : Data.loanAmount,
          'datas.repaymentDate' : Data.repaymentDate,
          'datas.paymentCategoryDisplay' : Data.paymentCategoryDisplay,
          'datas.projectTypeDisplay' : Data.projectTypeDisplay,
          'datas.expenseLoanDisplay' : Data.expenseLoanDisplay,
          'datas.belongCompanyDisplay' : Data.belongCompanyDisplay,
          'datas.invoiceTypeDisplay' : Data.invoiceTypeDisplay,
        })
        if((that.post.bussinessData.actualExpenseAmount) > 0){
            this.payment = '1'
        }
      })
      this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
        resolve({
          'fileList': response.json().result
        })
      })
    },
    validators: {
      existDepartName (val) { // 验证新增部门
        let vm = this.vm;
        if (!val) return Promise.resolve();
        if(val > vm.post.bussinessData.expenseAmount){
          return false
        }else{
          return true;
        }

      }
    },
    methods:{
      approveProcess: function (e,comments) {
        let vm = this;
        vm.comments = comments;
        if(comments){
          vm.comment = '同意'
        }else{
          vm.comment = '不同意'
        }
        //判断是不是会计
//        if(this.kj != '-1'){
//          this.amount = this.post.bussinessData.actualExpenseAmount
//        }else{
//          //没借款也不是会计
//          this.amount = this.post.bussinessData.actualExpenseAmount
//        }
        this.amount = this.post.bussinessData.ExpenseAmount
        if(vm.kj != "-1" || vm.cn != '-1'){
          this.$validate(true, function () {
            if (vm.$validation.invalid) {
              e.preventDefault()
            }else{
              vm.isShow = true;
              vm.sub();
            }
          })
        }else{
          vm.isShow = true;
        }
      },
      sub: function(){
        let vm = this;
        //数组转换成字符串
        vm.post.bussinessData.formKey = vm.taskformKey
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEEXPENSE, this.post).then((response) => {
          let status = response.json().status;
          if(status == 0){
          }else{
          }
        });
      },
      cancelProcess: function () {
        this.$router.go('/process/todo')
      },
      sfk:function (time) {
          this.sfktime = time;
        this.showtime = true;
      },
      exit: function () {
        this.showtime = false;
      },
      process: function (e) {
        let vm = this;
        this.$validate(true, function () {
          if (vm.$validation2.invalid) {
            e.preventDefault()
          }else{
            vm.lookscreen.isShow = true;
//            vm.amount = vm.post.bussinessData.actualExpenseAmount;
            vm.amount = vm.post.bussinessData.ExpenseAmount;
            let userId = sessionStorage.getItem("loginName");
            vm.sub();
            vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
              'humanTaskId': vm.humanTaskId,
              'appros': vm.comments,
              'comment': '同意',
              'amount' : vm.amount,
              'userId' : userId
            }).then((response) => {
              let result = response.json();
            if(result.status == 0){
              vm.lookscreen.isShow = false;
              vm.$router.go('/process/todo');
            }else{
              vm.lookscreen.isShow = false;
            }
          })
          }
        })
      }
    }
  }
</script>
<style lang="less">
  table.w83{
    width:83%
  }
  table.mask-table td{
    text-align: left;
  }
  .v-red{
    background: #ffe5e6 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY5OTM3QTgxNzM0RTExRTZBNkZGRDQ1NTdCQ0MwRkE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY5OTM3QTgyNzM0RTExRTZBNkZGRDQ1NTdCQ0MwRkE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njk5MzdBN0Y3MzRFMTFFNkE2RkZENDU1N0JDQzBGQTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njk5MzdBODA3MzRFMTFFNkE2RkZENDU1N0JDQzBGQTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hqAltAAABDUlEQVR42mL8z8DFgAT4gDgAiE2BWBoq9gSITwLxZiD+BFPIiKTRCojzgJibATv4BsQTgfgYskaQpgoQnwE/+A/EHSDNII38QMYsIOZiIA6AbE5jAhI+yJr+LJhp8C/AVxTGB7H/zJ9hgKQRpNafBUiYIxvHtHHr079tjUZA5jkQH8Rmrqo/h2arKcip64AMVmTRf4F+on9bG0CaGUCamDZsfo2m8Q8T9iD4T8iff1ig8aSI7Ke/7U1GzJV1cKeCnI1m6wsWaOQiNAb6SoM0ISk89y/ARxpN42mKouMjNEX8J0LTf6jaj8hJzhqI84GYE4em70A8AT3JoSdyM2gi/wPEz0B+AuJNyIkcIMAAiTRcCLgSmFkAAAAASUVORK5CYII=) no-repeat 2px center/14px 14px;
    border: 1px solid #ff7a7a;
    border-radius: 4px;
    height: 24px;
    color: #ff3333;
    font-size: 12px;
    display: inline-block;
    margin-top: -12px;
    position: absolute;
    top: 50%;
    right: 19px;
    padding: 2px 6px 2px 20px;
    display: none;;
  }
  .invalid p{
    display: block;
  }
  .untouched p{
    display: none;
  }

  .mask3{
    position: fixed;
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    text-align: center;
    /* inorder to adapt the color #ccc */
    background: rgba(0, 0, 0, 0.20);
  .mask-align{
    display: inline-block;
    height: 100%;
    width: 1px;
    line-height: 100%;
    vertical-align: middle;
  }
  .notice-panel{
    display: inline-block;
    width: 320px;
    height: auto;
    background-color: #fff;
    position: relative;
    vertical-align: middle;
    margin-top: 60px;
  }
  .notice-title{
    background-color: #278eed;
  h1{
    margin: 0;
    padding-left: 10px;
    text-align: left;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    color: white;
  }
  }
  .exit{
    width: 20px;
    height: 20px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA3OEYwMTA4NjVEMzExRTY5QkZDQjk5MEQzREQ4OUYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA3OEYwMTA5NjVEMzExRTY5QkZDQjk5MEQzREQ4OUYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDc4RjAxMDY2NUQzMTFFNjlCRkNCOTkwRDNERDg5RjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDc4RjAxMDc2NUQzMTFFNjlCRkNCOTkwRDNERDg5RjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70HGO2AAAAy0lEQVR42mL8//8/A7mAiYECMHw0//jzn0zNn3/+91r48fLLP8iChx/8ztvyBYvu/xjg4P1fltPfXXrxG8LdfvOn7az3V2BcZIBFM0S/1Yz3F5//Xn35h+Oc93fe/sGqDLtmiH7jKe/c53948vEvLjU4Q5ufgxEUJIwMjHhCDKuRF57/Bjr70P1fKy/9cJ77/i7xzobrhHC33vhpP+v91ZdEBNinH/9sZiJ0QsCBe79yN3/G1MyImaveff8vxMlITCJhHM2SpAGAAAMAUQBsmfPRBo0AAAAASUVORK5CYII=);
    position: absolute;
    right: 10px;
    top: 10px;
  &:hover{
     cursor: pointer;
   }
  }
  .notice-content{
  i{
    width: 30px;
    height: 30px;
    display: inline-block;
    margin-top: 55px;
  }
  .success{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzOTVERjc5NjVEMzExRTZBN0M4RDNCQkRDNTY4RDFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzOTVERjdBNjVEMzExRTZBN0M4RDNCQkRDNTY4RDFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM5NURGNzc2NUQzMTFFNkE3QzhEM0JCREM1NjhEMUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDM5NURGNzg2NUQzMTFFNkE3QzhEM0JCREM1NjhEMUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5n9uL4AAADHElEQVR42syXb2hNYRzHnx3a2lWGbUjc0MKa4sWkUHixDWkvVhbasub/nwmRRF7ZG2q4QjSsMNqL5Q0ZW5Pkjb0Tq1kbhtQ27pW2TOL7u32f9XQ6555z7z0v/OrT+fc8v+9znvN7fr/nZIRflisflglKQQlYBuaDqXz2HfSBV+ApeALGvBxmeAhPAYfBfpCr/NkwuAzOg2gqwpvBJZDH6x/gIXgBPoKvvD8ThMEqsAHk8P4QqAP3nZxPdLg3gSPezWsRqQe3wWiCN70CskE1OMnB3ANrOGN/zMaWg2iLISrOisB1D1Fto2xbxMEr+mqhb1fhCKjg6LZzpD9V8iZ9DoBa+qqgb0fhrWAfz3eAmyp9u0Vfir632IUlei8Y09ukgrMm+hS7SK1x4SMgn4F0XAVvx+g7n1pxYUkOe9mgPsVv6mQ76U80RsAZ3hetTIsZKY8ReScg0YOM7hNc52J3qSFapVpYMd2NBCC6zYiX0+ALz8V3O8/jwsW8aAtAVJbNDcmIoMGYXm2PeSwW4QJevE1TtISZShJFIzjq0KabxwLLyK3DtkbLwTkjVyeyFeABA1Wy1B7w16HdEI85VgJnhzjqdi4DN1sKHoEQj9X2vOxkIhzjub3s6cBYAjrBDIf+C1h/Zdaeg00etVjPXkyEe3lRaGv0DqwFn5j0O42loVh9OjgbXaDcx6pYxGOvxU6K9dRuPWA1s44M7BmYBaZTdDZ4wzoc8xELWqPL4lSJbWQ9tVsfa+p7sJBv3sHVIM/WgUEfotnUiOcMLSzRNhlUuXTqp3g/v+ti8BmU8VP4sSpqiFabxWC4yoenGJ1O9oHT3sM3XG/Eh5eF6FtRa0wvpwY6C3PtutkA33YueJ1EcjlL34PUGi+LUa5bXbBrEjj5nWROr+FORueGqH0H0mwU7EbuENO1OvrSG4xmtz2XlLNW5tsIE/6kFARD7Buhr1b6dt3sSaqrBNd4XcvisQtk+RDM4gagm30VfVXa02gyG/qYsaEfMOqsJJQ5YCXXqa8N/X/5C2P/aSszftrmgWl89o2Jxfxp++Xl8J8AAwBIQ7xEcy0ZPAAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
  }
  .warning{
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFNzE3MkU1NjVEMzExRTZBRUJFQ0ZERkU1OUU2MkEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFNzE3MkU2NjVEMzExRTZBRUJFQ0ZERkU1OUU2MkEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUU3MTcyRTM2NUQzMTFFNkFFQkVDRkRGRTU5RTYyQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUU3MTcyRTQ2NUQzMTFFNkFFQkVDRkRGRTU5RTYyQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zdoRoAAAC8UlEQVR42qyX22sTQRjFd6NWI0qtbfLQR8ELxAsUpBSN2oKp9rGK9lV8qJfai68+9MVnL/XSFv8BLdJHpRESqYKIKKgEIgX/gKwlloDGSonngzMyXXZ2ZzUfnO7M7sz5dXZmMt+6vy4ccSxiE9QPnYQOQ7ugHXz2HfoKvYNeQAvQ7yhDNwIs5uPQFSjl2MU36AF0h/9UYCRCDIagMjRJ6GeW+6BOaDPVyXuTbNPBcpke1iPeAN2DLrP+CrrBq01koZvQMdanoWvQWtiIBTpHaB26BB2PAVX/6An2rdNrjt5GsMzLIOdGXt8s1HDiR4N9xaNKz7sm8HloBPoJnYLeOP8f4nEa+gFdJWMdWFbvFMvXobdO80K8JlieUttQgWXLpDk/swGdt3O1RoW02RZw/xG0SMa4Ardwnzpcvf45FaNn0MuIvZxim+cB8Aa9HbJaBJxjp0+G1ZuE2qAMVDTAU3yWYdtkQJvX0Ee2zSmwxLxhJB5XZ8kA16EltvUMXorRL+AuVhZDXmMlAJ42QCshPorRtRF/9rBSjlg4Cl4gqMD7CtobMlIVX3jdLeBWVpYtVq0f7sSA6ozWxD/+KjV89dgh4BWW2y3apzja/RxpieWC5bGpGCsCXmJlX0xoH19xHPheXpcE/F47zsKgRQ3ay/n2fPBiBFwdlR8EnGflTATUtHp1eCYCPshrXoFltR2EjgY0rvNoC1u9OrzKPv4Q70NsuyDgVeg+H0rm4Po61KABHu5hW8ZjmwH2WZfp0FvioTATWgJQYbYxHGBaYxJnk+jVAu5fpLdH1t9jUTKOUZZvQd1NPI+7texjVGWe+g/IE6alSR6DPU2A9tBrK70fm3KuMZ4gO7kvhwPm3CZc9i3Qa57exmRPUtBzTEm3QDM83LMxoFluqRl6TNNzzfZLYohzk2ZdkvWnTBbK2mLr4K+eAM9CB7QDZUx/vXE/YSaYIbZbjniZ83k77BPGjfnRltM+2tr4rKp9tOWp1SjDPwIMAC0wyJFgg73pAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-position: center;
  }
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  .content{
    vertical-align: middle;
    font-size: 16px;
    margin: 10px;
    display: flex;
    align-items: center;
  }
  }
  .notice-select{
    position: absolute;
    width: 100%;
    bottom: 20px;
  button{
    outline: none;
    border: 1px solid #ddd;
    background-color: white;
    color: #333;
    border-radius: 3px;
    height: 34px;
    line-height: 34px;
    vertical-align: middle;
    padding: 0 24px;
    margin: 0 20px;
  &:hover{
     border: 1px solid #2380d5;
     background-color: #278eed;
     color: white;
     cursor: pointer;
   }
  }
  }
  }
</style>
