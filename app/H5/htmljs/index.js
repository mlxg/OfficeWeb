import Vue from 'vue';
import Router from 'vue-router';
import routers from '../routers';
import index from '../views/index.vue';

Vue.use(Router);
var router = new Router({
    linkActiveClass: 'active'
});
routers(router);
router.start(index, '#app');
