<template>
    <p v-if="loadflag"  :class="params.class"  @click="onclick" >{{params.btnName}}</p>
    <p v-else :class="params.class" style="background-color:#CBCBCB;border-color: #DDDDDD;"   >{{params.loadName}}</p>
</template>
<style>

</style>
<script>
    export default{
        props: ['params','onclick','loadflag']
    }
</script>
