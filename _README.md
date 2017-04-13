## 项目文件目录介绍 及 快速定位
###vue文件夹
 - vue单一文件（页面特有的元素 PC components -> other
 - vue公共文件 PC components -> public
 - vue页面文件 PC views

html以及css部分规则
1. 少用 a标签,禁用 table布局 ,少用form
2. 所有取值都用name，不要用id去进行取值
3. 按钮类全部用buttom
4. 图片尽量做背景图 用 <em> 标签做图标的承载
5. class 的名称根据功能
6. 层级尽量少，少用块级标签。
7. 图片不需要整合成雪碧图，单个单个切图
8.  标签必须对应  例如<li></li>
9. css中不要使用 ！important
10. 所有的取值都用name去进行取值
11. input所有取值的表示时 [name=‘paramName’]
12. 尽量不要用空格填充位置，用替代符号

vue 书写部分规范
1.  所有vue的文件名首鞋写字母大写 如：App.vue
2.  组建的ohters 中的组建用页面级组建打头 如 登录页面的登录框 LoginTab
3.  公共组建用Public打头 如 公共头部组建:PublicHeader
4.  工具类组建用Tool打头 如 工具类的列表 : ToolTable
5.  尽可能的少用js去直接操作dom层
6.  模版里面的标签必须成对 例如：

```
    <li> </li>
```
7. &lt;input&gt; &lt;hr&gt; 等 单标签 无需闭口 错误例子: &lt;hr /&gt;
8. 带参数的组建在模版类引用 用一下的方式进行引用:
    例如:

```
        <Btm-cnt
                :params='loginGetBtmCnt'
                :onclick='loginFun'
                :loadflag='loginLoadFlag'>
        </Btm-cnt>
```
vuex各文件编写规范

1.action文件名 是 页面名 + Action 例如 登录页的action文件:loginAction
   文件中的参数 页面名 + 最终组建名 + 功能名 + FUN 例如:login页面的登录动作 loginLoginTabLoginFun
   例如 :

```javascript
    export const loginLoginTabBouncedFun=function({ dispatch, state },param){
       dispatch(types.LOGINTAB_BOUNCED,param);
    };
```

2.getter文件 是 页面名 + Getter 例如 登录页的Getter文件:loginGetter
   中的参数 页面级的state名 + Get + 最终组建名 + 最终state节点名 例如:获取state.login 下loginTab组建下的result
   例如:

```
    export const loginGetLoginTabResult = state => state.loginCmp.loginTabCmp.result;   //登录请求后返回的json
```

3.constants文件夹中的Types 是 页面名 + Types 例如 登录页的Getter文件:loginTypes
   文件中的参数 组建名 + "_" + 功能 且全部大写 例如:LoginTab中的切换
    例如:

```
    export const LOGINTAB_BOUNCED = 'LOGINTAB_BOUNCED';
```

4.initState 文件夹中的State 是 页面名 + State 例如 登录页的Getter文件:loginState
   中文件的参数 从 页面级开始 ,依次组建 到组建的各级状态以及参数.如果一个组建复用多个组建,用1,2,3区分开来
   命名规则:
        代表组建的节点用Cmp结尾,
        标志控制器类用Flag结尾,
        代表请求后返回的数据固定用result,
        接口形式固定用source
        样式类用class
        其他自行定义
        例如:

```
    export const loginState = {
                   // 应用启动时，初始化的state
                   loginCmp: { //Login组建
                       loginTabCmp: { //LoginTab登陆框组建
                           bouncFlg: false,
                           btnFlag: true, //BtmCnt的控制器
                           source: 'json/login.json', //login的路径
                           btmCntCmp: { //BtmCnt提交组建
                               class: "login_btn btn2",
                               btnName: "登录",
                               loadName: "登录中..."
                           },
                           btmCntCmp2: { //BtmCnt第二个提交组建
                                  class: "login_btn btn2",
                                  btnName: "登录",
                                  loadName: "登录中..."
                                                  },
                           getOtp:{    //GetOtp 获取手机验证码组建
                               class : "",
                               otpTime : 60,   // 倒数
                               otpFlag : ""
                           }
                       }
                   }
               };
```

5.moudel 文件名后加Cmp
引入的state以及mutations 别名必须为state以及mutations
    例如 :

```
    import state from '../initState/loginState';
    import mutations from '../mutation/loginMutation';
```



6.validateAndSubmit 方法使用规则:

```
    /**  参数                 含义
      *  dispatch:           action里面的dispatch
      *  getState:           action里面的dispatch
      *  dispatch:           action里面的dispatch
      *  dispatch:           action里面的dispatch
      * */
     validateAndSubmit=({
        dispatch,
        getState,            //action里面的getState
        componentLst,     //成功后返回数据存储在state上的位置,只能为数组形式,从开始的组建名到最后组建名 例如:['loginCmp','loginTabCmp','btmCntCmp']
        validates,        //校验的数组,详细参考下面validates的讲解
        submitType,    //提交方式,默认为psot
        moreParams,       //更多的参数,可直接写提交date,json格式
        loadFlg,       //默认值fasle 当为false标志此按钮不需要loading状态的切换,若需要,请写state上对应的上loadFlg的标志
        otpFlag,       //获取验证码专属 当为fasle时不启动,当为获取验证码的标志时启动,表示此请求成功后倒数
        isCheck        //是否只校验,默认false,表示校验提交.若为true,表示只校验,不通过则报错,通过则返回json
     })

    /**
    *    validates
    * {
    *      'name':'节点名',                                      //节点的name值
    *      'rules':[{'rule':'isEmpty','errorMsg':'用户名不能为空'},{'rule':'isEmpty','errorMsg':'用户名不能为空','checkName'}],
    *      'paraName  '成功时返回json的参数名,默认跟name一直',
    *      'isParam  '是否返回输入json,默认为true返回',
    *      'checkClass  '选中的name,一般为class,默认为false',
    *      'rules':'校验规则,存在多个rules校验顺序从后往前.'
    *      'checkName  '对比参数的name,主要是俩次密码校验,大小的对比等...默认不开启,',
    *      'rule': '规则',具体规则扩展请在validate包下的lib包的rule
    *      'errorMsg':'错误信息,当校验为通过时所'
    *
    *  },
    * */

     /* 案例 : */
     validateAndSubmit({
         dispatch: dispatch,
         getState: state,
         componentLst: ['loginCmp','loginTabCmp','btmCntCmp'],
         loadFlg: 'btnFlag',
         moreParams: {autoLogin: autoLogin},
         validates: [
             {'name': 'userName', 'rules': [{'rule': 'isEmpty', 'errorMsg': '用户名不能为空'}]},
             {'name': 'password', 'rules': [{'rule': 'isEmpty', 'errorMsg': '密码不能为空'}]},
             {'name': 'loginType', 'checkClass': 'current'}
         ]
     });
```

7.代码构建
使用远程访问终端访问 192.168.1.46
远程访问192.168.1.46服务器方法如下：
下载并安装任意一款ssh client工具（或者打开source tree的命令行模式），运行如下命令：
ssh ihavecar@192.168.1.46 -p 22612
  然后输入密码：px5#dCE6
即可完成登录！
===================================================================
生产环境（勿动）（http://oa.xingxingcar.com/#!/login）代码更新：
进入/home/app/nodejs/data/StarOffice-Web路径下（当前路径为git仓库的根路径）
切换到dev分之：git checkout dev
查看当前分之的状态：git status
拉取远程仓库的代码：git pull  (拉取之后，查看当前状态，如果需要提交 则使用'git add .'，'git commit -m"comment"'来提交未跟踪的文件)
拉取完并保证dev分之无可用的提交之后，切换到master分之：git checkout master
将dev分之合并到master分之上：git merge dev （如果有冲突，则解决冲突并提交）
将合并的内容推送到远程仓库：git push

===================================================================
UAT环境（http://uatoa.xingxingcar.com/#!/login）代码更新：
进入/home/app/nodejs/data/StarOffice-Web路径下（当前路径为git仓库的根路径）
切换到dev分之：git checkout dev
查看当前分之的状态：git status
拉取远程仓库的代码：git pull  (拉取之后，查看当前状态，如果需要提交 则使用'git add .'，'git commit -m"comment"'来提交未跟踪的文件)
拉取完并保证dev分之无可用的提交之后，切换到release分支：git checkout release
将dev分之合并到master分之上：git merge dev （如果有冲突，则解决冲突并提交）
将合并的内容推送到远程仓库：git push

===================================================================
测试环境（http://192.168.1.46:28000/index.html#!/login）代码更新：
进入/home/app/nodejs/data/StarOffice-Web路径下（当前路径为git仓库的根路径）
切换到dev分之：git checkout dev
查看当前分之的状态：git status
拉取远程仓库的代码：git pull  (拉取之后，查看当前状态，如果需要提交 则使用'git add .'，'git commit -m"comment"'来提交未跟踪的文件)
拉取完并保证dev分之无可用的提交之后，切换到test分之：git checkout test
将dev分之合并到test分之上：git merge dev （如果有冲突，则解决冲突并提交）
将合并的内容推送到远程仓库：git push

===================================================================
开发环境（http://192.168.1.46:18000/index.html#!/login）代码更新：
进入/home/app/nodejs/data/StarOffice-Web路径下（当前路径为git仓库的根路径）
切换到dev分之：git checkout dev
查看当前分之的状态：git status
拉取远程仓库的代码：git pull  (拉取之后，查看当前状态，如果需要提交 则使用'git add .'，'git commit -m"comment"'来提交未跟踪的文件)
拉取完并保证dev分之无可用的提交之后，切换到develop分支：git checkout develop
将dev分之合并到master分之上：git merge dev （如果有冲突，则解决冲突并提交）
将合并的内容推送到远程仓库：git push

然后进入Jenkins平台点击立即构建即可完成更新部署
开发环境：http://192.168.1.15:8080/jenkins/view/MIS%E5%B9%B3%E5%8F%B0-%E5%BC%80%E5%8F%91/job/mis-staroffice-web-dev/
测试环境：http://192.168.1.15:8080/jenkins/view/MIS%E5%B9%B3%E5%8F%B0-%E6%B5%8B%E8%AF%95/job/mis-staroffice-web-test/
