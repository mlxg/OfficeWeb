<style lang="less">
.text-container{
  position: relative;
  .text-flag{
    right: 18px;
    /*background-color: rgba(255,255,255,0.75);*/
    line-height: 28px;
    height: 28px;
    overflow: hidden;
    padding-left: 10px;
    padding-right: 5px;
    pointer-events: none;
    float:right;
  }
  &.col-sm-10 .text-flag{
    right: 32px;
  }
}
</style>
<template>
    <div class="text-container" :class="className">
      <slot></slot>
      <em class="text-flag"><span :class="isOut ? 'fc-red-length' : ''">{{length}}</span>&nbsp;/&nbsp;{{maxLength}}</em>
    </div>
</template>
<script>
    export default{
        props:{
          'className': {
            type: String,
          },
          'maxLength': {
            type: Number,
            require: true
          },
          'textValue': {
            type: String,
            require: true,
            default(){
              return ''
            }
          }
        },
        data(){
            return{
                isOut: false
            }
        },
        computed: {
            length: function(){
              let len = this.textValue.length,
                  max = this.maxLength;
              if(max && len > max) this.isOut = true;
              else this.isOut = false;
              return len
            }
        }
    }
</script>
