/**
 *
 * @param state
 */
export const taskInfoGetPerson  = state => state.taskInfoCmp.taskInfoTabCmp.publicChoosePersonCmp.result;   //登录请求后返回的json
export const taskInfoGetArchive  = state => state.taskInfoCmp.taskInfoTabCmp.taskInfoArchiveCmp.result;   //登录请求后返回的json
export const taskInfoGetArSlidingFlag  = state => state.taskInfoCmp.taskInfoTabCmp.taskInfoArchiveCmp.slidingFlag;   //归档的标志
export const taskInfoGetPopOpenFlag  = state => state.taskInfoCmp.taskInfoTabCmp.taskInfoPopCmp.openPopFlag;   //打开pop的标志
export const taskInfoGetPopProjInfoLst  = state => state.taskInfoCmp.taskInfoTabCmp.result;   //获取我的任务列表
export const taskInfoGetAddJobRlt  = state => state.taskInfoCmp.taskInfoTabCmp.publicGalleryTabCmp.result;   //获取我的任务列表
export const taskInfoGetPublicError  = state => state.taskInfoCmp.taskInfoTabCmp.toolErrorCmp.result.message;   //获取我的任务列表
