<!-- 人力资源 --- 员工档案 --- 离职人员档案 -->
<template>
    <form class="clearfix">
        <div class="g-padding20 clearfix">
            <div class="form-group clearfix g-paddingB20">
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 row">部门：</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" value="MIS产品部" placeholder="">
                    </div>
                </div>
            </div>
            <div class="form-group clearfix g-paddingB20">
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 row">姓名：</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control" value="张三" placeholder="">
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 ">职务类型：</label>
                    <div class="col-sm-7">
                        <!--<Selection :options="{ }"></Selection>-->
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 control-label">职务：</label>
                    <div class="col-sm-7">
                        <!--<Selection :options="{ }"></Selection>-->
                    </div>
                </div>
            </div>
            <div class="form-group clearfix g-paddingB20 ">
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 row">办公地点：</label>
                    <div class="col-sm-7">
                        <!--<Selection :options="{ }"></Selection>-->
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 ">入职时间：</label>
                    <div class="col-sm-7">
                        <input type="text" class="form-control g-ib g-w45" value="张三">&nbsp;-
                        <input type="text" class="form-control g-ib g-w45 g-fr" value="张三" placeholder="">
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="" class="col-sm-4">学历：</label>
                    <div class="col-sm-7">
                        <!--<Selection :options="{ }"></Selection>-->
                    </div>
                </div>
            </div>
            <div class="form-group clearfix g-paddingB20">
                <div class="col-sm-4">
                    <label for="" class="col-sm-4 row">职级：</label>
                    <div class="col-sm-7">
                        <!--<select class="form-control">-->
                            <!--<Selection :options="{ }"></Selection>-->
                        <!--</select>-->
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="" class="col-sm-4">所属项目：</label>
                    <div class="col-sm-7">
                        <!--<select class="form-control">-->
                            <!--<Selection :options="{ }"></Selection>-->
                        <!--</select>-->
                    </div>
                </div>
                <div class="col-sm-4">
                    <label for="" class="col-sm-4">状态：</label>
                    <div class="col-sm-7">
                        <!--<select class="form-control">-->
                            <!--<Selection :options="{ }"></Selection>-->
                        <!--</select>-->
                    </div>
                </div>
            </div>
            <div class="form-group clearfix g-paddingB20">
                <div class="col-sm-3">
                    <button type="button" class="btn btn-primary g-marginR30">查询</button>
                </div>
            </div>
            <div class="form-group clearfix col-sm-12">
                <public-table></public-table>
            </div>
        </div>
    </form>
</template>

<script>
    import Selection from '../../components/public/ToolSelection.vue';
    import PublicTable from '../../components/public/PublicTable.vue';
    export default {
        components: {
            Selection,
            PublicTable

        }
    }
</script>
