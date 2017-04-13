<!-- 借款 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{post.title}}</h2>
    <validator name="validation">
        <Tip-border tip="借款基本信息">
            <div class="g-padding20">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">报销编号：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="post.serialNo">
                    </div>
                    <label class="col-sm-2 control-label">所属部门：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="officeName" readonly>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">紧急程度：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.urgencyDegreeId"
                                        v-validate:ud="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.ud.touched || validating) && $validation.ud.required">必填项</span>
                    </div>
                    <label class="col-sm-2 control-label field-require">收款单位：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.payeeValue"
                                        v-validate:pyv="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.pyv.touched || validating) && $validation.pyv.required">必填项</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <div v-if='isProjCanBeChoose'>
                    <label class="col-sm-2 control-label field-require">所属项目：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="post.projectValue"
                                        v-validate:pjv="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.pjv.touched || validating) && $validation.pjv.required">必填项</span>
                    </div>
                    </div>
                    <div v-if='!isProjCanBeChoose'>
                    <label class="col-sm-2 control-label field-require">所属项目：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="projectText" readonly>
                    </div>
                    </div>
                    <label class="col-sm-2 control-label field-require">所属公司：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.companyValue"
                                            v-validate:cpv="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.cpv.touched || validating) && $validation.cpv.required">必填项</span>
                    </div>
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="借款详细信息">
            <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">账户名称：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.loanName"
                               v-validate:lname="{required: true}" maxlength="40" autocomplete="on" placeholder="请输入收款账户姓名/公司全称">
                        <span class="fc-red" v-show="($validation.lname.touched || validating) && $validation.lname.required">必填项</span>
                        <!-- <span class="fc-red" v-show="post.formalSalary && $validation.posm.touched && $validation.posm.pattern">格式错误</span> -->
                    </div>
                    <label class="col-sm-2 control-label field-require">账号：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.bankNo"
                               v-validate:lono="{required: true}" maxlength="30" autocomplete="on">
                        <span class="fc-red" v-show="($validation.lono.touched || validating) && $validation.lono.required">必填项</span>
                        <!-- <span class="fc-red" v-show="post.formalSalary && $validation.posm.touched && $validation.posm.pattern">格式错误</span> -->
                    </div>
            </div>
            <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">开户行：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.bankBranch"
                               v-validate:bbn="{required: true}" maxlength="20" autocomplete="on" placeholder="请输入银行卡所属银行">
                        <span class="fc-red" v-show="($validation.bbn.touched || validating) && $validation.bbn.required">必填项</span>
                        <!-- <span class="fc-red" v-show="post.formalSalary && $validation.posm.touched && $validation.posm.pattern">格式错误</span> -->
                    </div>
                    <label class="col-sm-2 control-label field-require">借款金额：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.loanAmount"
                               v-validate:loa="{required: true, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}" maxlength="9">
                        <span class="fc-red" v-show="($validation.loa.touched || validating) && $validation.loa.required">必填项</span>
                        <span class="fc-red" v-show="post.loanAmount && $validation.loa.touched && $validation.loa.pattern">请输入金额</span>
                    </div>
            </div>
            <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">预计还款时间：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control input-calendar" v-model="post.repaymentDate"
                               v-validate:rptime="{required: true}"
                               @click.stop="calendar.show = true" readonly>
                        <span class="fc-red" v-show="($validation.rptime.touched || validating) && $validation.rptime.required">必填项</span>
                        <Public-Calendar
                                :value.sync="post.repaymentDate"
                                :show.sync="calendar.show"
                                :x="calendar.x"
                                :y="calendar.y"
                                :sep.sync="calendar.sep"></Public-Calendar>
                    </div>
            </div>
            <div class="form-group g-marginB20 clearfix"  v-validate-class>
                <label class="col-sm-2 control-label field-require">申请理由：</label>
                <Text :text-value='post.applyReasons' :max-length="600" :class-name="'col-sm-10'">
                        <textarea class="form-control"  rows="3" v-model="post.applyReasons"
                                  v-validate:apreason="{required: true, maxlength: 600}" ></textarea>
                    <span class="fc-red" v-show="($validation.apreason.touched || validating) && $validation.apreason.required">必填项</span>
                    <span class="fc-red" v-show="($validation.apreason.touched || validating) && $validation.apreason.maxlength">评语过长</span>
                </Text>
            </div>

            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">上传附件：</label>
                <div class="col-sm-10">
                    <Tool-Upload :files.sync="fileList" :resource-id="post.id" :resource-type="'1'"></Tool-Upload>
                    <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
                </div>
            </div>
        </Tip-border>
        <div class="form-group g-tc g-marginT20">
            <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
            <button type="button" class="btn btn-primary g-marginR30" @click="onSubmit($event)">提交流程</button>
            <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
        </div>
        <!--</form>-->
    </validator>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Process-Diagram v-if="taskId" :process-instance-id="taskId"></Process-Diagram>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
    import TipBorder from '../../../components/public/TipBorder.vue'
    import ToolSelection from '../../../components/public/ToolSelection.vue'
    import * as type from '../../../constants/globalSelectTypes'
    import PublicTable from '../../../components/public/PublicTable.vue'
    import ProcessDiagram from '../../../components/others/ProcessDiagram';
    import PublicCalendar from '../../../components/public/PublicCalendar'
    import PublicModal from '../../../components/public/PublicModal'
    import LookScreen from '../../../components/public/LockScreen.vue'
    import ToolUpload from '../../../components/public/ToolUpload'
    import Text from '../../../components/public/PublicTextLength'
    import { getData, changeCurRoute, initCurRoute } from '../../../actions/headNavbarAction'
    import { getNavBar, getUrl, getCurRoute, getIgnoreRoute, getSingleRoute } from '../../../getters/headNavbarGetter'
    import * as content from '../../../constants/contentTypes';
    import * as interfaces from '../../../constants/interfaceTypes';
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
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            TipBorder,
            ProcessDiagram,
            ToolSelection,
            PublicTable,
            PublicCalendar,
            PublicModal,
            ToolUpload,
            Text,
            LookScreen
        },
        data: function(){
            return {
                isProjCanBeChoose:true,
                projectText:'',
                isShowFormalSalary:false,
                emergencyList:[],
                urgencyDegreeDispay:'',
                departmentCode: '',
                targetRespon: '',
                post: {
                    loanName:'',
                    bankNo:'',
                    bankBranch:'',
                    title:'',
                    id: '',                                             //主键
                    serialNo: '',                                       //招聘编号
                    urgencyDegreeId:''                                 //紧急程度
                },
                title:'',                                               //录用申请标题
                positionNameId:'',                                      //录用申请职位id
                officeName:'',                                          //申请部门
                officeNames:'',
                departName:'',                                          //录用部门
                postionName:'',                                         //录用申请职位
                //考核类型
                assessType : 'human_resource_test',
                //部门
                departs: [
                    {
                        name: "",
                        pId: "",
                        id: "",
                        pIds: ""
                    }
                ],
                searchDepart:[

                ],
                selected:'',
                toWorkTime:'',
                //部门对应职位
                recruitDutyList:[
                    {
                        id: "",
                        isNewRecord: false,
                        postionName: "",
                    }
                ],
                //流程
                process: {
                    userId: '',
                    businessKey: '',
                    publishCode: '',
                    typeCode:'QJLX',
                    businessType: 'JKSQ',
                    appId: 'starOffice',
                    businessCode: '',
                    businessTitle: '',
                    bussinessDataJsonStr: {
                        departmentCode: '',
                        targetRespon:'',
                        urgencyDegreeId:'',
                        urgencyDegreeDispay:'',
                    }
                },
                calendar: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-',
                },
                calendar2: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-',
                },
                //校验
                validating: false,
                data: {
                    data: '',
                    total: 0,
                    pageNumber: 1
                },
                fileList: [],
                page:{
                    "pageSize":"5",
                    "pageNo":"1",
                },
                searchs:{
                    serialNo:'',
                    officeId:''
                },
                type: [
                    type.URGENCY_DEGREE,
                    type.PROJECT_TYPE,
                    type.PAYEE_TYPE,
                    type.BELONG_COMPANY
                ],
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                lookscreen:{
                    isShow:false,
                },
            }
        },
        watch: {
            'post.urgencyDegreeId': function (val){
                let urg = this.emergencyList.find((item) => item.value === val);
                if(!urg) return;
                this.urgencyDegreeDispay = urg.label;
            }
        },
        route: {
            canDeactivate: function (transition) {
                let vm = this;
                let hash = transition.to.path.match(/^\/\w+/);
                if(hash[0] != '/process') hash = '/process';
                else hash = '';
                if(vm.isCompleted) transition.next();
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
    created: function(){
        let businessKey = this.$route.query.businessKey;
        let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
        //默认加载关联数据列表
        this.loadData();
        this.setCache();
        this.process.userId = sessionStorage.getItem("loginName");
        this.process.publishCode = this.$route.params.processId;
        this.emergency();
    },
    asyncData: function(resolve){
        let that = this;
        //判断id 进入的路径
        let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
        if(businessKey){
            //包含id则更新页面
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETACCOUNTLOAN,{'bussinessData':{'id':businessKey}}).then(function (response) {
                let result = response.json().result;
                if (result.projectValue == 'STAR_SKIP_CODE') {
                    that.post.projectValue = result.projectValue
                    that.projectText = '星星打车'
                    that.isProjCanBeChoose = false;
                }else if(result.projectValue == 'JR_SKIP_CODE'){
                    that.post.projectValue = result.projectValue
                    that.projectText = '汽车金融'
                    that.isProjCanBeChoose = false;
                }
                resolve({
                    'post.id': businessKey,
                    'post.serialNo': result.serialNo,
                    'post.officeName': result.officeName,
                    'post.urgencyDegreeId': result.urgencyDegreeId,
                    'post.payeeValue': result.payeeValue,
                    'officeNames': result.officeName,
                    'post.companyValue': result.companyValue,
                    'post.payeeValue': result.payeeValue,
                    'post.projectValue': result.projectValue,
                    'post.loanName': result.loanName,
                    'post.bankNo': result.bankNo,
                    'post.bankBranch': result.bankBranch,
                    'post.loanAmount': result.loanAmount,
                    'post.repaymentDate': result.repaymentDate,
                    'post.applyReasons': result.applyReasons,
                    'process.businessKey': businessKey
                })
            })
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: businessKey}).then((response) => {
                resolve({
                    'fileList': response.json().result
                })
            })

        }

    },
    methods : {
        setCache:function () {
            //缓存支付信息
            let cacheData =  localStorage.getItem(sessionStorage.getItem("userId"))
            let vm = this;
            if(!!cacheData){
                let cache = cacheData.split(',');
                vm.post.loanName = cache[0];
                vm.post.bankNo = cache[1];
                vm.post.bankBranch = cache[2];
            }
        },
        closed : function(){
            let vm = this;
            if(vm.post.officeId){
            }else{
                vm.options = {
                    title: '温馨提示',
                    message: '您确定要离开当前页吗？',
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
            }

        },
        //初始化数据
        loadData: function(){
            var that = this;
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERJKSQ).then((response) => {
                let Data = response.json().result;
                that.post.id= Data.uuId,
                that.post.title= Data.officeName + ' - ' + sessionStorage.getItem("userName") + ' 的借款申请',
                that.process.businessTitle = that.post.title
                that.post.serialNo= Data.serialNumber,
                that.officeName= Data.officeName,             //申请部门

                that.process.businessCode= Data.serialNumber,
                that.process.businessKey= Data.uuId;
                // Data.projectValue = 'JR_SKIP_CODE'
                if (Data.projectValue == 'STAR_SKIP_CODE') {
                    that.post.projectValue = Data.projectValue
                    that.projectText = '星星打车'
                    that.isProjCanBeChoose = false;
                }else if(Data.projectValue == 'JR_SKIP_CODE'){
                    that.post.projectValue = Data.projectValue
                    that.projectText = '汽车金融'
                    that.isProjCanBeChoose = false;
                }
            });
        },
        //提交
        onSubmit: function (e) {
            // validate manually
            var self = this
            let userId = sessionStorage.getItem("loginName");
            this.$validate(true, function () {
                if (self.$validation.invalid) {
                    e.preventDefault()
                }else{
                    self._save(function(){
                        e.target.disabled = true
                        self.lookscreen.isShow = true;
                        if(!self.businessKey){
                            self.process.bussinessDataJsonStr= JSON.stringify({
                                departmentCode:self.post.projectValue,
                                amount:self.post.loanAmount
                            });
                            self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_NEWSTARTPROCESS, self.process).then((response) => {
                                let status = response.json().status;
                                if(status == 0){
                                    self._submitSuc();
                                    e.target.disabled = false
                                    self.lookscreen.isShow = false;
                                }else{
                                    e.target.disabled = false
                                    self.lookscreen.isShow = false;
                                }
                            });
                        }else{
                            self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
                                'humanTaskId': self.humanTaskId,
                                'appros': true,
                                'userId' : userId
                            }).then((response) => {
                                let status = response.json().status;
                                if(status == 0){
                                    self._submitSuc();
                                    e.target.disabled = false
                                    self.lookscreen.isShow = false;
                                }else{
                                    e.target.disabled = false
                                    self.lookscreen.isShow = false;
                                }
                            })
                        }

                    });
                }
            })
        },
        //保存草稿
        save: function(e){
            let vm = this;
            vm._save(function () {
                vm.$validate(true, function () {
                    if (vm.$validation.invalid) {
                        e.preventDefault()
                    }else{
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
                    }
                })
            })
        },
        //提交接口
        _save: function(callback){
            let vm = this;
            //缓存账号金额账户名称等
            vm.loginName =  sessionStorage.getItem("userId");
            localStorage.setItem(vm.loginName, [vm.post.loanName,vm.post.bankNo,vm.post.bankBranch]);
            if(vm.$validation.invalid) {
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
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEACCOUNTLOAN,{'bussinessData':this.post}).then(function (response) {
                let status = response.json().status;
                if(status == 0){
                    callback();
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
