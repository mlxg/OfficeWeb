
/**
 * 根据任务ID查询历史审批记录接口
 */
export const INTERFACE_LISTCOMPLETETASKSBYTASKID = '/workflowengine/task/listCompleteTasksByTaskId.do';

/**
 * 流程启动接口
 */
export const INTERFACE_STARTPROCESS = '/workflowengine/web/startProcess.do';

/**
 * 新流程启动接口
 */
export const INTERFACE_NEWSTARTPROCESS = '/workflowengine/web/newstartProcess.do';

/**
 * 获取流程图和审批历史页面
 */
export const INTERFACE_PROCESSEXISTS = '/workflowengine/web/processExists.do';

/**
 * 	查询所有部门
 */
export const INTERFACE_GETCONTACTSSTAFFLIST = '/a/employee/employeeContacts/getContactsStaffList';

/**
 * 发送短信验证码
 */
export const INTERFACE_SENDCODE = '/f/sms/sendCode';

/**
 *忘记密码
 */
export const INTERFACE_SETNEWPASSWORD = '/f/setNewPassword';

/**
 * 任务审批接口
 */
export const INTERFACE_COMPLETEPERSONALTASK = '/workflowengine/operation/completePersonalTask.do';

/**
 * 退出
 */
export const INTERFACE_LOGOUT = 'f/web/logout';

/**
 * 忘记密码
 */
export const INTERFACE_RESETNEWPASSWORD = '/a/sys/user/resetNewPassword';

/**
 * 我的档案
 */
export const INTERFACE_GETMYARCHIVES = '/a/employee/employeeBase/getMyArchives';

/**
 * 设置消息为已读
 */
export const INTERFACE_UPDATEISREAD = '/a/web/message/updateIsRead';

/**
 *获取当前用户未读消息推送条数接口
 */
export const INTERFACE_GETNOTICENUM = '/a/web/message/getNoticeNum';

/**
 * 获取当前用户消息推送列表
 */
export const INTERFACE_GETNOTICELIST = '/a/web/message/getNoticeList';

/**
 * 获取当前用户消息推送列表
 */
export const INTERFACE_UPDATEALLISREAD = '/a/web/message/updateAllIsRead';

/**
 * 删除（一级）任务
 */
export const INTERFACE_DELETETASK = 'a/task/project/deleteTask';

/**
 *文件上传
 */
export const INTERFACE_UPLOADFILE = '/a/attachment/uploadFile';

/**
 *文件删除
 */
export const INTERFACE_DELETEFILE = '/a/attachment/deleteFile?id=';

/**
 * 查询录用申请列表
 */
export const INTERFACE_FINDAPPLICATIONLIST = '/a/employee/employeeApplication/findApplicationList';

/**
 * 查询录用申请列表
 */
export const INTERFACE_ACCOUNTLOANPAGELIST = '/a/accountLoan/pageList';

/**
 * 招聘需求操作状态
 */
export const INTERFACE_UPDATEOPERATIONTYPE = '/a/employee/employeeRecruit/updateOperationType';

/**
 *查询录用申请信息
 */
export const INTERFACE_FINDAPPLICATION = 'a/employee/employeeApplication/findApplication';

/**
 *招聘需求列表
 */
export const INTERFACE_COMPLETEDLIST = '/a/employee/employeeRecruit/completedList';

/**
 *查询员工档案列表
 */
export const INTERFACE_BASELIST = '/a/employee/employeeBase/baseList';

/**
 * 查询转正申请列表分页
 */
export const INTERFACE_COMPLETEDLISTPOS = '/a/employee/employeeApply/completedList';

/**
 * 查询离职申请列表
 */
export const INTERFACE_FINDLEAVELIST = '/a/employee/employeeLeave/findLeaveList';

/**
 * 离职申请归档
 */
export const INTERFACE_ARCHIVE = '/a/employee/employeeLeave/archive';

/**
 * 入职详情
 */
export const INTERFACE_GETEMPLOYEEENTRY = '/a/employee/employeeEntry/getEmployeeEntry';

/**
 * 查询文件列表
 */
export const INTERFACE_FINDATTACHMENTLIST = '/a/attachment/findAttachmentList';

/**
 * 查询当前员工，录用信息
 */
export const INTERFACE_GETEMPLOYEEBASE = '/a/employee/employeeBase/getEmployeeBase';

/**
 * 获取离职申请人相关信息 -- 入职办理RZSQ
 * */
export const INTERFACE_GETSERIALNUMBER_RZSQ = '/a/employee/serialNumber/getSerialNumber?code=RZSQ';
/**
 * 入职保存
 */
export const INTERFACE_SAVEEMPLOYEEENTRY = '/a/employee/employeeEntry/saveEmployeeEntry';

/**
 * 验证重复手机号
 */
export const INTERFACE_ISMOBILEEXISTS = '/a/sys/user/isMobileExists';

/**
 * 业务编码录用申请
 */
export const INTERFACE_GETSERIALNUMBERLYSQ = '/a/employee/serialNumber/getSerialNumber?code=LYSQ';

/**
 * 业务编码人事异动
 */
export const INTERFACE_GETSERIALNUMBERRSYD = '/a/employee/serialNumber/getSerialNumber?code=RSYD';

/**
 * 	保存录用申请信息
 */
export const INTERFACE_SAVEAPPLICATION = '/a/employee/employeeApplication/saveApplication';

/**
 * 	保存录用申请信息
 */
export const INTERFACE_FINDRECRUITLISTFORAPPLICATION = '/a/employee/employeeRecruit/findRecruitListForApplication';

/**
 * 	录用中需要查询的招聘需求信息
 */
export const INTERFACE_FINDRECRUITFORAPPLICATION = '/a/employee/employeeRecruit/findRecruitForApplication';

/**
 * 查询部门相关信息（流程参数）
 */
export const INTERFACE_FINDCODEBYOFFICEID = '/a/sys/office/findCodeByOfficeId';

/**
 * 录用中需要查询的部门列表
 */
export const INTERFACE_FINDOFFICELISTFORAPPLICATION = '/a/employee/employeeRecruit/findOfficeListForApplication';

/**
 * 查询项目考核列表
 */
export const INTERFACE_FINDASSESSMENTLIST = '/a/employee/employeeApplication/findAssessmentList';

/**
 * 获取离职未替换人员列表
 */
export const INTERFACE_GETALLLISTBYREPLACE = '/a/employee/employeeRecruit/getAllListByReplace';

/**
 * 查询当前部门获取岗位职称
 */
export const INTERFACE_GETPOSITIONAME = '/a/employee/employeeRecruit/getPositionName';

/**
 * 招聘需求详情
 */
export const INTERFACE_GETEMPLOYEERECRUIT = '/a/employee/employeeRecruit/getEmployeeRecruit';

/**
 * 业务编码接口 招聘申请
 */
export const INTERFACE_GETSERIALNUMBERZPSQ = '/a/employee/serialNumber/getSerialNumber?code=ZPSQ';

/**
 * 招聘需求保存接口
 */
export const INTERFACE_SAVERECRUIT = '/a/employee/employeeRecruit/saveRecruit';

/**
 * 查询转正申请详情
 */
export const INTERFACE_FINDAPPLY = '/a/employee/employeeApply/findApply';

/**
 * 转正申请选人接口列表
 */
export const INTERFACE_GETBASEAPPLYLIST = '/a/employee/employeeBase/getBaseApplyList';

/**
 * 业务编码接口 转正申请
 */
export const INTERFACE_GETSERIALNUMBERZZSQ = '/a/employee/serialNumber/getSerialNumber?code=ZZSQ';

/**
 * 保存转正申请信息
 */
export const INTERFACE_SAVEEMPLOYEEAPPLY = '/a/employee/employeeApply/saveEmployeeApply';

/**
 * 查询离职申请信息
 */
export const INTERFACE_FINDLEAVE = '/a/employee/employeeLeave/findLeave';

/**
 * 业务编码接口 离职申请
 */
export const INTERFACE_GETSERIALNUMBERLZSQ = '/a/employee/serialNumber/getSerialNumber?code=LZSQ';

/**
 * 业务编码接口 解聘申请
 */
export const INTERFACE_GETSERIALNUMBERJPSQ = '/a/employee/serialNumber/getSerialNumber?code=JPSQ';

/**
 * 保存离职申请信息
 */
export const INTERFACE_SAVELEAVE = '/a/employee/employeeLeave/saveLeave';

/**
 * 检查登录超时
 */
export const INTERFACE_CHECKSESSION = 'f/checkSession';

/**
 * 查询人员信息
 */
export const INTERFACE_GETUSERINFOLIST = '/a/employee/employeeContacts/getUserInfoList';

/**
 * 获取任务表单
 * */
export const INTERFACE_GETTASKFORMBYID = '/workflowengine/task/getTaskFormById.do';

/**
 * 我的申请
 * */
export const INTERFACE_LISTAPPLYS = '/workflowengine/web/listApplys.do';

/**
 * 个人待办查询分页
 * */
export const INTERFACE_LISTPERSONALTASKS = '/workflowengine/web/listPersonalTasks.do';

/**
 * 获取待办任务数量
 * */
export const INTERFACE_GETPERSONALTASKSNUM = '/workflowengine/web/getPersonalTasksNum.do';

/**
 * 我的经办
 * */
export const INTERFACE_LISTHANDLETASKS = '/workflowengine/web/listHandleTasks.do';

/**
 * 查询员工档案详情
 * */
export const INTERFACE_GETBASEINFOBYID = '/a/employee/employeeEntry/getBaseInfoById';

/**
 * 修改员工档案
 * */
export const INTERFACE_UPDATEBASEINFO = '/a/employee/employeeEntry/updateBaseInfo';

/**
 * 删除流程记录
 * */
export const INTERFACE_DELETEFLOWANDSERVICERECORD = '/a/employee/employeeFlowRecord/deleteFlowAndServiceRecord';

/**
 * 查询流程记录信息列表（草稿箱）
 * */
export const INTERFACE_FINDFLOWRECORDLIST = '/a/employee/employeeFlowRecord/findFlowRecordList';

/**
 * 查询数据字典
 * */
export const INTERFACE_GETDICTS = '/a/sys/dict/getDicts';

/**
 * 我的申请撤回
 * */
export const INTERFACE_ABORTAPPLYPROCESS = '/workflowengine/operation/abortApplyProcess.do';

/**
 * 我的经办撤回
 * */
export const INTERFACE_WITHDRAWTASK = '/workflowengine/operation/withdrawTask.do';

/**
 * 催办
 * */
export const INTERFACE_REMINDERTASK = '/workflowengine/operation/reminderTask.do';

/**
 * 获取流程状态
 * */
export const INTERFACE_GETPROCESSSTATUS = '/workflowengine/task/getProcessStatus.do';

/**
 * 删除流程
 * */
export const INTERFACE_DELETEPROCESS = '/workflowengine/operation/deleteProcess.do';

/**
 * 根据业务实体ID删除流程接口
 * */
export const INTERFACE_PROCESSDELETE = '/workflowengine/operation/processDelete.do';

/**
 * 获取招聘申请列表中的所含部门列表
 * */
export const INTERFACE_FINDOFFICELISTDEMAND = '/a/employee/employeeRecruit/getOfficeList';

/**
 * 获取招聘申请列表中的所含状态列表
 * */
export const INTERFACE_GETFLOWSTATUSLISTDEMAND = '/a/employee/employeeRecruit/getFlowStatusList';

/**
 * 获取转正申请列表中的所含部门列表
 * */
export const INTERFACE_GETOFFICELISTPOSLIST = '/a/employee/employeeApply/getOfficeList';

/**
 * 获取转正申请列表中的所含状态列表
 * */
export const INTERFACE_GETFLOWSTATUSLISTPOSLIST = '/a/employee/employeeApply/getFlowStatusList';

/**
 * 获取录用申请列表中的所含部门列表
 * */
export const INTERFACE_GETOFFICELISTHIRELIST = '/a/employee/employeeApplication/findOfficeListInApplicationList';

/**
 * 获取录用申请列表中的所含状态列表
 * */
export const INTERFACE_GETFLOWSTATUSLISTHIRELIST = '/a/employee/employeeApplication/findStatusListInApplicationList';

/**
 * 获取离职申请列表中的所含部门列表
 * */
export const INTERFACE_GETOFFICELISTTOVERLIST = '/a/employee/employeeLeave/findOfficeListInLeaveList';

/**
 * 获取离职申请列表中的所含状态列表
 * */
export const INTERFACE_GETFLOWSTATUSLISTTOVERLIST = '/a/employee/employeeLeave/findStatusListInLeaveList';

/**
 * 获取借款获取流程状态 列表
 * */
export const INTERFACE_GETFLOWSTATUSLISTLOANLIST = '/a/accountLoan/getFlowStatus';

/**
 * 获取获取借款项目列表
 * */
export const INTERFACE_GETPROJECTLISTLOANLIST = '/a/accountLoan/getProject';

/**
 * 获取获取冲账状态 列表
 * */
export const INTERFACE_GETREVERSELISTLOANLIST = '/a/accountLoan/getReverse';

/**
 * 获取借款申请部门列表
 * */
export const INTERFACE_GETOFFICELISTLOANLIST = '/a/accountLoan/getByJKOfficeName';

/**
 * 获取借款导出EXCEL数据表
 * */
export const INTERFACE_LOANEXPORTTOEXCEL = '/a/accountLoan/exportToExcel';

/**
 * 获取当前用户消息类型列表
 * */
export const INTERFACE_GETNOTICECATEGORYLIST = '/a/web/message/getNoticeCategoryList';

/**
 * 获取我的抄送列表
 * */
export const INTERFACE_LISTPROCESSCOPYS = '/workflowengine/web/listProcessCopys.do';

/**
 * 获取我的抄送通知数目
 * */
export const INTERFACE_GETPROCESSCOPYSNUM = '/workflowengine/web/getProcessCopysNum.do';

/**
 * 根据任务ID查询抄送列表
 * */
export const INTERFACE_LISTPROCESSCOPYBYTASKID = '/workflowengine/task/listProcessCopyByTaskId.do';

/**
 * 查询可以进行人事异动的员工的相关信息列表
 * */
export const INTERFACE_FINDEMPLOYEEBASEINFOLISTFORMOVE = '/a/employee/EmployeeMove/findEmployeeBaseInfoListForMove';

/**
 * 查询部门
 * */
export const INTERFACE_FINDOFFICLISTWITHOUTCHILD = '/a/sys/office/findOfficeListWithoutChild';

/**
 * 更新抄送状态
 * */
export const INTERFACE_UPDATEPROCESSCOPY = '/workflowengine/task/updateProcessCopy.do';

/**

 * 保存人事异动
 * */
export const INTERFACE_SAVEMOVE = '/a/employee/EmployeeMove/saveMove';

/**
 * 查询人事异动申请信息
 * */
export const INTERFACE_FINDMOVE = '/a/employee/EmployeeMove/findMove';

/**
 * 查询人事异动列表
 * */
export const INTERFACE_FINDMOVELIST = '/a/employee/EmployeeMove/findMoveList';

/**
 * 查询人事异动申请中的异动后部门列表
 * */
export const INTERFACE_FINDAFTEROFFICELISTINMOVELIST = '/a/employee/EmployeeMove/findAfterOfficeListInMoveList';

/**
 * 查询人事异动申请中的流程状态列表
 * */
export const INTERFACE_FINDSTATUSLISTINMOVELIST = '/a/employee/EmployeeMove/findStatusListInMoveList';

/**
 * 获取解聘人员列表接口
 */
export const INTERFACE_GETDISMISSALPERSONLIST = '/a/employee/employeeDismissal/getDismissalPersonList';

/**
 * 保存解聘申请信息
 */
export const INTERFACE_SAVEDISMISSAL = '/a/employee/employeeDismissal/saveDismissal';

/**
 * 解聘申请详情
 */
export const INTERFACE_GETEMPLOYEEDISMISSAL = '/a/employee/employeeDismissal/getEmployeeDismissal';

/**
 * 校验部门职位是否重复
 */
export const INTERFACE_CHECKPOSTION = '/a/employee/employeeRecruit/checkPostion';

/**
 * 业务编码借款申请
 */
export const INTERFACE_GETSERIALNUMBERJKSQ = '/a/employee/serialNumber/getSerialNumber?code=JKSQ';

/**
 * 业务编码财务报销
 */
export const INTERFACE_GETSERIALNUMBERBXSQ = '/a/employee/serialNumber/getSerialNumber?code=BXSQ';

/**
 * 付款用途
 */
export const INTERFACE_FINDPROCESSCONFIGTYPELIST = '/a/process/processConfig/findProcessConfigTypeList';

/**
 * 根据ID查询员工解聘信息
 */
export const INTERFACE_GETDISMISSALPERSONBYID = '/a/employee/employeeDismissal/getDismissalPersonByBaseId';

/**
 * 借款列表
 */
export const INTERFACE_PAGELIST = '/a/accountLoan/pageList';

/**
 * 报销申请详情
 */
export const INTERFACE_FINDEXPENSE = '/a/account/accountExpense/findExpense';

/**
 * 保存报销申请
 */
export const INTERFACE_SAVEEXPENSE = '/a/account/accountExpense/saveExpense';

/**
 * 借款保存
 */
export const INTERFACE_SAVEACCOUNTLOAN = '/a/accountLoan/saveAccountLoan';

/**
 * 查询发票是否存在
 */
export const INTERFACE_ISINVOICEEXISTS = '/a/account/accountExpense/isInvoiceExists';

/**
 * 借款申请详情
 */
export const INTERFACE_GETACCOUNTLOAN = '/a/accountLoan/getAccountLoan';

/**
 * 报销申请列表
 */
export const INTERFACE_FINDEXPENSELIST = '/a/account/accountExpense/findExpenseList';

/**
 * 查询报销申请列表中的流程状态列表
 */
export const INTERFACE_FINDSTATUSLISTINEXPENSELIST = '/a/account/accountExpense/findStatusListInExpenseList';

/**
 * 查询报销申请列表中的流程类型列表
 */
export const INTERFACE_FINDTYPECODELISTINEXPENSELIST = '/a/account/accountExpense/findTypeCodeListInExpenseList';

/**
 * 查询报销申请列表中的部门列表
 */
export const INTERFACE_FINDOFFICELISTINEXPENSELIST = '/a/account/accountExpense/findOfficeListInExpenseList';

/**
 * 报销申请信息导出
 */
export const INTERFACE_EXPORTEXPENSE = '/a/account/accountExpense/exportExpense';

/**
 * 获取审批人节点名称
 */
export const INTERFACE_GETHISTORYNAME = '/workflowengine/web/getHistoryName.do';

/**
 * 保存加班餐补申请
 */
export const INTERFACE_SAVEOVERTIME = '/a/employee/overtime/saveOvertime';

/**
 * 获取加班餐补类型列表
 */
export const INTERFACE_GETOVERTIMESUBSIDYTYPELIST = '/a/employee/overtime/getOvertimeSubsidyTypeList';

/**
 * 获取加班餐补类型列表
 */
export const INTERFACE_GETALLOVERTIMESUBSIDYTYOELIST = '/a/employee/overtime/getAllOvertimeSubsidyTypeList';

/**
 * 加班餐补
 */
export const INTERFACE_FINDOVERTIME = '/a/employee/overtime/findOvertime';

/**
 * 加班餐补列表
 */
export const INTERFACE_FINDOVERTIMELIST = '/a/employee/overtime/findOvertimeList';


/**
 * 查询加班餐补申请信息列表中的流程状态列表
 */
export const INTERFACE_FINDSTATUSLISTINOVERTIMELIST = '/a/employee/overtime/findStatusListInOvertimeList';


/**
 * 	查询加班餐补申请信息列表中的部门列表
 */
export const INTERFACE_FINDOFFICELISTINOVERLIST = '/a/employee/overtime/findOfficeListInOvertimeList';


/**
 * 业务编码人事异动
 */
export const INTERFACE_GETSERIALNUMBERJBSQ = '/a/employee/serialNumber/getSerialNumber?code=JBSQ';

/*
 * 异常考勤获取流程状态
 */
export const INTERFACE_GETFLOWSTATUS = '/a/workattendance/workTimeException/getFlowStatus';

/**
 * 考勤异常保存/修改
 */
export const INTERFACE_SAVEWORKTIMEEXCEPTION = '/a/workattendance/workTimeException/saveWorkTimeException';

/**
 * 考勤异常列表
 */
export const INTERFACE_EXCEPTIONPAGELIST = '/a/workattendance/workTimeException/pageList';

/**
 * 考勤异常导出
 */
export const INTERFACE_EXPORTTOEXCEL = '/a/workattendance/workTimeException/exportToExcel';

/**
 * 考勤异常详情
 */
export const INTERFACE_GETWORKTIMEEXCEPTION = '/a/workattendance/workTimeException/getWorkTimeException';

/**
 * 考勤异常部门条件
 */
export const INTERFACE_GETOFFICENAMELIST = '/a/workattendance/workTimeException/getOfficeNameList';

/**
 * 业务编码接口 考勤异常
 */
export const INTERFACE_GETSERIALNUMBERKQYC = '/a/employee/serialNumber/getSerialNumber?code=KQYC';

/**
 * 业务编码请假申请
 */
export const INTERFACE_GETSERIALNUMBERQJSQ = '/a/employee/serialNumber/getSerialNumber?code=QJSQ';

/**
 * 保存请假申请信息
 */
export const INTERFACE_SAVEHOLIDAY = '/a/employee/employeeHoliday/saveEmployeeHoliday';

/**
 * 查询请假申请信息
 */
export const INTERFACE_GETEMPLOYEEHOLIDAY = '/a/employee/employeeHoliday/getEmployeeHoliday';

/**
 * 获取可调休时间
 */
export const INTERFACE_GETLEAVETIME = '/a/employee/employeeHoliday/getLeaveTime';

/**
 * 查询请假申请列表
 */
export const INTERFACE_FINDHOLIDAYLIST = '/a/employee/employeeHoliday/findHolidayList';

/**
 * 查询请假申请列表中的状态
 */
export const INTERFACE_FINDSTATUSLISTINHOLIDAYLIST = '/a/employee/employeeHoliday/findStatusListInHolidayList';

/**
 * 查询请假申请列表中的部门列表
 */
export const INTERFACE_FINDOFFICELISTHOLIDAYLIST = '/a/employee/employeeHoliday/findOfficeListInHolidayList';

/**
 * 业务编码请假申请
 */
export const INTERFACE_GETSERIALNUMBERCCSQ = '/a/employee/serialNumber/getSerialNumber?code=CCSQ';

/**
 * 保存/修改出差申请
 */
export const INTERFACE_SAVEBUSINESSTRIP = '/a/workattendance/businessTrip/saveBusinessTrip';

/**
 * 出差申请列表
 */
export const INTERFACE_TRIPPAGELIST = '/a/workattendance/businessTrip/pageList';

/**
 * 获取出差申请流程状态
 */
export const INTERFACE_TRIPFLOWSTATUS = '/a/workattendance/businessTrip/getFlowStatus';

/**
 获取出差申请详情
 */
export const INTERFACE_GETBUSINESSTRIP = '/a/workattendance/businessTrip/getBusinessTrip';

/**
 * 获取出差申请部门条件
 */
export const INTERFACE_TRIPNAMELIST = '/a/workattendance/businessTrip/getOfficeNameList';

/**
 * 业务编码外勤
 */
export const INTERFACE_GETSERIALNUMBERWQSQ = '/a/employee/serialNumber/getSerialNumber?code=WQSQ';

/**
 * 外勤申请保存接口
 */
export const INTERFACE_SAVEEMPLOYEEOUTSIDE = '/a/employee/employeeOutside/saveEmployeeOutside';

/**
 * 外勤申请详情接口
 */
export const INTERFACE_GETEMPLOYEEOUTSIDE = '/a/employee/employeeOutside/getEmployeeOutside';

/**
 * 查询外勤申请列表接口
 */
export const INTERFACE_FINDOUTSIDELIST = '/a/employee/employeeOutside/findOutsideList';

/**
 * 查询外勤申请列表中的流程状态列表
 */
export const INTERFACE_FINDSTATUSLISTINOUTSIDELIST = '/a/employee/employeeOutside/findStatusListInOutsideList';

/**
 * 查询外勤申请列表中的部门列表
 */
export const INTERFACE_FINDOFFICELISTINOUTSIDELIST = '/a/employee/employeeOutside/findOfficeListInOutsideList';
