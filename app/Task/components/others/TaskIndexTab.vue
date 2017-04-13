<style>
    .m-conter ul li ,.m-conter ul li h3 , .m-conter ul li span {padding: 0;line-height: 1em;margin: 0;}
    .m-conter ul.p-list{overflow: hidden;padding: 10px;}
    .m-conter ul.p-list li {width: 270px;height: 134px; border: 1px solid #DDD; float: left;margin-left: 30px;margin-bottom:30px;border-radius: 10px;cursor: pointer;position: relative;background-color: rgb(39, 142, 237);}
    .m-conter ul.p-list li:hover{ -webkit-transform: translate3d(0,-5px,0);  transform: translate3d(0,-5px,0);  box-shadow: 0 7px 21px rgba(0,0,0,.15);}
    .m-conter ul.p-list li.p-card h3 {font-size: 18px;line-height: 135px; text-align: center; color: white;text-overflow: ellipsis;  white-space: nowrap;}
    .m-conter ul.p-list li.p-card em {position: absolute;right: 0;top: 0;height: 20px;width: 20px;background-color: red; border-radius: 20px;}
    .m-conter ul.p-list li.p-add {background: #fafbff url('../../images/addbtn.png') no-repeat 118px 35px;}
    .m-conter ul.p-list li.p-add span.create-new{position: absolute; display: block;text-align: center;font-size: 18px; width: 100%; top: 72px;color: #0068b7;}
</style>
<template>
    <div class="m-conter">
        <Public-loading
                v-if="!taskIndexGetProjLst"
        >
        </Public-loading>
        <ul v-else class="p-list">
            <li class="p-card" v-for="item in taskIndexGetProjLst.result" v-link="{name: 'taskInfo', params:{ id: item.id }}">
                <h3>{{item.title}}</h3>
                <em v-if="item.isUnderway == 'T'"></em>
            </li>
            <li class="p-add" @click="taskIndexShowOrHiAddFun(true)">
                <span class="create-new">创建新项目</span>
            </li>
        </ul>
    </div>
    <Task-index-add
            v-if="taskIndexGetAddProjFlag">
    </Task-index-add>
    <Tool-error>
    </Tool-error>
</template>
<script>
    import TaskIndexAdd from './TaskIndexAdd.vue';
    import PublicLoading from '../public/PublicLoading.vue';
    import ToolError from '../public/ToolError.vue';
    import {taskIndexQueryLstFun,taskIndexShowOrHiAddFun} from '../../actions/taskIndexActions';
    import {taskIndexGetProjLst,taskIndexGetAddProjFlag} from '../../getters/taskIndexGetter';
    export default{
        components:{
            TaskIndexAdd,
            PublicLoading,
            ToolError
        },
        vuex:{
            getters:{
                taskIndexGetProjLst, //获取项目列表
                taskIndexGetAddProjFlag //增加弹框显示的表示
            },
            actions:{
                taskIndexQueryLstFun, //查询项目列表
                taskIndexShowOrHiAddFun //显示或者隐藏
            }
        },
        methods:{
            init(){
                this.taskIndexShowOrHiAddFun(false);
            }
        },
        ready(){
            this.init();
            this.taskIndexQueryLstFun();
        }

    }
</script>
