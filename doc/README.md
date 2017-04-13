### 组件调用说明

#### BtmCnt


#### Crumb 导航条
调用示例

```html
  <Crumb t-name="档案管理"></Crumb>
```
t-name为传入的参数，该内容将直接显示在面包屑导航条上

#### Footer

#### Head

#### NavBar


#### Modal 模态框
传入对象：options confirm cancel close
options 数据结构如下

```
{ // options
  title: '标题', // 模态框的标题
  message: '提交完毕，请等待审核！',  // 模态框显示的内容
  icon: 'success', // 模态框图标选项 可选值： success | warning (当前组件做了容错处理，所有的非法值均会被替换为warning)
  isShow: true // 模态框显示的控制器，true表示显示，false表示隐藏
}
{ // confirm
  text: '确定', // 确认类型按钮的文本
  callback: funName // 点击按钮执行的回调函数
}
{ // cancel ，如果不传该参数，则不显示该按钮
  text: '确定', // 取消类型按钮的文本
  callback: funName // 点击取消按钮执行的回调函数
}
{ // close
  callback: funName // 点击提示框关闭按钮执行的回调函数
}
```
调用示例：

```html
  <Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Modal>
  <script>
    export default {
      methods: {
        doSomething: function(){
          // code body
        }
      },
      computed: {
        options: function(){
          return {
            title: '提示',
            message: '提交完毕，请等待审核！',
            icon: 'success',
            isShow: true
          }
        },
        confirm: function(){
          let vm = this;
          return {
            text: '确定',
            callback: vm.doSomething
          }
        },
        cancel: function(){
          let vm = this;
          return {
            text: '取消',
            callback: vm.doSomething
          }
        },
        close: function(){
          let vm = this;
          return {
            callback: vm.doSomething
          }
        }
      }
    }
  </script>
```

#### Selection 下拉框
下拉组件，可接受三个参数

- name：对应select标签的name
- all-select-types：Array类型，页面里要获取的所有的下拉类型，可选的type请查阅app/PC/constants/globalSelectTypes.js
- select-type-index: 当前的下拉组件的type在all-select-types中的下标

##### 调用示例

```html
    <template>
    <div>
      <Tool-Selection :select-type-index="0" :all-select-types="type"></Tool-Selection>
      <Tool-Selection :select-type-index="1" :all-select-types="type"></Tool-Selection>
      <Tool-Selection :select-type-index="2" :all-select-types="type"></Tool-Selection>
    </div>
</template>
<script>
    import ToolSelection from '../../components/public/ToolSelection'
    import * as type from '../../constants/globolSelectTypes'
    export default{
        data(){
          return {
            type: [type.URGENCY_DEGREE, type.SEX_REQUIRE, type.BELONG_PROJECT]
          }
        },
        components: {
            ToolSelection
        }
    }
</script>
```

#### TipBorder
调用示例

```html
  <Tip-border tip="申请资料">
    <!-- 其他组件 -->
    <other-components></other-components>
    <!-- 外框内部的代码 -->
    <p></p>
  </Tip-border>
```
需要注意的是，tip-border组件实现了内容的分发，就是说你需要在外框内部写自己的代码，这样就能让整个外框包裹内部的元素


#### ToolForm
根据不同配置生成不同表单项.

运用形式:

```
  <Tool-form :params="params"></Tool-form>
```
参数说名:

```javascript
  params={trClass:'', //表单一行的样式,默认:form-group clearfix
  td:[{
      type:'text',    //表单类型:有text:只读文本,file:文件,input:输入框,textarea:输入域,selection:下拉框,checkbox:选择框,span:文字,table:列表
      label:'案例',   //标题
      labelClass:'', //标题的样式 默认:col-sm-2 control-label
      textClass:'',  //内容的样式 默认:col-sm-4
      typeClass:'',  //类型的样式 默认:form-control
      value:'世界第一',值:当类型为selection以及checkbox:[{text:'',value:''},{text:'',value:''}]},
      name:'test1'   //name名字
  }]
```

案例 :

```javascript
params:[
            {trClass:'',td:[{type:'text',label:'案例',labelClass:'',textClass:'',typeClass:'',value:'世界第一',name:'test1'},{type:'input',label:'案例',value:'世界第一',name:'test2'}]},
            {td:[{type:'file',label:'上传照片',name:'test3'}]},
            {td:[{type:'textarea',label:'文字喻',name:'test4',rows:'4',textClass:'col-sm-10'}]},
            {td:[{type:'span',label:'文字喻',name:'test5',value:'我是测试'}]},
            {td:[{type:'checkbox',typeClass:'checkbox-inline',label:'选择想',name:'test6',value:[{text:'123',value:'123'},{text:'456',value:'456'}]}]},
            {td:[{type:'selection',label:'选择想',name:'test6',value:[{text:'123',value:'123'},{text:'456',value:'456'}]}]}
        ]
```


#### ToolGetOtp
    获取验证码,获取时显示:获取中...并且不可重复点击 获取成功:倒数 提交后恢复可获取状态
```html
           运用形式:
                    <Tool-get-otp
                            :params="loginGetOtp"                       //参数
                            :onclick="loginLoginTabGetOtpFun"           //获取验证码的action
                            :stop-otp ="loginLoginTabGetStopOtpFun"     //停止倒数的action
                    >
                    </Tool-get-otp>
           参数说名:
                    params={
                               class ,              //样式类名
                               otpTime,             //倒数秒数
                               otpFlag,             //倒数进行标志,true不倒数,false倒数,默认true
                               otpLoadFlag,         //获取手机验证码laoading控制器,false 等待,true正常,默认true
                               source,              //获取验证码的source
                               result               //请求成功后的返回值
                           }

           案例 :
                    params:{
                              class : "ver_code_r",        //样式类名
                              otpTime : 60,                //倒数秒数
                              otpFlag : true,              //倒数进行标志,true不倒数,false倒数,默认true
                              otpLoadFlag:true,            //获取手机验证码laoading控制器,false 等待,true正常,默认true
                              source : 'json/login.json',  //获取验证码的source
                              result:''                    //请求成功后的返回值
                          }
```

#### ToolBtmCnt
    提交按钮组建,请求时显示:提交中...并且不可重复点击 请求成功:恢复可再次提交状态
```html
           运用形式:
                    <Tool-btm-cnt
                            :params="loginGetBtmCnt"            //参数
                            :onclick="loginLoginTabLoginFun">   //提交的action
                    </Tool-btm-cnt>
           参数说名:
                    params={
                              class,          //按钮样式
                              btnName,        //可提交状态按钮名
                              loadName,       //等待请求返回时按钮名
                              btnFlag,        //按钮的等待控制器,默认为trie
                              source,         //请求的路径
                              result          //请求的返回值
                           }

           案例 :
                    params:{
                              class: "login_btn btn2",
                              btnName: "登录",
                              loadName: "登录中...",
                              btnFlag: true, //BtmCnt的loading控制器
                              source: 'json/login.json', //login的路径
                              result:''
                          }
```


#### PublicTable
表格组件

可配置表格样式，是否排序，排序样式，操作等，以及翻页

##### 接口说明

* 源文件代码

```javascript
props: {
    'config': {
        type: Object,
        required: true,
        validator: function (value) {
            return value.fields && value.fields.length
        },
        default: function () {
            return {}
        }
    }，
    'data': {
        type: Object,
        default: function () {
            return undefined
        }
    }
}
```
    注：fields为表头的配置项，必须值，不传会在控制台报错。

* config说明

    * className：表格的样式，默认值`'table table-striped table-hover'`

    * sortClass：可排序项的表头样式，组件内为默认值`'m-sort'`编写了初步样式

    * ascClass：明确指出`asc`方式排序时的表头样式，组件内为默认值`'m-sort-asc'`编写了初步样式

    * descClass： 明确指出为`desc`方式排序时表头的样式，组件内为默认值`'m-sort-desc'`编写了初步样式

    * pageSize: 每页展示的数据量, Number类型或可转成Number类型的值，默认值为`pageList`的第一项

    * pageList：可选择的每页记录数，默认值为`[10, 20, 50]`，亦可传递如`['10', '20', '50']`

    * callback: function类型，当发生排序、页面跳转、页面展示数据条数变化时会触发该回调

        - sort：Object类型，封装了发生排序的字段以及排序方式，如`{'name': 'desc', 'txt': 'asc'}`

        - pageSiz：每页数据条数

        - pageNumber：当前页数

    * fields：Array类型，表头项的配置

        - name：字段名，对应数据的字段

        - text：要在表头显示的内容

        - sort：是否是可排序字段，值为真时会显示可排序样式，可点击触发回调

        - sortClass：为该字段对应的表头设置独特的可排序样式

        - ascClass：同上类比理解

        - descClass：同上类比理解

        - order：排序方式，值为`'desc'`、`'asc'`，由于数据是由使用者传入，所以这个项只是在初始化的时候让表头显示对应的可排序样式

        - formatter：function类型，格式化展示数据。

            + 第一个参数：该字段数据的值

            + 第二个参数：所在行的数据对象

            + 第三个参数：当前页的数据数组

            + 第四个参数：所在行数据在当前页面数据数组中的位置

        例如：

        ```javascript
        {
            name: 'test2',
            formatter: function(value, obj, array, index){
                return '<a href="/'+value.href+'" style="color: red">'+value.txt+'</a>'
            }
        },
        ```
            注：由于返回值是直接作为html代码插入，所以请确保数据的安全性。

        - operates：Array类型，操作按钮数组

            + text：按钮上显示的内容

            + className：按钮的样式

            + handler： function类型，按钮被点击时的回调

                * 第一个参数：所在行的数据

                * 第二个参数：当前页的数据数组

                * 第三个参数：所在行数据在当前页数据数组中的位置

* data说明

    - data：Array类型，当前页的数据

    - total：数据总数

    - pageNumber：当前页数，如果不传，就默认为是第1页

    - pageCount：总页数，如果不传，则会依据`total`、`pageSize`进行计算

* 使用方法

    例如：

    ```javascript
    <V-table :config="params" :data="data"></V-table>
    ```
    ```javascript
    import VTable from '../components/public/Table.vue'
    export default{
        components:{
            VTable
        },
    ```

##### [测试用例(暂无)]()