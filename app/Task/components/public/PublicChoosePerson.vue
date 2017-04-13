<style>
    .item { cursor: pointer; }
    .bold {font-weight: bold; }
    ul {  line-height: 1.5em; list-style-type: dot; }
    .choice-input input{margin: auto;height: 32px;width: 80%;display: inherit;}
    .proj-info-bounced .staff-list,.proj-info-bounced .choice-people{width: 100%;float: left;margin: auto;padding: 15px;}
    .proj-info-bounced .staff-list ul,.proj-info-bounced .choice-people ul{display: inline-block;width: 100%;}
    .proj-info-bounced .staff-list ul,.proj-info-bounced .choice-people ul li{background: url("../../images/level-choice.png") 140px 0 no-repeat transparent;width: 100%;}
</style>
<template>
    <div class="proj-info-bounced" style="width: 200px;height:300px; box-shadow: 0 7px 21px rgba(0,0,0,.1);border: solid 1px transparent;left:{{left}}px;top:{{top}}px">
        <header style="border:0;">
            <p class="pop-title" >
                <em class="in-block pop-close" ></em>
            </p>
        </header>
        <section class="scroll-lst"  style="height:250px;">
            <div class="choice-input">
                <input type="text" placeholder="输入姓名或者部门查找" v-model="searchQuery" >
            </div>
            <div class="choice-people"  >
                <ul >
                    <li v-for='item in nameLst'>
                        {{item.name}} &nbsp;&nbsp; {{item.deptName}}
                    </li>
                </ul>
            </div>
            <div class="staff-list" >
                <ul>
                    <li  v-for="model in taskInfoGetPerson.result | filterBy searchQuery"   style="cusor:pointer;">
                        <div    style="cursor: pointer;"
                                @click.stop="addName(model)"
                                :class="{bold: isFolder}">
                            {{model.name}} &nbsp;&nbsp; {{model.deptName}}
                        </div>
                    </li>
                </ul>
            </div>

        </section>
    </div>
</template>
<script>
    import {taskInfoGetPerson} from '../../getters/taskInfoGetter';
    export default{
        props:[
                'params',   //参数
                'add',      //选人方法
                'choiceLst', //多人选人的方法
                'left',
                'top'
        ],
        data(){
            return{
                nameLst:[],
                searchQuery:''
            }
        },
        vuex: {
            getters: {
                taskInfoGetPerson    //登录后返回的参数
            }
        },
        methods:{
            addName(model){
                this.nameLst.push(model);
            },
            removeName(model){
                this.nameLst.remove(model);
            }
        }
    }
</script>
