<template>
    <h2 class="g-tc u-fs20 g-marginB20">{{post.cnName}}的入职审批申请</h2>
        <Tip-border tip="基本信息">
          <div class="form-group clearfix">
              <label for="" class="col-sm-2 control-label">部门：</label>
              <div class="col-sm-4">
                  <input type="text" class="form-control" readonly value="{{post.officeName}}" placeholder="">
              </div>

              <label for="" class="col-sm-2 control-label">职位：</label>
              <div class="col-sm-4">
                <input type="text" class="form-control" readonly value="{{post.positionsDisplay}}" placeholder="">
              </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">入职时间：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" readonly value="{{post.entrantTime}}" placeholder="">
            </div>

            <label for="" class="col-sm-2 control-label">入职地点：</label>
            <div class="col-sm-4">
              <input type="text" class="form-control" readonly value="{{post.workplaceDisplay}}" placeholder="">
            </div>
          </div>
        </Tip-border>

        <Tip-border tip="人员资料">
          <validator name="base">
          <div class="form-group clearfix">
              <label for="" class="col-sm-2 control-label field-require">员工号：</label>
              <div class="col-sm-4" v-validate-class>
                  <input type="text" class="form-control" v-model="post.employeeNo" maxlength="20" v-validate:employee="['required']">
                  <span class="fc-red" v-show="($base.employee.touched || validating) && $base.employee.required">请填写员工号</span>
              </div>
          </div>
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">中文名：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="post.cnName" readonly>
            </div>
            <label for="" class="col-sm-2 control-label">英文名：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.enName" v-validate:en_name="['validate_enname']">
                <span class="fc-red" v-if="($base.en_name.touched || validating) &&$base.en_name.validate_enname">英文名必须为15位以下英文</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">性别：</label>
            <div class="col-sm-4" v-validate-class>
              <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.sexId" v-validate:sex="['required']"></Tool-Selection>
              <span class="fc-red" v-show="($base.sex.touched || validating) && $base.sex.required">请选择性别</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">婚姻状况：</label>
            <div class="col-sm-4" v-validate-class>
              <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.maritalStatusId"></Tool-Selection>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">体重：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.kg" placeholder="" v-validate:weight="['validate_weight']">
                <span class="fc-red" v-if="($base.weight.touched || validating) &&$base.weight.validate_weight">体重必须为3位以下正整数</span>
                <!-- <span class="input-group-addon">kg</span> -->
            </div>

            <label for="" class="col-sm-2 control-label">视力：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.eyeDesc" placeholder="" v-validate:vision="['validate_vision']">
                <span class="fc-red" v-if="($base.vision.touched || validating) &&$base.vision.validate_vision">视力必须为(带小数点)数字</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">身高：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.height" placeholder="" v-validate:height="['validate_weight']">
                 <span class="fc-red" v-if="($base.height.touched || validating) &&$base.height.validate_weight">身高必须为3位以下正整数</span>
                <!-- <span class="input-group-addon">cm</span> -->
            </div>

            <label for="" class="col-sm-2 control-label">血型：</label>
            <div class="col-sm-4">
              <Tool-Selection :select-type-index="4" :all-select-types="type" v-model="post.bloodType"></Tool-Selection>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">身份证号：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.cardNo" v-validate:card="{required:true,validate_idcard:true}">
                <!-- <span class="fc-red" v-if="($base.card.touched || validating) && $base.card.required">请输入身份证号</span> -->
                <span class="fc-red" v-show="($base.card.touched || validating) && $base.card.validate_idcard">请输入正确的身份证号</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">身份证有效日期：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="post.cardStartDate" @click.stop="calendar.cardStartDate = true" v-validate:card-available="['required']" readonly="true">
                <span class="fc-red" v-show="($base.cardAvailable.touched || validating) && $base.cardAvailable.required">请选择起始日期</span>
                <Public-Calendar
                  :value.sync="post.cardStartDate"
                  :show.sync="calendar.cardStartDate"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>
            <div class="col-sm-2 field-interval" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="post.cardEndDate" @click.stop="calendar.cardEndDate = true" v-validate:card-available1="['required']" readonly="true">
                <span class="fc-red" v-show="($base.cardAvailable1.touched || validating) && $base.cardAvailable1.required">请选择结束日期</span>
                <Public-Calendar
                  :value.sync="post.cardEndDate"
                  :show.sync="calendar.cardEndDate"
                  :x="-88"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">移动电话：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="post.userMobile" readonly>
            </div>

            <label for="" class="col-sm-2 control-label">固定电话：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.telephone" placeholder="" v-validate:fixedphone="['validate_fixedphone']">
                <span class="fc-red" v-show="($base.fixedphone.touched || validating) && $base.fixedphone.validate_fixedphone">请输入正确固话号码</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">出生日期：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="post.birthday" @click.stop="calendar.birthdayShow = true" v-validate:birthday="['required']" readonly="true">
                <span class="fc-red" v-show="($base.birthday.touched || validating) && $base.birthday.required">请选择出生日期</span>
                <Public-Calendar
                  :value.sync="post.birthday"
                  :show.sync="calendar.birthdayShow"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>

            <label for="" class="col-sm-2 control-label field-require">籍贯：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.familySource" v-validate:nativeplace="['validate_nativeplace']">
                <span class="fc-red" v-show="($base.nativeplace.touched || validating) && $base.nativeplace.validate_nativeplace">请填写正确籍贯信息</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">个人社保号：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.socialSecurityNo" placeholder="" v-validate:securityno="{ maxlength: 20 }">
                <span class="fc-red" v-show="($base.securityno.touched || validating) && $base.securityno.maxlength">社保号长度不得大于20个字符</span>
            </div>

            <label for="" class="col-sm-2 control-label">参保地：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.socialSecuritySource" placeholder="" v-validate:insuredplace="['validate_insuredPlace']">
                <span class="fc-red" v-show="($base.insuredplace.touched || validating) && $base.insuredplace.validate_insuredPlace">请填写正确参保地信息</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">银行卡号：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="post.bankNo" placeholder="仅限招行银行卡">
            </div>

            <label for="" class="col-sm-2 control-label">开户行：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="post.bankBranch" placeholder="请填写银行卡的开户行">
            </div>
          </div>


          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">户口性质：</label>
            <div class="col-sm-4">
              <Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.familyId"></Tool-Selection>
            </div>

            <label for="" class="col-sm-2 control-label field-require">民族：</label>
            <div class="col-sm-4" v-validate-class>
              <Tool-Selection :select-type-index="5" :all-select-types="type" v-model="post.nation" v-validate:nation="['required']"></Tool-Selection>
                <span class="fc-red" v-show="($base.nation.touched || validating) && $base.nation.required">请填写民族信息</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">常用邮箱地址：</label>
            <div class="col-sm-4" v-validate-class>
              <input type="text" class="form-control" v-model="post.email" v-validate:email="['validate_email']">
              <span class="fc-red" v-show="($base.email.touched || validating) && $base.email.validate_email">请填写正确邮箱</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">邮政编码：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="post.postCode" placeholder="" v-validate:postalcode="['validate_postalcode']">
                <span class="fc-red" v-show="($base.postalcode.touched || validating) && $base.postalcode.validate_postalcode">请填写正确邮政编码</span>
            </div>
          </div>

          <div class="form-group clearfix" v-if="employeeNatureId == '3'">
            <label for="" class="col-sm-2 control-label field-require">毕业时间：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="post.testGraduationTime" @click.stop="calendar.graduation = true" v-validate:graduation="['required']" readonly="true">
                <span class="fc-red" v-show="($base.graduation.touched || validating) && $base.graduation.required">请选择毕业时间</span>
                <Public-Calendar
                  :value.sync="post.testGraduationTime"
                  :show.sync="calendar.graduation"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>
          </div>

          <div class="form-group g-marginB20 clearfix">
              <label for="" class="col-sm-2 control-label field-require">户籍地址：</label>
              <div class="col-sm-10" v-validate-class>
                  <!-- <textarea class="form-control" rows="3" v-model="post.cardNoSource" v-validate:addressorigin="{maxlength:100, required: true}"></textarea> -->
                  <input type="text" name="" id="" class="form-control" v-model="post.cardNoSource" v-validate:addressorigin="{maxlength:100, required: true}">
                  <span class="fc-red" v-show="($base.addressorigin.touched || validating) && $base.addressorigin.maxlength">最多可填写100个字符(50个汉字)</span>
                  <span class="fc-red" v-show="($base.addressorigin.touched || validating) && $base.addressorigin.required">请填写户籍地址</span>
              </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">通讯地址：</label>
            <div class="col-sm-10" v-validate-class>
              <input type="text" class="form-control" v-model="post.address" v-validate:address="{maxlength:100, required: true}">
              <span class="fc-red" v-show="($base.address.touched || validating) && $base.address.maxlength">最多可填写100个字符(50个汉字)</span>
              <span class="fc-red" v-show="($base.address.touched || validating) && $base.address.required">请填写通讯地址</span>
            </div>
          </div>
        </validator>
        </Tip-border>

        <Tip-border tip="合同信息">
            <validator name="contract">
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">合同类型：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="7" :all-select-types="type" v-model="post.employeeCompany.contractType" v-validate:contractype="['required']"></Tool-Selection>
                    <span class="fc-red" v-show="($contract.contractype.touched || validating) && $contract.contractype.required">请选择合同类型</span>
                </div>

                <label for="" class="col-sm-2 control-label field-require">合同次数：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control" v-model="post.employeeCompany.contractTime" maxlength="10" v-validate:contractime="{required:true,numeric:true}">
                    <span class="fc-red" v-show="($contract.contractime.touched || validating) && $contract.contractime.required">请填写合同次数</span>
                    <span class="fc-red" v-show="($contract.contractime.touched || validating) && $contract.contractime.numeric">只能输入数字</span>
                </div>
            </div>

            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label field-require">合同开始日期：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control input-calendar" v-model="post.employeeCompany.conStartDate" @click.stop="calendar.constardate = true" v-validate:constardate="['required']" readonly="true">
                    <span class="fc-red" v-show="($contract.constardate.touched || validating) && $contract.constardate.required">请填写合同开始时间</span>
                    <Public-Calendar
                            :value.sync="post.employeeCompany.conStartDate"
                            :show.sync="calendar.constardate"
                            :x="calendar.x"
                            :y="calendar.y"
                            :sep.sync="calendar.sep"></Public-Calendar>
                </div>
                <label for="" class="col-sm-2 control-label field-require">合同结束日期：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control input-calendar" v-model="post.employeeCompany.conEndDate" @click.stop="calendar.conenddata = true" v-validate:conenddata="['required']" readonly="true">
                    <span class="fc-red" v-show="($contract.conenddata.touched || validating) && $contract.conenddata.required">请填写合同结束时间</span>
                    <Public-Calendar
                            :value.sync="post.employeeCompany.conEndDate"
                            :show.sync="calendar.conenddata"
                            :x="calendar.x"
                            :y="calendar.y"
                            :sep.sync="calendar.sep"></Public-Calendar>
                </div>
            </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label">代办单位：</label>
                <div class="col-sm-4">
                    <Tool-Selection :select-type-index="8" :all-select-types="type" v-model="post.employeeCompany.agentCompany"></Tool-Selection>
                </div>

                <label for="" class="col-sm-2 control-label  field-require">试用期：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="6" :all-select-types="type" v-model="post.employeeCompany.testType" v-validate:testype="['required']"></Tool-Selection>
                    <span class="fc-red" v-show="($contract.testype.touched || validating) && $contract.testype.required">请选择试用期</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label field-require">员工合同所属公司：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="9" :all-select-types="type" v-model="post.contractCompanyValue"
                                        v-validate:contract="{required: true}"></Tool-Selection>
                    <span class="fc-red" v-show="($contract.contract.touched || validating) && $contract.contract.required">必填项</span>
                </div>
            </div>
            </validator>
        </Tip-border>
        <Tip-border tip="教育程度">
          <validator name="edu">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">学校名称：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeEducational.school" placeholder="" v-validate:school="{required:true, maxlength: 20}">
                <!-- v-validate:school="{required:true, maxlength: 40}" 取消校验 -->
                <span class="fc-red" v-show="($edu.school.touched || validating) && $edu.school.required">请填写学校名称</span>
                <span class="fc-red" v-show="($edu.school.touched || validating) && $edu.school.maxlength">最多可填写40个字符(20个汉字)</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">主修专业：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeEducational.major" placeholder="" v-validate:major="{required:true, maxlength: 20}" placeholder="">
                <span class="fc-red" v-show="($edu.major.touched || validating) && $edu.major.required">请填写主修专业</span>
                <span class="fc-red" v-show="($edu.major.touched || validating) && $edu.major.maxlength">最多可填写40个字符(20个汉字)</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">在校期间：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="employeeEducational.startTime" @click.stop="calendar.startTime = true" placeholder="" readonly="true"  v-validate:stime="['required']">
                <Public-Calendar
                  :value.sync="employeeEducational.startTime"
                  :show.sync="calendar.startTime"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>
            <div class="col-sm-2 field-interval" v-validate-class>
                <input type="text" class="form-control input-calendar" v-model="employeeEducational.endTime" @click.stop="calendar.endTime = true" placeholder="" readonly="true"  v-validate:etime="['required']">
                <Public-Calendar
                  :value.sync="employeeEducational.endTime"
                  :show.sync="calendar.endTime"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>

            <label for="" class="col-sm-2 control-label field-require">获得学历：</label>
            <div class="col-sm-4" v-validate-class>
                <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="employeeEducational.educationId"></Tool-Selection>
            </div>
          </div>
          <div class="g-tc">
            <button type="button" class="btn btn-default" @click="saveEducation">添加</button>
          </div>
          <div v-show="post.employeeEducational.length">
            <public-table :config="educationConfig" :data="{data:post.employeeEducational}"></public-table>
          </div>
          </validator>
        </Tip-border>

        <Tip-border tip="证书信息">
          <validator name="cer">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">专业证书：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="employeeCertificate.certificate" placeholder=""  v-validate:certificate="['required']">
            </div>

            <label for="" class="col-sm-2 control-label">获得年份：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control input-calendar" v-model="employeeCertificate.getTime" @click.stop="calendar.certificateShow = true" placeholder="" readonly="true"  v-validate:getTime="['required']">
                <Public-Calendar
                  :value.sync="employeeCertificate.getTime"
                  :show.sync="calendar.certificateShow"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>
          </div>
          <div class="g-tc">
            <button type="button" class="btn btn-default" @click="saveCertificate">添加</button>
          </div>
          <div v-show="post.employeeCertificate.length">
            <public-table :config="certificateConfig" :data="{data:post.employeeCertificate}"></public-table>
          </div>
        </validator>
        </Tip-border>

        <Tip-border tip="以前雇主信息">
          <validator name="exEmp">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">公司名称：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="employeeLeaveEmployer.company" placeholder="" v-validate:company="['required']">
            </div>

            <label for="" class="col-sm-2 control-label">受雇起止时间：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control input-calendar" v-model="employeeLeaveEmployer.employeeTime" @click.stop="calendar.employeeShow = true" placeholder="" readonly="true" v-validate:time="['required']">
                <Public-Calendar
                  :value.sync="employeeLeaveEmployer.employeeTime"
                  :show.sync="calendar.employeeShow"
                  :range="true"
                  :x="calendar.x"
                  :y="calendar.y"
                  :sep.sync="calendar.sep"></Public-Calendar>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">职位：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="employeeLeaveEmployer.positions" placeholder="" v-validate:positions="['required']">
            </div>

            <label for="" class="col-sm-2 control-label">工资：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="employeeLeaveEmployer.salary" placeholder="" v-validate:salary="['required']">
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">直属上司：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="employeeLeaveEmployer.superior" placeholder="" v-validate:superior="['required']">
            </div>

            <label for="" class="col-sm-2 control-label">公司电话：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="employeeLeaveEmployer.mobile" placeholder="">
            </div>
          </div>

          <div class="form-group g-marginB20 clearfix">
              <label for="" class="col-sm-2 control-label">离职原因：</label>
              <div class="col-sm-10">
                  <textarea class="form-control" rows="3" v-model="employeeLeaveEmployer.reason" v-validate:reason="['required']"></textarea>
              </div>
          </div>

          <div class="g-tc">
            <button type="button" class="btn btn-default" @click="saveEmployee">添加</button>
          </div>
          <div v-show="post.employeeLeaveEmployer.length">
            <public-table :config="employeeConfig" :data="{data:post.employeeLeaveEmployer}"></public-table>
          </div>
        </validator>
        </Tip-border>

        <Tip-border tip="紧急联系人">
        <validator name="ecp">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">姓名：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.contactsName" placeholder="" v-validate:ecpname="['required']">
                <span class="fc-red" v-show="($ecp.ecpname.touched || validating) && $ecp.ecpname.required">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">联系电话：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.mobile" placeholder="" v-validate:ecpphone="['validate_mobilePhone']">
                <span class="fc-red" v-show="($ecp.ecpphone.touched || validating) && $ecp.ecpphone.validate_mobilePhone">请填写正确的手机号码</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">职业：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.profession" placeholder="" v-validate:ecpjob="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($ecp.ecpjob.touched || validating) && $ecp.ecpjob.required">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">认识年限：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.contactsYears" placeholder="" v-validate:ecpyears="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($ecp.ecpyears.touched || validating) && $ecp.ecpyears.required">必填项</span>
            </div>
          </div>
          <div class="form-group g-marginB20 clearfix">
              <label for="" class="col-sm-2 control-label field-require">地址：</label>
              <div class="col-sm-10" v-validate-class>
                  <input type="text" name="" id="" class="form-control" v-model="employeeContacts.contactsAddress" v-validate:ecpaddress="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($ecp.ecpaddress.touched || validating) && $ecp.ecpaddress.required">必填项</span>
              </div>
          </div>

          <div class="g-tc">
            <button type="button" class="btn btn-default" @click="saveContact">添加</button>
          </div>
          <div v-show="post.employeeContacts.length">
            <public-table :config="contactsConfig" :data="{data:post.employeeContacts}"></public-table>
          </div>
        </validator>
        </Tip-border>

        <Tip-border tip="家庭成员">
          <validator name='fms'>
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label field-require">姓名：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control" v-model="employeeFamily.name" placeholder="" v-validate:fms-name="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsName.touched || validating) && $fms.fmsName.required">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">关系：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control" v-model="employeeFamily.relation" placeholder="" v-validate:fms-relation="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsRelation.touched || validating) && $fms.fmsRelation.required">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label field-require">电话：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control" v-model="employeeFamily.mobile" placeholder="" v-validate:fms-phone="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsPhone.touched || validating) && $fms.fmsPhone.required">必填项</span>
            </div>
          </div>
          <div class="form-group g-marginB20 clearfix">
              <label for="" class="col-sm-2 control-label field-require">联系地址：</label>
              <div class="col-sm-10" v-validate-class>
                  <input type="text" name="" id="" class="form-control" v-model="employeeFamily.address" v-validate:fms-address="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsAddress.touched || validating) && $fms.fmsAddress.required">必填项</span>
              </div>
          </div>

          <div class="g-tc">
            <button type="button" class="btn btn-default" @click="saveFamily">添加</button>
          </div>
          <div v-show="post.employeeFamily.length">
            <public-table :config="familyConfig" :data="{data:post.employeeFamily}"></public-table>
          </div>
          </validator>
        </Tip-border>

        <Tip-border tip="附件信息">
          <div class="form-group clearfix">
              <label class="col-sm-2 control-label">身份证正面：</label>
              <div class="col-sm-2">
                  <Tool-Upload :files.sync="frontFileList" :resource-id="post.id" :resource-type="'2'"></Tool-Upload>
              </div>


              <label class="col-sm-2 control-label">身份证背面：</label>
              <div class="col-sm-2">
                  <Tool-Upload :files.sync="backFileList" :resource-id="post.id" :resource-type="'3'"></Tool-Upload>
              </div>


              <label class="col-sm-2 control-label">学历：</label>
              <div class="col-sm-2">
                  <Tool-Upload :files.sync="certificateList" :resource-id="post.id" :resource-type="'4'"></Tool-Upload>
              </div>
          </div>
        </Tip-border>

        <div class="form-group g-tc g-marginT20">
            <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess(true)">同意</button>
            <button type="button" class="btn btn-default g-marginR30" @click="approveProcess(false)">驳回</button>
          <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
        </div>
        <Process-Approve v-if="humanTaskId" :comment="comment" :comments="comments" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
        <Process-Diagram :process-instance-id="taskId"></Process-Diagram>

    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
    import TipBorder from '../../components/public/TipBorder.vue'
    import PublicTable from '../../components/public/PublicTable.vue'
    import PublicModal from '../../components/public/PublicModal'
    import ToolSelection from '../../components/public/ToolSelection'
    import PublicCalendar from '../../components/public/PublicCalendar'
    import * as type from '../../constants/globalSelectTypes'
    import ToolUpload from '../../components/public/ToolUpload'
    import { loginGetResult } from '../../getters/loginGetter'
    import ProcessApprove from '../../components/others/ProcessApprove'
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';    
    export default{
        vuex: {
          getters: {
            loginResult: loginGetResult
          }
        },
        validators: {
          validate_enname: function (val/*,rule*/) {
            return /^[A-Za-z]{0,15}$/.test(val)
          },
          validate_weight: function (val) {
            return /^[+]?\d{0,3}$/.test(val)
          },
          validate_vision: function (val) {
            return  /^\d{0,1}(\.\d+)?$/.test(val)
          },
          numeric: function (val) {
            return /^[0-9]*$/.test(val)
          },
          /*validate_idcard: function (val) {
            return  /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(val)
          },*/
          validate_idcard: function(idcard) {
      var ErrorsMes = new Array(
        "验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!"
      );
      var Errors = [true, false, false, false, false]
      var area = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门",
        91: "国外"
      }

      var idcard, Y, JYM, ereg;
      var S, M;
      var idcard_array = new Array();
      idcard_array = idcard.split("");

      //地区检验
      if (area[parseInt(idcard.substr(0, 2))] == null) {
        // console.log(ErrorsMes[4]);
        return Errors[4];
      }

      //身份号码位数及格式检验
      switch (idcard.length) {
        case 15:
          if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 == 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 == 0)) {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; //测试出生日期的合法性
          } else {
            ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; //测试出生日期的合法性
          }

          if (ereg.test(idcard)) {
            // console.log(ErrorsMes[0]);
            return Errors[0];
          }
          else {
          // console.log(ErrorsMes[2]);
          return Errors[2];
          }
          break;
        case 18:
          //18位身份号码检测
          //出生日期的合法性检查
          //闰年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))
          //平年月日:((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))
          if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
          } else {
            ereg = /^[1-9][0-9]{5}19[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
          }
          if (ereg.test(idcard)) { //测试出生日期的合法性
            //计算校验位
            S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
            Y = S % 11;
            M = "F";
            JYM = "10X98765432";
            M = JYM.substr(Y, 1); //判断校验位
            if (M == idcard_array[17]) {
              // console.log(ErrorsMes[0])
              return Errors[0]; //检测ID的校验位
            }
            else {
              // console.log(ErrorsMes[3])
              return Errors[3];
            }
          } else {
            // console.log(ErrorsMes[2])
            return Errors[2];
          }
          break;
        default:
          // console.log(ErrorsMes[1])
          return Errors[1];
          break;
      }
    },
          validate_fixedphone: function (val) {
            if (val.trim()=='') {
              return true
            }else{
            return  /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(val)
            }
          },
           validate_nativeplace: function (val) {
            return  /^[\u4E00-\u9FA5]{2,10}$/g.test(val)
          },
          validate_insuredPlace: function (val) {
            return  /^[\u4E00-\u9FA5]{0,20}$/g.test(val)
          },
          validate_email: function (val) {
            return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
          },
          validate_postalcode: function (val) {
            return  /^[1-9][0-9]{5}$/.test(val)
          },
          validate_school: function (val) {
            return  /^[\u4E00-\u9FA5]{2,20}$/g.test(val)
          },
          validate_mobilePhone: function (val) {
            return  /^1[34578]\d{9}$/.test(val)
          },
        },
        props: ['taskId','humanTaskId', 'businessKey','info','isRecord'],
        data (){
            return {
                comments:false,
                comment:'',
                post: {
                    /* 仅用于呈现的字段 */
                    officeName: '', // 部门
                    positionsDisplay: '', // 职位
                    entrantTime: '', // 入职时间
                    workplaceDisplay: '', // 入职地点
                    id: '', // 来自业务编码接口返回结果
                    baseId: '', // 来自查询入职员工信息接口返回结果
                    employeeNo:'', //员工编号
                    cnName: '',// 中文名字
                    enName: '',// 英文名字
                    sexId: '',// 性别id
                    maritalStatusId: '',// 婚姻状况
                    kg: '',// 体重
                    eyeDesc: '', // 视力
                    cardNo: '',// 身份证号码
                    cardStartDate: '',// 身份证开始时间
                    cardEndDate: '',// 身份证结束时间
                    familyId: '',// 户口性质
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
                    cardNoSource: '', // 户籍地址
                    bankNo: '', // 银行卡号 （2016-10-13 17:50:19新增）
                    bankBranch: '', // 银行卡开户行 （2016-10-13 17:50:27新增）
                    testGraduationTime: '', // 实习生毕业时间  （2016-10-13 17:50:32新增）


                    employeeCompany:{
                        agentCompany:'', //待办单位
                        testType:'', //试用期
                        contractType:'', //合同类型
                        contractTime:'', //合同次数
                        conStartDate:'', //合同开始日期
                        conEndDate:'', //合同结束日期
                    },
                    employeeEducational: [], // 教育信息
                    employeeCertificate: [],// 证书信息
                    employeeLeaveEmployer: [],//以往雇主

                    employeeContacts: [],// 紧急联系人信息
                    employeeFamily: []// 家庭联系人
                },
                //cardEffective: '', 该属性废弃
                employeeEducational: {
                  'id': '',//
                  'employeeBaseId': '',//
                  'school': '', // 学校名称
                  'major':'', // 专业
                  // 'stayTime':'', // 在校期间
                  'startTime': '', // 在校起始时间
                  'endTime': '', // 在校结束时间
                  'educationId':'' // 获得学历
                },
                employeeCertificate: { // 专业证书
                  'id': '',//
                  'employeeBaseId': '',//
                  'certificate':'', // 证书名称
                  'getTime':'', // 获取年份
                },
                employeeLeaveEmployer: { // 以往雇主
                  'id':'',//
                  'employeeBaseId':'',//
                  'company':'',
                  'employeeTime':'', // 受雇起止时间
                  'positions':'', // 职位名称
                  'salary': '', // 工资
                  'superior':'', // 直属上司
                  'mobile':'', // 公司电话
                  'reason':'', // 离职原因
                },
                employeeContacts: { // 紧急联系人信息
                  'id':'',//
                  'employeeBaseId':'',//
                  'contactsAddress':'',  // 联系人地址
                  'contactsName':'', // 紧急联系人姓名
                  'contactsYears':'', // 认识年限
                  'major':'', //
                  'mobile':'', // 紧急联系人电话
                  'profession':'', // 紧急联系人职业
                  'serialNo':''
                },
                employeeFamily: { // 家庭联系人
                  'id':'',//
                  'employeeBaseId':'',//
                  'address':'', // 家庭地址
                  'mobile':'', // 联系电话
                  'name':'', // 家人姓名
                  'relation':'' // 双方关系
                },
                process: {
                    userId: '', // loginName 登录用户名
                    businessKey: '', // 业务实体ID
                    publishCode: '', // 流程定义CODE WF_HR_004
                    businessType: 'RZSQ', // 业务类型 RZSQ
                    appId: 'starOffice', // 目前固定
                    businessTitle: '',//
                    businessCode: '', // 业务编号 RZSQ20160909946
                    bussinessDataJsonStr: {
                      inductionFormId: 0
                    }
                },
                replaceList: [],
                stationList: [],
                type: [
                    type.MARITAL_STATUS,
                    type.EMPLOYEE_EDUCATION,
                    type.RESIDENCE_NATURE,
                    type.SEX,
                    type.BLOOD_TYPE,
                    type.PEOPLE_NATIONAL,
                    type.TEST_PERIOD,
                    type.CONTRACT_TYPE,
                    type.AGENT_COMPANY,
                    type.CONTRACT_COMPANY
                ],
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                isCompleted: false,
                frontFileList: [],
                backFileList: [],
                certificateList: [],
                calendar: {
                    idShow: false,
                    birthdayShow: false,
                    staySchoolShow: false,
                    certificateShow: false,
                    employeeShow: false,
                    cardStartDate: false,
                    cardEndDate: false,
                    startTime: false,
                    endTime: false,
                    graduation: false,
                    constardate:false,
                    conenddata:false,
                    x: 13,
                    y: 40,
                    sep: '-'
                },
                validating: false,
                isShow: false,
                educationConfig: {
                  className: 'table table-striped table-hover table-bordered',
                  pagination: false,
                  sequence: false,
                  fields: [
                      {
                          name: 'school',
                          text: '学校名称'
                      },
                      {
                          name: 'major',
                          text: '主修专业'
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
                          name: 'educationId',
                          text: '获得学历'
                      },
                      {
                        name: 'operate',
                        text: '操作',
                        operates: [
                          {
                            text: '修改',
                            className: 'btn btn-link',
                            handler: function(obj, array, index) {
                                this.$parent.employeeEducational = obj;
                                this.$parent.deleteEdu(index);
                            }
                          }
                        ]
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
                      },
                      {
                        name: 'operate',
                        text: '操作',
                        operates: [
                          {
                            text: '修改',
                            className: 'btn btn-link',
                            handler: function(obj, array, index) {
                              this.$parent.employeeCertificate = obj;
                                this.$parent.deleteCertificate(index);
                            }
                          }
                        ]
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
                      },
                      {
                        name: 'operate',
                        text: '操作',
                        operates: [
                          {
                            text: '修改',
                            className: 'btn btn-link',
                            handler: function(obj, array, index) {
                              this.$parent.employeeLeaveEmployer = obj;
                                this.$parent.deleteEmployee(index);
                            }
                          }
                        ]
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
                      },
                      {
                        name: 'operate',
                        text: '操作',
                        operates: [
                          {
                            text: '修改',
                            className: 'btn btn-link',
                            handler: function(obj, array, index) {
                              this.$parent.employeeContacts = obj;
                              console.dir(obj);
                                this.$parent.deleteContact(index);
                            }
                          }
                        ]
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
                      },
                      {
                        name: 'operate',
                        text: '操作',
                        operates: [
                          {
                            text: '修改',
                            className: 'btn btn-link',
                            handler: function(obj, array, index) {
                              this.$parent.employeeFamily = obj;
                                this.$parent.deleteFamily(index);
                            }
                          }
                        ]
                      }
                  ]
                }

            }
        },
        computed: {
            config: () => {
                return {
                    sequence: false,
                    className: 'table table-striped table-hover table-bordered u-bg2',
                    fields: [{
                      name: 'sort',
                      text: '序号'
                    },{
                      name: 'workDuty',
                      text: '工作职责（按重要程序排列）'
                    },{
                      name: 'dutyDesc',
                      text: '要求工作成效'
                    }]
                }
            },
            businessTitle: function(){
              let vm = this;
              let str = (vm.post.officeName?vm.post.officeName+'-':'')+(vm.post.positionsDisplay?vm.post.positionsDisplay+'-':'') + (vm.post.cnName?vm.post.cnName+'的':'')+'入职办理';
              vm.process.businessTitle = str;
              return str;
            }
        },
        route: {
            canDeactivate: function (transition) {
                let vm = this;
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
                    vm.options.isShow = false;
                  }
                }
            }
        },
        created: function(){
            this.process.publishCode = this.$route.params.processId;
            this.process.userId = sessionStorage.getItem("loginName");
        },
        asyncData: function (resolve, reject) {
          let vm = this;
          let businessKey = this.$route.query.businessKey;
          businessKey && (this.businessKey = businessKey);
          if(this.businessKey){
            // 更新当前页面信息
            this.process.businessKey = this.businessKey;
            this.post.id = this.businessKey;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEENTRY, {id: this.businessKey}).then((response) => {
                let result = response.json().result;
                resolve({
                  'post.officeName': result.officeName, // 部门
                  'post.positionsDisplay': result.positionsDisplay, // 职位
                  'post.entrantTime': result.entrantTime, // 入职时间
                  'post.workplaceDisplay': result.workplaceDisplay, // 入职地点
                  'post.baseId': result.baseId, //
                  'post.employeeNo': result.employeeNo,//员工编号
                  'post.cnName': result.cnName,// 中文名字
                  'post.enName': result.enName,// 英文名字
                  'post.sexId': result.sexId,// 性别id
                  'post.maritalStatusId': result.maritalStatusId,// 婚姻状况
                  'post.kg': result.kg,// 体重
                  'post.eyeDesc': result.eyeDesc, // 视力
                  'post.cardNo': result.cardNo,// 身份证号码
                  // 'cardEffective': (result.cardStartDate ? result.cardStartDate + '~' : '') + (result.cardEndDate || ''), // 该属性因改版废弃
                  'post.cardStartDate': result.cardStartDate,// 身份证开始时间
                  'post.cardEndDate': result.cardEndDate,// 身份证结束时间
                  'post.familyId': result.familyId,// 户口性质
                  'post.userMobile': result.mobile,//  手机号码
                  'post.bloodType': result.bloodType,//血型
                  'post.birthday': result.birthday,//出生日期
                  'post.familySource': result.familySource,//籍贯
                  'post.height': result.height,//身高
                  'post.nation': result.nation,//民族
                  'post.email': result.email,//邮箱
                  'employeeNatureId': result.employeeNatureId,// 员工性质
                  'post.testGraduationTime': result.testGraduationTime,// 员工毕业时间
                  'post.telephone': result.telephone,//家庭固定电话
                  'post.socialSecurityNo': result.socialSecurityNo,//个人社保号
                  'post.socialSecuritySource': result.socialSecuritySource,//参保地
                  'post.bankNo': result.bankNo, // 银行卡号
                  'post.bankBranch': result.bankBranch, // 银行卡开户行
                  'post.address': result.address,//通讯地址
                  'post.serialNo': result.serialNo,//业务编码
                  'post.urgencyDegreeId': result.urgencyDegreeId,//紧急程度id
                  'post.postCode': result.postCode, // 邮政编码
                  'post.cardNoSource': result.cardNoSource, // 户籍地址
                  'process.businessCode': result.serialNo,  // 修正了业务编码错误

                  'process.bussinessDataJsonStr': JSON.stringify({  //  修正了从草稿箱回来之后，入职类型错误的问题
                    inductionFormId	: result.inductionFormId
                  }),
                  'post.employeeEducational': (result.employeeEducational?result.employeeEducational:[]), // 教育信息
                  'post.employeeCertificate': (result.employeeCertificate?result.employeeCertificate:[]),// 证书信息
                  'post.employeeLeaveEmployer': (result.employeeLeaveEmployer?result.employeeLeaveEmployer:[]),//以往雇主

                  'post.employeeCompany.agentCompany': (result.agentCompany?result.agentCompany:''), //待办单位
                  'post.employeeCompany.testType':(result.testType?result.testType:'2'),   //试用期
                  'post.employeeCompany.contractType':(result.contractType?result.contractType:''),   //合同类型
                  'post.employeeCompany.contractTime':(result.contractTime?result.contractTime:'1'),   //合同次数
                  'post.employeeCompany.conStartDate':(result.conStartDate?result.conStartDate:''),   //合同开始日期
                  'post.employeeCompany.conEndDate':(result.conEndDate?result.conEndDate:''),   //合同结束日期


                  'post.employeeContacts': (result.employeeContacts?result.employeeContacts:[]),// 紧急联系人信息
                  'post.employeeFamily': (result.employeeFamily?result.employeeFamily:[])
                });
            });
            // 获取文件列表
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
            vm.resetData();
          } else {
            // 根据当前用户查询所需的入职前置信息
            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETEMPLOYEEBASE).then((response)=>{
              let result = response.json().result;
              resolve({
                'post.officeName': result.officeName, // 入职部门
                'post.positionsDisplay': result.positionsDisplay, // 入职职位
                'post.entrantTime': result.entrantTime, // 入职时间
                'post.workplaceDisplay': result.workplaceDisplay, // 入职地点
                'post.baseId': result.baseId,
                'post.cnName': result.cnName,
                'post.userMobile': result.mobile,
                'employeeNatureId': result.employeeNatureId, // 入职人员性质，如果为'3'则为实习生
                'process.bussinessDataJsonStr': JSON.stringify({
                  inductionFormId	: result.inductionFormId
                })
              });

            },(response)=>{
              console.log('bad request! @ 查询员工入职信息');
            });
            // 根据当前业务类型查询后续请求所需信息
            this.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_GETSERIALNUMBER_RZSQ).then((response) => {
              let result = response.json().result;
              if(result.isEntry == 'true'){
                vm.options = {
                  title: '温馨提示',
                  message: '您已办理过入职申请！',
                  icon: 'warning',
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
                    vm.isCompleted = true;
                    vm.$router.go('/process/application');
                    vm.options.isShow = false;
                    }
                }
              } else {
                resolve({
                  'post.id': result.uuId,
                  'post.serialNo': result.serialNumber,
                  'process.businessKey': result.uuId,
                  'process.businessCode': result.serialNumber,
                });
              }


            },(response)=>{
              console.log('bad request! @ 业务编码接口');
            });
          }
        },
        components: {
            TipBorder,
            PublicTable,
            ToolSelection,
            PublicModal,
            PublicCalendar,
            ProcessDiagram,
            ProcessApprove,
            ToolUpload
        },
        methods: {
            resetData: function(){
              let vm = this;
              // 应后台的要求，当处于被打回修改状态是，清楚返回数据中 可复用条目中的id和employeeBaseId
              if(vm.employeeEducational.length != 0) vm.resetIds(vm.employeeEducational);
              if(vm.employeeCertificate.length != 0) vm.resetIds(vm.employeeCertificate);
              if(vm.employeeLeaveEmployer.length != 0) vm.resetIds(vm.employeeLeaveEmployer);
              if(vm.employeeContacts.length != 0) vm.resetIds(vm.employeeContacts);
              if(vm.employeeFamily.length != 0) vm.resetIds(vm.employeeFamily);
            },
            resetIds: function(data){
              if (!(data instanceof Array)) return false;
              for (let i = 0; i < data.length; i++) {
                data[i].id = '';
                data[i].employeeBaseId = '';
              }
            },
            saveEducation: function (){ // 存储教育信息
              let vm = this,temp = {};
              if(vm.$edu.invalid || vm.employeeEducational.educationId == ''){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写完整的教育程度信息!',
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
                return false;
              }
              Object.assign(temp,vm.employeeEducational);
              for(let key in vm.employeeEducational){
                vm.employeeEducational[key] = '';
              }
              // for(let key in vm.employeeEducational){
              //   vm.employeeEducational[key] = '';
              // }  修复点击提交流程失败时，教育信息清空的错误
              // [temp.startTime,temp.endTime] = vm._trim(temp.stayTime).split('~');
              // delete temp.stayTime;
              // if(vm.post.employeeEducational.length) vm.post.employeeEducational.pop();
              vm.post.employeeEducational.push(temp);
              temp = {};
            },
            deleteEdu: function (index){
              this.post.employeeEducational.splice(index,1);
            },
            saveCertificate: function (){ // 存储证书信息
              let vm = this,temp = {};
              // console.log(vm.$cer)
              if(vm.$cer.invalid){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写完整的证书信息!',
                  isShow: true
                };
                vm.confirm = {
                  text: '确定',
                  callback: function () {
                    // vm.validating = true;
                    vm.options.isShow = false;
                  }
                };
                vm.close = {
                  callback: function () {
                    // vm.validating = true;
                    vm.options.isShow = false;
                  }
                };
                return false;
              }
              Object.assign(temp,vm.employeeCertificate);
              for(let key in vm.employeeCertificate){
                vm.employeeCertificate[key] = '';
              }
              vm.post.employeeCertificate.push(temp);
              temp = {};
            },
            deleteCertificate: function (index){ // 证书列表删除
              this.post.employeeCertificate.splice(index,1);
            },
            saveEmployee: function(){ // 存储以前雇主 employeeLeaveEmployer
              let vm = this,temp = {};
              if(vm.$exEmp.invalid){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写完整的前雇主信息!',
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
                return false;
              }
              Object.assign(temp,vm.employeeLeaveEmployer);
              for(let key in vm.employeeLeaveEmployer){
                vm.employeeLeaveEmployer[key] = '';
              }
              [temp.startTime,temp.endTime] = vm._trim(temp.employeeTime).split('~');
              delete temp.employeeTime;
              vm.post.employeeLeaveEmployer.push(temp);
              temp = {};
            },
            deleteEmployee: function(index){ // 以前雇主列表删除
              this.post.employeeLeaveEmployer.splice(index,1);
            },
            saveContact: function(){ // 存储紧急联系人
              let vm = this,temp = {};
              if(vm.$ecp.invalid){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写完整的紧急联系人信息!',
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
                return false;
              }
              Object.assign(temp,vm.employeeContacts);
              for(let key in vm.employeeContacts){
                vm.employeeContacts[key] = '';
              }
              vm.post.employeeContacts.push(temp);
              temp = {};
            },
            deleteContact: function(index){ // 紧急联系人列表删除
              this.post.employeeContacts.splice(index,1);
            },
            saveFamily: function(){ // 存储家庭成员
              let vm = this,temp = {};
              if(vm.$fms.invalid){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写完整的家庭成员信息再进行添加!',
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
                return false;
              }
              Object.assign(temp,vm.employeeFamily);
              for(let key in vm.employeeFamily){
                vm.employeeFamily[key] = '';
              }
              vm.post.employeeFamily.push(temp);
              temp = {};
            },
            deleteFamily: function(index){ // // 家庭成员列表删除
              this.post.employeeFamily.splice(index,1);
            },
            save: function () {
                let vm = this;
                // [vm.post.cardStartDate,this.post.cardEndDate] = vm._trim(this.cardEffective).split('~'); //cardEffective属性废弃
                // vm.saveEducation();
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
            approveProcess: function(comments){
                let vm = this;
                this.comments = comments;
                if(comments){
                    vm.comment = '同意'
                }else{
                    vm.comment = '不同意'
                    vm.disapproval();
                    return;
                }
                this.submit();

            },
            cancelProcess: function () {
                this.$router.go('/process/todo');
            },
            submit: function () {
              let vm = this;
              if(vm.post.employeeEducational.length == 0){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写完整的教育经历信息!',
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
                return false;
              }else{
                    vm.$edu.school.required = false;
                    vm.$edu.major.required = false;
              }
              if(vm.post.employeeContacts.length == 0){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写至少一位紧急联系人信息!',
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
                return false;
              }else{
                vm.$fms.fmsName.required = false;
                vm.$fms.fmsRelation.required = false;
                vm.$fms.fmsPhone.required = false;
                vm.$fms.fmsAddress.required = false;
              }
              if(vm.post.employeeFamily.length == 0){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写至少一位家庭成员信息!',
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
                return false;
              }else{
                vm.$ecp.ecpname.required = false;
                vm.$ecp.ecpphone.validate_mobilePhone = false;
                vm.$ecp.ecpjob.required = false;
                vm.$ecp.ecpyears.required = false;
                vm.$ecp.ecpaddress.required = false;
              }
              if(vm.$base.invalid) {
                vm.options = {
                  title: '温馨提示',
                  message: '人员资料信息填写有误，请检查后再提交!',
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
                return false;
              }
                if(vm.$contract.invalid) {
                    vm.options = {
                        title: '温馨提示',
                        message: '合同资料信息填写有误，请检查后再提交!',
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
                    return false;
                }
              vm._save(function () {
                  vm.isShow = true;
                  //逻辑错误注释以下代码
//                if(vm.humanTaskId){
//                  // update
//                    let userId = sessionStorage.getItem("loginName");
//                  vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
//                    'humanTaskId': vm.humanTaskId,
//                    'appros': true,
//                    'userId' : userId
//                  }).then((response) => {
//                    let status = response.json().status;
//                    if(status == 0){
//                      vm._submitSuc()
//                    }
//                  })
//                }else {
//                  vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_STARTPROCESS, vm.process).then((response) => {
//                    let status = response.json().status;
//                    if(status == 0){
//                      vm._submitSuc()
//                    }
//                  });
//                }
              })
            },
            disapproval:function () {
              let vm = this;
              vm._save(function () {
                  vm.isShow = true;
              })
            },
            _save: function (callback) {
                let vm = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEEMPLOYEEENTRY, this.post).then((response) => {
                    let status = response.json().status;
                    if(status == 0){
                        callback();
                    }
                });
            },
            _trim: function (str){
              return str.replace(/\s/g,"");
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
            }
        }
    }
</script>
