<style>
    .m-conter ul.gallery-list li.gallery-tab ul.job-list  .gallery-job  .job-level.width20{width:20px;}
</style>
<template>
    <li draggable="true"  class="gallery-job" :oldType="params.taskStateId"  id="{{params.id}}" @click="taskInfoPopChangeFlagFun({flag:'openPopFlag',params:true})" @mouseover="longLevel(true)" @mouseout="longLevel(false)" >
        <div class="job-level{{params.priorityId}} job-level {{(LevelLongFlag || levelFlag) ? 'width20':''}}"  @click.stop="showLeve($event)"></div>
        <ul v-if="levelFlag" class="level-list" transition="level-list" transition-mode="out-in">
            <li class="level-ordinary" :class="params.priorityId=='1' ?'choice':''" @click.stop="alertPriority(1)">普 通</li>
            <li class="level-emergency" :class="params.priorityId=='2' ?'choice': ''" @click.stop="alertPriority(2)">紧 急</li>
            <li class="level-visit" :class="params.priorityId=='3' ? 'choice': ''" @click.stop="alertPriority(3)">非常紧急</li>
        </ul>
        <p class="job-title">{{params.title}}</p>
        <p class="job-icon">
            <span v-if="params.endTimeVal" class="end-time" title="时间">{{params.endTimeVal}} 截止</span>
                <label v-if="params.subTaskAmount>0">
                    <span  class="job-describe" title="子任务列表"></span>
                    {{params.finishAmount}}/{{params.subTaskAmount}}
                </label>
            <span class="job-head" >{{params.responsibles | cutTwo}}</span>
        </p>
    </li>
    <Task-info-pop
            v-if="taskInfoGetPopOpenFlag"
            :params="params"
    ></Task-info-pop>
</template>
<script>
    import TaskInfoPop from './../others/TaskInfoPop.vue';
    import {taskInfoPopChangeFlagFun,taskInfoPopAlertPriorityFun,taskInfoAlertPrioritInCacheFun,taskInfoShowOrHideErrorFun} from '../../actions/taskInfoActions';
    import {taskInfoGetPopOpenFlag} from '../../getters/taskInfoGetter';
    export default{
        components:{
            TaskInfoPop
        },
        props:['params'],
        data(){
            return {
                levelFlag: false,
                LevelLongFlag:false
            }
        },
        vuex:{
            actions:{
                taskInfoPopChangeFlagFun,
                taskInfoPopAlertPriorityFun,
                taskInfoAlertPrioritInCacheFun,
                taskInfoShowOrHideErrorFun
            },
            getters:{
                taskInfoGetPopOpenFlag
            }
        },
        methods:{
            showLeve(){
                this.levelFlag=!this.levelFlag;

            },
            longLevel(flag){
                this.LevelLongFlag = flag;
            },
            alertPriority(num){
                const params = {id:this.params.id,priorityId:num,type:this.params.taskStateId};
                this.taskInfoPopAlertPriorityFun({
                    params:params,
                    result:(value)=>{
                    this.levelFlag =false;
                (value.status == 0)
                        ?this.taskInfoAlertPrioritInCacheFun(params)
                        :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
            }
            });
            },
        }
    }
</script>
