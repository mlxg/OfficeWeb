<template>
  <div class="tip-border">
    <div class="cont">
      <p class="tip">
        {{ tip }}
      </p>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  props: ['tip']
};
</script>
<style scoped>
.tip-border {
  display: block;
  margin-top: 30px;
  border: 2px solid #dfdfdf;
  background-color: #f9fafc;
  padding: 20px;
}
.tip-border .cont{
  text-align: center;
  margin: -35px 0 20px;
}
.tip-border .tip {
  display: inline-block;
  box-sizing: content-box;
  height: 30px;
  padding-right: 26px;
  padding-left: 26px;
  color: #fff;
  border-radius: 16px;
  background-color: #2f90ea;
  line-height: 30px;
}
</style>
