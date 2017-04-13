<template>
    <div>
        <Login-tab></Login-tab>
        <Public-footer></Public-footer>
    </div>
</template>
<script>
    import LoginTab from '../components/others/LoginTab.vue';
    import PublicFooter from '../components/public/PublicFooter.vue';
    export default{
        components: {
            LoginTab,
            PublicFooter
        }
    }
</script>
