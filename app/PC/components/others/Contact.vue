<template>
  <div class="contact-item" v-for="contact in contacts.subContacts" :class="{'contact-child': contact.subContacts}">
    <label class="contact-title" @click="getContacts(contact, $index)" :style="'padding-left:' + 60 *contacts.hierarchy + 'px'">
      <i class="contact-icon" :class="{'opened': isShow[contact.id] && isShow[contact.id].show}"></i>{{contact.name}}（{{contact.number || 0}}）</label>
    <div class="contact-cont clearfix" v-show="isShow[contact.id] && isShow[contact.id].show" transition="expand">
      <Contact :contacts.sync="contact" :is-show.sync="isShow"></Contact>
    </div>
  </div>
  <ul class="clearfix" v-if="contacts.userlist">
    <li class="cont-item" v-for="contact in contacts.userlist">
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
</template>
<script>
  import * as content from '../../constants/contentTypes';
  import * as interfaces from '../../constants/interfaceTypes';
    export default{
        name: 'Contact',
        props: {
          'contacts': {
            type: Object,
            twoWay: true
          },
          'isShow': {
            type: Object,
            twoWay: true
          }
        },
        data (){
          return {
            postData:{}
          }
        },
        methods: {
        getContacts: function(contact, index){
          let vm = this;
          if(contact.subContacts || contact.userlist) {
            return vm.trigger(contact.id)
          }
          let parentPath = contact.parentPath || 'contacts.subContacts',
            hierarchy = contact.hierarchy || 0;

          vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_GETCONTACTSSTAFFLIST,{"bussinessData":{'id':contact.id}}).then((response)=>{
            let result = response.json().result;
            if(result[0].id === contact.id){
              // 返回的是自己
              parentPath += '[' + index + '].userlist';
              vm.$set(parentPath, result[0].userlist);
              vm.trigger(contact.id);
              return
            }
            hierarchy +=  1;
            parentPath += '[' + index + ']';
            vm.$set(parentPath + '.hierarchy', hierarchy);
            parentPath += '.subContacts';
            vm.$set(parentPath, result);
            contact.parentPath = parentPath;
            vm.trigger(contact.id)
          });
        },
        trigger: function (id) {
          let vm = this;
          if (!vm.isShow[id]) vm.$set('isShow["'+ id + '"]', {show: true});
          else vm.isShow[id].show = !vm.isShow[id].show
        }
      }
    }
</script>
