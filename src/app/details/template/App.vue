<template>
    <section class="view">
        <div class="view-barrage">
            <img :src="backg" alt="">
        </div>
        <Barrage :style="{visibility:barrageShow?'visible':'hidden'}" :weekRecommendId="weekRecommendId" :barrageCount="barrageCount"></Barrage>
        <div class="view-center">
            <StarInfo :starPic="starPic" :starName="starName" :callback="toast" :starInfo="starInfo"></StarInfo>
            <PicArr :picArr="picArr" :callback="showSwiper" :toast="toast"></PicArr>
            <AudioList v-if="audioShow" :audioSrc="audioSrc" :videoCover="videoCover"  :videoTime="videoTime"></AudioList>
            <SendBarrage :openBarrage="openBarrage" :barrageShow="barrageShow" :sendBarrage="toast"></SendBarrage>
        </div>
        <Download></Download>
        <Swiper v-if="swiperShow" :picArr="picArr" :callback="hiddenSwiper"></Swiper>
    </section>
</template>


<script>
'use strict';
import common from '../../../common/common.css';
import tools from '../../../common/tools.js';
import request from '../../../common/request.js';
import Download from './Download.vue';
import StarInfo from './StarInfomation.vue';
import PicArr from './PicArr.vue';
import AudioList from './AudioList.vue';
import SendBarrage from './SendBarrage.vue';
import Barrage from './Barrage.vue';
import Swiper from './Swiper.vue';


  export default {
    components: {
       'Download':Download,
       'StarInfo':StarInfo,
       'PicArr':PicArr,
       'AudioList':AudioList,
       'SendBarrage':SendBarrage,
       'Barrage':Barrage,
       'Swiper':Swiper,
    },
    data (){
        return {
            starPic:'',
            starName:'',
            starInfo:'',
            picArr:'',
            audioSrc:'',
            videoCover:'',
            videoTime:'',
            audioShow:false,
            backg:'',
            weekRecommendId:'',
            barrageCount:'',
            swiperShow:false,
            barrageShow:true
        }
    },
    created () {
       this.getImgData();
    },
    methods: {
        getImgData() {
            let _this = this;
            request.doGet('/router?method=jz.reinforce.week.recommend', {}).then(function(res){
                _this.starPic = res.weekRecommend.starPortrait;
                _this.starName = res.weekRecommend.starName;
                _this.starInfo = res.weekRecommend.description;
                _this.picArr = res.weekRecommend.imageUrlsList;
                _this.videoCover = res.weekRecommend.videoCover;
                _this.audioSrc = res.weekRecommend.videoUrl;
                if(res.weekRecommend.videoUrl){
                    _this.audioShow = true
                }
                _this.videoTime = res.weekRecommend.videoTime;
                _this.weekRecommendId = res.weekRecommend.id;
                _this.barrageCount = res.weekRecommend.barrageCount;
                _this.backg = res.weekRecommend.background;
                console.log( _this.audioSrc )
                console.log( _this.videoCover );
                ///_this.getBarrage(res.weekRecommend.id)
                
            });
        },
        showSwiper(e){
            let swiperIndex = e.target.getAttribute("data-key");
            console.log(swiperIndex)
            this.swiperShow = true;
        },
        hiddenSwiper(){
            this.swiperShow = false;
        },
        toast(){
            tools.promptMsg("下载牙牙星球app看更多爱豆美图", "center")
        },
        openBarrage(){
            console.log(this.barrageShow)
            this.barrageShow = !this.barrageShow
        },
        sendBarrage(txt){
            let _this = this;
            request.doGet('/router?method=jz.reinforce.week.recommend.barrage.save', {weekRecommendId:_this.weekRecommendId, content:txt}).then(function(res){
                console.log(res)
            });
        }
       
    }
  }
</script>


<style>
    html, body {
        max-width: 500px;
        height: 100%;
        margin:0 auto;
        position: relative;
    }
    .view {
        width: 100%;
        height: 100%;
    }
    .view-barrage {
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        z-index: -1;
    } 
    .view-barrage img {
        width: 100%;
    }
    .view-center {
        margin: 11.43rem 0.86rem 2rem;
        background: #fff;
        border-radius: 10px;
    }
</style>