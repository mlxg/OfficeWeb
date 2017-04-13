<style>
    ul,p,div,h3,h6{padding: 0;margin: 0;}
    ul{list-style: none;}
    .in-block{display: inline-block;}
    .font14{font-size: 14px;}
    .scroll-lst{overflow-y: auto; position: relative}
    .mright5{margin-right: 5px;}
    .colora6{color: #a6a6a6;}
    .border-round{border: 1px solid #E1E1E1;border-radius:3px;}
    .m-conter span.name-icon{display: inline-block;width: 24px;height: 24px;border-radius: 12px;background-color: #C38ACF;color: white;line-height: 24px;font-size: 12px;}
    .proj-info-bounced {position: fixed; text-align: left; top:20%; left: 50%; width: 800px;margin: 0 0 0 -400px;z-index: 100;background-color: white;border-radius: 5px;transition: all .5s ease;  padding-bottom: 5px;}
    .proj-info-bounced-enter, .proj-info-bounced-leave { opacity: 0; transform: translate3d(0,-10px, 0); }
    .proj-info-bounced header{position: relative;padding: 0 15px;border-bottom:1px solid #E1E1E1;padding-bottom: 5px;}
    .proj-info-bounced header p.pop-title{position: relative;top:0; text-align: left;width: 100%;padding: 10px 0;}
    .proj-info-bounced header p.pop-title span{color: #a6a6a6;display: inline-block;}
    .proj-info-bounced header p.pop-title a.proj-status{color: gray;}
    .proj-info-bounced header p.pop-title a.proj-status:hover{color: #03a9f4;}
    .proj-info-bounced header p.pop-title a.proj-more{cursor:pointer;position: absolute;right: 33px;top: 13px; width:44px; background: url("../../images/pull-down.png") 28px no-repeat transparent;}
    .proj-info-bounced header p.pop-title em.pop-close{position: absolute;right:0;height: 16px;width: 16px;background: url("../../images/pop-close.png")  no-repeat transparent;cursor: pointer;}
    .proj-info-bounced ul.proj-status-list,.proj-info-bounced ul.proj-more-list,.proj-info-bounced ul.proj-priority-list {position: absolute;top: 27px;z-index: 110; padding:0;width: 150px; text-align: left;font-size: 14px; -webkit-box-shadow: 1px 2px 4px rgba(0,0,0,.15); box-shadow: 0 7px 21px rgba(0,0,0,.1);border: solid 1px transparent;border-radius: 3px;background-color: white;}
    .proj-info-bounced ul.proj-more-list{right: 0;}
    .proj-info-bounced ul.proj-priority-list{right: 0;}
    .proj-info-bounced ul.proj-status-list li,.proj-info-bounced  ul.proj-more-list li,.proj-info-bounced ul.proj-priority-list li{line-height: 30px; padding: 0 12px;cursor: pointer;}
    .proj-info-bounced ul.proj-status-list li.pop-choice,.proj-info-bounced ul.proj-priority-list li.pop-choice{background:url("../../images/pop_level_choice.png") 114px center/16% no-repeat ;}
    .proj-info-bounced ul.proj-status-list li:hover,.proj-info-bounced  ul.proj-more-list li:hover,.proj-info-bounced ul.proj-priority-list li:hover{background-color:#F1EDED;}
    .proj-info-bounced section { padding: 15px !important;overflow:auto;max-height: 60vh; }
    .editable {white-space:normal; word-break:break-all;word-wrap:break-word;cursor: pointer;outline:none; -webkit-tap-highlight-color:rgba(0,0,0,0);border-radius: 3px;}
    .editable:hover{background-color: #F1EDED;}
    .proj-info-bounced header p.proj-title {text-align:center;padding:7px 0;width:80%;margin:auto;font-size: 18px;}
    .proj-info-bounced section ul.set-list li.code{float: left;width: 33%; position: relative;}
    .proj-info-bounced section ul.set-list li.code a{display: inline-block; margin: 10px 16px 14px; line-height: 24px; overflow: hidden; text-overflow: ellipsis;font-size: 14px; cursor: pointer;}
    .proj-info-bounced section ul.set-list li.code a:hover{color:#03a9f4}
    .proj-info-bounced section ul.set-list li.code h6{margin: 16px 16px 0 ; line-height: 12px;color: gray;}
    .proj-info-bounced section ul.set-list li.code a.set-end-date em{background: url("../../images/choice-date.png") 0/100% no-repeat;margin-right: 5px;display: inline-block;height: 18px;width: 18px;line-height: 24px;}
    .proj-info-bounced section .add-remark{padding: 10px;margin-top: 10px;background: url("../../images/proj-remark.png") 17px 11px/26px 26px no-repeat transparent;}
    .proj-info-bounced section .add-remark p{padding: 7px 10px;margin-left: 38px;}
    .proj-info-bounced section .parts-list{padding: 7px 10px; margin-top: 10px;}
    .proj-info-bounced section .parts-list strong{font-size:14px;color: gray;line-height: 28px; }
    .proj-info-bounced section .parts-list p span{margin-right: 5px;}
    .proj-info-bounced section .parts-list p em.add-name{width: 24px;height: 24px;background: url("../../images/gray-add-icon.png" )0/100% no-repeat transparent;vertical-align: bottom;  cursor: pointer;}
    .proj-info-bounced section ul.child-proj-lst {margin-top: 10px;}
    .proj-info-bounced section ul.child-proj-lst li{line-height: 20px;padding:7px 10px;border-bottom: 1px solid #E1E1E1;font-size: 14px;}
    .proj-info-bounced section ul.child-proj-lst li.add{border-bottom: 0; cursor: pointer; }
    .proj-info-bounced section ul.child-proj-lst li.add:hover{ color:#03a9f4; }
    .proj-info-bounced section ul.child-proj-lst li p{ padding: 2px 0;vertical-align: top; }
    .proj-info-bounced section ul.child-proj-lst li em{cursor: pointer;width: 20px ;height: 20px;background: 0/100% no-repeat transparent;vertical-align: top;}
    .proj-info-bounced section ul.child-proj-lst li em.check-box{background-image: url("../../images/check-before.png") ;}
    .proj-info-bounced section ul.child-proj-lst li em.check-box.choice{background-image: url("../../images/check-after.png")}
    .proj-info-bounced section ul.child-proj-lst li em.time-icon{background-image: url("../../images/choice-date.png")}
    .proj-info-bounced section ul.child-proj-lst li span.name-icon.child-name{vertical-align: top;cursor: pointer;}
    .proj-info-bounced section ul.child-proj-lst li.add em.add-name{width: 20px;height: 20px;background: url("../../images/gray-add-icon.png" )0/100% no-repeat transparent;vertical-align: top;  margin-right: 20px;}
    .proj-info-bounced section ul.records-flow{overflow: hidden;width: 100%;border:1px solid #E1E1E1;margin-top: 10px;padding: 10px;}
    .proj-info-bounced section ul.records-flow li{text-align: right;width: 100%;word-wrap: break-word; word-break: normal;;line-height: 20px;font-size: 10px;color:#a6a6a6; position: relative;}
    .proj-info-bounced section ul.records-flow li span{float: left; width: 400px; text-align: left;line-height: 1.42857143;}
    span.name-icon.job-level1{background-color:#97ea94;}
    span.name-icon.job-level2{background-color:#dce680;}
    span.name-icon.job-level3{background-color:#ffb11b;}
    span.name-icon.job-level4{background-color:#ea5510;}
    span.name-icon.job-level5{background-color:#bd183f;}
    .proj-info-bounced ul.proj-priority-list li{ line-height: 0;}
    .proj-info-bounced ul.proj-priority-list li > a{margin: 0 !important; line-height: 40px !important;}
    .proj-info-bounced section ul.child-proj-lst li em.add-name{background: url("../../images/gray-add-icon.png" )0/100% no-repeat transparent; width: 24px; height: 24px;vertical-align: bottom;}
</style>
<template>
    <div class="proj-info-bounced"   transition="proj-info-bounced" transition-mode="out-in">
        <header>
            <p class="pop-title">
                <span class="font14">任务状态</span>
                <a class="proj-status in-block font14 g-marginL10" @click.stop="showAndHide('projFlag',!projFlag)">{{params.taskStateId|dealType}}</a>
                <em class="in-block pop-close" @click.stop="closeInfo" ></em>
            </p>
            <ul v-if="projFlag" class="proj-status-list">
                <li :class="params.taskStateId=='1' ? 'pop-choice':''" @click.stop="alertStatus(1)" ><a>未启动</a></li>
                <li :class="params.taskStateId=='2' ? 'pop-choice':''" @click.stop="alertStatus(2)" ><a>进行中</a></li>
                <li :class="params.taskStateId=='6' ? 'pop-choice':''" @click.stop="alertStatus(6)" ><a>已完成</a></li>
            </ul>
            <p class="proj-title editable" title="点击可编辑" contenteditable v-on:blur="alertTitle($event)"  @keypress.enter.prevent="alertTitle($event)" >{{params.title}}</p>
        </header>
        <section class="scroll-lst">
            <ul class="set-list border-round" >
                <li class="code">
                    <h6>执行者</h6>
                    <a @click="chociePerson($event, [params.responsibleList[0]], true, true)">
                        <span class="name-icon mright5"> {{params.responsibleList[0].name | cutTwo}}</span>
                        {{params.responsibleList[0].name}}
                    </a>
                </li>
                <li class="code">
                    <h6>截止时间</h6>
                    <a class="set-end-date indent30 colora6" @click.stop="open($event, params)"  >
                        <em></em>
                        {{params.endTimeVal?params.endTimeVal:'点击设置'}}
                    </a>
                    <Tool-calendar
                      :show.sync="calendar.show"
                      :value.sync="calendar.value"
                      :x="calendar.x"
                      :y="calendar.y"
                      :sep.sync="calendar.sep">
                    </Tool-calendar>
                </li>
                <li class="code" >
                    <h6>优先级</h6>
                    <a class="colora6" @click.stop="showAndHide('priorityFlag',!projFlag)">
                        <span class="name-icon mright5 job-level{{params.priorityId}}"  >&nbsp;</span>
                        {{params.priorityId | prioriName}}
                    </a>
                    <ul v-if="priorityFlag" class="proj-priority-list">
                        <li :class="params.priorityId=='1' ? 'pop-choice':''" @click.stop="alertPriority(1)" ><a>低</a></li>
                        <li :class="params.priorityId=='2' ? 'pop-choice':''" @click.stop="alertPriority(2)" ><a>普通</a></li>
                        <li :class="params.priorityId=='3' ? 'pop-choice':''" @click.stop="alertPriority(3)" ><a>高</a></li>
                        <li :class="params.priorityId=='4' ? 'pop-choice':''" @click.stop="alertPriority(4)" ><a>紧急</a></li>
                        <li :class="params.priorityId=='5' ? 'pop-choice':''" @click.stop="alertPriority(5)" ><a>立刻</a></li>
                    </ul>
                </li>
                <li style="clear: both;"></li>
            </ul>
            <div class="add-remark border-round">
                <p contenteditable class="editable" v-on:blur="alertContent($event)" @keypress.enter.prevent="alertContent($event)" >{{params.content}}</p>
            </div>
            <div class="parts-list border-round" >
                <strong class="parts-title">参与者</strong>
                <p >
                    <span v-for="item in joinLst" class="name-icon">{{item.name | cutTwo}}</span>
                    <em class="add-name in-block" @click="chociePerson($event, joinLst, false, false)"></em>
                </p>
            </div>
            <ul class="child-proj-lst border-round" >
                <Task-info-pop-child
                        :person-source="joinLst"
                        :sub-task-list.sync="subTskLst"
                        :id="params.id"
                        :flow-lst="flowLst"
                        :sub-finish.sync="subFinish"
                        :sub-num.sync="subNum"
                ></Task-info-pop-child>
                <li v-if="addSubFlag">
                    <div class="add-job-tab" transition="add-job-tab" transition-mode="out-in">
                        <textarea class="editable" placeholder="任务内容" @keyup.enter.prevent="addSubJob()" v-model="titleVale" >
                        </textarea>
                        <p class="cteate-job-info">
                            <a  @click.stop="open($event, null)" style="margin-right: 10px">
                                <em class="time-icon"></em>
                                {{calendar.addSub.value ? calendar.addSub.value : '设置截止时间'}}
                            </a>
                            <Tool-calendar
                              :show.sync="calendar.addSub.show"
                              :value.sync="calendar.addSub.value"
                              :x="calendar.x"
                              :y="calendar.y"
                              :sep.sync="calendar.sep">
                            </Tool-calendar>
                            <span v-for="item in subPerson" class="name-icon" @click="chociePerson($event, subPerson, true, null, true)" style="cursor: pointer;">{{item.name | cutTwo}}</span>
                            <em v-if="!subPerson.length" class="add-name in-block" @click="chociePerson($event, subPerson, true, null, true)"></em>
                            <a class="cteate-new-job" @click.prevent="addSubJob()">创建</a>
                        </p>
                    </div>
                </li>
                <li v-else class="add" @click.stop="openAddSub">
                    <span ><em  class="add-name in-block"  ></em>添加子任务</span>
                </li>
            </ul>
            <ul class="records-flow" title="操作流水记录">
                <li v-for="item in flowLst" class="clearfix">
                    <span>{{item.recordContent}}</span>
                    {{item.createDate}}
                </li>

            </ul>
        </section>
      <Public-choose-person
        :left="chociePer.left"
        :show.sync="chociePer.show"
        :top="chociePer.top"
        :single="chociePer.single"
        :source="chociePer.source"
        :person-list.sync="chociePer.personList"
        :ignore-list="chociePer.ignoreList"
        :callback="chociePer.callback"
        :close-callback="chociePer.closeCallback"
      ></Public-choose-person>
    </div>
</template>
<script>
    import ToolCalendar from '../public/ToolCalendar.vue';
    import TaskInfoPopChild from './TaskInfoPopChild.vue';
    import PublicChoosePerson from './../public/PublicChoosePerson.vue';
    import {taskInfoPopChangeFlagFun,taskInfoPopInfoJoinPerFun,taskInfoPopInfoFlowFun,taskInfoPopAlterTitleFun,
            taskInfoAlterTiltelInCacheFun,taskInfoPopAlterStatusFun,taskInfoAlterStatusInCacheFun,taskInfoPopAlterContentFun,
            taskInfoAlterContentInCacheFun,taskInfoPopAlertPriorityFun,taskInfoAlertPrioritInCacheFun,taskInfoPopInfoSubLstFun,
            taskInfoShowOrHideErrorFun,taskInfoAddSunJobFun,
            updateEndTime, updateExecutor} from '../../actions/taskInfoActions';
    import {contenteditableEnter} from '../../../tool/lib/OptimizeDeal';
    import '../../../tool/lib/DateTool';
    import url from '../../js/taskSource'
    export default{
        components: {
            ToolCalendar,
            TaskInfoPopChild,
            PublicChoosePerson
        },
        props:['params', 'isOpen', 'subFinish', 'subNum'],
        vuex:{
          actions:{
              taskInfoPopChangeFlagFun,
              taskInfoPopInfoJoinPerFun, //参与人列表查询
              taskInfoPopInfoFlowFun,  //日志流水查询
              taskInfoPopAlterTitleFun, //改变标题
              taskInfoAlterTiltelInCacheFun,//标题放进缓存
              taskInfoPopAlterStatusFun,//修改状态
              taskInfoAlterStatusInCacheFun,//修改状态
              taskInfoPopAlterContentFun,
              taskInfoAlterContentInCacheFun,
              taskInfoPopAlertPriorityFun,
              taskInfoAlertPrioritInCacheFun,
              taskInfoPopInfoSubLstFun,
              taskInfoShowOrHideErrorFun,
              taskInfoAddSunJobFun,
              updateEndTime,
              updateExecutor
          }
        },
        data(){
            return {
                priority: {
                  '1': '低',
                  '2': '普通',
                  '3': '高',
                  '4': '紧急',
                  '5': '立刻'
                },
                titleVale:'',
                projFlag:false,
                moreFlag:false,
                priorityFlag:false,
                addSubFlag:false,   //添加子任务
                joinLst:[],      //参与人列表
                flowLst:[],      //流水列表
                subTskLst:[],      //子任务列表
                subPerson: [],     // 子任务的执行人
                title:'',
                userName: sessionStorage.getItem('userName'),
                chociePer:{
                  show: false,
                  left: 0,
                  top: 45,
                  single: true,
                  source: null,
                  ignoreList: null,
                  personList: [],
                  callback: null,
                  closeCallback: null
                },
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    value: "",
                    newValue: '',
                    sep: "-",
                    id: '',
                    addSub: {
                      show: false,
                      value: ""
                    }
                },
                timer: ''
            }
        },
        watch: {
          'calendar.value': function (val) {
            let vm = this;
            if(vm.calendar.newValue == val) return;

            this.updateEndTime({
              endTime: (new Date(val)).format('yyyy-MM-dd hh:mm:ss'),
              id: vm.params.id,
              taskStateId: vm.params.taskStateId,
              isShow: true,
              endTimeVal: val
            });
          }
        },
        methods:{
            closeInfo(){
              this.isOpen = undefined
              this.taskInfoPopChangeFlagFun({flag:'openPopFlag',params:false})
            },
            chociePerson (e, personList, single, isOne, isSub){  // 选人
              let vm = this;
              vm.chociePer.show = true;
              vm.chociePer.single = single;

              if(isSub){
                // 添加子任务的选人
                vm.chociePer.source = vm.joinLst;
                vm.chociePer.personList = personList;
                vm.chociePer.closeCallback = null;
                vm.chociePer.ignoreList = null;
                vm.chociePer.callback = function () {
                  vm.chociePer.show = false
                };
                vm.chociePer.top = e.clientY - vm.$el.offsetTop - 150;
                vm.chociePer.left = e.clientX - vm.$el.offsetLeft;
                return
              }

              vm.chociePer.source = null;
              vm.chociePer.top = 45;
              vm.chociePer.left = 0;
              if(isOne){
                // 修改一级任务执行者
                vm.chociePer.personList = personList;
                vm.chociePer.closeCallback = null;
                vm.chociePer.ignoreList = null;
                vm.chociePer.callback = function (personList) {
                  vm.chociePer.show = false;
                  vm.updateExecutor({
                    responsibleList: personList,
                    id: vm.params.id,
                    taskStateId: vm.params.taskStateId,
                    isShow: true
                  }, function () {
                    // 把执行者加入参与者数组中，除非已存在
                    let index = vm.joinLst.findIndex(({userId})=> userId === personList[0].userId);
                    if(index === -1) vm.joinLst.push(personList[0])
                  })
                }
              }else {
                // 修改一级任务参与者
                vm.chociePer.personList = [].concat(...personList);
                vm.chociePer.ignoreList = [vm.params.responsibleList[0], { userId: vm.params.createUserId}];
                vm.chociePer.callback = null;
                vm.chociePer.closeCallback = function (personList) {
                  // 对比修改前后的数据
                  let delList = [],
                      addList = [],
                      repeatList = [],
                      joinLst = vm.joinLst;

                  personList.forEach((item) => {
                    let temp = joinLst.find(({userId}) => userId === item.userId);
                    if(!temp) addList.push(item);
                    else repeatList.push(item)
                  });
                  joinLst.forEach((item) => {
                    let temp = repeatList.find(({userId}) => userId === item.userId);
                    if(!temp) delList.push(item)
                  });

                  // 拼接请求数组
                  let request = [];
                  if(addList.length) request.push(vm.$http.post(url.updateParticipant, {followList: addList, operationType: '1', id: vm.params.id}, {headers: {task: true}}));
                  if(delList.length) request.push(vm.$http.post(url.updateParticipant, {followList: delList, operationType: '2', id: vm.params.id}, {headers: {task: true}}));
                  if(!request.length) return;

                  Promise.all(request).then(([r1, r2])=>{
                    r1 && (r1 = JSON.parse(r1.data));
                    r2 && (r2 = JSON.parse(r2.data));
                    if(r1 && r1.status != 0) return vm.taskInfoShowOrHideErrorFun(r1.message);
                    if(r2 && r2.status != 0) return vm.taskInfoShowOrHideErrorFun(r2.message);//做报错处理

                    vm.joinLst = personList;
                    if(addList.length) {
                      let txt = [];
                      addList.forEach(({name}) => txt.push(name));
                      vm.flowLst.unshift({
                        "recordContent": vm.userName + ` 添加了参与者 ` + txt.join('，'),
                        "createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")
                      });
                    }
                    if(delList.length) {
                      let txt = [];
                      delList.forEach(({name}) => txt.push(name));
                      vm.flowLst.unshift({
                        "recordContent": vm.userName + ` 移除了参与者 ` + txt.join('，'),
                        "createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")
                      });
                    }
                  })
                }
              }
            },
            openAddSub(){ //打开创建子任务的列表
                this.addSubFlag = true;
            },
            addSubJob(){    //增加子任务
                let titleVale = this.titleVale.trim();
                if(!titleVale) return;
                //缓存里面增加
                let vm = this;
                let date = vm.calendar.addSub.value;
                date && (date = (new Date(date).format('yyyy-MM-dd hh:mm:ss')));
                let params = {parentId:vm.params.id,taskStateId:vm.params.taskStateId,title: titleVale, endTime: date, endTimeVal: vm.calendar.addSub.value,responsibleList: vm.subPerson};
                //请求后台,并添加id
                vm.taskInfoAddSunJobFun({
                        params:params,
                        result:(value)=>{
                        vm.flowLst.unshift({"recordContent": vm.userName + ` 添加了子任务-${titleVale}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                        params.id = value.result.id;
                        if(value.status == 0){
                          vm.addSubJobInCache(params);
                          vm.addSubFlag = false
                        }else vm.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
                //清空组建缓存
                this.calendar.addSub.value = '';
                this.titleVale = '';
            },
            addSubJobInCache(params){
                this.subTskLst.push(params);
                // 在父结构里面也要更新
                this.subNum += 1;
                if(params.taskStateId == '6'){
                  this.subFinish += 1;
                } else {
                  this.subFinish -= 1;
                }

                if(this.subFinish < 0) this.subFinish = 0
            },
            alertTitle(e){
                clearTimeout(this.timer);
                let title =  contenteditableEnter(e),
                    vm = this;
                if(!title || title == vm.params.title) return e.target.textContent = vm.params.title;
                vm.timer = setTimeout(function () {
                  let params = {id:vm.params.id,title:title,type:vm.params.taskStateId};
                  vm.taskInfoPopAlterTitleFun({
                    params:params,
                    result:(value)=>{
                      vm.flowLst.unshift({"recordContent": vm.userName +` 更新任务标题为 ${title}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                      (value.status == 0)?vm.taskInfoAlterTiltelInCacheFun(params):vm.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                  });
                }, 100)
            },
            showAndHide(type,value){
                this[type] = value;
            },
            alertStatus(num){
                this.params.isShow = true;

                let args = {id:this.params.id,taskStateId:num,oldType:this.params.taskStateId};
                this.taskInfoPopAlterStatusFun({
                    params:args,
                    result:(value)=>{
                    this.flowLst.unshift({"recordContent": this.userName + ` 修改了状态`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                (value.status == 0) ?this.taskInfoAlterStatusInCacheFun(args) :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
            },
            alertPriority(num){
                const params = {id:this.params.id,priorityId:num,type:this.params.taskStateId};
                this.taskInfoPopAlertPriorityFun({
                    params:params,
                    result:(value)=>{

                            this.flowLst.unshift({"recordContent":  this.userName + ` 更新任务优先级为 ${this.priority[num]}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                            this.priorityFlag =false;
                        (value.status == 0) ?this.taskInfoAlertPrioritInCacheFun(params):this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
            },
            alertContent(e){
                clearTimeout(this.timer);
                let content =  contenteditableEnter(e),
                    vm = this;
                vm.timer = setTimeout(function () {
                   let params = {id:vm.params.id,content:content,type:vm.params.taskStateId};
                  vm.taskInfoPopAlterContentFun({
                      params:params,
                      result:(value)=>{
                        vm.flowLst.unshift({"recordContent": vm.userName +` 更新了任务内容为 ${content}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                  (value.status == 0)
                          ?vm.taskInfoAlterContentInCacheFun(params)
                          :vm.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                      }
                  });
                }, 100)
            },
            queryJoinLst(){ //查询参与人列表
                this.taskInfoPopInfoJoinPerFun({
                    params:{id:this.params.id},
                    result:(value)=>{
                        (value.status == '0')&& (this.joinLst = value.result );
                        }
                    });
            },
            queryTskFlowLst(){ //查询参与人列表
                this.taskInfoPopInfoFlowFun({
                            params:{taskId:this.params.id},
                            result:(value)=>{
                        (value.status == '0')&& (this.flowLst = value.result);
                    }
                })
            },
            querysubTskLst(){ //子任务列表
                this.taskInfoPopInfoSubLstFun({
                            params:{id:this.params.id},
                            result:(value)=>{
                            (value.status == '0')&& (this.subTskLst = value.result );
                }
                })
            },
            openPerson(e){
                this.calendar.x=e.target.offsetLeft;
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8;
            },
            // 打开显示选择器
            open(e, params) {
                if(params) {
                  this.calendar.id = params.id;
                  this.calendar.value = params.endTime;
                  this.calendar.newValue = params.endTime;
                  this.calendar.show = true;
                }else {
                  this.calendar.addSub.show = true
                }

                this.calendar.x = e.target.offsetLeft;
                this.calendar.y = e.target.offsetTop + e.target.offsetHeight + 8;
            }
        },
        ready(){
            this.queryJoinLst(); //查询参与人列表
            this.queryTskFlowLst(); //查询流水列表
            this.querysubTskLst(); //查询子任务列表
        }

    }
</script>
