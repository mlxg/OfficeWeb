<template>
    <div class="{{ !!tr.trClass ? tr.trClass : trClass}}"  v-for= "tr in params" >
        <section v-for="item in tr.td">
            <label class="{{ !!item.labelClass ?item.labelClass : labelClass}}">{{ item.label }}</label>
            <div class="{{!!item.textClass ? item.textClass : textClass}}">
                <span v-if="item.type =='span'" class="writing">{{ item.value }}</span>
                <input v-if="item.type =='text'" name="{{item.name}}" type="text" class="{{!!item.typeClass ?item.typeClass:typeClass}}" readonly value="{{ item.value }}" >
                <input v-if="item.type =='file'" name="{{item.name}}" type="file" class="{{!!item.typeClass ?item.typeClass:typeClass}}"  >
                <input v-if="item.type =='input'" name="{{item.name}}" type="text" class="{{!!item.typeClass ?item.typeClass:typeClass}}" value="" placeholder="{{ item.placeholder }}" >
                <textarea v-if="item.type =='textarea'" name="{{item.name}}" class="{{!!item.typeClass ?item.typeClass:typeClass}}" rows="{{item.rows}}"  ></textarea>
                <Tool-selection
                        v-if="item.type =='selection'"
                        :options="item.value"
                >
                </Tool-selection>
                <label v-if="item.type =='checkbox'" class="{{!!item.typeClass ?item.typeClass:typeClass}}" v-for="checkItem in item.value">
                    <input type="checkbox" name="{{item.name}}" :value="checkItem.value">{{checkItem.text}}
                </label>
                <!--<Tool-table v-if="item.type =='table'"-->
                            <!--class="table table-hover table-bordered"-->
                <!--&gt;-->
                <!--</Tool-table>-->
            </div>
        </section>
    </div>
</template>
<script>
    /**
     *[{
     * labelClass: 默认form-group clearfix
     * valueClass: 默认form-control
     * type,  text,file,input,textarea,selection,checkbox,span,table
     * label,
     * value,type =select [{text,value,class}]
     * placeholder,
     * name,
     * double:true,
     * rows     //当类型为textarea存在合并多少行
     * }]
     */
    import ToolSelection from './Selection.vue';
//    import ToolTable from 'Selection.vue'; //调用table组建
    export default{
        props: ['params'],
        data() {
            return{
                trClass: 'form-group clearfix',
                labelClass : 'col-sm-2 control-label',
                textClass: 'col-sm-4',
                typeClass : 'form-control'
            }
        },
        components:{
            ToolSelection
        }
    }
</script>
