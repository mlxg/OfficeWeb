<style lang="less">
    .m-tabs{
        .nav-tab{
            margin-bottom: 10px;
            border-bottom: 1px solid #e5e5e5;
            font-size: 14px;
            > li{
                float: left;
                margin-bottom: -1px;
                margin-right: 5px;
                > a {
                    background-color: #f6f6f6;
                    border: 1px solid #f6f6f6;
                    border-top-width:2px;
                    border-bottom-color: #e5e5e5;
                    padding: 8px 15px;
                    &.active {
                        cursor: default;
                        background-color: #fff;
                        border-color: #e5e5e5;
                        border-bottom-color: transparent;
                        border-top-color: #278eed;
                    }

                }
              }
        }
        .tab-cnt{
          margin-top: 30px;
        }
    }
</style>
<template>
    <div class="m-tabs">
        <ul class="nav nav-tab">
            <li v-for="item in tMenu">
                <a v-link="{path: item.route}">{{item.name}}</a>
            </li>
        </ul>
        <div class="tab-cnt">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            'tMenu': {
                type: Array,
                default: function () {
                    return []
                }
            }
        }
    }
</script>
