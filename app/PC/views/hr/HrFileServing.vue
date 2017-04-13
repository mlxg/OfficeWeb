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
          width: 80px;
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
<template>
  <crumb t-name="员工档案"></crumb>
  <div class="records-container" :class="opened ? 'opened': ''">
    <ul class="search_bar records-search">
      <li class="records-item clearfix">
        <div class="search_area">
          <input type="text" v-model="search.searchName" placeholder="姓名/部门" v-on:change="changeSearch()" @keyup.enter="changeSearch()">
          <div class="search_icon" @click.stop="changeSearch()" ></div>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">职级</span>
        <div class="item-cont">
          <button class="btn btn-link selected"  :class="search.positionsLevelId? '' : 'selected'" @click="changeSearch('positionsLevelId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.positionsLevel"
                  :class="search.positionsLevelId == item.value ? 'selected' : ''"
                  @click="changeSearch('positionsLevelId', item.value)">{{item.label}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">状态</span>
        <div class="item-cont">
          <button class="btn btn-link selected" :class="search.status ? '' : 'selected'" @click="changeSearch('status', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.status"
                  :class="search.status == item.key ? 'selected' : ''"
                  @click="changeSearch('status', item.key)">{{item.value}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">学历</span>
        <div class="item-cont">
          <button class="btn btn-link" :class="search.degreeId ? '' : 'selected'" @click="changeSearch('degreeId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.degree"
                  :class="search.degreeId == item.value ? 'selected' : ''"
                  @click="changeSearch('degreeId', item.value)">{{item.label}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">办公地点</span>
        <div class="item-cont">
          <button class="btn btn-link" :class="search.workplaceId ? '' : 'selected'" @click="changeSearch('workplaceId', '')">全部</button>
          <button class="btn btn-link" v-for="item in optional.workplace"
                  :class="search.workplaceId == item.value ? 'selected' : ''"
                  @click="changeSearch('workplaceId', item.value)">{{item.label}}</button>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">入职时间</span>
        <div class="item-cont">
          <input class="form-control input-calendar" v-model="calendar.value" @click.stop="calendar.show = true" placeholder="查询时间段" readonly>
          <Public-Calendar
            :value.sync="calendar.value"
            :show.sync="calendar.show"
            :range="calendar.range"
            :x="calendar.x"
            :y="calendar.y"
            :sep.sync="calendar.sep"></Public-Calendar>
        </div>
      </li>
      <li class="records-item">
        <span class="item-title">表格筛选</span>
        <div class="item-cont tablestitle">
          <label class="g-marginR30" v-for="item in fields" style="width: 130px" v-if="item.name !=''">
            <input type="checkbox" v-model="item.isShow" @click="customize($event,$index)" v-if="item.name !=''">
            <span v-if="item.name !=''">{{item.text}}</span>
          </label>
        </div>
      </li>
    </ul>
    <button class="search-more" @click="moreOptions"></button>
  </div>
  <div style="overflow-x: scroll">
    <public-table  :config="configs" :data="employee"></public-table>
  </div>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue'
    import PublicTable from '../../components/public/PublicTable.vue'
    import PublicCalendar from '../../components/public/PublicCalendar'
    import * as type from '../../constants/globalSelectTypes'
    import {getCurData, getUrl, getCurType} from '../../getters/globalSelectGetter'
    import {resetCurType, getDataByType} from '../../actions/selectAction'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default {
      components: {
        Crumb,
        PublicTable,
        PublicCalendar
      },
      created(){
        this.init(this.allSelectTypes, this.curTypes);
        this.loginName =  sessionStorage.getItem("loginName");
        let field = [];
        //判断是否存在localStorage
        if(!localStorage.getItem(this.loginName)){
          field = field.concat(this.fields);
          this.tableList(field);
        }else{
          let tables = localStorage.getItem(this.loginName)
          field = field.concat(JSON.parse(tables));
          for(var i = 0;i<this.fields.length;i++){
            this.fields[i].isShow = false;
            for(var j = 0;j<field.length;j++){
              if(this.fields[i].name == field[j].name){
                this.fields[i].isShow = true;
              }
              //判断是否从缓存中读取有带函数的数组，如果有进行重新赋值
              if(((this.fields[i].name == '') && (field[j].name == '')) || ((this.fields[i].name == 'cnName') && (field[j].name == 'cnName'))){
                field[j] = this.fields[i];
              }
            }
          }
          this.tableList(field);
        }
        this.getData(this.data);
        this.loadData();
      },
      vuex: {
        getters: {
          data: getCurData,
          curTypes: getCurType,
          url: getUrl
        },
        actions: {
          init: resetCurType,
          getData: getDataByType
        }
      },
      data: function(){
        return {
          loginName:'',
          configs:'',
          fields: [
              {
                name: 'employeeNo',
                text: '员工号',
                isShow: true,
              },{
                name: 'cnName',
                text: '姓名',
                isShow: true,
                formatter: function(value,obj){
                  return '<a class="btn-link" href="#!/hr/arc/procMyEntry/' +  obj.id + '/0/0/0?info=true&record=true">'+value+'</a>'
                }
              },{
                name: 'sexDispay',
                text: '性别',
                isShow: true,
              },{
                name: 'officeName',
                text: '部门',
                isShow: true,
              },{
                name: 'positionsDisplay',
                text: '职位',
                isShow: true,
              },{
                name: 'positionsLevelDisplay',
                text: '职级',
                isShow: true,
              },{
                name: 'workplaceDisplay',
                text: '办公地点',
                isShow: true,
              },{
                name: 'entrantTime',
                text: '入职日期',
                isShow: true,
              },{
                name: 'nationDisplay',
                text: '民族',
                isShow: true,
              },{
                name: 'maritalStatusDispay',
                text: '婚否',
                isShow: true,
              },{
                name: 'bankBranch',
                text: '开户行',
                isShow: true,
              },{
                name: 'bankNo',
                text: '银行卡号',
                isShow: true,
              },{
                name: 'recruitWayDisplay',
                text: '招聘渠道',
                isShow: true,
              },{
                name: 'contractCompanyDispay',
                text: '合同所属公司',
                isShow: true,
              },{
                name: 'agentCompanyDispay',
                text: '代办单位',
                isShow: true,
              },{
                name: 'contractTypeDispay',
                text: '合同类型',
                isShow: true,
              },{
                name: 'contractTime',
                text: '合同次数',
                isShow: true,
              },{
                name: 'conStartDate',
                text: '合同开始日期',
                isShow: true,
              },{
                name: 'conEndDate',
                text: '合同结束日期',
                isShow: true,
              },{
                name: 'testTypeDispay',
                text: '试用期类型',
                isShow: true,
              },{
                name: 'baseStatus',
                text: '状态',
                isShow: true,
              },{
                name: 'cardNo',
                text: '身份证号码',
                isShow: true,
              },{
                name: 'cardEndDate',
                text: '身份证有效日期',
                isShow: true,
              },{
                name: 'birthday',
                text: '出生年月',
                isShow: true,
              },{
                name: 'age',
                text: '年龄',
                isShow: true,
              },{
                name: 'entrantAge',
                text: '工龄',
                isShow: true,
              },{
                name: 'familyDispay',
                text: '户口性质',
                isShow: true,
              },{
                name: 'familySource',
                text: '籍贯',
                isShow: true,
              },{
                name: 'cardNoSource',
                text: '户籍地址',
                isShow: true,
              },{
                name: 'address',
                text: '联系地址',
                isShow: true,
              },{
                name: 'telephone',
                text: '联系电话',
                isShow: true,
              },{
                name: 'mobile',
                text: '手机',
                isShow: true,
              },{
                name: 'email',
                text: '个人邮箱',
                isShow: true,
              },{
                name: 'educationDisplay',
                text: '学历',
                isShow: true,
              },{
                name: 'school',
                text: '毕业学校',
                isShow: true,
              },{
                name: 'major',
                text: '专业',
                isShow: true,
              },{
                name: 'testGraduationTime',
                text: '毕业时间',
                isShow: true,
              },{
                name: 'certificates',
                text: '与岗位相关证书',
                isShow: true,
              },
              {
                name: '',
                text: '操作',
                isShow: true,
                formatter: function(value,obj){
                  return '<a class="btn btn-default btn-xs g-marginL10" href="#!/hr/arc/EditMyEntry/' +  obj.id + '/0/0">修改资料</a>'
                }
              }
            ],

          opened: false,
          employee: {
            data: undefined,
            total: 0,
            pageNumber: 1
          },
          allSelectTypes: [
            type.EMPLOYEE_RANK,         // 职级
            type.EMPLOYEE_EDUCATION,    // 员工学历
            type.WORK_PLACE,            // 工作地点
          ],
          search: {
            pageNo: '1',
            pageSize: '10',
            orderBy: 'createDate desc',
            positionsLevelId: '',     // 职级
            workplaceId: '',          // 工作地点
            status: '',               // 状态
            degreeId: '',             // 学历
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
        }
      },
      computed: {
        optional: function () {
          let vm = this;
          return {
            positionsLevel: vm.data[vm.allSelectTypes[0]],     // 职级
            degree: vm.data[vm.allSelectTypes[1]],             // 学历
            status: [
              {
                key: '0',
                value: '试用'
              },
              {
                key: '1',
                value: '正式'
              },
              {
                key: '2',
                value: '离职'
              },
              {
                key: '3',
                value: '待离职'
              }
            ],                                     // 状态
            workplace: vm.data[vm.allSelectTypes[2]],          // 工作地点
          }
        }
      },
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
      methods: {
        moreOptions(){
          this.opened = !this.opened
        },
        changeSearch(key, value) {
          key && (this.search[key] = value);
          this.loadData()
        },
        tableList: function(field){
          this.configs =  {
            className: 'table table-striped table-hover table-bordered',
            pageSize: '10',
            pageList: [10, 20, 30, 40, 50],
            pagination: true,
            sequence: false,
            fields: field,
            callback: function (arg) {
              let vm = this;
              vm.search.pageSize = arg.pageSize;
              vm.search.pageNo = arg.pageNumber;
              vm.loadData()
            }
          }
        },
        loadData(){
          let vm = this;
          vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_BASELIST, vm.search).then((response) => {
            let responseData = response.json().result;
            vm.employee = {
              data: responseData.list,
              total: responseData.count,
              pageNumber: responseData.pageNo
            };
          })
        },
        customize : function(e,i){
          let k = i;
          if(e.currentTarget.checked){
            for(var j = 0; j<i;j++){
              //先判断之前多选有没有选中。如果没有选中则减1，因为没选中表示已经删除过，所以需要减掉计算
              if(this.fields[j].isShow == false){
                k=k-1;
              }
            }
            let field = [];
            //操作后的表格从新计算，然后刷新
            this.fields[i].isShow = true;
            field = field.concat(this.configs.fields);
            field.splice(k,0,this.fields[i]);
            this.tableList(field);
            localStorage.setItem(this.loginName, JSON.stringify(field));
          }else{
            //取消勾选则删除表格
            for(var j = 0; j<i;j++){
              //先判断之前多选有没有选中。如果没有选中则减1，因为没选中表示已经删除过，所以需要减掉计算
              if(this.fields[j].isShow == false){
                k=k-1;
              }
            }
            let field = [];
            //操作后的表格从新计算，然后刷新
            this.fields[i].isShow = false;
            field = field.concat(this.configs.fields);
            field.splice(k,1);
            this.tableList(field);
            localStorage.setItem(this.loginName, JSON.stringify(field));
          }
        },
      }
    }
</script>
<style>
  td {
    white-space:nowrap;
  }
</style>
