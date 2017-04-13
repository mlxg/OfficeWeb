<!-- 流程中心 --- 查询流程 -->
<template>
    <crumb t-name="查询流程"></crumb>
    <div class="u-bg3 g-padding20">
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tc">流程类型：</label>
            <div class="col-sm-2">
              <select class="" name="">

              </select>
              <!-- <Tool-Selection :select-type-index="0" :all-select-types="type" v-model=""></Tool-Selection> -->
                <!-- <Selection :options="{ }"></Selection> -->
            </div>
            <label for="" class="col-sm-2 control-label g-tc">办理状态：</label>
            <div class="col-sm-2">
              <Tool-Selection :select-type-index="0" :all-select-types="type" v-model=""></Tool-Selection>
                <!-- <Selection :options="{ }"></Selection> -->
            </div>
            <label for="" class="col-sm-2 control-label g-tc">文件状态：</label>
            <div class="col-sm-2">
              <Tool-Selection :select-type-index="1" :all-select-types="type" v-model=""></Tool-Selection>
                <!-- <Selection :options="{ }"></Selection> -->
            </div>
        </div>
        <div class="form-group clearfix">
            <label for="" class="col-sm-2 control-label g-tc">申请日期：</label>
            <div class="col-sm-2">
                <input type="text" class="form-control g-ib g-w45" value="张三">&nbsp;-
                <input type="text" class="form-control g-ib g-w45 g-fr" value="张三" placeholder="">
            </div>
            <label for="" class="col-sm-2 control-label g-tc">申请部门：</label>
            <div class="col-sm-2">
              <select class="" name="">

              </select>
              <!-- <Tool-Selection :select-type-index="2" :all-select-types="type" v-model=""></Tool-Selection> -->
                <!-- <Selection :options="{ }"></Selection> -->
            </div>
            <label for="" class="col-sm-2 control-label g-tc">申请人：</label>
            <div class="col-sm-2">
              <select class="" name="">

              </select>
                <!-- <Selection :options="{ }"></Selection> -->
            </div>
        </div>
        <div class="form-group g-tc g-marginT20">
            <button type="button" class="btn btn-primary g-marginR30">查询</button>
            <button type="button" class="btn btn-default">重置</button>
        </div>
    </div>
    <public-table></public-table>
</template>

<script>
    import Crumb from '../../components/public/PublicCrumb.vue';
    import PublicTable from '../../components/public/PublicTable.vue';
    import ToolSelection from '../../components/public/ToolSelection.vue';
    import * as type from '../../constants/globalSelectTypes';
    export default{
        data (){
        return {
          type: [
            type.HANDLE_STATUS,
            type.FILE_STATUS
          ]
        }
    },
        components: {
            Crumb,
            PublicTable,
            ToolSelection
        }

    }
</script>
