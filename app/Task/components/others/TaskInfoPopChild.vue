<template>
    <li >
        <em class="check-box in-block" :class="checkFlg?'choice':''" @click.stop="change('checkFlg')"></em>
        <p contenteditable class="proj-title editable in-block" @keyup.enter.prevent="alertSubTitle($event)">{{item.title}}</p>
        <a v-if="item.endTimeVal" @click.stop="open($event)">{{item.endTimeVal}}</a>
        <em v-else class="time-icon in-block " @click.stop="open($event)"></em>
        <span class="name-icon child-name" >{{item.responsibleList[0].name}}</span>
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
            :sep="calendar.sep">
    </Tool-calendar>
</template>
<script>
    import ToolCalendar from '../public/ToolCalendar.vue'
    import {taskInfoPopInfoSubLstFun,taskInfoPopAlterTitleFun,taskInfoShowOrHideErrorFun} from '../../actions/taskInfoActions';
    import {contenteditableEnter} from '../../../tool/lib/OptimizeDeal';
    import '../../../tool/lib/DateTool';
    export default{
    components: {
        ToolCalendar
        },
        props:['id','item','flowLst'],
        vuex:{
          actions:{
              taskInfoPopInfoSubLstFun,
              taskInfoPopAlterTitleFun,
              taskInfoShowOrHideErrorFun

          }
        },
        data(){
            return {
                checkFlg:false,
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
            open(e) {
                this.calendar.show=true;
                this.calendar.x=e.target.offsetLeft;
                this.calendar.y=e.target.offsetTop+e.target.offsetHeight+8;
            },
            change(type){
                this[type] = !this[type];
            },
            alertSubTitle(e){
                const title =  contenteditableEnter(e),
                        params = {id:this.item.id,title:title};
                this.taskInfoPopAlterTitleFun({
                    params:params,
                    result:(value)=>{
                    this.flowLst.unshift({"recordContent": `系统管理员 修改了子任务标题-${title}`,"createDate": (new Date()).format("yyyy-MM-dd hh:mm:ss")});
                (value.status == 0)
                        ?this.alertSubTileInCache(params)
                        :this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
            }
            });
            },
            alertSubTileInCache({id,title}){
                this.item.title= title;
            }
        }
    }
</script>
