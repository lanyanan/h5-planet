<template>
    <section class="view"> 
        <img v-bind:src = "picurl" />
        <Download></Download>
    </section>
</template>


<script>
'use strict';
import common from '../../../common/common.css';
import tools from '../../../common/tools.js';
import request from '../../../common/request.js';
import Download from './Download.vue';


  export default {
    components: {
       'Download':Download,
    },
    data (){
        return {
            picurl: '',
        }
    },
    created () {
       this.getImgData();
       window._hmt && window._hmt.push(['_trackEvent', 'yyxq-riji', 'click', '牙牙星球的图片分享的页面']); 
    },
    methods: {
        getImgData() {
            let _this = this;
            request.doGet('/router?method=jz.planet.photo.info', {id:tools.getUrlParam('id')}).then(function(res){
                _this.picurl = res.photoInfo.url 
            });
        },
    }
  }
</script>


<style>
    html, body {
        max-width: 500px;
        height: 100%;
        margin:0 auto;
    }
    .view {
        width: 100%;
        height: 100%;
    }
    .view img {
        width: 100%;
        height: auto;
    }
</style>