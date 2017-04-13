<template>
  <component :is="currentView" :business-key="businessKey" :task-id="taskId" :human-task-id="id" :info="info" :copy='true'></component>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
    import Approve from './ProcMyJob.vue'
    import Update from '../hrManage/HrJob.vue'
    import PublicModal from '../../components/public/PublicModal';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import { copiesNumberGetter } from '../../getters/noticesNumberGetter'
    import { updateCopiesListNum } from '../../actions/noticesNumberActions';
    export default{
        vuex:{
          actions: {
              updateCopiesListNum:updateCopiesListNum
          },
          getters: {
            copiesListNum: copiesNumberGetter
          }
        },
        data(){
            return{
                currentView: '',
                businessKey: '',
                taskId: '',
                id: '',
                info: false,
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
        methods:{
            updateProcessCopy: function (id) {
              let vm = this;
              let userId = sessionStorage.getItem("loginName")
             this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_UPDATEPROCESSCOPY,{'humanTaskId':id,'userId':userId}).then((response) => {
                if(response.ok){
                    vm.initCopiesNum(userId);
                }

             });
            },
            initCopiesNum:function (userId) {
                let vm = this;
                let params = {};
                params.userId = userId;
                vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSCOPYSNUM,params).then((response) => {
                    let responseData = response.json().result;
                    vm.updateCopiesListNum({num:responseData});
                });
            }
        },
        asyncData: function (resolve, reject) {
            let hash = window.location.hash.slice(1);
            let path = hash.match(/\/\w+/g).reverse();
            let businessKey = path[2].match(/\w+/)[0];
            let taskId = path[1].match(/\w+/)[0];
            let id = path[0].match(/\w+/)[0];

            let query = hash.match(/\?info=(\w+)/);
            let info = query && query[1] || false;

            if(!taskId) throw new Error('任务ID不能为空!');
            if(!businessKey) throw new Error('业务ID不能为空!');

            this.businessKey = businessKey;
            this.taskId = taskId == 0 ? 0 : taskId;
            this.id = id == 0 ? 0 : id;
            this.updateProcessCopy(this.id)

            if(info || !this.id) return resolve({
              currentView: 'Approve',
              info: true
            });

            let vm = this;
            this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETTASKFORMBYID, {
                humanTaskId: id
            }).then((response) => {
                let result = response.json().result;

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
                  currentView: result.taskFormKey !== 'hire_initiator_edit' ? 'Approve' : 'Update'
                })
            })
        }
    }
</script>
