<style>
    .sliding-screen-transition { transition: right .5s ease; height: 100%;width: 50%;right: 0; position: fixed;  top:0; background-color: white; box-shadow: 0 7px 21px rgba(0,0,0,.15);-moz-box-shadow: 0 7px 21px rgba(0,0,0,.15);-o-box-shadow:0 7px 21px rgba(0,0,0,.15);opacity: .95; }
    .sliding-screen-enter,.sliding-screen-leave{right: -50%; -webkit-transform: translateX(0); -ms-transform: translateX(0); -o-transform: translateX(0); transform: translateX(0); }
    .sliding-screen-transition section ul.archive-lst{padding: 13px 20px;}
    .sliding-screen-transition section ul.archive-lst li{overflow: hidden;word-wrap: break-word;border-bottom:1px solid #eeeeee;color: #383838; }
    .sliding-screen-transition section ul.archive-lst li:first-child{border-top:1px solid #eeeeee;}
    .sliding-screen-transition section ul.archive-lst li:hover{background-color:#ECEBEB;}
    .sliding-screen-transition section ul.archive-lst li span{float: left;display: inline-block;width: 33%;text-align: left;text-overflow: ellipsis; white-space: nowrap;overflow: hidden;font-size: 14px;line-height: 40px;}
    .sliding-screen-transition section ul.archive-lst li span.last-child{text-align: right;}
    .sliding-screen-transition section ul.archive-lst li  a{ line-height: 40px;display: inline-block; width: 33%; cursor: pointer;text-align: right;}
    .sliding-screen-transition section ul.archive-lst li  a em{ line-height: 40px;display: inline-block; width: 16px;height: 16px; background: url("../../images/restore-back.png") no-repeat transparent;margin-right: 5px;}
    .sliding-screen-transition section ul.archive-lst li  a:hover{color:#337ab7;border-bottom: 0;}
    .sliding-screen-transition header .proj-title {position: relative;width: 50%;text-align:center;padding:7px 0;margin:auto;font-size: 18px;}
    .sliding-screen-transition header .proj-title em.query-icon{display: inline-block;height: 16px;width: 16px;background:url("../../images/query-icon.png") no-repeat transparent;position: absolute;left: 5px; top: 17px;}
    .sliding-screen-transition header .proj-title input{ padding:0 23px; width: 100%;height: 36px;border: 0;outline: none; background-color: #eeeeee;}
    .sliding-screen-transition header p.pop-title em.pop-close{position: absolute;height: 16px;width: 16px;background: url("../../images/pop-close.png")  no-repeat transparent; right: 32px;top:25px;cursor: pointer;}
    .sliding-screen-transition header p.pop-title {text-align: center;font-size: 18px;  margin-top: 22px;}
</style>
<template>
    <div  transition="sliding-screen"  transition-mode="out-in" >

        <header>
            <p class="pop-title" >
                查看归档
                <em class="in-block pop-close" @click="taskInfoArchiveFlagFun(false)" ></em>
            </p>
            <p class="proj-title"  >
                <em class="query-icon" ></em>
                <input class="editable" type="text" v-model="queryLst" @keyup.enter="queryKey(queryLst)"></p>
        </header>
        <section class="scroll-lst">

            <ul class="archive-lst" >
               <Task-info-archive-li
                        v-for="item in taskInfoGetArchive.result.list | filterBy queryLst"
                        :params="item"

                >
                </Task-info-archive-li>
            </ul>
        </section>
    </div>
</template>
<script>
    import TaskInfoArchiveLi from './TaskInfoArchiveLi.vue';
    import {taskInfoArchiveFlagFun,taskInfoGetArchiveFun} from '../../actions/taskInfoActions';
    import {taskInfoGetArchive} from '../../getters/taskInfoGetter';
    export default{
        components:{
            TaskInfoArchiveLi
        },
        vuex:{
          getters:{
              taskInfoGetArchive
          },
          actions:{
              taskInfoArchiveFlagFun,
              taskInfoGetArchiveFun

          }
        },
        data(){
            return{
                queryLst:''
            }
        },
        methods:{
            queryKey(keyWord){
                alert("查询"+keyWord+"关键字");
                this.queryLst= "";
                this.taskInfoGetArchiveFun(keyWord);

            }
        },

        ready(){
            this.taskInfoGetArchiveFun();
        }
    }
</script>
