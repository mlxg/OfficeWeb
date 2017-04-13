<template>
    <Headers></Headers>
    <div class="g-bd">
        <left-menu v-if="subMenu.length"></left-menu>
        <div class="m-conter" :class="subMenu.length ? '' : 'single-cnt'">
            <!-- 内容面板部分的路由 -->
            <router-view></router-view>
        </div>
    </div>
    <div class="g-ft"></div>
</template>

<script>
    import Headers from './public/Head.vue';
    import LeftMenu from './public/LeftMenu.vue';
    import { getSubMenus } from '../getters/headNavbarGetter'
    export default {
        vuex: {
          getters: {
            subMenu: getSubMenus
          }
        },
        components: {
            Headers,
            LeftMenu
        }
    }
</script>
