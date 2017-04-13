<!-- 个人中心 --- 通讯录 -->
<style lang="less">
.search_bar.search-bar{
  background-color: #fff;
  border-top-width: 0;
}
.contact-container{
  margin-top: 10px;
  .contact-item{
    overflow: hidden;
    &.contact-child {
      > .contact-cont {
        padding: 0;
        .contact-title{
          padding-left: 10px;
        }
      }
    }
    .expand-transition {
      transform: translateZ(0);
      padding: 10px;
      background-color: #eee;
    }
    .expand-enter{
      animation: slideInDown .5s;
    }
    .expand-leave {
      animation: slideOutUp .5s;
    }
    .contact-title{
      display: block;
      height: 32px;
      line-height: 32px;
      background: #f6f6f6;
      border-bottom: 1px solid #e5e5e5;
      position: relative;
      padding-left: 40px;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 0;
      padding-top: 0;
      position: relative;
      z-index: 9;
      .contact-icon{
        position: absolute;
        height: 16px;
        width: 16px;
        border: 1px solid #d6d6d6;
        margin-left: -26px;
        top: 8px;
        &.opened:before{
          border-top-color: #1D8CC7;
          border-left-color: transparent;
          top: 5px;
          left: 0;
        }
        &:before{
          content: '';
          position: absolute;
          border: 5px solid transparent;
          border-left-color: #1D8CC7;
          margin-left: 2px;
          top: 2px;
          left: 3px;
        }
      }
    }
    .contact-cont{
      padding: 20px;
      padding-bottom: 5px;
      .cont-item{
        float: left;
        width: 300px;
        height: 80px;
        vertical-align: middle;
        margin-bottom: 15px;
        line-height: 1.42857143;
        .contact-avatar{
          float: left;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 10px;
          margin-top: 4px;
          > img, .no-photo{
            display: block;
            width: 100%;
            height: 100%;
          }
          .no-photo{
            background-color: #1D8CC7;
            color: #fff;
            font-size: 28px;
            text-align: center;
            line-height: 72px;
          }
        }
        .contact-info{
          display: table;
          .contact-name{
            font-size: 16px;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
<template>
    <public-crumb t-name="通讯录"></public-crumb>
    <section class="search_bar search-bar">
      <div class="search_area">
        <input type="text" v-model="search.name" placeholder="姓名/手机/邮箱" maxlength="20" v-on:change="searchFun" @keyup.enter="searchFun">
        <div class="search_icon" @click.stop="searchFun"></div>
      </div>
    </section>
    <div class="contact-container">
        <div class="contact-item" v-if="contacts && !errorMsg && !searchResult">
          <label class="contact-title">{{contacts.name}}</label>
          <Contact :contacts.sync="contacts" :is-show.sync="isShow"></Contact>
        </div>
        <p class="text-center" v-if="errorMsg">{{errorMsg}}</p>
        <div class="contact-item" v-if="searchResult && !errorMsg">
          <ul class="clearfix contact-cont">
            <li class="cont-item" v-for="contact in searchResult">
              <div class="contact-avatar">
                <img v-if="contact.photo" alt="头像" :src="contact.photo">
                <span class="no-photo" v-else>{{contact.name[0]}}</span>
              </div>
              <div class="contact-info">
                <p class="contact-name">{{contact.name}}</p>
                <p>{{contact.office.name}}&nbsp;&nbsp;{{contact.positionNameDisplay}}</p>
                <p>{{contact.mobile}}</p>
                <p>{{contact.email}}</p>
              </div>
            </li>
          </ul>
        </div>
    </div>
</template>
<script>
    import PublicCrumb from '../../components/public/PublicCrumb.vue';
    import Contact from '../../components/others/Contact.vue'
    import * as content from '../../constants/contentTypes';
    import * as interfaces from '../../constants/interfaceTypes';
    export default{
        components: {
            PublicCrumb,
            Contact
        },
        data (){
            return {
                contacts: null,
                searchResult: null,
                errorMsg: '',
                search: {
                  name: ""
                },
                postData:{},
                isShow: {},
                timer: ''
            }
        },
        asyncData: function () {
            this._loadData();
        },
        methods: {
            // 查询事件
            searchFun: function () {
              clearTimeout(this.timer);
                let vm = this,
                    name = vm.search.name.trim();

                if(!name){
                  vm.searchResult = null;
                  if(vm.contacts)
                    vm.errorMsg = '';
                  else
                    vm.errorMsg = '没有数据';
                  return vm.isShow = {}
                }

                vm.timer = setTimeout(function () {
                  vm.postData.bussinessData = {name};
                  vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETUSERINFOLIST,vm.postData).then((response) => {
                    let data = response.json().result.list;
                    if (data && data.length) {
                      vm.searchResult = data;
                      vm.errorMsg = ''
                    } else {
                      vm.searchResult = null;
                      vm.errorMsg = '没有查询到数据'
                    }
                  })
                }, 100)
            },
            _loadData: function(){
              let vm = this;
              vm.postData.bussinessData = {};
              vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETCONTACTSSTAFFLIST,vm.postData).then((response)=>{
                let result = response.json().result;
                if(result.length == 1){
                  vm.errorMsg = '';
                  vm.contacts = result[0];
                  vm.postData.bussinessData = {id: result[0].id};
                  vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETCONTACTSSTAFFLIST,vm.postData).then((response)=>{
                    vm.$set('contacts.subContacts', response.json().result)
                  });
                }else vm.errorMsg = '没有数据'
              });
            }
        }
    }
</script>
