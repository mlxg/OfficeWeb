<!-- 人事管理 --- 人事管理 --- 解聘审批 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{post.title}}</h2>
    <validator name="validation">
        <form novalidate class="clearfix">
        <Tip-border tip="基本信息">
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
                        <input type="text" class="form-control" readonly v-model="post.firedName" @click="peoples" v-validate:employee="['required']">
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
                    <input type="text" class="form-control" readonly v-model="datas.positionsDisplay">
                </div>
                <label for="" class="col-sm-2 control-label">入职日期：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="datas.entrantTime">
                </div>
            </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">工龄（年）：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="datas.entrantAge">
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
                <label for="" class="col-sm-2 control-label">平均月薪：</label>
                <div class="col-sm-4">
                    <input type="number" class="form-control" v-model="post.monthlySalary" oninput="if(value.length>9)value=value.slice(0,9)">
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
    <div class="form-group g-tc g-marginT20">
        <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="submit($event)">提交流程</button>
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
    import * as type from '../../constants/globalSelectTypes';
    import TipBorder from '../../components/public/TipBorder.vue';
    import PublicTable from '../../components/public/PublicTable.vue';
    import ToolSelection from '../../components/public/ToolSelection.vue';
    import PublicCalendar from '../../components/public/PublicCalendar';
    import ToolUpload from '../../components/public/ToolUpload';
    import PublicModal from '../../components/public/PublicModal'
    import LookScreen from '../../components/public/LockScreen.vue'
    import Text from '../../components/public/PublicTextLength'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        components: {
            TipBorder,
            PublicTable,
            ToolSelection,
            ToolUpload,
            PublicCalendar,
            PublicModal,
            Text,
            LookScreen
        },
        props: ['taskId', 'humanTaskId', 'businessKey'],
        data: function () {
            return {
                selected:[],
                replaceShow: false,
                replaceName:'',
                filterName:[],
                listName:[],
                emergencyList:[],
                departmentCode:'',
                urgencyDegreeDispay:'',
                type: [
                    type.URGENCY_DEGREE,
                    type.LEAVE_CATEGORY
                ],
                post: {
                    id: '', // 解聘申请ID
                    serialNo: '', // 解聘申请编号
                    title:'',
                    urgencyDegreeId: '', // 紧急程度
                    dismissalPerson:'',
                    officeId:'',
                    leaveDate: '', // 拟定离职时间
                    dismissalReason: '', // 解聘原因
                    compensationReason: '', // 补偿原因
                    monthlySalary: '', // 平均月薪（更新时才需要传的值）
                    maxCompensation: '', // 最大可能经济补偿（更新时才需要传的值）

                    firedName:'',
                    firedNameId:'',
                    employeeNo: '', // 工号


                },
                datas:{
                    positionsDisplay:'',
                    positionsLevelDisplay:'',
                    entrantTime:'',
                    officeName:'',
                    postionName:'',
                    entrantAge:'',
                },
                process: {
                    userId: '',
                    businessKey: '',
                    publishCode: '',
                    businessType: 'JPSQ',
                    appId: 'starOffice',
                    businessCode: '',
                    businessTitle: '',
                    bussinessDataJsonStr: {
                        departmentCode: '',
                        urgencyDegreeId: '',
                        urgencyDegreeDispay:'',
                    }
                },
                calendar: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-'
                },
                valida:{
                    urgency:'',
                    leave: '',
                    compensationReason:'',
                    maxCompensation:'',
                    dismissalReason:'',
                    prodate:'',
                    other:''
                },
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                lookscreen:{
                    isShow:false,
                },
            }
        },
        computed: {
          /*businessTitle: function(){
            let vm = this;
            let str = (vm.datas.officeName?vm.datas.officeName+'-':'') + (vm.datas.postionName?vm.datas.postionName+'职位-':'') + (vm.datas.cnName?vm.datas.cnName+'的':'') + '解聘申请表';
            vm.process.businessTitle = str;
            vm.post.title = str;
            return str;
          },*/
          businessTitle:function  () {
            let vm = this;
            let str = vm.deptName+'-'+vm.post.firedName+' 人事解聘流程'
            vm.post.title = str;
              return str
          }
        },
        created: function () {
            this.process.publishCode = 'WF_HR_006';
            this.process.userId = sessionStorage.getItem("loginName");
            this.uid = sessionStorage.getItem("userId");
            this.emergency();
        },
        asyncData: function (resolve, reject) {
            let that = this;
            //判断id 进入的路径
            let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
            if(businessKey){
                //包含id则更新页面
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEDISMISSAL,{id :businessKey}).then(function (response) {
                    let result = response.json().result;
                    console.log(result.title)
                    resolve({
                        'post.title':result.title,
                        'post.serialNo': result.serialNo,
                        'post.dismissalPerson': result.dismissalPerson,
                        'post.firedName': result.dismissalName,
                        'post.id': result.id,
                        'post.employeeNo': result.employeeNo,
                        'datas.positionsDisplay': result.positionsDisplay,
                        'datas.entrantTime': result.entrantTime,
                        'datas.entrantAge': result.entrantAge,

                        'post.urgencyDegreeId': result.urgencyDegreeId,
                        'post.leaveDate': result.leaveDate,
                        'post.dismissalReason': result.dismissalReason,
                        'post.monthlySalary': result.monthlySalary,
                        'post.maxCompensation': result.maxCompensation,
                        'datas.deptName': result.deptName,
                        'datas.officeName': result.officeName,
                        'post.compensationReason': result.compensationReason,
                        'post.officeId': result.officeId
                    })
                    that.getPeopleList(that.uid)
                    that.process.businessKey = that.post.id;
                    that.process.businessCode = that.post.serialNo;
                })
            }else{
                this.loadData();
            }
        },
        watch: {
            'post.urgencyDegreeId': function (val){
                let urg = this.emergencyList.find((item) => item.value === val);
                if(!urg) return;
                this.urgencyDegreeDispay = urg.label;
            },
            'post.firedName': function (val){
                let vm = this;
                let str = vm.datas.deptName+'-'+val+' 人事解聘流程'
                vm.process.businessTitle = str
                vm.post.title = str;
                vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDISMISSALPERSONBYID,{userId:vm.post.dismissalPerson}).then((response) => {
                    let Data = response.json().result;
                    vm.post.employeeNo = Data.employeeNo;
                    vm.datas.positionsDisplay = Data.positionsDisplay;
                    vm.datas.entrantTime = Data.entrantTime;
                    vm.post.entrantTime = Data.entrantTime;
                    vm.datas.entrantAge = Data.entrantAge;
              });
            }
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
                this.post.firedName = this.filterName[index].name;
                this.post.dismissalPerson = this.filterName[index].baseId;
                this.replaceShow = false;
                this.replaceName = '';
                this.filterName = [];
            },
            onTouched: function (id) {
                if(this.$validation[id].required){
                    this.valida[id] = '必填项';
                }else if(this.$validation[id].maxlength){
                    this.valida[id] = '不能超过六百字';
                }
            },
            loadData: function(){
                var that = this;
                this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERJPSQ).then((response) => {
                    let Data = response.json().result;
                    let serviceData = Data.serviceData;
                    that.datas.deptName = serviceData.deptName;
                    that.post.title = serviceData.deptName+'-'+that.post.firedName+' 人事解聘流程'
                    that.post.id = Data.uuId;
                    that.post.serialNo = Data.serialNumber;

                    that.post.officeId = Data.officeId;
                    // that.datas.entrantTime = Data.serviceData.entrantTime;
                    that.datas.officeName = Data.serviceData.officeName;
                    that.datas.postionName = Data.serviceData.postionName;
                    that.datas.positionsLevelDisplay = Data.serviceData.positionsLevelDisplay;
                    that.datas.conEndDate = Data.serviceData.conEndDate;
                    that.datas.cnName = Data.serviceData.cnName;
                    that.process.businessCode = Data.serialNumber;
                    that.process.businessKey= Data.uuId;
                    that.offices(that.post.officeId);
                    that.getPeopleList(that.uid)
                });

            },
            getPeopleList:function (uid) {
                let that = this;
                    that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDISMISSALPERSONLIST,{'userId':uid}).then((response)=>{
                        let Data = response.json().result;
                        that.selected = Data;
                        for (var i = 0; i < Data.length; i++) {
                            that.listName.push({name:Data[i].name,baseId:Data[i].id});
                        }
                    });
            },
            offices: function (id) {
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id: id}).then(function (response) {
                    var Data = response.json().result;
                    this.departmentCode = Data.departmentCode;
                });
            },
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
            cancelProcess: function () {
                let vm = this;
                if(!vm.stationList || !vm.stationList.length){
                    vm.isCompleted = true;
                    vm.$router.go('/process/new');
                    return false;
                }
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
            emergency: function(){
                var that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS,{type: 'urgency_degree'}).then(function (response) {
                    var Data = response.json().result;
                    that.emergencyList = Data;
                })
            },
            route: {
                canDeactivate: function (transition) {
                    let vm = this;
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
                            vm.options.isShow = false;
                        }
                    }
                }
            },
        }
    }
</script>
