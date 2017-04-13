<template>
    <div>
        <Head />
        <div className="login_main">
            <div style="position:absolute;z-index:10;width:100%;">
                <div className="public_main">
                    <Login-tab  ></Login-tab>
                    <Carousel ></Carousel>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import Head from './public/Head.vue';
    import LoginTab from './ohters/LoginTab.vue';
    import Carousel from './ohters/Carousel.vue';
    import '../css/public.css';
    import '../css/login.css';
    export default{
        components:{
            Head,
            Carousel,
            LoginTab
        }
    }
</script>
