<template>
    <section class="download">
        <div style="height: 60px;"></div> 
        <div class="download-btn">
            <div class="download-btn-img">
                <img src = "http://images.9zhitx.com/f8ac1140-becd-4972-b5b4-6626a1f4b405.png"/>
            </div>
            <div class="download-btn-txt">
                <div class="download-btn-txt-title">{{appName}}</div>
                <div>{{title}}</div>
            </div>
            <a class="download-btn-link" v-bind:href="link">马上下载</a>
        </div>            
    </section>
</template>
 

 

<script>
  'use strict';
  export default {
    data (){
        return {
            appName: "牙牙星球",
            title: "你的最佳追星神器",
            link: "http://www.9zhitx.com/yyxq/download.html?t=" + (new Date()).getTime()
        }
    },
    create(){
        
    },
    methods: {
    },
    watch: {
    }
  }
</script>


<style scoped> 
    .download {

    }
    .download-btn {
        position: fixed;
        left: center;
        bottom: 0;
        z-index: 99;
        -webkit-display:flex;
        display:flex;
        -webkit-justify-content:space-between;
        justify-content:space-between;
        -webkit-align-items:center;
        align-items:center;
        padding: 10px;
        font-size: 14px;
        background: #fff;
        width: 100%;
        max-width: 500px;
        height: 64px;
        margin: 0 auto;
        border-top: 1px solid #eee;
    }
    .download-btn-img {
        width:48px;
        height:48px;
    }
    .download-btn-txt {
        flex: 1;
        margin: 0 10px;
        font-size: 14px;
        line-height: 21px;
        color: #999;
    }
    .download-btn-txt-title {
        font-size: 18px;
        font-weight: 700;
        line-height: 27px;
        color: #333;
    }
    .download-btn-link {
        position: absolute;
        top: 18px;
        right: 12px;
        width: 72px;
        font-size: 12px;
        line-height: 28px;
        color: #FFF;
        text-align: center;
        background-image: linear-gradient(90deg,#FF7154 4%,#FF5E58 100%);
        border-radius: 100px;
    }
</style>