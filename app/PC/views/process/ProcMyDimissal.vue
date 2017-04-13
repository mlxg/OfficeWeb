<!-- 流程中心 --- 我的申请 -- 我的离职申请 -->
<template>
<h3 class="u-fs20 g-tc">{{post.title}}</h3>
    <validator name="validation">
        <form novalidate class="clearfix">
        <Tip-border tip="基本信息" v-if='isEdit'>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">编号：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.serialNo" readonly>
                </div>
                <label for="" class="col-sm-2 control-label field-require">紧急程度：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.urgencyDegreeId"
                                    @touched="onTouched('urgency')"
                                    v-validate:urgency="{ required: true}" ></Tool-Selection>
                    <p class="v-red">{{valida.urgency}}</p>
                </div>
            </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">拟解聘人姓名：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" readonly v-model="post.dismissalName" @click="peoples" v-validate:employee="['required']">
                        <span class="fc-red" v-show="($validation.employee.touched || validating) && $validation.employee.required">必填项</span>
                        <input type="hidden" class="form-control" readonly v-model="post.dismissalPerson">
                        <label class="replace-container" v-show="replaceShow" transition="replace-prompt" style="width: 328px">
                            <input type="text" class="replace-search" placeholder="姓名查找" v-model="replaceName"
                                    v-on:keyup="searchName"/>
                            <div class="replace-list">
                                <ul>
                                    <li class="replace-list-item" v-for="item in filterName"
                                        :class="{'active': item.active}" @click="replacePerson($index)">{{item.name}}<span class="g-fr">{{item.applyTime}}</span></li>
                                </ul>
                            </div>
                        </label>
                        <span class="fc-red" v-show="($validation.employee.touched || validating) && $validation.employee.required">必填项</span>
                    </div>
                <label for="" class="col-sm-2 control-label">工号：</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" readonly v-model="post.employeeNo">
                </div>
            </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">职位：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="post.positionsDisplay">
                </div>
                <label for="" class="col-sm-2 control-label">入职日期：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="post.entrantTime">
                </div>
            </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">工龄（年）：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="post.entrantAge">
                </div>
                <label for="" class="col-sm-2 control-label field-require">预定离职日期：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control input-calendar" v-model="post.leaveDate" @click.stop="calendar.show = true"
                           @touched="onTouched('prodate')"
                           v-validate:prodate="{ required: true}">
                    <p class="v-red">{{valida.prodate}}</p>
                    <Public-Calendar
                      :value.sync="post.leaveDate"
                      :show.sync="calendar.show"
                      :x="calendar.x"
                      :y="calendar.y"
                      :sep.sync="calendar.sep"></Public-Calendar>
                </div>
            </div>
        </Tip-border>
    <Tip-border tip="基本信息" v-if='!isEdit'>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.urgencyDegreeDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">拟解聘人姓名：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.dismissalName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">工号：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.employeeNo}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">职位：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.positionsDisplay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">入职日期：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.entrantTime}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">工龄（年）：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.entrantAge}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">预定离职日期：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.leaveDate}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="解聘细节" v-if='!isEdit&&!isEditHr'>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">解聘原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.dismissalReason}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">平均月薪：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.monthlySalary}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">最大可能经济补偿：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.maxCompensation}}</span>
            </div>
        </div>
        <div class="form-group clearfix m-check-list">
            <label for="" class="col-sm-2 control-label">补偿原因：</label>
            <div class="col-sm-10">
                <span class="writing">{{post.compensationReason}}</span>
            </div>
        </div>
    </Tip-border>
        <Tip-border tip="解聘细节" v-if='isEdit||isEditHr'>
            <div class="form-group clearfix m-check-list">
                <label for="" class="col-sm-2 control-label field-require">解聘原因：</label>
                <div class="col-sm-10" v-validate-class>
                    <Text :text-value='post.dismissalReason' :max-length="300">
                        <textarea class="form-control" rows="3" v-model="post.dismissalReason" @touched="onTouched('dismissalReason')"
                                  v-validate:dismissal-reason="{ required: true,  maxlength: 300 }"></textarea>
                        <p class="v-red">{{valida.dismissalReason}}</p>
                    </Text>

                </div>
            </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">平均月薪：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="number" class="form-control" v-model="post.monthlySalary" @touched="onTouched('monthlySalary')"
                           v-validate:monthly-salary="{ required: true}" oninput="if(value.length>9)value=value.slice(0,9)">
                    <p class="v-red">{{valida.monthlySalary}}</p>
                </div>
                <label for="" class="col-sm-2 control-label field-require">最大可能经济补偿：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="number" class="form-control" v-model="post.maxCompensation" @touched="onTouched('maxCompensation')"
                           v-validate:max-compensation="{ required: true}" oninput="if(value.length>9)value=value.slice(0,9)">
                    <p class="v-red">{{valida.maxCompensation}}</p>
                </div>
            </div>
            <div class="form-group clearfix m-check-list">
                <label for="" class="col-sm-2 control-label field-require">补偿原因：</label>
                <div class="col-sm-10" v-validate-class>
                    <Text :text-value='post.compensationReason' :max-length="300">
                        <textarea class="form-control" rows="3" v-model="post.compensationReason" @touched="onTouched('compensationReason')"
                                  v-validate:compensation-reason="{ required: true,  maxlength: 300 }"></textarea>
                        <p class="v-red">{{valida.compensationReason}}</p>
                    </Text>
                </div>
            </div>
        </Tip-border>
        </form>
    </validator>
    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <div class="form-group g-tc g-marginT20" v-if='isEdit'>
        <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="submit($event)">提交流程</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Process-Approve v-if="humanTaskId" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
    <div class="form-group g-tc g-marginT20" v-if='!isEdit' >
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)" v-if='isRecord'>归档</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)" v-if='!isRecord'>同意</button>
        <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)" v-if='!isRecord'>驳回</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>
<style>
    input[type="number"]{-moz-appearance:textfield;}
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>
<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import * as type from '../../constants/globalSelectTypes';
    import ToolSelection from '../../components/public/ToolSelection.vue';
    import PublicCalendar from '../../components/public/PublicCalendar';
    import PublicModal from '../../components/public/PublicModal'
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import Text from '../../components/public/PublicTextLength'
    import LookScreen from '../../components/public/LockScreen.vue'
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
            PublicModal,
            Text,
            ProcessApprove,
            LookScreen
        },
        data: function(){
            return {
                isRecord:false,
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                lookscreen:{
                    isShow:false,
                },
                deptName:'',
                officeId:'',
                selected:[],
                replaceShow: false,
                replaceName:'',
                filterName:[],
                listName:[],
                isEditHr:false,
                isEdit:false,
                comment:'',
                comments:false,
                isShow: false,
                type: [
                    type.URGENCY_DEGREE
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
                    monthlySalary:'',
                    urgency:'',
                    compensationReason:'',
                    dismissalReason:'',
                    maxCompensation:'',
                    communication:'',
                    leave:'',
                    noticecost:'',
                    handover:'',
                    approve:'',
                    prodate:'',
                    other:''
                },
            }
        },
        asyncData: function (resolve, reject) {
            let that = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEDISMISSAL,{id: this.businessKey}).then(function (response) {
                var Data = response.json().result;
                resolve({
                    'post.title': Data.title,
                    'post.id': Data.id,
                    'post.serialNo': Data.serialNo,                                         //录用申请编号
                    'post.dismissalName': Data.dismissalName,
                    'post.employeeNo': Data.employeeNo,
                    'post.positionsDisplay': Data.positionsDisplay,
                    'post.entrantTime': Data.entrantTime,
                    'post.entrantAge': Data.entrantAge,
                    'post.leaveDate': Data.leaveDate,
                    'post.dismissalReason': Data.dismissalReason,
                    'post.monthlySalary': Data.monthlySalary,
                    'post.maxCompensation': Data.maxCompensation,
                    'post.compensationReason': Data.compensationReason,
                    'post.urgencyDegreeId': Data.urgencyDegreeId,
                    'officeId': Data.officeId,
                    'deptName': Data.deptName,

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
                if(that.Competence.taskFormKey == "dismissal_record"){
                    resolve({
                        'isRecord': true,
                    })
                }
                if(that.Competence.taskFormKey == "dismissal_hr"){
                    resolve({
                        'isEditHr': true,
                    })
                }else if(that.Competence.taskFormKey == "dismissal_initiator_edit"){
                    that.getPeopleList(that.uid)
                    resolve({
                        'isEdit': true,
                    })
                }
            })
        },
        created: function () {
            this.uid = sessionStorage.getItem("userId");
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[3].match(/\w+/)[0];
            this.humanTaskId = hash[1].match(/\w+/)[0];
            this.taskId = hash[2].match(/\w+/)[0];
            this.dicts("company","leave_cause_company_detail");
            this.dicts("externa","leave_cause_external_detail");
            this.task();
        },
        watch: {
            'post.dismissalName': function (val){
                let vm = this;
                let str = vm.deptName+'-'+val+' 人事解聘流程'
                vm.post.title = str;
            }
        },
        validators: {
            numeric: function (val) {
                return /^([1-9]+([0-9]+)?|[0])(\.[0-9]{1,2})?$/.test(val)
            }
        },
        methods:{
            submit: function (e) {
                let vm = this;
                let userId = sessionStorage.getItem("loginName");
                vm._save(e,function () {
                    e.target.disabled = true
                    vm.lookscreen.isShow = true;
                    if (vm.humanTaskId) {
                        // 更新流程
                        vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
                            'humanTaskId': vm.humanTaskId,
                            'appros': true,
                            'userId' : userId
                        }).then((response)=>{
                            let status = response.json().status;
                            if (status == 0) {
                                vm._submitSuc()
                                vm.lookscreen.isShow = false;
                                e.target.disabled = false
                            }else{
                                vm.lookscreen.isShow = false;
                                e.target.disabled = false
                            }
                        })
                    } else {
                        // 启动流程
                        vm.process.bussinessDataJsonStr= JSON.stringify({
                            departmentCode: vm.departmentCode,
                            urgencyDegreeId: vm.post.urgencyDegreeId,
                            urgencyDegreeDispay: vm.urgencyDegreeDispay,
                        });
                        vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_STARTPROCESS, vm.process).then((response)=>{
                            let status = response.json().status;
                            if (status == 0) {
                                vm._submitSuc()
                                vm.lookscreen.isShow = false;
                                e.target.disabled = false
                            }else{
                                vm.lookscreen.isShow = false;
                                e.target.disabled = false
                            }
                        });
                    }
                })
            },
            _save: function(e,callback){
                let vm = this;
                this.$validate(true, function () {
                    if (vm.$validation.invalid) {
                        vm.options = {
                            title: '温馨提示',
                            message: '表单验证未通过!',
                            isShow: true
                        };
                        vm.confirm = {
                            text: '确定',
                            callback: function () {
                                vm.options.isShow = false;
                            }
                        };
                        vm.close = {
                            callback: function () {
                                vm.options.isShow = false;
                            }
                        };
                        e.preventDefault()
                    }else{
                        vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEDISMISSAL, vm.post).then((response)=>{
                            let status = response.json().status;
                            if (status == 0) {
                                callback();
                            }
                        })
                    }
                })
            },
            _submitSuc: function () {
                let vm = this;
                vm.options = {
                    title: '温馨提示',
                    message: '流程提交成功！',
                    icon: 'success',
                    isShow: true
                };
                vm.confirm = {
                    text: '确定',
                    callback: function () {
                        vm.isCompleted = true;
                        vm.$router.go('/process/application');
                        vm.options.isShow = false;
                    }
                };
                vm.close = {
                    callback: function () {
                        vm.$router.go('/process/application');
                        vm.options.isShow = false;
                    }
                }
            },
            //保存草稿
            save: function(e){
                let vm = this;
                vm._save(e,function () {
                    vm.options = {
                        title: '温馨提示',
                        message: '保存成功！',
                        icon: 'success',
                        isShow: true
                    };
                    vm.confirm = {
                        text: '确定',
                        callback: function () {
                            vm.options.isShow = false;
                        }
                    };
                    vm.close = {
                        callback: function () {
                            vm.options.isShow = false;
                        }
                    }
                })
            },
            peoples: function(){
                this.filterName = [];
                this.replaceShow = !this.replaceShow
                this.filterName = this.listName;
            },
            searchName: function(){
                this.filterName = [];
                for(var i =0;i<this.listName.length;i++){
                    if ((this.listName[i].name).indexOf(this.replaceName) >= 0) {
                        this.filterName.push({name:this.listName[i].name,baseId:this.listName[i].baseId,applyTime:this.listName[i].applyTime});
                    }
                }
                for(var i =0;i<this.listName.length;i++){
                    if ((this.listName[i].applyTime).indexOf(this.replaceName) >= 0) {
                        this.filterName.push({name:this.listName[i].name,baseId:this.listName[i].baseId,applyTime:this.listName[i].applyTime});
                    }
                }
            },
            replacePerson: function(index){
                this.post.dismissalName = this.filterName[index].name;
                this.post.dismissalPerson = this.filterName[index].id;
                this.replaceShow = false;
                this.replaceName = '';
                this.filterName = [];
            },
            getPeopleList:function (uid) {
                let that = this;
                    that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDISMISSALPERSONLIST,{'userId':uid}).then((response)=>{
                        let Data = response.json().result;
                        that.selected = Data;
                        for (var i = 0; i < Data.length; i++) {
                            that.listName.push({name:Data[i].name,id:Data[i].id});
                        }
                    });
            },
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
                    if (vm.isRecord) {
                        vm.comment = '归档'
                    }else{
                        vm.comment = '同意'
                    };
                }else{
                    vm.comment = '不同意'
                }
                if(vm.Competence.taskFormKey == "dismissal_zjl" || vm.Competence.taskFormKey == "dismissal_zc" || vm.Competence.taskFormKey == "dismissal_record"){
                    vm.sub();
                }else{
                    this.$validate(true, function () {
                        if (vm.$validation.invalid) {
                        vm.options = {
                            title: '温馨提示',
                            message: '表单验证未通过!',
                            isShow: true
                        };
                        vm.confirm = {
                            text: '确定',
                            callback: function () {
                                vm.options.isShow = false;
                            }
                        };
                        vm.close = {
                            callback: function () {
                                vm.options.isShow = false;
                            }
                        };
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
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEDISMISSAL, this.post).then((response) => {
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
