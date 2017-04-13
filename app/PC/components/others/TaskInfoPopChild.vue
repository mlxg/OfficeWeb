<style lang="less">
  .proj-info-bounced section ul.child-proj-lst li.task-sub-item{
    .pop-close{
      position: absolute;
      right: 21px;
      height: 16px;
      width: 16px;
      background: url("../../images/pop-close.png")  no-repeat transparent;
    }
    .check-box{
      position: absolute;
    }
    .proj-title{
      margin-left: 25px;
      margin-right: 16px;
      margin-bottom: 5px;
    }
  }
  .proj-info-bounced {
    .del-prompt{
      width: 300px;
      position: absolute;
      z-index: 9;
      right: 21px;
      background-color: #fff;
      box-shadow: 0 0 6px 1px rgba(0,0,0,.15);
      text-align: center;
      padding: 15px 10px;
      transition: all .3s ease;
      .del-title{
        margin-bottom: 20px;
      }
      .btn-default{
        margin-left: 10px;
      }
    }
    .del-prompt-enter, .del-prompt-leave { opacity: 0; transform: translate3d(0,-10px, 0); }
  }
</style>
<template>
    <li class="task-sub-item clearfix" v-for="item in subTaskList">
        <em class="in-block pop-close" @click="changeDelPrompt(item.id)"></em>
        <div class="del-prompt" v-show="delPrompt[item.id] && delPrompt[item.id].show" transition="del-prompt">
          <p class="del-title">确定要删除子任务({{item.title}})吗？</p>
          <button type="button" class="btn btn-info btn-sm" @click="deleteSubTask(item, $index)">确 定</button>
          <button type="button" class="btn btn-default btn-sm" @click="changeDelPrompt(item.id)">取 消</button>
        </div>
        <em class="check-box in-block" :class="item.taskStateId == taskState.COMPLETED.key ? 'choice':''" @click.stop="changeState(item, $index)"></em>
        <p contenteditable class="proj-title editable"v-on:blur="alertSubTitle($event, item, $index)" @keypress.enter.prevent="alertSubTitle($event, item, $index)">{{item.title}}</p>
        <a @click.stop="open($event, item.endTimeVal, $index)" style="margin-right: 10px"><em class="time-icon in-block "></em>
          {{item.endTimeVal ? item.endTimeVal : '设置截止时间'}}
        </a>
        <span class="name-icon child-name" v-if="item.responsibleList && item.responsibleList.length"
              @click="chociePerson($event, item)">{{item.responsibleList[0].name}}</span>
        <em v-else class="add-name in-block" @click="chociePerson($event, item)"></em>
    </li>
    <Tool-calendar
            :show.sync="calendar.show"
            :type="calendar.type"
            :value.sync="calendar.value"
            :x="calendar.x"
            :y="calendar.y"
            :begin.sync="calendar.begin"
            :end.sync="calendar.end"
            :range.sync="calendar.range"
            :weeks="calendar.weeks"
            :months="calendar.months"
            :sep.sync="calendar.sep">
    </Tool-calendar>
    <Public-choose-person
      :left="chociePer.left"
      :show.sync="chociePer.show"
      :top="chociePer.top"
      :single="chociePer.single"
      :source="personSource"
      :person-list.sync="chociePer.personList"
      :callback="chociePer.callback"
    >
    </Public-choose-person>
</template>
<script>
    import ToolCalendar from '../public/ToolCalendar.vue'
    import PublicChoosePerson from './../public/PublicChoosePerson.vue';
    import {taskInfoPopInfoSubLstFun,taskInfoPopAlterTitleFun,taskInfoShowOrHideErrorFun} from '../../actions/taskInfoActions';
    import {contenteditableEnter} from '../../../tool/lib/OptimizeDeal';
    import '../../../tool/lib/DateTool';
    import url from '../../js/taskSource'
    export default{
    components: {
        ToolCalendar,
        PublicChoosePerson
      },
      props:['id','subTaskList','flowLst', 'personSource', 'subFinish', 'subNum'],
      vuex:{
          actions:{
              taskInfoPopInfoSubLstFun,
              taskInfoPopAlterTitleFun,
              taskInfoShowOrHideErrorFun
          }
      },
      data(){
            return {
                taskState:{
                  'GOING': {
                    key: '2',
                    value: '进行中'
                  },
                  'COMPLETED': {
                    key: '6',
                    value: '已完成'
                  }
                },
                userName: sessionStorage.getItem('userName'),
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    picker: "",
                    type: "date",
                    begin: "",
                    end: "",
                    value: "",
                    sep: "-",
                    weeks: [],
                    months: [],
                    range: false,
                    index: ''
                },
                chociePer:{
                  show: false,
                  left: 0,
                  top: 45,
                  single: true,
                  personList: [],
                  callback: null
                },
                timer: '',
                delPrompt: {}
            }
        },
        watch:{
          'calendar.value': function (val) {
            let date = (new Date(val)).format("yyyy-MM-dd hh:mm:ss"),
                vm = this,
                item = vm.subTaskList[vm.calendar.index];
            vm.$http.post(url.updateEndTime, {id: item.id, endTime: date}, {headers: {task: true}}).then((response) => {
              response = response.json();
              if(response.status == 0){
                vm.flowLst.unshift({"recordContent": vm.userName + ` 更新子任务(${item.title})截止时间为 ${val}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                item.endTimeVal = val;
              }else vm.taskInfoShowOrHideErrorFun(response.message);//做报错处理
            })
          }
        },
        methods:{
            changeDelPrompt(key){
              this.$set('delPrompt["' + key + '"].show', !(this.delPrompt[key] && this.delPrompt[key].show))
            },
            chociePerson(e, item){
              this.chociePer.left = e.target.offsetLeft;
              this.chociePer.top = e.target.offsetTop;
              this.chociePer.personList = [].concat(...item.responsibleList);
              this.chociePer.show = true;

              let vm = this;
              this.chociePer.callback = function (personList) {
                vm.chociePer.show = false;
                vm.$http.post(url.updateExecutor, {id: item.id, responsibleList: personList}, {headers: {task: true}}).then((response) => {
                  response = response.json();
                  if(response.status == 0){
                    vm.flowLst.unshift({"recordContent": vm.userName + ` 更新子任务(${item.title})执行者为 ${personList[0].name}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                    item.responsibleList = personList;
                  }else vm.taskInfoShowOrHideErrorFun(response.message);//做报错处理
                })
              }
            },
            open(e, endTimeVal, index) {
                this.calendar.show=true;
                this.calendar.x=e.target.offsetLeft;
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8;
                this.calendar.value = endTimeVal;
                this.calendar.index = index;
            },
            changeState({taskStateId, id, title}, index){
              let vm = this;
              taskStateId == vm.taskState.COMPLETED.key ? (taskStateId = vm.taskState.GOING.key) : (taskStateId = vm.taskState.COMPLETED.key);
              vm.$http.post(url.updateState, {taskStateId, id}, {headers: {task: true}}).then((response) => {
                response = response.json();
                if(response.status == 0){
                  let status = '';
                  if(taskStateId == vm.taskState.COMPLETED.key){
                    status = vm.taskState.COMPLETED.value;
                    vm.subFinish += 1;
                  } else {
                    status = vm.taskState.GOING.value;
                    vm.subFinish -= 1;
                  }
                  if(vm.subFinish < 0) vm.subFinish = 0;
                  vm.flowLst.unshift({"recordContent": vm.userName + ` 更新子任务(${title})状态为 ${status}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                  vm.subTaskList[index].taskStateId = taskStateId;
                }else vm.taskInfoShowOrHideErrorFun(response.message);//做报错处理
              })
            },
            alertSubTitle(e, {id, title}, index){
                clearTimeout(this.timer);
                let newTitle =  contenteditableEnter(e),
                    vm = this;
                if(!newTitle || newTitle == title) return;
                vm.timer = setTimeout(function () {
                  let params = {id: id, title:newTitle};
                  vm.taskInfoPopAlterTitleFun({
                      params:params,
                      result:(value)=>{
                        vm.flowLst.unshift({"recordContent": vm.userName + ` 更新子任务(${title})标题为 ${newTitle}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                  (value.status == 0)
                          ?vm.subTaskList[index].title = newTitle
                          :vm.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                  });
                }, 100)
            },
            deleteSubTask({id, title, taskStateId}, index){
              // 删除子任务
              let vm = this;
              vm.$http.post(url.deleteSubTask, {id: id}, {headers: {task: true}}).then((response) => {
                response = response.json();
                if(response.status == 0){
                  vm.flowLst.unshift({"recordContent": vm.userName + ` 删除了子任务(${title})`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                  vm.subTaskList.splice(index, 1);
                  vm.subNum -= 1;
                  if(vm.subNum < 0) vm.subNum = 0;
                  if(taskStateId == vm.taskState.COMPLETED.key) vm.subFinish -= 1;
                }else vm.taskInfoShowOrHideErrorFun(response.message);//做报错处理
              })
            }
        }
    }
</script>
