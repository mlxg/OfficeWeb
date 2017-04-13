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
                     name: 'copyDate',
                     text: '抄送时间',
                     width: '30%'
                   },
                   {
                     name: 'viewDate',
                     text: '查看时间'
                   },
                   {
                     name: 'copyer',
                     text: '抄送人'
                   },
                   {
                     name: 'status',
                     text: '状态'
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
          vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_LISTPROCESSCOPYBYTASKID, {'humanTaskId': vm.humanTaskId, 'page': {'pageSize': '', 'pageNo': 1}}).then((response) => {
            let result = response.data
            result = JSON.parse(result)
            resolve({
              'data.data': result.result.result
            })
          })
        }
    }
</script>
