<!-- 流程中心 --- 待办审批流程 ---  -->
<template>
<h3 class="u-fs20 g-tc">转正申请</h3>
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label g-tr">招聘编号：</label>
        <div class="col-sm-4">
            <span class="writing">{{post.serialNo}}</span>
        </div>
        <label for="" class="col-sm-2 control-label g-tr" type="date">转正人：</label>
        <div class="col-sm-4">
            <span class="writing g-tf">{{post.cnName}}</span>
        </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">所在部门：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.createOfficeName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人部门：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.officeName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.urgencyDegreeDispay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人职位：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.positionsDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">入职时间：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.entrantTime}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人职级：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.positionsLevelDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr" type="date">计划转正时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.formalTime}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">实际转正时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.realTime}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">主要业绩：</label>
            <div class="col-sm-8">
                <span class="writing g-tf">{{post.performance}}</span>
            </div>
        </div>
        <!--<div class="form-group clearfix">-->
            <!--<label for="" class="col-sm-2 control-label g-tr">附件：</label>-->
            <!--<div class="col-sm-8">-->
                <!--<span class="writing">人事专员</span>-->
            <!--</div>-->
        <!--</div>-->
    </Tip-border>
    <Tip-border tip="转正绩效评估表" v-if="this.isPrimaryPerson == '0'">
        <table class="evaluation">
            <tr>
                <td></td>
                <th>评估指标</th>
            </tr>
            <tr v-for="item in evaluationYg">
                <th>{{item.name}}</th>
                <td>
                    <div v-for="item1 in item.index">
                        <b>{{item1.action}}</b></br>
                        <p v-for="item2 in item1.rat">{{item2.a}}</p>
                    </div>
                </td>
            </tr>
        </table>
    </Tip-border>

    <Tip-border tip="转正绩效评估表"  v-if="this.isPrimaryPerson == '1'">
        <table class="evaluation">
            <tr>
                <td></td>
                <th>评估指标</th>
            </tr>
            <tr v-for="item in evaluation">
                <th>{{item.name}}</th>
                <td>
                    <div v-for="item1 in item.index">
                        <b>{{item1.action}}</b></br>
                        <p v-for="item2 in item1.rat">{{item2.a}}</p>
                    </div>
                </td>
            </tr>
        </table>
    </Tip-border>
    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <div class="form-group g-tc g-marginT20" v-if="this.status == '1' || this.status == '6'">
        <button type="button" class="btn btn-primary g-marginR30" @click="deleteTask" v-if='types == "application"'>删除</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="withdraw">撤回</button>
        <button v-if="this.types=='application'" type="button" class="btn btn-primary g-marginR30" @click="reminders">催办</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import PublicModal from '../../components/public/PublicModal'
    export default{
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            Crumb,
            TipBorder,
            ProcessDiagram,
            ApproveList,
            PublicModal
        },
        data: function(){
            return {
                evaluation:[
                    {
                        name: '工作业绩（60%）',
                        index:[
                            {
                                action:"设定的工作计划或目标的完成情况（40%）",
                                rat:[
                                    {a:'优：达成率95%及以上（95分以上）'},
                                    {a:'良：达成率90~94%（90~94-分）'},
                                    {a:'中：达成率76~89%（76~89分）'},
                                    {a:'可：达成率55~75%（55~75分）'},
                                    {a:'差：达成率54%及以下（0~50分）'},
                                ]
                            },
                            {
                                action:"管理执行力度：内部管理执行到位（20%）",
                                rat:[
                                    {a:'优：内部管理清晰，管理执行到位（95分以上）'},
                                    {a:'良：内部管理较清晰，管理执行基本到位（76~94分）'},
                                    {a:'可：内部管理还算清晰，管理执行力度时紧时松（56~75分）'},
                                    {a:'差：内部管理不清晰或管理执行不到位（0~50分）'},
                                ]
                            },
                        ]
                    },
                    {
                        name: '工作能力（15%）' ,
                        index:[
                            {
                                action:"专业能力：专业水平的宽度与深度（5%）",
                                rat:[
                                    {a:'优：专业水平高,能得到公司同仁的推崇，且能产生好的绩效（95分以上）'},
                                    {a:'良：专业水平较好,能得到公司同仁的认可，也能产生较好的绩效（76~94分）'},
                                    {a:'中：专业水平一般,基本能得到认可，产生的绩效达不到基本标准（56~75分）'},
                                    {a:'差：专业水平不佳,不能得到认可，绩效不佳（0~50分）'},
                                ]
                            },
                            {
                                action:"个人沟通能力：内、外部沟通顺畅，信息传递达到管理沟通之目标（5%）",
                                rat:[
                                    {a:'优：沟通通路很顺畅，通路维护佳,具良好的沟通技巧（95分以上）'},
                                    {a:'良：沟通通路顺畅，具一定的沟通技巧（90~94分）'},
                                    {a:'中：沟通通路较顺畅，具基本的沟通技巧（76~89分）'},
                                    {a:'可：沟通通路不太顺畅，沟通技巧较差（55~75分）'},
                                    {a:'差：沟通通路不顺畅，沟通态度和技巧差（0~50分）'},
                                ]
                            },
                            {
                                action:"解决问题的能力：对产生的问题及困难能快速准确提出方案，执行后的结果能达到管理要（5%）",
                                rat:[
                                    {a:'优：能前瞻性进行问题的危机管理，并有相应的流程方案支持（95分以上）'},
                                    {a:'良：能前瞻性进行问题的危机管理，相应的流程方案支持不够精细（90~94分）'},
                                    {a:'中：基本能利用自己的能力解决问题（76~89分）'},
                                    {a:'可：能利用自己的能力解决大部分问题（55~75分）'},
                                    {a:'差：能利用自己的能力解决个别问题（0~50分）'},
                                ]
                            }
                        ]
                    },
                    {
                        name: '团队建设（15%）' ,
                        index:[
                            {
                                action:"部门与部门间协作：部门与部门协作顺畅，协作部门的认可度（7%）",
                                rat:[
                                    {a:'优： 协作顺畅，得到协作部门的嘉许（95分以上）'},
                                    {a:'良： 协作较顺畅，得到协作部门的认可（76~94分）'},
                                    {a:'中： 协作基本顺畅，也能得到协作部门的配合（56~75分）'},
                                    {a:'差： 协作不顺畅（0~50分）'},
                                ]
                            },
                            {
                                action:"部门成员士气：士气旺盛程度，成员间协作顺畅度（8%）",
                                rat:[
                                    {a:'优：士气旺盛，成员间协作顺畅（95分以上）'},
                                    {a:'良：士气旺盛，成员间协作较顺畅（76~94分）'},
                                    {a:'中：士气一般，成员间协作不畅（56~75分）'},
                                    {a:'差：士气低迷，成员间协作差（0~50分）'},
                                ]
                            }
                        ]
                    },
                    {
                        name: '行为规范（10%）' ,
                        index:[
                            {
                                action:"个人操守：个人行为能以身作则，为同仁的表率（10%）",
                                rat:[
                                    {a:'优：以身作则，能成为同仁的表率 (95分以上)'},
                                    {a:'良：以身作则，得到同仁认可 (76~94分)'},
                                    {a:'中：个人行为较好，基本无造成负面的影响(56~75分)'},
                                    {a:'差：个人行为一般（0~50分）'},
                                ]
                            },
                        ]
                    },
                ],
                evaluationYg:[
                    {
                        name: '工作能力25% ',
                        index:[
                            {
                                action:"专业技能：（9%）",
                                rat:[
                                    {a:'优：具丰富的专业知识，较高技术水平，精通业务内容（95分以上）'},
                                    {a:'良：具有较好的专业知识和技能，熟悉业务内容（76~94分）'},
                                    {a:'中：专业水平一般，基本了解相关业务内容（56~75分）'},
                                    {a:'差：专业知识不足，不了解相关业务内容（0~50分）'},
                                ]
                            },
                            {
                                action:"改善能力：（8%）",
                                rat:[
                                    {a:'优：善于发现问题，积极主动改进，提高工作效率和质量（95分以上）'},
                                    {a:'良：基本能发现问题，并妥善处理解决（76~94分）'},
                                    {a:'可：本职工作需上级指导才得以改进工作（56~75分）'},
                                    {a:'差：无改进工作的能力（0~50分）'},
                                ]
                            },
                            {
                                action:"执行力：（8%）",
                                rat:[
                                    {a:'优：全面落实有关工作计划，实现组织目标，能随机应变（95分以上）'},
                                    {a:'良：能理解和按时完成工作任务（76~94分）'},
                                    {a:'可：时有督导才得以完成工作任务（56~75分）'},
                                    {a:'差：经常督导也无法完成工作任务（0~50分）'},
                                ]
                            },
                        ]
                    },
                    {
                        name: '工作绩效45% ' ,
                        index:[
                            {
                                action:"工作计划（目标）达成状况：",
                                rat:[
                                    {a:'优：达成率95%及以上（95分以上）'},
                                    {a:'良：达成率90~94%（90~94分）'},
                                    {a:'中：达成率75~89%（75~89分）'},
                                    {a:'可：达成率55~75%（55~75分）'},
                                    {a:'差：达成率55%及以下（0分）'},
                                ]
                            },
                        ]
                    },
                    {
                        name: '工作态度30% ' ,
                        index:[
                            {
                                action:"作风纪律：（8%）",
                                rat:[
                                    {a:'优： 工作热情高，遵守纪律，对同事和上级热情（95分以上）'},
                                    {a:'良： 有工作热情，不违反纪律，对同事和上级较热情（76~94分）'},
                                    {a:'中： 工作热情一般，偶尔有违反纪律现象，对同事和上级一般（56~75分）'},
                                    {a:'差： 工作热情不高，经常违反纪律（0~50分）'},
                                ]
                            },
                            {
                                action:"积极性：（8%）",
                                rat:[
                                    {a:'优：不满足现状，积极改进工作，全面提高工作成效（95分以上）'},
                                    {a:'良：能主动提高工作水平，完成工作任务（76~94分）'},
                                    {a:'中：能按照时完成工作任务，工作水平一般（56~75分）'},
                                    {a:'差：积极性不高，工作拖沓（0~50分）'},
                                ]
                            },
                            {
                                action:"责任感：（7%）",
                                rat:[
                                    {a:'优：责任感强，全面达成交付工作，勇于面对困难并解决，可信任（95分以上）'},
                                    {a:'良：责任感较强，能解决工作实际问题，偶尔出错，但能及时纠正（76~94分）'},
                                    {a:'中：责任感一般，工作必须跟进才得以完成（56~75分）'},
                                    {a:'差：责任感差，常难以独立完成工作任务，经常找借口推卸责任（0~50分）'},
                                ]
                            },
                            {
                                action:"协作性：（7%）",
                                rat:[
                                    {a:'优：经常配合协作，协助相关部门或同事工作（95分以上）'},
                                    {a:'良：基本配合协作（76~94分）'},
                                    {a:'中：偶尔协作配合；（56~75分）'},
                                    {a:'差：不配合，不协作，自我为中心（0~50分）'},
                                ]
                            }
                        ]
                    }
                ],
                post:{

                },
                isPrimaryPerson:'',
                isShow: false,
                types:'',
                status:'',
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                apiUrl:''
            }
        },
        created: function(){
          let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
          this.businessKey = hash[3].match(/\w+/)[0];
          this.humanTaskId = hash[1].match(/\w+/)[0];
          this.taskId = hash[2].match(/\w+/)[0];
          this.types = hash[5].match(/\w+/)[0];
          this.taskform = hash[0].match(/\w+/)[0];
          this.loadData();
          if (this.humanTaskId!=0) {
            this.processStatus();
          };
        },
        methods:{
            cancelProcess: function () {
            this.$router.go('/process/dispose')
            },
            loadData: function () {
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDAPPLY,{id:this.businessKey}).then(function (response) {
                    let Data = response.json().result;
                    that.post = Data;
                    that.isPrimaryPerson = Data.isPrimaryPerson;
                })
            },
            //删除流程
            deleteTask: function(){
                let vm = this;
                vm.options = {
                  title: '温馨提示',
                  message: '确认删除吗？删除后数据不可恢复哦',
                  icon: 'warning',
                  isShow: true
                };
                vm.confirm = {
                  text: '确定',
                  callback: function () {
                vm.apiUrl = interfaces.INTERFACE_DELETEPROCESS
                vm.userId = sessionStorage.getItem("loginName");
                vm.$http.post(content.STAROFFICE_ACT + vm.apiUrl,{humanTaskId:vm.humanTaskId,userId:vm.userId}).then(function (response) {
                    let Data = response.json().status;
                    if(Data == '0'){
                        vm.options = {
                            title: '温馨提示',
                            message: '删除成功！',
                            icon: 'success',
                            isShow: true
                        };
                        vm.confirm = {
                            text: '确定',
                            callback: function () {
                                if(vm.types == 'dispose'){
                                    vm.$router.go('/process/dispose');
                                }else{
                                    vm.$router.go('/process/application');
                                }
                                vm.options.isShow = false;
                            }
                        };
                    }
                })
                    vm.options.isShow = false;
                  }
                };
                vm.close = {
                  callback: function () {
                    vm.options.isShow = false;
                  }
                };
                vm.cancel = {
                  text: '取消',
                  callback: function () {
                    vm.options.isShow = false;
                  }
                }
            },
            //我的申请撤回  我的经办撤回
            withdraw: function(){
                let that = this;
                if(!this.types)return false;
                if(this.types == 'dispose'){
                    this.apiUrl = interfaces.INTERFACE_WITHDRAWTASK
                }else{
                    this.apiUrl = interfaces.INTERFACE_ABORTAPPLYPROCESS
                }
                this.userId = sessionStorage.getItem("loginName");
                this.$http.post(content.STAROFFICE_ACT + this.apiUrl,{humanTaskId:this.humanTaskId,userId:this.userId}).then(function (response) {
                    let Data = response.json().status;
                    if(Data == '0'){
                        that.options = {
                            title: '温馨提示',
                            message: '撤回成功！',
                            icon: 'success',
                            isShow: true
                        };
                        that.confirm = {
                            text: '确定',
                            callback: function () {
                                if(that.types == 'dispose'){
                                    that.$router.go('/process/dispose');
                                }else{
                                    that.$router.go('/process/application');
                                }
                                that.options.isShow = false;
                            }
                        };
                    }
                })
            },
            //催办
            reminders: function () {
                let that = this;
                if(!this.types)return false;
                this.userId = sessionStorage.getItem("loginName");
                this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_REMINDERTASK,{humanTaskId:this.humanTaskId,userId:this.userId}).then(function (response) {
                    let Data = response.json().status;
                    if(Data == '0'){
                        that.options = {
                            title: '温馨提示',
                            message: '催办成功！',
                            icon: 'success',
                            isShow: true
                        };
                        that.confirm = {
                            text: '确定',
                            callback: function () {
                                that.$router.go('/process/application');
                                that.options.isShow = false;
                            }
                        };
                    }
                })
            },
            //判断流程状态
            processStatus: function(){
                let that = this;
                this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSSTATUS,{humanTaskId:this.humanTaskId}).then(function (response) {
                    let Data = response.json().result;
                    that.status = Data.status;
                })
            }
        }
    }
</script>
<style lang="less">
    .evaluation{
        width: 80%;
    }
    .evaluation th{
        text-align: center;
    }
    .evaluation td,.evaluation th{
        border: 1px solid #ccc;
        padding: 15px;
    }
    .evaluation p,.evaluation b{
        font-size: 14px;
    }
</style>
