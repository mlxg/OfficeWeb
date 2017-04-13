import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';
import mutations from './mutations';
import state from './states';
import loginCmp from '../modules/loginCmp'
import forgetPwdCmp from '../modules/forgetPwdCmp'
import taskInfoCmp from '../modules/taskInfoCmp'
import taskIndexCmp from '../modules/taskIndexCmp'
Vue.use(Vuex);
/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares,
  modules: {
    loginCmp,
    forgetPwdCmp,
    taskInfoCmp,
    taskIndexCmp

  }
});
