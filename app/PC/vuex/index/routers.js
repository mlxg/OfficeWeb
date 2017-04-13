import Login from '../../views/login/Login.vue';
import ForgetPwd from '../../views/login/ForgetPwd.vue';
import noFind from '../../views/system/404.vue';
import TaskIndex from '../../views/task/TaskIndex.vue';
import TaskInfo from '../../views/task/TaskInfo.vue';
import process from '../../routers/process'
import hr from '../../routers/hr'
import finance from '../../routers/finance'
import personal from '../../routers/personal'

export default function(router) {
    router.map(
        {
            '/login': {
                name: 'login',
                component: Login
            },
            '/forgetPwd': {
                name: 'forgetPwd',
                component: ForgetPwd
            },
            '*': {
                component: noFind
            },
            '/': {
                name: 'index',
                component: require('../../components/Index'),
                subRoutes: {
                    '/process': process,
                    '/hr': hr,
                    '/finance': finance,
                    '/personal': personal,
                    '/task':{
                      name: 'taskIndex',
                      component: TaskIndex
                    },
                    '/task/:id':{
                      name: 'taskInfo',
                      component: TaskInfo
                    },
                    'test': {
                      component: require('../../views/test.vue')
                    }
                }
            }
        }
    );
    router.alias({
        '/personal/per': '/personal/per/myfile'
    })
}
