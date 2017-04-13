<!-- 个人中心 --- 下属档案 -->
<template>
    <form id="sub">
        <div class="g-padding20 clearfix">
            <div class="form-group clearfix g-paddingB20">
                <label class="col-sm-1 row">姓名：</label>
                <div class="col-sm-2">
                    <input type="text" class="form-control" placeholder="">
                </div>
            </div>
            <div class="form-group clearfix g-paddingB20">
                <label class="col-sm-1 row">职务：</label>
                <div class="col-sm-2">
                    <select class="form-control">
                        <option>全部</option>
                    </select>
                </div>
                <label class="col-sm-1">职级：</label>
                <div class="col-sm-2">
                    <select class="form-control">
                        <option>全部</option>
                    </select>
                </div>
                <div class="col-sm-3">
                    <button type="button" class="btn btn-submit">查询</button>
                </div>
            </div>
        </div>
    </form>
   <div class="g-padding20">
       <section class="list_bar">
           <public-table></public-table>
       </section>
   </div>
</template>
<script>
    import PublicTable from '../../components/public/PublicTable.vue';
    export default{
        data (){
            return {
                staffs: [
                    {
                        name: 'name',
                        sex: 'male',
                        number: '003',
                        dept: 'MIS',
                        duty: 'project manager',
                        level: 'boss',
                        address: 'floor 25 01',
                        email: 'abc@def.com',
                        cEmail: 'abc@xxc.com',
                        phone: '13688889999'
                    }
                ]
            }
        },
        components: {
            PublicTable
        }
    }
</script>

