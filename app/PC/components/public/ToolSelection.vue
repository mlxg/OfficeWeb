<template>
  <select class="form-control" name="{{name}}">
    <option v-for="item in curData" value="{{item.value}}" :selected="$index === 0 ? true : false">{{item.label}}</option>
  </select>
</template>
<script>
  import {getCurData, getUrl, getCurType} from '../../getters/globalSelectGetter'
  import {resetCurType, getDataByType} from '../../actions/selectAction'
  export default {
    props: ['name', 'selectTypeIndex', 'allSelectTypes'],
    created(){
      this.init(this.allSelectTypes, this.curTypes);
      this.getData(this.data, this.selectTypeIndex)
    },
    vuex: {
      getters: {
        data: getCurData,
        curTypes: getCurType,
        url: getUrl
      },
      actions: {
        init: resetCurType,
        getData: getDataByType
      }
    },
    computed: {
      curData: function () {
        return this.data[this.allSelectTypes[this.selectTypeIndex]]
      }
    }
  };
</script>
