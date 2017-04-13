<template>
    <div class="login-box">
        <Login-tab></Login-tab>
        <Public-footer></Public-footer>
    </div>
</template>
<script>
    import LoginTab from '../../components/others/LoginTab.vue';
    import PublicFooter from '../../components/public/PublicFooter.vue';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        components: {
            LoginTab,
            PublicFooter
        },
        created: function(){
            let that = this;
//            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_CHECKSESSION).then((response)=>{
//                let Data = response.json();
//                if(Data.status == "0"){
//                    if(sessionStorage.getItem("loginName") == null || sessionStorage.getItem("userId") == null|| sessionStorage.getItem("userName") == null){
//                        sessionStorage.setItem("loginName", Data.result.loginName);
//                        sessionStorage.setItem("userId", Data.result.id);
//                        sessionStorage.setItem("userName", Data.result.name);
//                        that.$router.go('/process/todo');
//                    }
//                }
//            });
        },
    }
</script>
