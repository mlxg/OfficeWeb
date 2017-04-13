<!-- 人事管理 --- 人事管理 --- 转正申请 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
    <validator name="validation">
            <Tip-border tip="转正基本信息">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">编号：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="post.serialNo">
                    </div>
                    <label class="col-sm-2 control-label field-require">转正人：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" readonly v-model="cnName" @click="peoples" v-validate:employee="['required']">
                        <span class="fc-red" v-show="($validation.employee.touched || validating) && $validation.employee.required">必填项</span>
                        <input type="hidden" class="form-control" readonly v-model="post.employeeBaseId">
                        <label class="replace-container" v-show="replaceShow" transition="replace-prompt" style="width: 328px">
                            <input type="text" class="replace-search" placeholder="姓名或日期查找，日期格式：XXXX-XX-XX" v-model="replaceName"
                                    v-on:keyup="searchName"/>
                            <div class="replace-list">
                                <ul>
                                    <li class="replace-list-item" v-for="item in filterName"
                                        :class="{'active': item.active}" @click="replacePerson($index)">{{item.name}}<span class="g-fr">{{item.applyTime}}</span></li>
                                </ul>
                            </div>
                        </label>
                        <!--<select class="form-control" v-model="post.employeeBaseId" v-validate:employee="['required']">-->
                            <!--<option v-for="item in selected" :value="item.baseId">{{item.cnName}}</option>-->
                        <!--</select>-->
                        <span class="fc-red" v-show="($validation.employee.touched || validating) && $validation.employee.required">必填项</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">所在部门：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="info.officeName">
                    </div>

                    <label class="col-sm-2 control-label">转正人部门：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="action.officeName">
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">紧急程度：</label>

                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.urgencyDegreeId" v-validate:urgency-Require="['required']"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.urgencyRequire.touched || validating) && $validation.urgencyRequire.required">必填项</span>
                    </div>

                    <label class="col-sm-2 control-label">转正人职位：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="action.positionsDisplay">
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">入职时间：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="action.entrantTime">
                    </div>

                    <label class="col-sm-2 control-label">转正人职级：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="action.positionsLevelDisplay">
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">计划转正时间：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="post.formalTime" readonly>
                    </div>

                    <label class="col-sm-2 control-label">实际转正时间：</label>
                    <div class="col-sm-4"  v-validate-class>
                        <input type="text" class="form-control input-calendar" v-model="post.realTime"
                               @click.stop="calendar.show = true"  readonly>
                        <Public-Calendar
                                :value.sync="post.realTime"
                                :type="calendar.type"
                                :show.sync="calendar.show"
                                :x="calendar.x"
                                :y="calendar.y"
                                :sep.sync="calendar.sep"></Public-Calendar>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">转正状态：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="zzts">
                    </div>

                    <label class="col-sm-2 control-label">是否为负责人：</label>
                    <div class="col-sm-4" v-if="this.action.isPrimaryPerson == 1">
                        <input type="text" class="form-control" value="是" readonly >
                    </div>
                    <div class="col-sm-4" v-else>
                        <input type="text" class="form-control" value="否" readonly >
                    </div>
                </div>
            </Tip-border>
    </validator>
    <div class="form-group g-tc g-marginT20">
        <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="submit($event)">提交流程</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
    import * as type from '../../constants/globalSelectTypes';
    import TipBorder from '../../components/public/TipBorder'
    import ToolSelection from '../../components/public/ToolSelection'
    import PublicCalendar from '../../components/public/PublicCalendar'
    import PublicModal from '../../components/public/PublicModal'
    import LookScreen from '../../components/public/LockScreen.vue'
    import { getData, changeCurRoute, initCurRoute } from '../../actions/headNavbarAction'
    import { getNavBar, getUrl, getCurRoute, getIgnoreRoute, getSingleRoute } from '../../getters/headNavbarGetter'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        vuex: {
            actions: {
                changeCurRoute
            },
            getters: {
                navData: getNavBar,
                url: getUrl,
                curRoute: getCurRoute,
                ignoreRoute: getIgnoreRoute,
                singleRoute: getSingleRoute
            }
        },
        components: {
            TipBorder,
            ToolSelection,
            PublicCalendar,
            PublicModal,
            LookScreen
        },
        data: function () {
            return {
                emergencyList:[],
                auditTarget:'',
                targetRespon:'',
                departmentCode:'',
                urgencyDegreeId:'',

                replaceShow: false,
                replaceName:'',
                listName:[],
                filterName:[],
                cnName:'',
                type: [
                    type.URGENCY_DEGREE,
                ],
                post: {
                    id: '',
                    title:'',
                    serialNo: '',
                    urgencyDegreeId: '',
                    urgencyDegreeDispay:'',
                    formalTime:'',
                    realTime:'',
                    performance:'',
                    delayTime:'',
                    applyType:'',
                    employeeBaseId:'',
                },
                action:{
                    officeName:'',
                    positionsDisplay:'',
                    positionsLevelDisplay:'',
                    applyTime:'',
                    entrantTime:'',
                    isPrimaryPerson:''
                },
                selected:[],
                info:{
                    officeName:'',
                },
                calendar: {
                    show: false,
                    value: '',
                    x: 13,
                    y: 40,
                    sep: '-'
                },
                //流程
                departmentCode:'',
                process: {
                    userId: '',
                    businessKey: '',
                    publishCode: '',
                    businessType: 'ZZSQ',
                    appId: 'starOffice',
                    businessCode: '',
                    businessTitle: '',
                    bussinessDataJsonStr: {
                        auditTarget:'',
                        departmentCode: '',
                        urgencyDegreeId:'',
                        urgencyDegreeDispay:'',
                    }
                },
                processYg: {
                    userId: '',
                    businessKey: '',
                    publishCode: '',
                    businessType: 'ZZSQ',
                    appId: 'starOffice',
                    businessCode: '',
                    businessTitle: '',
                    bussinessDataJsonStr: {
                        auditTarget: '',
                        targetRespon:'',
                        urgencyDegreeId:'',
                        urgencyDegreeDispay:'',
                    }
                },
                zzts:'',
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                actionCnName: '',
                validating: false,
                lookscreen:{
                    isShow:false,
                },
            }
        },
        computed: {
          businessTitle: function(){
            let vm = this;
            let str = (vm.action.officeName?vm.action.officeName+'-':'') + (vm.action.positionsDisplay?vm.action.positionsDisplay+'-':'') + (vm.actionCnName?vm.actionCnName+'的':'') + '转正申请';
            vm.process.businessTitle = str;
            vm.processYg.businessTitle = str;
            vm.post.title = str;
            return str;
          }
        },
        watch: {
            'post.employeeBaseId': function (val) {
                let that = this;
                let obj = this.selected.find((item) => item.baseId === val);
                if(!obj) return;
                this.action.officeName = obj.officeName;
                this.action.officeId = obj.officeId;
                this.action.positionsDisplay = obj.positionsDisplay;
                this.action.positionsLevelDisplay = obj.positionsLevelDisplay;
                this.action.entrantTime = obj.entrantTime;
                this.action.isPrimaryPerson = obj.isPrimaryPerson;
                this.post.formalTime = obj.applyTime;
                this.post.realTime = obj.applyTime;
                this.actionCnName = obj.cnName;
                this.auditTarget = obj.loginName;
                this.targetRespon = obj.pLoginName;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id: that.action.officeId}).then(function (response) {
                    var Data = response.json().result;
                    that.departmentCode = Data.departmentCode;
                });

                if(this.post.formalTime != ''){
                    this.zzts ="正常转正";
                }
            },
            'post.urgencyDegreeId': function (val){
                let urg = this.emergencyList.find((item) => item.value === val);
                if(!urg) return;
                this.urgencyDegreeDispay = urg.label;
            },
            'post.realTime' : function (val) {
                if(!val) return false;
                var realTime = val.split("-").join("");
                var formalTime = this.post.formalTime.split("-").join("");
                if(realTime - formalTime > 0){
                    this.zzts = "延迟转正";
                }else if(realTime - formalTime == 0){
                    this.zzts = "正常转正";
                }else{
                    this.zzts = "提前转正";
                }
            }
        },
        route: {
            canDeactivate: function (transition) {
                let vm = this;
                let hash = transition.to.path.match(/^\/\w+/);
                if(hash[0] != '/process') hash = '/process';
                else hash = '';

                if (vm.isCompleted) transition.next();
                vm.options = {
                    title: '温馨提示',
                    message: '您确定要离开当前页吗？',
                    isShow: true
                };
                vm.confirm = {
                    text: '确定',
                    callback: function () {
                        transition.next();
                        vm.options.isShow = false;
                    }
                };
                vm.close = {
                    callback: function () {
                        transition.next();
                        vm.options.isShow = false;
                    }
                };
                vm.cancel = {
                    text: '取消',
                    callback: function () {
                        transition.abort();
                        hash && vm.changeCurRoute(hash, true);
                        vm.options.isShow = false;
                    }
                }
            }
        },
        asyncData: function(resolve){
            let that = this;
            //判断id 进入的路径
            let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
            //包含id则更新页面
            that.LoadData(function(){
                if(businessKey){
                    that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDAPPLY,{id :businessKey}).then(function (response) {
                        let result = response.json().result;
                        resolve({
                            'post.id': result.id,
                            'post.serialNo': result.serialNo,
                            'post.urgencyDegreeId': result.urgencyDegreeId,
                            'post.formalTime': result.formalTime,
                            'post.realTime': result.realTime,
                            'post.performance': result.performance,
                            'post.delayTime': (result.delayTime == undefined ? '':result.delayTime),
                            'post.applyType': result.applyType,
                            'post.employeeBaseId': result.employeeBaseId,
                            'action.isPrimaryPerson': result.isPrimaryPerson,
                            'cnName': result.cnName,
                            'process.businessCode' : result.serialNo,
                            'processYg.businessCode' : result.serialNo,
                            'process.businessKey' : result.id,
                            'processYg.businessKey' : result.id,
                        })
                    });
                }
            });
        },
        created:  function(){
            this.process.userId = sessionStorage.getItem("loginName");
            this.processYg.userId = sessionStorage.getItem("loginName");
            this.process.publishCode = 'WF_HR_001_2';
            this.processYg.publishCode = 'WF_HR_001_1';
            this.emergency();
        },
        methods: {
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
                this.cnName = this.filterName[index].name;
                this.post.employeeBaseId = this.filterName[index].baseId;
                this.replaceShow = false;
                this.replaceName = '';
                this.filterName = [];
            },
            LoadData: function (callback) {
                let that = this;
                let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
                that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETBASEAPPLYLIST).then((response)=>{
                    let Data = response.json().result;
                    that.selected = Data;
                    for (var i = 0; i < Data.length; i++) {
                        that.listName.push({name:Data[i].cnName,baseId:Data[i].baseId,applyTime:Data[i].applyTime});
                    }
                    callback();
                });
                this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERZZSQ).then((serial) => {
                    serial = JSON.parse(serial.data).result;
                    that.info.officeName = serial.officeName;             //申请部门
                    if(!businessKey){
                        that.post.serialNo = serial.serialNumber;
                        that.process.businessCode = serial.serialNumber;
                        that.processYg.businessCode = serial.serialNumber;
                        that.process.businessKey = serial.uuId;
                        that.processYg.businessKey = serial.uuId;
                        that.post.id = serial.uuId;
                    }
                });
            },
            save: function () {
                let vm = this;
                vm._save(function () {
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
            cancelProcess: function () {
                let vm = this;
                vm.options = {
                    title: '温馨提示',
                    message: '您确定要取消新建流程吗？',
                    isShow: true
                };
                vm.confirm = {
                    text: '确定',
                    callback: function () {
                        vm.isCompleted = true;
                        vm.$router.go('/process/new');
                        vm.options.isShow = false;
                    }
                };
                vm.cancel = {
                    text: '取消',
                    callback: function () {
                        vm.options.isShow = false;
                    }
                };
                vm.close = {
                    callback: function () {
                        vm.options.isShow = false;
                    }
                }
            },
            submit: function (e) {
                let vm = this;
                let userId = sessionStorage.getItem("loginName");
                vm._save(function () {
                    e.target.disabled = true
                    vm.lookscreen.isShow = true;
                    if (vm.humanTaskId) {
                        // update
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
                        //员工或者管理的流程判断
                        if(vm.action.isPrimaryPerson == 0){
                            vm.processYg.bussinessDataJsonStr = JSON.stringify({
                                auditTarget: vm.auditTarget,
                                targetRespon:vm.targetRespon,
                                urgencyDegreeId:vm.post.urgencyDegreeId,
                                urgencyDegreeDispay:vm.urgencyDegreeDispay,
                            });
                            vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_STARTPROCESS, vm.processYg).then((response)=>{
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
                        }else{
                            vm.process.bussinessDataJsonStr = JSON.stringify({
                                departmentCode: vm.departmentCode,
                                auditTarget: vm.auditTarget,
                                urgencyDegreeId:vm.post.urgencyDegreeId,
                                urgencyDegreeDispay:vm.urgencyDegreeDispay,
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
                    }
                })
            },
            _save: function (callback) {
                let vm = this;
                if (vm.$validation.invalid) {
                    vm.options = {
                        title: '温馨提示',
                        message: '表单验证未通过!',
                        isShow: true
                    };
                    vm.confirm = {
                        text: '确定',
                        callback: function () {
                            vm.validating = true;
                            vm.options.isShow = false;
                        }
                    };
                    vm.close = {
                        callback: function () {
                            vm.validating = true;
                            vm.options.isShow = false;
                        }
                    };
                    return false
                }
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEEMPLOYEEAPPLY, this.post).then((response)=>{
                    let status = response.json().status;
                    if (status == 0) {
                        callback();
                    }
                });
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
            emergency: function(){
                var that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS,{type: 'urgency_degree'}).then(function (response) {
                    var Data = response.json().result;
                    that.emergencyList = Data;
                })
            }
        }
    }
</script>
