<<style lang="less">
  .records-container{
    position: relative;
    margin-bottom: 34px;
  .search-more{
    position: absolute;
    height: 28px;
    line-height: 26px;
    font-size: 12px;
    border: 1px solid #ddd;
    border-top-color: #fff;
    padding: 0 10px;
    background-image: none;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    bottom: -26px;
    left: 50%;
    transform: translateX(-50%);
  &:before{
     content: '展开更多选项';
   }
  &:after{
     content: '';
     display: inline-block;
     border: 4px solid transparent;
     border-top-color: #333;
     margin-left: 5px;
     transform: translateY(2px);
   }
  &:hover{
     color: #1f72be;
  &:after{
     border-top-color: #1f72be;
   }
  }
  }
  &.opened{
  .records-search {
    height: auto;
    overflow: visible;
  }
  .search-more{
  &:before{
     content: '收起更多选项';
   }
  &:after{
     border-top-color: transparent;
     border-bottom-color: #333;
     transform: translateY(-2px);
   }
  &:hover:after{
     border-bottom-color: #1f72be;
   }
  }
  }
  .records-search{
    background-color: #fff;
    border-top: none;
    overflow: hidden;
    margin-bottom: 10px;
  .search_area{
    margin-bottom: 5px;
  }
  .records-item{
    border-bottom: 1px solid #ddd;
  .item-title{
    float: left;
    color: #888;
    width: 120px;
    padding: 6px 12px;
    font-size: 14px;
  }
  .item-cont{
    display: table-cell;
    position: relative;
  .btn-link{
    text-decoration: none !important;
    outline: none !important;
  &.selected{
     color: #5cb85c;
   }
  }
  }
  .form-control{
    border-radius: 4px;
    margin-bottom: 4px;
    margin-left:11px;
    height: 32px;
    text-indent: 0;
  &:focus {
     border-color: #66afe9;
     outline: 0;
     -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
     box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
   }
  }
  .tablestitle label{
    padding: 5px;
  }
  .tablestitle input{
    width: 15px;
    height: 15px;
    border: none;
  }
  .tablestitle span{
    vertical-align: 2px;
    font-size: 14px;
    font-weight: normal;
    color: #337ab7;
    cursor: pointer;
  }
  }
  }
  }
</style>
<template lang="html">
  <crumb t-name="报销申请"></crumb>
  <div class="records-container" :class="opened ? 'opened': ''">
    <ul class="search_bar records-search">
      <li class="records-item clearfix">
        <div class="search_area">
          <input type="text" v-model="search.searchName" placeholder="搜索" v-on:change="getOfficeList()" @keyup.enter="changeSearch()">
          <div class="search_icon" @click.stop="changeSearch()" ></div>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">所属项目</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.projectTypeValue? '' : 'selected'" @click="changeSearch('projectTypeValue', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.projects"
                  :class="search.projectTypeValue == item.projectValue ? 'selected' : ''"
                  @click="changeSearch('projectTypeValue', item.projectValue)">{{item.projectValueDispay}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">报销类型</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.typeCode? '' : 'selected'" @click="changeSearch('typeCode', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.typeCode"
                  :class="search.typeCode == item.typeCode ? 'selected' : ''"
                  @click="changeSearch('typeCode', item.typeCode)">{{item.typeName}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">流程状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.flowStatus? '' : 'selected'" @click="changeSearch('flowStatus', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.flowStatus"
                  :class="search.flowStatus == item.flowStatus ? 'selected' : ''"
                  @click="changeSearch('flowStatus', item.flowStatus)">{{item.flowStatusDisplay}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">申请部门</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.applyOfficeId? '' : 'selected'" @click="changeSearch('applyOfficeId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.office"
                  :class="search.applyOfficeId == item.applyOfficeId ? 'selected' : ''"
                  @click="changeSearch('applyOfficeId', item.applyOfficeId)">{{item.applyOfficeName}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">申请日期</span>
        <div class="item-cont">
          {{search.value}}
          <div class="col-sm-6">
            <input type="text" class="form-control input-calendar" v-model="search.startDate" @click.stop="calendar.show = true">
            <Public-Calendar
              :value.sync="search.startDate"
              :show.sync="calendar.show"
              :x="calendar.x"
              :y="calendar.y"
              :sep.sync="calendar.sep"></Public-Calendar>
          </div>
          <div class="col-sm-6">
            <input type="text" class="form-control input-calendar" v-model="search.endDate" @click.stop="calendar2.show = true">
            <Public-Calendar
              :value.sync="search.endDate"
              :show.sync="calendar2.show"
              :x="calendar2.x"
              :y="calendar2.y"
              :sep.sync="calendar2.sep"></Public-Calendar>
          </div>
        </div>
      </li>
    </ul>
    <button class="search-more" @click="opened = !opened"></button>
  </div>

  <div class="form-group clearfix g-tc">
    <form id="formid" method = 'post' action = '/a/account/accountExpense/exportExpense' style="margin-top: 10px;">
      <input type="hidden" value="{{search.flowStatus}}" name = "flowStatus"/>
      <input type="hidden" value="{{search.typeCode}}" name = "typeCode"/>
      <input type="hidden" value="{{search.projectValueDispay}}" name = "projectTypeValue" />
      <input type="hidden" value="{{search.applyOfficeId}}" name = "applyOfficeId" />
      <input type="hidden" value="{{search.startDate}}" name = "startDate" />
      <input type="hidden" value="{{search.endDate}}" name = "endDate" />
      <button type="submit" class="btn btn-primary g-marginR30 g-fr" >导出列表</button>
    </form>
  </div>
  <div style="overflow-x: scroll">
    <public-table :config="params" :data="data"></public-table>
  </div>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>

</template>

<script>
  import Crumb from '../../../components/public/PublicCrumb.vue'
  import PublicTable from '../../../components/public/PublicTable.vue'
  import PublicModal from '../../../components/public/PublicModal';
  import PublicCalendar from '../../../components/public/PublicCalendar'
  import * as content from '../../../constants/contentTypes';
  import * as interfaces from '../../../constants/interfaceTypes';
  import * as type from '../../../constants/globalSelectTypes'
  import ToolSelection from '../../../components/public/ToolSelection.vue'
  export default{
    components: {
      Crumb,
      PublicTable,
      PublicCalendar,
      PublicModal,
      ToolSelection
    },
    data: function () {
      return {
        opened:true,
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        //后台获取的选项占位符
        optional:{
          office:{},    //部门相关
          projects:{},    //所属项目
          typeCode:{},    //报销类型
          flowStatus: {}          // 审批状态相关
        },
        type: [
          type.PROJECT_TYPE,
        ],
        searchTime:'',
        params: {
          className: 'table table-striped table-hover table-bordered',
          pageSize: 10,
          pageList: [10, 20, 30, 40, 50],
          pagination: true,
          sequence: false,
          fields: [
            {
              name: 'title',
              text: '标题',
              formatter: function (value, obj) {
                return '<a class="btn-link" href="#!/finance/reimbList/AppRemburse/' + obj.id + '/'+obj.flowId+'/0/0">' + value + '</a>'
              }
            },
            {
              name: 'serialNo',
              text: '编号'
            },
            {
              name: 'typeName',
              text: '报销类型'
            },
            {
              name: 'applyOfficeName',
              text: '申请部门'
            },
            {
              name: 'createByName',
              text: '申请人'
            },
            {
              name: 'flowStatusDisplay',
              text: '当前状态'
            },
            {
              name: 'expenseAmount',
              text: '应付金额'
            },
            {
              name: 'actualExpenseAmount',
              text: '实际应付金额'
            },
            {
              name: 'paymentTime',
              text: '收付款时间'
            },
            {
              name: '',
              text: '操作',
              operates: [
                {
                  text: '打印',
                  className: 'btn btn-default btn-xs g-marginL10',
                  handler: function (obj) {
                    let id = {'id':obj.id}
                    let flowId = obj.flowId;
                    this.queryEmployee(id,flowId)
                  },
                  isShow: function (obj) {
                    if(obj.flowStatus == 2){
                      return true;
                    }else{
                      return false;
                    }
                  },
                }
              ]
            }
          ],
          callback: function (arg) {
            let vm = this;
            vm.search.pageSize = arg.pageSize;
            vm.search.pageNo = arg.pageNumber;
            vm.loadData();
          }
        },
        data: {
          data: undefined,
          total: 0,
          pageNumber: 1
        },
        page: {
          /* 请求后台传入分页的参数 */
          "pageSize": "10",
          "pageNo": "1",
        },
        search: {
          pageNo: '1',
          pageSize: '10',
          flowStatus:'',
          typeCode:'',
          projectTypeValue:'',
          applyOfficeId:'',
          startDate:'',
          endDate:'',
        },
        calendar: {
          show: false,
          x: 13,
          y: 40,
          sep: '-',
        },
        calendar2: {
          show: false,
          x: 13,
          y: 40,
          sep: '-',
        },

      }
    },
    ready: function () {
      this._loadData(this.page);
      this.statusList()
      this.officeList()
      this.typeList()
      this.getProjectList()
    },
    computed: {},
    watch: {
      'search.startDate': function() {
        this.loadData()
      },
      'search.endDate': function() {
        this.loadData()
      }
    },
    methods: {
        queryEmployee:function (id,flowId) {
            let vm = this;
            let getUrl = content.STAROFFICE_ACT + interfaces.INTERFACE_GETHISTORYNAME+'?processInstanceId='+flowId;
            vm.$http.get(getUrl).then((aprRes)=>{
              vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSE, {'bussinessData':id}).then((response)=>{
                  let responseData = JSON.parse(response.data);
                  responseData = responseData.result
                  let pageName = 'remburse.html';
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
                      '&aprRes='+aprRes.body+
                      '&bankBranch='+responseData.bankBranch;
                  url = encodeURI(encodeURI(url))
                  // console.log(url)
                  window.open(url);
              });
            })

        },
      updateType: function (params, callback) {
        let vm = this;
        vm.options = {
          title: '温馨提示',
          message: '你确认要操作吗？',
          isShow: true
        };
        vm.confirm = {
          text: '确定',
          callback: function () {
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_UPDATEOPERATIONTYPE, params).then((response)=>{
            })
            callback();
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
      _loadData: function (pages) {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSELIST, {bussinessData:pages}).then((response)=>{
          let responseData = response.json().result;
          let page = {};
          page.data = responseData.list;
          page.total = responseData.count;
          page.pageNumber = responseData.pageNo;
          vm.data = page;
          if(page.data.length == 0) vm.opened =false;
        });
      },
      loadData(){
        let vm = this;
        vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEXPENSELIST, {bussinessData:vm.search}).then((response) => {
          let responseData = response.json().result;
          let page = {};
          page.data = responseData.list;
          page.total = responseData.count;
          page.pageNumber = responseData.pageNo;
          vm.data = page;
        })
      },
      changeSearch(key, value) {
        key && (this.search[key] = value);
        this.loadData()
      },
      getProjectList: function () {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETPROJECTLISTLOANLIST,{}).then((response) => {
          let responseData = response.json().result;
          vm.optional.projects = responseData
      });
      },
      //部门
      officeList: function () {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOFFICELISTINEXPENSELIST,{bussinessData:{}}).then((response) => {
          let responseData = response.json().result;
          vm.optional.office = responseData
        });
      },
      //状态
      statusList: function () {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDSTATUSLISTINEXPENSELIST,{bussinessData:{}}).then((response) => {
          let responseData = response.json().result;
          vm.optional.flowStatus = responseData
        });
      },
      //类型
      typeList: function () {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDTYPECODELISTINEXPENSELIST,{bussinessData:{}}).then((response) => {
          let responseData = response.json().result;
          vm.optional.typeCode = responseData
        });
      },
      _trim: function (str){
        return str.replace(/\s/g,"");
      },
    }
  };
</script>
