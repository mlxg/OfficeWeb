import Login from '../views/Login.vue';
import ForgetPwd from '../views/ForgetPwd.vue';
import ProcRecruitment from '../views/ProcRecruitment.vue';
import noFind from '../components/404.vue';
import TaskIndex from '../views/TaskIndex.vue';
import TaskInfo from '../views/TaskInfo.vue';
export default (router) => router.map(
    {
        '/': {
            name: 'login',
            component: Login
        },
        '/forgetPwd': {
            name: 'forgetPwd',
            component: ForgetPwd
        },
        '/procRecruitment': {
            name: 'procRecruitment',
            component: ProcRecruitment
        },
        '/taskIndex':{
            name: 'taskIndex',
            component: TaskIndex
        },
        '/taskIndex/:id':{
            name: 'taskInfo',
            component: TaskInfo
        },
        '*': {
            component: noFind
        }
    }
);

