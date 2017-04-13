<template>
    <li  @mouseover="changeShow(true)"  @mouseout="changeShow(false)">
        <span>{{params.title}}</span>
        <span>{{params.taskStateId | dealType}}</span>
        <a v-if="showFlag"  ><em></em>恢复</a>
        <span v-else class="last-child">{{params.archiveTime}}</span>
    </li>
</template>
<script>
//    title:'测试一',taskTypeId:'1',updateDate:'2016-02-01 12:00:00'
    export default{
        props:['params'],
        data(){
            return{
                showFlag: false
            }
        },
        methods:{
            changeShow(type){
                this.showFlag = type;
            }
        }
    }
</script>
