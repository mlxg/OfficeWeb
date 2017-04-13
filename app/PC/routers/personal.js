/**
 * Created by Huhy on 2016/9/14.
 */
export default {
  component: {
    template: '<router-view></router-view>',
  },
  subRoutes: {
    '/per':{
      component: require('../views/personal/FileNav'),
        subRoutes: {
        //我的档案
        '/myfile':{
          component: require('../views/personal/PCMyFile')
        },
        //下属档案
        '/subfile':{
          component: require('../views/personal/PCSubFile')
        }
      }
    },
    //通讯录
    '/contacts':{
      component: require('../views/personal/PCcontacts')
    },
    // 消息中心
    '/notice': {
      component: require('../views/personal/MessageCenter')
    }
  }
}
