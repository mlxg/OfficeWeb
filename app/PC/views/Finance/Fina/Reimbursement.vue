<!-- 报销 -->
<template>
  <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
  <section v-if="post.bussinessData.expenseLoanValue == 1">
    <div class="form-group clearfix">
      <button type="button" class="btn btn-primary g-marxginR30 g-fr" @click="locnmoduleclk">关联借款单</button>
    </div>
  </section>
  <validator name="validation">
    <Tip-border tip="报销基本信息">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">报销编号：</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" readonly v-model="post.bussinessData.serialNo">
        </div>
        <label class="col-sm-2 control-label">所属部门：</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" readonly v-model="officeName">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label field-require">紧急程度：</label>
        <div class="col-sm-4" v-validate-class>
          <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.bussinessData.urgencyDegreeId"
                          v-validate:eml="{required: true}"></Tool-Selection>
          <span class="fc-red" v-show="($validation.eml.touched || validating) && $validation.eml.required">必填项</span>
        </div>
        <label class="col-sm-2 control-label field-require">付款用途：</label>
        <section v-if="this.edit == '-1' || !this.edit">
          <div class="col-sm-4" v-validate-class>
            <select class="form-control" v-model="post.bussinessData.typeCode"  v-validate:fkyt="{required: true}">
              <option v-for="item in PurposeList" v-bind:value="item.typeCode" >{{item.typeName}}</option>
            </select>
            <span class="fc-red" v-show="($validation.fkyt.touched || validating) && $validation.fkyt.required">必填项</span>
          </div>
        </section>
        <section v-else>
          <div class="col-sm-4">
            <input v-model="post.bussinessData.typeName" type="text" class="form-control" readonly>
          </div>
        </section>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label field-require">所属项目：</label>
        <section v-if="post.bussinessData.judgeProject != '10000' && post.bussinessData.judgeProject" >
          <div class="col-sm-4">
            <input v-model="projectValue" type="text" class="form-control" readonly>
          </div>
        </section>
        <section v-else>
          <div class="col-sm-4" v-validate-class>
            <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="post.bussinessData.projectTypeValue"
                            v-validate:project="{required: true}"></Tool-Selection>
            <span class="fc-red" v-show="($validation.project.touched || validating) && $validation.project.required">必填项</span>
          </div>
        </section>
        <label class="col-sm-2 control-label">报销科目：</label>
        <div class="col-sm-4" v-validate-class>
          <input type="text" class="form-control" readonly v-model="paymentCategoryDisplay">
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label field-require">是否借款：</label>
        <div class="col-sm-4" v-validate-class>
          <Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.bussinessData.expenseLoanValue"
                          v-validate:expense="{required: true}"></Tool-Selection>
          <span class="fc-red" v-show="($validation.expense.touched || validating) && $validation.expense.required">必填项</span>
        </div>
        <label class="col-sm-2 control-label field-require">所属公司：</label>
        <div class="col-sm-4" v-validate-class>
          <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.bussinessData.belongCompanyValue"
                          v-validate:belong="{required: true}"></Tool-Selection>
          <span class="fc-red" v-show="($validation.belong.touched || validating) && $validation.belong.required">必填项</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label field-require">发票类型：</label>
        <div class="col-sm-4" v-validate-class>
          <Tool-Selection :select-type-index="4" :all-select-types="type" v-model="post.bussinessData.invoiceTypeValue"
                          v-validate:invoice="{required: true}"></Tool-Selection>
          <span class="fc-red" v-show="($validation.invoice.touched || validating) && $validation.invoice.required">必填项</span>
        </div>
        <label class="col-sm-2 control-label field-require">收款单位：</label>
        <div class="col-sm-4" v-validate-class>
          <Tool-Selection :select-type-index="5" :all-select-types="type" v-model="post.bussinessData.payeeTypeValue"
                          v-validate:payee="{required: true}"></Tool-Selection>
          <span class="fc-red" v-show="($validation.payee.touched || validating) && $validation.payee.required">必填项</span>
        </div>
      </div>
      <section v-if="post.bussinessData.invoiceTypeValue != 0">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">电子发票张数：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" readonly v-model="invNum">
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label field-require">电子发票号码：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" v-model="firstNum" maxlength="15"
                              v-validate:hiredpeople="{required: true,  existName: { rule: true, initial: 'off' }}" />
            <span class="fc-red" v-show="($validation.hiredpeople.touched || validating) && $validation.hiredpeople.required">必填项</span>
            <span class="fc-red" v-show="($validation.hiredpeople.touched || validating) && $validation.hiredpeople.existName">该号码已存在</span>
          </div>
          <div class="col-sm-4" v-validate-class>
            <button type="button" class="btn btn-primary g-marginR30" @click="addNumber">增加</button>
          </div>
        </div>
        <div class="form-group clearfix" v-for="field in numList">
          <label class="col-sm-2 control-label"></label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" :field="field.name + $index" v-model="field.number" maxlength="15"
                     v-validate="field.validate" />
            <span class="fc-red" v-show="($validation[field.name + $index].touched || validating) && $validation[field.name + $index].required">必填项</span>
            <span class="fc-red" v-show="($validation[field.name + $index].touched || validating) && $validation[field.name + $index].existName">该号码已存在</span>
          </div>
          <div class="col-sm-4">
            <button type="button" class="btn btn-default g-marginR30" @click="dir($index)">删除</button>
          </div>
        </div>
      </section>
    </Tip-border>
    <Tip-border tip="报销项目信息">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label field-require">账户名称：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" autocomplete="on" v-model="post.bussinessData.accountName" maxlength="40"
                   v-validate:zhmc="{required: true}" placeholder="请输入收款账户姓名/公司全称">
            <span class="fc-red" v-show="($validation.zhmc.touched || validating) && $validation.zhmc.required">必填项</span>
          </div>
          <label class="col-sm-2 control-label field-require">账号：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" autocomplete="on" v-model="post.bussinessData.accountNumber" maxlength="30" v-validate:acnumber="{required: { rule: true }}">
            <span class="fc-red" v-show="($validation.acnumber.touched || validating) && $validation.acnumber.required">必填项</span>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label field-require">开户行：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" autocomplete="on" v-model="post.bussinessData.bankBranch" maxlength="20"
                   v-validate:khh="{required: true}" placeholder="请输入银行卡所属银行">
            <span class="fc-red" v-show="($validation.khh.touched || validating) && $validation.khh.required">必填项</span>
          </div>
        </div>
        <section v-if="post.bussinessData.typeCode == 'CLF'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label field-require">出差地点：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="post.bussinessData.evectionSite" maxlength="30"
                     v-validate:ccdd="{required: true}">
              <span class="fc-red" v-show="($validation.ccdd.touched || validating) && $validation.ccdd.required">必填项</span>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label field-require">出差日期：</label>
            <div class="col-sm-2" v-validate-class>
              <input type="text" class="form-control input-calendar" v-model="post.bussinessData.evectionStart" @click.stop="calendar.evectionStart = true" v-validate:card-available="['required']" readonly="true">
              <span class="fc-red" v-show="($validation.cardAvailable.touched || validating) && $validation.cardAvailable.required">请选择起始日期</span>
              <Public-Calendar
                :value.sync="post.bussinessData.evectionStart"
                :show.sync="calendar.evectionStart"
                :x="calendar.x"
                :y="calendar.y"
                :sep.sync="calendar.sep"></Public-Calendar>
            </div>
            <div class="col-sm-2 field-interval" v-validate-class>
              <input type="text" class="form-control input-calendar" v-model="post.bussinessData.evectionEnd" @click.stop="calendar.evectionEnd = true" v-validate:card-available1="['required']" readonly="true">
              <span class="fc-red" v-show="($validation.cardAvailable1.touched || validating) && $validation.cardAvailable1.required">请选择结束日期</span>
              <Public-Calendar
                :value.sync="post.bussinessData.evectionEnd"
                :show.sync="calendar.evectionEnd"
                :x="-88"
                :y="calendar.y"
                :sep.sync="calendar.sep"></Public-Calendar>
            </div>
          </div>
          </div>
        </section>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label field-require">报销金额：</label>
          <div class="col-sm-4" v-validate-class>
            <input type="text" class="form-control" v-model="post.bussinessData.expenseAmount" maxlength="9"
                   v-validate:bxje="{required: { rule: true }, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}">
            <span class="fc-red" v-show="($validation.bxje.touched || validating) && $validation.bxje.required">必填项</span>
            <span class="fc-red" v-show="post.bussinessData.expenseAmount && $validation.bxje.touched && $validation.bxje.pattern">金额格式错误</span>
          </div>
          <section v-if="post.bussinessData.expenseLoanValue == 1">
            <label class="col-sm-2 control-label">借款时间：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" readonly v-model="loanTime" v-validate:jksj="{required: true}">
              <span class="fc-red" v-show="($validation.jksj.touched || validating) && $validation.jksj.required">请关联借款</span>
            </div>
          </section>
        </div>
        <section v-if="post.bussinessData.expenseLoanValue == 1">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">借款金额：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" readonly v-model="loanAmount" v-validate:jkje="{required: true}">
              <span class="fc-red" v-show="($validation.jkje.touched || validating) && $validation.jkje.required">请关联借款</span>
            </div>
            <label class="col-sm-2 control-label">预计还款时间：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" readonly v-model="repaymentDate" v-validate:hksj="{required: true}">
              <span class="fc-red" v-show="($validation.hksj.touched || validating) && $validation.hksj.required">请关联借款</span>
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">应付金额：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" readonly v-model="total">
            </div>
          </div>
        </section>
        <div class="form-group g-marginB20 clearfix" v-validate-class>
          <label class="col-sm-2 control-label field-require">申请理由：</label>
          <Text :text-value='post.bussinessData.expenseReason' :max-length="200" :class-name="'col-sm-10'">
            <textarea class="form-control"  rows="3" v-model="post.bussinessData.expenseReason"
              v-validate:comment="{required: true, maxlength: 200}" ></textarea>
            <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.required">必填项</span>
            <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.maxlength">评语过长</span>
          </Text>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">上传附件：</label>
          <div class="col-sm-10">
            <Tool-Upload :files.sync="fileList" :resource-id="post.bussinessData.id" :resource-type="'9'"></Tool-Upload>
            <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
          </div>
        </div>
      </Tip-border>
      <div class="form-group g-tc g-marginT20">
        <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="onSubmit($event)">提交流程</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
      </div>
    </validator>
  <div class="mask1" v-show="locnmodule">
    <div class="mask-align"></div>
    <div class="notice-panel">
      <div class="notice-title">
        <div @click="closed" class="exit "></div>
        <h1>关联借款流程</h1>
      </div>
      <div class="notice-content">
        <label class="control-label">申请日期：</label>
        <div class="g-pr">
          <input style="width: 230px" type="text" class="form-control input-calendar" v-model="searchs.toWorkTime" @click.stop="calendar2.show = true" readonly>
          <Public-Calendar
            :value.sync="searchs.toWorkTime"
            :type="calendar2.type"
            :show.sync="calendar2.show"
            :x="calendar2.x"
            :y="calendar2.y"
            :range.sync="calendar2.range"
            :sep.sync="calendar2.sep"></Public-Calendar>
        </div>
        <label class=" control-label">所属项目：</label>
        <div class="" style="width:100px">
          <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="searchs.projectValueDispay"
          ></Tool-Selection>
        </div>
        <label class=" control-label">借款编号：</label>
        <div class="">
          <input type="text" class="form-control" v-model="searchs.serialNo">
        </div>
        <button type="button" class="btn btn-primary g-marginR30" @click="quire">查询</button>
      </div>
      <div class="g-padding20"><public-table :config="params" :data="data"></public-table></div>
    </div>
  </div>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
  <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>
<script>
  import * as content from '../../../constants/contentTypes';
  import * as interfaces from '../../../constants/interfaceTypes';
  import * as type from '../../../constants/globalSelectTypes'
  import TipBorder from '../../../components/public/TipBorder.vue'
  import ToolSelection from '../../../components/public/ToolSelection.vue'
  import ToolUpload from '../../../components/public/ToolUpload'
  import Text from '../../../components/public/PublicTextLength'
  import PublicTable from '../../../components/public/PublicTable.vue'
  import PublicModal from '../../../components/public/PublicModal'
  import LookScreen from '../../../components/public/LockScreen'
  import PublicCalendar from '../../../components/public/PublicCalendar'
  export default{
    props: ['taskId', 'businessKey', 'humanTaskId','taskformKey','cn','kj','hr','deptheader','cw','zc','dsz','zjl','edit'],
    components: {
      TipBorder,
      ToolSelection,
      ToolUpload,
      Text,
      PublicTable,
      PublicModal,
      LookScreen,
      PublicCalendar
    },
    data: function(){
      return {
        projectValue:'',
        invNum:'1',
        numList:[],
        oldList:[],
        newList:[],
        typeShortName:'',                                   //流程类型简称
        firstNum:'',
        officeName:'',                                      //部门
        loginName:'',                                       //登录名
        userName:'',                                        //姓名
        userId:'',                                          //id
        paymentCategoryDisplay:'',                          //报销科目
        departmentCode:'',
        urgencyDegreeDisplay:'',
        loanTime:'',
        loanAmount:'',
        repaymentDate:'',
        post:{
          bussinessData:{
            id:'',                                          //报销申请ID
            judgeProject:'',
            formKey:'applying',
            serialNo:'',                                    //报销申请编号
            loanId:'',                                      //借款申请ID
            urgencyDegreeId:'',                             //紧急程度，数据字典值
            typeCode:'',                                    //流程类型编码（付款用途）
            projectTypeValue:'',                            //所属项目，数据字典值
            projectTyp:'',                                  //所属项目，数据字典值
            expenseLoanValue:'',                            //是否借款，数据字典值
            belongCompanyValue:'',                          //所属公司，数据字典值
            invoiceTypeValue:'',                            //发票类型，数据字典值
            payeeTypeValue:'',                              //收款单位，数据字典值
            accountName:'',                                 //账户名称
            accountNumber:'',                               //账号
            bankBranch:'',                                  //开户行
            evectionSite:'',                                //出差地点
            evectionStart:'',                               //出差开始时间
            evectionEnd:'',                                 //出差结束时间
            expenseAmount:'',                               //报销金额，保留两位小数
            actualExpenseAmount:'',                         //实际报销金额，保留两位小数
            expenseReason:'',                               //报销理由
            title:'',                                       //标题
            invoiceCode:'',                                 //发票编码
          },
        },
        params: {
          className: 'table table-striped table-hover table-bordered mask-table',
          pageSize: 5,
          pageList: [5],
          pagination: true,
          sequence: false,
          fields: [
            {
              name: 'serialNo',
              text: '编号',
            },
            {
              name: 'createDate',
              text: '申请时间',
            },
            {
              name: 'title',
              text: '标题',
            },
            {
              name: 'createTime',
              text: '操作',
              operates: [
                {
                  text: '关联',
                  className: 'btn btn-default',
                  handler: function(obj) {
                    let vm = this;
                    vm.onloadinfo(obj.id);
                  }
                }
              ]
            }
          ],
          callback: function(arg){
            let vm = this;
            vm.inquire({
              pageSize: arg.pageSize,
              pageNo: arg.pageNumber,

            })
          }
        },
        data: {
          data: '',
          total: 0,
          pageNumber: 1
        },
        page:{
          "pageSize":"5",
          "pageNo":"1",
        },
        searchs:{
          toWorkTime:'',
          projectValueDispay:'',
          serialNo:''
        },
        type: [
          type.URGENCY_DEGREE,
          type.PROJECT_TYPE,
          type.EXPENSE_LOAN,
          type.BELONG_COMPANY,
          type.INVOICE_TYPE,
          type.PAYEE_TYPE,
        ],
        PurposeList:[],
        fileList:[],
        emergencyList:[],
        locnmodule: false,
        process: {
          userId: '',
          businessKey: '',
          typeCode: '',
          businessType: 'BXSQ',
          appId: 'starOffice',
          businessCode: '',
          businessTitle: '',
          bussinessDataJsonStr: {
            amount:'',
            departmentCode: '',
            urgencyDegreeId:'',
            urgencyDegreeDispay:'',
          }
        },
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        lookscreen:{
          isShow:false,
        },
        calendar: {
          evectionStart: false,
          evectionEnd: false,
          x: 13,
          y: 40,
          sep: '-'
        },
        calendar2: {
          show: false,
          x: 13,
          y: 40,
          sep: '-',
          range:true,
        },
        keyid:'',
      }
    },
    created: function(){
      this.Purpose();
      this.emergency();
      this.userName = sessionStorage.getItem("userName");
      this.userId = sessionStorage.getItem("userId");
      this.process.userId = sessionStorage.getItem("loginName");
    },
    asyncData: function(resolve){
      let that = this;
      //判断id 进入的路径
      let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
      if(businessKey){
        that.process.businessKey = businessKey
        //包含id则更新页面
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSE,{bussinessData:{id :businessKey}}).then(function (response) {
          let result = response.json().result;
          resolve({
            'post.bussinessData.id': result.id,                                       //报销申请信息主键
            'post.bussinessData.serialNo': result.serialNo,                           //报销申请编号
            'post.bussinessData.title': result.title,                                 //标题
            'post.bussinessData.urgencyDegreeId': result.urgencyDegreeId,             //紧急程度，数据字典值
            'post.bussinessData.typeCode': result.typeCode,                           //流程类型编码（付款用途）
            'post.bussinessData.typeName': result.typeName,                           //流程类型名称（付款用途）
            'post.bussinessData.projectTypeValue': result.projectTypeValue,           //所属项目，数据字典值
            'post.bussinessData.judgeProject': result.judgeProject,                   //
            'post.bussinessData.expenseLoanValue': result.expenseLoanValue,           //是否借款，数据字典值
            'post.bussinessData.belongCompanyValue': result.belongCompanyValue,       //所属公司，数据字典值
            'post.bussinessData.invoiceTypeValue': result.invoiceTypeValue,           //发票类型，数据字典值
            'post.bussinessData.payeeTypeValue': result.payeeTypeValue,               //收款单位，数据字典值
            'post.bussinessData.accountName': result.accountName,                     //账户名称
            'post.bussinessData.accountNumber': result.accountNumber,                 //账号
            'post.bussinessData.bankBranch': result.bankBranch,                       //开户行
            'post.bussinessData.evectionSite': result.evectionSite,                   //出差地点
            'post.bussinessData.evectionStart': result.evectionStart,                 //出差开始时间
            'post.bussinessData.evectionEnd': result.evectionEnd,                     //出差结束时间
            'post.bussinessData.expenseAmount': result.expenseAmount,                 //报销金额
            'post.bussinessData.actualExpenseAmount': result.actualExpenseAmount,     //实际报销金额
            'post.bussinessData.expenseReason': result.expenseReason,                 //报销理由
            'post.bussinessData.invoiceCode': result.invoiceCode,                     //发票代码
            'post.bussinessData.loanId': result.loanId,                              //借款申请ID

            'process.businessCode': result.serialNo,                                  //报销申请编号
            'projectValue': result.projectTypeDisplay,                                //所属项目
            'officeName': result.applyOfficeName,                                     //申请部门名称
            'loanTime': result.loanDate,                                              //借款时间
            'loanAmount': result.loanAmount,                                          //借款金额
            'repaymentDate': result.repaymentDate,                                    //预计还款日期
          })
          //获取到发表号码开始进行截取装填
          if(!this.post.bussinessData.invoiceCode)return false;
          let arr = this.post.bussinessData.invoiceCode.split(',');
          this.invNum = arr.length;
          this.firstNum = arr[0];
          for(var i = 1;i< arr.length;i++){
            this.numList.push({number:arr[i],name: 'fpNumber',validate: {required: true,  existName: { rule: true, initial: 'off' }}});
          }
        })
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: businessKey}).then((response) => {
          resolve({
            'fileList': response.json().result
          })
        })

      }else{
        this.loadData();
        let cacheData =  localStorage.getItem(sessionStorage.getItem("userId"))
        if(!cacheData) return false;
        let cache = cacheData.split(',');
        this.post.bussinessData.accountName = cache[0];
        this.post.bussinessData.accountNumber = cache[1];
        this.post.bussinessData.bankBranch = cache[2];
      }
    },
    computed: {
      businessTitle: function(){
        let vm = this;
        let obj = this.PurposeList.find((item) => item.typeCode === this.post.bussinessData.typeCode);
        if(obj){
          this.typeShortName = obj.typeShortName;
          let str = (vm.officeName?vm.officeName+'-':'') + (vm.userName?vm.userName:'') + '的'+(vm.typeShortName?vm.typeShortName:'')+'报销申请';
          vm.post.bussinessData.title = str;
          vm.process.businessTitle = str;
          return str;
        }else{
          let str = (vm.officeName?vm.officeName+'-':'') + (vm.userName?vm.userName:'') + '的'+'报销申请';
          vm.post.bussinessData.title = str;
          vm.process.businessTitle = str;
          return str;
        }

      },
      total: function () {
        let vm = this.post.bussinessData;
        var totals
        if(!vm.expenseAmount || vm.expenseAmount == ''){
          totals = 0;
          return totals;
          return false;
        }
        if(!this.loanAmount){
          totals = 0;
          return totals;
          return false;
        }
        totals = vm.expenseAmount - this.loanAmount
        if(isNaN(totals) ){
          totals = 0;
        }
        return totals;
      },
    },
    validators: {
      existName (val) { // 验证录用人是否重名
        val = val.trim();
        if(!val) return Promise.resolve();
        if(val == this.vm.post.cnName) return Promise.resolve();

        let vm = this.vm;
        return vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_ISINVOICEEXISTS, {bussinessData:{invoiceCode: val, id: vm.post.bussinessData.id}}).then((response)=>{
            response = response.json();
          if(response.status == 0){
            if(response.result.isInvoiceExists) return Promise.reject('重名')
            else return Promise.resolve();
          }else {
            return Promise.reject(response.message)
          }
        })
      }
    },
    watch: {
      //根据付款用途获取报销科目
      'post.bussinessData.typeCode': function (val){
        let urg = this.PurposeList.find((item) => item.typeCode === val);
        if(!urg) return;
        this.paymentCategoryDisplay = urg.paymentCategoryDisplay;
      },
      //判断是否借款
      'post.bussinessData.expenseLoanValue': {
        deep:false,
        handler:function(val){
          let vm = this;
          if(val == 1){
            //判断是否有借款数据，如果有借款数据在默认加载情况则不出现借款表单
            if(!this.loanTime && !this.loanAmount && !this.repaymentDate){
              vm.locnmodule = true;
            }
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_PAGELIST,{bussinessData:{pageSize:'5',pageNo:'1',userId:vm.userId}}).then(function (response) {
              let Data = response.json().result;
              if(response.json().status){
                var page = {};
                page.data = Data.list;
                page.total = Data.count;
                page.pageNumber = Data.pageNo;
                vm.data = page;
              }
            })
          }else{
            this.loanTime = ''
            this.loanAmount = ''
            this.repaymentDate = ''
          }
        }
      },
      'post.bussinessData.urgencyDegreeId': function (val){
        let urg = this.emergencyList.find((item) => item.value === val);
        if(!urg) return;
        this.urgencyDegreeDisplay = urg.label;
      },
    },
    route: {
      canDeactivate: function (transition) {
        let vm = this;
        let hash = transition.to.path.match(/^\/\w+/);
        if(hash[0] != '/process') hash = '/process';
        else hash = '';
        if(vm.isCompleted) transition.next();
        vm.options = {
          title: '温馨提示',
          message: '您确定要离开当前页吗？',
          isShow: true
        };
        vm.confirm = {
          text: '确定',
          callback: function () {
            transition.next();
            vm.options.isShow = false;
          }
        };
        vm.close = {
          callback: function () {
            transition.next();
            vm.options.isShow = false;
          }
        };
        vm.cancel = {
          text: '取消',
          callback: function () {
            transition.abort();
            hash && vm.changeCurRoute(hash, true);
            vm.options.isShow = false;
          }
        }
      }
    },
    methods:{
      //初始化数据
      loadData: function(){
        var that = this;
        this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERBXSQ).then((response) => {
          let serial = response.json().result;
          that.post.bussinessData.id= serial.uuId,
          that.process.businessKey= serial.uuId,
          that.post.bussinessData.serialNo= serial.serialNumber
          that.process.businessCode= serial.serialNumber
          that.officeName= serial.officeName,
          that.post.bussinessData.projectTypeValue= serial.projectValue,
          that.post.bussinessData.judgeProject= serial.projectValue;
          if(!that.post.bussinessData.judgeProject)that.post.bussinessData.judgeProject ='10000'
          that.projectValue = serial.parentOfficeName
        });
      },
      //关联数据信息
      onloadinfo: function (obj) {
        var that = this;
        var params = {};
        params.id = obj;
        if(!params.id) return false;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETACCOUNTLOAN,{bussinessData:{id: params.id}}).then(function (response) {
          var Data = response.json().result;
          that.post.bussinessData.loanId = Data.id;
          that.loanTime = Data.loanTime;                                           //借款时间
          that.loanAmount = Data.loanAmount;                                       //借款金额
          that.repaymentDate = Data.repaymentDate;                                   //还款时间
          that.closed();
        })
      },
      inquire: function(page){
        var that = this;
        var page = page;
        this.$http.post(content.CONTENT_ROOT +  interfaces.INTERFACE_PAGELIST,{bussinessData:{userId:that.userId}}).then(function (response) {
          var Data = response.json().result;
          //判断是否入库
          if(response.json().status){
            var page = {};
            page.data = Data.list;
            page.total = Data.count;
            page.pageNumber = Data.pageNo;
            that.data = page;
          }
        })
      },
      _trim: function (str){
        return str.replace(/\s/g,"");
      },
      //查询
      quire: function(){
        var temp = this._trim(this.searchs.toWorkTime).split('~');
        var that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_PAGELIST,{bussinessData:{serialNo:this.searchs.serialNo,projectValue:this.searchs.projectValueDispay,startDate:temp[0],endDate:temp[1],pageSize:'5',userId:that.userId}}).then(function (response) {
          var Data = response.json().result;
          //判断是否入库
          if(response.json().status){
            var page = {};
            page.data = Data.list;
            page.total = Data.count;
            page.pageNumber = Data.pageNo;
            that.data = page;
          }
        })
      },
      closed : function(){
        let vm = this;
        console.log(this.loanAmount)
        if(this.loanAmount == ''){
          this.post.bussinessData.expenseLoanValue = 0
        }
        this.locnmodule = false;
      },
      locnmoduleclk : function () {
        this.locnmodule = true;
      },
      emergency: function(){
        var that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS,{type: 'urgency_degree'}).then(function (response) {
          var Data = response.json().result;
          that.emergencyList = Data;
        })
      },
      //初始付款用途数据
      Purpose: function(){
        var that = this;
        that.loginName = sessionStorage.getItem("loginName");
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDPROCESSCONFIGTYPELIST,{bussinessData:{code: 'BXSQ', loginName:that.loginName}}).then((response) => {
          let serial = response.json().result;
          that.PurposeList = serial
        });
      },
      //提交
      onSubmit: function (e) {
        // validate manually
        var self = this
        let userId = sessionStorage.getItem("loginName");
        this.$validate(true, function () {
          if (self.$validation.invalid) {
            e.preventDefault()
          }else{
            self._save(function(){
              e.target.disabled = true
              self.lookscreen.isShow = true;
              if(!self.businessKey){
                self.process.typeCode = self.post.bussinessData.typeCode;
                self.process.bussinessDataJsonStr= JSON.stringify({
                  amount:self.post.bussinessData.expenseAmount,
                  departmentCode: self.departmentCode,
                  urgencyDegreeId:self.post.bussinessData.urgencyDegreeId,
                  urgencyDegreeDisplay:self.urgencyDegreeDisplay,
                });
                self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_NEWSTARTPROCESS, self.process).then((response) => {
                  let status = response.json().status;
                  if(status == 0){
                    self._submitSuc();
                    e.target.disabled = false
                    self.lookscreen.isShow = false;
                  }else{
                    e.target.disabled = false
                    self.lookscreen.isShow = false;
                  }
                });
              }else{
                self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
                  'humanTaskId': self.humanTaskId,
                  'appros': true,
                  'userId' : userId
                }).then((response) => {
                  let status = response.json().status;
                if(status == 0){
                  self._submitSuc();
                  e.target.disabled = false
                  self.lookscreen.isShow = false;
                }else{
                  e.target.disabled = false
                  self.lookscreen.isShow = false;
                }
              })
              }
            })
          }
        })
      },
      addNumber: function () {
        this.numList.push({number:'',name: 'fpNumber',validate: {required: true,  existName: { rule: true, initial: 'off' }}});
        this.invNum++
      },
      dir: function (index) {
        this.invNum--
        this.numList.splice(index, 1);
      },
      save: function(e){
        let vm = this;
        vm._save(function () {
          vm.$validate(true, function () {
            if (vm.$validation.invalid) {
              e.preventDefault()
            }else{
              vm.options = {
                title: '温馨提示',
                message: '保存成功！',
                icon: 'success',
                isShow: true
              };
              vm.confirm = {
                text: '确定',
                callback: function () {
                  vm.options.isShow = false;
                }
              };
              vm.close = {
                callback: function () {
                  vm.options.isShow = false;
                }
              }
            }
          })
        })
      },
      _submitSuc: function () {
        let vm = this;
        vm.options = {
          title: '温馨提示',
          message: '流程提交成功！',
          icon: 'success',
          isShow: true
        };
        vm.confirm = {
          text: '确定',
          callback: function () {
            vm.isCompleted = true;
            vm.$router.go('/process/application');
            vm.options.isShow = false;
          }
        };
        vm.close = {
          callback: function () {
            vm.$router.go('/process/application');
            vm.options.isShow = false;
          }
        }
      },
      cancelProcess: function () {
        let vm = this;
        vm.options = {
          title: '温馨提示',
          message: '您确定要取消新建流程吗？',
          isShow: true
        };
        vm.confirm = {
          text: '确定',
          callback: function () {
            vm.isCompleted = true;
            vm.$router.go('/process/new');
            vm.options.isShow = false;
          }
        };
        vm.cancel = {
          text: '取消',
          callback: function () {
            vm.options.isShow = false;
          }
        };
        vm.close = {
          callback: function () {
            vm.options.isShow = false;
          }
        }
      },
      //提交接口
      _save: function(callback){
        //缓存账号金额账户名称等
        this.loginName =  sessionStorage.getItem("userId");
        localStorage.setItem(this.loginName, [this.post.bussinessData.accountName,this.post.bussinessData.accountNumber,this.post.bussinessData.bankBranch]);
        //把发票号码传入invoiceCode
        let vm = this;
        vm.departmentCode = vm.post.bussinessData.projectTypeValue
        if(vm.post.bussinessData.expenseLoanValue == 0){
          vm.post.bussinessData.actualExpenseAmount = vm.post.bussinessData.expenseAmount;
        }else{
          vm.post.bussinessData.actualExpenseAmount = vm.total;
        }
        this.oldList = this.oldList.concat(this.numList)
        this.oldList.unshift({number:this.firstNum})
        for(var i = 0;i<this.oldList.length;i++){
          this.newList.push(this.oldList[i].number);
        }
        this.post.bussinessData.invoiceCode = this.newList.join(',');
        this.newList = [];
        this.oldList = [];
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEEXPENSE,this.post).then(function (response) {
          let status = response.json().status;
          if(status == 0){
            callback();
          }
        })
      },
    }
  }
</script>
