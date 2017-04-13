//获取手机验证码
import validateAndSubmit from '../js/validateAndSubmit';
import * as types from '../constants/taskInfoActionTypes';
import url from '../js/taskSource'


/**
 * 获取我的任务列表
 * @param dispatch
 * @param state
 */
export const taskInfoGetprojLstFun  = function ({ dispatch, state },params)  {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp']
    });
};

/**
 * Pop上各类标志更改
 * @param dispatch
 * @param flag
 * @param params
 */
export const taskInfoPopChangeFlagFun = function ({ dispatch},{flag,params}) {
    dispatch(types.POPCHANGEFLAG,{flag,params});
};
/**
 * 查询参与人列表
 * @param dispatch
 * @param state
 */
export const taskInfoPopInfoJoinPerFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','findResponsibleListDo']
    });
};
/**
 * 查询流水列表
 * @param dispatch
 * @param state
 */
export const taskInfoPopInfoFlowFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','flowLstDo']
    });
};

/**
 * 子任务列表
 * @param dispatch
 * @param state
 */
export const taskInfoPopInfoSubLstFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','subLstDo']
    });
};

/**
 *关闭或者开启归档弹框
 * @param dispatch
 * @param state
 */
export const taskInfoPopAlterAtomFun = function ({ dispatch,state},params) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoArchiveCmp']
    });
};

/**
 *修改标题
 * @param dispatch
 * @param state
 */
export const taskInfoPopAlterTitleFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','alterTitleDo']
    });
};
/**
 *修改内容
 * @param dispatch
 * @param state
 */
export const taskInfoPopAlterContentFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','alterContentDo']
    });
};
/**
 *修改状态
 * @param dispatch
 * @param state
 */
export const taskInfoPopAlterStatusFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','alterStautDo']
    });
};
/**
 *修改优先级
 * @param dispatch
 * @param state
 */
export const taskInfoPopAlertPriorityFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','alertPriorityDo']
    });
};
/**
 *增加子任务
 * @param dispatch
 * @param state
 */
export const taskInfoAddSunJobFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoPopCmp','addSubJobDo']
    });
};

/**
 * 获取归档列表
 * @param dispatch
 * @param state
 */
export const taskInfoGetArchiveFun  = function ({ dispatch, state })  {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'taskInfoArchiveCmp']
    });
};
/**
 * 获取员工列表
 * @param dispatch
 * @param state
 */
export const taskInfoGetPersonFun  = function ({ dispatch, state })  {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'publicChoosePersonCmp']
    });
};

/**
 * 归档标志开启
 * @param dispatch
 */
export const taskInfoArchiveFlagFun = function ({ dispatch},params) {
    dispatch(types.ARCHIVEFLAG,params);
};
/**
 * 直接增加任务到缓存里面
 * @param dispatch
 * @param params
 */
export  const taskInfoAddJobInCacheFun = function ({ dispatch},params){
    dispatch(types.ADDIOBINCACHE,params);
};

/**
 * 增加任务请求后台
 * @param dispatch
 * @param state
 */
export const taskInfoAddJobInFun  = ({dispatch, state},{params,result}) => {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        componentLst: ['taskInfoCmp', 'taskInfoTabCmp', 'publicGalleryTabCmp'],
        result:result
    });
};

/**
 * 隐形更新id
 * @param dispatch
 * @param params
 */
export  const taskInfoAddJobIdInCacheFun = function ({ dispatch},{type,id, priorityId}){
    dispatch(types.ADDJOBARTERIDINCACHE,{type,id, priorityId});
};

/**
 * 改变title
 * @param dispatch
 * @param params
 */
export  const taskInfoAlterTiltelInCacheFun = function ({ dispatch},{id,title,type}){
    dispatch(types.ARLTERTILTLEINCAHCE,{id,title,type});
};
/**
 * 改变内容
 * @param dispatch
 * @param params
 */
export  const taskInfoAlterContentInCacheFun = function ({ dispatch},{id,content,type}){
    dispatch(types.ARLTERCONTENTINCAHCE,{id,content,type});
};
/**
 * 改变状态
 * @param dispatch
 * @param params
 */
export  const taskInfoAlterStatusInCacheFun = function ({ dispatch},{id,taskStateId,oldType}){
    dispatch(types.ALRTERSTATUINCAHCE,{id,taskStateId,oldType});
};
/**
 * 改变优先级
 * @param dispatch
 * @param params
 */
export  const taskInfoAlertPrioritInCacheFun = function ({ dispatch},{id,type,priorityId}){
    dispatch(types.ALTERPRIORITINCACHE,{id,type,priorityId});
};

/**
 * 显示错误信息
 * @param dispatch
 * @param params
 */
export  const taskInfoShowOrHideErrorFun = function ({ dispatch},params, taskStateId){
    dispatch(types.SHOWORHIDEERROR,params, taskStateId);
};

/**
 * 修改一级任务的截止时间
 * @param dispatch
 * @param params
 */
export const updateEndTime = function ({ dispatch}, params){
  this.$http.post(url.updateEndTime, {endTime: params.endTime, id: params.id}, {headers: {task: true}}).then((response)=>{
    response = response.json();
    if(response.status == 0)
       dispatch('UPDATEENDTIME',params)
    else this.taskInfoShowOrHideErrorFun(response.message);//做报错处理
  })
};
/**
 * 修改一级任务的执行者
 * @param dispatch
 * @param params
 */
export const updateExecutor = function ({ dispatch}, params, callback){
  this.$http.post(url.updateExecutor, {responsibleList: params.responsibleList, id: params.id}, {headers: {task: true}}).then((response)=>{
    response = response.json();
    if(response.status == 0){
       dispatch('UPDATEEXECUTOR',params);
       callback &&callback()
    }else this.taskInfoShowOrHideErrorFun(response.message);//做报错处理
  })
};

/**
 * 修改子任务数量及完成度
 * @param dispatch
 * @param params
 */
export const updateSubTaskAmount = function ({ dispatch}, params){
  dispatch('UPDATESUBTASKAMOUNT',params);
}

/**
 * 删除一级任务
 * @param dispatch
 * @param params
 */
export const deleteTask = function ({ dispatch}, params){
  dispatch('DELETETASK',params);
}
