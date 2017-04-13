<style>
    div.noteNum{display: inline-block;width: 18px;height: 18px;background: red;text-align: center;color: white;text-indent: 0;border-radius: 50%;margin-left: 40px;line-height: 18px;font-size: 12px;font-family: Arial;}
</style>
<template>
    <div class="m-list">
        <h3 class="u-icon"></h3>
        <ul>
            <li v-for="item in subMenus">
                <a v-link="{path: item.route}">
                    {{item.name}}
                    <div class="noteNum" v-if="item.route=='/process/todo'&&todoListNum!=0">{{todoListNum}}</div>
                    <div class="noteNum" v-if="item.route=='/process/ccs'&&copiesListNum!=0">{{copiesListNum}}</div>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { getSubMenus, getSubMenuTitle } from '../../getters/headNavbarGetter'
import { noticesNumberGetter, copiesNumberGetter } from '../../getters/noticesNumberGetter'
import { updateCopiesListNum } from '../../actions/noticesNumberActions';
export default {
    vuex: {
        actions: {
          updateCopiesListNum:updateCopiesListNum
        },
        getters: {
            subMenus: getSubMenus,
            title: getSubMenuTitle,
            todoListNum:noticesNumberGetter,
            copiesListNum:copiesNumberGetter
        }
    }
}
</script>
