<style lang="less">
  .m-conter ul li .ivu-date-picker span {
    margin: 10px 12px;
  }

  .records-container {
    position: relative;
    margin-bottom: 34px;

  .search-more {
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

  &
  :before {
    content: '展开更多选项';
  }

  &
  :after {
    content: '';
    display: inline-block;
    border: 4px solid transparent;
    border-top-color: #333;
    margin-left: 5px;
    transform: translateY(2px);
  }

  &
  :hover {
    color: #1f72be;

  &
  :after {
    border-top-color: #1f72be;
  }

  }
  }
  &
  .opened {

  .records-search {
    height: auto;
    overflow: visible;
  }

  .search-more {

  &
  :before {
    content: '收起更多选项';
  }

  &
  :after {
    border-top-color: transparent;
    border-bottom-color: #333;
    transform: translateY(-2px);
  }

  &
  :hover:after {
    border-bottom-color: #1f72be;
  }

  }
  }
  .records-search {
    background-color: #fff;
    border-top: none;
    overflow: hidden;
    margin-bottom: 10px;

  .search_area {
    margin-bottom: 5px;
  }

  .records-item {
    border-bottom: 1px solid #ddd;

  .item-title {
    float: left;
    color: #888;
    width: 120px;
    padding: 6px 12px;
    font-size: 14px;
  }

  .item-cont {
    display: table-cell;
    position: relative;

  .btn-link {
    text-decoration: none !important;
    outline: none !important;

  &
  .selected {
    color: #5cb85c;
  }

  }
  }
  .form-control {
    border-radius: 4px;
    margin-bottom: 4px;
    margin-left: 11px;
    height: 32px;
    text-indent: 0;

  &
  :focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
  }

  }
  .tablestitle label {
    padding: 5px;
  }

  .tablestitle input {
    width: 15px;
    height: 15px;
    border: none;
  }

  .tablestitle span {
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
  <crumb t-name="异常考勤"></crumb>
  <div class="records-container" :class="opened ? 'opened': ''">
    <ul class="search_bar records-search">
      <li class="records-item clearfix">
        <div class="search_area">
          <input type="text" v-model="search.searchName" placeholder="搜索" @keyup.enter="changeSearch()">
          <div class="search_icon" @click.stop="changeSearch()"></div>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">申请部门</span>
        <div class="item-cont">
          <button class="btn btn-link selected" :class="search.officeId ? '' : 'selected'"
                  @click="changeSearch('officeId', '')">全部
          </button>
          <button class="btn btn-link" v-for="item in optional.office"
                  :class="search.officeId == item.officeId ? 'selected' : ''"
                  @click="changeSearch('officeId', item.officeId)">{{item.officeName}}
          </button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">审批状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected" :class="search.flowStatus ? '' : 'selected'"
                  @click="changeSearch('flowStatus', '')">全部
          </button>
          <button class="btn btn-link" v-for="item in optional.flowStatus"
                  :class="search.flowStatus == item.flowStatus ? 'selected' : ''"
                  @click="changeSearch('flowStatus', item.flowStatus)">{{item.flowStatusDispay}}
          </button>
        </div>
      </li>

      <li class="records-item">
        <span class="item-title">创建时间</span>
        <div class="item-cont">
          <Date-picker :value.sync="calendar.value" type="month" placeholder="选择月份"
                       style="width: 200px;margin: 5px 10px;"></Date-picker>
        </div>
      </li>
    </ul>
    <button class="search-more" @click="opened = !opened"></button>
  </div>
  <div class="form-group clearfix g-tc">
    <form method='post' action='a/workattendance/workTimeException/exportToExcel' style="margin-top: 10px;">
      <input type="hidden" value="{{search.flowStatus}}" name="flowStatus"/>
      <input type="hidden" value="{{search.officeId}}" name="officeId"/>
      <input type="hidden" value="{{search.workTimeSerch}}" name="workTimeSerch"/>
      <button type="submit" class="btn btn-primary g-marginR30 g-fr">导出列表</button>
    </form>
  </div>
  <public-table :config="params" :data="data"></public-table>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
  import Crumb from '../../components/public/PublicCrumb.vue'
  import PublicTable from '../../components/public/PublicTable.vue'
  import {getProcessCode} from '../../vuex/index/getters'
  import PublicModal from '../../components/public/PublicModal';
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
                return '<a class="btn-link" href="#!/hr/UnusualList/AppUnusual/' + obj.id + '/' + obj.flowId + '/0/0">' + value + '</a>'
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
              name: 'exceptionTimes',
              text: '考勤异常申请次数'
            },
            {
              name: 'exceptionMonthTimes',
              text: '本月异常考勤次数'
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
          officeId: '',
          flowStatus: '',
          workTimeSerch: ''
        },
        //后台获取的选项占位符
        optional: {
          office: {},    //部门相关
          flowStatus: {}           // 审批状态相关

        },
        calendar: {
          value: ''
        }
      }
    },

    computed: {},
    watch: {
      'calendar.value': function (val) {
        if (val) {
          let month = JSON.stringify(val).substring(1, 8);
          console.log(month)
          this.search.workTimeSerch = month;
        }

        this.loadData()
      }
    },
    ready: function () {
      this.getOfficeList()
      this.getStatusList()
      this._loadData(this.page);
    },
    methods: {
      _loadData: function (pages) {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_EXCEPTIONPAGELIST, {bussinessData: pages}).then((response) => {
          let responseData = response.json().result;
          let page = {};
          page.data = responseData.list;
          page.total = responseData.count;
          page.pageNumber = responseData.pageNo;
          vm.data = page;
          if (page.data.length == 0) vm.opened = false;
        });
      },
      changeSearch(key, value) {
        key && (this.search[key] = value);
        this.loadData()
      },
      loadData(){
        let vm = this;
        vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_EXCEPTIONPAGELIST, {bussinessData: vm.search}).then((response) => {
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
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETOFFICENAMELIST, {}).then((response) => {
          let responseData = response.json().result;
          vm.optional.office = responseData
        });
      },
      getStatusList: function () {
        let vm = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETFLOWSTATUS, {}).then((response) => {
          let responseData = response.json().result;
          vm.optional.flowStatus = responseData
        });
      }
    }
  };
</script>
