<!-- 人事管理 --- 人事管理 --- 离职申请 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
    <validator name="validation">
        <form novalidate class="clearfix">
        <Tip-border tip="申请资料">
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">编号：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="post.serialNo">
                </div>
                <label for="" class="col-sm-2 control-label">入职时间：</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" readonly v-model="datas.entrantTime">
                </div>
            </div>

            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">紧急程度：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.urgencyDegreeId"
                                    @touched="onTouched('urgency')"
                                    v-validate:urgency="{ required: true}" ></Tool-Selection>
                    <p class="v-red">{{valida.urgency}}</p>
                </div>
                <label for="" class="col-sm-2 control-label">所属部门：</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" readonly v-model="datas.officeName">
                </div>
            </div>

            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">职位：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly v-model="datas.postionName">
                </div>
                <label for="" class="col-sm-2 control-label">职级：</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" readonly v-model="datas.positionsLevelDisplay">
                </div>
            </div>

            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">拟定离职时间：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control input-calendar" v-model="post.protocolLeaveDate" @click.stop="calendar.show = true"
                           @touched="onTouched('prodate')"
                           v-validate:prodate="{ required: true}">
                    <p class="v-red">{{valida.prodate}}</p>
                    <Public-Calendar
                      :value.sync="post.protocolLeaveDate"
                      :show.sync="calendar.show"
                      :x="calendar.x"
                      :y="calendar.y"
                      :sep.sync="calendar.sep"></Public-Calendar>
                </div>
                <label for="" class="col-sm-2 control-label">合同到期时间：</label>
                <div class="col-sm-4">
                  <input type="text" class="form-control" readonly v-model="datas.conEndDate">
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="离职原因">
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">离职类别：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="post.leaveCategoryId"   @touched="onTouched('leave')"
                                    v-validate:leave="{ required: true}" ></Tool-Selection>
                    <p class="v-red">{{valida.leave}}</p>
                </div>
            </div>

            <div class="form-group clearfix m-check-list">
                <label for="" class="col-sm-2 control-label field-require">离职原因：</label>
                <div class="col-sm-10" v-validate-class>
                    <Text :text-value='post.leaveReason' :max-length="600">
                        <textarea class="form-control" rows="3" v-model="post.leaveReason" @touched="onTouched('leavereason')"
                                  v-validate:leavereason="{ required: true,  maxlength: 600 }"></textarea>
                        <p class="v-red">{{valida.leavereason}}</p>
                    </Text>

                </div>
            </div>
            <div class="form-group clearfix m-check-list">
                <label for="" class="col-sm-2 control-label">联系方式：</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" v-model="post.contactWay" placeholder="今后的联系方式">
                </div>
            </div>
            <div class="form-group clearfix m-check-list">
                <label for="" class="col-sm-2 control-label">其他说明：</label>
                <div class="col-sm-10" v-validate-class>
                    <Text :text-value='post.otherExplain' :max-length="600">
                        <textarea class="form-control" rows="3" v-model="post.otherExplain" @touched="onTouched('other')"
                                  v-validate:other="{ maxlength: 600 }"></textarea>
                        <p class="v-red">{{valida.other}}</p>
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
                emergencyList:[],
                departmentCode:'',
                urgencyDegreeDispay:'',
                type: [
                    type.URGENCY_DEGREE,
                    type.LEAVE_CATEGORY
                ],
                post: {
                    id: '', // 离职申请ID
                    title:'',
                    officeId:'',
                    serialNo: '', // 离职申请编号
                    urgencyDegreeId: '', // 紧急程度
                    protocolLeaveDate: '', // 拟定离职时间
                    leaveCategoryId: '', // 离职类别
                    leaveReason: '', // 离职原因
                    contactWay: '', // 联系方式
                    otherExplain: '' // 其他说明
                },
                datas:{
                    positionsLevelDisplay:'',
                    entrantTime:'',
                    officeName:'',
                    postionName:'',
                    conEndDate:'',
                },
                process: {
                    userId: '',
                    businessKey: '',
                    publishCode: '',
                    businessType: 'LZSQ',
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
                    leavereason:'',
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
          businessTitle: function(){
            let vm = this;
            let str = (vm.datas.officeName?vm.datas.officeName+'-':'') + (vm.datas.postionName?vm.datas.postionName+'职位-':'') + (vm.datas.cnName?vm.datas.cnName+'的':'') + '离职申请单';
            vm.process.businessTitle = str;
            vm.post.title = str;
            return str;
          }
        },
        created: function () {
            this.process.publishCode = this.$route.params.processId;
            this.process.userId = sessionStorage.getItem("loginName");
            this.emergency();
        },
        asyncData: function (resolve, reject) {
            let that = this;
            //判断id 进入的路径
            let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
            if(businessKey){
                //包含id则更新页面
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDLEAVE,{id :businessKey}).then(function (response) {
                    let result = response.json().result;
                    resolve({
                        'post.id': result.id,
                        'post.serialNo': result.serialNo,
                        'datas.postionName': result.postionName,
                        'datas.positionsLevelDisplay': result.positionsLevelDisplay,
                        'datas.entrantTime': result.entrantTime,
                        'datas.conEndDate': result.conEndDate,
                        'datas.officeName': result.officeName,
                        'datas.cnName': result.createByName,
                        'post.urgencyDegreeId': result.urgencyDegreeId,
                        'post.protocolLeaveDate': result.protocolLeaveDate,
                        'post.leaveCategoryId': result.leaveCategoryId,
                        'post.leaveReason': result.leaveReason,
                        'post.contactWay': result.contactWay,
                        'post.otherExplain': result.otherExplain,
                        'post.officeId': result.officeId,
                    })
                    that.process.businessKey = that.post.id;
                    that.process.businessCode = that.post.serialNo;
                    that.offices(that.post.officeId);
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
        },
        methods: {
            onTouched: function (id) {
                if(this.$validation[id].required){
                    this.valida[id] = '必填项';
                }else if(this.$validation[id].maxlength){
                    this.valida[id] = '不能超过六百字';
                }
            },
            loadData: function(){
                var that = this;
                this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERLZSQ).then((response) => {
                    let Data = response.json().result;
                    that.post.id = Data.uuId;
                    that.post.serialNo = Data.serialNumber;
                    that.post.officeId = Data.officeId;
                    that.datas.entrantTime = Data.serviceData.entrantTime;
                    that.datas.officeName = Data.serviceData.officeName;
                    that.datas.postionName = Data.serviceData.postionName;
                    that.datas.positionsLevelDisplay = Data.serviceData.positionsLevelDisplay;
                    that.datas.conEndDate = Data.serviceData.conEndDate;
                    that.datas.cnName = Data.serviceData.cnName;
                    that.process.businessCode = Data.serialNumber;
                    that.process.businessKey= Data.uuId;
                    that.offices(that.post.officeId);
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
                        vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVELEAVE, vm.post).then((response)=>{
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
