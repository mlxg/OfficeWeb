<style lang="less">
    .m-conter ul.gallery-list li.gallery-tab ul.job-list  .gallery-job  .job-level.width20{width:20px;}
    ul.level-list li.level-low, ul.job-list .gallery-job .job-level1{background-color: #97ea94;}
    ul.level-list li.level-normal, ul.job-list .gallery-job .job-level2{background-color: #dce680;}
    ul.job-list .gallery-job .job-level3{background-color: #ffb11b;}
    ul.job-list .gallery-job .job-level4{background-color: #ea5510;}
    ul.job-list .gallery-job .job-level5{background-color: #bd183f;}
    ul.job-list .gallery-job .pop-close{
      position: absolute;
      right: 4px;
      top: 4px;
      height: 16px;
      width: 16px;
      opacity: 0;
      background: #fff url(../../images/pop-close.png) no-repeat center/60%;
      border-radius: 50%;
      border: #c1c1c1 solid 1px;
      cursor: pointer;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.15);
      transition: opacity ease-in .1s;
      &:hover{border-color: #f1b9b9; box-shadow: 0 0 5px 0 rgba(253, 58, 58, 0.15);}
    }
    ul.job-list .gallery-job:hover .pop-close{opacity: 1}
    ul.job-list .gallery-job{
      .del-prompt {
        width: 100%;
        min-height: 100%;
        position: absolute;
        z-index: 9;
        right: 0;
        background-color: #fff;
        box-shadow: 0 0 6px 1px rgba(0, 0, 0, .15);
        text-align: center;
        padding: 5px 10px 15px 10px;
        transition: all .3s ease;
        .btn-default {
          margin-left: 10px;
        }
      }
      .del-prompt-enter, .del-prompt-leave { opacity: 0; transform: translate3d(0,-10px, 0); }
    }
</style>
<template>
    <li draggable="true"  class="gallery-job" :oldType="params.taskStateId"  id="{{params.id}}" @click="openInfo" @mouseover="longLevel(true)" @mouseout="longLevel(false)" >
      <em class="pop-close" @click.stop="isDel=true" v-if="curUserId === params.createUserId"></em>
      <div class="del-prompt" v-if="curUserId === params.createUserId" v-show="isDel" transition="del-prompt" @click.stop>
        <p class="del-title">确定要删除任务({{params.title}})吗？</p>
        <button type="button" class="btn btn-info btn-xs" @click="delTask">确 定</button>
        <button type="button" class="btn btn-default btn-xs" @click="isDel=false">取 消</button>
      </div>
      <div class="job-level{{params.priorityId}} job-level {{(LevelLongFlag || levelFlag) ? 'width20':''}}"  @click.stop="showLeve($event)"></div>
        <ul v-if="levelFlag" class="level-list" transition="level-list" transition-mode="out-in">
            <li class="level-low" :class="params.priorityId=='1' ?'choice':''" @click.stop="alertPriority(1)">低</li>
            <li class="level-normal" :class="params.priorityId=='2' ?'choice': ''" @click.stop="alertPriority(2)">普通</li>
            <li class="level-ordinary" :class="params.priorityId=='3' ? 'choice': ''" @click.stop="alertPriority(3)">高</li>
            <li class="level-emergency" :class="params.priorityId=='4' ? 'choice': ''" @click.stop="alertPriority(4)">紧急</li>
            <li class="level-visit" :class="params.priorityId=='5' ? 'choice': ''" @click.stop="alertPriority(5)">立刻</li>
        </ul>
        <p class="job-title">{{params.title}}</p>
        <p class="job-icon">
            <span v-if="params.endTimeVal" class="end-time" title="时间">{{params.endTimeVal}} 截止</span>
                <label v-if="subNum">
                    <span  class="job-describe" title="子任务列表"></span>
                    {{subFinish}}/{{subNum}}
                </label>
            <span class="job-head" >{{params.responsibles | cutTwo}}</span>
        </p>
    </li>
    <Task-info-pop
        v-if="isShow"
            :is-open.sync="isOpen"
            :params="params"
            :sub-finish.sync="subFinish"
            :sub-num.sync="subNum"
    ></Task-info-pop>
</template>
<script>
    import TaskInfoPop from './../others/TaskInfoPop.vue';
    import {taskInfoPopChangeFlagFun,taskInfoPopAlertPriorityFun,taskInfoAlertPrioritInCacheFun,taskInfoShowOrHideErrorFun, updateSubTaskAmount, deleteTask} from '../../actions/taskInfoActions';
    import {taskInfoGetPopOpenFlag} from '../../getters/taskInfoGetter';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        components:{
            TaskInfoPop
        },
        props:['params'],
        data(){
            return {
                levelFlag: false,
                LevelLongFlag:false,
                isOpen: false,
                isShow: false,
                subFinish: '',
                subNum: '',
                isDel: false,
                curUserId: sessionStorage.getItem('userId')
            }
        },
      created(){
        this.isShow = this.params.isShow;
        this.subFinish =  Number(this.params.finishAmount) || 0;
        this.subNum =  Number(this.params.subTaskAmount) || 0;
      },
      watch: {
        'isOpen': function (val, old) {
          if(val)
            this.isShow = true;
          else
            this.isShow = false;
        },
        'subFinish': function (val, old) {
          if(!old && val == Number(this.params.finishAmount || 0)) return;
          this.updateSubTaskAmount({
            id: this.params.id,
            taskStateId: this.params.taskStateId,
            finishAmount: this.subFinish,
            subTaskAmount: this.subNum
          })
        },
        'subNum': function (val, old) {
          if(!old && val == Number(this.params.subTaskAmount || 0)) return;
          this.updateSubTaskAmount({
            id: this.params.id,
            taskStateId: this.params.taskStateId,
            finishAmount: this.subFinish,
            subTaskAmount: this.subNum
          })
        }
      },
      vuex:{
            actions:{
                taskInfoPopChangeFlagFun,
                taskInfoPopAlertPriorityFun,
                taskInfoAlertPrioritInCacheFun,
                taskInfoShowOrHideErrorFun,
                updateSubTaskAmount,
                deleteTask
            },
            getters:{
                taskInfoGetPopOpenFlag
            }
        },
        methods:{
            openInfo(){
              this.isOpen = true;
              this.taskInfoPopChangeFlagFun({flag:'openPopFlag',params:true})
            },
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
            delTask () {
              let vm = this;
              this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_DELETETASK, {id: vm.params.id}).then((status)=>{
                status = status.json().status;
                if(status == 0){
                  vm.deleteTask(vm.params)
                }
              })
            }
        }
    }
</script>
