<template>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>
    import PublicModal from '../public/PublicModal'
    import * as getter from '../../getters/globalDialogGetter'
    export default{
        vuex:{
            getters: {
                title: getter.getTitle,
                message: getter.getMessage,
                icon: getter.getIcon,
                isShow: getter.getIsShow,
                confirm: getter.getConfirm,
                cancel: getter.getCancel,
                close: getter.getClose,
            }
        },
        computed: {
            options: function () {
                let vm = this;
                return {
                    title: vm.title,
                    message: vm.message,
                    icon: vm.icon,
                    isShow: vm.isShow
                }
            }
        },
        components:{
            PublicModal
        }
    }
</script>
