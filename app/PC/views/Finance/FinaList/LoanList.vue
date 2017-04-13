<style lang="less">
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
        .item-to{
          text-align:center;
          float: left;
          color: #888;
          width: 50px;
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
<template lang="html" charset="utf-8">
    <crumb t-name="借款申请"></crumb>
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
          <button class="btn btn-link selected"  :class="search.projectValue? '' : 'selected'" @click="changeSearch('projectValue', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.projects"
                  :class="search.projectValue == item.projectValue ? 'selected' : ''"
                  @click="changeSearch('projectValue', item.projectValue)">{{item.projectValueDispay}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">报销状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.reverseStatusValue? '' : 'selected'" @click="changeSearch('reverseStatusValue', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.flows"
                  :class="search.reverseStatusValue == item.reverseStatusValue ? 'selected' : ''"
                  @click="changeSearch('reverseStatusValue', item.reverseStatusValue)">{{item.reverseStatusDispay}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">流程状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.flowStatus? '' : 'selected'" @click="changeSearch('flowStatus', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.flowStatus"
                  :class="search.flowStatus == item.flowStatus ? 'selected' : ''"
                  @click="changeSearch('flowStatus', item.flowStatus)">{{item.flowStatusDispay}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">申请部门</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.officeId? '' : 'selected'" @click="changeSearch('officeId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.office"
                  :class="search.officeId == item.officeId ? 'selected' : ''"
                  @click="changeSearch('officeId', item.officeId)">{{item.officeName}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">申请日期</span>
        <div class="item-cont">
          {{search.value}}
          <div class="col-sm-6">
            <input type="text" class="form-control input-calendar" v-model="search.startDate" @click.stop="calendar.show = true" placeholder='开始日期'>
            <Public-Calendar
              :value.sync="search.startDate"
              :show.sync="calendar.show"
              :x="calendar.x"
              :y="calendar.y"
              :sep.sync="calendar.sep"></Public-Calendar>
          </div>
          <!-- <div class="item-to">到</div> -->
          <div class="col-sm-6">
            <input type="text" class="form-control input-calendar" v-model="search.endDate" @click.stop="calendar2.show = true"placeholder='结束日期'>
            <Public-Calendar
              :value.sync="search.endDate"
              :show.sync="calendar2.show"
              :x="calendar2.x"
              :y="calendar2.y"
              :sep.sync="calendar2.sep"></Public-Calendar>
          </div>
        </div>
      </li>
    <div class="form-group clearfix" style='margin-top:10px;'>
        <button type="button" class="btn btn-primary g-marxginR30 g-fr" @click="exportExl">导出报表</button>
    </div>
    </ul>

    <button class="search-more" @click="opened = !opened"></button>

  </div>
    <public-table :config="params" :data="data"></public-table>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
    import Crumb from '../../../components/public/PublicCrumb.vue'
    import PublicTable from '../../../components/public/PublicTable.vue'
    import { getProcessCode } from '../../../vuex/index/getters'
    import PublicModal from '../../../components/public/PublicModal';
    import PublicCalendar from '../../../components/public/PublicCalendar'
    import * as content from '../../../constants/contentTypes';
    import * as interfaces from '../../../constants/interfaceTypes';
    export default{
        vuex: {
            getters: {
                processCode: getProcessCode
            }
        },
        components: {
            Crumb,
            PublicTable,
            PublicCalendar,
            PublicModal
        },
        data: function () {
            return {
                opened: true,
                status: {
                    'START': 0,
                    'FINISH': 1,
                    'DELETE': 2,
                    'PAUSE': 3
                },
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
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
                                return '<a class="btn-link" href="#!/finance/loanList/appLoan/' + obj.id + '/'+obj.flowId+'/0/0">' + value + '</a>'
                            }
                        },
                        {
                            name: 'serialNo',
                            text: '编号'
                        },
                        {
                            name: 'officeName',
                            text: '申请部门'
                        },
                        {
                            name: 'officeName',
                            text: '申请人'
                        },
                        {
                            name: 'reverseStatusDispay',
                            text: '冲账状态'
                        },
                        {
                            name: 'reverseAmount',
                            text: '冲账金额'
                        },
                        {
                            name: 'loanAmount',
                            text: '借款金额'
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
                    "pageNo": "1"
                },
              search: {
                pageNo: '1',
                pageSize: '10',
                officeId: '',     // 部门ID
                flowStatus: '',               // 审批状态
                projectValue: '',               // 所属项目
                reverseStatusValue: '',               // 报销状态
                startDate: '',
                endDate: '',
                searchName: ''
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
              //后台获取的选项占位符
              optional:{
                office:{},    //部门相关
                projects:{},    //所属项目
                flows:{},    //报销状态
                flowStatus: {}          // 审批状态相关
              }
            }
        },

        computed: {},
          watch: {
            /*'calendar.value': function(val) {
              if (val) {
                let date = val.match(/[\w+\-]+/g);
                if (date) {
                  this.search.startDate = date[0];
                  this.search.endDate = date[1]
                }
              }
              this.loadData()
            }*/
            'search.startDate': function() {
              this.loadData()
            },
            'search.endDate': function() {
              this.loadData()
            }
          },
        ready: function () {
            this.getOfficeList()
            this.getStatusList()
            this.getProjectList()
            this.getReverseList()
            this._loadData(this.page);
        },
        methods: {
            queryEmployee:function (id,flowId) {
                let vm = this;
                let getUrl = content.STAROFFICE_ACT + interfaces.INTERFACE_GETHISTORYNAME+'?processInstanceId='+flowId;

                vm.$http.get(getUrl).then((aprRes)=>{
                  vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETACCOUNTLOAN, {'bussinessData':id}).then((response)=>{
                      let responseData = JSON.parse(response.data);
                      responseData = responseData.result
                      let pageName = 'loan.html';
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
                          '&aprRes='+aprRes.body+
                          '&bankBranch='+responseData.bankBranch;
                      url = encodeURI(encodeURI(url))
                      // console.log(url)
                      window.open(url);
                  });
                })

            },
            exportExl:function () {
              let vm = this;
              let pageName = content.CONTENT_ROOT + interfaces.INTERFACE_LOANEXPORTTOEXCEL,url = '';
                    url = pageName+
                        '?startDate='+(vm.search.startDate?vm.search.startDate:'')+
                        '&endDate='+(vm.search.endDate?vm.search.endDate:'')+
                        '&flowStatus='+(vm.search.flowStatus?vm.search.flowStatus:'')+
                        '&projectValue='+(vm.search.projectValue?vm.search.projectValue:'')+
                        '&officeId='+(vm.search.officeId?vm.search.officeId:'')+
                        '&reverseStatusValue='+(vm.search.reverseStatusValue?vm.search.reverseStatusValue:'');
                    url = encodeURI(encodeURI(url))
                    window.open(url);
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
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_ACCOUNTLOANPAGELIST, {'bussinessData':pages}).then((response)=>{
                    let responseData = response.json().result;
                    let page = {};
                    page.data = responseData.list;
                    page.total = responseData.count;
                    page.pageNumber = responseData.pageNo;
                    vm.data = page;
                    if(page.data.length == 0) vm.opened =false;
                });
            },
            changeSearch(key, value) {
              key && (this.search[key] = value);
              this.loadData()
            },
            loadData(){
              let vm = this;
              vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_ACCOUNTLOANPAGELIST, {'bussinessData':vm.search}).then((response) => {
                let responseData = response.json().result;
                let page = {};
                page.data = responseData.list;
                page.total = responseData.count;
                page.pageNumber = responseData.pageNo;
                vm.data = page;
              })
            },
            getOfficeList: function () {
                  let vm = this;
                  this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETOFFICELISTLOANLIST,{}).then((response) => {
                    let responseData = response.json().result;
                    vm.optional.office = responseData
                  });
                },
            getStatusList: function () {
                  let vm = this;
                  this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETFLOWSTATUSLISTLOANLIST,{}).then((response) => {
                    let responseData = response.json().result;
                    vm.optional.flowStatus = responseData
                  });
                },
            getProjectList: function () {
                  let vm = this;
                  this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETPROJECTLISTLOANLIST,{}).then((response) => {
                    let responseData = response.json().result;
                    vm.optional.projects = responseData
                  });
                },
            getReverseList: function () {
                  let vm = this;
                  this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETREVERSELISTLOANLIST,{}).then((response) => {
                    let responseData = response.json().result;
                    vm.optional.flows = responseData
                  });
                }
        }
    };
</script>
