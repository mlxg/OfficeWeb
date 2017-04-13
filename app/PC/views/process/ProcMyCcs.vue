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
    <Crumb t-name="抄送给我"></Crumb>
    <section class="search_bar">
      <select class="form-control" v-model="search.copyStatus" v-on:change="searchFun">
        <option value="0">未查看</option>
        <option value="1">已查看</option>
      </select>
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
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import { copiesNumberGetter } from '../../getters/noticesNumberGetter'
    import { updateCopiesListNum } from '../../actions/noticesNumberActions';
    export default{
        vuex: {
          actions: {
              updateCopiesListNum:updateCopiesListNum
          },
          getters: {
            copiesListNum: copiesNumberGetter,
            processCode: getProcessCode
          }
        },
        components: {
            Crumb,
            PublicTable
        },
        data: function() {
            return {
                userId: 0,
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
                              let vm = this;
                              let process = this.processCode[obj.publishCode];
                              if (process) {
                                let router = process.ccsRoute;
                                return '<a class="btn-link" href="#!' + router +  obj.businessKey + '/' + obj.processInstanceId + '/'+ obj.id +'?info=true" title="'+value+'">'+value+'</a>'
                              }
                              return value
                            }
                        },
                        {
                            name: 'processCreateDate',
                            text: '抄送时间',
                            sort: true
                        },
                        {
                            name: 'businessCode',
                            text: '编号'
                        },
                        {
                            name: 'copyDate',
                            text: '接收日期',
                            sort: true
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
                          orderBys: ["copyDate"],
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
                apiUrl: content.STAROFFICE_ACT + interfaces.INTERFACE_LISTPROCESSCOPYS,
                page:{
                  "pageSize":"10",
                  "pageNo":"1",
                  "orderBys":["copyDate"],
                  "orders":["desc"]
                },
                search: {
                  presentationSubject: '',
                  processCategory: '',
                  copyStatus:0
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
           _loadData: function (pages) {
             let vm = this;
             let params = {};
             params.userId = sessionStorage.getItem("loginName");
             vm.userId = params.userId
             params.page = pages;
             params.searchJsonStr = JSON.stringify(vm.search);
             this.$http.post(vm.apiUrl,params).then((response) => {
               let responseData = response.json().result;
               vm.data = {
                 data: responseData.result.dataMap?responseData.result.dataMap:{},
                 total: responseData.totalCount,
                 pageNumber: responseData.pageNo
               };
               if (vm.search.copyStatus==0 && vm.search.processCategory=='') {
                  vm.updateCopiesListNum({num:responseData.totalCount});
               };
               vm.searchMap = responseData.result.searchMap
             });
           }
        }

    }
</script>
