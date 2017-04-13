<!-- 人事管理 --- 人事管理 --- 外勤 -->
<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{businessTitle}}</h2>
        <validator name="validation">
        <Tip-border tip="基本信息">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">编号：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly v-model="post.bussinessData.serialNo">
            </div>
            <label for="" class="col-sm-2 control-label field-require">紧急程度：</label>
            <div class="col-sm-4" v-validate-class>
              <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.bussinessData.urgencyDegreeId"
                              v-validate:urgency-degree="{required: true}"></Tool-Selection>
              <span class="fc-red" v-show="($validation.urgencyDegree.touched || validating) && $validation.urgencyDegree.required">必填项</span>
            </div>
          </div>

        </Tip-border>
        <Tip-border tip="外勤行程计划">
          <div class="clearfix col-sm-12">
            <button type="button" class="btn btn-primary g-fr" @click="add">添加</button>
          </div>
          <div class="clearfix">
            <div class="col-sm-12 g-fr">
              <table class=" table table-striped table-bordered table-layout">
                <tr>
                  <th><label>目的地</label></th>
                  <th><label>开始时间</label></th>
                  <th><label>结束日期</label></th>
                  <th width="10%" class="g-tc"><label>小时</label></th>
                  <th class="g-tc"><label>事由</label></th>
                  <th width="13%" class="g-tc"><label>操作</label></th>
                </tr>
                <tr v-for="field in numList">
                  <td v-validate-class>
                    <input type="text" class="form-control" :field="field.nation + $index"maxlength="20" v-model="field.destination" v-validate="field.validate5" placeholder="20字以内">
                    <span class="fc-red" style="right:12px" v-show="($validation[field.nation + $index].touched || validating) && $validation[field.nation + $index].required">请填写</span>
                  </td>
                  <td class="g-pr" v-validate-class>
                    <input type="text" class="form-control input-calendar" :field="field.star + $index" v-model="field.outsideStartDate" @click.stop="field.show = true" v-validate="field.validate" readonly="true">
                    <span class="fc-red" style="right:12px" v-show="($validation[field.star + $index].touched || validating) && $validation[field.star + $index].required">请选择日期</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.star + $index].touched || validating) && $validation[field.star + $index].staretime">开始时间过大</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.star + $index].touched || validating) && $validation[field.star + $index].timeformats">时间错误</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.star + $index].touched || validating) && $validation[field.star + $index].Dateformat">时间错误</span>
                    <Public-Calendar
                      :value.sync="field.outsideStartDate"
                      :show.sync="field.show"
                      :type="calendar.typeone"
                      :end.sync="field.ends"
                      :x="calendar.x"
                      :y="calendar.y"
                      :sep.sync="calendar.sep"></Public-Calendar>
                  </td>
                  <td class="g-pr" v-validate-class>
                    <input type="text" class="form-control input-calendar" :field="field.end + $index" v-model="field.outsideEndDate" @click.stop="field.showtwo = true"  v-validate="field.validate2" readonly="true">
                    <span class="fc-red" style="right:12px" v-show="($validation[field.end + $index].touched || validating) && $validation[field.end + $index].required">请选择时间</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.end + $index].touched || validating) && $validation[field.end + $index].endstime">结束时间过小</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.end + $index].touched || validating) && $validation[field.end + $index].timeformat">时间错误</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.end + $index].touched || validating) && $validation[field.end + $index].timeformats">时间错误</span>
                    <Public-Calendar
                      :value.sync="field.outsideEndDate"
                      :show.sync="field.showtwo"
                      :type="calendar.typeone"
                      :begin.sync="field.begin"
                      :x="calendar.x"
                      :y="calendar.y"
                      :sep.sync="calendar.sep"></Public-Calendar>
                  </td>
                  <td v-validate-class>
                    <input type="text" class="form-control" :field="field.time + $index" maxlength="5" v-model="field.outsideTime" v-validate="field.validate3">
                    <span class="fc-red" style="right:12px" v-show="($validation[field.time + $index].touched || validating) && $validation[field.time + $index].required">必填</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.time + $index].touched || validating) && $validation[field.time + $index].pattern">错误</span>
                    <span class="fc-red" style="right:12px" v-show="($validation[field.time + $index].touched || validating) && $validation[field.time + $index].total"></span>
                  </td>
                  <td v-validate-class>
                    <input type="text" class="form-control" :field="field.reason + $index"maxlength="100" v-model="field.outsideReason" v-validate="field.validate4" placeholder="100字以内">
                    <span class="fc-red" style="right:12px" v-show="($validation[field.reason + $index].touched || validating) && $validation[field.reason + $index].required">请填写</span>
                  </td>
                  <td class="g-tc">
                    <button type="button" class="btn btn-primary" @click="dir($index)" v-if="$index != 0">删除</button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">外勤合计小时：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly v-model="post.bussinessData.outsideTime">
            </div>
          </div>
          <div class="form-group clearfix m-check-list">
            <label class="col-sm-2"></label>
            <label class="col-sm-8 dateNotice">{{leaveNotice}}</label>
          </div>
        </Tip-border>
        <Tip-border tip="附件上传">
          <div class="g-padding20">
            <div class="form-group clearfix">
              <label class="col-sm-2 control-label">上传附件：</label>
              <div class="col-sm-10">
                <Tool-Upload :files.sync="fileList" :resource-id="post.bussinessData.id" :resource-type="'13'"></Tool-Upload>
                <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
              </div>
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
<style>
    .field-interval:before{
      content: '';
      position: absolute;
      width: 10px;
      margin-left: -20px;
      top: 50%;
      border-bottom: 1px solid #555;
    }
    .totalHourRequire{
      content: '*';
      color: red;
      position: absolute;
      left: -11px;
      top: 10px;
    }
    .totalHourBefore:before{
      content: '共';
      font-size: 14px;
      position: absolute;
      margin-left: -20px;
      top: 25%;
    }
    .totalHourAfter:before{
      content: '小时';
      position: absolute;
      font-size: 14px;
      margin-left: -20px;
      top: 50%;
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
        props: ['taskId', 'businessKey', 'humanTaskId','taskformKey','hr','deptheader','kqgly','zc','zjl','edit'],
        data: function () {
            return {
              sDate:null,
              eDate:null,
              cnName:'',
              officeId:'',
              officeName: '',
              fileList: [],
              isShowAddMore:false,
              leaveNotice:'说明：外勤总共小时数，1天按7.5小时计算。',
              emergencyList:[],
              departmentCode:'',
              urgencyDegreeDispay:''
              ,
              type: [
                  type.URGENCY_DEGREE,
                  type.HOLIDAY_TYPE
              ],
              post: {
                bussinessData :{
                  id: '', // 请假申请ID
                  serialNo: '', // 请假申请业务编号
                  title:'',
                  urgencyDegreeId: '', // 紧急程度
                  outsideTime:'',
                  employeeOutsideDetail:[],
                }
              },
              numList:[],
              outsideTime:'',
              outsideReason:'',
              userId:'',


              process: {
                  userId: '',
                  typeCode: "QJLX",
                  businessKey: '',
                  businessType: 'WQSQ',
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
                x: 13,
                y: 40,
                sep: '-',
                typeone:'datetime',
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
            let str = (vm.officeName?vm.officeName+'-':'') + (vm.cnName?vm.cnName+'的':'') + '外勤申请单';
            vm.process.businessTitle = str;
            vm.post.bussinessData.title = str;
            return str;
          }
        },
        created: function () {
          this.process.userId = sessionStorage.getItem("loginName");
          this.userId = sessionStorage.getItem("userId");
          this.cnName = sessionStorage.getItem("userName");
          this.emergency();
        },
        asyncData: function (resolve, reject) {
            let that = this;
            //判断id 进入的路径
            let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);
            if(businessKey){
                //包含id则更新页面
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEOUTSIDE, {bussinessData:{id:businessKey}}).then(function (response) {
                    let result = response.json().result;
                    resolve({
                        'post.bussinessData.id': result.id,
                        'post.bussinessData.serialNo': result.serialNo,
                        'post.bussinessData.title': result.title,
                        'post.bussinessData.urgencyDegreeId': result.urgencyDegreeId,
                        'post.bussinessData.outsideTime': result.outsideTime,
                        'post.bussinessData.employeeOutsideDetail': result.employeeOutsideDetail,

                        'officeId': result.officeId,
                        'officeName':result.officeName,
                    })
                    that.process.businessKey = that.post.bussinessData.id;
                    that.process.businessCode = that.post.bussinessData.serialNo;
                    that.offices(that.officeId);
                    for(let i = 0;i<that.post.bussinessData.employeeOutsideDetail.length;i++){
                      that.numList.push({
                        star:'outsideStartDate',
                        end:'outsideEndDate',
                        time:'outsideTime',
                        reason:'outsideReason',
                        nation:'destination',
                        show:false,
                        showtwo: false,
                        outsideStartDate : that.post.bussinessData.employeeOutsideDetail[i].outsideStartDate,
                        outsideEndDate :that.post.bussinessData.employeeOutsideDetail[i].outsideEndDate,
                        outsideTime :that.post.bussinessData.employeeOutsideDetail[i].outsideTime,
                        outsideReason :that.post.bussinessData.employeeOutsideDetail[i].outsideReason,
                        destination :that.post.bussinessData.employeeOutsideDetail[i].destination,
                        begin:'',
                        ends:'',
                        validate: {required: true,Dateformat:true,timeformats:true,staretime:true},
                        validate2: {required: true ,timeformat:true,timeformats:true,endstime:true},
                        validate3: {required: true,pattern: '/^[0-9]{1}\\d*([.][0-9])?$/',total:true},
                        validate4: {required: true},
                        validate5: {required: true},
                      });
                    }
                })
            }else{
                this.loadData();
                this.numList.push(
                  {
                    star:'outsideStartDate',
                    end:'outsideEndDate',
                    time:'outsideTime',
                    reason:'outsideReason',
                    nation:'destination',
                    show:false,
                    showtwo: false,
                    outsideStartDate : '',
                    outsideEndDate : '',
                    outsideTime : '',
                    outsideReason : '',
                    destination:'',
                    begin:'',
                    ends:'',
                    validate: {required: true,Dateformat:true,timeformats:true,staretime:true},
                    validate2: {required: true ,timeformat:true,timeformats:true,endstime:true},
                    validate3: {required: true,pattern: '/^[0-9]{1}\\d*([.][0-9])?$/',total:true},
                    validate4: {required: true},
                    validate5: {required: true},
                  }
                )
            }
        },
        watch: {
          'post.bussinessData.urgencyDegreeId': function (val){
            let urg = this.emergencyList.find((item) => item.value === val);
            if(!urg) return;
            this.urgencyDegreeDispay = urg.label;
          },
        },
        validators: {
           Dateformat(val){
            let vm = this.vm;
            let bgtm = this.vm.numList.find((item) => item.outsideStartDate === val);
            let startDate = bgtm.outsideStartDate;
            if(!startDate )return true;
            bgtm.begin = startDate;
            return true;
          },
          timeformat(val){
            let vm = this.vm;
            let bgtm = this.vm.numList.find((item) => item.outsideEndDate === val);
            let endDate = bgtm.outsideEndDate;
            if(!endDate )return true;
            bgtm.ends = endDate;
            return true;
          },

          timeformats(val){
            if(!val)return true
            let star  = val.substring(11,16)
            return  /^([01]\d|2[0123]):([0-5]\d|59)$/.test(star)
          },
          staretime(val){
            //验证数组当中加班日期的前后对比大小（选择加班开始时间验证）
            let vm = this.vm;
            let bgtm = this.vm.numList.find((item) => item.outsideStartDate === val);
            if (!bgtm) return;
            let endtime = bgtm.outsideEndDate;
            let starsf  = val.replace(/[\s\:\-]+/g,'')
            let endsf = endtime.replace(/[\s\:\-]+/g,'')
            if(!endsf || !starsf){
              return true;
            }
            if(starsf > endsf){
              return false;
            }else{
              return true
            }
          },
          endstime(val){
            let vm = this.vm;
            let endtm = this.vm.numList.find((item) => item.outsideEndDate === val);
            if (!endtm) return;
            let star = endtm.outsideStartDate;
            let starsf = star.replace(/[\s\:\-]+/g,'')
            let endsf = val.replace(/[\s\:\-]+/g,'')
            if(!starsf || !endsf){
              return true;
            }
            if(starsf > endsf){
              return false;
            }else{
              return true
            }
          },
          total: function (val) {
            let vm = this.vm;
            this.vm.post.bussinessData.outsideTime = 0;
            for(let i=0;i<this.vm.numList.length;i++){
              if(this.vm.numList[i].outsideTime){
                this.vm.post.bussinessData.outsideTime += parseFloat(this.vm.numList[i].outsideTime)
              }
            }
            return true
          }
        },
        methods: {
          loadData: function () {
            var that = this;
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERWQSQ).then((response) => {
              let Data = response.json().result;
              that.post.bussinessData.id = Data.uuId;
              that.post.bussinessData.serialNo = Data.serialNumber;
              that.officeId = Data.officeId;
              that.officeName = Data.officeName;
              that.process.businessCode = Data.serialNumber;
              that.process.businessKey = Data.uuId;
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

          add:function () {
            this.numList.push({
              star:'outsideStartDate',
              end:'outsideEndDate',
              time:'outsideTime',
              reason:'outsideReason',
              nation:'destination',
              show:false,
              showtwo: false,
              outsideStartDate : '',
              outsideEndDate : '',
              outsideTime : '',
              outsideReason : '',
              destination:'',
              begin:'',
              ends:'',
              validate: {required: true,Dateformat:true,timeformats:true,staretime:true},
              validate2: {required: true ,timeformat:true,timeformats:true,endstime:true},
              validate3: {required: true,pattern: '/^[0-9]{1}\\d*([.][0-9])?$/',total:true},
              validate4: {required: true},
              validate5: {required: true},
            })
          },
          dir: function (index) {
            this.numList.splice(index, 1);
            this.post.bussinessData.outsideTime = 0;
            for(let i=0;i<this.numList.length;i++){
              if(this.numList[i].outsideTime){
                this.post.bussinessData.outsideTime += parseFloat(this.numList[i].outsideTime)
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
                          urgencyDegreeId: vm.post.bussinessData.urgencyDegreeId,
                          urgencyDegreeDispay: vm.urgencyDegreeDispay,
                      });

                      vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_NEWSTARTPROCESS, vm.process).then((response)=>{
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
          _save: function(callback){
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
                vm.post.bussinessData.employeeOutsideDetail = [];
                for(let i = 0;i< vm.numList.length;i++){
                  vm.post.bussinessData.employeeOutsideDetail.push({
                    outsideStartDate : vm.numList[i].outsideStartDate,
                    outsideEndDate :  vm.numList[i].outsideEndDate,
                    outsideTime : vm.numList[i].outsideTime,
                    outsideReason : vm.numList[i].outsideReason,
                    destination : vm.numList[i].destination,
                  })
                }
                for(let i = 0;i< vm.numList.length;i++){
                  let stare = vm.numList[i].outsideStartDate.substring(0,7)
                  let ends = vm.numList[i].outsideEndDate.substring(0,7)
                  if(stare != ends){
                    vm.options = {
                      title: '温馨提示',
                      message: '同一条请假申请无法跨月!',
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
                }

                vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEEMPLOYEEOUTSIDE, vm.post).then((response)=>{
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
          save: function(){
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
