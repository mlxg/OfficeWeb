import Vue from 'vue'
import Router from 'vue-router'
import routers from './vuex/index/routers'
import VueResource from 'vue-resource'
import VueAsyncData from 'vue-async-data'
import VueValidator from 'vue-validator'
import httpConfig from './vuex/index/httpConfig'
import dragAndDrop from './js/vue.drag-and-drop';
import filter from './js/vue.filter';
import index from './views/index.vue'
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.use(VueResource);
Vue.use(VueAsyncData);
Vue.use(VueValidator);
Vue.use(dragAndDrop);
Vue.use(filter);
Vue.use(Router);
Vue.use(iView);
var router = new Router({
    linkActiveClass: 'active'
});
routers(router);
httpConfig(router);
router.start(index, '#app');
