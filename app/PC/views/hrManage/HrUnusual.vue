<style lang="less">
  .field-interval:before {
    content: '';
    position: absolute;
    width: 10px;
    margin-left: -20px;
    top: 50%;
    border-bottom: 1px solid #555;
  }

  .replace-prompt-enter, .replace-prompt-leave {
    opacity: 0;
    transform: translate3d(0, -10px, 0);
  }

  .replace-container {
    position: absolute;
    width: 240px;
    margin-top: -1px;
    z-index: 9;
    background-color: #fff;
    border: 1px solid #ccc;
    transition: all .3s ease;
    padding-top: 0;

  .replace-search {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 8px 12px;
    background: transparent url(../../images/query-icon.png) no-repeat 98% center;
  }

  .replace-list {
    height: 192px;
    overflow: auto;

  .replace-list-item {
    padding: 8px 10px;
    margin-bottom: 1px;

  &
  :hover {
    background-color: #f5f5f5;
  }

  &
  .active,

  &
  :hover.active {
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
    <Tip-border tip="考勤异常基本信息">
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">考勤异常编号：</label>
        <div class="col-sm-4">
          <input type="text" class="form-control" readonly value="{{post.bussinessData.serialNo}}">
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
                          v-validate:urgency-degree="['required']"></Tool-Selection>
          <span class="fc-red"
                v-show="($validation.urgencyDegree.touched || validating) && $validation.urgencyDegree.required">必填项</span>
        </div>
      </div>
    </Tip-border>
    <Tip-border tip="考勤异常详细信息">
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label field-require">添加考勤异常：</label>
        <div class="col-sm-2" v-validate-class>
          <input type="text" class="form-control input-calendar"
                 v-model="firstTime"
                 @click.stop="calendar.show = true"
                 v-validate:card-available="{required: true}"
                 readonly>
          <Public-Calendar
            :value.sync="firstTime"
            :type="calendar.type"
            :show.sync="calendar.show"
            :x="calendar.x"
            :y="calendar.y"
            :sep.sync="calendar.sep"></Public-Calendar>
          <span class="fc-red"
                v-show="($validation.cardAvailable.touched || validating) && $validation.cardAvailable.required">请选择日期</span>
        </div>

        <div class="col-sm-2" v-validate-class>
          <Tool-Selection :select-type-index="1" :all-select-types="type"
                          v-model="firstSlot"
                          v-validate:work-time-Type="['required']"></Tool-Selection>
          <span class="fc-red"
                v-show="($validation.workTimeType.touched || validating) && $validation.workTimeType.required">必填项</span>
        </div>
        <div class="col-sm-1">
          <button type="button" class="btn btn-primary g-fr" @click="addTime()">添加</button>
        </div>
      </div>
      <div class="form-group clearfix" v-for="field in timeList">
        <label for="" class="col-sm-2 control-label field-require">考勤异常：</label>
        <div class="col-sm-2" v-validate-class>
          <input type="text" class="form-control input-calendar"
                 :field="field.name + $index"
                 v-model="field.newTime"
                 @click.stop="field.show = true"
                 v-validate="field.validate"
                 readonly="true">
          <span class="fc-red"
                v-show="($validation[field.name + $index].touched || validating) && $validation[field.name + $index].required">请选择日期</span>
          <Public-Calendar :value.sync="field.newTime"
                           :show.sync="field.show"
                           :type="calendar.type"
                           :x="calendar.x"
                           :y="calendar.y"
                           :sep.sync="calendar.sep">
          </Public-Calendar>
        </div>
        <div class="col-sm-2" v-validate-class>
          <Tool-Selection :select-type-index="1"
                          :all-select-types="type"
                          v-model="field.slot"
                          v-validate="field.validate"
                          :field="field.wtType + $index">
          </Tool-Selection>
          <span class="fc-red"
                v-show="($validation.[field.wtType + $index].touched || validating) && $validation.[field.wtType + $index].required">必填项</span>
        </div>
        <div class="col-sm-1">
          <button type="button" class="btn btn-primary g-fr" @click="dir($index)">删除</button>
        </div>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">异常考勤次数：</label>
        <div class="col-sm-4" v-validate-class>
          <input type="text" class="form-control" v-model="post.bussinessData.exceptionTimes" maxlength="5" readonly>
        </div>
        <label class="col-sm-2 control-label">本月异常考勤次数：</label>
        <div class="col-sm-4" v-validate-class>
          <input type="text" class="form-control" v-model="exceptionMonthTimes" maxlength="5"
                 readonly>
        </div>
      </div>
      <div class="form-group g-marginB20 clearfix" v-validate-class>
        <label class="col-sm-2 control-label field-require">申请理由：</label>
        <Text :text-value='post.bussinessData.applyReasons' :max-length="500" :class-name="'col-sm-10'">
                            <textarea class="form-control" rows="3" v-model="post.bussinessData.applyReasons"
                                      v-validate:comment="{required: true, maxlength: 500}"></textarea>
          <span class="fc-red"
                v-show="($validation.comment.touched || validating) && $validation.comment.required">必填项</span>
          <span class="fc-red" v-show="($validation.comment.touched || validating) && $validation.comment.maxlength">申请理由过长</span>
        </Text>
      </div>
      <div class="form-group clearfix">
        <label class="col-sm-2 control-label">上传附件：</label>
        <div class="col-sm-10">
          <Tool-Upload :files.sync="fileList" :resource-id="post.bussinessData.id" :resource-type="'0'"></Tool-Upload>
          <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
        </div>
      </div>
    </Tip-border>
    <!--</form>-->
  </validator>
  <div class="form-group g-tc g-marginT20">
    <button v-if="!humanTaskId" type="button" class="btn btn-default g-marginR30" @click="save">保存草稿</button>
    <button type="button" class="btn btn-primary g-marginR30" @click="submit($event)">提交流程</button>
    <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
  </div>

  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
  <Process-Diagram v-if="taskId" :process-instance-id="taskId"></Process-Diagram>
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
    props: ['taskId', 'businessKey', 'humanTaskId', 'taskformKey', 'hr', 'deptheader', 'kqgly', 'edit'],
    data: function () {
      return {
        officeId: '',
        fileList: [],
        emergencyList: [],
        timeTypeList: [],
        tempLeaveData: {},
        departmentCode: '',
        urgencyDegreeDispay: '',
        timeTypeDisplay: '',

        firstTime: '',
        firstSlot: '',
        newTime: '',
        slot: '',
        type: [
          type.URGENCY_DEGREE,
          type.WORK_TIME_TYPE
        ],
        post: {
          bussinessData: {
            officeId: '',
            id: '',
            title: '',
            serialNo: '',
            urgencyDegreeId: '',
            workTimeList: [{
              exceptionTime: '',
              timeTypeValue: ''
            }
            ],
            applyReasons: '',
            exceptionTimes: '1',
          }
        },

        cnName: '',
        officeName: '',
        exceptionMonthTimes: '',
        process: {
          userId: '',
          typeCode: 'QJLX',
          businessType: 'KQYC',
          appId: 'starOffice',
          businessCode: '',
          businessKey: '',
          businessTitle: '',
          bussinessDataJsonStr: {
            urgencyDegreeId: '',
            urgencyDegreeDispay: '',
          }
        },
        timeList: [],
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        lookscreen: {
          isShow: false,
        },
        calendar: {
          type: 'date',
          show: false,
          x: 13,
          y: 40,
          sep: '-'
        }
      }
    },
    computed: {
      businessTitle: function () {
        let vm = this;
        let str = (vm.officeName ? vm.officeName + '-' : '') + (vm.cnName ? vm.cnName + '的' : '') + '考勤异常申请';
        vm.process.businessTitle = str;
        vm.post.bussinessData.title = str;
        return str;
      }
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
      this.process.userId = sessionStorage.getItem("loginName");
      this.cnName = sessionStorage.getItem("userName");
      this.emergency();
      this.timeType();

    },
    asyncData: function (resolve, reject) {
      let that = this;
      //判断id 进入的路径
      let businessKey = ((this.$route.query.businessKey == undefined) ? this.businessKey : this.$route.query.businessKey);

      if (businessKey) {
        //包含id则更新页面
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETWORKTIMEEXCEPTION, {bussinessData: {id: businessKey}}).then(function (response) {
          let result = response.json().result;
          resolve({
            'post.bussinessData.id': result.id,
            'post.bussinessData.serialNo': result.serialNo,
            'post.bussinessData.title': result.title,
            'post.bussinessData.applyReasons': result.applyReasons,
            'post.bussinessData.loginName': result.loginName,
            'post.bussinessData.urgencyDegreeId': result.urgencyDegreeId,

            'post.bussinessData.officeId': result.officeId,
            'post.bussinessData.workTimeList': result.workTimeList,
            'officeName': result.officeName,
            'exceptionMonthTimes': result.exceptionMonthTimes,
          })
          that.process.businessKey = that.post.bussinessData.id;
          that.process.businessCode = that.post.bussinessData.serialNo;

          that.firstTime = that.post.bussinessData.workTimeList[0].exceptionTime
          that.firstSlot = that.post.bussinessData.workTimeList[0].timeTypeValue

          for (let i = 1; i < that.post.bussinessData.workTimeList.length; i++) {
            that.timeList.push({
              newTime: that.post.bussinessData.workTimeList[i].exceptionTime,
              slot: that.post.bussinessData.workTimeList[i].timeTypeValue,
              wtType: 'wtType',
              name: 'fname',
              show: false,
              validate: {required: true}
            })
            that.post.bussinessData.exceptionTimes = 1;
            that.post.bussinessData.exceptionTimes++;
          }
        })
        that.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: businessKey}).then((response) => {
          resolve({
            'fileList': response.json().result
          })
        })
      } else {
        this.loadData();
      }
    },
    watch: {
      'post.bussinessData.urgencyDegreeId': function (val) {
        let urg = this.emergencyList.find((item) => item.value === val);
        if (!urg) return;
        this.urgencyDegreeDispay = urg.label;
      },
      'post.bussinessData.workTimeList[0].timeTypeValue': function (val) {
        let urg = this.timeTypeList.find((item) => item.value === val);
        if (!urg) return;
        this.timeTypeDisplay = urg.label;
      }
    },
    methods: {
      addTime: function () {
        if (this.post.bussinessData.exceptionTimes > 2) {
          let vm = this;
          vm.options = {
            title: '温馨提示',
            message: '无法添加超出的异常考勤时期',
            icon: 'warning',
            isShow: true
          };
          vm.confirm = {
            text: '确定',
            callback: function () {
              vm.options.isShow = false;
            }
          }
          return
        }
        this.timeList.push({
          newTime: '',
          slot: '',
          wtType: '',
          name: '',
          show: false,
          validate: {required: true}
        });
        this.post.bussinessData.exceptionTimes++;
      },
      dir: function (index) {
        this.timeList.splice(index, 1);
        this.post.bussinessData.exceptionTimes--;
      },
      fillIn: function () {
        let vm = this;
        this.post.bussinessData.workTimeList = []
        this.post.bussinessData.workTimeList.push({
          exceptionTime: this.firstTime,
          timeTypeValue: this.firstSlot
        })
        for (let i = 0; i < this.timeList.length; i++) {
          this.post.bussinessData.workTimeList.push({
            exceptionTime: this.timeList[i].newTime,
            timeTypeValue: this.timeList[i].slot
          })
        }
      },
      sameMonth: function (e) {
        let vm = this;
        let obj = this.firstTime.substring(0, 7);
        let objs = this.firstTime.substring(0, 7);
        if (!vm.timeList.length)  return
        let newObj = [];
        for (let i = 0; i < this.timeList.length; i++) {
          newObj.push(this.timeList[i].newTime.substring(0, 7));
        }
        for (let j = 0; j < newObj.length; j++) {
          if (objs != newObj[j]) {
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
            e.preventDefault()
          }
        }



      },
      loadData: function () {
        var that = this;
        this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBERKQYC).then((response) => {
          let Data = response.json().result;
          that.post.bussinessData.id = Data.uuId;
          that.process.businessKey = Data.uuId;
          that.post.bussinessData.serialNo = Data.serialNumber;
          that.process.businessCode = Data.serialNumber;
          that.post.bussinessData.officeId = Data.officeId;
          that.officeName = Data.officeName;
          that.exceptionMonthTimes = Data.dataMap.exceptionMonthTimes;
        });
      },
      office: function (officeId, code, respon) {
        let that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDCODEBYOFFICEID, {bussinessData: {id: officeId}}).then(function (response) {
          var Data = response.json().result;
          that[code] = Data.departmentCode;
          that[respon] = Data.loginName;
        });
      },
      submit: function (e) {
        let vm = this;
        let userId = sessionStorage.getItem("loginName");

        vm._save(e, function () {
          e.target.disabled = true
          vm.lookscreen.isShow = true;
          if (vm.humanTaskId) {
            // 更新流程
            vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
              'humanTaskId': vm.humanTaskId,
              'appros': true,
              'userId': userId
            }).then((response) => {
              let status = response.json().status;
              if (status == 0) {
                vm._submitSuc()
                vm.lookscreen.isShow = false;
                e.target.disabled = false
              } else {
                vm.lookscreen.isShow = false;
                e.target.disabled = false
              }
            })
          } else {
            if (!self.businessKey) {
              vm.process.bussinessDataJsonStr = JSON.stringify({
                urgencyDegreeId: vm.post.bussinessData.urgencyDegreeId,
                urgencyDegreeDispay: vm.urgencyDegreeDispay,
              });
              // 启动流程
              vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_NEWSTARTPROCESS, vm.process).then((response) => {
                let status = response.json().status;
                if (status == 0) {
                  vm._submitSuc()
                  vm.lookscreen.isShow = false;
                  e.target.disabled = false
                } else {
                  vm.lookscreen.isShow = false;
                  e.target.disabled = false
                }
              });
            }
          }
        })
      },
      //表单验证
      _save: function (e, callback) {
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
          } else {
            vm.sameMonth();
            vm.fillIn();
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEWORKTIMEEXCEPTION, vm.post).then((response) => {
              let status = response.json().status;
              if (status == 0) {
                callback();
              }
            })
          }
        })
      },
      //提交
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
      save: function (e) {
        let vm = this;
        vm._save(e, function () {
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
      emergency: function () {
        var that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS, {type: 'urgency_degree'}).then(function (response) {
          var Data = response.json().result;
          that.emergencyList = Data;
        })
      },
      timeType: function () {
        var that = this;
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETDICTS, {type: 'work_time_type'}).then(function (response) {
          var Data = response.json().result;
          that.timeTypeList = Data;
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
