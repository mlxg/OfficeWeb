<!-- 人力资源 --- 员工档案 --- 三级菜单 -->
<template>
    <crumb t-name="我的档案"></crumb>
    <h3 class="u-fs20 g-tc">我的档案</h3>
    <Tip-border tip="基本信息">
      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">所属部门：</label>
        <div class="col-sm-4">
            <span class="writing">{{officeName}}</span>
        </div>

        <label for="" class="col-sm-2 control-label">我的职位：</label>
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

      <div class="form-group clearfix">
        <label for="" class="col-sm-2 control-label">合同所属公司：</label>
        <div class="col-sm-4">
            <span class="writing">{{contractCompanyDispay}}</span>
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
      <public-table :config="contactsConfig" :data="{data:employeeFamily}"></public-table>
    </Tip-border>

    <Tip-border tip="家庭成员">
      <public-table :config="familyConfig" :data="{data:employeeFamily}"></public-table>
    </Tip-border>
    <Tip-border tip="附件">
      <div class="form-group clearfix" v-if="fileList && fileList.length">
        <label class="col-sm-2 control-label">附件下载：</label>
        <div class="col-sm-4">
            <a class="upload-down" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
        </div>
      </div>
    </Tip-border>

</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import PublicTable from '../../components/public/PublicTable.vue';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default {
        data(){
          return {
            isShow: false,
            officeName: '', // 申请部门
            positionsDisplay: '', // 职位
            entrantTime: '', // 入职时间
            workplaceDisplay: '', // 入职地点
            id: '', // 来自业务编码接口返回结果
            baseId: '', // 来自查询入职员工信息接口返回结果
            cnName: '',// 中文名字
            enName: '',// 英文名字
            sexId: '',// 性别id
            sexDisplay: '',// 性别显示
            maritalStatusId: '',// 婚姻状况
            maritalStatusDisplay: '',// 婚姻状况显示
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
            bankNo: '', // 银行卡号 （2016-10-13 17:50:19新增）
            bankBranch: '', // 银行卡开户行 （2016-10-13 17:50:27新增）
            testGraduationTime: '', // 实习生毕业时间  （2016-10-13 17:50:32新增）
            contractCompanyDispay: '', // 合同归属公司

            employeeEducational: [], // 教育信息
            employeeCertificate: [],// 证书信息
            employeeLeaveEmployer: [],//以往雇主

            employeeContacts: [],// 紧急联系人信息
            employeeFamily: [],// 家庭联系人
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
                      text: '在校时间',
                      formatter: function(value,obj){
                        let starTime = obj.starTime?obj.starTime+'~':'';
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
                      name: 'profession',
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
        components: {
            Crumb,
            TipBorder,
            PublicTable
        },
        asyncData: function (resolve, reject) {
          this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETMYARCHIVES, {}).then((response) => {
            let result = response.json().result;
            resolve({
              officeName: result.officeName, // 申请部门
              positionsDisplay: result.positionsDisplay, // 职位
              entrantTime: result.entrantTime, // 入职时间
              workplaceDisplay: result.workplaceDisplay, // 入职地点
              id: result.id, // 来自业务编码接口返回结果
              baseId: result.baseId, // 来自查询入职员工信息接口返回结果
              contractCompanyDispay: result.contractCompanyDispay,// 员工合同所属公司
              employeeNatureId: result.employeeNatureId,// 员工性质
              testGraduationTime: result.testGraduationTime,// 员工毕业时间
              cnName: result.cnName,// 中文名字
              enName: result.enName,// 英文名字
              sexId: result.sexId,// 性别id
              sexDisplay: result.sexDispay,// 性别显示
              eyeDesc: result.eyeDesc, // 视力显示
              maritalStatusId: result.maritalStatusId,// 婚姻状况
              maritalStatusDisplay: result.maritalStatusDispay,// 婚姻状况显示
              kg: result.kg,// 体重
              cardNo: result.cardNo,// 身份证号码
              cardStartDate: result.cardStartDate,// 身份证开始时间
              cardEndDate: result.cardEndDate,// 身份证结束时间
              familyId: result.familyId,// 户口性质
              familyDisplay: result.familyDispay,// 户口性质显示
              userMobile: result.mobile,//  手机号码
              bloodType: result.bloodType,//血型
              birthday: '',//出生日期
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
              bankNo: result.bankNo, // 银行卡号 （2016-10-13 17:50:19新增）
              bankBranch: result.bankBranch, // 银行卡开户行 （2016-10-13 17:50:27新增）
              testGraduationTime: result.testGraduationTime, // 实习生毕业时间  （2016-10-13 17:50:32新增）
              contractCompanyDispay: result.contractCompanyDispay, // 合同归属公司

              employeeEducational: (result.employeeEducational?result.employeeEducational:[]), // 教育信息
              employeeCertificate: (result.employeeCertificate?result.employeeCertificate:[]),// 证书信息
              employeeLeaveEmployer: (result.employeeLeaveEmployer?result.employeeLeaveEmployer:[]),//以往雇主

              employeeContacts: (result.employeeContacts?result.employeeContacts:[]),// 紧急联系人信息
              employeeFamily: (result.employeeFamily?result.employeeFamily:[])// 家庭联系人
            });
          });
        }

    }
</script>
