<template>
    <ul class="m-nav g-fl">
        <li class="" v-for="item in navData" @click="changeCurRoute($index)">
            <a v-link="{path:item.route}">
                <i class="u-icon u-icon-u{{ $index + 1 }}"></i>{{ item.name }}
            </a>
        </li>
    </ul>
</template>
<script>
import { getData, changeCurRoute, initCurRoute } from '../../actions/headNavbarAction'
import { getNavBar, getUrl, getCurRoute, getIgnoreRoute, getSingleRoute, getSubMenus } from '../../getters/headNavbarGetter'

export default {
    ready: function () {
        this.initCurRoute();
        this.getData();
    },
    vuex: {
        actions: {
            getData,
            changeCurRoute,
            initCurRoute
        },
        getters: {
            navData: getNavBar,
            url: getUrl,
            curRoute: getCurRoute,
            ignoreRoute: getIgnoreRoute,
            singleRoute: getSingleRoute,
            subMenus: getSubMenus
        }
    }
}
</script>
