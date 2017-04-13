<!-- 人事管理 --- 人事管理 --- 录用申请 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
    <div class="form-group clearfix">
        <button type="button" class="btn btn-primary g-marxginR30 g-fr" @click="jobModule">关联招聘申请流程</button>
    </div>
    <validator name="validation">
        <!--<form class="clearfix" novalidate>-->
        <Tip-border tip="录用基本信息">
            <div class="g-padding20">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">录用编号：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="post.serialNo">
                    </div>
                    <label class="col-sm-2 control-label field-require">被录用人：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" maxlength="5" class="form-control"
                               v-validate:hiredpeople="{required: true,  maxlength: 5 , existName: { rule: true, initial: 'off' }}" v-model="post.cnName"/>
                        <span class="fc-red" v-show="($validation.hiredpeople.touched || validating) && $validation.hiredpeople.required">必填项</span>
                        <span class="fc-red" v-show="($validation.hiredpeople.touched || validating) && $validation.hiredpeople.existName">该名字已存在</span>
                        <span class="fc-red" v-show="($validation.hiredpeople.touched || validating) && $validation.hiredpeople.maxlength">名字过长</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">申请部门：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="officeName" readonly>
                    </div>
                    <label class="col-sm-2 control-label">录用部门：</label>
                    <div class="col-sm-4"  v-validate-class>
                        <input type="text" class="form-control" readonly v-model="officeNames">
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">职级：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.positionsLevelId" v-validate:pos-lv="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.posLv.touched || validating) && $validation.posLv.required">必填项</span>
                    </div>
                    <label class="col-sm-2 control-label">职位名称：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="postionName">
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">紧急程度：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.urgencyDegreeId"
                                        v-validate:eml="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.eml.touched || validating) && $validation.eml.required">必填项</span>
                    </div>
                    <label class="col-sm-2 control-label field-require">性质：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.employeeNatureId"
                                        v-validate:nature="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.nature.touched || validating) && $validation.nature.required">必填项</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">入职方式：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="4" :all-select-types="type" v-model="post.inductionFormId"
                                        v-validate:entrymethod="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.entrymethod.touched || validating) && $validation.entrymethod.required">必填项</span>
                    </div>
                    <label class="col-sm-2 control-label field-require">入职时间：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control input-calendar" v-model="post.entrantTime"
                               v-validate:entrant-time="{required: true}"
                               @click.stop="calendar.show = true" readonly>
                        <span class="fc-red" v-show="($validation.entrantTime.touched || validating) && $validation.entrantTime.required">必填项</span>
                        <Public-Calendar
                                :value.sync="post.entrantTime"
                                :show.sync="calendar.show"
                                :x="calendar.x"
                                :y="calendar.y"
                                :sep.sync="calendar.sep"></Public-Calendar>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">入职地点：</label>
                    <div class="col-sm-4">
                        <Tool-Selection :select-type-index="5" :all-select-types="type" v-model="post.workplaceId"></Tool-Selection>
                    </div>
                    <label class="col-sm-2 control-label field-require">手机号码：</label>
                    <div class="col-sm-4"v-if="humanTaskId">
                        <input type="text" class="form-control" v-model="post.mobile" disabled />
                    </div> <div class="col-sm-4" v-else v-validate-class>
                    <input type="text" class="form-control" v-model="post.mobile"
                           v-validate:mobile="{required: true, pattern: '/^(13[0-9]|14[0-9]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0|6|7|8])\\d{8}$/', existMobile: { rule: true, initial: 'off' }}" />
                    <span class="fc-red" v-show="($validation.mobile.touched || validating) && $validation.mobile.required">必填项</span>
                    <span class="fc-red" v-show="post.mobile && ($validation.mobile.touched || validating) && $validation.mobile.pattern">格式错误</span>
                    <span class="fc-red" v-show="($validation.mobile.touched || validating) && $validation.mobile.existMobile">该号码已使用</span>
                </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">个人邮箱：</label>
                    <!-- <div class="col-sm-4" v-else v-validate-class> -->
                    <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control" v-model="post.email"
                           v-validate:email="{required: true, validate_email: true}" />
                    <span class="fc-red" v-show="($validation.email.touched || validating) && $validation.email.required">必填项</span>
                    <span class="fc-red" v-show="post.email && ($validation.email.touched || validating) && $validation.email.validate_email">格式错误</span>
                </div>
                <!-- <label class="col-sm-2 control-label field-require">员工合同所属公司：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="6" :all-select-types="type" v-model="post.contractCompanyValue"
                                        v-validate:contract="{required: true}"></Tool-Selection>
                    <span class="fc-red" v-show="($validation.contract.touched || validating) && $validation.contract.required">必填项</span>
                </div> -->
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="人力资源部初试">
            <div class="form-group clearfix">
                <div class="col-sm-12">
                    <table width="83%" class="table table-striped table-hover table-bordered w83 g-fr">
                        <thead>
                        <th>项目</th>
                        <th>优</th>
                        <th>良</th>
                        <th>中</th>
                        <th>差</th>
                        </thead>
                        <tbody>
                        <tr v-for="item in post.assessmentList">
                            <th>{{ item.label }}</th>
                            <td><input type="radio" name="{{$index}}" v-model="item.score" value="0"></td>
                            <td><input type="radio" name="{{$index}}" v-model="item.score" value="1"></td>
                            <td><input type="radio" name="{{$index}}" v-model="item.score" value="2"></td>
                            <td><input type="radio" name="{{$index}}" v-model="item.score" value="3"></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="form-group g-marginB20 clearfix"  v-validate-class>
                <label class="col-sm-2 control-label">简况及评语：</label>
                <Text :text-value='post.testComment' :max-length="200" :class-name="'col-sm-10'">
                        <textarea class="form-control"  rows="3" v-model="post.testComment"
                                  v-validate:comment="{required: true, maxlength: 200}" ></textarea>
                    <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.required">必填项</span>
                    <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.maxlength">评语过长</span>
                </Text>
            </div>
        </Tip-border>
        <Tip-border tip="职位薪酬">
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label field-require">试用薪酬(元)：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control" v-model="post.testSalary"
                           v-validate:trym="{required: { rule: true }, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}" maxlength="9">
                    <span class="fc-red" v-show="($validation.trym.touched || validating) && $validation.trym.required">必填项</span>
                    <span class="fc-red" v-show="post.testSalary && $validation.trym.touched && $validation.trym.pattern">请输入金额</span>
                </div>
                <div v-if="isShowFormalSalary">
                    <label class="col-sm-2 control-label field-require">转正薪酬(元)：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.formalSalary"
                               v-validate:posm="{required: true, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}" maxlength="9">
                        <span class="fc-red" v-show="($validation.posm.touched || validating) && $validation.posm.required">必填项</span>
                        <span class="fc-red" v-show="post.formalSalary && $validation.posm.touched && $validation.posm.pattern">请输入金额</span>
                    </div>
                </div>
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


    <div class="mask1" v-show="jobmodule">
        <div class="mask-align"></div>
        <div class="notice-panel">
            <div class="notice-title">
                <div @click="closed" class="exit "></div>
                <h1>关联招聘申请流程</h1>
            </div>
            <div class="notice-content">
                <label class="control-label">申请日期：</label>
                <div class="g-pr">

                    <input type="text" class="form-control input-calendar" v-model="toWorkTime" @click.stop="calendar2.show = true" readonly>
                    <Public-Calendar
                            :value.sync="toWorkTime"
                            :type="calendar2.type"
                            :show.sync="calendar2.show"
                            :x="calendar2.x"
                            :y="calendar2.y"
                            :sep.sync="calendar2.sep"></Public-Calendar>
                </div>
                <label class=" control-label">申请部门：</label>
                <div class="">
                    <select class="form-control" v-model="selected">
                        <option v-for="item in searchDepart" v-bind:value="item.officeId" >{{item.officeName}}</option>
                    </select>
                </div>
                <label class=" control-label">招聘编号：</label>
                <div class="">
                    <input type="text" class="form-control" v-model="searchs.serialNo">
                </div>
                <button type="button" class="btn btn-primary g-marginR30" @click="quire">查询</button>
            </div>
            <div class="g-padding20"><public-table :config="params" :data="data"></public-table></div>
        </div>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Process-Diagram v-if="taskId" :process-instance-id="taskId"></Process-Diagram>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
    import TipBorder from '../../components/public/TipBorder.vue'
    import ToolSelection from '../../components/public/ToolSelection.vue'
    import * as type from '../../constants/globalSelectTypes'
    import PublicTable from '../../components/public/PublicTable.vue'
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import PublicCalendar from '../../components/public/PublicCalendar'
    import PublicModal from '../../components/public/PublicModal'
    import LookScreen from '../../components/public/LockScreen.vue'
    import ToolUpload from '../../components/public/ToolUpload'
    import Text from '../../components/public/PublicTextLength'
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
                isShowFormalSalary:false,
                emergencyList:[],
                urgencyDegreeDispay:'',
                departmentCode: '',
                targetRespon: '',
                post: {
                    title:'',
                    id: '',                                             //主键
                    serialNo: '',                                       //招聘编号
                    officeId:'',                                        //部门对应id
                    positionsId:'',                                     //录用申请职位id
                    employeeRecruitId:'',                               //关联的招聘需求id
                    urgencyDegreeId:'',                                 //紧急程度
                    cnName:'',                                          //被录用人
                    positionsLevelId:'',                                //职级，数据字典
                    employeeNatureId:'',                                //性质，数据字典
                    workplaceId:'',                                     //入职地点
                    entrantTime:'',                                     //入职日期
                    inductionFormId:'',                                 //入职方式
                    testComment:'',                                     //初试评语
                    testSalary:'',                                      //试用期薪资
                    formalSalary:'',                                    //转正薪资
                    mobile:'',                                          //联系方式
                    //考核类型
                    assessmentList:[
                    ],
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
                    businessType: 'LYSQ',
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
                jobmodule: true,
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
                params: {
                    className: 'table table-striped table-hover table-bordered mask-table',
                    pageSize: 5,
                    pageList: [5],
                    pagination: true,
                    sequence: false,
                    fields: [
                        {
                            name: 'serialNo',
                            text: '招聘编号',
                        },
                        {
                            name: 'title',
                            text: '标题'
                        },
                        {
                            name: 'officeName',
                            text: '部门'
                        },
                        {
                            name: 'postionName',
                            text: '职位名称'
                        },
                        {
                            name: 'requireNum',
                            text: '招聘人数'
                        },
                        {
                            name: 'createDate',
                            text: '申请日期'
                        },
                        {
                            name: 'createTime',
                            text: '操作',
                            operates: [
                                {
                                    text: '关联',
                                    className: 'btn btn-default',
                                    handler: function(obj) {
                                        let vm = this;
                                        vm.onloadinfo(obj.id);
                                    }
                                }
                            ]
                        }
                    ],
                    callback: function(arg){
                        let vm = this;
                        vm.inquire({
                            pageSize: arg.pageSize,
                            pageNo: arg.pageNumber,

                        })
                    }
                },
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
                    type.BELONG_PROJECT,
                    type.EMPLOYEE_NATURE,
                    type.EMPLOYEE_RANK,
                    type.INDUCTION_FORM,
                    type.WORK_PLACE,
                    type.CONTRACT_COMPANY
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
        computed: {
            businessTitle: function(){
                let vm = this;
                let str = (vm.officeNames?vm.officeNames+'-':'') + (vm.postionName?vm.postionName+'职位-':'') + (vm.post.cnName?vm.post.cnName+'的':'') + '录用申请单';
                vm.process.businessTitle = str;
                vm.post.title = str;
                return str;
            },
        },
        watch: {
            'post.urgencyDegreeId': function (val){
                let urg = this.emergencyList.find((item) => item.value === val);
                if(!urg) return;
                this.urgencyDegreeDispay = urg.label;
            },
            'post.employeeNatureId':function (val) {
                let vm = this;
                if (val == 3) {
                    vm.isShowFormalSalary = false;
                }else{
                    vm.isShowFormalSalary = true;
                };
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
        validators: {
          validate_email: function (val) {
            return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
          },
            existMobile (val) { // 验证手机号码是否已使用
        val = val.trim();
        if (!val) return Promise.resolve();
        if (val.length !== 11) return Promise.resolve();

        let vm = this.vm;
        return vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_ISMOBILEEXISTS, {mobile: val, id: vm.post.id}).then((response)=> {
            response = response.json();
            if (response.status == 0) {
                vm.post.mobile = val;
                if (response.result.exist) return Promise.reject('已使用')
                else return Promise.resolve();
            } else {
                return Promise.reject(response.message)
            }
        })
    },
    existName (val) { // 验证录用人是否重名
        val = val.trim();
        if(!val) return Promise.resolve();
        if(val == this.vm.post.cnName) return Promise.resolve();

        let vm = this.vm;
        return vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_ISMOBILEEXISTS, {name: val, id: vm.post.id}).then((response)=>{
            response = response.json();
            if(response.status == 0){
                vm.post.cnName = val;
                if(response.result.exist) return Promise.reject('重名')
                else return Promise.resolve();
            }else {
                return Promise.reject(response.message)
            }
        })
    }
    },
    created: function(){
        let businessKey = this.$route.query.businessKey;
        let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
        let keyid = hash[2].match(/\w+/)[0];
        if(businessKey || (keyid!='hr')){
            this.jobmodule = false;
        }
        //默认加载关联数据列表
        this.inquire(this.page);
        this.loadData();
        this.process.userId = sessionStorage.getItem("loginName");
        this.process.publishCode = this.$route.params.processId;
        this.searchDepartfn();
        this.emergency();
    },
    asyncData: function(resolve){
        let that = this;
        //判断id 进入的路径
        let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
        if(businessKey){
            //包含id则更新页面
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDAPPLICATION,{id :businessKey}).then(function (response) {
                let result = response.json().result;
                resolve({
                    'post.id': result.id,                                       //录用申请信息主键
                    'post.serialNo': result.serialNo,                           //录用申请编号
                    'post.cnName': result.cnName,                               //被录用人
                    'officeName': result.applyOfficeName,                       //申请部门
                    'post.officeId': result.officeId,                           //录用部门id
                    'officeNames': result.officeName,                           //录用部门
                    'post.positionsId': result.positionsId,                     //录用部门职位id
                    'postionName': result.postionName,                          //录用部门职位
                    'post.mobile': result.mobile,                               //手机号码
                    'post.email': result.email,                               //个人邮箱
                    'post.employeeRecruitId': result.employeeRecruitId,       //关联的招聘需求主键
                    'post.contractCompanyValue': result.contractCompanyValue,       //关联的招聘需求主键

                    'post.positionsLevelId': result.positionsLevelId,
                    'post.urgencyDegreeId': result.urgencyDegreeId,
                    'post.employeeNatureId': result.employeeNatureId,
                    'post.inductionFormId': result.inductionFormId,
                    'post.entrantTime': result.entrantTime,
                    'post.workplaceId': result.workplaceId,
                    'post.testComment': result.testComment,
                    'post.testSalary': result.testSalary,
                    'post.formalSalary': result.formalSalary,
                    'post.assessmentList': result.assessmentList,
                    'process.businessCode': result.serialNo,
                    'process.businessKey': result.id,
                })
                this.onloadinfo(this.post.employeeRecruitId);
            })
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: businessKey}).then((response) => {
                resolve({
                    'fileList': response.json().result
                })
            })

        }else{
            //默认加载考核选项
            this.assess();
        }

    },
    methods : {
        closed : function(){
            let vm = this;
            if(vm.post.officeId){
                this.jobmodule = false;
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
        jobModule: function () {
            this.jobmodule = true;
        },
        //初始化数据
        loadData: function(){
            var that = this;
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERLYSQ).then((response) => {
                let serial = response.json().result;
                that.officeName= serial.officeName,             //申请部门
                that.post.serialNo= serial.serialNumber,
                that.process.businessCode= serial.serialNumber,
                that.process.businessKey= serial.uuId,
                that.post.id= serial.uuId
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
                                departmentCode:self.departmentCode,
                                targetRespon:self.targetRespon,
                                urgencyDegreeId:self.post.urgencyDegreeId,
                                urgencyDegreeDispay:self.urgencyDegreeDispay,
                            });
                            self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_STARTPROCESS, self.process).then((response) => {
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
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEAPPLICATION,this.post).then(function (response) {
                let status = response.json().status;
                if(status == 0){
                    callback();
                }
            })
        },
        //默认列表
        inquire: function(page){
            var that = this;
            var page = page;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDRECRUITLISTFORAPPLICATION,page).then(function (response) {
                var Data = response.json().result;
                //判断是否入库
                if(response.json().status){
                    var page = {};
                    page.data = Data.list;
                    page.total = Data.count;
                    page.pageNumber = Data.pageNo;
                    that.data = page;
                }
            })
        },
        //查询
        quire: function(){
            var that = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDRECRUITLISTFORAPPLICATION,{serialNo:this.searchs.serialNo,officeId:this.selected,applyDate:this.toWorkTime,pageSize:'5'}).then(function (response) {
                var Data = response.json().result;
                //判断是否入库
                if(response.json().status){
                    var page = {};
                    page.data = Data.list;
                    page.total = Data.count;
                    page.pageNumber = Data.pageNo;
                    that.data = page;
                }
            })
        },
        //关联数据信息
        onloadinfo: function (obj) {
            var that = this;
            var params = {};
            params.id = obj;
            if(!params.id) return false;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDRECRUITFORAPPLICATION,{id: params.id}).then(function (response) {
                var Data = response.json().result;
                that.post.employeeRecruitId = Data.id;                           //主键 关联招聘需求id
                that.title = Data.title;                                           //录用申请标题
                that.officeNames = Data.officeName;                               //录用部门
                that.post.officeId = Data.officeId;                              //部门对应id
                that.post.positionsId = Data.positionNameId;                     //录用申请职位id
                that.postionName = Data.postionName;                             //录用申请职位

                //流程
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id: that.post.officeId}).then(function (response) {
                    var Data = response.json().result;
                    that.departmentCode = Data.departmentCode;
                    that.targetRespon = Data.loginName
                });
                that.closed();

            })

        },
        searchDepartfn: function(){
            var that =this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOFFICELISTFORAPPLICATION,{'':''}).then(function (response) {
                var Data = response.json().result;
                that.searchDepart = Data;
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
        //考核
        assess: function(){
            var that = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDASSESSMENTLIST,{type: this.assessType}).then(function (response) {
                var Data = response.json().result;
                that.post.assessmentList = Data;
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

<style lang="less">
    table.w83{
        width:83%
    }
    table.mask-table td{
        text-align: left;
    }
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
