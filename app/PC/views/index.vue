<template>
    <div>
        <router-view></router-view>
        <Global-Dialog></Global-Dialog>
    </div>
</template>
<script>
    import store from '../vuex/index/store';
    import '../css/bootstrap.css';
    import '../css/reset.css';
    import '../css/login.css';
    import '../css/grid.css';
    import '../css/unit.css';
    import '../css/module.css';
    import GlobalDialog from '../components/others/GlobalDialog'
    export default{
        components:{
          GlobalDialog
        },
        store
    }
    window.onbeforeunload = function(){
      let hash = window.location.hash.slice(1).match(/\/process\/new\/\w+/);
      if(hash) return '新建流程未提交，确定关闭吗？';
    };
</script>
