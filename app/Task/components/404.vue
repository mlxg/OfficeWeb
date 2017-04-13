<template>
  <div class="not-found">
    <div>404 not found</div>
    <p>{{ time }}s后将自动跳转到首页</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: 5,
      };
    }
  };
</script>

