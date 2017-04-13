<template>
    <div class="m-conter">
        <h2 class="g-tc u-fs20 g-marginB20">招聘申请</h2>
        <div class="form-group clearfix">
            <p>提示：拟稿申请----请按要求填写表单。</p>
        </div>
        <form class="clearfix">
            <div class="g-padding20 u-bdr">
                <Tool-form
                        :params="params"
                ></Tool-form>
                <div class="form-group clearfix col-sm-12">
                    <h3 class="u-fs16">职责描述</h3>
                    <div class="form-group clearfix g-marginB20">
                        <button class="btn btn-default g-fr" type="submit">添加</button>
                    </div>
                    <table class="table table-hover table-bordered">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>工作职责（按重要程序排列）</th>
                            <th>要求工作成效</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <a href="">编辑</a><a href="">删除</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <Tool-form
                        number="2"
                        :params="params"

                ></Tool-form>
            </div>
        </form>
        <div class="form-group g-tc g-marginT20">
            <button type="button" class="btn btn-primary g-marginR30">提交</button>
            <button type="button" class="btn btn-default">取消</button>
        </div>
    </div>
</template>

<script>
    import ToolForm from '../public/ToolForm.vue';
//    import { } from '../../getters/procRecruitGtter';
//    import { } from '../../actions/procRecruitAction';
    export default{
        data(){
        },
        vuex: {
            getters: {
            },
            actions: {  //行为  所有公共的方法 执行请加bouncedFun()
            }
        },
        components:{
            ToolForm
        },
        ready(){
        }
    };

</script>
