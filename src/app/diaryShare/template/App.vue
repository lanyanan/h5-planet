<template>
    <section class="view"> 
        <Headers :dateString="dateString" :weatherPictrue="weatherPictrue" :temperature="temperature" :currentCity="currentCity" :diaryTime="diaryTime" :diaryContent="diaryContent" :portrait="portrait"></Headers>
        <Audios :style="{margin:!onlyAudio?'13rem 4% 9rem':'2rem 4% 1rem'}" v-for="ite in domlist" key="ite" :audioDom="ite" ></Audios>        
        <Container :diaryContent="diaryContent" :type="type" :onlyAudio="onlyAudio" :callBack="callback"></Container>
        <Foot :style="{bottom:onlyAudio?'0':'60px'}"></Foot>
        <Download></Download>
    </section>
</template>


<script>
  'use strict';
  import common from '../../../common/common.css';
  import tools from '../../../common/tools.js';
  import Head from './Head.vue';
  import Foot from './Foot.vue';
  import Container from './Container.vue';
  import request from '../../../common/request.js';
  import Audios from './Audios.vue';
  import Download from './Download.vue';

    let appOpen = false;
    setTimeout(() => {
        try{
            window.object.isNetwork();
            appOpen = true;
        }catch(e){
            appOpen = false
        }
    },1000);

  export default {
    components: {
        'Headers': Head,
        'Container': Container,
        'Foot': Foot,
        'Audios': Audios,
        'Download': Download,
    },
    data (){
        return {
            dateString: "",
            currentCity: "",
            diaryTime: "",
            diaryContent: "",
            portrait:"",
            starId:"",
            temperature:"",
            type:"",
            weatherPictrue:"",
            onlyAudio: true,
            domlist:[]
        }
    },
    created () {
        window._hmt && window._hmt.push(['_trackEvent', 'yyxq-riji', 'click', '牙牙星球的日记分享的页面']);
        //appOpen ? this.getDayData() : this.getIdData();
        this.getIdData();
        
    },

    methods: {
        getDayData() {
            let _this = this;
            request.doGet('/router?method=jz.reinforce.diary.query', {diaryDate:"2017-08-25" , session: "10DECB2EBDC68E1BBD58507BC5C2F5E57E9F6308EB1083E7ADE40F46D1D73F3D"}).then(function(res){
                _this.getDataCommmon(res) 
            });
        },
        getIdData() {
            let _this = this;
            request.doGet('/router?method=jz.reinforce.diary.detail', {diaryId:tools.getUrlParam('diaryId')}).then(function(res){
                _this.getDataCommmon(res) 
            });
        },
        getDataCommmon(res) {
            let _this = this;
            if(res.id){
                let diaryWeatherInfo = res.diaryWeather ? JSON.parse(res.diaryWeather).weatherBo : '';
                let diaryStr = new Date(res.diaryDate);
                _this.dateString = diaryStr.format("yyyy-MM-dd") + " " + res.diaryWeek;
                _this.currentCity = diaryWeatherInfo.currentCity || '';
                _this.temperature = diaryWeatherInfo.temperature || '';
                _this.weatherPictrue = diaryWeatherInfo.weatherPictrue || '';
                _this.diaryTime = res.diaryTime  || '';
                //判断只有audio
                if(res.diaryContent.substring(0, 6)=="<audio"&&res.diaryContent.substring(res.diaryContent.length-8, res.diaryContent.length)=="</audio>"){
                    _this.onlyAudio = false;
                }
                _this.diaryContent ="<p>" + res.diaryContent.replace(/<audio/ig,'</p><audio preload="auto"').replace(/audio>/ig,'audio><p>').replace(/<img/ig,'</p><br><img').replace(/\/>/ig,'/><br><p>').replace(/(\r)?\n/ig,'<br/>') + "</p>";
                _this.starId = res.sId;//715743861476159488
                _this.type = res.typeSet;

            }else{
                console.log('不存在的id')
            }
            return request.doGet('/router?method=jz.reinforce.star.info', {starId: _this.starId,  session: "10DECB2EBDC68E1BBD58507BC5C2F5E57E9F6308EB1083E7ADE40F46D1D73F3D"}).then(function(res){
                if(res.starPlanetBo) {
                    _this.portrait = res.starPlanetBo.portrait;
                    
                }
            })
        },
        callback(arr){
        console.log(arr)
            this.domlist = arr
        }
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
        min-height: 100%;
        position: relative;
        background: #FFF8DC;
    }
    .foot-bar-class {
        background: #FFF8DC
    }
    audio {
        display:block;
        visibility:hidden;
        height: 0;
    }
</style>