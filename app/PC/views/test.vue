<template>
    <div>
        <Text :text-value='value' :max-length="100" :class-name="'test'">
          <textarea class="form-control" rows="3" v-model="value"></textarea>
        </Text>
    </div>
</template>
<script>
    import Text from '../components/public/PublicTextLength.vue'
    export default{
        components:{
          Text
        },
        data(){
          return {
            value: ''
          }
        }
    }
</script>
