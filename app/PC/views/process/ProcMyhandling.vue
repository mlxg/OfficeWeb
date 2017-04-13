<!-- 流程中心 --- 我的申请 -- 我的经办（查询页面） -->
<template>
    <crumb t-name="我的经办"></crumb>
    <section class="search_bar">
      <select class="form-control" v-model="search.processCategory" v-on:change="searchFun">
        <option value="">全部流程类型</option>
        <option v-for="item in searchMap" :value="item.publishCode">{{item.name}}</option>
      </select>
      <select class="form-control" v-model="search.currentStatus" v-on:change="searchFun">
        <option value="">全部状态类型</option>
        <option v-for="item in statusMap" :value="item.status">{{item.statusName}}</option>
      </select>
        <div class="search_area">
          <input type="text" v-model="search.presentationSubject" placeholder="搜索" maxlength="20" v-on:change="searchFun" @keyup.enter="searchFun">
          <div class="search_icon" @click.stop="searchFun"></div>
        </div>
    </section>
    <public-table :config="params" :data="data"></public-table>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue'
    import PublicTable from '../../components/public/PublicTable.vue'
    import { getProcessCode } from '../../vuex/index/getters';
    import { updateTodolistNum, updateCopiesListNum } from '../../actions/noticesNumberActions';
    import { updateMsgCount } from '../../actions/headNavbarAction';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        vuex: {
          actions: {
              updateTodolistNum:updateTodolistNum,
              updateCopiesListNum:updateCopiesListNum,
              updateMsgCount
          },
          getters: {
            processCode: getProcessCode
          }
        },
        components: {
            Crumb,
            PublicTable
        },
        data: function(){
            return {
                params: {
                    className: 'table table-striped table-hover table-bordered table-layout tableoverflow',
                    pageSize: 10,
                    pageList: [10, 20, 30, 40, 50],
                    pagination: true,
                    sequence: false,
                    fields: [
                        {
                            name: 'presentationSubject',
                            width: '25%',
                            text: '标题',
                            formatter: function(value,obj){
                              let process = this.processCode[obj.publishCode];
                              if (process) {
                                let router = process.disposeRoute;
                                return '<a class="btn-link" href="#!' + router +  obj.businessKey + '/' + obj.processInstanceId + '/'+ obj.id +'/' + obj.taskFormKey +'?info=true" title="'+value+'">'+value+'</a>'
                              }
                              return value
                            }
                        },
//                        {
//                            name: 'processCreateDate',
//                            text: '创建时间',
//                            sort: true
//                        },
                        {
                            name: 'createTime',
                            text: '到达时间',
                            sort: true
                        },
                        {
                            name: 'completeTime',
                            text: '完成时间'
                        },
                        {
                            name: 'applyAssignee',
                            width: '8%',
                            text: '申请人'
                        },
                        {
                            name: 'processCategory',
                            width: '14%',
                            text: '流程类型'
                        },
                        {
                            name: 'currentName',
                            width: '10%',
                            text: '当前环节'
                        },
                        {
                            name: 'currentStatus',
                            width: '8%',
                            text: '当前状态'
                        },
                        {
                          name: 'currentAssignee',
                          width: '8%',
                          text: '当前处理人'
                        },
//                        {
//                            name: 'operating',
//                            text: '操作',
//                            operates: [
//                               {
//                                   text: '撤销',
//                                   className: 'btn btn-link',
//                                   handler: function(obj, array, index) {
//                                       console.log(arguments)
//                                     alert("还没做");
//                                   }
//                               },
//                              {
//                                  text: '详情',
//                                  className: 'btn btn-link',
//                                  handler: function(obj, array, index) {
//                                    console.log(arguments)
//                                    alert("还没做");
//                                  }
//                              }
//                           ]
//                        }
                    ],
                    callback: function(arg){
                        let vm = this;
                        vm._loadData({
                            pageSize: arg.pageSize,
                            pageNo: arg.pageNumber,
                            orderBys: ["createTime"],
                            orders: (Object.values(arg.sort).length == 0) ? ["desc"] :Object.values(arg.sort)
                        })
                    }
                },
                apiUrl: content.STAROFFICE_ACT + interfaces.INTERFACE_LISTHANDLETASKS,
                data: {
                    data: undefined,
                    total: 0,
                    pageNumber: 1
                },
                page:{
                    "pageSize":"10",
                    "pageNo":"1",
                    "orderBys":["createTime"],
                    "orders":["desc"]
                },
              searchMap: [],
              statusMap: [],
              search: {
                presentationSubject: '',
                processCategory: '',
                currentStatus:''
              }
            }
        },
        created: function() {
          this.searchFun();
        },
        methods:{
            searchFun: function () {
              this._loadData(this.page);
            },
            updateTodolist:function () {
                let vm = this;
                let params = {};
                params.userId = sessionStorage.getItem("loginName");
                vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPERSONALTASKSNUM,params).then((response) => {
               let responseData = response.json().result;
               vm.updateTodolistNum({num:responseData});
             });
            },
            _loadData : function(pages){
                let vm = this;
                let params = {};
                params.userId = sessionStorage.getItem("loginName");
                params.page = pages;
                params.searchJsonStr = JSON.stringify(vm.search);
                vm.$http.post(vm.apiUrl,params).then(function(response){
                  let responseData = response.json().result;
                   vm.updateMsgCount(content.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICENUM);
                   vm.updateTodolist();
                  vm.data = {
                    data: responseData.result.dataMap?responseData.result.dataMap:{},
                    total: responseData.totalCount,
                    pageNumber: responseData.pageNo
                  };
                  vm.searchMap = responseData.result.searchMap
                  vm.statusMap = responseData.result.statusMap
                });
            }
        }
    }
</script>
