<template>
    <div v-if="loadflag"  :class="params.class"  @click="onclick" >
        <p>{{params.btnName}}</p>
    </div>
    <div v-else  :class="params.class" style="background-color:#CBCBCB;border-color: #DDDDDD;" >
        <p>{{params.loadName}}</p>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props: ['params','onclick','loadflag']
    }
</script>
