<!-- 流程中心 --- 我的申请 -- 我的入职审批 -->
<template>
    <h3 v-if="!isRecord" class="u-fs20 g-tc">{{cnName}}的入职审批申请</h3>
    <h3 v-if="isRecord" class="u-fs20 g-tc">{{cnName}}的档案</h3>
    <Tip-border tip="基本信息">
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">入职部门：</label>
        <div class="col-sm-4">
            <span class="writing">{{officeName}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">入职职位：</label>
        <div class="col-sm-4">
          <span class="writing">{{positionsDisplay}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">入职时间：</label>
        <div class="col-sm-4">
          <span class="writing">{{entrantTime}}</span>

        </div>

        <label for="" class="col-sm-2 control-label">入职地点：</label>
        <div class="col-sm-4">
          <span class="writing">{{workplaceDisplay}}</span>
        </div>
      </div>
    </Tip-border>

    <Tip-border tip="公司信息">
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">外包单位：</label>
        <div class="col-sm-4">
            <span class="writing">{{agentCompanyDispay}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">合同类型：</label>
        <div class="col-sm-4">
          <span class="writing">{{contractTypeDispay}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">试用期：</label>
        <div class="col-sm-4">
          <span class="writing">{{testTypeDispay}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">招聘渠道：</label>
        <div class="col-sm-4">
          <span class="writing">{{recruitWayDisplay}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">办公地点：</label>
        <div class="col-sm-4">
          <span class="writing">{{workplaceDisplay}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">职级：</label>
        <div class="col-sm-4">
          <span class="writing">{{positionsLevelDisplay}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">合同次数：</label>
        <div class="col-sm-4">
          <span class="writing">{{contractTime}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">合同开始日期：</label>
        <div class="col-sm-4">
          <span class="writing">{{conStartDate}}</span>
        </div>
      </div>
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">合同结束日期：</label>
        <div class="col-sm-4">
          <span class="writing">{{conEndDate}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">状态：</label>
        <div class="col-sm-4">
          <span class="writing">{{baseStatus}}</span>
        </div>
      </div>
    </Tip-border>

    <Tip-border tip="人员资料">
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">合同所属公司：</label>
        <div class="col-sm-4">
            <span class="writing">{{contractCompanyDispay}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">员工号：</label>
        <div class="col-sm-4">
            <span class="writing">{{employeeNo}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">中文名：</label>
        <div class="col-sm-4">
            <span class="writing">{{cnName}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">英文名：</label>
        <div class="col-sm-4">
            <span class="writing">{{enName}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">性别：</label>
        <div class="col-sm-4">
          <span class="writing">{{sexDisplay}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">婚姻状况：</label>
        <div class="col-sm-4">
          <span class="writing">{{maritalStatusDisplay}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">体重：</label>
        <div class="col-sm-4">
            <span class="writing">{{kg}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">视力：</label>
        <div class="col-sm-4">
            <span class="writing">{{eyeDesc}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">身高：</label>
        <div class="col-sm-4">
            <span class="writing">{{height}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">血型：</label>
        <div class="col-sm-4">
            <span class="writing">{{bloodType}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">身份证号：</label>
        <div class="col-sm-4">
            <span class="writing">{{cardNo}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">身份证有效日期：</label>
        <div class="col-sm-4">
          <span class="writing">{{cardStartDate}}~{{cardEndDate}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">移动电话：</label>
        <div class="col-sm-4">
            <span class="writing">{{userMobile}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">固定电话：</label>
        <div class="col-sm-4">
            <span class="writing">{{telephone}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">出生日期：</label>
        <div class="col-sm-4">
            <span class="writing">{{birthday}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">籍贯：</label>
        <div class="col-sm-4">
            <span class="writing">{{familySource}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">个人社保号：</label>
        <div class="col-sm-4">
            <span class="writing">{{socialSecurityNo}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">参保地：</label>
        <div class="col-sm-4">
            <span class="writing">{{socialSecuritySource}}</span>
        </div>
      </div>


      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">户口性质：</label>
        <div class="col-sm-4">
          <span class="writing">{{familyDisplay}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">民族：</label>
        <div class="col-sm-4">
            <span class="writing">{{nation}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">常用邮箱地址：</label>
        <div class="col-sm-4">
          <span class="writing">{{email}}</span>
        </div>
        <label for="" class="col-sm-2 control-label">邮政编码：</label>
        <div class="col-sm-4">
            <span class="writing">{{postCode}}</span>
        </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">银行卡号：</label>
        <div class="col-sm-4">
          <span class="writing">{{bankNo}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">开户行：</label>
        <div class="col-sm-4">
            <span class="writing">{{bankBranch}}</span>
        </div>
      </div>

      <div class="form-group clearfix" v-if="employeeNatureId == '3'">
        <label for="" class="col-sm-2 control-label">毕业时间：</label>
        <div class="col-sm-4">
          <span class="writing">{{testGraduationTime}}</span>
        </div>
      </div>

      <div class="form-group g-marginB20 clearfix">
          <label for="" class="col-sm-2 control-label">户籍地址：</label>
          <div class="col-sm-10">
              <span class="writing">{{cardNoSource}}</span>
          </div>
      </div>

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">通讯地址：</label>
        <div class="col-sm-10">
          <span class="writing">{{address}}</span>
        </div>
      </div>
    </Tip-border>

    <Tip-border tip="以往雇主资料">
      <public-table :config="employeeConfig" :data="{data:employeeLeaveEmployer}"></public-table>
    </Tip-border>

    <Tip-border tip="教育程度">
      <public-table :config="educationConfig" :data="{data:employeeEducational}"></public-table>
      <public-table :config="certificateConfig" :data="{data:employeeCertificate}"></public-table>
    </Tip-border>

    <Tip-border tip="紧急联系人">
      <public-table :config="contactsConfig" :data="{data:employeeContacts}"></public-table>
    </Tip-border>

    <Tip-border tip="家庭成员">
      <public-table :config="familyConfig" :data="{data:employeeFamily}"></public-table>
    </Tip-border>
    <Tip-border tip="附件">
      <div class="form-group clearfix">
        <div v-if="frontFileList && frontFileList.length">
          <label class="col-sm-2 control-label">身份证正面：</label>
          <div class="col-sm-2">
              <a class="upload-down" v-for="item in frontFileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
          </div>
        </div>
        <div v-if="backFileList && backFileList.length">
          <label class="col-sm-2 control-label">身份证背面：</label>
          <div class="col-sm-2">
              <a class="upload-down" v-for="item in backFileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
          </div>
        </div>
        <div v-if="certificateList && certificateList.length">
          <label class="col-sm-2 control-label">学历：</label>
          <div class="col-sm-2">
              <a class="upload-down" v-for="item in certificateList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
          </div>
        </div>
      </div>
    </Tip-border>

    <div class="form-group g-tc g-marginT20" v-if="!info">
        <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess(true)">同意</button>
        <button type="button" class="btn btn-default g-marginR30" @click="approveProcess(false)">驳回</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <div class="form-group g-tc g-marginT20" v-if="this.status == '1' || this.status == '6'">
        <button type="button" class="btn btn-primary g-marginR30" @click="deleteTask" v-if='types == "application"'>删除</button>
        <button type="button" class="btn btn-primary g-marginR30" @click="withdraw">撤回</button>
        <button v-if="this.types=='application'" type="button" class="btn btn-primary g-marginR30" @click="reminders">催办</button>
        <button type="button" class="btn btn-default" @click="cancelProcessDis">取消</button>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
    <Process-Approve v-if="!info" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
    <Process-Diagram v-if="!isRecord" :process-instance-id="taskId"></Process-Diagram>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import PublicTable from '../../components/public/PublicTable.vue';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import PublicModal from '../../components/public/PublicModal'
    export default{
      props: ['taskId', 'businessKey', 'humanTaskId','info','isRecord'],
      components: {
          Crumb,
          TipBorder,
          ProcessApprove,
          ProcessDiagram,
          PublicTable,
          PublicModal
      },
      data (){
        return {
            comments:false,
            comment:'',
          isShow: false,
        types:'',
        status:'',
        options: undefined,
        confirm: undefined,
        cancel: undefined,
        close: undefined,
        apiUrl:'',
          officeName: '', // 申请部门
          positionsDisplay: '', // 职位
          entrantTime: '', // 入职时间
          workplaceDisplay: '', // 入职地点
          id: '', // 来自业务编码接口返回结果
          baseId: '', // 来自查询入职员工信息接口返回结果
          employeeNo: '', // 员工编号
          cnName: '',// 中文名字
          enName: '',// 英文名字
          sexId: '',// 性别id
          sexDisplay: '',// 性别显示
          maritalStatusId: '',// 婚姻状况
          maritalStatusDisplay: '',// 婚姻状况显示
          eyeDesc: '',
          kg: '',// 体重
          cardNo: '',// 身份证号码
          cardStartDate: '',// 身份证开始时间
          cardEndDate: '',// 身份证结束时间
          familyId: '',// 户口性质
          familyDisplay: '',// 户口性质显示
          userMobile: '',//  手机号码
          bloodType: '',//血型
          birthday: '',//出生日期
          familySource: '',//籍贯
          height: '',//身高
          nation: '',//民族
          email: '',//邮箱
          telephone: '',//家庭固定电话
          socialSecurityNo: '',//个人社保号
          socialSecuritySource: '',//参保地
          cardNoSource: '',//身份证地址
          address: '',//通讯地址
          serialNo: '',//业务编码
          urgencyDegreeId: '',//紧急程度id
          postCode: '', // 邮政编码
          bankNo: '', // 邮政编码
          bankBranch: '', // 邮政编码

          contractType: '',  // 合同类型
          employeeNo:'',  //员工号
          agentCompanyDispay: '', //外包单位
          contractTypeDispay: '', //合同类型
          testTypeDispay: '', //试用期
          recruitWayDisplay: '', //招聘渠道
          positionsLevelDisplay: '', //职级
          contractTime: '', //合同次数
          conStartDate: '', //合同开始日期
          conEndDate: '', //合同结束日期
          baseStatus: '', //状态

          employeeEducational: [], // 教育信息
          employeeCertificate: [],// 证书信息
          employeeLeaveEmployer: [],//以往雇主

          employeeContacts: [],// 紧急联系人信息
          employeeFamily: [],// 家庭联系人
          frontFileList: [],
          backFileList: [],
          certificateList: [],
          educationConfig: {
            className: 'table table-striped table-hover table-bordered',
            pagination: false,
            sequence: false,
            fields: [
                {
                    name: 'school',
                    text: '学校'
                },
                {
                    name: 'major',
                    text: '专业'
                },
                {
                    name: 'stayTime',
                    text: '在校期间',
                    formatter: function(value,obj){
                      let starTime = obj.startTime?obj.startTime+'~':'';
                      let endTime = obj.endTime?obj.endTime:'';
                      return starTime+endTime;
                    }
                },
                {
                    name: 'educationDisplay',
                    text: '学历'
                }
            ]
          },
          certificateConfig: {
            className: 'table table-striped table-hover table-bordered',
            pagination: false,
            sequence: false,
            fields: [
                {
                    name: 'certificate',
                    text: '专业证书'
                },
                {
                    name: 'getTime',
                    text: '获取年份'
                }
            ]
          },
          employeeConfig: {
            className: 'table table-striped table-hover table-bordered',
            pagination: false,
            sequence: false,
            fields: [
                {
                    name: 'company',
                    text: '公司名称'
                },
                {
                    name: 'positions',
                    text: '职位'
                },
                {
                    name: 'superior',
                    text: '直属上司'
                },
                {
                    name: 'salary',
                    text: '薪资'
                },
                {
                    name: 'mobile',
                    text: '公司电话'
                },
                {
                    name: 'reason',
                    text: '离职原因'
                }
            ]
          },
          contactsConfig: {
            className: 'table table-striped table-hover table-bordered',
            pagination: false,
            sequence: false,
            fields: [
                {
                    name: 'contactsName',
                    text: '姓名'
                },
                {
                    name: 'mobile',
                    text: '联系电话'
                },
                {
                    name: 'profession',
                    text: '职业'
                },
                {
                    name: 'contactsYears',
                    text: '认识年限'
                },
                {
                    name: 'contactsAddress',
                    text: '地址'
                }
            ]
          },
          familyConfig: {
            className: 'table table-striped table-hover table-bordered',
            pagination: false,
            sequence: false,
            fields: [
                {
                    name: 'name',
                    text: '姓名'
                },
                {
                    name: 'mobile',
                    text: '联系电话'
                },
                {
                    name: 'relation',
                    text: '关系'
                },
                {
                    name: 'address',
                    text: '地址'
                }
            ]
          }
        }
      },
      asyncData: function (resolve, reject) {
        //  /a/employee/employeeEntry/getEmployeeEntry
        let url = content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEENTRY;
        if (this.isRecord) url = content.CONTENT_ROOT + interfaces.INTERFACE_GETBASEINFOBYID;
        this.$http.post(url, {id: this.businessKey}).then((response) => {
          let result = response.json().result;
          resolve({
            officeName: result.officeName, // 申请部门
            positionsDisplay: result.positionsDisplay, // 职位
            entrantTime: result.entrantTime, // 入职时间
            workplaceDisplay: result.workplaceDisplay, // 入职地点
            id: result.id, // 来自业务编码接口返回结果
            baseId: result.baseId, // 来自查询入职员工信息接口返回结果
            contractCompanyDispay: result.contractCompanyDispay,// 员工合同所属公司
            employeeNo: result.employeeNo,
            employeeNatureId: result.employeeNatureId,// 员工性质
            testGraduationTime: result.testGraduationTime,// 员工毕业时间
            cnName: result.cnName,// 中文名字
            enName: result.enName,// 英文名字
            sexId: result.sexId,// 性别id
            sexDisplay: result.sexDispay,// 性别显示
            maritalStatusId: result.maritalStatusId,// 婚姻状况
            maritalStatusDisplay: result.maritalStatusDispay,// 婚姻状况显示
            eyeDesc: result.eyeDesc, //视力
            kg: result.kg,// 体重
            cardNo: result.cardNo,// 身份证号码
            cardStartDate: result.cardStartDate,// 身份证开始时间
            cardEndDate: result.cardEndDate,// 身份证结束时间
            familyId: result.familyId,// 户口性质
            familyDisplay: result.familyDispay,// 户口性质显示
            userMobile: result.mobile,//  手机号码
            bloodType: result.bloodType,//血型
            birthday: result.birthday,//出生日期
            familySource: result.familySource,//籍贯
            height: result.height,//身高
            nation: result.nationDisplay,//民族
            email: result.email,//邮箱
            telephone: result.telephone,//家庭固定电话
            socialSecurityNo: result.socialSecurityNo,//个人社保号
            socialSecuritySource: result.socialSecuritySource,//参保地
            cardNoSource: result.cardNoSource,//身份证地址
            address: result.address,//通讯地址
            serialNo: '',//业务编码
            urgencyDegreeId: result.urgencyDegreeId,//紧急程度id
            postCode: result.postCode, // 邮政编码
            bankNo: result.bankNo, // 银行卡号
            bankBranch: result.bankBranch, // 开户行
            employeeNo: result.employeeNo,  //员工号
            agentCompanyDispay: result.agentCompanyDispay, //外包单位
            contractTypeDispay: result.contractTypeDispay, //合同类型
            testTypeDispay: result.testTypeDispay, //试用期
            recruitWayDisplay: result.recruitWayDisplay, //招聘渠道
            positionsLevelDisplay: result.positionsLevelDisplay, //职级
            contractTime: result.contractTime, //合同次数
            conStartDate: result.conStartDate, //合同开始日期
            conEndDate: result.conEndDate, //合同结束日期
            baseStatus: result.baseStatus, //状态

            employeeEducational: (result.employeeEducational?result.employeeEducational:[]), // 教育信息
            employeeCertificate: (result.employeeCertificate?result.employeeCertificate:[]),// 证书信息
            employeeLeaveEmployer: (result.employeeLeaveEmployer?result.employeeLeaveEmployer:[]),//以往雇主

            employeeContacts: (result.employeeContacts?result.employeeContacts:[]),// 紧急联系人信息
            employeeFamily: (result.employeeFamily?result.employeeFamily:[])// 家庭联系人
          });
        });
        this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
          let frontFileList = [];
          let backFileList = [];
          let certificateList = [];
          let list = response.json().result;
          for(let i = 0 ; i < list.length ; i++){
            if(list[i].resourceType == '2') frontFileList.push(list[i]);
            if(list[i].resourceType == '3') backFileList.push(list[i]);
            if(list[i].resourceType == '4') certificateList.push(list[i]);
          }
          resolve({
            'frontFileList': frontFileList,
            'backFileList': backFileList,
            'certificateList': certificateList
          })
        });

      },
        created: function(){
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.types = hash[5].match(/\w+/)[0];
            //判断打开是否为档案页面
            if(this.types != 'arc' && this.types != 'todo')this.processStatus();

        },
      methods: {
        approveProcess: function (comments) {
          this.comments = comments;
            if(comments){
                this.comment = '同意'
            }else{
                this.comment = '不同意'
            }
          this.isShow = true
        },
        cancelProcessDis: function () {
        this.$router.go('/process/dispose')
        },
        cancelProcess: function () {
          this.$router.go('/process/todo')
        },
            //删除流程
            deleteTask: function(){
                let vm = this;
                vm.options = {
                  title: '温馨提示',
                  message: '确认删除吗？删除后数据不可恢复哦',
                  icon: 'warning',
                  isShow: true
                };
                vm.confirm = {
                  text: '确定',
                  callback: function () {
                vm.apiUrl = interfaces.INTERFACE_DELETEPROCESS
                vm.userId = sessionStorage.getItem("loginName");
                vm.$http.post(content.STAROFFICE_ACT + vm.apiUrl,{humanTaskId:vm.humanTaskId,userId:vm.userId}).then(function (response) {
                    let Data = response.json().status;
                    if(Data == '0'){
                        vm.options = {
                            title: '温馨提示',
                            message: '删除成功！',
                            icon: 'success',
                            isShow: true
                        };
                        vm.confirm = {
                            text: '确定',
                            callback: function () {
                                if(vm.types == 'dispose'){
                                    vm.$router.go('/process/dispose');
                                }else{
                                    vm.$router.go('/process/application');
                                }
                                vm.options.isShow = false;
                            }
                        };
                    }
                })
                    vm.options.isShow = false;
                  }
                };
                vm.close = {
                  callback: function () {
                    vm.options.isShow = false;
                  }
                };
                vm.cancel = {
                  text: '取消',
                  callback: function () {
                    vm.options.isShow = false;
                  }
                }
            },
          //我的申请撤回  我的经办撤回
          withdraw: function(){
              let that = this;
              if(!this.types)return false;
              if(this.types == 'dispose'){
                  this.apiUrl = interfaces.INTERFACE_WITHDRAWTASK
              }else{
                  this.apiUrl = interfaces.INTERFACE_ABORTAPPLYPROCESS
              }
              this.userId = sessionStorage.getItem("loginName");
              this.$http.post(content.STAROFFICE_ACT + this.apiUrl,{humanTaskId:this.humanTaskId,userId:this.userId}).then(function (response) {
                  let Data = response.json().status;
                  if(Data == '0'){
                      that.options = {
                          title: '温馨提示',
                          message: '撤回成功！',
                          icon: 'success',
                          isShow: true
                      };
                      that.confirm = {
                          text: '确定',
                          callback: function () {
                              if(that.types == 'dispose'){
                                  that.$router.go('/process/dispose');
                              }else{
                                  that.$router.go('/process/application');
                              }
                              that.options.isShow = false;
                          }
                      };
                  }
              })
          },
            //催办
          reminders: function () {
              let that = this;
              if(!this.types)return false;
              this.userId = sessionStorage.getItem("loginName");
              this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_REMINDERTASK,{humanTaskId:this.humanTaskId,userId:this.userId}).then(function (response) {
                  let Data = response.json().status;
                  if(Data == '0'){
                      that.options = {
                          title: '温馨提示',
                          message: '催办成功！',
                          icon: 'success',
                          isShow: true
                      };
                      that.confirm = {
                          text: '确定',
                          callback: function () {
                              that.$router.go('/process/application');
                              that.options.isShow = false;
                          }
                      };
                  }
              })
          },
          //判断流程状态
          processStatus: function(){
              let that = this;
              this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETPROCESSSTATUS,{humanTaskId:this.humanTaskId}).then(function (response) {
                  let Data = response.json().result;
                  that.status = Data.status;
              })
          }
      }
    }
</script>
