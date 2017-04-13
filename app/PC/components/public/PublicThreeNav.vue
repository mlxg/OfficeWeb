<template>
    <crumb t-name="员工档案"></crumb>
    <tabs :t-menu="tabs"></tabs>
</template>

<script>
    import Crumb from './PublicCrumb'
    import Tabs from './Tabs'

    export default {
        data(){
        return {
            tabs: [
                {
                    name: '待入库资料',
                    route: '/hr/arc/ware'
                },
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
                Tabs
    },
    created: function(){
        let id = this.$route.params.id;
        console.log(id);
        //this._getData(id);
    },
    }
</script>
