<template>
  <public-crumb t-name="消息中心"></public-crumb>
  <div class="msg-container">
    <div class="operate">
      <!-- <button type="button" class="btn btn-default" @click="setAllRead()">全部设置为已读</button> -->
      <select class="form-control" v-model="search" v-on:change="searchFun">
        <option value="0">未读消息</option>
        <option value="1">已读消息</option>
      </select>
      <select class="form-control" v-model="search2" v-on:change="searchFun">
        <option value="">全部消息类型</option>
        <option v-for='item in noticeCategoryList' value={{item.categoryId}}>{{item.name}}</option>
      </select>
    </div>
    <div class="">
      <div class="list-group">
        <a v-for="item in list" @click="detail(item, $index)" class="list-group-item" :class="{active: $index == curIndex}">
          <p class="clearfix">
            <label class="pull-left">{{item.name}}</label>
            <time class="pull-right" datetime="{{item.createDate}}">{{item.createDate}}</time>
          </p>
          <p class="clearfix">
            {{item.title}}
            <i class="icon-unread pull-right" v-if="'0' == item.isRead">Unread</i>
          </p>
        </a>
        <div v-if="noMessage" class="no-message">
          暂无消息
        </div>
      </div>
      <div class="r-cnt">
        <div class="msg-cnt">
          {{txt}}
          <a class="message-link" v-if="showLink" @click.stop.prevent="goTo(link)">{{linkText}}</a>
          <table class="table table-striped table-hover table-bordered g-marginT20" v-if="this.msgType == '1' || this.msgType == '2'">
            <thead>
              <th>姓名</th>
              <th>部门</th>
              <th>职务</th>
              <th>办公地点</th>
              <th v-if="this.msgType == '1'">入职日期</th>
              <th v-if="this.msgType == '1'">计划转正时间</th>
              <th v-if="this.msgType == '2'">合同开始时间</th>
              <th v-if="this.msgType == '2'">合同到期时间</th>
            </thead>
            <tbody>
              <tr v-for="item in tablelist">
                <td>{{item.name}}</td>
                <td>{{item.officeName}}</td>
                <td>{{item.postionName}}</td>
                <td>{{item.workplaceDisplay}}</td>
                <td v-if="this.msgType == '1'">{{item.entrantTime}}</td>
                <td v-if="this.msgType == '1'">{{item.formalTime}}</td>
                <td v-if="this.msgType == '2'">{{item.conStartDate}}</td>
                <td v-if="this.msgType == '2'">{{item.conEndDate}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
  <div class="m-pagination">
    <Pagination :params="page"></Pagination>
  </div>
</template>
<style lang="less">
.msg-container{
  margin-top: 20px;
  .operate{
    margin: 10px 0;
    .form-control{
      width: 200px;
      display:inline-block;
    }
  }
  .list-group{
    width: 350px;
    display: inline-block;
    border-right: 1px solid #ddd;
    /* 新增布局代码 */
    float: left;
    margin: 1px 0 0 1px;
    height: 499px;
    overflow-y: auto;
    /* 布局代码结束 */
    .list-group-item{
      &:first-child{border-top-right-radius: 0;border-top-left-radius: 0;border-top: none;}
      &:last-child{border-bottom-right-radius: 0;border-bottom-left-radius: 0;border-bottom: none;}
      border-left: none;
      padding: 6px 12px;
      line-height: 1.4;
      margin-bottom: -1px;
      border-right: none;
      label{
        padding-top: 0;
      }
      .icon-unread{
        height: 10px;
        width: 10px;
        border-radius: 5px;
        background-color: #ff2f0e;
        text-indent: -999px;
      }
    }
  }
  .msg-cnt{
    display: block;
    // border: 1px solid #ddd;
    padding: 20px;
    // padding-left: 370px;
    box-sizing: border-box;
    min-height: 499px;
    vertical-align: top;
    .message-link{
      color: #337ab7;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
.r-cnt{
  padding-left: 350px;
  height: 501px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-top-left-radius: 4;
  border-bottom-left-radius: 4;
}
.m-pagination{
  display: block;
  margin: 20px;
}
.no-message{
  text-align: center;
  vertical-align: middle;
  height: 100%;
  line-height: 500px;
}
</style>
<script>
    import PublicCrumb from '../../components/public/PublicCrumb.vue';
    import { getProcessCode } from '../../vuex/index/getters';
    import { updateMsgCount } from '../../actions/headNavbarAction';
    import Pagination from '../../components/public/PublicPagination.vue';
    import * as contents from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    import { getData, changeCurRoute, initCurRoute } from '../../actions/headNavbarAction'
    import { getNavBar, getUrl, getCurRoute, getIgnoreRoute, getSingleRoute } from '../../getters/headNavbarGetter'
    export default{
        components: {
          PublicCrumb,
          Pagination
        },
        vuex: {
          actions: {
            updateMsgCount,
            changeCurRoute
          },
          getters: {
            processCode: getProcessCode,
            navData: getNavBar,
            url: getUrl,
            curRoute: getCurRoute,
            ignoreRoute: getIgnoreRoute,
            singleRoute: getSingleRoute
          }
        },
        data(){
            return{
                linkText:'点击去处理',
                noticeCategoryList:[],
                list: [{isRead: false}, {isRead: true}, {isRead: true}],
                txt: '点击左侧列表，查看信息详情',
                total: 0,
                curIndex: -1,
                link: '',
                showLink: false,
                noMessage: false,
                search: '0',
                search2: '',
                pageData: {
                  total: 0,
                  pageNumber: 1,
                  pageCount: 0,
                  pageSize: 10
                },
                getUnread: {
                  isRead: '0',
                  pageNo: 1,
                  pageSize: 10,
                  orderBy: 'createDate desc'
                },
                getAll: {
                  pageNo: 1,
                  pageSize: 10,
                  orderBy: 'createDate desc'
                },
                tablelist:[],
                msgType:''
            }
        },
        created:function () {
          this.getNoticeCategoryList();
        },
        computed: {
            page: function(){
                let vm = this;
                return {
                    total: vm.pageData.total,
                    pageNumber: vm.pageData.pageNumber,
                    pageList: vm.pageData.pageList,
                    pageSize: vm.pageData.pageSize,
                    callback: function(arg){
                        vm._loadData({
                          pageSize: arg.pageSize,
                          pageNo: arg.pageNumber,
                          orderBy: 'createDate desc'
                        })
                    }
                }
            }
        },
        asyncData: function(resolve,reject){
          let vm = this;
          // 获取消息列表
          vm.$http.post(contents.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICELIST,vm.getUnread).then((response) => {
            let result = response.json().result;
            let page = {};
            page.pageNumber = result.pageNo;
            page.total = result.count;
            page.pageSize = result.pageSize;
            let oriList = result.list;
            for(let i = 0 ; i < oriList.length ; i ++){
              if(!oriList[i].bussinessDataJsonStr) continue;
              let obj = JSON.parse(oriList[i].bussinessDataJsonStr);
              let process = this.processCode[obj.publishCode];
              let link = '';
              if (process) {
                  let router = '';
                  if (oriList[i].code == 'LCWC') {
                    router = process.applicationRoute;
                    link = router +  obj.businessKey + '/' + obj.processInstanceId + '/' + obj.id+'/0?info=true';
                  }else{
                    router = process.chargeRoute;
                    link = router +  obj.businessKey + '/' + obj.processInstanceId + '/' + obj.id+'/0';
                  };
              } else {
                link = '/task';
              }
              oriList[i].link = link;
            }
            resolve({
              'curIndex': -1,
              'pageData': page,
              'list': result.list
            });
          });
        },
        methods:{
          detail({id, isRead, content, link,type,bussinessDataJsonStr,code}, index){
            let vm = this;
            vm.link = link;
            vm.showLink = false;
            vm.curIndex = index;
            vm.txt = content;
            if(type == '4'){
              if(bussinessDataJsonStr != ''){
                let obj = JSON.parse(bussinessDataJsonStr);
                vm.tablelist = obj.noticelist;
                vm.msgType = obj.msgType;
              }
            }
            if('0' == isRead){
              vm.isShowLink(code)
              // vm.showLink = true;
              // if(type == '1')vm.showLink = false;
              // 将未读消息设置为已读
              vm.$http.post(contents.CONTENT_ROOT + interfaces.INTERFACE_UPDATEISREAD,{id:id}).then((response)=> {
                // 如果设置成功，则更新当前消息的isRead值，不发多余的请求
                if (response.json().status == '0') {
                  vm.list[index].isRead = '1';
                  // 更新头部组件的消息未读数
                  vm.updateMsgCount(contents.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICENUM);
                }
              });
            }
          },
          /**
           * 该功能已废弃
           * */
          setAllRead(){
            this.$http.post(contents.CONTENT_ROOT + interfaces.INTERFACE_UPDATEALLISREAD).then((response)=> {
              if(response.json().status == '0'){
                // flush current page
                alert('set success!');
              }
            });
          },
          isShowLink:function (code) {
            let vm = this;
            switch (code) {
              case 'LCDB':
                vm.showLink = true;
              break;
              case 'LCBH':
                vm.showLink = true;
              break;
              case 'LCCB':
                vm.showLink = true;
              break;
              case 'LCWC':
                vm.showLink = true;
              break;
              case 'LCCS':
                vm.showLink = true;
              break;
              default:
              break;
            };
            if (code == 'LCWC') {
              vm.linkText = '点我去查看'
            }else{
              vm.linkText = '点击去处理'
            }
          },
          _loadData: function(page){
            let vm = this;
            if ('string' == (typeof page.pageSize)) page.pageSize = parseInt(page.pageSize);
            // 查询时处理消息类型
            if('all' != vm.search){
              page.isRead = parseInt(vm.search);
            }
            page.categoryId = vm.search2;
            vm.$http.post(contents.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICELIST,page).then((response) => {
              let result = response.json().result;
              let page = {};
              page.pageNumber = result.pageNo;
              page.total = result.count;
              page.pageSize = result.pageSize;
              let oriList = result.list;
              for(let i = 0 ; i < oriList.length ; i ++){
                if(!oriList[i].bussinessDataJsonStr) continue;
                let obj = JSON.parse(oriList[i].bussinessDataJsonStr);
                let process = this.processCode[obj.publishCode];
                let link = '';
                if (process) {
                  let router = '';
                  if (oriList[i].code == 'LCWC') {
                    router = process.applicationRoute;
                    link = router +  obj.businessKey + '/' + obj.processInstanceId + '/' + obj.id+'?info=true';
                  }else{
                    router = process.chargeRoute;
                    link = router +  obj.businessKey + '/' + obj.processInstanceId + '/' + obj.id;
                  };
                } else {
                  link = '/task';
                }
                oriList[i].link = link;
              }
              vm.curIndex = -1;
              if(result.list.length){
                vm.noMessage = false;
                vm.txt = '点击左侧列表，查看信息详情';
              } else {
                vm.noMessage = true;
                vm.txt = '';
              }
              vm.pageData = page;
              vm.list = result.list;
            });
          },
          goTo: function(router){
            this.changeCurRoute(0, true);
            this.$router.go(router);
          },
          getNoticeCategoryList:function () {
            let vm = this;
            let apiUrl = contents.CONTENT_ROOT + interfaces.INTERFACE_GETNOTICECATEGORYLIST
            vm.$http.post(apiUrl,{}).then((response)=>{
              let data = response.body
              data = JSON.parse(data).result
              vm.noticeCategoryList = data
            })
          },
          searchFun: function(){
            let vm = this;
            vm.showLink = false
            this.msgType = undefined;
            vm._loadData({
              pageSize: vm.page.pageSize,
              pageNo: vm.page.pageNumber,
              orderBy: 'createDate desc'
            })
          }
        }
    }
</script>
