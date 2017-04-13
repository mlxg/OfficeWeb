<!-- 人力资源 --- 员工档案 --- 待入库资料 -->
<template>
    <crumb t-name="查询流程"></crumb>
    <div class="u-bg3 g-padding20">
        <div class="form-group clearfix g-paddingB20">
            <label class="col-sm-1 control-label">姓名：</label>
            <div class="col-sm-2">
                <input type="text" class="form-control" placeholder="">
            </div>
            <label class="col-sm-1 control-label g-tr">状态：</label>
            <div class="col-sm-2">
                <!--<select class="form-control">-->
                    <!--<Selection :options="{ }"></Selection>-->
                <!--</select>-->
            </div>
            <div class="col-sm-1"></div>
            <div class="col-sm-3">
                <button type="button" class="btn btn-primary g-marginR30">查询</button>
                <button type="button" class="btn btn-default">重置</button>
            </div>
        </div>
    </div>
    <div class="form-group clearfix col-sm-12">
        <public-table></public-table>
    </div>
</template>

<script>
    import PublicTable from '../../components/public/PublicTable.vue';
    import Selection from '../../components/public/ToolSelection.vue';
    export default{
        data (){
            return {
            }
        },
        components: {
            PublicTable,
            Selection
        }

    }
</script>