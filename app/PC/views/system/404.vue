<template>
  <div class="not-found">
    <div>404 not found</div>
    <br>
    <div class="">
      <a v-link="'/process/todo'">返回首页</a>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: 5,
      };
    },
    route: {
      data() {
        // const t = setInterval(() => {
        //   if (this.time <= 0) {
        //     clearInterval(t);
        //     this.$route.router.go({ name: 'login' });
        //     return;
        //   }
        //   this.time -= 1;
        // }, 1000);
        return {}
      },
    },
  };
</script>
<style lang="scss">
html{
  height: 100%;
}
body{
  height: 100%;
}
.not-found{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 560px;
  a{
    text-decoration: underline;
  }
}
</style>
