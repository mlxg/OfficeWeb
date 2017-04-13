import Couter from './components/Couter.vue';
import Login from './components/Login.vue';
import noFind from './components/404.vue';
export default (router) => router.map(
    {
  '/': {
    name: 'login',
    component: Login
  },

  '/login': {
    name: 'couter',
    component: Couter
  },
  '*': {
    component: noFind
  }
}
);

