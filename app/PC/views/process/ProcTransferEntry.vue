<template>
  <component :is="currentView" :business-key="businessKey" :task-id="taskId" :human-task-id="id" :info="info" :is-record="isRecord"></component>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
    import Approve from './ProcMyEntry.vue'
    import Edit from './ProcEditEntry.vue'
    import Update from '../hrManage/HrEntry.vue'
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
                info: false,
                isRecord: false,
                options: undefined,
                confirm: undefined,
                close: undefined
            }
        },
        components:{
            Approve,
            Update,
            Edit,
            PublicModal
        },
        asyncData: function (resolve, reject) {
            let vm = this;
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            let businessKey = hash[3].match(/\w+/)[0];
            let taskId = hash[2].match(/\w+/)[0];
            let id = hash[1].match(/\w+/)[0];

            let query = window.location.hash.slice(1).match(/\?info=(\w+)/);
            let record = window.location.hash.slice(1).match(/\&record=(\w+)/);
            let info = query && query[1] || false;
            let isRecord = record && record[1] || false;

            if(!taskId) throw new Error('任务ID不能为空!');
            if(!businessKey) throw new Error('业务ID不能为空!');

            this.businessKey = businessKey;
            this.taskId = taskId == 0 ? '0' : taskId;
            this.id = id == 0 ? 0 : id;

            if((info || !this.id)&&isRecord) return resolve({
              currentView: 'Approve',
              info: true,
              isRecord: true
            });

            if(info || !this.id) return resolve({
              currentView: 'Approve',
              info: true
            });

            this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETTASKFORMBYID, {
                humanTaskId: id
            }).then((response) => {
                let message = response.json().message;
                if('fail' == message){
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
                  return;
                }
                let result = response.json().result;
                let view = 'Approve';
                if(result.taskFormKey == 'entry_initiator_edit') view = 'Update';
                if(result.taskFormKey == 'entry_hr_edit') view = 'Edit';
                resolve({
                  currentView: view
                })
            })
        }
    }
</script>
