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
  <crumb t-name="转正申请"></crumb>
  <!-- <section class="search_bar">
      <div class="search_area">
          <input type="text" placeholder="搜索" maxlength="20">
          <div class="search_icon"></div>
      </div>
  </section> -->
  <div class="records-container" :class="opened ? 'opened': ''">
  <!-- <div class="records-container" :class="'opened'"> -->
    <ul class="search_bar records-search">
      <li class="records-item clearfix">
        <div class="search_area">
          <input type="text" v-model="search.searchName" placeholder="搜索" v-on:change="getOfficeList()" @keyup.enter="changeSearch()">
          <div class="search_icon" @click.stop="changeSearch()" ></div>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">转正人部门</span>
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
</template>

<script>
import Crumb from '../../components/public/PublicCrumb.vue'
import PublicTable from '../../components/public/PublicTable.vue'
import PublicCalendar from '../../components/public/PublicCalendar'
import { getProcessCode } from '../../vuex/index/getters'
import * as content from '../../constants/contentTypes';
import * as interfaces from '../../constants/interfaceTypes';
export default{
  vuex: {
    getters: {
      processCode: getProcessCode
    }
  },
  components: {
    PublicCalendar,
    Crumb,
    PublicTable
  },
  data: function() {
    return {
      opened: true,
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
                    return '<a class="btn-link" href="#!/hr/PosiList/AppPositive/' + obj.id + '/'+obj.flowId+'/0/0">' + value + '</a>'
                }
            },
            {
                name: 'serialNo',
                text: '编号'
            },
            {
                name: 'officeName',
                text: '招聘部门名称'
            },
            {
                name: 'positionsDisplay',
                text: '	职位名称'
            },
            {
                name: 'formalTime',
                text: '计划转正时间'
            },
            {
                name: 'realTime',
                text: '实际转正时间'
            },
//           {
//             name: 'workplaceIdLabel',
//             text: '入职地点'
//           },
//          {
//            name: '',
//            text: '操作',
//            formatter: function(value,obj){
//              return '<button type="button" class="btn btn-default btn-xs">归档</button><button type="button" class="btn btn-default btn-xs">暂停</button><button type="button" class="btn btn-default btn-xs">删除</button>';
//            }
//          }
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
      data: {
          data: undefined,
          total: 0,
          pageNumber: 1
      },
      // 请求后台的接口地址
      apiUrl: '/a/employee/employeeApply/completedList',
      page:{
        /* 请求后台传入分页的参数 */
        "pageSize":"10",
        "pageNo":"1",
      }
    }
  },
  computed: {},
  watch: {
    'calendar.value': function (val) {
      if(val){
        let date = val.match(/[\w+\-]+/g);
        if(date){
          this.search.startDate = date[0];
          this.search.endDate = date[1]
        }
      }
      this.loadData()
    }
  },
  ready: function() {
    this.getOfficeList()
    this.getStatusList()
    this._loadData(this.page);

  },
  methods: {
    _loadData: function (pages) {
      let vm = this;
      vm.search.pageNo = pages.pageNo;
      vm.search.pageSize = pages.pageSize;
      this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_COMPLETEDLISTPOS,pages).then((response) => {
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
      vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_COMPLETEDLISTPOS, vm.search).then((response) => {
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
          this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETOFFICELISTPOSLIST,{}).then((response) => {
            let responseData = response.json().result;
            vm.optional.office = responseData
          });
        },
    getStatusList: function () {
          let vm = this;
          this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETFLOWSTATUSLISTPOSLIST,{}).then((response) => {
            let responseData = response.json().result;
            vm.optional.flowStatus = responseData
          });
        }
  }
};
</script>
