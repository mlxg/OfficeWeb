/**
 * Created by Huhy on 2016/9/14.
 */
export default {
  component: {
    template: '<router-view></router-view>'
  },
  subRoutes: {
    // 待办事宜
    '/todo': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/process/ProcMyCharge')
        },
        '/ProcMyJob/:businessKey/:taskId/:humanTaskId/0': {
          // 招聘需求详情
          component: require('../views/process/ProcTransferJob')
        },
        '/ProcMyHire/:businessKey/:taskId/:humanTaskId/0': {
          // 录用申请详情
          component: require('../views/process/ProcTransferHire')
        },
        '/ProcMyEntry/:businessKey/:taskId/:humanTaskId/0': {
          // 入职申请详情
          component: require('../views/process/ProcTransferEntry')
        },
        '/ProcMyPositive/:businessKey/:taskId/:humanTaskId/0': {
          // 转正申请详情
          component: require('../views/process/ProcTransferPos')
        },
        '/ProcMyTover/:businessKey/:taskId/:humanTaskId/0': {
          // 离职申请详情
          component: require('../views/process/ProcTransferTover')
        },
        '/ProcMyChange/:businessKey/:taskId/:humanTaskId/0': {
          // 人事异动详情
          component: require('../views/process/ProcTransferChange')
        },
        '/ProcMyUnusual/:businessKey/:taskId/:humanTaskId/0': {
          // 考勤异常详情
          component: require('../views/process/ProcTransferUnusual')
        },
        '/ProcMyDimissal/:businessKey/:taskId/:humanTaskId/0': {
          // 解聘申请详情
          component: require('../views/process/ProcTransferDimissal')
        },
        'procReimburse/:businessKey/:taskId/:humanTaskId/0': {
          // 报销
          component: require('../views/Finance/FinaProcess/ProcTransferReimburse')
        },
        '/ProcMyLoan/:businessKey/:taskId/:humanTaskId/0': {
          // 借款申请详情
          component: require('../views/Finance/FinaProcess/ProcTransferLoan')
        },
        '/ProcMyOvertime/:businessKey/:taskId/:humanTaskId/0': {
          // 加班
          component: require('../views/process/ProcTransferOvertime')
        },
        '/ProcMyholidy/:businessKey/:taskId/:humanTaskId/0': {
          // 请假
          component: require('../views/process/ProcTransferHoliday')
        }
      }
    },
    // 新建流程
    '/new': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/process/ProcNew')
        },
        // 招聘申请
        '/hr/recruit/:processId': {
          name: 'recruit',
          component: require('../views/hrManage/HrJob')
        },
        // 录用申请
        '/hr/hire/:processId': {
          name: 'hire',
          component: require('../views/hrManage/HrHire')
        },
        // 入职办理
        '/hr/entry/:processId': {
          name: 'entry',
          component: require('../views/hrManage/HrEntry')
        },
        // 转正申请
        '/hr/pos/:processId': {
          name: 'pos',
          component: require('../views/hrManage/HrPos')
        },
        //离职申请
        '/hr/tover/:processId': {
          name: 'tover',
          component: require('../views/hrManage/HrTover')
        },
        //解聘
        '/hr/dismissal': {
          name: 'dismissal',
          component: require('../views/hrManage/HrDismissal')
        },
        //人事异动
        '/hr/hrchange/': {
          name: 'hrchange',
          component: require('../views/hrManage/HrChange')
        },
        //考勤异常
        '/hr/unusual/': {
          name: 'unusual',
          component: require('../views/hrManage/HrUnusual')
        },
        //请(休)假流程
        '/hr/leave/': {
          name: 'leave',
          component: require('../views/hrManage/HrLeave')
        },
        //加班餐补
        '/hr/overtime/': {
          name: 'overtime',
          component: require('../views/hrManage/HrOvertime')
        },
        //报销
        '/finance/reimbursement/': {
          name: 'reimbursement',
          component: require('../views/Finance/Fina/Reimbursement')
        },
        //借款
        '/finance/loan/': {
          name: 'loan',
          component: require('../views/Finance/Fina/Loan')
        }
      }
    },
    //我的申请
    '/application': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/process/ProcMyAppliction')
        },
        '/procMyJob/:businessKey/:taskId/:humanTaskId/0': {
          // 招聘需求详情
          component: require('../views/process/ProcTransferJob')
        },
        '/ProcMyHire/:businessKey/:taskId/:humanTaskId/0': {
          // 录用申请详情
          component: require('../views/process/AppHire')
        },
        'ProcMyEntry/:businessKey/:taskId/:humanTaskId/0': {
          // 我的申请 -> 入职办理详情
          component: require('../views/process/ProcTransferEntry')
        },
        'AppPositive/:businessKey/:taskId/:humanTaskId/0': {
          // 转正详情
          component: require('../views/process/AppPositive')
        },
        'AppTover/:businessKey/:taskId/:humanTaskId/0': {
          // 离职
          component: require('../views/process/AppTover')
        },
        'AppChange/:businessKey/:taskId/:humanTaskId/0': {
          // 人事异动
          component: require('../views/process/AppChange')
        },
        'AppUnusual/:businessKey/:taskId/:humanTaskId/0': {
          // 考勤异常详情
          component: require('../views/process/AppUnusual')
        },
        'AppOvertime/:businessKey/:taskId/:humanTaskId/0': {
          // 加班餐补
          component: require('../views/process/AppOvertime')
        },
        'AppDimissal/:businessKey/:taskId/:humanTaskId/0': {
          // 解聘
          component: require('../views/process/AppDimissal')
        },
        'AppHoliday/:businessKey/:taskId/:humanTaskId/0': {
          // 请假
          component: require('../views/process/AppHoliday')
        },
        'AppRemburse/:businessKey/:taskId/:humanTaskId/0': {
          // 报销详情
          component: require('../views/Finance/FinaProcess/AppRemburse')
        },
        'AppLoan/:businessKey/:taskId/:humanTaskId/0': {
          // 借款
          component: require('../views/Finance/FinaProcess/AppLoan')
        }

      }
    },
    //我的经办
    '/dispose': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/process/ProcMyhandling')
        },
        '/procMyJob/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 招聘需求详情
          component: require('../views/process/ProcTransferJob')
        },
        '/ProcMyHire/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 录用申请详情
          component: require('../views/process/AppHire')
        },
        'ProcMyEntry/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 我的经办 -> 入职办理详情
          component: require('../views/process/ProcTransferEntry')
        },
        'AppPositive/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 转正详情
          component: require('../views/process/AppPositive')
        },
        'AppTover/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 离职
          component: require('../views/process/AppTover')
        },
        'AppChange/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 人事异动
          component: require('../views/process/AppChange')
        },
        'AppUnusual/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 考勤异常
          component: require('../views/process/AppUnusual')
        },
        'AppDimissal/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 解聘
          component: require('../views/process/AppDimissal')
        },
        'AppHoliday/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 请假
          component: require('../views/process/AppHoliday')
        },
        'AppRemburse/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 报销详情
          component: require('../views/Finance/FinaProcess/AppRemburse')
        },
        'AppLoan/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 借款
          component: require('../views/Finance/FinaProcess/AppLoan')
        },
        'AppOvertime/:businessKey/:taskId/:humanTaskId/:taskform': {
          // 加班
          component: require('../views/process/AppOvertime')
        },
      }
    },
    //我的抄送
    '/ccs': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/process/ProcMyCcs')
        },
        '/procMyCcsHire/:businessKey/:taskId/:humanTaskId': {
          // 抄送录用申请详情
          component: require('../views/process/ProcTransferCcsHire')
        },
        '/procMyCcsJob/:businessKey/:taskId/:humanTaskId': {
          // 抄送招聘需求详情
          component: require('../views/process/ProcTransferCcsJob')
        },
        '/AppCssHoliday/:businessKey/:taskId/:humanTaskId': {
          // 抄送招聘需求详情
          component: require('../views/process/AppCssHoliday')
        },
        '/AppCssOvertime/:businessKey/:taskId/:humanTaskId': {
          // 抄送招聘需求详情
          component: require('../views/process/AppCssOvertime')
        }
      }
    },
    //查询流程
    '/query': {
      component: require('../views/process/ProcQuery')
    },
    // 草稿箱
    '/draft': {
      component: require('../views/process/ProcDraft')
    }
  }
}
