<template>
    <component :is="currentView" :business-key="businessKey" :task-id="taskId" :human-task-id="id" :taskform-Key="taskFormKey" :cn="_cn" :kj="_kj" :hr="_hr" :deptheader="_deptheader" :cw="_cw" :zc="_zc" :dsz="_dsz" :zjl="_zjl" :edit="_edit" ></component>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
    import Approve from './ProcReimburse.vue'
    import Update from '../Fina/Reimbursement.vue'
    import PublicModal from '../../../components/public/PublicModal';
    import * as content from '../../../constants/contentTypes';
    import * as interfaces from '../../../constants/interfaceTypes';
    export default{
        data(){
        return{
            currentView: '',
            businessKey: '',
            taskId: '',
            id: '',
            options: undefined,
            confirm: undefined,
            close: undefined,
            taskFormKey:'',
            _cn:'',
            _kj:'',
        }
    },
    components:{
        Approve,
        Update,
        PublicModal
    },
    asyncData: function (resolve, reject) {
        let hash = window.location.hash.slice(1);
        let path = hash.match(/\/\w+/g).reverse();
        let businessKey = path[3].match(/\w+/)[0];
        let taskId = path[2].match(/\w+/)[0];
        let id = path[1].match(/\w+/)[0];

        this.businessKey = businessKey;
        this.taskId = taskId;
        this.id = id;

        let vm = this;
        this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETTASKFORMBYID, {
            humanTaskId: id
        }).then((response) => {
            if(response.json().status == '0'){
              let result = response.json().result;
              vm.taskFormKey = result.taskFormKey
              vm._cn = result.taskFormKey.search(/_cn/g)
              vm._kj = result.taskFormKey.search(/_kj/g)
              vm._hr = result.taskFormKey.search(/_hr/g)
              vm._deptheader = result.taskFormKey.search(/_deptheader/g)
              vm._cw = result.taskFormKey.search(/_cw/g)
              vm._zc = result.taskFormKey.search(/_zc/g)
              vm._dsz = result.taskFormKey.search(/_dsz/g)
              vm._zjl = result.taskFormKey.search(/_zjl/g)
              vm._edit = result.taskFormKey.search(/_edit/g)
              if(!result) {
                vm.options = {
                  title: '温馨提示',
                  message: '该任务已经被办理，不能重复办理！',
                  isShow: true
                };
                vm.confirm = {
                  text: '确定',
                  callback: function () {
                    vm.$router.go('/process/todo');
                    vm.options.isShow = false;
                  }
                };
                vm.close = {
                  callback: function () {
                    vm.$router.go('/process/todo');
                    vm.options.isShow = false;
                  }
                };
                return
              }
              resolve({
                currentView: result.taskFormKey.search(/edit/g) == '-1' ? 'Approve' : 'Update'
              })
            }

        })
    }
    }
</script>
