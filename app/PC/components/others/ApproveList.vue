<template>
    <Public-Table :config="config" :data="data"></Public-Table>
</template>
<script>
    import PublicTable from '../public/PublicTable.vue'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        props: {
          humanTaskId: {
            type: String,
            required: true
          }
        },
        data(){
            return{
               config: {
                 className: 'table table-striped table-hover table-bordered bg-white',
                 pagination: false,
                 sequence: false,
                 fields: [
                   {
                     name: 'name',
                     text: '操作名称'
                   },{
                     name: 'status',
                     text: '状态'
                   },{
                     name: 'comment',
                     text: '意见',
                     width: '30%'
                   },{
                     name: 'assignee',
                     text: '负责人'
                   },{
                     name: 'createTime',
                     text: '开始时间'
                   },{
                     name: 'completeTime',
                     text: '结束时间'
                   }
                 ]
               },
               data: {
                 data: null
               }
            }
        },
        components:{
          PublicTable
        },
        asyncData: function (resolve, reject) {
          let vm = this;
          vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_LISTCOMPLETETASKSBYTASKID, {'humanTaskId': vm.humanTaskId, 'page': {'pageSize': '', 'pageNo': 1}}).then((response) => {
            resolve({
              'data.data': response.json().result.result
            })
          })
        }
    }
</script>
