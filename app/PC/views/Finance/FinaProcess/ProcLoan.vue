<!-- 流程中心 --- 我的申请 -->
<template>
<h3 class="u-fs20 g-tc">{{post.title}}</h3>
    <validator name="validation">
        <form novalidate class="clearfix">
        <Tip-border tip="借款基本信息" v-if='isEdit'>
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
        </Tip-border>
    <Tip-border tip="借款基本信息" v-if='!isEdit'>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">报销编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">借款人：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.createName}}</span>
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
            <label for="" class="col-sm-2 control-label g-tr">职位：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.positionsDisplay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">收款单位：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.payeeDispay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">所属项目：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.projectValueDispay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">所属公司：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.companyDispay}}</span>
            </div>
        </div>
    </Tip-border>
    <Tip-border tip="借款详细信息" v-if='isEdit'>
            <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">账户名称：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.loanName"
                               v-validate:lname="{required: true}" maxlength="20">
                        <span class="fc-red" v-show="($validation.lname.touched || validating) && $validation.lname.required">必填项</span>
                        <!-- <span class="fc-red" v-show="post.formalSalary && $validation.posm.touched && $validation.posm.pattern">格式错误</span> -->
                    </div>
                    <label class="col-sm-2 control-label field-require">账号：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.bankNo"
                               v-validate:lono="{required: true}" maxlength="20">
                        <span class="fc-red" v-show="($validation.lono.touched || validating) && $validation.lono.required">必填项</span>
                        <!-- <span class="fc-red" v-show="post.formalSalary && $validation.posm.touched && $validation.posm.pattern">格式错误</span> -->
                    </div>
            </div>
            <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">开户行：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.bankBranch"
                               v-validate:bbn="{required: true}" maxlength="20">
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
                    <span class="fc-red" v-show="($validation.apreason.touched || validating) && $validation.apreason.maxlength">理由过长</span>
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
        <Tip-border tip="借款详细信息" v-if='!isEdit'>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">账户名称：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.loanName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">账号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.bankNo}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">开户行：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.bankBranch}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr">借款金额：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.loanAmount}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">预计还款时间：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.repaymentDate}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">申请理由：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.applyReasons}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label class="col-sm-2 control-label">附件下载：</label>
            <div class="col-sm-4">
                <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
            </div>
        </div>
        </Tip-border>
        <Tip-border tip="出纳确认信息" v-if='cn != -1'>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">确认款项时间：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control input-calendar" v-model="post.paymentTime" @click.stop="calendar2.show = true"
                           @touched="onTouched('prodate')"
                           v-validate:prodate="{ required: true}">
                    <p class="v-red">{{valida.prodate}}</p>
                    <Public-Calendar
                      :value.sync="post.paymentTime"
                      :show.sync="calendar2.show"
                      :x="calendar2.x"
                      :y="calendar2.y"
                      :sep.sync="calendar2.sep"></Public-Calendar>
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
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)" v-if='cn != -1'>付款</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)" v-if='cn == -1'>同意</button>
        <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)" v-if='cn == -1'>驳回</button>
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
    import Crumb from '../../../components/public/PublicCrumb.vue';
    import TipBorder from '../../../components/public/TipBorder.vue';
    import * as type from '../../../constants/globalSelectTypes';
    import ToolSelection from '../../../components/public/ToolSelection.vue';
    import ToolUpload from '../../../components/public/ToolUpload'
    import PublicCalendar from '../../../components/public/PublicCalendar';
    import PublicModal from '../../../components/public/PublicModal'
    import ProcessDiagram from '../../../components/others/ProcessDiagram';
    import ApproveList from '../../../components/others/ApproveList';
    import ProcessApprove from '../../../components/others/ProcessApprove';
    import Text from '../../../components/public/PublicTextLength'
    import LookScreen from '../../../components/public/LockScreen.vue'
    import * as content from '../../../constants/contentTypes';
    import * as interfaces from '../../../constants/interfaceTypes';
    export default{
        props: ['taskId', 'businessKey', 'humanTaskId','cn'],
        components: {
            Crumb,
            TipBorder,
            ToolSelection,
            ToolUpload,
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
                fileList: [],
                post:{},
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
                isEditAA:false,
                isEdit:false,
                comment:'',
                comments:false,
                isShow: false,
                type: [
                    type.URGENCY_DEGREE,
                    type.PROJECT_TYPE,
                    type.PAYEE_TYPE,
                    type.BELONG_COMPANY
                ],
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
                    prodate:''
                },
            }
        },
        asyncData: function (resolve, reject) {
            let that = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETACCOUNTLOAN,{'bussinessData':{'id':this.businessKey}}).then(function (response) {
                var Data = response.json().result;
                that.post = Data;
                that.post.title= Data.officeName + ' - ' + Data.createName + ' 的借款申请';

                if((that.Competence.taskFormKey == "jksq_zjlzc_edit")||(that.Competence.taskFormKey == "jksq_ty_edit")){
                    resolve({
                        'isEdit': true,
                    })
                    if (Data.projectValue == 'STAR_SKIP_CODE') {
                        that.post.projectValue = Data.projectValue
                        that.projectText = '星星打车'
                        that.isProjCanBeChoose = false;
                    }else if(Data.projectValue == 'JR_SKIP_CODE'){
                        that.post.projectValue = Data.projectValue
                        that.projectText = '汽车金融'
                        that.isProjCanBeChoose = false;
                    }
                    that.officeName = Data.officeName
                }else if((that.Competence.taskFormKey == "jksq_zjlzc_cn")||(that.Competence.taskFormKey == "jksq_ty_cn")||(that.Competence.taskFormKey == "jksq_jrshfwb_cn")){
                    resolve({
                        'isEditAA': true,
                    })
                }

            })
            that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: that.businessKey}).then((response) => {
                    that.fileList = response.json().result
            })
        },
        created: function () {
            this.uid = sessionStorage.getItem("userId");
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[3].match(/\w+/)[0];
            this.humanTaskId = hash[1].match(/\w+/)[0];
            this.taskId = hash[2].match(/\w+/)[0];
            this.task();
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
                            amount:vm.post.loanAmount,
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
                                departmentCode:self.post.projectValue,
                                amount:self.post.loanAmount
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
                        vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEACCOUNTLOAN, {'bussinessData':vm.post}).then((response)=>{
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
                    if (vm.isEditAA) {
                        vm.comment = '付款'
                    };
                }else{
                    vm.comment = '不同意'
                }
                if(!(vm.isEdit)&&!(vm.isEditAA)){
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
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEACCOUNTLOAN, {'bussinessData':this.post}).then((response) => {
                    let status = response.json().status;
                    if(status == 0){
                        vm.isShow = true;
                    }
                });
            },
            //取消
            cancelProcess: function () {
                this.$router.go('/process/todo')
            },
            /*dicts: function (datas,type) {
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS,{type:type}).then(function (response) {
                    let Data = response.json().result;
                    that.$set(datas,Data);
                })
            },*/
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
