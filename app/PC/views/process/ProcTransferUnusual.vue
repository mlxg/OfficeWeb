
<template>
  <component :is="currentView" :business-key="businessKey" :task-id="taskId" :human-task-id="id" ></component>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
  import Approve from './ProcMyUnusual.vue'
  import Update from '../hrManage/HrUnusual.vue'
  import PublicModal from '../../components/public/PublicModal';
  import * as content from '../../constants/contentTypes';
  import * as interfaces from '../../constants/interfaceTypes';
  export default{
    data(){
      return{
        currentView: '',
        businessKey: '',
        taskId: '',
        id: '',
        options: undefined,
        confirm: undefined,
        close: undefined
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
        let result = response.json().result;
        vm.taskFormKey = result.taskFormKey;

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
          currentView: result.taskFormKey !== 'worktime_exception_edit' ? 'Approve' : 'Update'
        })
      })
    }
  }
</script>
