import Vue from 'vue';
import Router from 'vue-router';
import routers from './vuex/routers';
import index from './views/index.vue';
import dragAndDrop from './js/vue.drag-and-drop';
import filter from './js/vue.filter';
Vue.use(Router);
Vue.use(dragAndDrop); // 拖拽插件
Vue.use(filter); // 自定义全局过滤器
var router = new Router({
    linkActiveClass: 'active'
});

routers(router);
router.start(index, '#app');
