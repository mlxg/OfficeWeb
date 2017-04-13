<style>
    .m-conter ul.gallery-list {height: 100%;width: 100%; overflow: hidden;}
    .m-conter ul.gallery-list li.gallery-tab header h3{text-align: center;  font-size: 15px;font-weight: 700;line-height: 60px;}
    .m-conter ul.gallery-list li.gallery-tab {width: 288px;height: 100%;float: left;min-height: 600px;border-radius: 3px;background-color: #eee;margin-right: 30px;}
    .m-conter ul.gallery-list li.gallery-tab section{padding: 0 3%;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list li.gallery-job, p.add-job-tab{position: relative;background-color: #fff;  border-radius: 3px;box-shadow: 0 1px 2px rgba(0,0,0,.1);cursor: pointer;min-height: 80px;margin-bottom: 10px;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job .job-level{border-bottom-left-radius: 3px; border-top-left-radius: 3px;position: absolute; left:0;height: 100%;width: 4px;cursor: pointer;transition: width 218ms ease-in,opacity 218ms ease-in;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job .job-level:hover{width: 20px;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job ul.level-list{position: absolute;top:100%;left: 0;width: 50%;box-shadow: 0 1px 2px rgba(0,0,0,.1);border-radius: 4px;  background-color: #fff;padding: 2px 4px;z-index: 2;transition: all .4s ease;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job ul.level-list-enter,.m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job ul.level-list-leave{ opacity: 0; transform: translate3d(0,-10px, 0);}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job ul.level-list li{margin-top: 2px;text-indent:40px;border-radius: 3px;width: 100%;font-size: 14px; color: white;line-height: 28px;}
    ul.level-list li.choice{background:url("../../images/level-choice.png") 10px no-repeat;}
    ul.level-list li.level-ordinary,ul.job-list .gallery-job .job-level1{background-color:#ffb11b;}
    ul.level-list li.level-emergency,ul.job-list .gallery-job .job-level2{background-color:#ea5510;}
    ul.level-list li.level-visit,ul.job-list .gallery-job .job-level3{background-color:#bd183f;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job p{padding:15px 10px 10px 40px; word-break: break-all;word-wrap:break-word;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job p.job-icon {padding-top: 0;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job p.job-icon span{display: inline-block;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job p.job-icon span.end-time{padding: 3px;background-color: #ff3c00;color: white;border-radius:2px;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job p.job-icon span.job-describe{height: 16px;width: 16px;vertical-align: middle;margin-left: 14px;background: url("../../images/proj-info.png") 100% transparent no-repeat;}
    .m-conter ul.gallery-list li.gallery-tab ul.job-list .gallery-job p.job-icon span.job-head{background-color: #278EED;border-radius: 12px;height: 24px;width:24px;color: white;position: absolute;right: 20px;bottom: 20px; line-height: 24px;}
    .m-conter ul.gallery-list li.gallery-tab a.add-job{display: inline-block;width: 100%;text-align: center;line-height: 32px;margin-top: 10px;font-size: 16px;color: #03a9f4; transition: color 218ms ease;}
    .m-conter ul.gallery-list li.gallery-tab a.add-job:hover{color:#278eed; transition: color 218ms ease;}
    [draggable] {-moz-user-select: none;-khtml-user-select: none;-webkit-user-select: none;user-select: none;-khtml-user-drag: element;-webkit-user-drag: element;}
    .dragging {opacity: 0.8;}
</style>
<template>
        <div class="m-conter">
            <Public-loading
                    v-if="!taskInfoGetPopProjInfoLst"
            >
            </Public-loading>
            <ul v-else class="gallery-list">
                <Public-gallery-tab
                        v-drag-and-drop drop="handleImageDrop"
                        v-for="item in taskInfoGetPopProjInfoLst.result"
                        :params="item"
                ></Public-gallery-tab>
            </ul>
        </div>
    <Task-info-archive
            v-if="taskInfoGetArSlidingFlag"
    >
    </Task-info-archive>
    <Tool-error>
    </Tool-error>
    <a @click="taskInfoArchiveFlagFun(true)">测试</a>
</template>
<script>
    import PublicGalleryTab from '../public/PublicGalleryTab.vue';
    import TaskInfoArchive from './TaskInfoArchive.vue';
    import ToolError from '../public/ToolError.vue';
    import PublicLoading from '../public/PublicLoading.vue';
    import {taskInfoArchiveFlagFun,taskInfoGetprojLstFun,taskInfoPopAlterStatusFun
            ,taskInfoAlterStatusInCacheFun,taskInfoShowOrHideErrorFun,taskInfoGetPersonFun} from '../../actions/taskInfoActions';
    import {taskInfoGetArSlidingFlag,taskInfoGetPopProjInfoLst} from '../../getters/taskInfoGetter';
    export default{
        components:{
            PublicGalleryTab,
            TaskInfoArchive,
            ToolError,
            PublicLoading
        },
        vuex:{
            actions:{
                taskInfoArchiveFlagFun,     //开启归档标志
                taskInfoGetprojLstFun,       //获取我的任务列表
                taskInfoPopAlterStatusFun,
                taskInfoAlterStatusInCacheFun,
                taskInfoShowOrHideErrorFun,
                taskInfoGetPersonFun
            },
            getters:{  //任务详情标志
                taskInfoGetArSlidingFlag,  //归档弹框标志
                taskInfoGetPopProjInfoLst  //我的任务列表
            }
        },
        methods: {
            handleImageDrop: function(itemOne, itemTwo) {
                if (itemTwo.getAttribute('id').length >1) return;
                console.log('handleImageDrop', itemOne.getAttribute('id'),itemOne.getAttribute('oldType'), itemTwo.getAttribute('id'));
                const params = {"id":itemOne.getAttribute('id'),"taskStateId":itemTwo.getAttribute('id'),"oldType":itemOne.getAttribute('oldType')};
                this.taskInfoAlterStatusInCacheFun(params);
                this.taskInfoPopAlterStatusFun({
                            params:params,
                            result:(value)=>{
                (value.status == 0) ?'':this.taskInfoShowOrHideErrorFun(value.message);//做报错处理
                }
            });
            }
        },
        ready(){
            const params = {projectId:this.$route.params.id};
            this.taskInfoGetprojLstFun(params);
            this.taskInfoGetPersonFun();

        }
    }
</script>
