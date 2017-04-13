<!-- 流程中心 --- 我的申请 -- 我的离职申请 -->
<template>
<h3 class="u-fs20 g-tc">{{post.createByName}}的离职申请</h3>
    <validator name="validation">
        <form novalidate class="clearfix">
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">招聘编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">入职时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.entrantTime}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.urgencyDegreeDisplay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">所属部门：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.officeName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">当前职位：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.postionName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">职级：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.positionsLevelDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">拟定离职时间：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.protocolLeaveDate}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">合同到期时间：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.conEndDate}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="离职原因">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">离职类别：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.leaveCategoryDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">离职原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.leaveReason}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">联系方式：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.contactWay}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">其他说明：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.otherExplain}}</span>
            </div>
        </div>
    </Tip-border>

    <Tip-border tip="部门沟通结果记录及反馈意见" v-if="this.Competence.taskFormKey == 'departure_deptheader'">
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label field-require">沟通结果：</label>
            <div class="col-sm-10" v-validate-class>
                <Text :text-value='post.communication' :max-length="600">
                     <textarea class="form-control" rows="3" v-model="post.communication"
                               @touched="onTouched('communication')"
                               v-validate:communication="{ required: true,  maxlength: 600 }"></textarea>
                    <p class="v-red">{{valida.communication}}</p>
                </Text>

            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label field-require">工作交接日期：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="post.handoverDate" @click.stop="calendar.show = true"
                       @touched="onTouched('handover')"  v-validate:handover="{ required: true }" readonly >
                <p class="v-red">{{valida.handover}}</p>
                <Public-Calendar
                        :value.sync="post.handoverDate"
                        :show.sync="calendar.show"
                        :x="calendar.x"
                        :y="calendar.y"
                        :sep.sync="calendar.sep"></Public-Calendar>
            </div>
            <label for="" class="col-sm-2 control-label field-require">核准离职日期：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="post.approveLeaveDate" @click.stop="calendar2.show = true"
                       @touched="onTouched('approve')" v-validate:approve="{ required: true }" readonly>
                <p class="v-red">{{valida.approve}}</p>
                <Public-Calendar
                        :value.sync="post.approveLeaveDate"
                        :show.sync="calendar2.show"
                        :x="calendar2.x"
                        :y="calendar2.y"
                        :sep.sync="calendar2.sep"></Public-Calendar>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="部门沟通结果记录及反馈意见" v-if="this.Competence.taskFormKey != 'departure_deptheader'">
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">沟通结果：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.communication}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">工作交接日期：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.handoverDate}}</span>
            </div>
            <label for="" class="col-sm-2 control-label">核准离职日期：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.approveLeaveDate}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="人事部离职访谈记录" v-if="this.Competence.taskFormKey == 'departure_hr'">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">离职原因：</label>
            <div class="col-sm-4" v-validate-class>
                <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.leaveTypeId"
                                @touched="onTouched('leave')"
                                v-validate:leave="{ required: true}"></Tool-Selection>
                <p class="v-red">{{valida.leave}}</p>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">公司原因：</label>
            <div class="col-sm-10">
                <label class="checkbox-inline u-fs14" v-for="item in company">
                    <input type="checkbox" v-model="post.reasonId" value="{{item.value}}">{{item.label}}
                </label>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">个人原因：</label>
            <div class="col-sm-10">
                <label class="checkbox-inline u-fs14" v-for="item in externa">
                    <input type="checkbox" v-model="post.outReasonId" value="{{item.value}}">{{item.label}}
                </label>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">代通知金/补偿：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control"
                       @touched="onTouched('noticecost')"
                       v-validate:noticecost="['numeric']" v-model="post.noticeCost">
                <p class="v-red" v-if="$validation.noticecost.numeric">金额输入错误</p>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="人事部离职访谈记录" v-if="this.Competence.taskFormKey == 'departure_zjl' || this.Competence.taskFormKey == 'departure_zc'">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">离职原因：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.leaveTypeDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">公司原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.reasonDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">个人原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.outReasonDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">代通知金/补偿：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.noticeCost}}</span>
            </div>
        </div>
    </Tip-border>
        </form>
    </validator>
    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <Process-Approve v-if="humanTaskId" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
    <div class="form-group g-tc g-marginT20">
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)">同意</button>
        <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)">驳回</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import * as type from '../../constants/globalSelectTypes';
    import ToolSelection from '../../components/public/ToolSelection.vue';
    import PublicCalendar from '../../components/public/PublicCalendar';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            Crumb,
            TipBorder,
            ToolSelection,
            PublicCalendar,
            ProcessDiagram,
            ApproveList,
            ProcessApprove
        },
        data: function(){
            return {
                comment:'',
                comments:false,
                isShow: false,
                type: [
                    type.LEAVE_TYPE,   //数据字典 离职类型
                ],
                post:{
                    reasonId:[],
                    outReasonId:[],
                    noticeCost:'0',
                },
                company:{},
                externa:{},
                Competence:{
                    taskFormKey:'',
                },
                calendar: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-'
                },
                calendar2: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-'
                },
                valida:{
                    communication:'',
                    leave:'',
                    noticecost:'',
                    handover:'',
                    approve:'',
                },
            }
        },
        asyncData: function (resolve, reject) {
            let that = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDLEAVE,{id: this.businessKey}).then(function (response) {
                var Data = response.json().result;
                resolve({
                    'post.id': Data.id,
                    'post.serialNo': Data.serialNo,                                         //录用申请编号
                    'post.entrantTime': Data.entrantTime,
                    'post.urgencyDegreeDisplay': Data.urgencyDegreeDisplay,
                    'post.officeName': Data.officeName,
                    'post.postionName': Data.postionName,
                    'post.positionsLevelDisplay': Data.positionsLevelDisplay,
                    'post.protocolLeaveDate': Data.protocolLeaveDate,
                    'post.conEndDate': Data.conEndDate,
                    'post.leaveCategoryDisplay': Data.leaveCategoryDisplay,
                    'post.leaveReason': Data.leaveReason,
                    'post.leaveTypeId': Data.leaveTypeId,
                    'post.contactWay': Data.contactWay,
                    'post.otherExplain': Data.otherExplain,
                    'post.communication': Data.communication,
                    'post.handoverDate': Data.handoverDate,
                    'post.approveLeaveDate': Data.approveLeaveDate,
                    'post.reasonDisplay': Data.reasonDisplay,
                    'post.outReasonDisplay': Data.outReasonDisplay,
                    'post.noticeCost': Data.noticeCost,
                    'post.createByName': Data.createByName,
                    'post.leaveTypeDisplay': Data.leaveTypeDisplay,
                })
                if(that.Competence.taskFormKey == "departure_hr"){
                    resolve({
                        'post.noticeCost': 0,
                    })
                }
            })
        },
        created: function () {
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[3].match(/\w+/)[0];
            this.humanTaskId = hash[1].match(/\w+/)[0];
            this.taskId = hash[2].match(/\w+/)[0];
            this.dicts("company","leave_cause_company_detail");
            this.dicts("externa","leave_cause_external_detail");
            this.task();
        },
        validators: {
            numeric: function (val) {
                return /^([1-9]+([0-9]+)?|[0])(\.[0-9]{1,2})?$/.test(val)
            }
        },
        methods:{
            onTouched: function (id) {
                if(this.$validation[id].required){
                    this.valida[id] = '必填项';
                }else if(this.$validation[id].maxlength){
                    this.valida[id] = '不能超过三百字';
                }
            },
            //审批
            approveProcess: function (e,comments) {
                let vm = this;
                vm.comments = comments;
                if(comments){
                    vm.comment = '同意'
                }else{
                    vm.comment = '不同意'
                }
                if(vm.Competence.taskFormKey == "departure_zjl" || vm.Competence.taskFormKey == "departure_zc"){
                    vm.sub();
                }else{
                    this.$validate(true, function () {
                        if (vm.$validation.invalid) {
                            e.preventDefault()
                        }else{
                            vm.sub();
                        }
                    })
                }
            },
            sub: function(){
                let vm = this;
                //数组转换成字符串
                this.post.reasonId = this.post.reasonId.join();
                this.post.outReasonId = this.post.outReasonId.join();
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVELEAVE, this.post).then((response) => {
                    let status = response.json().status;
                    if(status == 0){
                        vm.isShow = true;
                        //如果在提交后审批环节选择取消，字符串要再次转换成数组
                        vm.post.reasonId = vm.post.reasonId.split(',');
                        vm.post.outReasonId = vm.post.outReasonId.split(',');
                        //如果空字符串转成数组，会造成数组为空但是多一个长度，所以要去掉
                        if(vm.post.reasonId[0] === '') vm.post.reasonId.splice(0,1);
                        if(vm.post.outReasonId[0] === '') vm.post.outReasonId.splice(0,1);
                    }else{
                        //如果在提交后审批环节选择取消，字符串要再次转换成数组
                        vm.post.reasonId = vm.post.reasonId.split(',');
                        vm.post.outReasonId = vm.post.outReasonId.split(',');
                        //如果空字符串转成数组，会造成数组为空但是多一个长度，所以要去掉
                        if(vm.post.reasonId[0] === '') vm.post.reasonId.splice(0,1);
                        if(vm.post.outReasonId[0] === '') vm.post.outReasonId.splice(0,1);
                    }

                });
            },
            //取消
            cancelProcess: function () {
                this.$router.go('/process/todo')
            },
            dicts: function (datas,type) {
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS,{type:type}).then(function (response) {
                    let Data = response.json().result;
                    that.$set(datas,Data);
                })
            },
            //获取任务表单权限接口
            task: function(){
                let vm = this;
                this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETTASKFORMBYID, {humanTaskId: this.humanTaskId}).then(function (response) {
                    let Data = response.json().result;
                    vm.Competence.taskFormKey = Data.taskFormKey;
                });
            },
        }

    }
</script>
