<!-- 流程中心 --- 我的申请 -- 我的录用申请 -->
<template>
    <h3 class="u-fs20 g-tc g-marginB20">录用审批申请</h3>
    <validator name="validation">
        <form class="clearfix" novalidate>
            <Tip-border tip="录用基本信息">
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label g-tr">录用编号：</label>
                    <div class="col-sm-4">
                        <span class="writing" >{{datas.serialNo}}</span>
                    </div>
                    <label for="" class="col-sm-2 control-label g-tr" type="date">被录用人：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.cnName}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">


                    <label for="" class="col-sm-2 control-label g-tr">申请部门：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.applyOfficeName}}</span>
                    </div>
                    <label for="" class="col-sm-2 control-label g-tr" type="date">录用时间：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.entrantTime}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">

                    <label for="" class="col-sm-2 control-label g-tr">紧急程度：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.urgencyDegreeIdLabel}}</span>
                    </div>
                    <label for="" class="col-sm-2 control-label g-tr" type="date">录用部门：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.officeName}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label g-tr">性质：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.employeeNatureIdLabel}}</span>
                    </div>

                    <label for="" class="col-sm-2 control-label g-tr" type="date">职位：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.postionName}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label g-tr">入职方式：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.inductionFormIdLabel}}</span>
                    </div>
                    <label for="" class="col-sm-2 control-label g-tr" type="date">职级：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.positionsLevelIdLabel}}</span>
                    </div>
                </div>
                <div class="form-group clearfix">
                    <label for="" class="col-sm-2 control-label g-tr" type="date">入职地点：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.workplaceIdLabel}}</span>
                    </div>
                    <!-- <label for="" class="col-sm-2 control-label g-tr" type="date">合同所属公司：</label>
                    <div class="col-sm-4">
                        <span class="writing g-tf">{{datas.contractCompanyDisplay}}</span>
                    </div> -->
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
                            <tr v-for="items in datas.assessmentList">
                                <th>{{ items.label }}</th>
                                <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="0" disabled></td>
                                <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="1" disabled></td>
                                <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="2" disabled></td>
                                <td><input type="radio" name="hr{{$index}}" v-model="items.score" value="3" disabled></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">简况及评语：</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" rows="3" v-model="datas.testComment"
                                  @touched="onTouched('testcomment')"
                                  v-validate:testcomment="{ required: true,  maxlength: 200 }" readonly></textarea>
                        <p class="v-red">{{valida.testcomment}}</p>
                    </div>
                </div>
            </Tip-border>
            <Tip-border tip="职位薪酬">
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">试用薪酬(元)*：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.testSalary}}</span>
                    </div>
                <div v-if="isShowFormalSalary">
                    <label class="col-sm-2 control-label">转正薪酬(元)*：</label>
                    <div class="col-sm-4">
                        <span class="writing">{{datas.formalSalary}}</span>
                    </div>
                </div>
                </div>
                <div class="form-group clearfix">
                    <label class="col-sm-2 control-label">附件下载：</label>
                    <div class="col-sm-4">
                        <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
                    </div>
                </div>
            </Tip-border>
            <!-- 部门复试-可以编辑-->
            <Tip-border tip="部门复试" v-if="this.Competence.taskFormKey == 'acceptance_deptrespon'">
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
                            <tr v-for="reass in datas.reAssessmentList">
                                <th>{{ reass.label }}</th>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="0"></td>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="1"></td>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="2"></td>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="3"></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">简况及评语：</label>
                    <div class="col-sm-10" v-validate-class>
                        <textarea class="form-control" rows="3" v-model="datas.retestComment"
                                  @touched="onTouched('retestcomment')"
                                  v-validate:retestcomment="{ required: true,  maxlength: 200 }" ></textarea>
                        <p class="v-red">{{valida.retestcomment}}</p>
                    </div>
                </div>
            </Tip-border>
            <!-- 部门复试-可查看-->
            <Tip-border tip="部门复试" v-if="this.Competence.taskFormKey == 'acceptance_hr' ||
                                           this.Competence.taskFormKey == 'acceptance_zjl' ||
                                           this.Competence.taskFormKey == 'acceptance_zc'">
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
                            <tr v-for="reass in datas.reAssessmentList">
                                <th>{{ reass.label }}</th>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="0" disabled></td>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="1" disabled ></td>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="2" disabled></td>
                                <td><input type="radio" name="{{$index}}" v-model="reass.score" value="3" disabled></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="form-group g-marginB20 clearfix">
                    <label class="col-sm-2 control-label">简况及评语：</label>
                    <div class="col-sm-10">
                        <textarea class="form-control" rows="3" v-model="datas.retestComment" readonly></textarea>
                    </div>
                </div>
            </Tip-border>
            <!-- 部门建议-可以编辑-->
            <Tip-border tip="部门建议" v-if="(this.Competence.taskFormKey == 'acceptance_deptrespon')&&!isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">建议工资*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.suggesTestSalary"
                               @touched="onTouched('suggest')"
                               v-validate:suggest="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.suggest}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.performanceTestSalary"
                               @touched="onTouched('performancet')"
                               v-validate:performancet="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.performancet}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他津贴*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.otherTestSalary"
                               @touched="onTouched('othertestsalary')"
                               v-validate:othertestsalary="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.othertestsalary}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">合计：</label>
                    <div class="col-sm-4">
                      <span class="writing">{{deptTotal}}</span>
                    </div>
                </div>
            </Tip-border>
            <Tip-border tip="部门建议" v-if="(this.Competence.taskFormKey == 'acceptance_deptrespon')&&isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">建议工资*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.suggesTestSalary"
                               @touched="onTouched('suggest')"
                               v-validate:suggest="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.suggest}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.suggesFormalSalary"
                               @touched="onTouched('suggesf')"
                               v-validate:suggesf="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.suggesf}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.performanceTestSalary"
                               @touched="onTouched('performancet')"
                               v-validate:performancet="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.performancet}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.performancesFormalSalary"
                               @touched="onTouched('performancesf')"
                               v-validate:performancesf="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.performancesf}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他津贴*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.otherTestSalary"
                               @touched="onTouched('othertestsalary')"
                               v-validate:othertestsalary="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.othertestsalary}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.otherFormalSalary"
                               @touched="onTouched('otherformalsalary')"
                               v-validate:otherformalsalary="{required: { rule: true },numeric : { rule: true }}" maxlength="9">
                        <p class="v-red">{{valida.otherformalsalary}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">合计：</label>
                    <div class="col-sm-4">
                      <span class="writing">{{deptTotal}}</span>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">合计：</label>
                    <div class="col-sm-4">
                      <span class="writing">{{deptFormalTotal}}</span>
                    </div>
                </div>
            </Tip-border>

            <!-- 部门建议-可查看-->
            <Tip-border tip="部门建议" v-if="(this.Competence.taskFormKey == 'acceptance_hr' ||
                                           this.Competence.taskFormKey == 'acceptance_zjl' ||
                                           this.Competence.taskFormKey == 'acceptance_zc')&&!isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">建议工资*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.suggesTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.performanceTestSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他津贴*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.otherTestSalary" readonly>
                    </div>
                </div>
            </Tip-border>

            <Tip-border tip="部门建议" v-if="(this.Competence.taskFormKey == 'acceptance_hr' ||
                                           this.Competence.taskFormKey == 'acceptance_zjl' ||
                                           this.Competence.taskFormKey == 'acceptance_zc')&&isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">建议工资*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.suggesTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.suggesFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.performanceTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.performancesFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他津贴*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.otherTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.otherFormalSalary" readonly>
                    </div>
                </div>
            </Tip-border>
            <Tip-border tip="人事部确定" v-if="(this.Competence.taskFormKey == 'acceptance_hr')&&!isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">基本工资*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.baseTestSalary"
                               @touched="onTouched('basetestsalary')"
                               v-validate:basetestsalary="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.basetestsalary}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">保密工资*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.secrecyTestSalary"
                               @touched="onTouched('secrecyt')"
                               v-validate:secrecyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.secrecyt}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他补贴*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.otherSubsidyTestSalary"
                               @touched="onTouched('othersubsidyt')"
                               v-validate:othersubsidyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.othersubsidyt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">加班补贴*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.overSubsidyTestSalary"
                               @touched="onTouched('oversubsidyt')"
                               v-validate:oversubsidyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.oversubsidyt}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">午餐补助*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.lunchSubsidyTestSalary"
                               @touched="onTouched('lunchsubsidyt')"
                               v-validate:lunchsubsidyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.lunchsubsidyt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.achievementTestSalary"
                               @touched="onTouched('achievementt')"
                               v-validate:achievementt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.achievementt}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">合计：</label>
                    <div class="col-sm-4">
                      <span class="writing totalRed">{{hrTotal}}</span>
                    </div>
                </div>
            </Tip-border>
            <Tip-border tip="人事部确定" v-if="(this.Competence.taskFormKey == 'acceptance_hr')&&isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">基本工资*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.baseTestSalary"
                               @touched="onTouched('basetestsalary')"
                               v-validate:basetestsalary="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.basetestsalary}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.baseFormalSalary"
                               @touched="onTouched('baseformalsalary')"
                               v-validate:baseformalsalary="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.baseformalsalary}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">保密工资*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.secrecyTestSalary"
                               @touched="onTouched('secrecyt')"
                               v-validate:secrecyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.secrecyt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.secrecyFormalSalary"
                               @touched="onTouched('secrecyf')"
                               v-validate:secrecyf="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.secrecyf}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他补贴*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.otherSubsidyTestSalary"
                               @touched="onTouched('othersubsidyt')"
                               v-validate:othersubsidyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.othersubsidyt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.otherSubsidyFormalSalary"
                               @touched="onTouched('othersubsidyf')"
                               v-validate:othersubsidyf="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.othersubsidyf}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">加班补贴*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.overSubsidyTestSalary"
                               @touched="onTouched('oversubsidyt')"
                               v-validate:oversubsidyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.oversubsidyt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.overSubsidyFormalSalary"
                               @touched="onTouched('oversubsidyf')"
                               v-validate:oversubsidyf="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.oversubsidyf}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">午餐补助*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.lunchSubsidyTestSalary"
                               @touched="onTouched('lunchsubsidyt')"
                               v-validate:lunchsubsidyt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.lunchsubsidyt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.lunchSubsidyFormalSalary"
                               @touched="onTouched('lunchsubsidyf')"
                               v-validate:lunchsubsidyf="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.lunchsubsidyf}}</p>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.achievementTestSalary"
                               @touched="onTouched('achievementt')"
                               v-validate:achievementt="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.achievementt}}</p>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4" v-validate-class>
                        <input type="text" class="form-control" v-model="datas.achievementFormalSalary"
                               @touched="onTouched('achievementf')"
                               v-validate:achievementf="{required: { rule: true },numeric : { rule: true }}" >
                        <p class="v-red">{{valida.achievementf}}</p>
                    </div>
                </div>
                <!-- <div class="g-marginT20 g-marginB20 clearfix">
                <label class="col-sm-2 control-label g-paddingR0">员工合同所属公司：</label>
                <div class="col-sm-4" v-validate-class>
                    <Tool-Selection :select-type-index="0" :all-select-types="type" v-model="post.contractCompanyValue"
                                        v-validate:contract="{required: true}"></Tool-Selection>
                    <span class="fc-red" v-show="($validation.contract.touched || validating) && $validation.contract.required">必填项</span>
                </div>
                </div> -->
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">合计：</label>
                    <div class="col-sm-4">
                      <span class="writing totalRed">{{hrTotal}}</span>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">合计：</label>
                    <div class="col-sm-4">
                      <span class="writing totalRed">{{hrFormalTotal}}</span>
                    </div>
                </div>
            </Tip-border>
            <!--人事确认可查看-->
            <Tip-border tip="人事部确定" v-if="(this.Competence.taskFormKey == 'acceptance_zjl' ||
                                           this.Competence.taskFormKey == 'acceptance_zc')&&!isShowFormalSalary">
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">基本工资*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.baseTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">保密工资*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.secrecyTestSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他补贴*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.otherSubsidyTestSalary" readonly >
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">加班补贴*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.overSubsidyTestSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">午餐补助*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.lunchSubsidyTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.achievementTestSalary" readonly>
                    </div>
                </div>
            </Tip-border>
            <Tip-border tip="人事部确定" v-if="(this.Competence.taskFormKey == 'acceptance_zjl' ||
                                           this.Competence.taskFormKey == 'acceptance_zc')&&isShowFormalSalary">
                <!--<div class="g-marginT20 g-marginB20 clearfix">-->
                <!--<label class="col-sm-2 control-label g-paddingR0">背景调查*(经理级)</label>-->
                <!--<div class="col-sm-4">-->
                <!--<label>-->
                <!--<input type="radio" value="" placeholder="">-->
                <!--正常-->
                <!--</label>-->
                <!--<label>-->
                <!--<input type="radio" value="" placeholder="">-->
                <!--不正常-->
                <!--</label>-->
                <!--</div>-->
                <!--</div>-->
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">基本工资*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.baseTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.baseFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">保密工资*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.secrecyTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.secrecyFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">其他补贴*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.otherSubsidyTestSalary" readonly >
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.otherSubsidyFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">加班补贴*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.overSubsidyTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.overSubsidyFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">午餐补助*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.lunchSubsidyTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.lunchSubsidyFormalSalary" readonly>
                    </div>
                </div>
                <div class="g-marginT20 g-marginB20 clearfix">
                    <label class="col-sm-2 control-label g-paddingR0">绩效考核*(试用期)</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.achievementTestSalary" readonly>
                    </div>
                    <label class="col-sm-2 control-label g-tr">（转正后）</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" v-model="datas.achievementFormalSalary" readonly>
                    </div>
                </div>
            </Tip-border>
          <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
            <Approve-List :human-task-id="humanTaskId"></Approve-List>
          </Tip-border>
            <div class="form-group g-tc g-marginT20">
                <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)">同意</button>
                <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)">驳回</button>
                <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
            </div>
        </form>
    </validator>

    <Process-Approve v-if="humanTaskId" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
    <Process-Diagram :process-instance-id="taskId"></Process-Diagram>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import ProcessApprove from '../../components/others/ProcessApprove';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ToolSelection from '../../components/public/ToolSelection';
    import ApproveList from '../../components/others/ApproveList';
    import * as type from '../../constants/globalSelectTypes';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            Crumb,
            TipBorder,
            ProcessApprove,
            ToolSelection,
            ProcessDiagram,
            ApproveList
        },
        computed: {
          deptTotal: function(){
            let vm = this;
            let suggesTestSalary = parseInt(vm.datas.suggesTestSalary) || 0;
            let performanceTestSalary = parseInt(vm.datas.performanceTestSalary) || 0;
            let otherTestSalary = parseInt(vm.datas.otherTestSalary) || 0;
            return suggesTestSalary + performanceTestSalary + otherTestSalary;
          },
          deptFormalTotal: function(){
            let vm = this;
            let suggesFormalSalary = parseInt(vm.datas.suggesFormalSalary) || 0;
            let performancesFormalSalary = parseInt(vm.datas.performancesFormalSalary) || 0;
            let otherFormalSalary = parseInt(vm.datas.otherFormalSalary) || 0;
            return suggesFormalSalary + performancesFormalSalary + otherFormalSalary;
          },
          hrTotal: function(){
            let vm = this;
            let baseTestSalary = parseInt(vm.datas.baseTestSalary) || 0;
            let secrecyTestSalary = parseInt(vm.datas.secrecyTestSalary) || 0;
            let otherSubsidyTestSalary = parseInt(vm.datas.otherSubsidyTestSalary) || 0;
            let overSubsidyTestSalary = parseInt(vm.datas.overSubsidyTestSalary) || 0;
            let lunchSubsidyTestSalary = parseInt(vm.datas.lunchSubsidyTestSalary) || 0;
            let achievementTestSalary = parseInt(vm.datas.achievementTestSalary) || 0;
            return baseTestSalary + secrecyTestSalary + otherSubsidyTestSalary + overSubsidyTestSalary /*+ lunchSubsidyTestSalary*/ + achievementTestSalary;
          },
          hrFormalTotal: function(){
            let vm = this;
            let baseFormalSalary = parseInt(vm.datas.baseFormalSalary) || 0;
            let secrecyFormalSalary = parseInt(vm.datas.secrecyFormalSalary) || 0;
            let otherSubsidyFormalSalary = parseInt(vm.datas.otherSubsidyFormalSalary) || 0;
            let overSubsidyFormalSalary = parseInt(vm.datas.overSubsidyFormalSalary) || 0;
            let lunchSubsidyFormalSalary = parseInt(vm.datas.lunchSubsidyFormalSalary) || 0;
            let achievementFormalSalary = parseInt(vm.datas.achievementFormalSalary) || 0;
            return baseFormalSalary + secrecyFormalSalary + otherSubsidyFormalSalary + overSubsidyFormalSalary /*+ lunchSubsidyFormalSalary*/ + achievementFormalSalary;
          }
        },
        data: function(){
            return{
                isShowFormalSalary:false,
                comments:false,
                comment:'',
                isShow: false,
                humanTaskId: '',
                businessKey:'',
                taskId:'',
                //权限
                Competence:{
                    taskFormKey:'',
                },
                //校验
                valida:{
                    testcomment:'',
                    retestcomment:'',
                    suggest:'',
                    suggesf:'',
                    performancet:'',
                    performancesf:'',
                    othertestsalary:'',
                    otherformalsalary:'',
                    basetestsalary:'',
                    baseformalsalary:'',
                    secrecyt:'',
                    secrecyf:'',
                    othersubsidyt:'',
                    othersubsidyf:'',
                    oversubsidyt:'',
                    oversubsidyf:'',
                    lunchsubsidyt:'',
                    lunchsubsidyf:'',
                    achievementt:'',
                    achievementf:'',
                },
                datas: {
                    id:'',
                    serialNo:'',                            //录用申请编号
                    cnName:'',                              //被录用人
                    applyOfficeName:'',                      //申请部门
                    officeName:'',                             //录用部门
                    entrantTime:'',                         //入职时间
                    urgencyDegreeId:'',                          //紧急程度id
                    urgencyDegreeIdLabel:'',                         //紧急程度
                    officeId:'',                                       //部门id
                    employeeNatureId:'',                         //性质id
                    employeeNatureIdLabel:'',                         //性质
                    positionsId:'',                                  //职位id
                    postionName:'',                                 //职位
                    workplaceId:'',                                  //入职地点id
                    workplaceIdLabel:'',                         //入职地点
                    inductionFormId:'',                         //入职方式id
                    inductionFormIdLabel:'',                         //入职方式
                    positionsLevelId:'',                         //职级id
                    positionsLevelIdLabel:'',                         //职级
                    //人力资源初试
                    assessmentList:[
                    ],
                    testComment:'',                      //初试评语
                    testSalary:'',                          //试用薪资
                    formalSalary:'',                          //转正薪资
                    retestComment:'',                          //复试评语
                    //部门复试
                    reAssessmentList:[
                    ],
                    //部门复试考核
                    departtype:'department_retest',
                    suggesTestSalary:'',
                    suggesFormalSalary:'',
                    performanceTestSalary:'',
                    performancesFormalSalary:'',
                    otherTestSalary:'',
                    otherFormalSalary:''
                },
                type: [
                    type.CONTRACT_COMPANY
                ],
                fileList:[],
            }
        },
        asyncData: function (resolve, reject) {
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDAPPLICATION,{id: this.businessKey}).then(function (response) {
                var Data = response.json().result;
                    this.isShowFormalSalaryFun(Data.employeeNatureId)
                if (this.Competence.taskFormKey == 'acceptance_hr') {
                    this.updateDefault(Data);
                };
                resolve({
                    'datas.id' : Data.id,                                                    //录用申请信息主键
                    'datas.serialNo': Data.serialNo,                                         //录用申请编号
                    'datas.contractCompanyDisplay': Data.contractCompanyDisplay,// 员工合同所属公司
                    'datas.cnName': Data.cnName,                                            //被录用人
                    'datas.applyOfficeName': Data.applyOfficeName,                         //申请部门
                    'datas.officeName': Data.officeName,                                    //录用部门
                    'datas.entrantTime': Data.entrantTime,                                   //入职时间
                    'datas.urgencyDegreeId': Data.urgencyDegreeId,                          //紧急程度id
                    'datas.urgencyDegreeIdLabel': Data.urgencyDegreeIdLabel,                         //紧急程度
                    'datas.officeId': Data.officeId,                                        //部门id
                    'datas.employeeNatureId': Data.employeeNatureId,                         //员工性质id
                    'datas.positionNatureValue': Data.positionNatureValue,                         //职位性质，数据字典值，0-普通类；1-技术类
                    'datas.employeeNatureIdLabel': Data.employeeNatureIdLabel,                         //性质
                    'datas.positionsId': Data.positionsId,                                  //职位id
                    'datas.postionName': Data.postionName,                                  //职位
                    'datas.workplaceId': Data.workplaceId,                                 //入职地点id
                    'datas.workplaceIdLabel': Data.workplaceIdLabel,                         //入职地点
                    'datas.inductionFormId': Data.inductionFormId,                         //入职方式id
                    'datas.inductionFormIdLabel': Data.inductionFormIdLabel,                         //入职方式
                    'datas.positionsLevelId ': Data.positionsLevelId,                         //职级id
                    'datas.positionsLevelIdLabel ': Data.positionsLevelIdLabel,                         //职级
                    'datas.assessmentList ': Data.assessmentList,                         //人力资源考核
                    'datas.testComment': Data.testComment,                         //初试评语
                    'datas.testSalary': Data.testSalary,                         //试用薪资
                    'datas.formalSalary': Data.formalSalary,                         //转正薪资
                    'datas.retestComment': Data.retestComment,                         //复试评语
                    'datas.reAssessmentList': Data.reAssessmentList,                         //部门复试
                    'datas.suggesTestSalary': Data.suggesTestSalary,                         //试用期建议工资
                    'datas.suggesFormalSalary': Data.suggesFormalSalary,                        //转正后建议工资
                    'datas.performanceTestSalary': Data.performanceTestSalary,                        //试用期绩效考核
                    'datas.performancesFormalSalary': Data.performancesFormalSalary,                         //转正期绩效考核
                    'datas.otherTestSalary': Data.otherTestSalary,                         //试用期津贴
                    'datas.otherFormalSalary': Data.otherFormalSalary,                        //转正期津贴
                    //背景调查
                    'datas.baseTestSalary': Data.baseTestSalary,                         //试用期基本工资
                    'datas.baseFormalSalary': Data.baseFormalSalary,                         //转正后基本工资
                    'datas.secrecyTestSalary': Data.secrecyTestSalary,                         //试用期保密工资
                    'datas.secrecyFormalSalary': Data.secrecyFormalSalary,                        //转正后保密工资
                    'datas.otherSubsidyTestSalary': Data.otherSubsidyTestSalary,                        //试用期其他补贴
                    'datas.otherSubsidyFormalSalary': Data.otherSubsidyFormalSalary,                         //转正后其他补贴
                    'datas.overSubsidyTestSalary': Data.overSubsidyTestSalary,                        //试用期加班补贴
                    'datas.overSubsidyFormalSalary': Data.overSubsidyFormalSalary,                         //转正期加班补贴
                    'datas.lunchSubsidyTestSalary': Data.lunchSubsidyTestSalary,                         //试用期午餐补贴
                    'datas.lunchSubsidyFormalSalary': Data.lunchSubsidyFormalSalary,                         //转正后午餐补贴
                    'datas.achievementTestSalary': Data.achievementTestSalary,                         //试用期绩效考核
                    'datas.achievementFormalSalary': Data.achievementFormalSalary                         //转正后绩效考核
                })
            })
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                resolve({
                    'fileList': response.json().result
                })
            })
        },
        created: function(){
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[3].match(/\w+/)[0];
            this.humanTaskId = hash[1].match(/\w+/)[0];
            this.taskId = hash[2].match(/\w+/)[0];
            //加载任务列表（权限）
            this.task();
            //加载部门考核
            this.depart();
        },
        validators: {
            numeric: function (val) {
                return /^([1-9]+([0-9]+)?|[0])(\.[0-9]{1,2})?$/.test(val)
            }
        },
        methods: {
            isShowFormalSalaryFun:function (val) {
                let vm = this;
                console.log(val)
                if (val == 3) {
                    vm.isShowFormalSalary = false;
                }else{
                    vm.isShowFormalSalary = true;
                };
            },
            updateDefault: function (data) {
                if (data.employeeNatureId == '3') { //若员工为实习生
                    let standarTest = parseInt(data.suggesTestSalary)  + parseInt(data.performanceTestSalary) + parseInt(data.otherTestSalary);
                    if (standarTest < 2000) { //实习生薪酬<2000,则基本薪酬为实习生实际薪酬（保密、加班补贴、午餐补助、其他补贴、绩效考核均为0）
                        data.baseTestSalary = standarTest;
                    }else{
                        data.baseTestSalary = '2000';
                        if (standarTest <= 2150) {
                            data.overSubsidyTestSalary = (standarTest - 2000).toString()
                        }else{
                            data.overSubsidyTestSalary = '150';
                            if (standarTest <= 2650) {
                                data.secrecyTestSalary = (standarTest-2000-150).toString()
                            }else{
                                data.secrecyTestSalary = '500'
                            };
                        }
                    }

                    let standarFormal = parseInt(data.suggesFormalSalary) + parseInt(data.performancesFormalSalary) + parseInt(data.otherFormalSalary)
                    if (standarFormal < 2000) { //实习生薪酬<2000,则基本薪酬为实习生实际薪酬（保密、加班补贴、午餐补助、其他补贴、绩效考核均为0）
                        data.baseFormalSalary = standarFormal;
                    }else{
                        data.baseFormalSalary = '2000';
                        if (standarFormal <= 2150) {
                            data.overSubsidyFormalSalary = (standarFormal - 2000).toString()
                        }else{
                            data.overSubsidyFormalSalary = '150';
                            if (standarFormal <= 2650) {
                                data.secrecyFormalSalary = (standarFormal-2000-150).toString()
                            }else{
                                data.secrecyFormalSalary = '500'
                            };
                        }
                    }

                }else{  //若员工为正式员工
                    if (data.positionNatureValue == '1') { //若职位性质为技术类职位
                        data.overSubsidyTestSalary = '1000';
                    } else{     //若职位性质为普通类职位
                        switch (data.positionsLevelId) {
                            case '0':
                                data.overSubsidyTestSalary = '150';
                            break;

                            case '1':
                                data.overSubsidyTestSalary = '500';
                            break;

                            case '2':
                                data.overSubsidyTestSalary = '1000';
                            break;

                            case '3':
                                data.overSubsidyTestSalary = '1000';
                            break;

                            case '5':
                                data.overSubsidyTestSalary = '1000';
                            break;

                            case '6':
                                data.overSubsidyTestSalary = '1000';
                            break;

                            default:
                                data.overSubsidyTestSalary = '150';
                            break;
                        }
                    };
                    data.baseTestSalary = '2000';
                    data.baseFormalSalary = '2000';
                    data.secrecyTestSalary = '500';
                    data.secrecyFormalSalary = '500';

                    data.overSubsidyFormalSalary =  data.overSubsidyTestSalary;

                    switch (data.workplaceId) {
                        case '1':   //深圳
                            data.lunchSubsidyTestSalary = '27';
                        break;

                        case '2':   //北京
                            data.lunchSubsidyTestSalary = '27';
                        break;

                        default:
                            data.lunchSubsidyTestSalary = '15';
                        break;
                    }
                    data.lunchSubsidyFormalSalary =  data.lunchSubsidyTestSalary;
                };


            },
            onTouched: function (id) {
                if(this.$validation[id].required){
                    this.valida[id] = '必填项';
                }else if(this.$validation[id].maxlength){
                    this.valida[id] = '不能超过二百字';
                }else if(this.$validation[id].numeric){
                    this.valida[id] = '金额格式错误';
                }
            },
            //审批
            approveProcess: function (e,comments) {
                let vm = this;
                vm.comments = comments;
                if(comments){
                    vm.comment = '同意'
                }else{
                    vm.comment = '不同意'
                }
                if(vm.Competence.taskFormKey == 'acceptance_zjl' || vm.Competence.taskFormKey == 'acceptance_zc' ){
                    vm.isShow = true
                }else{
                    this.$validate(true, function () {
                        if (vm.$validation.invalid) {
                            e.preventDefault()
                        }else{
                            vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEAPPLICATION, vm.datas).then((response) => {
                                let status = response.json().status;
                                if(status == 0){
                                    vm.isShow = true
                                }
                            });
                        }
                    })
                }


            },
            //取消
            cancelProcess: function () {
                this.$router.go('/process/todo')
            },
            //调用部门复试考核接口
            depart: function () {
                let vm = this;
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDASSESSMENTLIST, {type: this.datas.departtype}).then(function (response) {
                    let Data = response.json().result;
                    //判断是否为部门负责人进入
                    if(vm.Competence.taskFormKey == "acceptance_deptrespon"){
                        vm.datas.reAssessmentList = Data;         //调用部门复试接口
                    }
                });
            },
            //获取任务表单权限接口
            task: function(){
                let vm = this;
                this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETTASKFORMBYID, {humanTaskId: this.humanTaskId}).then(function (response) {
                    let Data = response.json().result;
                    vm.Competence.taskFormKey = Data.taskFormKey;
                });
            }

        }
    }
</script>
<style lang="less">
    table.w83{
        width:83%
    }

    span.totalRed{
        color: red;
        font-size: 20px;
        line-height: 20px;
    }

</style>
