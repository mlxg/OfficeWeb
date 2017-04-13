<template>
  <div class="login-box">
        <Forget-pwd-tab></Forget-pwd-tab>
        <Public-footer></Public-footer>
  </div>
</template>
<script>
    import ForgetPwdTab from '../../components/others/ForgetPwdTab.vue';
    import PublicFooter from '../../components/public/PublicFooter.vue';
    export default{
        components: {
            ForgetPwdTab,
            PublicFooter
        }
    }
</script>
