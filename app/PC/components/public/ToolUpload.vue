<style lang="less">
  .upload-container{
    .btn-success{
      height: 34px;
      width: 90px;
      text-align: center;
    }
    .file-hidden{
      height: 34px;
      width: 90px;
      opacity: 0;
      font-size: 0;
      position: absolute;
      top: 0;
      cursor: pointer;
    }
  }
</style>
<template>
    <div class="upload-container">
      <button type="button" class="btn btn-success">上传文件</button>
      <input type="file" class="file-hidden" v-model="fileName" v-on:change="uploadFile">
      <p class="u-fc5" v-if="this.resourceType == '2' || this.resourceType == '3' || this.resourceType == '4'">(文件大小限制 40M，支持以下格式gif,jpg,jpeg,png)</p>
      <div v-for="item in files" v-if="item">
        <a :href="item.fastPath" :download="item.filename">{{item.filename}}</a>
        <button type="button" class="btn btn-link" @click="deleteFile(item.id, $index)">删除</button>
      </div>
    </div>
    <div class="progress" v-show="progress">
      <div class="progress-bar progress-bar-success progress-bar-striped" :style="'width: '+ progress + '%'">
        <span>{{progress}}% Complete {{errorMsg}}</span>
      </div>
    </div>
  <Public-Modal :options="options" :confirm="confirm" :cancel="cancel" :close="close"></Public-Modal>
</template>
<script>

  import * as content from '../../constants/contentTypes';
  import * as interfaces from '../../constants/interfaceTypes';
  import PublicModal from './PublicModal'
    export default{
      props: {
        'files': {
          type: Array,
          twoWay: true,
          default: []
        },
        resourceId: {
          type: String,
          required: true
        },
        resourceType: {
          type: String,
          required: true
        }
      },
      components: {
        PublicModal
      },
      data (){
        return {
          progress: 0,
          errorMsg: '',
          fileName: '',
          options: undefined,
          confirm: undefined,
          isShow: false
        }
      },
      methods: {
        uploadFile: function (e) {
          let file = e.target.files[0],
              vm = this,
              fd = new FormData();
          if(!file) return false;
          if(file.size > 41943040){
            vm.options = {
              title: '温馨提示',
              message: '你上传的文件太大，请重新上传',
              isShow: true
            };
            vm.confirm = {
              text: '确定',
              callback: function () {
                vm.options.isShow = false;
              }
            };
            file = '';
            return false;
          }
          if(vm.resourceType == '2' || vm.resourceType == '3' || vm.resourceType == '4'){
            if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG|JPEG)$/.test(file.name)) {
              vm.options = {
                title: '温馨提示',
                message: '上传仅支持图片格式',
                isShow: true
              };
              vm.confirm = {
                text: '确定',
                callback: function () {
                  vm.options.isShow = false;
                }
              };
              file = '';
              return false;
            }
          }else{
            if(!/\.(gif|jpg|jpeg|png|bmp|rar|zip|doc|docx|xls|xlsx|ppt|pptx|vsd|vsdx|txt|pdf|wps|html|GIF|JPG|PNG|JPEG|BMP|RAR|ZIP|DOC|DOCX|XLS|XLSX|PPT|PPTX|VSD|VSDX|TXT|PDF|WPS|HTML)$/.test(file.name)) {
              vm.options = {
                title: '温馨提示',
                message: '上传文件类型不正确，请重新上传',
                isShow: true
              };
              vm.confirm = {
                text: '确定',
                callback: function () {
                  vm.options.isShow = false;
                }
              };
              file = '';
              return false;
            }
          }
          fd.append('resourceId', vm.resourceId);
          fd.append('resourceType', vm.resourceType);
          fd.append('files', file);
          vm.$http.post(content.CONTENT_ROOT + interfaces.INTERFACE_UPLOADFILE, fd, {
            progress: function (e) {
              if(e.lengthComputable){
                let max = e.total;
                let value = e.loaded;
                vm.progress = Math.round(value/max*100)
              }
            }
          }).then((response) => {
            let result = response.json();
            vm.errorMsg = result.message;
            if(result.status == 0){
              vm.progress = 0;
              result = result.result;
              vm.files.push({
                filename: result.filename,
                fastPath: result.fastPath,
                id: result.id
              })
            }
          })
          vm.fileName = '';
        },
        deleteFile: function (id, index) {
          let  vm = this;
          vm.$http.get(content.CONTENT_ROOT + interfaces.INTERFACE_DELETEFILE + id).then((response) => {
            let result = response.json();
            if(result.status == 0){
              vm.files.splice(index, 1, undefined)
            }
          })
        }

      }
    }
</script>
