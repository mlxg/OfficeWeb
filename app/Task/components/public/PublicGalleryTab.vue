<style>
    li.gallery-tab  div.add-job-tab {padding: 10px;position: relative;background-color: white; transition: all .3s ease;}
    li.gallery-tab  div.add-job-tab-enter,li.gallery-tab  div.add-job-tab-leave{opacity: 0; transform: translate3d(0,-10px, 0);}
    li.gallery-tab  div.add-job-tab  em.time-icon{background: url("../../images/choice-date.png") 0/100% no-repeat transparent ;display: inline-block;width: 18px;height: 18px;vertical-align: middle;}
    li.gallery-tab  div.add-job-tab  textarea{height: 60px;resize: vertical;overflow:auto;border: 1px solid #d9d9d9;background-color: white;width: 100%; padding: 8px 12px;color: #383838;  box-shadow: none;}
    li.gallery-tab  div.add-job-tab p.cteate-job-info {padding:15px 0; position: relative;}
    li.gallery-tab  div.add-job-tab p.cteate-job-info  a.cteate-new-job{ display: inline-block; color: #fff; background-color: #14b4fc;width: 72px; padding: 8px 12px; font-size: 14px;line-height: 20px;text-align: center;vertical-align: middle;cursor: pointer;border: 1px solid #d9d9d9;border-radius: 3px; position: absolute;right: 0;}
</style>
<template>
    <li draggable="true" class="gallery-tab" id="{{params.taskStateId}}">
        <header><h3>{{params.taskStateId| dealType}} <span>{{!!params.list.length ? params.list.length:''}}</span></h3></header>
        <section>
            <ul class="job-list">
                <Public-job
                        v-for="item in params.list"
                        :params="item"
                > </Public-job>
            </ul>
            <div v-if="addJobFlag"  class="add-job-tab" transition="add-job-tab" transition-mode="out-in">
                <textarea class="editable" placeholder="任务内容" @keyup.enter.prevent="addJob($event)" v-model="titleVale" >
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
                            :end.sync="calendar.end"
                            :range.sync="calendar.range"
                            :weeks="calendar.weeks"
                            :months="calendar.months"
                            :sep="calendar.sep">
                    </Tool-calendar>
                    <span class="name-icon child-name" >彭峰</span>
                    <a class="cteate-new-job" @click.prevent="addJob()">创建</a>
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
    export default{
        components:{
            PublicJob,
            ToolCalendar
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
                    range: false
                }
            }
        },
        methods:{
            addJob(){
                const titleVale =  this.titleVale.trim();
                if(!titleVale) return;
                //缓存里面增加
                const params = {taskStateId:this.params.taskStateId,projectId:this.$route.params.id,title: titleVale,responsibles:'待定',"responsibleList": [{"userId": "00510d53bca34fdbaf762effdb280575"}],endTimeVal: this.calendar.value,id:'noPut'};
                this.taskInfoAddJobInCacheFun(params);
                //请求后台,并添加id
                this.taskInfoAddJobInFun({
                            params:params,
                            result:(value)=>{
                            const addCacheParam = {type:this.params.taskStateId,id:value.result.id};
                            (value.status == 0)
                                    ?this.taskInfoAddJobIdInCacheFun(addCacheParam)//增加id到缓存
                                    :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
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
            }
        }

    }
</script>
