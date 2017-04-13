/**
 * 此处写公共的state
 */

export default {
  flowCode: {
    'ZPSQ':{
      text: '招聘需求',
      process: 'WF_HR_002',
      route: 'recruit'
    },
    'LYSQ':{
      text: '录用申请',
      process: 'WF_HR_003',
      route: 'hire'
    },
    'RZSQ':{
      text: '入职办理',
      process: 'WF_HR_004',
      route: 'entry'
    },
    'ZZSQ':{
      text: '转正申请',
      process: 'WF_HR_001',
      route: 'pos'
    },
    'LZSQ':{
      text: '离职申请',
      process: 'WF_HR_005',
      route: 'tover'
    },
    'JPSQ':{
      text: '解聘申请',
      process: '',
      route: 'dismissal'
    },
    'RSYD':{
      text: '人事异动',
      process: 'WF_HR_007',
      route: 'hrchange'
    },
    'JBSQ': {
      text: '加班(补助)申请',
      process: 'WF_HR_JBSQ_HEAD',
      route: 'overtime'
    },
    'KQYC':{
      text: '考勤异常',
      process: 'WF_HR_WORK_TIME_EXCEPTION',
      route: 'unusual',
    },
    'JKSQ':{
      text: '借款申请',
      process: 'WF_CW_JKSQ_TY',
      route: 'loan'
    },
    'BXSQ': {
      text: '报销申请',
      process: 'BXSQ_001',
      route: 'reimbursement'
    },
    'QJSQ': {
      text: '请休假申请',
      process: 'WF_HR_HOLIDAY_EMPLOYEE',
      route: 'leave'
    },
  },
  processCode:{
    // 转正申请
    'WF_HR_001_1': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyPositive/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppPositive/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppPositive/'
    },
    'WF_HR_001_2': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyPositive/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppPositive/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppPositive/'
    },

    // 招聘需求
    'WF_HR_002': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyJob/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/procMyJob/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/procMyJob/',
      // 我的抄送列表去往路由
      ccsRoute: '/process/ccs/procMyCcsJob/'
    },
    'WF_HR_002_1': {
    // 我的待办列表去往的路由
    chargeRoute: '/process/todo/ProcMyJob/',
    // 我的申请列表去往路由
      applicationRoute: '/process/application/procMyJob/',
    // 我的经办列表去往路由
      disposeRoute: '/process/dispose/procMyJob/',
    // 我的抄送列表去往路由
    ccsRoute: '/process/ccs/procMyCcsJob/'
    },
    // 录用申请
    'WF_HR_003': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyHire/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/ProcMyHire/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/ProcMyHire/',
      // 我的抄送列表去往路由
      ccsRoute: '/process/ccs/procMyCcsHire/'
    },
    // 入职办理
    'WF_HR_004': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyEntry/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/ProcMyEntry/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/ProcMyEntry/'
    },
    // 离职办理
    'WF_HR_005': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyTover/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppTover/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppTover/'
    },

    // 人事异动
    'WF_HR_007': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyChange/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppChange/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppChange/'
    },
    // 考勤异常
    'WF_HR_WORK_TIME_EXCEPTION': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyUnusual/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppUnusual/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppUnusual/'
    },
    // 解聘办理
    'WF_HR_006': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyDimissal/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppDimissal/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppDimissal/'
    },
    // 报销申请
    // 通用部门差旅费报销流程
    'WF_CW_BXSQ_CLF_TY': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //人事部差旅费报销流程
    'WF_CW_BXSQ_CLF_RSXZB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //总经理总裁差旅费报销流程
    'WF_CW_BXSQ_CLF_ZJLZC': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //通用部门业务接待费报销流程
    'WF_CW_BXSQ_YWJDF_TY': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //总经理总裁业务接待费报销流程
    'WF_CW_BXSQ_YWJDF_ZJLZC': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //通用部门会议费报销流程
    'WF_CW_BXSQ_HYF_TY': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //通用部门培训费报销流程
    'WF_CW_BXSQ_PXF_TY': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //通用部门罚没支出费用报销流程
    'WF_CW_BXSQ_FMZC_TY': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //总经理总裁特殊纳税费用报销流程
    'WF_CW_BXSQ_TSNSFY_ZJLZC': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //财务部财务费用报销流程
    'WF_CW_BXSQ_CWFY_CWB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //运营部长期兼职人员工资报销流程
    'WF_CW_BXSQ_CQJZRYGZ_YYB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //人事部办公费用报销流程
    'WF_CW_BXSQ_BGFY_RSXZB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //人事部福利费报销流程
    'WF_CW_BXSQ_FLF_RSXZB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //人事部物业费报销流程
    'WF_CW_BXSQ_WYF_RSXZB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //金融售后服务部会议费报销流程
    'WF_CW_BXSQ_HYF_JRSHFWB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    //金融售后服务部差旅费报销流程
    'WF_CW_BXSQ_CLF_JRSHFWB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/procReimburse/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppRemburse/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppRemburse/'
    },
    // 借款流程
    'WF_CW_JKSQ_TY': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyLoan/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppLoan/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppLoan/'
    },
    // 金融售后服务部借款流程
    'WF_CW_JKSQ_JRSHFWB': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyLoan/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppLoan/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppLoan/'
    },
    'WF_CW_JKSQ_ZJLZC': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyLoan/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppLoan/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppLoan/'
    },
    'WF_HR_JBSQ_HEAD': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyOvertime/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppOvertime/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppOvertime/',
      // 我的抄送列表去往路由
      ccsRoute: '/process/ccs/AppCssOvertime/'
    },
    'WF_HR_JBSQ_EMPLOYEE': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyOvertime/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppOvertime/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppOvertime/',
      // 我的抄送列表去往路由
      ccsRoute: '/process/ccs/AppCssOvertime/'
    },
    'WF_HR_HOLIDAY_EMPLOYEE': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyholidy/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppHoliday/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppHoliday/',
      // 我的抄送列表去往路由
      ccsRoute: '/process/ccs/AppCssHoliday/'
    },
    'WF_HR_HOLIDAY_HEAD': {
      // 我的待办列表去往的路由
      chargeRoute: '/process/todo/ProcMyholidy/',
      // 我的申请列表去往路由
      applicationRoute: '/process/application/AppHoliday/',
      // 我的经办列表去往路由
      disposeRoute: '/process/dispose/AppHoliday/',
      // 我的抄送列表去往路由
      ccsRoute: '/process/ccs/AppCssHoliday/'

    },

  }
}
