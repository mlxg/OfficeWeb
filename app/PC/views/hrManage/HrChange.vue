<!-- 人事管理 --- 人事管理 --- 人事异动申请 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
    <validator name="validation">
        <Tip-border tip="基本信息">
            <div class="g-padding20">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">标题：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="businessTitle">
                    </div>
                    <label class="col-sm-2 control-label">编号：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="post.bussinessData.serialNo">
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">紧急程度：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.bussinessData.urgencyDegreeId"
                                        v-validate:urgency-degree="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.urgencyDegree.touched || validating) && $validation.urgencyDegree.required">必填项</span>
                    </div>
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="异动情况">
            <div class="g-padding20">
                <div class="form-group clearfix">
                  <section v-if="taskformKey != 'move_initiator_edit'">
                    <label class="col-sm-2 control-label field-require">姓名：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" readonly v-model="cnName" @click="peoples('filterName','replaceShow','listName')" v-validate:employee="['required']">
                        <span class="fc-red" v-show="($validation.employee.touched || validating) && $validation.employee.required">必填项</span>
                        <label class="replace-container" v-show="replaceShow" transition="replace-prompt" style="width: 328px">
                            <input type="text" class="replace-search" placeholder="请输入姓名" v-model="replaceName"
                                   v-on:keyup="searchName"/>
                            <div class="replace-list">
                                <ul>
                                    <li class="replace-list-item" v-for="item in filterName"
                                        :class="{'active': item.active}" @click="replacePerson($index,'filterName','replaceShow','replaceName','employeeBaseId','cnName')">{{item.cnName}}</li>
                                </ul>
                            </div>
                        </label>
                    </div>
                  </section>
                  <section v-else>
                    <label class="col-sm-2 control-label">姓名：</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" readonly v-model="cnName">
                    </div>
                  </section>
                  <label class="col-sm-2 control-label">员工编号：</label>
                  <div class="col-sm-4">
                      <input type="text" class="form-control" readonly v-model="employeeNo">
                  </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">变动性质：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="post.bussinessData.moveNatureId"
                                        v-validate:eml="{required: true}"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.eml.touched || validating) && $validation.eml.required">必填项</span>
                    </div>
                    <label class="col-sm-2 control-label">入职时间：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" readonly v-model="entrantTime">
                    </div>
                </div>
                <div class="form-group clearfix">
                    <section v-if="taskformKey != 'move_initiator_edit'">
                      <label class="col-sm-2 control-label field-require">是否部门负责人：</label>
                      <div class="col-sm-4">
                          <select v-model="post.bussinessData.afterIsResponsible" class="form-control">
                              <option :value='1'>是</option>
                              <option :value='0'>否</option>
                          </select>
                      </div>
                    </section>
                    <section v-else>
                      <label class="col-sm-2 control-label field-require">是否部门负责人：</label>
                      <div class="col-sm-4">
                        <section v-if="post.bussinessData.afterIsResponsible == 0">
                          <input type="text" class="form-control" readonly value="否">
                        </section>
                        <section v-else>
                          <input type="text" class="form-control" readonly value="是">
                        </section>
                      </div>
                    </section>
                    <label class="col-sm-2 control-label field-require">建议生效日期：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control input-calendar" v-model="post.bussinessData.suggestEffectDate"
                               v-validate:entrant-time="{required: true}"
                               @click.stop="calendar.show = true" readonly>
                        <span class="fc-red" v-show="($validation.entrantTime.touched || validating) && $validation.entrantTime.required">必填项</span>
                        <Public-Calendar
                                :value.sync="post.bussinessData.suggestEffectDate"
                                :show.sync="calendar.show"
                                :x="calendar.x"
                                :y="calendar.y"
                                :sep.sync="calendar.sep"></Public-Calendar>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix" v-validate-class>
                    <label class="col-sm-2 control-label field-require">变动情况说明：</label>
                    <Text :text-value='post.bussinessData.moveCaseExplain' :max-length="200" :class-name="'col-sm-10'">
                            <textarea class="form-control"  rows="3" v-model="post.bussinessData.moveCaseExplain"
                                      v-validate:comment="{required: true, maxlength: 200}" ></textarea>
                        <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.required">必填项</span>
                        <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.maxlength">评语过长</span>
                    </Text>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">变动具体情况：</label>
                    <table width="83%" class="table table-striped table-bordered w83 g-fr">
                        <thead>
                        <th>名称</th>
                        <th>异动前</th>
                        <th class="field-require">异动后</th>
                        </thead>
                        <tbody>
                        <!-- <tr v-for="item in post.assessmentList"> -->
                        <tr>
                            <th>办公地点</th>
                            <td><input type="text" class="form-control" readonly v-model="beforeWorkplaceDisplay"></td>
                            <td>
                                <div v-validate-class>
                                    <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.bussinessData.afterWorkplaceId"></Tool-Selection>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>部门</th>
                            <td><input type="text" class="form-control" readonly v-model="beforeOfficeName"></td>
                            <td>
                                <section v-if="taskformKey != 'move_initiator_edit'">
                                  <div v-validate-class>
                                    <input type="text" class="form-control" initial='off' readonly v-model="name" @click="peoples('departlist','replaceShow2','department')" v-validate:departv="['required']">
                                    <label class="replace-container" v-show="replaceShow2" transition="replace-prompt" style="width: 328px">
                                        <input type="text" class="replace-search" placeholder="请输入部门" v-model="depart"
                                               v-on:keyup="searchcnName"/>
                                        <div class="replace-list">
                                            <ul>
                                                <li class="replace-list-item" v-for="item in departlist"
                                                    :class="{'active': item.active}" @click="replacePerson($index,'departlist','replaceShow2','depart','afterOfficeId','name')">{{item.name}}</li>
                                            </ul>
                                        </div>
                                    </label>
                                    <span class="fc-red" v-show="($validation.departv.touched || validating) && $validation.departv.required">必填项</span>
                                  </div>
                                </section>
                                <section v-else>
                                  <input type="text" class="form-control" readonly v-model="name">
                                </section>
                            </td>
                        </tr>
                        <tr>
                            <th>职位</th>
                            <td><input type="text" class="form-control" readonly v-model="beforePositionsName"></td>
                            <td>
                                <div v-validate-class>
                                    <select class="form-control" initial='off' v-model="post.bussinessData.afterPositionsId" v-validate:afterpos="{required: true}" >
                                        <option v-for="item in stationList" :value="item.id">{{item.postionName}}</option>
                                    </select>
                                    <span class="fc-red" v-show="($validation.afterpos.touched || validating) && $validation.afterpos.required">必填项</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>职级</th>
                            <td><input type="text" class="form-control" readonly v-model="beforePositionsLevelDisplay"></td>
                            <td><Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.bussinessData.afterPositionsLevelId"></Tool-Selection></td>
                        </tr>
                        <tr>
                            <th>月薪</th>
                            <td><input type="text" class="form-control" readonly v-model="post.bussinessData.beforeMonthSalary"></td>
                            <td v-validate-class>
                                <input type="text" class="form-control" v-model="post.bussinessData.afterMonthSalary" maxlength="9"
                                       v-validate:trym="{required: { rule: true }, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}">
                                <span class="fc-red" v-show="($validation.trym.touched || validating) && $validation.trym.required">必填项</span>
                                <span class="fc-red" v-show="post.bussinessData.afterMonthSalary && $validation.trym.touched && $validation.trym.pattern">金额格式错误</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">上传附件：</label>
                    <div class="col-sm-10">
                        <Tool-Upload :files.sync="fileList" :resource-id="post.bussinessData.id" :resource-type="'7'"></Tool-Upload>
                        <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
                    </div>
                </div>
            </div>
        </Tip-border>
        <div class="form-group g-tc g-marginT20">
            <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
            <button type="button" class="btn btn-primary g-marginR30" @click="onSubmit($event)">提交流程</button>
            <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
        </div>
    </validator>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
    import TipBorder from '../../components/public/TipBorder.vue'
    import ToolSelection from '../../components/public/ToolSelection.vue'
    import * as type from '../../constants/globalSelectTypes'
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
        components: {
            TipBorder,
            ToolSelection,
            PublicCalendar,
            PublicModal,
            ToolUpload,
            Text,
            LookScreen
        },
        props: ['taskId', 'businessKey', 'humanTaskId','taskformKey'],
        data: function(){
            return {
                bussinessData:{
                    id:''
                },
                name:'',
                cnName:'',
                replaceName:'',
                depart:'',
                employeeNo:'',
                entrantTime:'',
                beforeWorkplaceDisplay:'',
                beforeOfficeName:'',
                beforePositionsName:'',
                beforePositionsLevelDisplay:'',
                businessTitle:'',
                departmentCode:'',
                targetRespon:'',
                referRespon:false,
                sameDept:false,
                urgencyDegreeDisplay:'',
                afterOfficeName:'',
                post: {
                    bussinessData:{
                        id: '',                                             //主键
                        title:'',                                            //标题
                        serialNo: '',                                       //招聘编号
                        formKey:'applying',
                        loginName:'',
                        employeeBaseId:'',                                 //员工基础信息ID
                        urgencyDegreeId:'',                                 //紧急程度，数据字典值
                        moveNatureId:'',                                 //	异动性质，数据字典值
                        suggestEffectDate:'',                                 //建议生效日期
                        moveCaseExplain:'',                                 //变动情况说明
                        beforeIsResponsible:'',                                 //异动前是否是部门负责人
                        afterIsResponsible:'0',                                 //异动后是否是部门负责人
                        beforeWorkplaceId:'',                                 //异动前办公地点，数据字典值
                        afterWorkplaceId:'',                                 //异动后办公地点，数据字典值
                        beforeOfficeId:'',                                 //异动前部门ID
                        afterOfficeId:'',                                 //异动后部门ID
                        beforePositionsId:'',                                 //异动前职位ID
                        afterPositionsId:'',                                 //异动后职位ID
                        beforePositionsLevelId:'',                          //异动前职级，数据字典值
                        afterPositionsLevelId:'',                           //异动后职级，数据字典值
                        beforeMonthSalary:'',                                 //异动前月薪
                        afterMonthSalary:'',                                 //异动后月薪
                    },
                },
                process:{
                    userId: '',
                    businessKey: '',
                    publishCode: 'WF_HR_007',
                    businessType: 'RSYD',
                    appId: 'starOffice',
                    businessCode: '',
                    businessTitle: '',
                    bussinessDataJsonStr:{
                        beforeDeptCode:'',
                        beforeRespon:'',
                        afterDeptCode:'',
                        afterRespon:'',
                        referRespon:'',
                        moverPerson:'',
                        sameDept:'',
                        urgencyDegreeId:'',
                        urgencyDegreeDispay:'',
                    },
                },
                calendar: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-',
                },
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
                type: [
                    type.URGENCY_DEGREE,
                    type.MOVE_NATURE,
                    type.EMPLOYEE_RANK,
                    type.WORK_PLACE,
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
                let str = (vm.beforeOfficeName?vm.beforeOfficeName+'-':'') + (vm.cnName?vm.cnName+'的':'') + '异动申请';
                vm.post.bussinessData.title = str;
                vm.process.businessTitle = str;
                return str;
            },
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
            //初始化数据
            this.loadData();
            this.personData(function(){});
            this.dpData();
            //this.task()
            this.emergency();
            this.process.userId = sessionStorage.getItem("loginName");
        },
        asyncData: function(resolve){
            let that = this;
            //判断id 进入的路径
            let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
           let id = {
               bussinessData:{
                   id:businessKey
               }
           }
            that.personData(function(){
                if(businessKey){
                    that.process.businessKey= businessKey,
                    //包含id则更新页面
                    that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDMOVE,id).then(function (response) {
                        let result = response.json().result;
                        resolve({
                            'post.bussinessData.id': result.id,                                       //录用申请信息主键
                            'post.bussinessData.serialNo': result.serialNo,                           //录用申请编号
                            'post.bussinessData.formKey': result.formKey,
                            'post.bussinessData.title': result.title,
                            'post.bussinessData.loginName': result.loginName,
                            'post.bussinessData.urgencyDegreeId': result.urgencyDegreeId,
                            'post.bussinessData.employeeBaseId': result.employeeBaseId,
                            'post.bussinessData.moveNatureId': result.moveNatureId,
                            'post.bussinessData.suggestEffectDate': result.suggestEffectDate,
                            'post.bussinessData.beforeIsResponsible': result.beforeIsResponsible,
                            'post.bussinessData.afterIsResponsible': result.afterIsResponsible,
                            'post.bussinessData.beforeWorkplaceId': result.beforeWorkplaceId,
                            'post.bussinessData.afterWorkplaceId': result.afterWorkplaceId,
                            'post.bussinessData.beforeOfficeId': result.beforeOfficeId,
                            'post.bussinessData.afterOfficeId': result.afterOfficeId,
                            'post.bussinessData.beforePositionsId': result.beforePositionsId,
                            'post.bussinessData.afterPositionsId': result.afterPositionsId,
                            'post.bussinessData.beforePositionsLevelId': result.beforePositionsLevelId,
                            'post.bussinessData.afterPositionsLevelId': result.afterPositionsLevelId,
                            'post.bussinessData.beforeMonthSalary': result.beforeMonthSalary,
                            'post.bussinessData.afterMonthSalary': result.afterMonthSalary,
                            'post.bussinessData.moveCaseExplain': result.moveCaseExplain,
                            'urgencyDegreeDisplay': result.urgencyDegreeDisplay,
                            'name': result.afterOfficeName,
                            'cnName': result.cnName,
                        })
                    })
                    that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: businessKey}).then((response) => {
                        resolve({
                            'fileList': response.json().result
                        })
                    })
                }
            });
        },
        watch: {
            'post.bussinessData.employeeBaseId': function (val) {
                let vm = this;
                let obj = this.listName.find((item) => item.employeeBaseId === val);
                if(!obj) return;
                this.employeeNo = obj.employeeNo;
                this.entrantTime = obj.entrantTime;
                this.post.bussinessData.beforeIsResponsible = obj.beforeIsResponsible;
                this.post.bussinessData.loginName = obj.loginName;
                this.post.bussinessData.beforeWorkplaceId = obj.beforeWorkplaceId;
                this.beforeWorkplaceDisplay = obj.beforeWorkplaceDisplay;
                this.post.bussinessData.beforeOfficeId = obj.beforeOfficeId;
                this.beforeOfficeName = obj.beforeOfficeName;
                this.post.bussinessData.beforePositionsId = obj.beforePositionsId;
                this.beforePositionsName = obj.beforePositionsName;
                this.post.bussinessData.beforePositionsLevelId = obj.beforePositionsLevelId;
                this.beforePositionsLevelDisplay = obj.beforePositionsLevelDisplay;
                this.post.bussinessData.beforeMonthSalary = obj.beforeMonthSalary;
                let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
                if(!businessKey){

                    this.cnName = obj.cnName;
                    this.post.bussinessData.afterWorkplaceId = this.post.bussinessData.beforeWorkplaceId
                    this.post.bussinessData.afterOfficeId = obj.beforeOfficeId;
                    this.post.bussinessData.afterPositionsId = obj.beforePositionsId;
                    this.name = this.beforeOfficeName;
                    this.post.bussinessData.afterPositionsLevelId = this.post.bussinessData.beforePositionsLevelId;
                }
                this.office(this.post.bussinessData.beforeOfficeId,'departmentCode','targetRespon');
            },
            'post.bussinessData.afterOfficeId': function(val){
                this.post.bussinessData.afterOfficeId = val;
                let vm = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETPOSITIONAME, {officeId: val}).then((station)=>{
                    station = station.json().result;
                    //vm.afterPositionsId = vm.post.bussinessData.beforePositionsId;
                    vm.stationList = station;
                    if(!station || !station.length){
                        vm.options = {
                            title: '温馨提示',
                            message: '职位列表没有数据，请联系管理员!',
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
                        vm.isCompleted = true;
                    }
                })
            },
            'post.bussinessData.urgencyDegreeId': function (val){
                let urg = this.emergencyList.find((item) => item.value === val);
                if(!urg) return;
                this.urgencyDegreeDisplay = urg.label;
            },
        },
        methods : {
            //初始化数据
            loadData: function(){
                var that = this;
                this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERRSYD).then((response) => {
                    let serial = response.json().result;
                    that.post.bussinessData.id = serial.uuId;
                    that.process.businessKey= serial.uuId,
                    that.post.bussinessData.serialNo = serial.serialNumber;
                    that.process.businessCode= serial.serialNumber
                });
            },
            //初始化人事异动数据
            personData: function(callback){
                var that = this;
                that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEMPLOYEEBASEINFOLISTFORMOVE).then((response) => {
                    let serial = response.json().result;
                    that.listName = serial;
                    callback();
                });
            },
            //初始化部门
            dpData: function(){
                var that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOFFICLISTWITHOUTCHILD).then((response) => {
                    let Data = response.json().result;
                    for (var i = 0; i < Data.length; i++) {
                        that.department.push({name:Data[i].name,afterOfficeId:Data[i].id});
                    }
                });
            },
            peoples: function(newArray,isShow,listArray){
                this[newArray] = [];
                this[isShow] = !this[isShow]
                this[newArray] = this[listArray];
            },
            replacePerson: function(index,newArray,isShow,replace,id,name){
                this[name] = this[newArray][index][name];
                this.post.bussinessData[id] = this[newArray][index][id];
                this[isShow] = false;
                this[replace] = '';
                this[newArray] = [];
            },
            //姓名查找
            searchName: function(){
                this.filterName = [];
                for(var i =0;i<this.listName.length;i++){
                    if ((this.listName[i].cnName).indexOf(this.replaceName) >= 0) {
                        this.filterName.push({cnName:this.listName[i].cnName,employeeBaseId:this.listName[i].employeeBaseId});
                    }
                }
            },
            //部门查找
            searchcnName: function(){
                this.departlist = [];
                for(var i =0;i<this.department.length;i++){
                    if ((this.department[i].name).indexOf(this.depart) >= 0) {
                        this.departlist.push({name:this.department[i].name,afterOfficeId:this.department[i].afterOfficeId});
                    }
                }
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
                            if(self.post.bussinessData.beforeIsResponsible=='1' || self.post.bussinessData.afterIsResponsible=='1'){
                                self.referRespon = true;
                            }
                            if(self.post.bussinessData.beforeOfficeId == self.post.bussinessData.afterOfficeId){
                                self.sameDept = true;
                            }
                            self.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id: self.post.bussinessData.afterOfficeId}).then(function (response) {
                                var Data = response.json().result;
                                self.afdepartmentCode = Data.departmentCode;
                                self.aftargetRespon = Data.loginName
                                self.process.bussinessDataJsonStr= JSON.stringify({
                                    beforeDeptCode:self.departmentCode,
                                    beforeRespon:self.targetRespon,
                                    afterDeptCode:Data.departmentCode,
                                    afterRespon:Data.loginName,
                                    referRespon:self.referRespon,
                                    sameDept:self.sameDept,
                                    moverPerson:self.post.bussinessData.loginName,
                                    urgencyDegreeId:self.post.bussinessData.urgencyDegreeId,
                                    urgencyDegreeDisplay:self.urgencyDegreeDisplay,
                                });
                                e.target.disabled = true
                                self.lookscreen.isShow = true;
                                if(!self.businessKey){
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
                if(vm.businessKey){
                    vm.post.bussinessData.formKey = vm.taskformKey
                }
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEMOVE,this.post).then(function (response) {
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
            office: function(officeId,code,respon){
                let that = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id: officeId}).then(function (response) {
                    var Data = response.json().result;
                    that[code] = Data.departmentCode;
                    that[respon] = Data.loginName
                });
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
