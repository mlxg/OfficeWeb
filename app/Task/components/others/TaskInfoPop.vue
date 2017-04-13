<style>
    ul,p,div,h3,h6{padding: 0;margin: 0;}
    ul{list-style: none;}
    .in-block{display: inline-block;}
    .font14{font-size: 14px;}
    .scroll-lst{overflow-y: auto;}
    .mright5{margin-right: 5px;}
    .colora6{color: #a6a6a6;}
    .border-round{border: 1px solid #E1E1E1;border-radius:3px;}
    .m-conter span.name-icon{display: inline-block;width: 24px;height: 24px;border-radius: 12px;background-color: #C38ACF;color: white;line-height: 24px;font-size: 12px;}
    .proj-info-bounced {position: absolute; top:20%; bottom: 50px;left: 50%; width: 600px;margin: 0 0 0 -300px;z-index: 100;background-color: white;border-radius: 5px;transition: all .5s ease;}
    .proj-info-bounced-enter, .proj-info-bounced-leave { opacity: 0; transform: translate3d(0,-10px, 0); }
    .proj-info-bounced header{position: relative;padding: 0 15px;border-bottom:1px solid #E1E1E1;padding-bottom: 5px;}
    .proj-info-bounced header p.pop-title{position: relative;top:0; text-align: left;width: 100%;padding: 10px 0;}
    .proj-info-bounced header p.pop-title span{color: #a6a6a6;display: inline-block;}
    .proj-info-bounced header p.pop-title a.proj-status{color: gray;}
    .proj-info-bounced header p.pop-title a.proj-status:hover{color: #03a9f4;}
    .proj-info-bounced header p.pop-title a.proj-more{cursor:pointer;position: absolute;right: 33px;top: 13px; width:44px; background: url("../../images/pull-down.png") 28px no-repeat transparent;}
    .proj-info-bounced header p.pop-title em.pop-close{position: absolute;right:0;height: 16px;width: 16px;background: url("../../images/pop-close.png")  no-repeat transparent;cursor: pointer;}
    .proj-info-bounced ul.proj-status-list,.proj-info-bounced ul.proj-more-list,.proj-info-bounced ul.proj-priority-list {position: absolute;top: 27px;z-index: 110; padding:5px  0;width: 150px; text-align: left;font-size: 14px; -webkit-box-shadow: 0 7px 21px rgba(0,0,0,.1); box-shadow: 0 7px 21px rgba(0,0,0,.1);border: solid 1px transparent;border-radius: 3px;background-color: white;}
    .proj-info-bounced ul.proj-more-list{right: 0;}
    .proj-info-bounced ul.proj-priority-list{right: 0;}
    .proj-info-bounced ul.proj-status-list li,.proj-info-bounced  ul.proj-more-list li,.proj-info-bounced ul.proj-priority-list li{line-height: 30px; padding: 0 12px;cursor: pointer;}
    .proj-info-bounced ul.proj-status-list li.pop-choice,.proj-info-bounced ul.proj-priority-list li.pop-choice{background:url("../../images/pop_level_choice.png") 114px/16% no-repeat ;}
    .proj-info-bounced ul.proj-status-list li:hover,.proj-info-bounced  ul.proj-more-list li:hover,.proj-info-bounced ul.proj-priority-list li:hover{background-color:#F1EDED;}
    .proj-info-bounced section { padding: 15px 15px 0 15px;overflow:auto;max-height: 350px; }
    .editable {white-space:normal; word-break:break-all;word-wrap:break-word;cursor: pointer;outline:none; -webkit-tap-highlight-color:rgba(0,0,0,0);border-radius: 3px;}
    .editable:hover{background-color: #F1EDED;}
    .proj-info-bounced header p.proj-title {text-align:center;padding:7px 0;width:80%;margin:auto;font-size: 18px;}
    .proj-info-bounced section ul.set-list {margin-top: 10px;}
    .proj-info-bounced section ul.set-list li.code{float: left;width: 33%; position: relative;}
    .proj-info-bounced section ul.set-list li.code a{display: inline-block; margin: 10px 16px 14px; line-height: 24px; overflow: hidden; text-overflow: ellipsis;font-size: 14px; cursor: pointer;}
    .proj-info-bounced section ul.set-list li.code a:hover{color:#03a9f4}
    .proj-info-bounced section ul.set-list li.code h6{margin: 16px 16px 0 ; line-height: 12px;color: gray;}
    .proj-info-bounced section ul.set-list li.code a.set-end-date em{background: url("../../images/choice-date.png") 0/100% no-repeat;margin-right: 5px;display: inline-block;height: 18px;width: 18px;line-height: 24px;}
    .proj-info-bounced section .add-remark{padding: 10px;margin-top: 10px;background: url("../../images/proj-remark.png") 17px 14px/4% no-repeat transparent;}
    .proj-info-bounced section .add-remark p{padding: 7px 10px;margin-left: 38px;}
    .proj-info-bounced section .parts-list{padding: 7px 10px; margin-top: 10px;}
    .proj-info-bounced section .parts-list strong{font-size:14px;color: gray;line-height: 28px; }
    .proj-info-bounced section .parts-list p span{margin-right: 5px;}
    .proj-info-bounced section .parts-list p em.add-name{width: 24px;height: 24px;background: url("../../images/gray-add-icon.png" )0/100% no-repeat transparent;vertical-align: bottom;  cursor: pointer;}
    .proj-info-bounced section ul.child-proj-lst {margin-top: 10px;}
    .proj-info-bounced section ul.child-proj-lst li{line-height: 20px;padding:7px 10px;border-bottom: 1px solid #E1E1E1;font-size: 14px;}
    .proj-info-bounced section ul.child-proj-lst li.add{border-bottom: 0; cursor: pointer; }
    .proj-info-bounced section ul.child-proj-lst li.add:hover{ color:#03a9f4; }
    .proj-info-bounced section ul.child-proj-lst li p{width: 86%;padding: 2px 0;vertical-align: top; }
    .proj-info-bounced section ul.child-proj-lst li em{cursor: pointer;width: 20px ;height: 20px;background: 0/100% no-repeat transparent;vertical-align: top;}
    .proj-info-bounced section ul.child-proj-lst li em.check-box{background-image: url("../../images/check-before.png") ;}
    .proj-info-bounced section ul.child-proj-lst li em.check-box.choice{background-image: url("../../images/check-after.png")}
    .proj-info-bounced section ul.child-proj-lst li em.time-icon{background-image: url("../../images/choice-date.png")}
    .proj-info-bounced section ul.child-proj-lst li span.name-icon.child-name{vertical-align: top;cursor: pointer;}
    .proj-info-bounced section ul.child-proj-lst li.add em.add-name{width: 20px;height: 20px;background: url("../../images/gray-add-icon.png" )0/100% no-repeat transparent;vertical-align: top;  margin-right: 20px;}
    .proj-info-bounced section ul.records-flow{overflow: hidden;width: 100%;border:1px solid #E1E1E1;margin-top: 10px;padding: 10px;}
    .proj-info-bounced section ul.records-flow li{text-align: right;width: 100%;word-wrap: break-word; word-break: normal;;line-height: 20px;font-size: 10px;color:#a6a6a6; position: relative;}
    .proj-info-bounced section ul.records-flow li span{display: inline-block;position: absolute;left: 0;}
    span.name-icon.job-level1{background-color:#ffb11b;}
    span.name-icon.job-level2{background-color:#ea5510;}
    span.name-icon.job-level3{background-color:#bd183f;}
</style>
<template>
    <Tool-box></Tool-box>
    <div class="proj-info-bounced"   transition="proj-info-bounced" transition-mode="out-in">
        <header>
            <p class="pop-title">
                <span class="font14">任务列表</span>
                <a class="proj-status in-block font14" @click.stop="showAndHide('projFlag',!projFlag)">{{params.taskStateId|dealType}}</a>
                <a class="proj-more in-block font14" @click.stop="showAndHide('moreFlag',!moreFlag)" >更多</a>
                <em class="in-block pop-close" @click.stop="taskInfoPopChangeFlagFun({flag:'openPopFlag',params:false})" ></em>
            </p>
            <ul v-if="projFlag" class="proj-status-list">
                <li :class="params.taskStateId=='1' ? 'pop-choice':''" @click.stop="alertStatus(1)" ><a>待处理</a></li>
                <li :class="params.taskStateId=='2' ? 'pop-choice':''" @click.stop="alertStatus(2)" ><a>进行中</a></li>
                <li :class="params.taskStateId=='6' ? 'pop-choice':''" @click.stop="alertStatus(6)" ><a>已完结</a></li>
            </ul>
            <ul v-if="moreFlag" class="proj-more-list">
                <li @click.stop="alertStatus(3)" ><a>暂停任务</a></li>
                <li @click.stop="alertStatus(4)" ><a>已延迟</a></li>
                <li @click.stop="alertStatus(5)" ><a>已取消</a></li>
            </ul>
            <p class="proj-title editable" title="点击可编剧" contenteditable   @keyup.enter.prevent="alertTitle($event)" >{{params.title}}</p>
        </header>
        <section class="scroll-lst">
            <ul class="set-list border-round" >
                <li class="code">
                    <h6>执行者</h6>
                    <a>
                        <span class="name-icon mright5"> {{params.responsibles | cutTwo}}</span>
                        {{params.responsibles }}
                    </a>
                </li>
                <li class="code">
                    <h6>截止时间</h6>
                    <a class="set-end-date indent30 colora6" @click.stop="open($event,'picker1')"  >
                        <em></em>
                        {{params.endTimeVal?params.endTimeVal:'点击设置'}}
                    </a>

                </li>
                <li class="code" >
                    <h6>优先级</h6>
                    <a class="colora6" @click.stop="showAndHide('priorityFlag',!projFlag)">
                        <span class="name-icon mright5 job-level{{params.priorityId}}"  >&nbsp;</span>
                        {{params.priorityId | prioriName}}
                    </a>
                    <ul v-if="priorityFlag" class="proj-priority-list">
                        <li :class="params.priorityId=='1' ? 'pop-choice':''" @click.stop="alertPriority(1)" ><a>普通</a></li>
                        <li :class="params.priorityId=='2' ? 'pop-choice':''" @click.stop="alertPriority(2)" ><a>紧急</a></li>
                        <li :class="params.priorityId=='3' ? 'pop-choice':''" @click.stop="alertPriority(3)" ><a>非常紧急</a></li>
                    </ul>
                </li>
                <li style="clear: both;"></li>
            </ul>
            <div class="add-remark border-round">
                <p contenteditable class="editable" @keyup.enter.prevent="alertContent($event)" > {{params.content}}</p>
            </div>
            <div class="parts-list border-round" >
                <strong class="parts-title">参与者</strong>
                <p >
                    <span v-for="item in joinLst" class="name-icon">{{item.name | cutTwo}}</span>

                    <em class="add-name in-block"></em>
                </p>
            </div>
            <ul class="child-proj-lst border-round" >
                <Task-info-pop-child
                        v-for="item in subTskLst"
                        :item="item"
                        :id="params.id"
                        :flow-lst="flowLst"
                ></Task-info-pop-child>
                <li v-if="addSubFlag">
                    <div class="add-job-tab" transition="add-job-tab" transition-mode="out-in">
                        <textarea class="editable" placeholder="任务内容" @keyup.enter.prevent="addSubJob($event)" v-model="titleVale" >
                        </textarea>
                        <p class="cteate-job-info">
                            <a  @click.stop="open($event,'picker3')">
                                <em class="time-icon"></em>
                                {{calendar.items.picker3.value?calendar.items.picker3.value:'设置截止时间'}}
                            </a>
                            <span class="name-icon child-name" >{{this.joinLst[0].name | cutTwo}}</span>
                            <a class="cteate-new-job" @click.prevent="addSubJob()">创建</a>
                        </p>
                    </div>
                </li>
                <li v-else class="add" @click.stop="openAddSub">
                    <span ><em  class="add-name in-block"  ></em>添加子任务</span>
                </li>
            </ul>
            <ul class="records-flow" title="操作流水记录">
                <li v-for="item in flowLst">
                    <span>{{item.recordContent}}</span>
                    {{item.createDate}}
                </li>

            </ul>
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
                    :sep="calendar.sep">
            </Tool-calendar>
        </section>
    </div>
    <Public-choose-person
            v-if="chociePer.show"
            :params="chociePer"
    ></Public-choose-person>
</template>
<script>
    import ToolBox from '../public/ToolBox.vue';
    import ToolCalendar from '../public/ToolCalendar.vue';
    import TaskInfoPopChild from './TaskInfoPopChild.vue';
    import PublicChoosePerson from './../public/PublicChoosePerson.vue';
    import {taskInfoPopChangeFlagFun,taskInfoPopInfoJoinPerFun,taskInfoPopInfoFlowFun,taskInfoPopAlterTitleFun,
            taskInfoAlterTiltelInCacheFun,taskInfoPopAlterStatusFun,taskInfoAlterStatusInCacheFun,taskInfoPopAlterContentFun,
            taskInfoAlterContentInCacheFun,taskInfoPopAlertPriorityFun,taskInfoAlertPrioritInCacheFun,taskInfoPopInfoSubLstFun,
            taskInfoShowOrHideErrorFun,taskInfoAddSunJobFun} from '../../actions/taskInfoActions';
    import {contenteditableEnter} from '../../../tool/lib/OptimizeDeal';
    import '../../../tool/lib/DateTool';
    export default{
        components: {
            ToolBox,
            ToolCalendar,
            TaskInfoPopChild,
            PublicChoosePerson
        },
        props:['params'],
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
              taskInfoAddSunJobFun
          }
        },
        data(){
            return {
                titleVale:'',
                projFlag:false,
                moreFlag:false,
                priorityFlag:false,
                addSubFlag:false,   //添加子任务
                joinLst:[],      //参与人列表
                flowLst:[],      //流水列表
                subTskLst:[],      //子任务列表
                title:'',
                chociePer:{
                  show:false,
                  x:0,
                  y:0,
                  add:'',
                  del:'',
                  choiceLst:[]
                },
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
                    items: {
                        // 单选模式
                        picker1: {
                            type: "date",
                            value: "",
                            sep: "-"
                        },
                        picker2:{
                            type:"date",
                            value:"",
                            sep:"-"
                        },
                        picker3:{
                            type:"date",
                            value:"",
                            sep:"-"
                        }
                    }
                }
            }
        },
        methods:{
            openAddSub(){ //打开创建子任务的列表
                this.addSubFlag = true;
            },
            addSubJob(e){    //增加子任务
                const titleVale = this.titleVale.trim();
                (e.target)&&(e.target.textContent = titleVale);
                if(!titleVale) return;
                //缓存里面增加
                const params = {parentId:this.params.id,taskStateId:this.params.taskStateId,title: titleVale, endTimeVal: this.calendar.items.picker3.value,responsibleList:[{"userId": this.joinLst[0].userId,name:this.joinLst[0].name}]};
                //请求后台,并添加id
                this.taskInfoAddSunJobFun({
                        params:params,
                        result:(value)=>{
                    this.flowLst.unshift({"recordContent": `系统管理员 添加了子任务-${titleVale}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                params.id = value.result.id;
                alert(JSON.stringify(params));
                (value.status == 0)
                            ? this.addSubJobInCache(params) //增加id到缓存
                            :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
                    //清空组建缓存
                    this.calendar.value='';
                    this.titleVale = '';
            },
            addSubJobInCache(params){
                this.subTskLst.push(params);
            },
            alertTitle(e){
                const title =  contenteditableEnter(e),
                      params = {id:this.params.id,title:title,type:this.params.taskStateId};
                this.taskInfoPopAlterTitleFun({
                    params:params,
                    result:(value)=>{
                    this.flowLst.unshift({"recordContent": `系统管理员 修改了标题-${title}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                    (value.status == 0)?this.taskInfoAlterTiltelInCacheFun(params):this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                        }
                        });
            },
            showAndHide(type,value){
                this[type] = value;
            },
            alertStatus(num){
                const params = {id:this.params.id,taskStateId:num,oldType:this.params.taskStateId};
                this.taskInfoPopAlterStatusFun({
                    params:params,
                    result:(value)=>{
                    this.flowLst.unshift({"recordContent": `系统管理员 修改了状态`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                (value.status == 0) ?this.taskInfoAlterStatusInCacheFun(params) :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
            },
            alertPriority(num){
                const params = {id:this.params.id,priorityId:num,type:this.params.taskStateId};
                this.taskInfoPopAlertPriorityFun({
                    params:params,
                    result:(value)=>{

                            this.flowLst.unshift({"recordContent": `系统管理员 修改了优先级`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                            this.priorityFlag =false;
                        (value.status == 0) ?this.taskInfoAlertPrioritInCacheFun(params):this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
            },
            alertContent(e){
                const   content =  contenteditableEnter(e),
                        params = {id:this.params.id,content:content,type:this.params.taskStateId};
                this.taskInfoPopAlterContentFun({
                    params:params,
                    result:(value)=>{
                    this.flowLst.unshift({"recordContent": `系统管理员 修改了任务内容`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                (value.status == 0)
                        ?this.taskInfoAlterContentInCacheFun(params)
                        :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                    }
                });
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
            open(e,type) {
                // 设置类型
                this.calendar.picker=type;
                this.calendar.type=this.calendar.items[type].type;
                this.calendar.range=this.calendar.items[type].range;
                this.calendar.begin=this.calendar.items[type].begin;
                this.calendar.end=this.calendar.items[type].end;
                this.calendar.value=this.calendar.items[type].value;
                // 可不用写
                this.calendar.sep=this.calendar.items[type].sep;
                this.calendar.weeks=this.calendar.items[type].weeks;
                this.calendar.months=this.calendar.items[type].months;

                this.calendar.show=true;
                this.calendar.x=e.target.offsetLeft;
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8;
            }
        },
        watch:{
            'calendar.value': function(value) {
                this.calendar.items[this.calendar.picker].value=value
            }
        },
        ready(){
            this.queryJoinLst(); //查询参与人列表
            this.queryTskFlowLst(); //查询流水列表
            this.querysubTskLst(); //查询子任务列表
        }

    }
</script>
