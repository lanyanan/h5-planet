<template>
    <section class="swiper">
        <div class="swiper-container">
            <div class="swiper-wrapper" @click="callback">
                <div class="swiper-slide" v-for="item in picArr">
                    <img :src="item" alt="">
                </div>
            </div>
        </div>
    </section>
</template>


<script>
'use strict';
  export default {
    props:['picArr','callback'],
    components: {
    },
    data (){
        return {
           
        }
    },
    mounted (){
        window.mySwiper1 = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
        })        
    },
    created () {
    
    },
    methods: {
        getImgData() {
            
        },
        swiperPre (){
            window.mySwiper1.slidePrev();
        },
        swiperNext (){
            window.mySwiper1.slideNext();
        }
    }
  }
</script>


<style>
    .swiper {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 100000;
        background: #fff;
    }
    .swiper-container {
        width: 100%;
        height: 100%;
    }
    .swiper-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        display: flex;
        -webkit-display: flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }
    .swiper-slide img {
        width: 100%;
    }
</style>