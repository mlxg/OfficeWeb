<style>
    .chocie-person{ position: absolute; width: 250px; height: 300px; box-shadow: 1px 2px 8px 0 rgba(0,0,0,.15);border: solid 1px transparent;margin: 0}
    .choice-input input{margin: auto;height: 32px;width: 80%;display: inherit;}
    .chocie-person .pop-title{ height: 36px;}
    .chocie-person .scroll-wrap{ height: 220px; overflow: auto}
    .chocie-person .staff-list{line-height: 1.5em; list-style-type: dot;margin-top: 5px;}
    .chocie-person .staff-list > li{font-size: 12px !important;background: none left center no-repeat transparent; cursor: pointer; padding: 6px 12px 6px 20px !important;cursor: pointer;border: none !important;}
    .chocie-person .staff-list > li.active{background-image: url("../../images/level-choice.png"); font-weight: bold;}
    .chocie-person .staff-list > li:hover{background-color: #f5f5f5;}
</style>
<template>
    <div class="proj-info-bounced chocie-person" v-show="show" :style="{'left':left+'px', 'top':top+'px'}">
        <header style="border:0;">
            <p class="pop-title" >
                <em class="in-block pop-close" @click="close"></em>
            </p>
            <input type="text" class="form-control" placeholder="输入姓名或者部门查找" v-model="searchQuery" >
        </header>
        <section class="scroll-wrap">
            <ul class="staff-list">
                <li  v-for="model in (source || taskInfoGetPerson.result) | filterBy searchQuery"
                     @click.stop="choose(model)"
                     :class="'active' | isActive model">
                        {{model.name}} &nbsp;&nbsp; {{model.deptName}}
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
    import {taskInfoGetPerson} from '../../getters/taskInfoGetter';
    export default{
        props: {
          'left': {
            type: Number,
            default: 0
          },
          'top': {
            type: Number,
            default: 0
          },
          'show': {
            type: Boolean,
            twoWay: true,
            default: false
          },
          'single': {
            type: Boolean,
            default: true
          },
          'source': {
            type: Array
          },
          'personList': {
            type: Array,
            twoWay: true,
            required: true
          },
          'ignoreList': {
            type: Array
          },
          'callback': {
            type: Function
          },
          'closeCallback': {
            type: Function
          }
        },
        data(){
            return{
                searchQuery:''
            }
        },
        vuex: {
            getters: {
                taskInfoGetPerson    //登录后返回的参数
            }
        },
        methods:{
            choose(person){
              let vm = this;
              let index = vm.personList.findIndex(({userId}) => userId === person.id );
              if(index === -1) {
                if(vm.single)
                  vm.personList.splice(0, 1, {
                    userId: person.id || person.userId,
                    name: person.name
                  })
                else
                  vm.personList.push({
                    userId: person.id,
                    name: person.name
                  })
              }else {
                // 判断是否选了锁定的人物
                if(vm.ignoreList && vm.ignoreList.length){
                  let index = vm.ignoreList.findIndex(({userId}) => userId === person.id);
                  if(index !== -1) return
                }

                if(vm.single)
                  vm.personList.shift()
                else
                  vm.personList.splice(index, 1)
              }

              vm.callback && vm.callback(vm.personList)
            },
            close(){
              this.closeCallback && this.closeCallback(this.personList)
              this.show = false;
            }
        },
        filters: {
          isActive: function (className, person) {
            return this.personList.filter(({userId}) => userId === (person.id || person.userId) ).length ? className : '';
          }
        }
    }
</script>
