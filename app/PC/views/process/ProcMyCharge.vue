<style lang="less">
  .search_bar .form-control{
    width: 200px;
    height: 35px;
    margin: 4px 0 0 5px;
    float: left;
  }
  .search_area > input{
    padding-right: 40px;
    padding-left: 10px;
  }
</style>
<template>
    <Crumb t-name="我的待办"></Crumb>
    <section class="search_bar">
      <select class="form-control" v-model="search.processCategory" v-on:change="searchFun">
        <option value="">全部类型</option>
        <option v-for="item in searchMap" :value="item.publishCode">{{item.name}}</option>
      </select>
      <div class="search_area">
        <input type="text" v-model="search.presentationSubject" placeholder="搜索" maxlength="20" v-on:change="searchFun" @keyup.enter="searchFun">
        <div class="search_icon" @click.stop="searchFun"></div>
      </div>
    </section>
    <public-table :config="params" :data="data"></public-table>
</template>
<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import PublicTable from '../../components/public/PublicTable.vue';
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
        data: function() {
            return {
                params:{
                    className: 'table table-striped table-hover table-bordered table-layout tableoverflow',
                    pageSize: 10,
                    pageList: [10, 20, 30, 40, 50],
                    pagination: true,
                    sequence: false,
                    fields: [
                        {
                            name: 'presentationSubject',
                            width: '30%',
                            text: '标题',
                            formatter: function(value,obj){
                              let process = this.processCode[obj.publishCode];
                              if (process) {
                                let router = process.chargeRoute;
                                let link = '<a class="btn-link" href="#!' + router +  obj.businessKey + '/' + obj.processInstanceId + '/' + obj.id +'/0" title="'+value+'">'+value+'</a>'
                                return link
                              }
                              return value
                            }
                        },
                        {
                            name: 'processCreateDate',
                            text: '创建时间',
                            sort: true
                        },
                        {
                            name: 'businessCode',
                            text: '编号'
                        },
                        {
                            name: 'name',
                            text: '当前环节'
                        },
                        {
                            name: 'createTime',
                            text: '接收日期'
                        },
                        {
                            name: 'processCategory',
                            text: '流程类型'
                        }
                    ],
                    callback: function(arg){
                        let vm = this;
                        vm._loadData({
                          pageSize: arg.pageSize,
                          pageNo: arg.pageNumber,
                          orderBys: ["processCreateDate"],
                          orders: (Object.values(arg.sort).length == 0) ? ["desc"] :Object.values(arg.sort)
                        })
                    }
                },
                data: {
                    data: undefined,
                    total: 0,
                    pageNumber: 1
                },
                searchMap: [],
                apiUrl: content.STAROFFICE_ACT + interfaces.INTERFACE_LISTPERSONALTASKS,
                page:{
                  "pageSize":"10",
                  "pageNo":"1",
                  "orderBys":["processCreateDate"],
                  "orders":["desc"]
                },
                search: {
                  presentationSubject: '',
                  processCategory: ''
                }
            }
        },
        created: function() {
          this.searchFun();
        },
        methods: {
            searchFun: function () {
              this._loadData(this.page);
            },
            initCopiesNum:function (userId) {
                let vm = this;
                let params = {};
                params.userId = userId;
                vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSCOPYSNUM,params).then((response) => {
                    let responseData = response.json().result;
                    vm.updateCopiesListNum({num:responseData});
                });
            },
           _loadData: function (pages) {
             let vm = this;
             let params = {};
             params.userId = sessionStorage.getItem("loginName");
             params.page = pages;
             params.searchJsonStr = JSON.stringify(vm.search);
             this.$http.post(vm.apiUrl,params).then((response) => {
               let responseData = response.json().result;
               vm.updateMsgCount(content.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICENUM);
               vm.updateTodolistNum({num:responseData.totalCount});
               vm.initCopiesNum(params.userId);
               vm.data = {
                 data: responseData.result.dataMap?responseData.result.dataMap:{},
                 total: responseData.totalCount,
                 pageNumber: responseData.pageNo
               };
               vm.searchMap = responseData.result.searchMap
             });
           }
        }

    }
</script>
