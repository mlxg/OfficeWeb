<style>
    .add_pop_staff {position: absolute; padding: 20px; top:20%; bottom: 50px;left: 70%; width: 300px;height: 252px;
        margin: 0 0 0 -300px;z-index: 100;background-color: white;border-radius: 5px;transition: all .5s ease;}
    .add_pop_staff-enter, .add_pop_staff-leave { opacity: 0; transform: translate3d(0,-10px, 0); }
    .add_pop_staff header p.pop-title em.pop-close{position: absolute;height: 16px;width: 16px;background: url("../../images/pop-close.png")  no-repeat transparent; right: 32px;top:25px;cursor: pointer;}
    .add_pop_staff header p.pop-title {text-align: center;font-size: 18px;  margin-top: 22px;}
    .add_pop_staff header {margin-bottom: 30px;}
    .add_pop_staff section input{ padding:0 23px; width: 100%;height: 36px;border: 0;outline: none; background-color: #eeeeee;margin: auto;border-radius: 3px; }
    .add_pop_staff section .btmCnt { line-height: 36px; border-radius: 3px;background-color: #03a9f4;font-size: 14px;margin-top: 20px;color: white;text-align: center;cursor: pointer;}
</style>
<template>
    <Tool-box></Tool-box>
    <div class="add_pop_staff" transition="add_pop_staff" transition-mode="out-in">
        <header>
            <p class="pop-title">
                创建项目
                <em class="in-block pop-close" @click="taskIndexShowOrHiAddFun(false)" ></em>
            </p>
        </header>
        <section>
            <input type="text" placeholder="输入项目名" @keyup.enter="addProj" v-model="title">
            <Btm-cnt
                    :params='taskIndexGetAddProjBtnParam'
                    :onclick='addProj'
                    :loadflag='taskIndexGetAddProjBtnParam.btnFlag'
            >
            </Btm-cnt>
        </section>

    </div>
</template>
<script>
    import ToolBox from '../public/ToolBox.vue';
    import BtmCnt from '../public/ToolBtmCnt.vue';
    import {taskIndexAddProjFun,taskIndexShowOrHiAddFun} from '../../actions/taskIndexActions';
    import {taskInfoShowOrHideErrorFun} from '../../actions/taskInfoActions';
    import {taskIndexGetAddProjRlt,taskIndexGetAddProjBtnParam} from '../../getters/taskIndexGetter';
    export default{
        components:{
            ToolBox,
            BtmCnt
        },
        vuex:{
            actions:{
                taskIndexAddProjFun,
                taskIndexShowOrHiAddFun,
                taskInfoShowOrHideErrorFun
            },
            getters:{
                taskIndexGetAddProjRlt,
                taskIndexGetAddProjBtnParam
            }
        },
        data(){
            return{
                title:''
            }
        },
        methods:{
            addProj(){
                 const  title =  this.title.trim(),
                        params =  {title:title};
                if (!title) return;
                this.taskIndexAddProjFun(params);
            }
        },
        ready(){
            this.$watch('taskIndexGetAddProjRlt',(value)=>{
            (value.status == 0) ?this.$route.router.go({name: 'taskInfo', params:{ id: value.result.id }}):this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
        })
        }
    }
</script>
