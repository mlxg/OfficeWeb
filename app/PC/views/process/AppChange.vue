<!-- 人事管理 --- 人事管理 --- 人事异动申请 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{datas.title}}</h2>
    <validator name="validation">
        <Tip-border tip="基本信息">
            <div class="g-padding20">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">标题：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.title}}</span>
                    </div>
                    <label class="col-sm-2 control-label">编号：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.serialNo}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">紧急程度：</label>
                    <div class="col-sm-4" >
                        <span class="writing">{{datas.urgencyDegreeDisplay}}</span>
                    </div>
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="异动情况">
            <div class="g-padding20">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">姓名：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.cnName}}</span>
                    </div>
                    <label class="col-sm-2 control-label">员工编号：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.employeeNo}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">变动性质：</label>
                    <div class="col-sm-4" v-validate-class>
                        <span class="writing">{{datas.moveNatureDisplay}}</span>
                    </div>
                    <label class="col-sm-2 control-label">入职时间：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.entrantTime}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">是否部门负责人：</label>
                    <div class="col-sm-4" v-if="datas.afterIsResponsible == 1">
                        <span class="writing">是</span>
                    </div>
                    <div class="col-sm-4" v-else="">
                        <span class="writing">否</span>
                    </div>
                    <label class="col-sm-2 control-label">建议生效日期：</label>
                    <div class="col-sm-4" v-validate-class>
                        <span class="writing">{{datas.suggestEffectDate}}</span>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix" v-validate-class>
                    <label class="col-sm-2 control-label field-require">变动情况说明：</label>
                    <div class="col-sm-4" v-validate-class>
                        <span class="writing">{{datas.moveCaseExplain}}</span>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">变动具体情况：</label>
                    <table width="83%" class="table table-striped table-bordered w83 g-fr">
                        <thead>
                        <th>名称</th>
                        <th>异动前</th>
                        <th>异动后</th>
                        </thead>
                        <tbody>
                        <tr>
                            <th><span class="writing">办公地点</span></th>
                            <td><span class="writing">{{datas.beforeWorkplaceDisplay}}</span></td>
                            <td><span class="writing">{{datas.afterWorkplaceDisplay}}</span></td>
                        </tr>
                        <tr>
                            <th><span class="writing">部门</span></th>
                            <td><span class="writing">{{datas.beforeOfficeName}}</span></td>
                            <td><span class="writing">{{datas.afterOfficeName}}</span></td>
                        </tr>
                        <tr>
                            <th><span class="writing">职位</span></th>
                            <td><span class="writing">{{datas.beforePositionsName}}</span></td>
                            <td><span class="writing">{{datas.afterPositionsName}}</span></td>
                        </tr>
                        <tr>
                            <th><span class="writing">职级</span></th>
                            <td><span class="writing">{{datas.beforePositionsLevelDisplay}}</span></td>
                            <td><span class="writing">{{datas.afterPositionsLevelDisplay}}</span></td>
                        </tr>
                        <tr>
                            <th><span class="writing">月薪</span></th>
                            <td><span class="writing">{{datas.beforeMonthSalary}}</span></td>
                            <td><span class="writing">{{datas.afterMonthSalary}}</span></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">附件下载：</label>
                    <div class="col-sm-4">
                        <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
                    </div>
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="人力资源部复核" v-if="this.taskform != 'move_before_respon' && this.taskform != 'move_after_respon'">
          <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">基本工资(异动前)</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.beforeBaseFormalSalary" readonly>
            </div>
            <label class="col-sm-2 control-label g-tr">（异动后）</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.afterBaseFormalSalary" readonly>
            </div>
          </div>
          <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">保密工资(异动前)</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.beforeSecrecyFormalSalary" readonly>
            </div>
            <label class="col-sm-2 control-label g-tr">（异动后）</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.afterSecrecyFormalSalary" readonly>
            </div>
          </div>
          <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">其他补贴(异动前)</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.beforeOverSubsidyFormalSalary" readonly>
            </div>
            <label class="col-sm-2 control-label g-tr">（异动后）</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.afterOverSubsidyFormalSalary" readonly>
            </div>
          </div>
          <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">加班补贴(异动前)</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.beforeOtherSubsidyFormalSalary" readonly>
            </div>
            <label class="col-sm-2 control-label g-tr">（异动后）</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.afterOtherSubsidyFormalSalary" readonly>
            </div>
          </div>
          <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">午餐补助(异动前)</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.beforeLunchSubsidyFormalSalary" readonly>
            </div>
            <label class="col-sm-2 control-label g-tr">（异动后）</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.afterLunchSubsidyFormalSalary" readonly>
            </div>
          </div>
          <div class="g-marginT20 g-marginB20 clearfix">
            <label class="col-sm-2 control-label g-paddingR0">绩效考核(异动前)</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.beforeAchievementFormalSalary" readonly>
            </div>
            <label class="col-sm-2 control-label g-tr">（异动后）</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="datas.afterAchievementFormalSalary" readonly>
            </div>
          </div>
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
    </validator>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script type="text/ecmascript-6">
    import TipBorder from '../../components/public/TipBorder.vue'
    import PublicModal from '../../components/public/PublicModal'
    import LookScreen from '../../components/public/LockScreen.vue'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    export default{
        components: {
            TipBorder,
            PublicModal,
            LookScreen,
            ProcessDiagram,
            ApproveList
        },
        data: function(){
            return {
                datas:{

                },
                bussinessData:{
                    id:''
                },
                status:'',
                businessKey:'',
                fileList: [],
                emergencyList:[],
                listName:[],
                filterName:[],
                department:[],
                departlist:[],
                stationList:[],
                replaceShow: false,
                replaceShow2: false,
                //校验
                validating: false,

                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                lookscreen:{
                    isShow:false,
                },
            }
        },


        created: function(){
            //初始化数据
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
        asyncData: function (resolve, reject) {
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                resolve({
                    'fileList': response.json().result
                })
            })
        },
        methods : {
            //初始化数据
            loadData: function () {
                let that = this;
                let id = {
                    bussinessData:{
                        id:that.businessKey
                    }
                }
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDMOVE,id).then(function (response) {
                    let Data = response.json().result;
                    that.datas = Data;
                })
            },
            //判断流程状态
            processStatus: function(){
                let that = this;
                this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSSTATUS,{humanTaskId:this.humanTaskId}).then(function (response) {
                    let Data = response.json().result;
                    that.status = Data.status;
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
                        console.log(vm.humanTaskId)
                        console.log(vm.userId)
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
            cancelProcess: function () {
                this.$router.go('/process/dispose')
            }
        }
    }
</script>

<style lang="less">
    table.w83{
        width:83%
    }
    table.mask-table td{
        text-align: left;
    }
    .newTab{width:100px}
    .v-red{
        background: #ffe5e6 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjY5OTM3QTgxNzM0RTExRTZBNkZGRDQ1NTdCQ0MwRkE5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjY5OTM3QTgyNzM0RTExRTZBNkZGRDQ1NTdCQ0MwRkE5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Njk5MzdBN0Y3MzRFMTFFNkE2RkZENDU1N0JDQzBGQTkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Njk5MzdBODA3MzRFMTFFNkE2RkZENDU1N0JDQzBGQTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7hqAltAAABDUlEQVR42mL8z8DFgAT4gDgAiE2BWBoq9gSITwLxZiD+BFPIiKTRCojzgJibATv4BsQTgfgYskaQpgoQnwE/+A/EHSDNII38QMYsIOZiIA6AbE5jAhI+yJr+LJhp8C/AVxTGB7H/zJ9hgKQRpNafBUiYIxvHtHHr079tjUZA5jkQH8Rmrqo/h2arKcip64AMVmTRf4F+on9bG0CaGUCamDZsfo2m8Q8T9iD4T8iff1ig8aSI7Ke/7U1GzJV1cKeCnI1m6wsWaOQiNAb6SoM0ISk89y/ARxpN42mKouMjNEX8J0LTf6jaj8hJzhqI84GYE4em70A8AT3JoSdyM2gi/wPEz0B+AuJNyIkcIMAAiTRcCLgSmFkAAAAASUVORK5CYII=) no-repeat 2px center/14px 14px;
        border: 1px solid #ff7a7a;
        border-radius: 4px;
        height: 24px;
        color: #ff3333;
        font-size: 12px;
        display: inline-block;
        margin-top: -12px;
        position: absolute;
        top: 50%;
        right: 19px;
        padding: 2px 6px 2px 20px;
        display: none;;
    }
    .invalid p{
        display: block;
    }
    .untouched p{
        display: none;
    }

    .mask1{
        position: fixed;
        z-index: 999;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        text-align: center;
        /* inorder to adapt the color #ccc */
        background: rgba(0, 0, 0, 0.20);
    .mask-align{
        display: inline-block;
        height: 100%;
        width: 1px;
        line-height: 100%;
        vertical-align: middle;
    }
    .notice-panel{
        display: inline-block;
        width: 1045px;
        height: auto;
        background-color: #fff;
        position: relative;
        vertical-align: middle;
        margin-top: 60px;
    }
    .notice-title{
        background-color: #278eed;
    h1{
        margin: 0;
        padding-left: 10px;
        text-align: left;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
        color: white;
    }
    }
    .exit{
        width: 20px;
        height: 20px;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA3OEYwMTA4NjVEMzExRTY5QkZDQjk5MEQzREQ4OUYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA3OEYwMTA5NjVEMzExRTY5QkZDQjk5MEQzREQ4OUYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDc4RjAxMDY2NUQzMTFFNjlCRkNCOTkwRDNERDg5RjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDc4RjAxMDc2NUQzMTFFNjlCRkNCOTkwRDNERDg5RjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70HGO2AAAAy0lEQVR42mL8//8/A7mAiYECMHw0//jzn0zNn3/+91r48fLLP8iChx/8ztvyBYvu/xjg4P1fltPfXXrxG8LdfvOn7az3V2BcZIBFM0S/1Yz3F5//Xn35h+Oc93fe/sGqDLtmiH7jKe/c53948vEvLjU4Q5ufgxEUJIwMjHhCDKuRF57/Bjr70P1fKy/9cJ77/i7xzobrhHC33vhpP+v91ZdEBNinH/9sZiJ0QsCBe79yN3/G1MyImaveff8vxMlITCJhHM2SpAGAAAMAUQBsmfPRBo0AAAAASUVORK5CYII=);
        position: absolute;
        right: 10px;
        top: 10px;
    &:hover{
         cursor: pointer;
     }
    }
    .notice-content{
    i{
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-top: 55px;
    }
    .success{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzOTVERjc5NjVEMzExRTZBN0M4RDNCQkRDNTY4RDFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzOTVERjdBNjVEMzExRTZBN0M4RDNCQkRDNTY4RDFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM5NURGNzc2NUQzMTFFNkE3QzhEM0JCREM1NjhEMUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDM5NURGNzg2NUQzMTFFNkE3QzhEM0JCREM1NjhEMUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5n9uL4AAADHElEQVR42syXb2hNYRzHnx3a2lWGbUjc0MKa4sWkUHixDWkvVhbasub/nwmRRF7ZG2q4QjSsMNqL5Q0ZW5Pkjb0Tq1kbhtQ27pW2TOL7u32f9XQ6555z7z0v/OrT+fc8v+9znvN7fr/nZIRflisflglKQQlYBuaDqXz2HfSBV+ApeALGvBxmeAhPAYfBfpCr/NkwuAzOg2gqwpvBJZDH6x/gIXgBPoKvvD8ThMEqsAHk8P4QqAP3nZxPdLg3gSPezWsRqQe3wWiCN70CskE1OMnB3ANrOGN/zMaWg2iLISrOisB1D1Fto2xbxMEr+mqhb1fhCKjg6LZzpD9V8iZ9DoBa+qqgb0fhrWAfz3eAmyp9u0Vfir632IUlei8Y09ukgrMm+hS7SK1x4SMgn4F0XAVvx+g7n1pxYUkOe9mgPsVv6mQ76U80RsAZ3hetTIsZKY8ReScg0YOM7hNc52J3qSFapVpYMd2NBCC6zYiX0+ALz8V3O8/jwsW8aAtAVJbNDcmIoMGYXm2PeSwW4QJevE1TtISZShJFIzjq0KabxwLLyK3DtkbLwTkjVyeyFeABA1Wy1B7w16HdEI85VgJnhzjqdi4DN1sKHoEQj9X2vOxkIhzjub3s6cBYAjrBDIf+C1h/Zdaeg00etVjPXkyEe3lRaGv0DqwFn5j0O42loVh9OjgbXaDcx6pYxGOvxU6K9dRuPWA1s44M7BmYBaZTdDZ4wzoc8xELWqPL4lSJbWQ9tVsfa+p7sJBv3sHVIM/WgUEfotnUiOcMLSzRNhlUuXTqp3g/v+ti8BmU8VP4sSpqiFabxWC4yoenGJ1O9oHT3sM3XG/Eh5eF6FtRa0wvpwY6C3PtutkA33YueJ1EcjlL34PUGi+LUa5bXbBrEjj5nWROr+FORueGqH0H0mwU7EbuENO1OvrSG4xmtz2XlLNW5tsIE/6kFARD7Buhr1b6dt3sSaqrBNd4XcvisQtk+RDM4gagm30VfVXa02gyG/qYsaEfMOqsJJQ5YCXXqa8N/X/5C2P/aSszftrmgWl89o2Jxfxp++Xl8J8AAwBIQ7xEcy0ZPAAAAABJRU5ErkJggg==);
        background-repeat: no-repeat;
        background-position: center;
    }
    .warning{
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFNzE3MkU1NjVEMzExRTZBRUJFQ0ZERkU1OUU2MkEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFNzE3MkU2NjVEMzExRTZBRUJFQ0ZERkU1OUU2MkEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUU3MTcyRTM2NUQzMTFFNkFFQkVDRkRGRTU5RTYyQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUU3MTcyRTQ2NUQzMTFFNkFFQkVDRkRGRTU5RTYyQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zdoRoAAAC8UlEQVR42qyX22sTQRjFd6NWI0qtbfLQR8ELxAsUpBSN2oKp9rGK9lV8qJfai68+9MVnL/XSFv8BLdJHpRESqYKIKKgEIgX/gKwlloDGSonngzMyXXZ2ZzUfnO7M7sz5dXZmMt+6vy4ccSxiE9QPnYQOQ7ugHXz2HfoKvYNeQAvQ7yhDNwIs5uPQFSjl2MU36AF0h/9UYCRCDIagMjRJ6GeW+6BOaDPVyXuTbNPBcpke1iPeAN2DLrP+CrrBq01koZvQMdanoWvQWtiIBTpHaB26BB2PAVX/6An2rdNrjt5GsMzLIOdGXt8s1HDiR4N9xaNKz7sm8HloBPoJnYLeOP8f4nEa+gFdJWMdWFbvFMvXobdO80K8JlieUttQgWXLpDk/swGdt3O1RoW02RZw/xG0SMa4Ardwnzpcvf45FaNn0MuIvZxim+cB8Aa9HbJaBJxjp0+G1ZuE2qAMVDTAU3yWYdtkQJvX0Ee2zSmwxLxhJB5XZ8kA16EltvUMXorRL+AuVhZDXmMlAJ42QCshPorRtRF/9rBSjlg4Cl4gqMD7CtobMlIVX3jdLeBWVpYtVq0f7sSA6ozWxD/+KjV89dgh4BWW2y3apzja/RxpieWC5bGpGCsCXmJlX0xoH19xHPheXpcE/F47zsKgRQ3ay/n2fPBiBFwdlR8EnGflTATUtHp1eCYCPshrXoFltR2EjgY0rvNoC1u9OrzKPv4Q70NsuyDgVeg+H0rm4Po61KABHu5hW8ZjmwH2WZfp0FvioTATWgJQYbYxHGBaYxJnk+jVAu5fpLdH1t9jUTKOUZZvQd1NPI+7texjVGWe+g/IE6alSR6DPU2A9tBrK70fm3KuMZ4gO7kvhwPm3CZc9i3Qa57exmRPUtBzTEm3QDM83LMxoFluqRl6TNNzzfZLYohzk2ZdkvWnTBbK2mLr4K+eAM9CB7QDZUx/vXE/YSaYIbZbjniZ83k77BPGjfnRltM+2tr4rKp9tOWp1SjDPwIMAC0wyJFgg73pAAAAAElFTkSuQmCC);
        background-repeat: no-repeat;
        background-position: center;
    }
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    .content{
        vertical-align: middle;
        font-size: 16px;
        margin: 10px;
        display: flex;
        align-items: center;
    }
    }
    .notice-select{
        position: absolute;
        width: 100%;
        bottom: 20px;
    button{
        outline: none;
        border: 1px solid #ddd;
        background-color: white;
        color: #333;
        border-radius: 3px;
        height: 34px;
        line-height: 34px;
        vertical-align: middle;
        padding: 0 24px;
        margin: 0 20px;
    &:hover{
         border: 1px solid #2380d5;
         background-color: #278eed;
         color: white;
         cursor: pointer;
     }
    }
    }
    }
</style>
