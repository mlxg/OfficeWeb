<style>
    ul.public-error-transition{position: fixed; left: 30px;bottom: 30px;margin: 0;padding: 0;list-style: none; z-index: 1000;opacity: 1;border-radius: 3px;transition: all .4s ease;}
    ul.public-error-enter,.public-error-leave{bottom:-30px; opacity: 0;transform: translate3d(0,-10px, 0); }
    ul.public-error-transition li{user-select: none; position: relative; width: 300px; padding: 12px 50px 12px 46px; font-size: 14px;line-height: 24px;text-align: left;background-color: #fff;border-left-style: solid;border-left-width: 4px;border-radius: 3px;box-shadow: 0 7px 21px 0 rgba(234, 85, 16, 0.15); color: #383838;border-color: red;}
    ul.public-error-transition li p{margin: auto;width:200px; }
    .inblok-16-auto{display: inline-block;height: 16px; min-width: 16px;text-align: left;line-height: 16px;}
    ul.public-error-transition li p em{background: url("../../images/public-error.png") no-repeat transparent;}
    ul.public-error-transition li a{position: absolute;right: 18px;top: 17px;background: url("../../images/pop-close.png") 0/100% no-repeat transparent;}
    </style>
<template>

    <ul v-if="taskInfoGetPublicError"  transition='public-error' transition-mode="out-in"  >
        <li>
            <p>
                <em class="inblok-16-auto"></em>
                <span class="inblok-16-auto">{{taskInfoGetPublicError}}</span>
            </p>
            <a class="inblok-16-auto" @click.stop="taskInfoShowOrHideErrorFun(false)"></a>
        </li>
    </ul>
</template>
<script>
    import {taskInfoGetPublicError} from '../../getters/taskInfoGetter';
    import {taskInfoShowOrHideErrorFun} from '../../actions/taskInfoActions';
    export default{
        vuex:{
            getters:{
                taskInfoGetPublicError
            },
            actions:{
                taskInfoShowOrHideErrorFun
            }
        }
    }
</script>
