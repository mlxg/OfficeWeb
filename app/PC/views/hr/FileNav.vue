<!-- 人力资源 --- 员工档案 --- 三级菜单 -->
<template>
    <crumb t-name="员工档案"></crumb>
    <tabs :t-menu="tabs"></tabs>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import tabs from '../../components/public/PublicTabs.vue';
    export default {
        data(){
            return {
                tabs: [
    //                {
    //                    name: '待入库资料',
    //                    route: '/hr/arc/ware'
    //                },
                    {
                        name: '在职人员档案',
                        route: '/hr/arc/serving'
                    },
                    {
                        name: '离职人员档案',
                        route: '/hr/arc/turn'
                    }
                ]
            }
        },
        components: {
            Crumb,
            tabs
        }
    }
</script>
