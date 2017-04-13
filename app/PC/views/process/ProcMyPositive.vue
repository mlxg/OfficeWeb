<!-- 流程中心 --- 我的申请 -- 我的转正申请 -->
<template>
    <h3 class="u-fs20 g-tc">转正申请</h3>
    <validator name="validation">
        <form class="clearfix" novalidate>
    <Tip-border tip="基本信息">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">招聘编号：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.serialNo}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.cnName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">所在部门：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.createOfficeName}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人部门：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.officeName}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">紧急程度：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.urgencyDegreeDispay}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人职位：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.positionsDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr">入职时间：</label>
            <div class="col-sm-4">
                <span class="writing">{{post.entrantTime}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正人职级：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.positionsLevelDisplay}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr" type="date">计划转正时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.formalTime}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">实际转正时间：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{post.realTime}}</span>
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tr" type="date">转正状态：</label>
            <div class="col-sm-4">
                <span class="writing g-tf">{{zzts}}</span>
            </div>
            <label for="" class="col-sm-2 control-label g-tr" type="date">是否为负责人：</label>
            <div class="col-sm-4" v-if="post.isPrimaryPerson == 1">
                <span class="writing g-tf">是</span>
            </div>
            <div class="col-sm-4" v-else>
                <span class="writing g-tf">否</span>
            </div>
        </div>
        <div v-if="this.Competence.taskFormKey == 'regular_normal_target' || this.Competence.taskFormKey == 'regular_normal_edit'
               || this.Competence.taskFormKey == 'regular_respon_target' || this.Competence.taskFormKey == 'regular_respon_edit'">
            <div class="form-group clearfix" >
                <label for="" class="col-sm-2 control-label g-tr field-require">主要业绩：</label>
                <div class="col-sm-8" v-validate-class>
                <textarea class="form-control" rows="3"  @touched="onTouched('performance')"
                          v-validate:performance="{ required: true,  maxlength: 300 }" v-model="post.performance"></textarea>
                    <p class="v-red">{{valida.performance}}</p>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">上传附件：</label>
                <div class="col-sm-10">
                    <Tool-Upload :files.sync="fileList" :resource-id="post.id" :resource-type="'5'"></Tool-Upload>
                    <span class="u-fc5 upload-desc">(文件大小限制 40M，仅支持以下格式gif,jpg,jpeg,png,bmp,rar,zip,doc,docx,xls,xlsx,ppt,pptx,vsd,vsdx,txt,pdf,wps,html)</span>
                </div>
            </div>
        </div>
        <div v-else="">
            <div class="form-group clearfix">
                <label for="" class="col-sm-2 control-label g-tr">主要业绩：</label>
                <div class="col-sm-8">
                    <span class="writing g-tf">{{post.performance}}</span>
                </div>
            </div>
            <div class="form-group clearfix">
                <label class="col-sm-2 control-label">附件下载：</label>
                <div class="col-sm-4">
                    <a class="upload-down btn-link" v-for="item in fileList" v-if="item" :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
                </div>
            </div>
        </div>

    </Tip-border>

    <!--普通员工评分 部门-->
    <Tip-border tip="转正绩效评估表" v-if="this.Competence.taskFormKey == 'regular_normal_deptheader'">
        <table  class="evaluation">
            <tr>
                <td></td>
                <th>评估指标</th>
                <th>评分</th>
            </tr>
            <tr>
                <th rowspan="3">{{evaluationYg[0].name}}</th>
                <td>
                    <h3>{{evaluationYg[0].index[0].action}}</h3>
                    <p v-for="item in evaluationYg[0].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('achievingtarget')"
                           v-validate:achievingtarget="['numeric']" v-model="post.assessScoreObj.achievingtarget" />
                    <p class="v-red g-marginT20" v-if="$validation.achievingtarget.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[0].index[1].action}}</h3>
                    <p v-for="item in evaluation[0].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('management')"
                           v-validate:management="['numeric']" v-model="post.assessScoreObj.management"/>
                    <p class="v-red g-marginT20" v-if="$validation.management.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[0].index[2].action}}</h3>
                    <p v-for="item in evaluationYg[0].index[2].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('professional')"
                           v-validate:professional="['numeric']" v-model="post.assessScoreObj.professional"/>
                    <p class="v-red g-marginT20" v-if="$validation.professional.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <th>{{evaluationYg[1].name}}</th>
                <td>
                    <h3>{{evaluationYg[1].index[0].action}}</h3>
                    <p v-for="item in evaluationYg[1].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('coordination')"
                           v-validate:coordination="['numeric']" v-model="post.assessScoreObj.coordination"/>
                    <p class="v-red g-marginT20" v-if="$validation.coordination.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <th rowspan="4">{{evaluationYg[2].name}}</th>
                <td>
                    <h3>{{evaluationYg[2].index[0].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('ability')"
                           v-validate:ability="['numeric']" v-model="post.assessScoreObj.ability"/>
                    <p class="v-red g-marginT20" v-if="$validation.ability.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[2].index[1].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('departmental')"
                           v-validate:departmental="['numeric']" v-model="post.assessScoreObj.departmental"/>
                    <p class="v-red g-marginT20" v-if="$validation.departmental.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[2].index[2].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[2].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('resentment')"
                           v-validate:resentment="['numeric']" v-model="post.assessScoreObj.resentment"/>
                    <p class="v-red g-marginT20" v-if="$validation.resentment.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[2].index[3].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[3].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('personal')"
                           v-validate:personal="['numeric']" v-model="post.assessScoreObj.personal"/>
                    <p class="v-red g-marginT20" v-if="$validation.personal.numeric">请打分</p>
                </td>
            </tr>
        </table>
        <div class="form-group clearfix g-marginT20">
            <label for="" class="col-sm-10 control-label g-tr">总分：</label>
            <div class="col-sm-2">
                <span class="writing">{{socreNum}}</span>
            </div>
        </div>
    </Tip-border>
    <!--普通员工评分 HR-->
    <Tip-border tip="转正绩效评估表" v-if="this.Competence.taskFormKey == 'regular_normal_hr'">
        <table  class="evaluation" >
            <tr>
                <td></td>
                <th>评估指标</th>
                <th>评分</th>
            </tr>
            <tr>
                <th rowspan="3">{{evaluationYg[0].name}}</th>
                <td>
                    <h3>{{evaluationYg[0].index[0].action}}</h3>
                    <p v-for="item in evaluationYg[0].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.achievingtarget" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[0].index[1].action}}</h3>
                    <p v-for="item in evaluation[0].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.management" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[0].index[2].action}}</h3>
                    <p v-for="item in evaluationYg[0].index[2].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.professional" readonly/>
                </td>
            </tr>
            <tr>
                <th>{{evaluationYg[1].name}}</th>
                <td>
                    <h3>{{evaluationYg[1].index[0].action}}</h3>
                    <p v-for="item in evaluationYg[1].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.coordination" readonly/>
                </td>
            </tr>
            <tr>
                <th rowspan="4">{{evaluationYg[2].name}}</th>
                <td>
                    <h3>{{evaluationYg[2].index[0].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.ability" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[2].index[1].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.departmental" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[2].index[2].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[2].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.resentment" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluationYg[2].index[3].action}}</h3>
                    <p v-for="item in evaluationYg[2].index[3].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.personal" readonly/>
                </td>
            </tr>
        </table>
        <div class="form-group clearfix g-marginT20">
            <label for="" class="col-sm-10 control-label g-tr">总分：</label>
            <div class="col-sm-2">
                <span class="writing">{{post.assessScoreObj.scoreTolal}}</span>
            </div>
        </div>
    </Tip-border>
    <!--部门负责人评分-->
    <Tip-border tip="转正绩效评估表" v-if="this.Competence.taskFormKey == 'regular_respon_zjl' || this.Competence.taskFormKey == 'regular_respon_zc'"  >
        <table  class="evaluation">
            <tr>
                <td></td>
                <th>评估指标</th>
                <th>评分</th>
            </tr>
            <tr>
                <th rowspan="2">{{evaluation[0].name}}</th>
                <td>
                    <h3>{{evaluation[0].index[0].action}}</h3>
                    <p v-for="item in evaluation[0].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc"  v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('achievingtarget')"
                           v-validate:achievingtarget="['numeric']" v-model="post.assessScoreObj.achievingtarget" />
                    <p class="v-red g-marginT20" v-if="$validation.achievingtarget.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[0].index[1].action}}</h3>
                    <p v-for="item in evaluation[0].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('management')"
                           v-validate:management="['numeric']" v-model="post.assessScoreObj.management" />
                    <p class="v-red g-marginT20" v-if="$validation.management.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <th rowspan="3">{{evaluation[1].name}}</th>
                <td>
                    <h3>{{evaluation[1].index[0].action}}</h3>
                    <p v-for="item in evaluation[1].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('professional')"
                           v-validate:professional="['numeric']" v-model="post.assessScoreObj.professional" />
                    <p class="v-red g-marginT20" v-if="$validation.professional.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[1].index[1].action}}</h3>
                    <p v-for="item in evaluation[1].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('coordination')"
                           v-validate:coordination="['numeric']" v-model="post.assessScoreObj.coordination" />
                    <p class="v-red g-marginT20" v-if="$validation.coordination.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[1].index[2].action}}</h3>
                    <p v-for="item in evaluation[1].index[2].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('ability')"
                           v-validate:ability="['numeric']" v-model="post.assessScoreObj.ability" />
                    <p class="v-red g-marginT20" v-if="$validation.ability.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <th rowspan="2">{{evaluation[2].name}}</th>
                <td>
                    <h3>{{evaluation[2].index[0].action}}</h3>
                    <p v-for="item in evaluation[2].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('departmental')"
                           v-validate:departmental="['numeric']" v-model="post.assessScoreObj.departmental" />
                    <p class="v-red g-marginT20" v-if="$validation.departmental.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[2].index[1].action}}</h3>
                    <p v-for="item in evaluation[2].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('resentment')"
                           v-validate:resentment="['numeric']" v-model="post.assessScoreObj.resentment" />
                    <p class="v-red g-marginT20" v-if="$validation.resentment.numeric">请打分</p>
                </td>
            </tr>
            <tr>
                <th>{{evaluation[3].name}}</th>
                <td>
                    <h3>{{evaluation[3].index[0].action}}</h3>
                    <p v-for="item in evaluation[3].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc" v-validate-class>
                    <input class="form-control" type="text"
                           @touched="onTouched('personal')"
                           v-validate:personal="['numeric']" v-model="post.assessScoreObj.personal" />
                    <p class="v-red g-marginT20" v-if="$validation.personal.numeric">请打分</p>
                </td>
            </tr>
        </table>
        <div class="form-group clearfix g-marginT20">
            <label for="" class="col-sm-10 control-label g-tr">总分：</label>
            <div class="col-sm-2">
                <span class="writing">{{socreNum}}</span>
            </div>
        </div>
    </Tip-border>
    <!--部门负责人评分-->
    <Tip-border tip="转正绩效评估表" v-if="this.Competence.taskFormKey == 'regular_respon_hr'"  >
        <table  class="evaluation">
            <tr>
                <td></td>
                <th>评估指标</th>
                <th>评分</th>
            </tr>
            <tr>
                <th rowspan="2">{{evaluation[0].name}}</th>
                <td>
                    <h3>{{evaluation[0].index[0].action}}</h3>
                    <p v-for="item in evaluation[0].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.achievingtarget" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[0].index[1].action}}</h3>
                    <p v-for="item in evaluation[0].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.management" readonly/>
                </td>
            </tr>
            <tr>
                <th rowspan="3">{{evaluation[1].name}}</th>
                <td>
                    <h3>{{evaluation[1].index[0].action}}</h3>
                    <p v-for="item in evaluation[1].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.professional" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[1].index[1].action}}</h3>
                    <p v-for="item in evaluation[1].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.coordination" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[1].index[2].action}}</h3>
                    <p v-for="item in evaluation[1].index[2].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.ability" readonly/>
                </td>
            </tr>
            <tr>
                <th rowspan="2">{{evaluation[2].name}}</th>
                <td>
                    <h3>{{evaluation[2].index[0].action}}</h3>
                    <p v-for="item in evaluation[2].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.departmental" readonly/>
                </td>
            </tr>
            <tr>
                <td>
                    <h3>{{evaluation[2].index[1].action}}</h3>
                    <p v-for="item in evaluation[2].index[1].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.resentment" readonly/>
                </td>
            </tr>
            <tr>
                <th>{{evaluation[3].name}}</th>
                <td>
                    <h3>{{evaluation[3].index[0].action}}</h3>
                    <p v-for="item in evaluation[3].index[0].rat">{{item.a}}</p>
                </td>
                <td class="g-tc">
                    <input class="form-control" type="text" v-model="post.assessScoreObj.personal" readonly/>
                </td>
            </tr>
        </table>
        <div class="form-group clearfix g-marginT20">
            <label for="" class="col-sm-10 control-label g-tr">总分：</label>
            <div class="col-sm-2">
                <span class="writing">{{post.assessScoreObj.scoreTolal}}</span>
            </div>
        </div>
    </Tip-border>

    <Process-Diagram v-if="this.taskId != 0" :process-instance-id="taskId"></Process-Diagram>
    <Tip-border v-if="this.humanTaskId != 0" tip="审批意见">
        <Approve-List :human-task-id="humanTaskId"></Approve-List>
    </Tip-border>

        </form>
    </validator>
    <Process-Approve v-if="humanTaskId" :comments="comments" :comment="comment" :show.sync="isShow" :id="humanTaskId"></Process-Approve>
    <div class="form-group g-tc g-marginT20">
        <button v-if="this.Competence.taskFormKey == 'regular_normal_edit' || this.Competence.taskFormKey == 'regular_normal_target'
        || this.Competence.taskFormKey == 'regular_respon_target' || this.Competence.taskFormKey == 'regular_respon_edit'
        " type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,true)">提交</button>
        <span v-else="">
            <button type="button" class="btn btn-primary g-marginR30" @click="approveProcess($event,true)">同意</button>
            <button type="button" class="btn btn-default g-marginR30" @click="approveProcess($event,false)">驳回</button>
        </span>
        <button type="button" class="btn btn-default" @click="cancelProcess">取消</button>
    </div>
    <Look-Screen :lookscreen="lookscreen"></Look-Screen>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import TipBorder from '../../components/public/TipBorder.vue';
    import * as type from '../../constants/globalSelectTypes';
    import ProcessDiagram from '../../components/others/ProcessDiagram';
    import ApproveList from '../../components/others/ApproveList';
    import ToolSelection from '../../components/public/ToolSelection.vue';
    import ToolUpload from '../../components/public/ToolUpload';
    import LookScreen from '../../components/public/LockScreen.vue'
    import ProcessApprove from '../../components/others/ProcessApprove';
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        props: ['taskId', 'businessKey', 'humanTaskId'],
        components: {
            Crumb,
            TipBorder,
            ProcessDiagram,
            ApproveList,
            ToolSelection,
            ProcessApprove,
            ToolUpload,
            LookScreen
        },
        data: function(){
            return {
                comments:false,
                comment:'',
                isShow: false,
                type: [
                    type.ASSESS_RESULT,   //数据字典 评估结果
                ],
                humanTaskId: '',
                businessKey:'',
                taskId:'',
                aaaa:'100',
                post:{
                    id:'',
                    serialNo:'',
                    urgencyDegreeId:'',
                    urgencyDegreeDispay:'',
                    formalTime:'',
                    realTime:'',
                    performance:'',
                    delayTime:'',
                    applyType:'',
                    employeeBaseId:'',
                    entrantTime:'',
                    officeName:'',
                    cnName:'',
                    positionsLevelDisplay:'',
                    positionsDisplay:'',
                    isPrimaryPerson:'',
                    pLoginName:'',
                    createOfficeName:'',
                    createName:'',
                    assessScoreObj:{},
                },
                zzts:'',
                Competence:{
                    taskFormKey:'',
                },
                fileList: [],
                evaluation:[
                    {
                        name: '工作业绩（60%）',
                        index:[
                            {
                                action:"设定的工作计划或目标的完成情况（40%）",
                                rat:[
                                    {a:'优：达成率95%及以上（95分以上）'},
                                    {a:'良：达成率90~94%（90~94-分）'},
                                    {a:'中：达成率76~89%（76~89分）'},
                                    {a:'可：达成率55~75%（55~75分）'},
                                    {a:'差：达成率54%及以下（0~50分）'},
                                ]
                            },
                            {
                                action:"管理执行力度：内部管理执行到位（20%）",
                                rat:[
                                    {a:'优：内部管理清晰，管理执行到位（95分以上）'},
                                    {a:'良：内部管理较清晰，管理执行基本到位（76~94分）'},
                                    {a:'可：内部管理还算清晰，管理执行力度时紧时松（56~75分）'},
                                    {a:'差：内部管理不清晰或管理执行不到位（0~50分）'},
                                ]
                            },
                        ]
                    },
                    {
                        name: '工作能力（15%）' ,
                        index:[
                            {
                                action:"专业能力：专业水平的宽度与深度（5%）",
                                rat:[
                                    {a:'优：专业水平高,能得到公司同仁的推崇，且能产生好的绩效（95分以上）'},
                                    {a:'良：专业水平较好,能得到公司同仁的认可，也能产生较好的绩效（76~94分）'},
                                    {a:'中：专业水平一般,基本能得到认可，产生的绩效达不到基本标准（56~75分）'},
                                    {a:'差：专业水平不佳,不能得到认可，绩效不佳（0~50分）'},
                                ]
                            },
                            {
                                action:"个人沟通能力：内、外部沟通顺畅，信息传递达到管理沟通之目标（5%）",
                                rat:[
                                    {a:'优：沟通通路很顺畅，通路维护佳,具良好的沟通技巧（95分以上）'},
                                    {a:'良：沟通通路顺畅，具一定的沟通技巧（90~94分）'},
                                    {a:'中：沟通通路较顺畅，具基本的沟通技巧（76~89分）'},
                                    {a:'可：沟通通路不太顺畅，沟通技巧较差（55~75分）'},
                                    {a:'差：沟通通路不顺畅，沟通态度和技巧差（0~50分）'},
                                ]
                            },
                            {
                                action:"解决问题的能力：对产生的问题及困难能快速准确提出方案，执行后的结果能达到管理要（5%）",
                                rat:[
                                    {a:'优：能前瞻性进行问题的危机管理，并有相应的流程方案支持（95分以上）'},
                                    {a:'良：能前瞻性进行问题的危机管理，相应的流程方案支持不够精细（90~94分）'},
                                    {a:'中：基本能利用自己的能力解决问题（76~89分）'},
                                    {a:'可：能利用自己的能力解决大部分问题（55~75分）'},
                                    {a:'差：能利用自己的能力解决个别问题（0~50分）'},
                                ]
                            }
                        ]
                    },
                    {
                        name: '团队建设（15%）' ,
                        index:[
                            {
                                action:"部门与部门间协作：部门与部门协作顺畅，协作部门的认可度（7%）",
                                rat:[
                                    {a:'优： 协作顺畅，得到协作部门的嘉许（95分以上）'},
                                    {a:'良： 协作较顺畅，得到协作部门的认可（76~94分）'},
                                    {a:'中： 协作基本顺畅，也能得到协作部门的配合（56~75分）'},
                                    {a:'差： 协作不顺畅（0~50分）'},
                                ]
                            },
                            {
                                action:"部门成员士气：士气旺盛程度，成员间协作顺畅度（8%）",
                                rat:[
                                    {a:'优：士气旺盛，成员间协作顺畅（95分以上）'},
                                    {a:'良：士气旺盛，成员间协作较顺畅（76~94分）'},
                                    {a:'中：士气一般，成员间协作不畅（56~75分）'},
                                    {a:'差：士气低迷，成员间协作差（0~50分）'},
                                ]
                            }
                        ]
                    },
                    {
                        name: '行为规范（10%）' ,
                        index:[
                            {
                                action:"个人操守：个人行为能以身作则，为同仁的表率（10%）",
                                rat:[
                                    {a:'优：以身作则，能成为同仁的表率 (95分以上)'},
                                    {a:'良：以身作则，得到同仁认可 (76~94分)'},
                                    {a:'中：个人行为较好，基本无造成负面的影响(56~75分)'},
                                    {a:'差：个人行为一般（0~50分）'},
                                ]
                            },
                        ]
                    },
                ],
                evaluationYg:[
                    {
                        name: '工作能力25% ',
                        index:[
                            {
                                action:"专业技能：（9%）",
                                rat:[
                                    {a:'优：具丰富的专业知识，较高技术水平，精通业务内容（95分以上）'},
                                    {a:'良：具有较好的专业知识和技能，熟悉业务内容（76~94分）'},
                                    {a:'中：专业水平一般，基本了解相关业务内容（56~75分）'},
                                    {a:'差：专业知识不足，不了解相关业务内容（0~50分）'},
                                ]
                            },
                            {
                                action:"改善能力：（8%）",
                                rat:[
                                    {a:'优：善于发现问题，积极主动改进，提高工作效率和质量（95分以上）'},
                                    {a:'良：基本能发现问题，并妥善处理解决（76~94分）'},
                                    {a:'可：本职工作需上级指导才得以改进工作（56~75分）'},
                                    {a:'差：无改进工作的能力（0~50分）'},
                                ]
                            },
                            {
                                action:"执行力：（8%）",
                                rat:[
                                    {a:'优：全面落实有关工作计划，实现组织目标，能随机应变（95分以上）'},
                                    {a:'良：能理解和按时完成工作任务（76~94分）'},
                                    {a:'可：时有督导才得以完成工作任务（56~75分）'},
                                    {a:'差：经常督导也无法完成工作任务（0~50分）'},
                                ]
                            },
                        ]
                    },
                    {
                        name: '工作绩效45% ' ,
                        index:[
                            {
                                action:"工作计划（目标）达成状况：",
                                rat:[
                                    {a:'优：达成率95%及以上（95分以上）'},
                                    {a:'良：达成率90~94%（90~94分）'},
                                    {a:'中：达成率75~89%（75~89分）'},
                                    {a:'可：达成率55~75%（55~75分）'},
                                    {a:'差：达成率55%及以下（0分）'},
                                ]
                            },
                        ]
                    },
                    {
                        name: '工作态度30% ' ,
                        index:[
                            {
                                action:"作风纪律：（8%）",
                                rat:[
                                    {a:'优： 工作热情高，遵守纪律，对同事和上级热情（95分以上）'},
                                    {a:'良： 有工作热情，不违反纪律，对同事和上级较热情（76~94分）'},
                                    {a:'中： 工作热情一般，偶尔有违反纪律现象，对同事和上级一般（56~75分）'},
                                    {a:'差： 工作热情不高，经常违反纪律（0~50分）'},
                                ]
                            },
                            {
                                action:"积极性：（8%）",
                                rat:[
                                    {a:'优：不满足现状，积极改进工作，全面提高工作成效（95分以上）'},
                                    {a:'良：能主动提高工作水平，完成工作任务（76~94分）'},
                                    {a:'中：能按照时完成工作任务，工作水平一般（56~75分）'},
                                    {a:'差：积极性不高，工作拖沓（0~50分）'},
                                ]
                            },
                            {
                                action:"责任感：（7%）",
                                rat:[
                                    {a:'优：责任感强，全面达成交付工作，勇于面对困难并解决，可信任（95分以上）'},
                                    {a:'良：责任感较强，能解决工作实际问题，偶尔出错，但能及时纠正（76~94分）'},
                                    {a:'中：责任感一般，工作必须跟进才得以完成（56~75分）'},
                                    {a:'差：责任感差，常难以独立完成工作任务，经常找借口推卸责任（0~50分）'},
                                ]
                            },
                            {
                                action:"协作性：（7%）",
                                rat:[
                                    {a:'优：经常配合协作，协助相关部门或同事工作（95分以上）'},
                                    {a:'良：基本配合协作（76~94分）'},
                                    {a:'中：偶尔协作配合；（56~75分）'},
                                    {a:'差：不配合，不协作，自我为中心（0~50分）'},
                                ]
                            }
                        ]
                    }
                ],
                valida: {
                    performance:'',
                },
                lookscreen:{
                    isShow:false,
                },
            }
        },
        asyncData: function (resolve, reject) {
            let that = this;
            this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDAPPLY,{id: this.businessKey}).then(function (response) {
                var Data = response.json().result;
                resolve({
                    'post.id': Data.id,
                    'post.serialNo': Data.serialNo,                                         //录用申请编号
                    'post.urgencyDegreeId': Data.urgencyDegreeId,
                    'post.urgencyDegreeDispay': Data.urgencyDegreeDispay,
                    'post.formalTime': Data.formalTime,
                    'post.realTime': Data.realTime,
                    'post.performance': Data.performance,
                    'post.delayTime': Data.delayTime,
                    'post.applyType': Data.applyType,
                    'post.employeeBaseId': Data.employeeBaseId,
                    'post.entrantTime': Data.entrantTime,
                    'post.officeName': Data.officeName,
                    'post.cnName': Data.cnName,
                    'post.positionsLevelDisplay': Data.positionsLevelDisplay,
                    'post.positionsDisplay': Data.positionsDisplay,
                    'post.isPrimaryPerson': Data.isPrimaryPerson,
                    'post.pLoginName': Data.pLoginName,
                    'post.createOfficeName': Data.createOfficeName,
                    'post.createName': Data.createName,

                })
                if(that.Competence.taskFormKey == "regular_normal_hr" || that.Competence.taskFormKey == "regular_respon_hr" || that.Competence.taskFormKey == "regular_respon_zc"){
                    resolve({
                        'post.assessScoreObj.achievingtarget': Data.assessScoreObj.achievingtarget,
                        'post.assessScoreObj.management':  Data.assessScoreObj.management,
                        'post.assessScoreObj.professional':  Data.assessScoreObj.professional,
                        'post.assessScoreObj.coordination':  Data.assessScoreObj.coordination,
                        'post.assessScoreObj.ability':  Data.assessScoreObj.ability,
                        'post.assessScoreObj.departmental':  Data.assessScoreObj.departmental,
                        'post.assessScoreObj.resentment':  Data.assessScoreObj.resentment,
                        'post.assessScoreObj.personal':  Data.assessScoreObj.personal,
                        'post.assessScoreObj.scoreTolal':  parseInt(Data.assessScoreObj.scoreTolal)
                    })
                }else{
                    resolve({
                        'post.assessScoreObj.achievingtarget': '',
                        'post.assessScoreObj.management':  '',
                        'post.assessScoreObj.professional':  '',
                        'post.assessScoreObj.coordination':  '',
                        'post.assessScoreObj.ability':  '',
                        'post.assessScoreObj.departmental':  '',
                        'post.assessScoreObj.resentment':  '',
                        'post.assessScoreObj.personal':  '',
                        'post.assessScoreObj.scoreTolal':  ''
                    })
                }
                var realTime = that.post.realTime.split("-").join("");
                var formalTime = this.post.formalTime.split("-").join("");
                if(realTime - formalTime > 0){
                    this.zzts = "延迟转正";
                }else if(realTime - formalTime == 0){
                    this.zzts = "正常转正";
                }else{
                    this.zzts = "提前转正";
                }
            })
            if(this.fileList){
                this.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_FINDATTACHMENTLIST, {resourceId: this.businessKey}).then((response) => {
                    resolve({
                        'fileList': response.json().result
                    })
                })
            }
        },
        computed: {
            // 仅读取，值只须为函数
            socreNum: function () {
                let assess = this.post.assessScoreObj;

                if(this.post.isPrimaryPerson == "0"){
                    this.post.assessScoreObj.scoreTolal = (parseInt(assess.achievingtarget) * 0.09) + (parseInt(assess.management) * 0.08) + (parseInt(assess.professional) * 0.08) + (parseInt(assess.coordination) * 0.45) +
                            (parseInt(assess.ability) * 0.08) + (parseInt(assess.departmental) * 0.08) + (parseInt(assess.resentment) * 0.07) + (parseInt(assess.personal) * 0.07);
                }else{
                    this.post.assessScoreObj.scoreTolal = (parseInt(assess.achievingtarget) * 0.40) + (parseInt(assess.management) * 0.2) + (parseInt(assess.professional) * 0.05) + (parseInt(assess.coordination) * 0.05) +
                            (parseInt(assess.ability) * 0.05) + (parseInt(assess.departmental) * 0.07) + (parseInt(assess.resentment) * 0.08) + (parseInt(assess.personal) * 0.10);
                }
                if(!isNaN(this.post.assessScoreObj.scoreTolal)){
                    return parseInt(this.post.assessScoreObj.scoreTolal);
                }else{
                    return this.post.assessScoreObj.scoreTolal = "请打完所有分数";
                }
            },
        },
        created: function(){
            let hash = window.location.hash.slice(1).match(/\/\w+/g).reverse();
            this.businessKey = hash[3].match(/\w+/)[0];
            this.humanTaskId = hash[1].match(/\w+/)[0];
            this.taskId = hash[2].match(/\w+/)[0];
            //任务表单权限获取
            this.task();
        },
        validators: {
            numeric: function (val) {
                return /^(([0-9]\d?)|100)$/.test(val)
            }
        },
        methods:{
            //验证
            onTouched: function (id) {
                if(this.$validation[id].required){
                    this.valida[id] = '必填项';
                }else if(this.$validation[id].maxlength){
                    this.valida[id] = '不能超过三百字';
                }
            },
            //审批
            approveProcess: function (e,comments) {
                let vm = this;
                vm.comments = comments;
                if(comments){
                    vm.comment = '同意'
                }else{
                    vm.sub(e)
                    vm.comment = '不同意'
                    return;
                }
                if(vm.Competence.taskFormKey == "regular_normal_hr"  || vm.Competence.taskFormKey == "regular_respon_hr"){
                    vm.sub(e);
                }else{
                    this.$validate(true, function () {
                        if (vm.$validation.invalid) {
                            e.preventDefault()
                        }else{
                            vm.sub(e);
                        }
                    })
                }

            },
            sub: function (e) {
                let vm = this;
                let userId = sessionStorage.getItem("loginName");
                if((vm.Competence.taskFormKey != "regular_normal_target" && vm.Competence.taskFormKey != "regular_normal_edit")
                || (vm.Competence.taskFormKey != "regular_respon_target" && vm.Competence.taskFormKey != "regular_respon_edit")) {
                    if(vm.post.assessScoreObj){
                        vm.post.assessScoreObj = {
                            achievingtarget: vm.post.assessScoreObj.achievingtarget,
                            management: vm.post.assessScoreObj.management,
                            professional: vm.post.assessScoreObj.professional ,
                            coordination: vm.post.assessScoreObj.coordination ,
                            ability: vm.post.assessScoreObj.ability ,
                            departmental: vm.post.assessScoreObj.departmental,
                            resentment: vm.post.assessScoreObj.resentment ,
                            personal: vm.post.assessScoreObj.personal,
                            scoreTolal: vm.post.assessScoreObj.scoreTolal.toString(),
                        }
                    }
                }
                vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_SAVEEMPLOYEEAPPLY, vm.post).then((response) => {
                    let status = response.json().status;
                    if(status == 0){

                        if(vm.Competence.taskFormKey =="regular_normal_edit" || vm.Competence.taskFormKey =="regular_normal_target"
                                || vm.Competence.taskFormKey =="regular_respon_edit" || vm.Competence.taskFormKey =="regular_respon_target"){
                            e.target.disabled = true
                            vm.lookscreen.isShow = true;
                            vm.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_COMPLETEPERSONALTASK, {
                                'humanTaskId': vm.humanTaskId,
                                'appros': true,
                                'comment': '',
                                'userId' : userId
                            }).then((response) => {
                                let result = response.json();
                                if(result.status == 0){
                                    vm.$router.go('/process/todo');
                                    vm.lookscreen.isShow = false;
                                    e.target.disabled = false
                                }else{
                                    vm.lookscreen.isShow = false;
                                    e.target.disabled = false
                                }
                            })
                        }else{
                            vm.isShow = true
                        }

                    }
                });
            },
            //取消
            cancelProcess: function () {
                this.$router.go('/process/todo')
            },
            //获取任务表单权限接口
            task: function(){
                let vm = this;
                this.$http.post(content.STAROFFICE_ACT + interfaces.INTERFACE_GETTASKFORMBYID, {humanTaskId: this.humanTaskId}).then(function (response) {
                    let Data = response.json().result;
                    vm.Competence.taskFormKey = Data.taskFormKey;
                });
            },

        }
    }
</script>
<style lang="less">
    .evaluation{
        width: 80%;
        margin: 0 auto;
    }
    .evaluation th{
        text-align: center;
    }
    .evaluation td,.evaluation th{
        border: 1px solid #ccc;
        padding: 15px;
    }
    .evaluation p,.evaluation h3{
        font-size: 14px;
    }
    .evaluation input{
        width: 50px;display: inline
    }
    .v-red p{

    }
</style>
