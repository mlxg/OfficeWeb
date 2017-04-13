/**
 * Created by Huhy on 2016/9/14.
 */
export default {
  component: {
    template: '<router-view></router-view>',
  },
  subRoutes: {
    //员工档案
    '/arc': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/hr/HrFileServing')
        },
        '/procMyEntry/:businessKey/0/0/0': {
          // 员工档案详情
          component: require('../views/process/ProcTransferEntry')
        },
        '/EditMyEntry/:businessKey/0/0': {
          // 员工档案详情
          component: require('../views/process/EditMyEntry')
        }
      }

    },
    // 招聘需求列表
    '/demand': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes: {
        '/': {
          component: require('../views/hr/HrDemand')
        },
        '/procMyJob/:businessKey/:taskId/0/0': {
          // 招聘需求详情
          component: require('../views/process/ProcTransferJob')
        }
      }
    },
    // 录用申请列表
    '/HireList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HireList')
        },
        '/procMyHire/:businessKey/:taskId/0/0': {
          // 招聘需求详情
          component: require('../views/process/AppHire')
        }
      }
    },
    // 转正申请列表
    '/PosiList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HrposList')
        },
        '/AppPositive/:businessKey/:taskId/0/0': {
          // 招聘需求详情
          component: require('../views/process/AppPositive')
        }
      }
    },
    // 离职申请列表
    '/ToverList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HrToverList')
        },
        '/AppTover/:businessKey/:taskId/0/0': {
          // 离职详情
          component: require('../views/process/AppTover')
        }
      }
    },
    // 人事异动
    '/ChangeList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HrChangeList')
        },
        '/AppChange/:businessKey/:taskId/0/0': {
          // 离职详情
          component: require('../views/process/AppChange')
        }
      }
    },
    // 加班申请
    '/OvertimeList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HrOvertimeList')
        },
        '/AppOvertime/:businessKey/:taskId/0/0': {
          // 离职详情
          component: require('../views/process/AppOvertime')
        }
      }
    },
    // 考勤异常
    '/UnusualList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HrUnusualList')
        },
        '/AppUnusual/:businessKey/:taskId/0/0': {
          // 详情
          component: require('../views/process/AppUnusual')
        }
      }
    },
    // 请休假
    '/HolidayList': {
      component: {
        template: '<router-view></router-view>'
      },
      subRoutes:{
        '/':{
          component: require('../views/hr/HrHolidayList')
        },
        '/AppHoliday/:businessKey/:taskId/0/0': {
          // 详情
          component: require('../views/process/AppHoliday')
        }
      }
    },
    // 外勤
    // '/FieldList': {
    //   component: {
    //     template: '<router-view></router-view>'
    //   },
    //   subRoutes:{
    //     '/':{
    //       component: require('../views/hr/HrFieldList')
    //     },
    //     '/AppField/:businessKey/:taskId/0/0': {
    //       // 详情
    //       component: require('../views/process/AppField')
    //     }
    //   }
    // }
  }
}
