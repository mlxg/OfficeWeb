import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';
import mutations from './mutations';
import state from './states';
import loginCmp from '../../modules/loginCmp'
import forgetPwdCmp from '../../modules/forgetPwdCmp'
import headNavBar from '../../modules/headNavbarCmp'
import newProcess from '../../modules/newProcess'
import globalDialog from '../../modules/globalDialog'
import globalSelect from '../../modules/globalSelect'
import taskInfoCmp from '../../modules/taskInfoCmp'
import taskIndexCmp from '../../modules/taskIndexCmp'
import noticesNumberCmp from '../../modules/noticesNumberCmp'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares,
  modules: {
    loginCmp,
    forgetPwdCmp,
    headNavBar,
    newProcess,
    globalDialog,
    globalSelect,
    taskInfoCmp,
    taskIndexCmp,
    noticesNumberCmp
  }
});
