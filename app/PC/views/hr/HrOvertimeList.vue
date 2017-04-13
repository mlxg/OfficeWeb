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
    <crumb t-name="加班餐补"></crumb>
  <div class="records-container" :class="opened ? 'opened': ''">
    <ul class="search_bar records-search">
      <li class="records-item clearfix">
        <div class="search_area">
          <input type="text" v-model="search.searchName" placeholder="搜索" @keyup.enter="changeSearch()">
          <div class="search_icon" @click.stop="changeSearch()" ></div>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">申请部门</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.applyOfficeId ? '' : 'selected'" @click="changeSearch('applyOfficeId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.office"
                  :class="search.applyOfficeId == item.applyOfficeId ? 'selected' : ''"
                  @click="changeSearch('applyOfficeId', item.applyOfficeId)">{{item.applyOfficeName}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">加班类型</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.overtimeSubsidyType ? '' : 'selected'" @click="changeSearch('overtimeSubsidyType', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.index"
                  :class="search.overtimeSubsidyType == item.index ? 'selected' : ''"
                  @click="changeSearch('overtimeSubsidyType', item.index)">{{item.overtimeType}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">审批状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.flowStatus? '' : 'selected'" @click="changeSearch('flowStatus', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.flowStatus"
                  :class="search.flowStatus == item.flowStatus ? 'selected' : ''"
                  @click="changeSearch('flowStatus', item.flowStatus)">{{item.flowStatusDisplay}}</button>
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
  <div class="form-group clearfix g-tc">
    <button type="submit" class="btn btn-primary g-marginR30 g-fr" @click="excal">导出列表</button>
  </div>
  <div class="mask1" v-show="overtimeShow">
    <div class="mask-align"></div>
    <div class="notice-panel"  style="width: 400px">
      <div class="notice-title">
        <div class="exit" @click="exits"></div>
        <h1>输入日期导出列表</h1>
      </div>
      <form method = 'post' action = '/a/employee/overtime/exportOvertime' style="margin-top: 10px;">
      <div class="notice-content">
        <label class="control-label col-sm-2">年份</label>
        <div class="control-label col-sm-4">
          <select class="form-control" name="year">
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option selected = "selected">2017</option>
            <option>2018</option>
            <option>2019</option>
            <option>2020</option>
            <option>2021</option>
          </select>
        </div>
        <label class="control-label  col-sm-2">月份</label>
        <div class="control-label col-sm-4">
          <select class="form-control" name="month">
            <option selected = "selected">1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
          </select>
        </div>
      </div>
      <div class="notice-content">
        <button type="submit" @click="exits" class="btn btn-primary g-tc" style="margin: 0 auto">导出列表</button>
      </div>
      </form>
    </div>
  </div>
  <public-table :config="params" :data="data"></public-table>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue'
    import PublicTable from '../../components/public/PublicTable.vue'
    import { getProcessCode } from '../../vuex/index/getters'
    import PublicModal from '../../components/public/PublicModal';
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
        data: function () {
            return {
                opened: true,
                overtimeShow: false,
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
                          return '<a class="btn-link" href="#!/hr/OvertimeList/AppOvertime/' + obj.id + '/' + obj.flowId + '/0/0">' + value + '</a>'
                        }
                      },
                      {
                        name: 'serialNo',
                        text: '编号'
                      },
                      {
                        name: 'flowStatusDisplay',
                        text: '流程类型'
                      },
                      {
                        name: 'overtimeType',
                        text: '加班类型'
                      },
                      {
                        name: 'applyOfficeName',
                        text: '申请部门'
                      },
                      {
                        name: 'timeAmount',
                        text: '合计小时'
                      },
                      {
                        name: 'overtimeHours',
                        text: '加班时数'
                      },
                      {
                        name: 'paymentHours',
                        text: '计薪时数'
                      },
                      {
                        name: 'lunchAmount',
                        text: '午餐餐补天数'
                      },
                      {
                        name: 'dinnerAmount',
                        text: '晚餐餐补天数'
                      },

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
                    "pageSize": "10",
                    "pageNo": "1",
                },
              search: {
                    pageNo: '1',
                    pageSize: '10',
                    applyOfficeId:'',
                    overtimeSubsidyType:'',
                    flowStatus:''
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
                index:{},
                flowStatus: {}           // 审批状态相关
              }
            }
        },

        computed: {},
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
        ready: function () {
            this.getOfficeList()
            this.getStatusList()
            this.getSubsidyList()
            this._loadData(this.page);
        },
        methods: {
          excal: function () {
            this.overtimeShow = true
          },
          exits: function () {
            this.overtimeShow = false
          },
          _loadData: function (pages) {
              let vm = this;
              this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOVERTIMELIST, {bussinessData:pages}).then((response)=>{
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
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOVERTIMELIST, {bussinessData:vm.search}).then((response) => {
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
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOFFICELISTINOVERLIST,{}).then((response) => {
              let responseData = response.json().result;
              vm.optional.office = responseData
            });
          },
          getSubsidyList: function () {
            let vm = this;
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETALLOVERTIMESUBSIDYTYOELIST,{}).then((response) => {
              let responseData = response.json().result;
              vm.optional.index = responseData
            });
          },
          getStatusList: function () {
            let vm = this;
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_FINDSTATUSLISTINOVERTIMELIST,{}).then((response) => {
              let responseData = response.json().result;
              vm.optional.flowStatus = responseData
            });
          }
        }
    };
</script>
