<style>
    li.gallery-tab  div.add-job-tab {padding: 10px;position: relative;background-color: white; transition: all .3s ease;text-align: left;box-shadow: 0 1px 2px rgba(0,0,0,.1);}
    li.gallery-tab  div.add-job-tab-enter,li.gallery-tab  div.add-job-tab-leave{opacity: 0; transform: translate3d(0,-10px, 0);}
    li.gallery-tab  div.add-job-tab  em.time-icon{background: url("../../images/choice-date.png") 0/100% no-repeat transparent ;display: inline-block;width: 18px;height: 18px;vertical-align: middle;}
    li.gallery-tab  div.add-job-tab .pop-close{
      position: absolute;
      right: -4px;
      top: -4px;
      height: 16px;
      width: 16px;
      background: #fff url(../../images/pop-close.png) no-repeat center/60%;
      border-radius: 50%;
      border: #c1c1c1 solid 1px;
      cursor: pointer;
      box-shadow: 0 0 5px 0 rgba(0,0,0,.15);
    }
    li.gallery-tab  div.add-job-tab .pop-close:hover{border-color: #f1b9b9; box-shadow: 0 0 5px 0 rgba(253, 58, 58, 0.15);}
    li.gallery-tab  div.add-job-tab  textarea{height: 60px;resize: vertical;overflow:auto;border: 1px solid #d9d9d9;background-color: white;width: 100%; padding: 8px 12px;color: #383838;  box-shadow: none;}
    li.gallery-tab  div.add-job-tab p.cteate-job-info {padding:15px 0; position: relative;}
    li.gallery-tab  div.add-job-tab p.cteate-job-info  a.cteate-new-job{ display: inline-block; color: #fff; background-color: #14b4fc;width: 72px; padding: 8px 12px; font-size: 14px;line-height: 20px;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid #d9d9d9;border-radius: 3px; position: absolute;right: 0;}
</style>
<template>
    <li draggable="true" class="gallery-tab" id="{{params.taskStateId}}">
        <header class="inline">{{params.taskStateText}} <span>({{params.list.length}})</span></header>
        <section>
            <ul class="job-list">
                <Public-job
                        v-for="item in params.list"
                        :params="item"
                > </Public-job>
            </ul>
            <div v-if="addJobFlag"  class="add-job-tab" transition="add-job-tab" transition-mode="out-in">
                <em class="in-block pop-close" @click="this.addJobFlag = false"></em>
                <textarea class="form-control" placeholder="任务内容" @keyup.enter.prevent="addJob($event)" v-model="titleVale" >
                </textarea>
                <p class="cteate-job-info">
                    <a  @click.stop="open($event)">
                        <em class="time-icon"></em>
                        {{calendar.value?calendar.value:'设置截止时间'}}
                    </a>
                    <Tool-calendar
                            :show.sync="calendar.show"
                            :type="calendar.type"
                            :value.sync="calendar.value"
                            :x="calendar.x"
                            :y="calendar.y"
                            :begin.sync="calendar.begin"
                            :sep.sync="calendar.sep">
                    </Tool-calendar>
                    <span v-for="item in chociePer.personList" class="name-icon child-name" @click="chociePerson" style="margin-left: 10px; cursor: pointer;">
                      {{item.name | cutTwo}}
                    </span>
                    <a class="cteate-new-job" @click.prevent="addJob()">创建</a>
                    <Public-choose-person
                      :left="chociePer.left"
                      :show.sync="chociePer.show"
                      :top="chociePer.top"
                      :person-list.sync="chociePer.personList"
                    ></Public-choose-person>
                </p>
            </div>
            <a v-else class="add-job" @click.prevent="showAdd()">添加任务</a>
        </section>
    </li>
</template>
<script>
    import PublicJob from './PublicJob.vue';
    import ToolCalendar from '../public/ToolCalendar.vue';
    import {preventDefault,stopPropagation} from '../../../tool/lib/OptimizeDeal';
    import {taskInfoAddJobInCacheFun,taskInfoAddJobInFun,taskInfoAddJobIdInCacheFun,taskInfoShowOrHideErrorFun} from'../../actions/taskInfoActions';
    import {taskInfoGetAddJobRlt} from'../../getters/taskInfoGetter';
    import '../../../tool/lib/DateTool'
    import PublicChoosePerson from './../public/PublicChoosePerson.vue';
    export default{
        components:{
            PublicJob,
            ToolCalendar,
            PublicChoosePerson
        },
        props:['params'],
        vuex:{
            actions:{
                taskInfoAddJobInCacheFun,
                taskInfoAddJobInFun,
                taskInfoAddJobIdInCacheFun,
                taskInfoShowOrHideErrorFun
            },
            getters:{
                taskInfoGetAddJobRlt
            }
        },
        data(){
            return {
                addJobFlag:false,           //增加任务的标志
                titleVale:'',               //任务标题的值
                headVale:'',                //负责人的值
                chociePer:{
                  show: false,
                  left: 0,
                  top: 45,
                  personList: [{
                    userId: sessionStorage.getItem('userId'),
                    name: sessionStorage.getItem('userName')
                  }]
                },
                calendar: {
                    show: false,
                    x: 0,
                    y: 0,
                    value: "",
                    begin: '',
                    sep:"-"
                }
            }
        },
        methods:{
            addJob(){
                let titleVale =  this.titleVale.trim();
                if(!titleVale) return;
                //缓存里面增加
                let date = this.calendar.value;
                date && (date = (new Date(date)).format('yyyy-MM-dd hh:mm:ss'))
                let params = {taskStateId:this.params.taskStateId,projectId:this.$route.params.id,title: titleVale,"responsibleList": this.chociePer.personList,endTime: date, endTimeVal: this.calendar.value, responsibles: this.chociePer.personList[0].name};
//                this.taskInfoAddJobInCacheFun(params);
                //请求后台,并添加id
                this.taskInfoAddJobInFun({
                            params:params,
                            result:(value)=>{
                              params.id = value.result.id;
                              params.priorityId = '2';
                              params.createUserId = sessionStorage.getItem('userId');
                            (value.status == 0)
                                    ?this.taskInfoAddJobInCacheFun(params)//增加到缓存
                                    :this.taskInfoShowOrHideErrorFun(value.message, this.params.taskStateId);//做报错处理
                        }
            });
                //清空组建缓存
                this.calendar.value='';
                this.titleVale = '';
            },
            open(e) {
                this.calendar.show=true;
                this.calendar.x=e.target.offsetLeft;
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8;
            },
            showAdd(){
                this.addJobFlag = true;
            },
            chociePerson(){
              this.chociePer.show = true
            }
        }

    }
</script>
