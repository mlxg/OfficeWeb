<template>
    <div class="lookscreen" v-show="lookscreen.isShow">
        <img src="../../images/lookscreen.gif">
    </div>
</template>

<script>
    export default {
        data: function() {
        return {

            };
        },
         props: {
             lookscreen: {
                type: Object,
                default: function(){
                    return {};
                }
            },
        },
    };
</script>

<style lang="less">
    .lookscreen{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.1;
        margin-left: -10px;
        margin-top: -20px;
        top:0px;
        z-index:999;
    }
    .lookscreen img{
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        margin-left: 120px;
    }
</style>
