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
  <crumb t-name="招聘需求"></crumb>
  <div class="records-container" :class="opened ? 'opened': ''">
    <ul class="search_bar records-search">
      <li class="records-item clearfix">
        <div class="search_area">
          <input type="text" v-model="search.searchName" placeholder="搜索" @keyup.enter="changeSearch()">
          <div class="search_icon" @click.stop="changeSearch()" ></div>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">招聘部门</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.officeId? '' : 'selected'" @click="changeSearch('officeId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.office"
                  :class="search.officeId == item.officeId ? 'selected' : ''"
                  @click="changeSearch('officeId', item.officeId)">{{item.officeName}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">审批状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.flowStatus? '' : 'selected'" @click="changeSearch('flowStatus', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.flowStatus"
                  :class="search.flowStatus == item.flowStatus ? 'selected' : ''"
                  @click="changeSearch('flowStatus', item.flowStatus)">{{item.flowStatusDispay}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">创建时间段</span>
        <div class="item-cont">
          {{search.value}}
          <input class="form-control input-calendar" v-model="calendar.value" @click.stop="calendar.show = true" placeholder="创建时间范围" readonly>
          <Public-Calendar
            :value.sync="calendar.value"
            :show.sync="calendar.show"
            :range="calendar.range"
            :x="calendar.x"
            :y="calendar.y"
            :sep.sync="calendar.sep"></Public-Calendar>
        </div>
      </li>
    </ul>
    <button class="search-more" @click="opened = !opened"></button>
  </div>
  <public-table :config="params" :data="data"></public-table>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
import Crumb from '../../components/public/PublicCrumb.vue'
import PublicTable from '../../components/public/PublicTable.vue'
import { getProcessCode } from '../../vuex/index/getters'
import PublicModal from '../../components/public/PublicModal'
import PublicCalendar from '../../components/public/PublicCalendar'
import * as content from '../../constants/contentTypes';
import * as interfaces from '../../constants/interfaceTypes';
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
  data: function() {
    return {
      opened: true,
      status: {
        'START': 0,
        'FINISH': 1,
        'DELETE': 2,
        'PAUSE': 3
      },
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
            formatter: function(value,obj){
                return '<a class="btn-link" href="#!/hr/demand/procMyJob/' +  obj.id + '/'+obj.flowId+'/0/0">'+value+'</a>'
            }
          },
          {
            name: 'serialNo',
            text: '编号'
          },
          {
            name: 'positionNameDisplay',
            text: '职位名称'
          },
          {
            name: 'depNumber',
            text: '定编人数'
          },
          {
            name: 'depNowNumber',
            text: '现有人数'
          },
          {
            name: 'requireNum',
            text: '招聘人数'
          },
           {
             name: 'waitEntry',
             text: '录用人数'
           },
           {
             name: 'alreadyEntry',
             text: '已入职人数'
           }/*,
          {
            name: 'operate',
            text: '操作',
            operates: [
               {
                 text: '删除',
                 className: 'btn btn-default btn-xs g-marginL10',
                 handler: function(obj) {
                   let vm = this;
                   let len = vm.data.data.length;
                   let num = vm.data.pageNumber;

                   if(len == 1) num = num -1
                   if(num < 1) num = 1;

                   if(vm.data)
                   vm.updateType({
                     id: obj.id,
                     status: 2
                   }, function () {
                     vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_PROCESSDELETE,{businessKey:obj.id}).then((response) => {
                       let status = response.json().status;
                       if(status == '0'){
                         obj.status = 2
                         vm.search.pageSize = vm.params.pageSize;
                         vm.search.pageNo = num;
                         vm.loadData();
                       }
                     })
                   })
                 }
               }
            ]
          }*/
        ],
        callback: function(arg){
            let vm = this;
            vm.search.pageSize = arg.pageSize;
            vm.search.pageNo = arg.pageNumber;
            vm.loadData();
        }
      },
      search: {
        pageNo: '1',
        pageSize: '10',
        officeId: '',     // 部门ID
        flowStatus: '',               // 审批状态
        startDate: '',
        endDate: '',
        searchName: ''
      },
      data: {
          data: undefined,
          total: 0,
          pageNumber: 1
      },
      page:{
        "pageSize":"10",
        "pageNo":"1"
      },
      calendar: {
        value: '',
        show: false,
        x: 11,
        y: 40,
        sep: '-',
        range: true
      },
      //后台获取的选项占位符
      optional:{
        office:{},    //部门相关
        flowStatus: [
          {
            key: '2',
            value: '已完成'
          },
          {
            key: '1',
            value: '审批中'
          },
          {
            key: '6',
            value: '未办理'
          }
        ]           // 审批状态相关
      },

      options: undefined,
      confirm: undefined,
      cancel: undefined,
      close: undefined
    }
  },
  watch: {
    'calendar.value': function(val) {
      if (val) {
        let date = val.match(/[\w+\-]+/g);
        if (date) {
          this.search.startDate = date[0];
          this.search.endDate = date[1]
        }
      }
      this.loadData()
    }
  },
  computed: {},
  ready() {
    this.getOfficeList()
    this.getStatusList()
    this._loadData(this.page);
  },
  attached() {},
  methods: {
    updateType: function (params, callback) {
      let vm = this;
      vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_UPDATEOPERATIONTYPE, params).then((response) => {
        let status = response.json().status;
        if(status == 0){
          vm.options = {
            title: '温馨提示',
            message: '你确认要删除吗？',
            isShow: true
          };
          vm.confirm = {
            text: '确定',
            callback: function () {
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
        }
      })
    },
    _loadData: function (pages) {
      let vm = this;
      this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_COMPLETEDLIST,pages).then((response) => {
        let responseData = response.json().result;
        let page = {};
        page.data = responseData.list;
        page.total = responseData.count;
        page.pageNumber = responseData.pageNo;
        page.pageSize = responseData.pageSize;
        vm.data = page;
        if(page.data.length == 0) vm.opened =false;
      })
    },
    changeSearch(key, value) {
      key && (this.search[key] = value);
      this.loadData()
    },
    loadData(){
      let vm = this;
      vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_COMPLETEDLIST, vm.search).then((response) => {
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
          this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOFFICELISTDEMAND,{}).then((response) => {
            let responseData = response.json().result;
            vm.optional.office = responseData
          });
        },
    getStatusList: function () {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETFLOWSTATUSLISTDEMAND,{}).then((response) => {
          let responseData = response.json().result;
          vm.optional.flowStatus = responseData
        });
      }
  }
};
</script>
