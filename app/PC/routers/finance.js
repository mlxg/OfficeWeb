/**
 * Created by sungx on 16/12/22.
 */
export default {
  component: {
    template: '<router-view></router-view>',
  },
  subRoutes: {
    // 财务管理列表
    '/reimbList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/Finance/FinaList/ReimburseList')
        },
        '/AppRemburse/:businessKey/:taskId/0/0': {
          // 贷款详情
          component: require('../views/Finance/FinaProcess/AppRemburse')
        }
      }
    },
    '/loanList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/Finance/FinaList/LoanList')
        },
        '/appLoan/:businessKey/:taskId/0/0': {
          // 借款详情
          component: require('../views/Finance/FinaProcess/AppLoan')
        }
      }
    }
  }
}
