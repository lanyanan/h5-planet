<template>
    <section class="pic">
        <h5>主推图集</h5>
        <div class="pic-list">
            <img v-for="(item,index) in picArr" :data-key="index" :src="item" @click="callback" alt="">
            <img src="../assets/entrance_big_pic @2x.png" @click="toast" alt="">
        </div>
    </section>
</template>


<script>
'use strict';
  export default {
    props:['picArr','callback','toast'],
    components: {
    },
    data (){
        return {
           
        }
    },
    created () {
    
    },
    methods: {
        getImgData() {
            
        },
    }
  }
</script>


<style>
    .pic {
        padding: 0 0.86rem;
        height: auto;
        margin-bottom: 2.14rem;
    }
    .pic h5 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 0.7rem;
    }
    .pic-list {
        width: 100%;
        width: auto;
        display: flex;
        overflow-x: scroll;
        overflow-y: hidden;
    }
    .pic-list img {
        width: 9.14rem;
        height: 9.14rem;
        margin: 0 0.2rem;
    }
        /*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
    .pic-list::-webkit-scrollbar{
        width: 1px;
        height: 1px;
        background-color: #fff;
    }
    /*定义滚动条的轨道，内阴影及圆角*/
    .pic-list::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);
        border-radius: 0;
        background-color: #fff;
    }
    /*定义滑块，内阴影及圆角*/
    .pic-list::-webkit-scrollbar-thumb{
        /*width: 10px;*/
        height: 0;
        border-radius: 0;
        -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);
        background-color: #fff;
    }
</style>