<template>
    <div>
        <Display></Display>
        <Increment></Increment>
    </div>
</template>

<script>
    import Display from './ohters/Display.vue'
    import Increment from './ohters/Increment.vue'
    export default {
        components: {
            Display: Display,
            Increment: Increment
        }
    }
</script>
