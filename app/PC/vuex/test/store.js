import Vuex from 'vuex';
import Vue from 'vue';
import middlewares from './middlewares';
import mutations from './mutations';
import state from './states';
Vue.use(Vuex);
/* eslint-disable no-new */
export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  middlewares
});
