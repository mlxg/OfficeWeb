<template>
    <div :class="show ? 'active diagram-container' : 'diagram-container'">
        <button :class="show ? '' : 'static'" type="button" @click="show = !show"></button>
        <iframe :src="'/staroffice_act/workflowengine/web/viewHistory.do?processInstanceId='+ processInstanceId" id="iframepage" frameborder="0" scrolling="yes" marginheight="0" marginwidth="0"></iframe>
    </div>
</template>
<style lang="less">
  .diagram-container{
    position: fixed;
    z-index: 999;
    top:60px;
    bottom: 0;
    left: 200px;
    right: 0;
    transform: translate3d(100%, 0, 0);
    transition: transform ease-out .3s;
    &.active{
      transform: translate3d(0, 0, 0);
      > button{
        transform: translate3d(0, -50%, 0);
        background-image: url(../../images/show-process-back.png);
        right: 0;
        &:hover{

        }
      }
    }
    > button{
      position: absolute;
      top: 50%;
      transform: translate3d(-100%, -50%, 0);
      background: transparent url(../../images/show-process.png) no-repeat;
      border: none;
      width: 27px;
      height: 32px;
      transition: all ease-in .3s;
      &.static:hover{
        background-image: none;
        background-color: rgba(30, 198, 78, 0.5);
        height: 120px;
        width: 40px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        &:before{
          content: '查看流程图';
          color: #fff;
          position: absolute;
          font-size: 14px;
          width: 16px;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    > iframe{
      width: 100%;
      height: 100%;
    }
  }
</style>
<script>
    export default{
      props: {
        processInstanceId: {
          type: String,
          required: true
        }
      },
      data(){
        return {
          show: false
        }
      }
    }
</script>
