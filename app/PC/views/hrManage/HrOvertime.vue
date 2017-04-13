<!-- 人事管理 --- 人事管理 --- 加班、餐补 -->
<template>
  <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
  <validator name="validation">
    <Tip-border tip="加班申请基本信息">
      <div class="g-padding20">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">报销编号：</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" readonly v-model="post.bussinessData.serialNo">
          </div>
          <label class="col-sm-2 control-label">所属部门：</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" readonly v-model="officeName">
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label field-require">紧急程度：</label>
          <div class="col-sm-4" v-validate-class>
            <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.bussinessData.urgencyDegreeId"
                            v-validate:urgency-degree="{required: true}"></Tool-Selection>
            <span class="fc-red" v-show="($validation.urgencyDegree.touched || validating) && $validation.urgencyDegree.required">必填项</span>
          </div>
          <section v-if=" edit == '-1' || !edit">
            <label class="col-sm-2 control-label field-require">加班类型：</label>
            <div class="col-sm-4" v-validate-class>
              <select class="form-control" v-model="post.bussinessData.overtimeSubsidyType" v-validate:subsidytype="{required: true}">
                <option v-for="item in olist" v-bind:value="item.index">
                  {{ item.overtimeType}}
                </option>
              </select>
              <span class="fc-red" v-show="($validation.subsidytype.touched || validating) && $validation.subsidytype.required">必填项</span>
            </div>
          </section>
          <section v-else>
            <label class="col-sm-2 control-label field-require">加班类型：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" readonly v-model="overtimeType">
            </div>
          </section>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">补贴类型：</label>
          <div class="col-sm-4">
            <input type="text" class="form-control" readonly v-model="subsidyType">
          </div>
        </div>
      </div>
    </Tip-border>
    <Tip-border tip="加班申请详细信息">
      <div class="g-padding20">
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label field-require">加班日期：</label>
          <div class="col-sm-3" v-validate-class>
            <input type="text" class="form-control input-calendar" v-model="beginDate" @click.stop="calendar.evectionStart = true" v-validate:card-available="{required: true, Dateformat: true, startime:true}" readonly="true">
            <span class="fc-red" v-show="($validation.cardAvailable.touched || validating) && $validation.cardAvailable.required">请选择日期</span>
            <span class="fc-red" v-show="($validation.cardAvailable.touched || validating) && $validation.cardAvailable.Dateformat">时间错误</span>
            <span class="fc-red" v-show="($validation.cardAvailable.touched || validating) && $validation.cardAvailable.startime">时分过大</span>
            <Public-Calendar
              :value.sync="beginDate"
              :show.sync="calendar.evectionStart"
              :type="calendar.typeone"
              :end.sync="calendar.end"
              :x="calendar.x"
              :y="calendar.y"
              :sep.sync="calendar.sep"></Public-Calendar>
          </div>
          <div class="col-sm-2 field-interval" v-validate-class>
            <input type="text" class="form-control input-calendar" v-model="endDate" @click.stop="calendar.evectionEnd = true" v-validate:end-date="{required: true, timeformat: true, endtime: ture}" readonly="true">
            <span class="fc-red" v-show="($validation.endDate.touched || validating) && $validation.endDate.required">请选择时间</span>
            <span class="fc-red" v-show="($validation.endDate.touched || validating) && $validation.endDate.timeformat">时间错误</span>
            <span class="fc-red" v-show="($validation.endDate.touched || validating) && $validation.endDate.endtime">时分过小</span>
            <Public-Calendar
              :value.sync="endDate"
              :show.sync="calendar.evectionEnd"
              :type="calendar.typetwo"
              :x="-88"
              :y="calendar.y"
              :sep.sync="calendar.sep"></Public-Calendar>
          </div>
          <label class="col-sm-2 control-label field-require">加班小时：</label>
          <div class="col-sm-2" v-validate-class>
            <input type="text" class="form-control" readonly v-model="overtime" @blur="hovers" @click="peoples" v-validate:employee="['required']">
            <span class="fc-red" v-show="($validation.employee.touched || validating) && $validation.employee.required">必填项</span>
            <label class="replace-container" v-show="replaceShow" transition="replace-prompt" style="width: 132px">
              <div class="replace-list">
                <ul>
                  <li class="replace-list-item" v-for="item in times"
                      :class="{'active': item.active}" @click="replacePerson($index)">{{item.time}}</li>
                </ul>
              </div>
            </label>
          </div>
          <div class="col-sm-1">
            <button type="button" class="btn btn-primary g-fr" @click="addNumber()">添加</button>
          </div>
        </div>
        <div class="form-group clearfix" v-for="field in numList">
          <label class="col-sm-2 control-label field-require">加班日期：</label>
          <div class="col-sm-3" v-validate-class>
            <input type="text" class="form-control input-calendar" :field="field.name + $index" v-model="field.beginTime" @click.stop="field.evectionStart = true" v-validate="field.validate" readonly="true">
            <span class="fc-red" v-show="($validation[field.name + $index].touched || validating) && $validation[field.name + $index].required">请选择日期</span>
            <span class="fc-red" v-show="($validation[field.name + $index].touched || validating) && $validation[field.name + $index].Dateformat">时间错误</span>
            <span class="fc-red" v-show="($validation[field.name + $index].touched || validating) && $validation[field.name + $index].startimelist">时分过大</span>
            <span class="fc-red" v-show="($validation[field.name + $index].pristine || validating) && $validation[field.name + $index].canbu"></span>
            <Public-Calendar
              :value.sync="field.beginTime"
              :show.sync="field.evectionStart"
              :type="calendar.typeone"
              :end.sync="calendar.end"
              :x="calendar.x"
              :y="calendar.y"
              :sep.sync="calendar.sep"></Public-Calendar>
          </div>
          <div class="col-sm-2 field-interval" v-validate-class>
            <input type="text" class="form-control input-calendar" :field="field.time + $index" v-model="field.endTime" @click.stop="field.evectionEnd = true"  v-validate="field.validate2" readonly="true">
            <span class="fc-red" v-show="($validation[field.time + $index].touched || validating) && $validation[field.time + $index].required">请选择时间</span>
            <span class="fc-red" v-show="($validation[field.time + $index].touched || validating) && $validation[field.time + $index].timeformat">时间错误</span>
            <span class="fc-red" v-show="($validation[field.time + $index].touched || validating) && $validation[field.time + $index].endtimelist">时分过小</span>
            <span class="fc-red" v-show="($validation[field.time + $index].dirty || validating) && $validation[field.time + $index].canbuend"></span>
            <Public-Calendar
              :value.sync="field.endTime"
              :show.sync="field.evectionEnd"
              :type="calendar.typetwo"
              :x="-88"
              :y="calendar.y"
              :sep.sync="calendar.sep"></Public-Calendar>
          </div>
          <label class="col-sm-2 control-label field-require">加班小时：</label>
          <div class="col-sm-2" v-validate-class>

            <input type="text" class="form-control" readonly :field="field.overtime + $index" v-model="field.hours" @blur="hoverslist($index)" @click="peopleslist($index)" v-validate="field.validate3">
            <span class="fc-red" v-show="($validation[field.overtime + $index].touched || validating) && $validation[field.overtime + $index].required">必须填</span>
            <label class="replace-container" v-show="field.replaceShow" transition="replace-prompt" style="width: 132px">
              <div class="replace-list">
                <ul>
                  <li class="replace-list-item" v-for="item in times"
                      :class="{'active': item.active}" @click="replacePersonlist($index,$parent.$index)">{{item.time}}</li>
                </ul>
              </div>
            </label>
          </div>
          <div class="col-sm-1">
            <button type="button" class="btn btn-primary g-fr" @click="dir($index)">删除</button>
          </div>
        </div>
        <section v-if="post.bussinessData.overtimeSubsidyType == '1'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">合计小时：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly v-model="post.bussinessData.timeAmount">
            </div>
            <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" v-model="post.bussinessData.dinnerAmount" readonly>
            </div>
          </div>
        </section>
        <section v-if="post.bussinessData.overtimeSubsidyType == '3'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">合计小时：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly v-model="post.bussinessData.timeAmount">
            </div>
          </div>
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">合计午餐餐补天数：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" v-model="post.bussinessData.lunchAmount" readonly>
            </div>
            <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" v-model="post.bussinessData.dinnerAmount" readonly>
            </div>
          </div>
        </section>
        <section v-if="post.bussinessData.overtimeSubsidyType == '4'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">合计午餐餐补天数：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" v-model="post.bussinessData.lunchAmount" readonly>
            </div>
            <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" v-model="post.bussinessData.dinnerAmount" readonly>
            </div>
          </div>
        </section>
        <section v-if="post.bussinessData.overtimeSubsidyType == '2'">
          <div class="form-group clearfix">
            <label class="col-sm-2 control-label">合计晚餐餐补天数：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" v-model="post.bussinessData.dinnerAmount" readonly>
            </div>
          </div>
        </section>
        <div class="form-group g-marginB20 clearfix" v-validate-class>
          <label class="col-sm-2 control-label field-require">申请理由：</label>
          <Text :text-value='post.bussinessData.overtimeReason' :max-length="200" :class-name="'col-sm-10'">
                            <textarea class="form-control" rows="3" v-model="post.bussinessData.overtimeReason"
                                      v-validate:comment="{required: true, maxlength: 200}"></textarea>
            <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.required">必填项</span>
            <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.maxlength">输入过长</span>
          </Text>
        </div>
        <div class="form-group clearfix">
          <label class="col-sm-2 control-label">上传附件：</label>
          <div class="col-sm-10">
            <Tool-Upload :files.sync="fileList" :resource-id="post.bussinessData.id" :resource-type="'10'"></Tool-Upload>
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
  import {getData, changeCurRoute, initCurRoute} from '../../actions/headNavbarAction'
  import {getNavBar, getUrl, getCurRoute, getIgnoreRoute, getSingleRoute} from '../../getters/headNavbarGetter'
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
    props: ['taskId', 'businessKey', 'humanTaskId','taskformKey','hr','deptheader','kqgly','zc','zjl','edit'],
    data: function () {
      return {
        officeName:'',
        cnName:'',
        subsidyType:'',
        beginDate:'',
        endDate:'',
        overtime:'',
        overtimeType:'',
        urgencyDegreeDispay:'',
        replaceShow: false,
        departmentCode:'',
        post: {
          bussinessData: {
            id: '',                                               //主键
            title: '',                                            //标题
            serialNo: '',                                         //招聘编号
            formKey: 'applying',
            urgencyDegreeId: '',                                 //紧急程度，数据字典值
            overtimeSubsidyType:'',                              //加班补贴类型
            timeAmount:'',                                       //合计小时
            lunchAmount:'0',                                      //合计午餐天数
            dinnerAmount:'0',                                     //合计晚餐天数
            overtimeReason:'',                                   //加班理由
            overtimeDetailList:[],
          },
        },
        process: {
          userId: '',
          businessKey: '',
          typeCode: 'QJLX',
          businessType: 'JBSQ',
          appId: 'starOffice',
          businessCode: '',
          businessTitle: '',
          bussinessDataJsonStr: {
            departmentCode:'',
            urgencyDegreeId: '',
            urgencyDegreeDispay:'',
          }
        },
        olist:[],
        fileList: [],
        emergencyList:[],
        times:[
            {time:2},
            {time:2.5},
            {time:3},
            {time:3.5},
            {time:4},
            {time:4.5},
            {time:5},
            {time:5.5},
            {time:6},
            {time:6.5},
            {time:7},
            {time:7.5},
            {time:8},
            {time:8.5},
            {time:9},
            {time:9.5},
            {time:10},
            {time:10.5},
            {time:11},
            {time:11.5},
            {time:12},
            {time:12.5},
            {time:13},
            {time:13.5},
            {time:14},
            {time:14.5},
            {time:15},
            {time:15.5},
            {time:16},
            {time:16.5},
            {time:17},
            {time:17.5},
            {time:18},
            {time:18.5},
            {time:19},
            {time:19.5},
            {time:20},
            {time:20.5},
            {time:21},
            {time:21.5},
            {time:22},
            {time:22.5},
            {time:23},
        ],
        numList:[],
        type: [
          type.URGENCY_DEGREE,
        ],
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        lookscreen: {
          isShow: false,
        },
        calendar: {
          evectionStart: false,
          evectionEnd: false,
          typeone:'datetime',
          typetwo:"time",
          end:'',
          x: 13,
          y: 40,
          sep: '-'
        },
        beginshow:true,
        beginshow1:true,
        beginshow2:true,
        endshow:true,
        off:[],
        getDataoff: true,
        dateoff: true,
      }
    },
    computed: {
      businessTitle: function () {
        let vm = this;
        let str = (vm.officeName ? vm.officeName + '-' : '') + (vm.cnName ? vm.cnName + '的' : '') + '加班/餐补申请';
        vm.post.bussinessData.title = str;
        vm.process.businessTitle = str;
        return str;
      },
    },

    route: {
      canDeactivate: function (transition) {
        let vm = this;
        let hash = transition.to.path.match(/^\/\w+/);
        if (hash[0] != '/process') hash = '/process';
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

    created: function () {
      //初始化数据
      this.loadData();
      this.OvertimeList();
      this.emergency();
      this.cnName = sessionStorage.getItem("userName");
      this.process.userId = sessionStorage.getItem("loginName");
    },
    asyncData: function (resolve) {
      let that = this;
      //判断id 进入的路径
      let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
      let id = {
        bussinessData: {
          id: businessKey
        }
      }
      that.personData(function () {
        if (businessKey) {
          that.process.businessKey = businessKey
          //包含id则更新页面
          that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDOVERTIME, id).then(function (response) {
            let result = response.json().result;
            resolve({
              'post.bussinessData.id': result.id,                                       //录用申请信息主键
              'post.bussinessData.serialNo': result.serialNo,                           //录用申请编号
              'post.bussinessData.formKey': result.formKey,
              'post.bussinessData.title': result.title,
              'post.bussinessData.overtimeSubsidyType': result.overtimeSubsidyType,
              'post.bussinessData.urgencyDegreeId': result.urgencyDegreeId,
              'post.bussinessData.overtimeReason': result.overtimeReason,
              'post.bussinessData.timeAmount': result.timeAmount,
              'post.bussinessData.overtimeDetailList': result.overtimeDetailList,
              'overtimeType': result.overtimeType,
            })
            that.offices(that.officeId);
            //填充
            that.beginDate = that.post.bussinessData.overtimeDetailList[0].beginTime
            that.endDate = that.post.bussinessData.overtimeDetailList[0].endTime.substring(11,16)
            that.overtime = that.post.bussinessData.overtimeDetailList[0].hours

            for(let i = 1;i<that.post.bussinessData.overtimeDetailList.length;i++){
              that.numList.push({
                beginTime:that.post.bussinessData.overtimeDetailList[i].beginTime,
                endTime:that.post.bussinessData.overtimeDetailList[i].endTime.substring(11,16),
                hours:that.post.bussinessData.overtimeDetailList[i].hours,
                name: 'fpNumber',
                time:'ends',
                overtime:'times',
                evectionStart: false,
                evectionEnd: false,
                replaceShow: false,
                validate: {required: true,Dateformat:true,startimelist:true,canbu:true },
                validate2: {required: true ,timeformat: true , endtimelist: true,canbuend:true,},
                validate3: {required: true}
              });
              that.off.push({show:true,show1:true,show2:true})
            }
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
      'post.bussinessData.urgencyDegreeId': function (val){
        let urg = this.emergencyList.find((item) => item.value === val);
        if(!urg) return;
        this.urgencyDegreeDispay = urg.label;
      },
      //根据加班类型获取补贴类型
      'post.bussinessData.overtimeSubsidyType': function (val){
        let urg = this.olist.find((item) => item.index === val);
        if(!urg) return;
        this.subsidyType = urg.subsidyType;
        //选择类型清除数据
        let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
        if(businessKey && this.dateoff== true) {
          this.dateoff = false
          return;
        }
        this.numList.splice(0,this.numList.length)
        this.off.splice(0,this.off.length)
        this.beginDate = ''
        this.endDate = ''
        this.overtime = ''
        this.post.bussinessData.timeAmount = 0
        this.post.bussinessData.lunchAmount = 0
        this.post.bussinessData.dinnerAmount = 0
        this.post.bussinessData.overtimeReason = ''
        this.beginshow=true,
        this.beginshow1=true,
        this.beginshow2=true,
        this.endshow = true
      },

      'beginDate': function (val) {
        let star  = val.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = this.endDate.replace(/:/g,'')
        if(!endsf || !starsf)return
        if(this.post.bussinessData.overtimeSubsidyType == '1' || this.post.bussinessData.overtimeSubsidyType == '2'){
          if(((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) {
            if(this.beginshow== true){
              this.post.bussinessData.dinnerAmount++
              this.beginshow =false
            }
          }else{
            if(this.beginshow == false){
              if(this.post.bussinessData.dinnerAmount == 0)return
              this.post.bussinessData.dinnerAmount--
              this.beginshow =true
            }
          }
        }else{
          if((1745 - starsf >= 400) && (endsf - 1745 >= 200)){
            if(this.beginshow == true) {
              this.post.bussinessData.dinnerAmount++
              this.post.bussinessData.lunchAmount++
              this.beginshow = false
            }
          }else{
            if(this.beginshow == false){
              if(this.post.bussinessData.dinnerAmount == 0)return
              if(this.post.bussinessData.lunchAmount == 0)return
              this.post.bussinessData.dinnerAmount--
              this.post.bussinessData.lunchAmount--
              this.beginshow =true
            }
          }
          if((endsf - starsf >= 400) && (1745 - starsf >= 400) && this.beginshow == true){
            if(this.beginshow1 == true) {
              this.post.bussinessData.lunchAmount++
              this.beginshow1 = false
            }
          }else{
            if(this.beginshow1 == false){
              if(this.post.bussinessData.lunchAmount == 0)return
              this.post.bussinessData.lunchAmount--
              this.beginshow1 =true
            }
          }
          if((((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) && this.beginshow == true){
            if(this.beginshow2 == true) {
              this.post.bussinessData.dinnerAmount++
              this.beginshow2 = false
            }
          }else{
            if(this.beginshow2 == false){
              if(this.post.bussinessData.dinnerAmount == 0)return
              this.post.bussinessData.dinnerAmount--
              this.beginshow2 =true
            }
          }
        }
      },
      'endDate' : function (val) {
        let star  = this.beginDate.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = val.replace(/:/g,'')
        if(!endsf || !starsf)return
        if(this.post.bussinessData.overtimeSubsidyType == '1' || this.post.bussinessData.overtimeSubsidyType == '2'){
          if(((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) {
            if(this.beginshow== true){
              this.post.bussinessData.dinnerAmount++
              this.beginshow=false
            }
          }else{
            if(this.beginshow== false){
              if(this.post.bussinessData.dinnerAmount == 0)return
              this.post.bussinessData.dinnerAmount--
              this.beginshow=true
            }
          }
        }else{
          if((1745 - starsf >= 400) && (endsf - 1745 >= 200)){
            if(this.beginshow == true) {
              this.post.bussinessData.dinnerAmount++
              this.post.bussinessData.lunchAmount++
              this.beginshow = false
            }
          }else{
            if(this.beginshow == false){
              if(this.post.bussinessData.dinnerAmount == 0)return
              if(this.post.bussinessData.lunchAmount == 0)return
              this.post.bussinessData.dinnerAmount--
              this.post.bussinessData.lunchAmount--
              this.beginshow =true
            }
          }
          if((endsf - starsf >= 400) && (1745 - starsf >= 400) && this.beginshow == true){
            if(this.beginshow1 == true) {
              this.post.bussinessData.lunchAmount++
              this.beginshow1 = false
            }
          }else{
            if(this.beginshow1 == false){
              if(this.post.bussinessData.lunchAmount == 0)return
              this.post.bussinessData.lunchAmount--
              this.beginshow1 =true
            }
          }
          if((((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) && this.beginshow == true){
            if(this.beginshow2 == true) {
              this.post.bussinessData.dinnerAmount++
              this.beginshow2 = false
            }
          }else{
            if(this.beginshow2 == false){
              if(this.post.bussinessData.dinnerAmount == 0)return
              this.post.bussinessData.dinnerAmount--
              this.beginshow2 =true
            }
          }
        }
      }
    },
    validators: {
      Dateformat(val){
        if(!val)return true
        let star  = val.substring(11,16)
        return  /^([01]\d|2[0123]):([0-5]\d|59)$/.test(star)
      },
      timeformat(val){
        if(!val)return true
        return  /^([01]\d|2[0123]):([0-5]\d|59)$/.test(val)
      },
      startime(val){
        //验证非数组当中加班日期的前后对比大小（选择加班开始时间验证）
        let vm = this.vm;
        let star  = val.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = this.vm.endDate.replace(/:/g,'')
        if(!endsf || !starsf){
            return true;
        }
        if(starsf > endsf){
            return false;
        }else{
            return true
        }
      },
      endtime: function (val) {
        //验证非数组当中加班日期的前后对比大小（选择加班结束时间验证）
        let vm = this.vm;
        let star  = this.vm.beginDate.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = val.replace(/:/g,'')
        if(!starsf || !endsf){
          return true;
        }
        if(starsf > endsf){
          return false;
        }else{
          return true
        }
      },
      startimelist(val){
        //验证数组当中加班日期的前后对比大小（选择加班开始时间验证）
        let vm = this.vm;
        let bgtm = this.vm.numList.find((item) => item.beginTime === val);
        if (!bgtm) return;
        let endtime = bgtm.endTime;
        let star  = val.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = endtime.replace(/:/g,'')
        if(!endsf || !starsf){
          return true;
        }
        if(starsf > endsf){
          return false;
        }else{
          return true
        }
      },
      endtimelist: function (val) {
        //验证数组当中加班日期的前后对比大小（选择加班结束时间验证）
        let vm = this.vm;
        let endtm = this.vm.numList.find((item) => item.endTime === val);
        if (!endtm) return;
        let endtime = endtm.beginTime;
        let star  = endtime.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = val.replace(/:/g,'')
        if(!starsf || !endsf){
          return true;
        }
        if(starsf > endsf){
          return false;
        }else{
          return true
        }
      },
      canbu: function (val) {
        let vm = this.vm;
        var numers;
        for(let i =0; i<this.vm.numList.length;i++) {
          if (this.vm.numList[i].beginTime == val) {
            numers = i;
          }
        }
        let bgtm = this.vm.numList.find((item) => item.beginTime === val);
        let endtime = bgtm.endTime;
        let star  = val.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = endtime.replace(/:/g,'')
        if(!starsf || !endsf){
          return true;
        }
        if(this.vm.post.bussinessData.overtimeSubsidyType == '1' || this.vm.post.bussinessData.overtimeSubsidyType == '2'){
          if(((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) {
              if(this.vm.off[numers].show == true){
                this.vm.post.bussinessData.dinnerAmount = this.vm.post.bussinessData.dinnerAmount + 1
                this.vm.off[numers].show = false
              }
          }else{
            if(this.vm.off[numers].show == false){
              if(this.vm.post.bussinessData.dinnerAmount == 0)return
              this.vm.post.bussinessData.dinnerAmount = 0
              this.vm.off[numers].show = true
            }
          }
        }else{
          if((1745 - starsf >= 400) && (endsf - 1745 >= 200)){
            if(this.vm.off[numers].show == true) {
              this.vm.post.bussinessData.dinnerAmount++
              this.vm.post.bussinessData.lunchAmount++
              this.vm.off[numers].show = false
            }
          }else{
            if(this.vm.off[numers].show == false){
              if(this.vm.post.bussinessData.dinnerAmount == 0)return
              if(this.vm.post.bussinessData.lunchAmount == 0)return
              this.vm.post.bussinessData.dinnerAmount--
              this.vm.post.bussinessData.lunchAmount--
              this.vm.off[numers].show =true
            }
          }
          if((endsf - starsf >= 400) && (1745 - starsf >= 400) && this.vm.off[numers].show == true){
            if(this.vm.off[numers].show1 == true) {
              this.vm.post.bussinessData.lunchAmount++
              this.vm.off[numers].show1 = false
            }
          }else{
            if(this.vm.off[numers].show1 == false){
              if(this.vm.post.bussinessData.lunchAmount == 0)return
              this.vm.post.bussinessData.lunchAmount--
              this.vm.off[numers].show1 =true
            }
          }
          if((((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200)))  && this.vm.off[numers].show == true){
            if(this.vm.off[numers].show2 == true) {
              this.vm.post.bussinessData.dinnerAmount++
              this.vm.off[numers].show2 = false
            }
          }else{
            if(this.vm.off[numers].show2 == false){
              if(this.vm.post.bussinessData.dinnerAmount == 0)return
              this.vm.post.bussinessData.dinnerAmount--
              this.vm.off[numers].show2 =true
            }
          }
        }
        return true
      },
      canbuend: function (val) {
        let vm = this.vm;
        var numers;
        for(let i =0; i<this.vm.numList.length;i++) {
          if (this.vm.numList[i].endTime == val) {
            numers = i;
          }
        }
        let endtm = this.vm.numList.find((item) => item.endTime === val);
        let endtime = endtm.beginTime;
        let star  = endtime.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = val.replace(/:/g,'')
        if(!starsf || !endsf){
          return true;
        }
        if(this.vm.post.bussinessData.overtimeSubsidyType == '1' || this.vm.post.bussinessData.overtimeSubsidyType == '2'){
          if(((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) {
            if(this.vm.off[numers].show == true){
              this.vm.post.bussinessData.dinnerAmount++
              this.vm.off[numers].show = false
            }
          }else{
            if(this.vm.off[numers].show == false) {
              if (this.vm.post.bussinessData.dinnerAmount == 0)return true;
              this.vm.post.bussinessData.dinnerAmount--
              this.vm.off[numers].show = true
            }
          }
        }else{
          if((1745 - starsf >= 400) && (endsf - 1745 >= 200)){
            if(this.vm.off[numers].show == true) {
              this.vm.post.bussinessData.dinnerAmount++
              this.vm.post.bussinessData.lunchAmount++
              this.vm.off[numers].show = false
            }
          }else{
            if(this.vm.off[numers].show == false){
              if(this.vm.post.bussinessData.dinnerAmount == 0)return
              if(this.vm.post.bussinessData.lunchAmount == 0)return
              this.vm.post.bussinessData.dinnerAmount--
              this.vm.post.bussinessData.lunchAmount--
              this.vm.off[numers].show =true
            }
          }
          if( (endsf - starsf >= 400) && (1745 - starsf >= 400) && this.vm.off[numers].show == true){
            if(this.vm.off[numers].show1 == true) {
              this.vm.post.bussinessData.lunchAmount++
              this.vm.off[numers].show1 = false
            }
          }else{
            if(this.vm.off[numers].show1 == false){
              if(this.vm.post.bussinessData.lunchAmount == 0)return
              this.vm.post.bussinessData.lunchAmount--
              this.vm.off[numers].show1 =true
            }
          }
          if((((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200)))  && this.vm.off[numers].show == true){
            if(this.vm.off[numers].show2 == true) {
              this.vm.post.bussinessData.dinnerAmount++
              this.vm.off[numers].show2 = false
            }
          }else{
            if(this.vm.off[numers].show2 == false){
              if(this.vm.post.bussinessData.dinnerAmount == 0)return
              this.vm.post.bussinessData.dinnerAmount--
              this.vm.off[numers].show2 =true
            }
          }
        }
        return true
      }
    },
    methods: {
      //初始化数据
      peoples: function(){
        this.replaceShow = !this.replaceShow
      },
      peopleslist: function(index){
        this.numList[index].replaceShow = !this.numList[index].replaceShow
      },
      hovers:function () {
        this.replaceShow = false;
      },
      hoverslist:function (index) {
        this.numList[index].replaceShow
      },
      replacePerson: function(index){
        this.overtime = this.times[index].time;
        this.replaceShow = false;
        this.post.bussinessData.timeAmount = '';
        if (!this.overtime) this.overtime = 0;
        this.post.bussinessData.timeAmount = parseFloat(this.overtime);
        for(let i =0; i<this.numList.length;i++) {
          if (this.numList[i].hours) {
            this.post.bussinessData.timeAmount += parseFloat(this.numList[i].hours)
          }
        }
      },
      replacePersonlist: function (index,Pindex) {
        this.numList[Pindex].hours = this.times[index].time;
        this.numList[Pindex].replaceShow = false;
        this.post.bussinessData.timeAmount = '';
        if (!this.overtime) this.overtime = 0;
        this.post.bussinessData.timeAmount = parseFloat(this.overtime);
        for(let i =0; i<this.numList.length;i++) {
          if (this.numList[i].hours) {
            this.post.bussinessData.timeAmount += parseFloat(this.numList[i].hours)
          }
        }
      },
      loadData: function () {
        var that = this;
        this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERJBSQ).then((response) => {
          let serial = response.json().result;
          that.post.bussinessData.id = serial.uuId;
          that.process.businessKey = serial.uuId;
          that.post.bussinessData.serialNo = serial.serialNumber;
          that.process.businessCode = serial.serialNumber;
          that.officeName = serial.officeName;
          that.officeId = serial.officeId;
          that.offices(that.officeId);
        });
      },
      offices: function (id) {
        let that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID,{id: id}).then(function (response) {
          var Data = response.json().result;
          this.departmentCode = Data.departmentCode;
        });
      },
      //初始化人事异动数据
      personData: function (callback) {
        var that = this;
        that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDEMPLOYEEBASEINFOLISTFORMOVE).then((response) => {
          let serial = response.json().result;
        that.listName = serial;
        callback();
        });
      },
      //初始化加班餐补类型列表
      OvertimeList: function () {
        var that = this;
        this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETOVERTIMESUBSIDYTYPELIST).then((response) => {
          let olist = response.json().result;
          that.olist = olist;
        })
      },
      addNumber: function () {
        this.numList.push({beginTime:'',endTime:'',hours:'',name: 'fpNumber',time:'ends', overtime:'times', evectionStart: false, evectionEnd: false,replaceShow: false, validate: {required: true,Dateformat:true,startimelist:true,canbu:true },validate2: {required: true ,timeformat: true , endtimelist: true,canbuend:true,},validate3: {required: true}});
        this.off.push({show:true,show1:true,show2:true})
      },
      dir: function (index) {
        let stard = this.numList[index].beginTime
        let endtime = this.numList[index].endTime
        let star  = stard.substring(11,16)
        let starsf = star.replace(/:/g,'')
        let endsf = endtime.replace(/:/g,'')

        if(this.post.bussinessData.overtimeSubsidyType == '1' || this.post.bussinessData.overtimeSubsidyType == '2'){
          if(((endsf - 1745 >= 200) && (starsf < 1745)) || ((starsf >= 1745) && (endsf - starsf >= 200))) {
            if(this.off[index].show == false) {
              if (this.post.bussinessData.dinnerAmount != 0){
                this.post.bussinessData.dinnerAmount--
                this.off[index].show = true
              }
            }
          }
        }else{
          if((1745 - starsf >= 400) && (endsf - 1745 >= 200)){
            if(this.off[index].show == false){
              if(this.post.bussinessData.dinnerAmount != 0 && this.post.bussinessData.lunchAmount != 0){
                this.post.bussinessData.dinnerAmount--
                this.post.bussinessData.lunchAmount--
                this.off[index].show =true
              }
            }
          }
          if( (endsf - starsf >= 400) && (1745 - starsf >= 400) && this.off[index].show == false){
            if(this.off[index].show1 == false){
              if(this.post.bussinessData.lunchAmount != 0){
                this.post.bussinessData.lunchAmount--
                this.off[index].show1 =true
              }
            }
          }
          if(endsf - 1745 >= 200 && this.off[index].show == false){
            if(this.off[index].show2 == false){
              if(this.post.bussinessData.dinnerAmount == 0){
                this.post.bussinessData.dinnerAmount--
                this.off[index].show2 =true
              }
            }
          }
        }
        this.numList.splice(index, 1);
        this.post.bussinessData.timeAmount = '';
        if (!this.overtime) this.overtime = 0;
        this.post.bussinessData.timeAmount = parseFloat(this.overtime);
        for(let i =0; i<this.numList.length;i++) {
          if (this.numList[i].hours) {
            this.post.bussinessData.timeAmount += parseFloat(this.numList[i].hours)
          }
        }
      },
      //提交
      onSubmit: function (e) {
        // validate manually
        var self = this
        let userId = sessionStorage.getItem("loginName");

        self._save(function () {
          e.target.disabled = true
          self.lookscreen.isShow = true;
          if (!self.businessKey) {
            self.process.bussinessDataJsonStr= JSON.stringify({
              departmentCode: self.departmentCode,
              urgencyDegreeId: self.post.bussinessData.urgencyDegreeId,
              urgencyDegreeDispay: self.urgencyDegreeDispay,
            });
            self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_NEWSTARTPROCESS, self.process).then((response) => {
              let status = response.json().status;
            if (status == 0) {
              self._submitSuc();
              e.target.disabled = false
              self.lookscreen.isShow = false;
            } else {
              e.target.disabled = false
              self.lookscreen.isShow = false;
            }
          });
          } else {
            self.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
              'humanTaskId': self.humanTaskId,
              'appros': true,
              'userId': userId
            }).then((response) => {
              let status = response.json().status;
            if (status == 0) {
              self._submitSuc();
              e.target.disabled = false
              self.lookscreen.isShow = false;
            } else {
              e.target.disabled = false
              self.lookscreen.isShow = false;
            }
          })
          }
        });
      },
      //保存草稿
      save: function (e) {
        let vm = this;
        vm._save(function () {
          vm.$validate(true, function () {
            if (vm.$validation.invalid) {
              e.preventDefault()
            } else {
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
      datetime: function () {
        let vm = this;
        let old = this.beginDate.substring(0,10);
        let olds = this.beginDate.substring(0,7);
        if(!old) return
        let bgg = []
        for(let i=0;i<this.numList.length;i++){
            bgg.push(this.numList[i].beginTime.substring(0,7))
        }
        for(let j=0;j<bgg.length;j++){
          if (olds != bgg[j]) {
            vm.options = {
              title: '温馨提示',
              message: '加班月份必须保持在同月中!',
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
            this.getDataoff = false;
            return false
          }else{
            this.getDataoff = true;
          }
        }


        this.post.bussinessData.overtimeDetailList = []
        this.post.bussinessData.overtimeDetailList.push({
          beginTime:this.beginDate,
          endTime:old +' '+ this.endDate,
          hours:this.overtime
        })
        for(let i=0;i<this.numList.length;i++){
          this.post.bussinessData.overtimeDetailList.push({
            beginTime:this.numList[i].beginTime,
            endTime:this.numList[i].beginTime.substring(0,10) + ' ' + this.numList[i].endTime,
            hours:this.numList[i].hours})
        }
      },
      //提交接口
      _save: function (callback) {
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
          }else{
            vm.datetime();
            if(!vm.getDataoff) return
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEOVERTIME, vm.post).then(function (response) {
              let status = response.json().status;
              if (status == 0) {
                callback();
              }
            })
          }
        })
      },

      cancelProcess: function () {
        let vm = this;
        if (!vm.stationList || !vm.stationList.length) {
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
      office: function (officeId, code, respon) {
        let that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID, {id: officeId}).then(function (response) {
          var Data = response.json().result;
          that[code] = Data.departmentCode;
          that[respon] = Data.loginName
        });
      },
      emergency: function () {
        var that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS, {type: 'urgency_degree'}).then(function (response) {
          var Data = response.json().result;
          that.emergencyList = Data;
        })
      }
    }
  }
</script>

<style lang="less">
  table.w83 {
    width: 83%
  }

  table.mask-table td {
    text-align: left;
  }

  .newTab {
    width: 100px
  }

  .v-red {
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

  .invalid p {
    display: block;
  }

  .untouched p {
    display: none;
  }

  .mask1 {
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

  .mask-align {
    display: inline-block;
    height: 100%;
    width: 1px;
    line-height: 100%;
    vertical-align: middle;
  }

  .notice-panel {
    display: inline-block;
    width: 1045px;
    height: auto;
    background-color: #fff;
    position: relative;
    vertical-align: middle;
    margin-top: 60px;
  }

  .notice-title {
    background-color: #278eed;

  h1 {
    margin: 0;
    padding-left: 10px;
    text-align: left;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    color: white;
  }

  }
  .exit {
    width: 20px;
    height: 20px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA3OEYwMTA4NjVEMzExRTY5QkZDQjk5MEQzREQ4OUYzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA3OEYwMTA5NjVEMzExRTY5QkZDQjk5MEQzREQ4OUYzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDc4RjAxMDY2NUQzMTFFNjlCRkNCOTkwRDNERDg5RjMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDc4RjAxMDc2NUQzMTFFNjlCRkNCOTkwRDNERDg5RjMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz70HGO2AAAAy0lEQVR42mL8//8/A7mAiYECMHw0//jzn0zNn3/+91r48fLLP8iChx/8ztvyBYvu/xjg4P1fltPfXXrxG8LdfvOn7az3V2BcZIBFM0S/1Yz3F5//Xn35h+Oc93fe/sGqDLtmiH7jKe/c53948vEvLjU4Q5ufgxEUJIwMjHhCDKuRF57/Bjr70P1fKy/9cJ77/i7xzobrhHC33vhpP+v91ZdEBNinH/9sZiJ0QsCBe79yN3/G1MyImaveff8vxMlITCJhHM2SpAGAAAMAUQBsmfPRBo0AAAAASUVORK5CYII=);
    position: absolute;
    right: 10px;
    top: 10px;

  &
  :hover {
    cursor: pointer;
  }

  }
  .notice-content {

  i {
    width: 30px;
    height: 30px;
    display: inline-block;
    margin-top: 55px;
  }

  .success {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjAzOTVERjc5NjVEMzExRTZBN0M4RDNCQkRDNTY4RDFGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjAzOTVERjdBNjVEMzExRTZBN0M4RDNCQkRDNTY4RDFGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDM5NURGNzc2NUQzMTFFNkE3QzhEM0JCREM1NjhEMUYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDM5NURGNzg2NUQzMTFFNkE3QzhEM0JCREM1NjhEMUYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5n9uL4AAADHElEQVR42syXb2hNYRzHnx3a2lWGbUjc0MKa4sWkUHixDWkvVhbasub/nwmRRF7ZG2q4QjSsMNqL5Q0ZW5Pkjb0Tq1kbhtQ27pW2TOL7u32f9XQ6555z7z0v/OrT+fc8v+9znvN7fr/nZIRflisflglKQQlYBuaDqXz2HfSBV+ApeALGvBxmeAhPAYfBfpCr/NkwuAzOg2gqwpvBJZDH6x/gIXgBPoKvvD8ThMEqsAHk8P4QqAP3nZxPdLg3gSPezWsRqQe3wWiCN70CskE1OMnB3ANrOGN/zMaWg2iLISrOisB1D1Fto2xbxMEr+mqhb1fhCKjg6LZzpD9V8iZ9DoBa+qqgb0fhrWAfz3eAmyp9u0Vfir632IUlei8Y09ukgrMm+hS7SK1x4SMgn4F0XAVvx+g7n1pxYUkOe9mgPsVv6mQ76U80RsAZ3hetTIsZKY8ReScg0YOM7hNc52J3qSFapVpYMd2NBCC6zYiX0+ALz8V3O8/jwsW8aAtAVJbNDcmIoMGYXm2PeSwW4QJevE1TtISZShJFIzjq0KabxwLLyK3DtkbLwTkjVyeyFeABA1Wy1B7w16HdEI85VgJnhzjqdi4DN1sKHoEQj9X2vOxkIhzjub3s6cBYAjrBDIf+C1h/Zdaeg00etVjPXkyEe3lRaGv0DqwFn5j0O42loVh9OjgbXaDcx6pYxGOvxU6K9dRuPWA1s44M7BmYBaZTdDZ4wzoc8xELWqPL4lSJbWQ9tVsfa+p7sJBv3sHVIM/WgUEfotnUiOcMLSzRNhlUuXTqp3g/v+ti8BmU8VP4sSpqiFabxWC4yoenGJ1O9oHT3sM3XG/Eh5eF6FtRa0wvpwY6C3PtutkA33YueJ1EcjlL34PUGi+LUa5bXbBrEjj5nWROr+FORueGqH0H0mwU7EbuENO1OvrSG4xmtz2XlLNW5tsIE/6kFARD7Buhr1b6dt3sSaqrBNd4XcvisQtk+RDM4gagm30VfVXa02gyG/qYsaEfMOqsJJQ5YCXXqa8N/X/5C2P/aSszftrmgWl89o2Jxfxp++Xl8J8AAwBIQ7xEcy0ZPAAAAABJRU5ErkJggg==);
    background-repeat: no-repeat;
    background-position: center;
  }

  .warning {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVFNzE3MkU1NjVEMzExRTZBRUJFQ0ZERkU1OUU2MkEwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVFNzE3MkU2NjVEMzExRTZBRUJFQ0ZERkU1OUU2MkEwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUU3MTcyRTM2NUQzMTFFNkFFQkVDRkRGRTU5RTYyQTAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUU3MTcyRTQ2NUQzMTFFNkFFQkVDRkRGRTU5RTYyQTAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7zdoRoAAAC8UlEQVR42qyX22sTQRjFd6NWI0qtbfLQR8ELxAsUpBSN2oKp9rGK9lV8qJfai68+9MVnL/XSFv8BLdJHpRESqYKIKKgEIgX/gKwlloDGSonngzMyXXZ2ZzUfnO7M7sz5dXZmMt+6vy4ccSxiE9QPnYQOQ7ugHXz2HfoKvYNeQAvQ7yhDNwIs5uPQFSjl2MU36AF0h/9UYCRCDIagMjRJ6GeW+6BOaDPVyXuTbNPBcpke1iPeAN2DLrP+CrrBq01koZvQMdanoWvQWtiIBTpHaB26BB2PAVX/6An2rdNrjt5GsMzLIOdGXt8s1HDiR4N9xaNKz7sm8HloBPoJnYLeOP8f4nEa+gFdJWMdWFbvFMvXobdO80K8JlieUttQgWXLpDk/swGdt3O1RoW02RZw/xG0SMa4Ardwnzpcvf45FaNn0MuIvZxim+cB8Aa9HbJaBJxjp0+G1ZuE2qAMVDTAU3yWYdtkQJvX0Ee2zSmwxLxhJB5XZ8kA16EltvUMXorRL+AuVhZDXmMlAJ42QCshPorRtRF/9rBSjlg4Cl4gqMD7CtobMlIVX3jdLeBWVpYtVq0f7sSA6ozWxD/+KjV89dgh4BWW2y3apzja/RxpieWC5bGpGCsCXmJlX0xoH19xHPheXpcE/F47zsKgRQ3ay/n2fPBiBFwdlR8EnGflTATUtHp1eCYCPshrXoFltR2EjgY0rvNoC1u9OrzKPv4Q70NsuyDgVeg+H0rm4Po61KABHu5hW8ZjmwH2WZfp0FvioTATWgJQYbYxHGBaYxJnk+jVAu5fpLdH1t9jUTKOUZZvQd1NPI+7texjVGWe+g/IE6alSR6DPU2A9tBrK70fm3KuMZ4gO7kvhwPm3CZc9i3Qa57exmRPUtBzTEm3QDM83LMxoFluqRl6TNNzzfZLYohzk2ZdkvWnTBbK2mLr4K+eAM9CB7QDZUx/vXE/YSaYIbZbjniZ83k77BPGjfnRltM+2tr4rKp9tOWp1SjDPwIMAC0wyJFgg73pAAAAAElFTkSuQmCC);
    background-repeat: no-repeat;
    background-position: center;
  }

  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding:20px;
  .content {
    vertical-align: middle;
    font-size: 16px;
    margin: 10px;
    display: flex;
    align-items: center;
  }

  }
  .notice-select {
    position: absolute;
    width: 100%;
    bottom: 20px;

  button {
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

  &
  :hover {
    border: 1px solid #2380d5;
    background-color: #278eed;
    color: white;
    cursor: pointer;
  }

  }
  }
  }
</style>
