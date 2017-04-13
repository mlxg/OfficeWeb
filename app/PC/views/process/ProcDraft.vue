<template>
  <Crumb t-name="草稿箱"></Crumb>
  <public-table :config="params" :data="data"></public-table>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<style>
  .table .btn-link{
    padding: 0 5px;
  }
</style>
<script>
  import Crumb from '../../components/public/PublicCrumb.vue';
  import PublicTable from '../../components/public/PublicTable.vue';
  import PublicModal from '../../components/public/PublicModal'
  import {getFlowCode} from '../../vuex/index/getters';
  import * as content from '../../constants/contentTypes';
  import * as interfaces from '../../constants/interfaceTypes';
  export default{
    vuex: {
      getters: {
        flow: getFlowCode
      }
    },
    components: {
      Crumb,
      PublicTable,
      PublicModal
    },
    data: function() {
      return {
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        params:{
          className: 'table table-striped table-hover table-bordered',
          pageSize: 10,
          pageList: [10, 20, 30, 40, 50],
          pagination: true,
          sequence: false,
          fields: [
            {
              name: 'flowCode',
              text: '标题',
              formatter: function(value, obj){
                let flow = this.flow[value];
                return obj.title
              }
            },
            {
              name: 'createDate',
              text: '创建时间'
            },
            {
              name: 'flowCode',
              text: '流程类型',
              formatter: function(value,obj){
                let flow = this.flow[value];
                return flow ? flow.text : ''
              }
            },
            {
               name: 'operate',
               text: '操作',
               operates: [
                   {
                       text: '继续完善',
                       className: 'btn btn-link',
                       handler: function(obj, array, index) {
                           let vm = this;
                           let flow = vm.flow[obj.flowCode];
                           if(!flow) return;
                           vm.$router.go({
                             name: flow.route,
                             params: {
                               processId: flow.process
                             },
                             query: {
                               businessKey: obj.employeeFlowId
                             }
                           })
                       }
                   },
                  {
                    text: '删除',
                    className: 'btn btn-link',
                    handler: function(obj) {
                      let vm = this;
                      vm.options = {
                        title: '温馨提示',
                        message: '确定要删除吗？',
                        isShow: true
                      };
                      vm.cancel = {
                        text: '取消',
                        callback: function () {
                          vm.options.isShow = false;
                        }
                      }
                      vm.confirm = {
                        text: '确定',
                        callback: function () {
                          let deleteUrl = content.CONTENT_ROOT + interfaces.INTERFACE_DELETEFLOWANDSERVICERECORD;
                          let employeeFlowId = obj.employeeFlowId;
                          if(employeeFlowId){
                            vm.$http.post(deleteUrl,{employeeFlowId:employeeFlowId}).then((response)=>{
                              // 删除组件中的数据
                              vm._loadData(vm.page);
                            })
                          } else {
                            alert("业务实体ID缺失");
                          }
                          vm.options.isShow = false;
                        }
                      };
                      vm.close = {
                        callback: function () {
                          vm.options.isShow = false;
                        }
                      };

                    }
                  }
               ]
            }
          ],
          callback: function(arg){
            let vm = this;
            vm._loadData({
              status: "0",
              pageSize: arg.pageSize,
              pageNo: arg.pageNumber
            })
          }
        },
        data: {
          data: undefined,
          total: 0,
          pageNumber: 1
        },
        apiUrl: content.CONTENT_ROOT + interfaces.INTERFACE_FINDFLOWRECORDLIST,
        page:{
          "status": "0",
          "pageSize": 10,
          "pageNo": 1
        }
      }
    },
    ready: function() {
      this._loadData(this.page);
    },
    methods: {
      _loadData: function (page) {
        let vm = this;
        this.$http.post(vm.apiUrl, page).then((response) => {
          let responseData = response.json().result;
          vm.data = {
            data: responseData.list,
            total: responseData.count,
            pageNumber: responseData.pageNo
          };
        });
      }
    }
  }
</script>
