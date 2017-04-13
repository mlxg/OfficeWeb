<style lang="less">
.field-interval:before{
  content: '';
  position: absolute;
  width: 10px;
  margin-left: -20px;
  top: 50%;
  border-bottom: 1px solid #555;
}
.replace-prompt-enter, .replace-prompt-leave { opacity: 0; transform: translate3d(0,-10px, 0); }
.replace-container{
  position: absolute;
  width: 240px;
  margin-top: -1px;
  z-index: 9;
  background-color: #fff;
  border: 1px solid #ccc;
  transition: all .3s ease;
  padding-top: 0;
  .replace-search{
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 8px 12px;
    background: transparent url(../../images/query-icon.png) no-repeat 98% center;
  }
  .replace-list{
    height: 192px;
    overflow: auto;
    .replace-list-item{
      padding: 8px 10px;
      margin-bottom: 1px;
      &:hover{
         background-color: #f5f5f5;
       }
      &.active, &:hover.active{
        background-color: #649ff5;
        color: #fff;
      }
    }

  }
}
</style>
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
    <validator name="validation">
    <!--<form novalidate class="clearfix">-->
        <Tip-border tip="招聘基本信息">
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">编号：</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" readonly value="{{post.serialNo}}">
                </div>
                <label class="col-sm-2 control-label" :class="{'field-require': officeList.length > 1}">部门名称：</label>
                <div class="col-sm-4" v-validate-class>
                    <input v-if="officeList.length === 1" type="text" class="form-control" v-model="officeList[0].officeName" readonly>
                    <select v-else class="form-control" v-model="post.officeId" v-validate:office="['required']">
                        <option v-for="item in officeList" :value="item.officeId">{{item.officeName}}</option>
                    </select>
                    <span class="fc-red" v-if="officeList.length > 1" v-show="($validation.office.touched || validating) && !post.officeId">必填项</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label field-require">紧急程度：</label>
                <div class="col-sm-4" v-validate-class>
                  <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.urgencyDegreeId" v-validate:urgency-degree="['required']"></Tool-Selection>
                  <span class="fc-red" v-show="($validation.urgencyDegree.touched || validating) && $validation.urgencyDegree.required">必填项</span>
                </div>
                <label class="col-sm-2 control-label field-require">期望入职时间：</label>
                <div class="col-sm-4" v-validate-class>
                  <input type="text" class="form-control input-calendar" v-model="post.toWorkTime" @click.stop="calendar.show = true" readonly v-validate:to-Work-Time="['required']">
                  <Public-Calendar
                    :value.sync="post.toWorkTime"
                    :show.sync="calendar.show"
                    :x="calendar.x"
                    :y="calendar.y"
                    :sep.sync="calendar.sep"></Public-Calendar>
                  <span class="fc-red" v-show="($validation.toWorkTime.touched || validating) && $validation.toWorkTime.required">必填项</span>
                </div>
            </div>
        </Tip-border>
        <Tip-border tip="岗位职责/要求">
            <div class="form-group clearfix" v-if="taskformKey != 'acceptance_initiator_edit'">
                <label class="col-sm-2 control-label field-require">部门需求性质：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="4" :all-select-types="type" v-model="post.depRequireId" @change="clears" v-validate:dep-Require="['required']"></Tool-Selection>
                    <span class="fc-red" v-show="($validation.depRequire.touched || validating) && $validation.depRequire.required">必填项</span>
                </div>
            </div>
          <div class="form-group clearfix" v-else>
            <label class="col-sm-2 control-label field-require">部门需求性质：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="depRequireDisplay" readonly />
            </div>
          </div>
            <div class="form-group clearfix">
                <section v-if="post.depRequireId != 4 && post.depRequireId != 5">
                    <label class="col-sm-2 control-label field-require">申请人数：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.requireNum" maxlength="5" v-validate:require-num="['required', 'plus']">
                        <span class="fc-red" v-show="($validation.requireNum.touched || validating) && $validation.requireNum.required">必填项</span>
                        <span class="fc-red" v-show="($validation.requireNum.touched || validating) && $validation.requireNum.plus">必须输入正整数</span>
                    </div>

                    <label class="col-sm-2 control-label field-require">职位名称：</label>
                    <div class="col-sm-4" v-validate-class>
                        <select class="form-control" v-model="post.positionNameId" v-validate:station="['required']">
                            <option v-for="item in stationList" :value="item.id">{{item.postionName}}</option>
                        </select>
                        <span class="fc-red" v-show="($validation.station.touched || validating) && !post.positionNameId">必填项</span>
                    </div>
                </section>
            </div>
            <section v-if="post.depRequireId == 3">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">替换人：</label>
                    <div class="col-sm-10" v-validate-class>
                        <input type="text" class="form-control" readonly @click="this.replaceShow = !this.replaceShow"
                               v-model="replacePersonName" v-validate:replace-Person="['required']"/>
                        <label class="replace-container" v-show="replaceShow" transition="replace-prompt" for="J-replace-person">
                            <input type="text" class="replace-search" placeholder="输入姓名查找" v-model="replaceSearch"
                                   v-on:blur="closeReplacePerson" v-on:focus="openReplacePerson" id="J-replace-person"/>
                            <div class="replace-list">
                                <ul>
                                    <li class="replace-list-item" v-for="item in replaceList | filterBy replaceSearch"
                                        :class="{'active': item.active}" @click="replacePerson($index)">{{item.name}}</li>
                                </ul>
                            </div>
                        </label>
                        <span class="fc-red" v-show="($validation.replacePerson.touched || validating) && $validation.replacePerson.required">必填项</span>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label field-require">替换原因：</label>
                    <Text :text-value='post.replaceReason' :max-length="500" :class-name="'col-sm-10 invalid'">
                        <textarea class="form-control" rows="3" v-model="post.replaceReason" v-validate:replace-Reason="['required']" maxlength="500"></textarea>
                        <span class="fc-red" v-show="($validation.replaceReason.touched || validating) && $validation.replaceReason.required">必填项</span>
                    </Text>
                </div>
            </section>
            <section v-if="post.depRequireId == 2">
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label field-require">新增原因：</label>
                    <Text :text-value='post.newReason' :max-length="500" :class-name="'col-sm-10 invalid'">
                        <textarea class="form-control" rows="3" v-model="post.newReason" v-validate:new-Reason="['required']" maxlength="500"></textarea>
                        <span class="fc-red" v-show="($validation.newReason.touched || validating) && $validation.newReason.required">必填项</span>
                    </Text>
                </div>
            </section>
            <section v-if="post.depRequireId == 4">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">扩编职位名称：</label>
                    <div class="col-sm-4" v-validate-class>
                        <select class="form-control" v-model="post.positionNameId" v-validate:station2="['required']"  initial='off'>
                            <option v-for="item in stationList" :value="item.id">{{item.postionName}}</option>
                        </select>
                        <span class="fc-red" v-show="($validation.station2.touched || validating) && !post.positionNameId">必填项</span>
                    </div>
                    <label class="col-sm-2 control-label field-require">职位扩编人数：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.enlargeNum" maxlength="5"
                               v-validate:enlargenum="['required', 'plus']">
                        <span class="fc-red" v-show="($validation.enlargenum.touched || validating) && $validation.enlargenum.required">必填项</span>
                        <span class="fc-red" v-show="post.enlargeNum && $validation.enlargenum.touched && $validation.enlargenum.plus">格式错误</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                  <label class="col-sm-2 control-label">原职位定编人数：</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.requireCount" readonly>
                  </div>
                  <label class="col-sm-2 control-label">原职位在职人数：</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.officeCount" readonly>
                  </div>
                </div>
                <div class="form-group clearfix">
                  <label class="col-sm-2 control-label">原部门定编人数：</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.officeRequireCount" readonly>
                  </div>
                  <label class="col-sm-2 control-label">原部门在职人数：</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.officeAllCount" readonly>
                  </div>
                </div>
            </section>
            <section v-if="post.depRequireId == 5">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">新增职位名称：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" maxlength="20" v-model="post.enlargePositionName" v-validate:addnew="{required: true,existDepartName: { rule: true, initial: 'off' }}">
                        <span class="fc-red" v-show="($validation.addnew.touched || validating) && $validation.addnew.required">必填项</span>
                        <span class="fc-red" v-show="($validation.addnew.touched || validating) && $validation.addnew.existDepartName">职位已存在</span>
                    </div>
                    <label class="col-sm-2 control-label field-require">职位定编人数：</label>
                    <div class="col-sm-4"  v-validate-class>
                        <input type="text" class="form-control" v-model="post.enlargeNum" maxlength="5"
                               v-validate:enlargenum2="['required', 'plus']">
                        <span class="fc-red" v-show="($validation.enlargenum2.touched || validating) && $validation.enlargenum2.required">必填项</span>
                        <span class="fc-red" v-show="post.enlargeNum && $validation.enlargenum2.touched && $validation.enlargenum2.plus">格式错误</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label field-require">职位性质：</label>
                    <div class="col-sm-4" v-validate-class>
                        <Tool-Selection :select-type-index="5" :all-select-types="type" v-model="post.positionNatureValue"
                                        v-validate:zwxz="['required']"></Tool-Selection>
                        <span class="fc-red" v-show="($validation.zwxz.touched || validating) && !post.positionNatureValue">必填项</span>
                    </div>
                </div>
            </section>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label field-require">年龄要求：</label>
                <div class="col-sm-2" v-validate-class>
                    <input type="text" class="form-control" maxlength="2" v-model="post.ageStart" v-validate:age="{required: true, pattern: '/^(1[89]|[2-5][0-9]|60)$/'}">
                    <span class="fc-red" v-show="($validation.age.touched || validating) && $validation.age.required">必填项</span>
                    <span class="fc-red" v-show="post.ageStart && $validation.age.touched && $validation.age.pattern">请输入年龄</span>
                </div>
                <div class="col-sm-2 field-interval" v-validate-class>
                    <input type="text" class="form-control" maxlength="2" v-model="post.ageEnd" v-validate:age2="{required: true, pattern: '/^(1[89]|[2-5][0-9]|60)$/'}">
                    <span class="fc-red" v-show="($validation.age2.touched || validating) && $validation.age2.required">必填项</span>
                    <span class="fc-red" v-show="post.ageEnd && $validation.age2.touched && $validation.age2.pattern">请输入年龄</span>
                </div>
                <label class="col-sm-2 control-label field-require">性别要求：</label>
                <div class="col-sm-4" v-validate-class>
                  <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="post.sexRequireId" v-validate:sex-Require="['required']"></Tool-Selection>
                  <span class="fc-red" v-show="($validation.sexRequire.touched || validating) && $validation.sexRequire.required">必填项</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label field-require">学历要求：</label>
                <div class="col-sm-4" v-validate-class>
                  <Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.educationId" v-validate:education="['required']"></Tool-Selection>
                  <span class="fc-red" v-show="($validation.education.touched || validating) && $validation.education.required">必填项</span>
                </div>
                <label class="col-sm-2 control-label field-require">招聘方式：</label>
                <div class="col-sm-4" v-validate-class>
                  <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.recruitWayId" v-validate:recruit-Way="['required']"></Tool-Selection>
                  <span class="fc-red" v-show="($validation.recruitWay.touched || validating) && $validation.recruitWay.required">必填项</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label field-require">试用薪酬（元）：</label>
                <div class="col-sm-2" v-validate-class>
                    <input type="text" class="form-control" v-model="post.testSalaryStart" maxlength="9" v-validate:test-salary="{required: true, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}">
                    <span class="fc-red" v-show="($validation.testSalary.touched || validating) && $validation.testSalary.required">必填项</span>
                    <span class="fc-red" v-show="post.testSalaryStart && $validation.testSalary.touched && $validation.testSalary.pattern">请输入金额</span>
                </div>
                <div class="col-sm-2 field-interval" v-validate-class>
                    <input type="text" class="form-control" v-model="post.testSalaryEnd" maxlength="9" v-validate:test-salary2="{required: true, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}">
                    <span class="fc-red" v-show="($validation.testSalary2.touched || validating) && $validation.testSalary2.required">必填项</span>
                    <span class="fc-red" v-show="post.testSalaryEnd && $validation.testSalary2.touched && $validation.testSalary2.pattern">请输入金额</span>
                </div>
                <label class="col-sm-2 control-label field-require">转正薪酬（元）：</label>
                <div class="col-sm-2" v-validate-class>
                    <input type="text" class="form-control" v-model="post.formalSalaryStart" maxlength="9" v-validate:formal-Salary="{required: true, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}">
                    <span class="fc-red" v-show="($validation.formalSalary.touched || validating) && $validation.formalSalary.required">必填项</span>
                    <span class="fc-red" v-show="post.formalSalaryStart && $validation.formalSalary.touched && $validation.formalSalary.pattern">请输入金额</span>
                </div>
                <div class="col-sm-2 field-interval" v-validate-class>
                    <input type="text" class="form-control" v-model="post.formalSalaryEnd" maxlength="9" v-validate:formal-salary2="{required: true, pattern: '/^(([1-9]{1}\\d*)|(0))(\\.(\\d){0,2})?$/'}">
                    <span class="fc-red" v-show="($validation.formalSalary2.touched || validating) && $validation.formalSalary2.required">必填项</span>
                    <span class="fc-red" v-show="post.formalSalaryEnd && $validation.formalSalary2.touched && $validation.formalSalary2.pattern">请输入金额</span>
                </div>
            </div>
            <div class="form-group g-marginB20 clearfix">
              <label class="col-sm-2 control-label">职责描述：</label>
              <Text :text-value='post.responsibility' :max-length="500" :class-name="'col-sm-10'">
                <textarea class="form-control" rows="3" v-model="post.responsibility" maxlength="500"></textarea>
              </Text>
            </div>
            <div class="form-group g-marginB20 clearfix">
              <label class="col-sm-2 control-label">任职要求：</label>
              <Text :text-value='post.requirement' :max-length="500" :class-name="'col-sm-10'">
                <textarea class="form-control" rows="3" v-model="post.requirement" maxlength="500"></textarea>
              </Text>
            </div>
            <section v-if="post.depRequireId != 4 && post.depRequireId != 5">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">职位定编人数：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="post.requireCount" readonly>
                    </div>
                    <label class="col-sm-2 control-label">职位在职人数：</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" v-model="post.officeCount" readonly>
                    </div>
                </div>
                <div class="form-group clearfix">
                  <label class="col-sm-2 control-label">部门定编人数：</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.officeRequireCount" readonly>
                  </div>
                  <label class="col-sm-2 control-label">部门在职人数：</label>
                  <div class="col-sm-4">
                    <input type="text" class="form-control" v-model="post.officeAllCount" readonly>
                  </div>
                </div>
            </section>
            <div class="form-group clearfix" v-if="stationList && stationList.length">
                <label class="col-sm-2 control-label">上传附件：</label>
                <div class="col-sm-10">
                    <Tool-Upload :files.sync="fileList" :resource-id="post.id" :resource-type="'0'"></Tool-Upload>
                    <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
                </div>
            </div>
        </Tip-border>
    <!--</form>-->
    </validator>
    <Tip-border tip="审批意见" v-if="humanTaskId">
      <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>
    <div class="form-group g-tc g-marginT20">
        <button v-if="stationList && stationList.length && !humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
        <button v-if="stationList && stationList.length" type="button" class="btn btn-primary g-marginR30" @click="submit($event)">提交流程</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>

    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Process-Diagram v-if="taskId" :process-instance-id="taskId"></Process-Diagram>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
    import TipBorder from '../../components/public/TipBorder.vue'
    import PublicModal from '../../components/public/PublicModal'
    import ToolSelection from '../../components/public/ToolSelection'
    import PublicCalendar from '../../components/public/PublicCalendar'
    import ToolUpload from '../../components/public/ToolUpload'
    import ProcessDiagram from '../../components/others/ProcessDiagram'
    import LookScreen from '../../components/public/LockScreen.vue'
    import ApproveList from '../../components/others/ApproveList'
    import Text from '../../components/public/PublicTextLength.vue'
    import * as type from '../../constants/globalSelectTypes'
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
          PublicModal,
          PublicCalendar,
          ToolUpload,
          ProcessDiagram,
          ApproveList,
          Text,
          LookScreen
        },
        props: ['taskId', 'humanTaskId', 'businessKey', 'info','taskformKey'],
        data (){
            return {
                emergencyList:[],
                departmentCode:'',
                urgencyDegreeDispay:'',
                depRequireDisplay:'',
                post: {
                    title:'',
                    disableds:false,
                    id: '',
                    serialNo: "",
                    projectId: "",
                    urgencyDegreeId: "",
                    urgencyDegreeDispay:'',
                    positionNameId: "",
                    officeName: '',
                    requireNum: '',
                    toWorkTime: "",
                    ageStart: undefined,
                    ageEnd: undefined,
                    sexRequireId: "",
                    educationId: "",
                    recruitWayId: "",
                    trainExperience: "",
                    responsibility: '',
                    professionalism: '',
                    workExperience: "",
                    technicalSkills: "",
                    testSalaryStart: "",
                    testSalaryEnd: "",
                    formalSalaryStart: "",
                    formalSalaryEnd: "",
                    requireCount: undefined,
                    officeCount: undefined,
                    depRequireId: "",
                    newReason: '',
                    officeId: '',  // 所属部门Id
                    officeAllCount: '',
                    officeRequireCount: '',
                    replacePerson: '',
                    replaceReason: '',
                    requirement: '',
                    enlargeNum:'',
                    enlargePositionName:'',
                    positionNatureValue:''
                },
                process: {
                    userId: '',
                    businessKey: '',
                    publishCode: '',
                    businessType: 'ZPSQ',
                    appId: 'starOffice',
                    businessCode: '',
                    businessTitle: '',
                    bussinessDataJsonStr: {
                      departmentCode: '',
                      urgencyDegreeId:'',
                      urgencyDegreeDispay:'',
                      targetRespon:''
                    }
                },
                stationList: [],
                replaceList: [],
                officeList: [],
                type: [
                    type.URGENCY_DEGREE,
                    type.SEX_REQUIRE,
                    type.DEGREE_REQUIRE,
                    type.RECRUIT_WAY,
                    type.DEPARTMENT_DEMAND_NATURE,
                    type.POSITION_NATURE
                ],
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                isCompleted: false,
                validating: false,
                fileList: [],
                calendar: {
                    show: false,
                    x: 13,
                    y: 40,
                    sep: '-'
                },
                positionName: '', // 用于流程引擎的标题增强
                replacePersonActive: {},
                replacePersonName: '',
                replaceSearch: '',
                replaceShow: false,
                timer: '',
                lookscreen:{
                    isShow:false,
                },
            }
        },
        computed: {
          businessTitle: function(){
            let vm = this;
            var str = this.post.officeName +'-'+ (this.positionName?this.positionName+'的':'') + '招聘申请';
            if(this.post.depRequireId == 4){
              str = this.post.officeName +'-'+ (this.positionName?this.positionName+'的':'') + '招聘申请(编制外)'
            }
            if(this.post.depRequireId == 5){
              str = this.post.officeName +'-'+ (this.post.enlargePositionName?this.post.enlargePositionName+'的':'') + '招聘申请(新增)'
            }
            vm.process.businessTitle = str;
            vm.post.title = str;
            return str;
          }
        },
        watch: {
          'post.positionNameId': function (val, old) {
            if(!val) return;
            let vm = this;
            // 去获取替换人员列表
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETALLLISTBYREPLACE, {
              positionsId: val,
              officeId: vm.post.officeId
            }).then((replace)=>{
              replace = replace.json().result;
              vm.replaceList = replace;
              if(!old){
                // 修改页面初始化
                let activeList = vm.post.replacePerson.split(',');
                activeList.forEach((key)=>{
                  let person = replace.find(({id})=>id == key);
                  if(person) {
                    vm.replacePersonActive[key] = person.name;
                    person.active = true;
                  }
                });

                vm.replacePersonName = Object.values(vm.replacePersonActive).join(', ');
              }else{
                vm.replacePersonActive = {};  // 清空已经选择的替换人
                vm.post.replacePerson = '';
                vm.replacePersonName = '';
              }
            })

            // 各种判断，为了责任描述是请求回来的，还是下拉选择时带出来的。
            if(!old){
              let businessKey = this.$route.query.businessKey || this.businessKey;
              if(!!businessKey) return
            }
            let obj = this.stationList.find((item) => item.id === val);
            if(!obj) return;
            this.post.responsibility = obj.dutyDesc;
            this.post.requirement = obj.workDuty;
            this.post.requireCount = obj.requireCount;
            this.post.officeCount = obj.officeCount;
            this.postionName = obj.postionName;
            this.positionName = obj.postionName;
          },
          'officeList': function (val) {
            if(val && val.length === 1){
              let office = val[0];
              this.post.officeName = office.officeName;
              this.post.officeId = office.officeId;
            }
          },
          'post.urgencyDegreeId': function (val){
            let urg = this.emergencyList.find((item) => item.value === val);
            if(!urg) return;
            this.urgencyDegreeDispay = urg.label;
          },
          'post.officeId': function (val) {
            let office = this.officeList.find((item) => item.officeId === val);
            if(!office) return;
            this.post.officeRequireCount = office.officeRequireCount;
            this.post.officeAllCount = office.officeAllCount;
            this.post.officeName = office.officeName;

            let vm = this;
            // 去请求职位
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETPOSITIONAME, {
              officeId: val
            }).then((station)=>{
              station = station.json().result;
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
          }
        },
        validators: {
          plus (val) {
            val = val.trim();
            if(!val) return true;
            if(val.indexOf('.') !== -1) return false;
            val = Number(val);
            if(!val) return false;
            if(val < 0) return false;
            return true
          },
          existDepartName (val) { // 验证新增部门
            val = val.trim();
            if (!val) return Promise.resolve();

            let vm = this.vm;
            return vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_CHECKPOSTION, {
                officeId: vm.post.officeId,
                enlargePositionName: val
              }).then((response) => {
                response = response.json();
              if (response.status == 0) {
                // vm.post.enlargePositionName = val;
                if (response.result == false) return Promise.reject('重名')
                else return Promise.resolve();
              } else {
                return Promise.reject(response.message)
              }
            })
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
            this.process.publishCode = this.$route.params.processId;
            this.process.userId = sessionStorage.getItem("loginName");
            this.emergency();
        },
        asyncData: function (resolve, reject) {
            let vm = this;
            let businessKey = this.$route.query.businessKey;
            businessKey && (this.businessKey = businessKey);
            if(this.businessKey){
                // update页面
                this.process.businessKey = this.businessKey;
                this.post.id = this.businessKey;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEERECRUIT, {id: this.businessKey}).then((response) => {
                    let result = response.json().result;
                    resolve({
                      'post.serialNo': result.serialNo,
                      'post.projectId': result.projectId,
                      'post.urgencyDegreeId': result.urgencyDegreeId,
                      'post.urgencyDegreeDispay': result.urgencyDegreeDispay,
                      'post.positionNameId': result.positionNameId,
                      'post.positionNameDisplay': result.positionNameDisplay,
                      'post.requireNum': result.requireNum,
                      'post.toWorkTime': result.toWorkTime,
                      'post.ageStart': result.ageStart,
                      'post.ageEnd': result.ageEnd,
                      'post.enlargeNum': result.enlargeNum,
                      'post.sexRequireId': result.sexRequireId,
                      'post.educationId': result.educationId,
                      'post.recruitWayId': result.recruitWayId,
                      'post.trainExperience': result.trainExperience,
                      'post.workExperience': result.workExperience,
                      'post.technicalSkills': result.technicalSkills,
                      'post.professionalism': result.professionalism,
                      'post.testSalaryStart': result.testSalaryStart,
                      'post.testSalaryEnd': result.testSalaryEnd,
                      'post.formalSalaryStart': result.formalSalaryStart,
                      'post.formalSalaryEnd': result.formalSalaryEnd,
                      'post.requireCount': result.requireCount,
                      'post.officeCount': result.officeCount,
                      'post.depRequireId': result.depRequireId,
                      'post.newReason': result.newReason,
                      'officeList': result.officeList,
                      'post.officeId': result.officeId,
                      'post.officeName': result.officeName,
                      'post.replacePerson': result.replacePerson,
                      'post.replaceReason': result.replaceReason,
                      'post.responsibility': result.responsibility,
                      'post.requirement': result.requirement,
                      'post.enlargePositionName': result.enlargePositionName,
                      'post.positionNatureValue': result.positionNatureValue,
                      'process.businessCode': result.serialNo,
                      'departmentCode': result.parentOfficeId,
                      'depRequireDisplay': result.depRequireDisplay,
                    });
                      this.positionName = this.post.positionNameDisplay//这行代码用于解决草稿箱businessTitle无法正确显示positionName的问题
                });
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                  resolve({
                    'fileList': response.json().result
                  })
                })
            }else {
                this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERZPSQ).then((response) => {
                  let serial = response.json().result;
                  resolve({
                    'officeList': serial.officeList,
                    'post.serialNo': serial.serialNumber,
                    'process.businessCode': serial.serialNumber,
                    'process.businessKey': serial.uuId,
                    'post.id': serial.uuId,
                    'departmentCode':serial.parentOfficeId,
                  });
                });
            }
        },
        methods: {
            clears: function(){
                this.post.enlargePositionName = '',
                this.post.enlargeNum = ''
                this.post.positionNameId = ''
                this.post.positionNatureValue =''
                this.post.requireNum = ''
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
            submit: function (e) {
                let vm = this;
                let userId = sessionStorage.getItem("loginName");
                if(this.post.depRequireId == 4 || this.post.depRequireId == 5){
                    this.process.publishCode = 'WF_HR_002_1';
                }
                vm._save(function () {
                  e.target.disabled = true;
                  vm.lookscreen.isShow = true;
                  if(vm.humanTaskId){
                    // update
                    vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
                      'humanTaskId': vm.humanTaskId,
                      'appros': true,
                      'userId' : userId
                    }).then((response) => {
                      let status = response.json().status;
                      if(status == 0){
                        vm._submitSuc();
                        vm.lookscreen.isShow = false;
                        e.target.disabled = false
                      }else{
                        vm.lookscreen.isShow = false;
                        e.target.disabled = false
                      }
                    })
                  }else {
                    // 修复部门编码错误
                    vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id:vm.post.officeId}).then((response) => {
                      let result = response.json().result;
                      if(result.departmentCode){
                        vm.process.bussinessDataJsonStr = JSON.stringify({
                            departmentCode: result.departmentCode,
                            urgencyDegreeId:vm.post.urgencyDegreeId,
                            urgencyDegreeDispay:vm.urgencyDegreeDispay,
                            targetRespon: result.loginName
                        })
                        vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_STARTPROCESS, vm.process).then((response) => {
                          let status = response.json().status;
                          if(status == 0){
                            vm._submitSuc();
                            vm.lookscreen.isShow = false;
                            e.target.disabled = false
                          }
                        });
                      } else {
                        console.error('获取部门编码失败');
                        vm.lookscreen.isShow = false;
                        e.target.disabled = false
                      }
                    });
                  }
                })
            },
            replacePerson: function (index) {
              let person = this.replaceList[index],
                  activeList = this.replacePersonActive,
                  active = person.active;
              if(active) {
                this.$set('replaceList['+ index +'].active', false);
                delete activeList[person.id];

              }else {
                this.$set('replaceList['+ index +'].active', true);
                activeList[person.id] = person.name;
              }
              this.post.replacePerson = Object.keys(activeList).join(',');
              this.replacePersonName = Object.values(activeList).join(', ');
            },
            openReplacePerson: function (){
              clearTimeout(this.timer);
              this.replaceShow = true;
            },
            closeReplacePerson: function (){
              let vm = this;
              this.timer = setTimeout(function(){
                vm.replaceShow = false
              }, 100)
            },
            _save: function (callback) {
                let vm = this;
                if(vm.$validation.station)vm.$validation.station.valid =  !!vm.post.positionNameId;
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
                // 关于部门需求性质方面的验证
                let wranMsg = '';
                if(vm.post.depRequireId == 0){
                  if(+vm.post.officeCount >= +vm.post.requireCount ){
                    // 选择补充时, 如果职位在职人数>=职位定编人数
                    wranMsg = '职位在职人数超出部门定编人数，只可以选择“临时”和“替换”'
                  }else if(+vm.post.requireNum > vm.post.requireCount - vm.post.officeCount){
                    wranMsg = '申请人数已超出可补充人数'
                  }
                }
                if(vm.post.depRequireId == 3){
                  if(+vm.post.requireNum > +vm.post.officeCount){
                    wranMsg = '申请人数超过在职人数'
                  }else if(vm.post.requireNum != Object.keys(vm.replacePersonActive).length){
                    wranMsg = '替换人数与申请人数不匹配，请检查后重新输入'
                  }
                }
                if(wranMsg){
                  vm.options = {
                    title: '温馨提示',
                    message: wranMsg,
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
                  return false
                }
                if(this.post.depRequireId == 4 || this.post.depRequireId == 5){
                    vm.post.requireNum = vm.post.enlargeNum
                }
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVERECRUIT, this.post).then((response) => {
                    let status = response.json().status;
                    if(status == 0){
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
