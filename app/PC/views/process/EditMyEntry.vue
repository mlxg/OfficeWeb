<!-- 流程中心 --- 我的申请 -- 我的入职审批 -->
<template>
    <h3 class="u-fs20 g-tc">{{cnName}}的档案</h3>
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">入职部门：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="officeName" readonly>
            </div>

            <label for="" class="col-sm-2 control-label">入职职位：</label>
            <div class="col-sm-4">
                <select class="form-control" v-model="post.positionsId">
                <option v-for="item in positionList" :value="item.id">{{item.postionName}}</option>
                </select>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">入职时间：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="entrantTime" readonly>

            </div>
            <label for="" class="col-sm-2 control-label">入职地点：</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" v-model="workplaceDisplay" readonly>
            </div>
        </div>
    </Tip-border>
        <Tip-border tip="公司信息">
            <validator name="contract">
          <div class="form-group clearfix">
              <label for="" class="col-sm-2 control-label">代办单位：</label>
              <div class="col-sm-4">
                  <Tool-Selection :select-type-index="5" :all-select-types="type" v-model="post.employeeCompany.agentCompany"></Tool-Selection>
              </div>

              <label for="" class="col-sm-2 control-label  ">试用期：</label>
              <div class="col-sm-4" v-validate-class>
                  <Tool-Selection :select-type-index="3" :all-select-types="type" v-model="post.employeeCompany.testType" v-validate:testype="['required']"></Tool-Selection>
                  <span class="fc-red" v-show="($contract.testype.touched || validating) && $contract.testype.required">请选择试用期</span>
              </div>
          </div>
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label ">合同类型：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="4" :all-select-types="type" v-model="post.employeeCompany.contractType" v-validate:contractype="['required']"></Tool-Selection>
                    <span class="fc-red" v-show="($contract.contractype.touched || validating) && $contract.contractype.required">请选择合同类型</span>
                </div>

                <label for="" class="col-sm-2 control-label ">合同次数：</label>
                <div class="col-sm-4" v-validate-class>
                    <input type="text" class="form-control" v-model="post.employeeCompany.contractTime" maxlength="10" v-validate:contractime="['required']">
                    <span class="fc-red" v-show="($contract.contractime.touched || validating) && $contract.contractime.required">请选择合同次数</span>
                </div>
            </div>

            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label ">合同开始日期：</label>
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
                <label for="" class="col-sm-2 control-label ">合同结束日期：</label>
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
            </validator>
        </Tip-border>    
    <validator name="validation">
            <Tip-border tip="人员资料">
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">中文名：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="cnName" readonly>
                    </div>
                    <label for="" class="col-sm-2 control-label">英文名：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.enName" v-validate:en_name="['validate_enname']">
                        <span class="fc-red" v-if="($validation.en_name.invalid || validating) && $validation.en_name.validate_enname">英文名必须为15位以下英文</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">性别：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="sexDisplay" readonly>
                    </div>

                    <label for="" class="col-sm-2 control-label">婚姻状况：</label>
                    <div class="col-sm-4">
                        <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.maritalStatusId"></Tool-Selection>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">体重：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.kg" v-validate:weight="['validate_weight']">
                        <span class="fc-red" v-if="($validation.weight.invalid || validating) &&$validation.weight.validate_weight">体重必须为3位以下正整数</span>
                    </div>

                    <label for="" class="col-sm-2 control-label">视力：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.eyeDesc" v-validate:vision="['validate_vision']">
                        <span class="fc-red" v-if="($validation.vision.invalid || validating) &&$validation.vision.validate_vision">视力必须为(带小数点)数字</span>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">身高：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.height" v-validate:height="['validate_weight']">
                        <span class="fc-red" v-if="($validation.height.invalid || validating) &&$validation.height.validate_weight">身高必须为3位以下正整数</span>
                    </div>

                    <label for="" class="col-sm-2 control-label">血型：</label>
                    <div class="col-sm-4">
                        <!-- <input type="text" class="form-control" v-model="bloodType" > -->
                        <Tool-Selection :select-type-index="2" :all-select-types="type" v-model="post.bloodType"></Tool-Selection>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">身份证号：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="cardNo" readonly>
                    </div>

                    <label for="" class="col-sm-2 control-label" >身份证有效日期：</label>
                    <div class="col-sm-2" v-validate-class>
                        <input type="text" class="form-control input-calendar" v-model="post.cardStartDate" @click.stop="calendar.cardStartDate = true" v-validate:card-available="['required']" readonly="true">
                        <span class="fc-red" v-show="($validation.cardAvailable.invalid || validating) && $validation.cardAvailable.required">请选择起始日期</span>
                        <Public-Calendar
                          :value.sync="post.cardStartDate"
                          :show.sync="calendar.cardStartDate"
                          :x="calendar.x"
                          :y="calendar.y"
                          :sep.sync="calendar.sep"></Public-Calendar>
                    </div>
                    <div class="col-sm-2 field-interval" v-validate-class>
                        <input type="text" class="form-control input-calendar" v-model="post.cardEndDate" @click.stop="calendar.cardEndDate = true" v-validate:card-available1="['required']" readonly="true">
                        <span class="fc-red" v-show="($validation.cardAvailable1.invalid || validating) && $validation.cardAvailable1.required">请选择结束日期</span>
                        <Public-Calendar
                          :value.sync="post.cardEndDate"
                          :show.sync="calendar.cardEndDate"
                          :x="-88"
                          :y="calendar.y"
                          :sep.sync="calendar.sep"></Public-Calendar>
                    </div>
                </div>

                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">移动电话：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="userMobile" readonly>
                    </div>
                    <label for="" class="col-sm-2 control-label">固定电话：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.telephone" v-validate:fixedphone="['validate_fixedphone']">
                        <span class="fc-red" v-show="($validation.fixedphone.invalid || validating) && $validation.fixedphone.validate_fixedphone">请输入正确固话号码</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">出生日期：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="birthday" readonly>
                    </div>
                    <label for="" class="col-sm-2 control-label">籍贯：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="familySource" readonly>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">个人社保号：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.socialSecurityNo" v-validate:securityno="{ maxlength: 20 }">
                        <span class="fc-red" v-show="($validation.securityno.invalid || validating) && $validation.securityno.maxlength">社保号长度不得大于20个字符</span>
                    </div>

                    <label for="" class="col-sm-2 control-label">参保地：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.socialSecuritySource" v-validate:insuredplace="['validate_insuredPlace']">
                        <span class="fc-red" v-show="($validation.insuredplace.touched || validating) && $validation.insuredplace.validate_insuredPlace">请填写正确参保地信息</span>
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
                        <input type="text" class="form-control" v-model="familyDisplay" readonly>
                    </div>

                    <label for="" class="col-sm-2 control-label">民族：</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="nation" readonly>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">常用邮箱地址：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.email" v-validate:email="['validate_email']">
                        <span class="fc-red" v-show="($validation.email.invalid || validating) && $validation.email.validate_email">请填写正确邮箱</span>
                    </div>

                    <label for="" class="col-sm-2 control-label">邮政编码：</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="post.postCode" v-validate:postalcode="['validate_postalcode']">
                        <span class="fc-red" v-show="($validation.postalcode.invalid || validating) && $validation.postalcode.validate_postalcode">请填写正确邮政编码</span>
                    </div>
                </div>

                <div class="form-group g-marginB20 clearfix">
                    <label for="" class="col-sm-2 control-label">户籍地址：</label>
                    <div class="col-sm-10" v-validate-class>
                        <input type="text" class="form-control" v-model="post.cardNoSource" v-validate:addressorigin="{maxlength:100, required: true}">
                        <span class="fc-red" v-show="($validation.addressorigin.invalid || validating) && $validation.addressorigin.maxlength">最多可填写100个字符(50个汉字)</span>
                        <span class="fc-red" v-show="($validation.addressorigin.invalid || validating) && $validation.addressorigin.required">请填写户籍地址</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label">通讯地址：</label>
                    <div class="col-sm-10" v-validate-class>
                        <input type="text" class="form-control" v-model="post.address" v-validate:address="{maxlength:50, required: true}">
                        <span class="fc-red" v-show="($validation.address.invalid || validating) && $validation.address.maxlength">不可超过50个字</span>
                        <span class="fc-red" v-show="($validation.address.invalid || validating) && $validation.address.required">请填写通讯地址</span>
                    </div>
                </div>
            </Tip-border>

            <!-- <Tip-border tip="以往雇主资料">
                <div class="form-group clearfix">
                    <div class="col-sm-12">
                        <table class="table table-striped table-hover table-bordered g-fr">
                            <thead>
                            <th>公司名称</th>
                            <th>职位</th>
                            <th>直属上司</th>
                            <th>薪资</th>
                            <th>公司电话</th>
                            <th>离职原因</th>
                            </thead>
                            <tbody>
                            <tr v-for="item in post.employeeLeaveEmployer">
                                <td><input type="text" class="form-control" v-model="item.company" ></td>
                                <td><input type="text" class="form-control" v-model="item.positions" ></td>
                                <td><input type="text" class="form-control" v-model="item.superior" ></td>
                                <td><input type="text" class="form-control" v-model="item.salary" ></td>
                                <td><input type="text" class="form-control" v-model="item.mobile" ></td>
                                <td><input type="text" class="form-control" v-model="item.reason" ></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Tip-border> -->
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

<!--             <Tip-border tip="教育程度">
    <div class="form-group clearfix">
        <div class="col-sm-12">
            <table class="table table-striped table-hover table-bordered g-fr archives">
                <thead>
                <th>学校</th>
                <th>专业</th>
                <th>在校期间</th>
                <th>学历</th>
                </thead>
                <tbody>
                <tr v-for="item in post.employeeEducational">
                    <td class="vm" v-validate-class>
                        <input type="text" class="form-control" v-model="item.school" v-validate:school="{required:true, maxlength: 20}" >
                        <span class="fc-red" v-show="($validation.school.invalid || validating) && $validation.school.required">请填写学校名称</span>
                        <span class="fc-red" v-show="($validation.school.invalid || validating) && $validation.school.maxlength">不可超过20个字</span>
                    </td>
                    <td class="vm" v-validate-class>
                        <input type="text" class="form-control" v-model="item.major"  v-validate:major="{required:true, maxlength: 20}" >
                        <span class="fc-red" v-show="($validation.major.invalid || validating) && $validation.major.required">请填写主修专业</span>
                        <span class="fc-red" v-show="($validation.major.invalid || validating) && $validation.major.maxlength">不可超过20个字</span>
                    </td>
                    <td class="vm g-pr">
                        <input type="text" class="form-control input-calendar" v-model="stayTime[$index].time" @click.stop="caldate[$index].isShow = true" placeholder="" readonly="true">
                        <Public-Calendar
                                :value.sync="stayTime[$index].time"
                                :show.sync="caldate[$index].isShow"
                                :range="true"
                                :x="calendar.x"
                                :y="calendar.y"
                                :sep.sync="calendar.sep"></Public-Calendar>
                    </td>
                    <td class="vm">
                        <Tool-Selection :select-type-index="1" :all-select-types="type" v-model="item.educationId"></Tool-Selection>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="form-group clearfix">
        <div class="col-sm-12">
            <table class="table table-striped table-hover table-bordered g-fr">
                <thead>
                <th>专业证书</th>
                <th>获取年份</th>
                </thead>
                <tbody>
                <tr v-for="item in post.employeeCertificate">
                    <td><input type="text" class="form-control" v-model="item.certificate" ></td>
                    <td class=" g-pr">
                        <input type="text" class="form-control input-calendar" v-model="item.getTime" @click.stop="cal[$index].staySchoolShow = true" placeholder="" readonly="true">
                        <Public-Calendar
                                :value.sync="item.getTime"
                                :show.sync="cal[$index].staySchoolShow"
                                :x="calendar.x"
                                :y="calendar.y"
                                :sep.sync="calendar.sep"></Public-Calendar>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</Tip-border> -->
        <Tip-border tip="教育程度">
          <validator name="edu">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label ">学校名称：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeEducational.school" placeholder="" v-validate:school="{required:true, maxlength: 20}">
                <!-- v-validate:school="{required:true, maxlength: 40}" 取消校验 -->
                <span class="fc-red" v-show="($edu.school.touched || validating) && $edu.school.required  && addAgain_school">请填写学校名称</span>
                <span class="fc-red" v-show="($edu.school.touched || validating) && $edu.school.maxlength">最多可填写40个字符(20个汉字)</span>
            </div>

            <label for="" class="col-sm-2 control-label ">主修专业：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeEducational.major" placeholder="" v-validate:major="{required:true, maxlength: 20}" placeholder="">
                <span class="fc-red" v-show="($edu.major.touched || validating) && $edu.major.required && addAgain_school">请填写主修专业</span>
                <span class="fc-red" v-show="($edu.major.touched || validating) && $edu.major.maxlength">最多可填写40个字符(20个汉字)</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label ">在校期间：</label>
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

            <label for="" class="col-sm-2 control-label ">获得学历：</label>
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
            <!-- <Tip-border tip="紧急联系人">
            <validator name="ecp">
                <div class="form-group clearfix">
                    <div class="col-sm-12">
                        <table class="table table-striped table-hover table-bordered g-fr archives">
                            <thead>
                            <th>姓名</th>
                            <th>联系电话</th>
                            <th>职业</th>
                            <th>认识年限</th>
                            <th>地址</th>
                            </thead>
                            <tbody>
                            <tr v-for="item in post.employeeContacts">
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.contactsName" v-validate:ecpname="['required']" >
                                    <span class="fc-red" v-show="($ecp.ecpname.touched || validating) && $ecp.ecpname.required && addAgain_ecp">必填项</span>
                                    <span class="fc-red" v-show="($validation.ecpname.invalid || validating) && $validation.ecpname.required">必填项</span>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.mobile" v-validate:ecpphone="['validate_mobilePhone']">
                                    <span class="fc-red" v-show="($ecp.ecpphone.touched || validating) && $ecp.ecpphone.validate_mobilePhone && addAgain_ecp">请填写正确的手机号码</span>
                                    <span class="fc-red" v-show="($validation.ecpphone.invalid || validating) && $validation.ecpphone.validate_mobilePhone">请填写正确的手机号码</span>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.profession" v-validate:ecpjob="['required']" >
                                    <span class="fc-red" v-show="($ecp.ecpjob.touched || validating) && $ecp.ecpjob.required && addAgain_ecp">必填项</span>
                                    <span class="fc-red" v-show="($validation.ecpjob.invalid || validating) && $validation.ecpjob.required">必填项</span>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.contactsYears"v-validate:ecpyears="['required']">
                                    <span class="fc-red" v-show="($ecp.ecpyears.touched || validating) && $ecp.ecpyears.required && addAgain_ecp">必填项</span>
                                    <span class="fc-red" v-show="($validation.ecpyears.invalid || validating) && $validation.ecpyears.required">必填项</span>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.contactsAddress" v-validate:ecpaddress="['required']">
                                    <span class="fc-red" v-show="($ecp.ecpaddress.touched || validating) && $ecp.ecpaddress.required && addAgain_ecp">必填项</span>
                                    <span class="fc-red" v-show="($validation.ecpaddress.invalid || validating) && $validation.ecpaddress.required">必填项</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </validator>
            </Tip-border> -->


        <Tip-border tip="紧急联系人">
        <validator name="ecp">
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">姓名：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.contactsName" placeholder="" v-validate:ecpname="['required']">
                <span class="fc-red" v-show="($ecp.ecpname.touched || validating) && $ecp.ecpname.required && addAgain_ecp">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label">联系电话：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.mobile" placeholder="" v-validate:ecpphone="['validate_mobilePhone']">
                <span class="fc-red" v-show="($ecp.ecpphone.touched || validating) && $ecp.ecpphone.validate_mobilePhone && addAgain_ecp">请填写正确的手机号码</span>
            </div>
          </div>

          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label">职业：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.profession" placeholder="" v-validate:ecpjob="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($ecp.ecpjob.touched || validating) && $ecp.ecpjob.required && addAgain_ecp">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label">认识年限：</label>
            <div class="col-sm-4" v-validate-class>
                <input type="text" class="form-control" v-model="employeeContacts.contactsYears" placeholder="" v-validate:ecpyears="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($ecp.ecpyears.touched || validating) && $ecp.ecpyears.required && addAgain_ecp">必填项</span>
            </div>
          </div>
          <div class="form-group g-marginB20 clearfix">
              <label for="" class="col-sm-2 control-label">地址：</label>
              <div class="col-sm-10" v-validate-class>
                  <input type="text" name="" id="" class="form-control" v-model="employeeContacts.contactsAddress" v-validate:ecpaddress="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($ecp.ecpaddress.touched || validating) && $ecp.ecpaddress.required && addAgain_ecp">必填项</span>
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

            <!-- <Tip-border tip="家庭成员">
                <div class="form-group clearfix">
                    <div class="col-sm-12">
                        <table class="table table-striped table-hover table-bordered g-fr archives">
                            <thead>
                            <th>姓名</th>
                            <th>联系电话</th>
                            <th>关系</th>
                            <th>地址</th>
                            </thead>
                            <tbody>
                            <tr v-for="item in post.employeeFamily">
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.name" readonly>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.mobile" readonly>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.relation" readonly>
                                </td>
                                <td class="vm" v-validate-class>
                                    <input type="text" class="form-control" v-model="item.address" readonly>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Tip-border> -->

        <Tip-border tip="家庭成员">
          <validator name='fms'>
          <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label ">姓名：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control" v-model="employeeFamily.name" placeholder="" v-validate:fms-name="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsName.touched || validating) && $fms.fmsName.required && addAgain_fms">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label ">关系：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control" v-model="employeeFamily.relation" placeholder="" v-validate:fms-relation="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsRelation.touched || validating) && $fms.fmsRelation.required && addAgain_fms">必填项</span>
            </div>

            <label for="" class="col-sm-2 control-label ">电话：</label>
            <div class="col-sm-2" v-validate-class>
                <input type="text" class="form-control" v-model="employeeFamily.mobile" placeholder="" v-validate:fms-phone="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsPhone.touched || validating) && $fms.fmsPhone.required && addAgain_fms">必填项</span>
            </div>
          </div>
          <div class="form-group g-marginB20 clearfix">
              <label for="" class="col-sm-2 control-label ">联系地址：</label>
              <div class="col-sm-10" v-validate-class>
                  <input type="text" name="" id="" class="form-control" v-model="employeeFamily.address" v-validate:fms-address="{required:true, maxlength: 40}">
                <span class="fc-red" v-show="($fms.fmsAddress.touched || validating) && $fms.fmsAddress.required && addAgain_fms">必填项</span>
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

            <!-- <Tip-border tip="附件">
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
            </Tip-border> -->
        <Tip-border tip="添加附件信息">
          <div class="form-group clearfix">
              <label class="col-sm-2 control-label">身份证正面：</label>
              <div class="col-sm-2">
                  <Tool-Upload :files.sync="post.frontFileList" :resource-id="post.id" :resource-type="'2'"></Tool-Upload>
              </div>
              <label class="col-sm-2 control-label">身份证背面：</label>
              <div class="col-sm-2">
                  <Tool-Upload :files.sync="post.backFileList" :resource-id="post.id" :resource-type="'3'"></Tool-Upload>
              </div>
              <label class="col-sm-2 control-label">学历：</label>
              <div class="col-sm-2">
                  <Tool-Upload :files.sync="post.certificateList" :resource-id="post.id" :resource-type="'4'"></Tool-Upload>
              </div>
          </div>
        </Tip-border>
    </validator>
    <div class="form-group g-tc g-marginT20">
        <button type="button" class="btn btn-primary g-marginR30" @click="onSubmit">保存修改</button>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import PublicTable from '../../components/public/PublicTable.vue';
    import * as type from '../../constants/globalSelectTypes'
    import ToolSelection from '../../components/public/ToolSelection'
    import ToolUpload from '../../components/public/ToolUpload'
    import PublicCalendar from '../../components/public/PublicCalendar'
    import PublicModal from '../../components/public/PublicModal';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';    
    export default{
        components: {
            Crumb,
            TipBorder,
            ProcessApprove,
            ProcessDiagram,
            PublicTable,
            ToolSelection,
            ToolUpload,
            PublicCalendar,
            PublicModal
        },
        validators:{
            validate_enname: function (val/*,rule*/) {
                return /^[A-Za-z]{0,15}$/.test(val)
            },
            validate_fixedphone: function (val) {
                if (val.trim()=='') {
                    return true
                }else{
                    return  /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/.test(val)
                }
            },
            validate_email: function (val) {
                return  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(val)
            },
            validate_mobilePhone: function (val) {
                return  /^1[34578]\d{9}$/.test(val)
            },
              validate_weight: function (val) {
                return /^[+]?\d{0,3}$/.test(val)
              },
              validate_vision: function (val) {
                return  /^\d{0,1}(\.\d+)?$/.test(val)
              },
              validate_school: function (val) {
                return  /^[\u4E00-\u9FA5]{2,20}$/g.test(val)
              },
               validate_nativeplace: function (val) {
                return  /^[\u4E00-\u9FA5]{2,10}$/g.test(val)
              },
              validate_insuredPlace: function (val) {
                return  /^[\u4E00-\u9FA5]{0,20}$/g.test(val)
              },
              validate_postalcode: function (val) {
                return  /^[1-9][0-9]{5}$/.test(val)
              }
        },
        data: function(){
            return {
                type: [
                    type.MARITAL_STATUS,
                    type.EMPLOYEE_EDUCATION,
                    type.BLOOD_TYPE,
                    type.TEST_PERIOD,
                    type.CONTRACT_TYPE,
                    type.AGENT_COMPANY
                ],
                options: undefined,
                confirm: undefined,
                cancel: undefined,
                close: undefined,
                validating: false,
                businessKey:'',
                cardDate:'',
                stayTime:[],
                cal:[],
                caldate:[],
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
                post:{
                    id: '', // 来自业务编码接口返回结果
                    enName: '',// 英文名字
                    maritalStatusId: '',// 婚姻状况
                    telephone: '',//家庭固定电话
                    email: '',//邮箱
                    address: '',//通讯地址
                    positionsId:'', //职位id
                    employeeCompanyId:'',

                    kg: '',// 体重
                    eyeDesc: '',  //视力
                    height: '',//身高
                    bloodType: '',//血型
                    postCode: '', // 邮政编码
                    cardNoSource: '',//户籍证地址
                    cardStartDate: '',// 身份证开始时间
                    cardEndDate: '',// 身份证结束时间
                    bankNo:'',//银行卡号
                    bankBranch:'',//开户行
                    socialSecurityNo: '',//个人社保号
                    socialSecuritySource: '',//参保地

                    employeeFamily: [],// 家庭联系人
                    employeeEducational: [], // 教育信息
                    frontFileList: [],  //附件:身份证正面
                    backFileList: [],   //附件:身份证背面
                    certificateList: [],    //附件:证书证明图片
                        employeeLeaveEmployer: [],//以往雇主
                        employeeCertificate: [],// 证书信息
                        employeeContacts: [],// 紧急联系人信息
                    employeeCompany:{
                        agentCompany:'', //待办单位
                        testType:'', //试用期
                        contractType:'', //合同类型
                        contractTime:'', //合同次数
                        conStartDate:'', //合同开始日期
                        conEndDate:'', //合同结束日期
                    }
                },
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

                cnName: '',// 中文名字
                officeName: '', // 申请部门
                entrantTime: '', // 入职时间
                workplaceDisplay: '', // 入职地点

                sexId: '',// 性别id
                sexDisplay: '',// 性别显示

                maritalStatusDisplay: '',// 婚姻状况显示

                cardNo: '',// 身份证号码

                userMobile: '',//  手机号码

                birthday: '',//出生日期
                familySource: '',//籍贯


                familyId: '',// 户口性质
                familyDisplay: '',// 户口性质显示
                nation: '',//民族


                baseId: '', // 来自查询入职员工信息接口返回结果
                serialNo: '',//业务编码
                urgencyDegreeId: '',//紧急程度id

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
                                console.log(this.$parent.employeeCertificate)
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
                },
                addAgain_school: true,
                addAgain_ecp: true,
                addAgain_fms: true,
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
                          name: 'educationDisplay',
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
                }                
            }
        },
        created: function(){
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[2].match(/\w+/)[0];
        },
        asyncData: function (resolve, reject) {
            let vm = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETBASEINFOBYID, {id: this.businessKey}).then((response) => {
                let result = response.json().result;
                resolve({
                    'post.id': result.id, // 来自业务编码接口返回结果
                    'post.enName': result.enName,// 英文名字
                    'post.maritalStatusId': result.maritalStatusId,// 婚姻状况
                    'post.telephone': result.telephone,//家庭固定电话
                    'post.email': result.email,//邮箱
                    'post.address': result.address,//通讯地址

                    'post.positionsId': result.positionsId,       //当前职位id
                    'post.employeeCompanyId': result.employeeCompanyId,       //当前职位id

                    'post.kg':result.kg,    //体重
                    'post.eyeDesc':result.eyeDesc,    //视力
                    'post.height':result.height,    //身高
                    'post.bloodType':result.bloodType,    //血型
                    'post.postCode':result.postCode,    //邮政编码
                    'post.cardNoSource':result.cardNoSource,    //户籍证地址
                    'post.cardStartDate':result.cardStartDate,    //身份证开始时间
                    'post.cardEndDate':result.cardEndDate,    //身份证结束时间
                    'post.bankNo':result.bankNo,    //银行卡号
                    'post.bankBranch':result.bankBranch,    //开户行
                    'post.socialSecurityNo':result.socialSecurityNo,    //个人社保号
                    'post.socialSecuritySource':result.socialSecuritySource,    //参保地
                    'post.employeeCompany.agentCompany':result.agentCompany,    //代办单位
                    'post.employeeCompany.contractType':result.contractType,    //合同类型
                    'post.employeeCompany.testType':result.testType,    //试用期
                    'post.employeeCompany.contractTime':result.contractTime,    //合同次数
                    'post.employeeCompany.conStartDate':result.conStartDate,    //合同开始日期
                    'post.employeeCompany.conEndDate':result.conEndDate,    //合同结束时间

                    'post.employeeFamily': (result.employeeFamily?result.employeeFamily:[]),// 家庭联系人


                    'post.employeeLeaveEmployer': (result.employeeLeaveEmployer?result.employeeLeaveEmployer:[]),//以往雇主
                    'post.employeeEducational': (result.employeeEducational?result.employeeEducational:[]), // 教育信息
                    'post.employeeCertificate': (result.employeeCertificate?result.employeeCertificate:[]),// 证书信息
                    'post.employeeContacts': (result.employeeContacts?result.employeeContacts:[]),// 紧急联系人信息


                    'positionList': result.positionList,    //职位列表
                    'cnName': result.cnName,// 中文名字
                    'officeName': result.officeName, // 申请部门

                    'entrantTime': result.entrantTime, // 入职时间
                    'workplaceDisplay': result.workplaceDisplay, // 入职地点


                    'sexId': result.sexId,// 性别id
                    'sexDisplay': result.sexDispay,// 性别显示

                    'maritalStatusDisplay': result.maritalStatusDispay,// 婚姻状况显示
                    'cardNo': result.cardNo,// 身份证号码
                    'cardDate': result.cardStartDate + '~'+ result.cardEndDate,// 身份证有效日期
                    'userMobile': result.mobile,//  手机号码

                    'birthday': result.birthday,//出生日期
                    'familySource': result.familySource,//籍贯
                    'familyId': result.familyId,// 户口性质
                    'familyDisplay': result.familyDispay,// 户口性质显示
                    'nation': result.nation,//民族



                    'baseId': result.baseId, // 来自查询入职员工信息接口返回结果
                    'serialNo': '',//业务编码
                    'urgencyDegreeId': result.urgencyDegreeId,//紧急程度id

                });
                for (var i = 0; i < vm.post.employeeEducational.length; i++) {
                    vm.stayTime.push({ time: vm.post.employeeEducational[i].startTime +' ~ '+vm.post.employeeEducational[i].endTime});
                }
                for (var i = 0; i < vm.post.employeeCertificate.length; i++) {
                    vm.cal.push({ staySchoolShow: false});
                }
                for (var i = 0; i < vm.post.employeeEducational.length; i++) {
                    vm.caldate.push({ isShow: false});
                }
            });
            //获取文件列表
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
                    'post.frontFileList': frontFileList,
                    'post.backFileList': backFileList,
                    'post.certificateList': certificateList
                })
            });
            // vm.resetData();
        },
        methods: {
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
              this.addAgain_ecp = true
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
              vm.addAgain_ecp = false;
            },
            deleteContact: function(index){ // 紧急联系人列表删除
              this.post.employeeContacts.splice(index,1);
            },            
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
            deleteEdu: function (index){
              this.post.employeeEducational.splice(index,1);
            },
            saveEducation: function (){ // 存储教育信息
              this.addAgain_school = true;
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
              temp.educationDisplay = vm.eduDisplayFun(temp.educationId)
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
              vm.addAgain_school = false;
            },
            eduDisplayFun:function (id) {
                let nid = parseInt(id)
                switch (nid) {
                    case 0:
                        return '小学及以下'
                    break;
                
                    case 1:
                        return '初中'
                    break;
                
                    case 2:
                        return '高中'
                    break;

                    case 3:
                        return '中专'
                    break;              

                     case 4:
                        return '大专'
                    break;              

                     case 5:
                        return '本科'
                    break;              

                     case 6:
                        return '研究生'
                    break;              

                     case 7:
                        return '博士及以上'
                    break;              

                     default:
                        return '无此学历选项'
                    break;              

                }
            },
            saveFamily: function(){ // 存储家庭成员
              this.addAgain_fms = true
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
              vm.addAgain_fms = false;
            },
            deleteFamily: function(index){ // // 家庭成员列表删除
              this.post.employeeFamily.splice(index,1);
            },
            onSubmit: function () {
                let vm = this;
                // this.saveEducation2();

              if(vm.post.employeeEducational.length == 0){
                vm.options = {
                  title: '温馨提示',
                  message: '请填写至少一项教育经历信息!',
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
                vm.addAgain_school = false;
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
                vm.addAgain_ecp = false;
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
                vm.addAgain_fms = false;
              }
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
                // console.log(this.post)
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_UPDATEBASEINFO, this.post).then((response) => {
                    let status = response.json().status;
                    if(status == 0){
                        vm.options = {
                            title: '温馨提示',
                            message: '修改成功!',
                            icon: 'success',
                            isShow: true
                        };
                        vm.confirm = {
                            text: '确定',
                            callback: function () {
                                vm.$router.go('/hr/arc');
                                vm.options.isShow = false;
                            }
                        };
                    }
                });
            },
            cancelProcess: function () {
                let vm = this;
                vm.options = {
                    title: '温馨提示',
                    message: '您确定要取消修改吗？',
                    isShow: true
                };
                vm.confirm = {
                    text: '确定',
                    callback: function () {
                        vm.$router.go('/hr/arc');
                        vm.options.isShow = false;
                    }
                };
                vm.cancel = {
                    text: '取消',
                    callback: function () {
                        vm.options.isShow = false;
                    }
                };

            },
            saveEducation2: function (){
                let vm = this,temp = {};
                for (var i = 0; i < vm.post.employeeEducational.length; i++) {
                    [temp.startTime,temp.endTime] = vm._trim(vm.stayTime[i].time).split('~');
                    delete temp.stayTime;
                    vm.post.employeeEducational[i].startTime = temp.startTime;
                    vm.post.employeeEducational[i].endTime = temp.endTime;
                }
            },
            _trim: function (str){
                return str.replace(/\s/g,"");
            },
        }
    }
</script>
<style lang="less">
    .archives td.vm{vertical-align: middle}
</style>