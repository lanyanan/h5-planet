<template>
    <section class="head"> 
        <div class="head-left float-left">
            <img v-bind:src="portrait"/>
        </div>
        <div class="head-right float-right">
            <div class="head-right-day">{{dateString}}</div>
            <div v-bind:class="{ 'head-right-weather': isShow, 'head-right-weather-height': heightShow }">
                <div class="head-right-weather-ar">{{currentCity}}</div>
                <div class="head-right-weather-tp">{{temperature}}</div>
                <div class="head-right-weather-img">
                    <img v-bind:src="weatherPictrue"/>
                </div>
            </div>
            <div class="head-right-time">{{diaryTime}}</div>
        </div>
    </section>
</template>


<script>
    'use strict';

    import client from '../../../common/client.interactive.js';
    import request from '../../../common/request.js';

  export default {
    props: ['dateString','currentCity','diaryTime','diaryContent','portrait','temperature','weatherPictrue'],
    data (){
        return {
            isShow: true,
            heightShow: false
        }
    },
    created () {
        this.changeHeight()
    },
    methods: {
        changeHeight() {
            this.heightShow = this.currentCity == "" ? true : false;
        }
    },
    watch: {
        currentCity:function() {
            this.changeHeight()
        }
    }

  }
</script>

<style>
   .head {
        width: 100%;
        height: 5.5rem;
        padding-top: 1.14rem;
   }
   .head-left {
        float: left;
        margin-left: 1.71rem;
        width: 3.86rem;
        height: 3.86rem;
   }
   .head-left img {
        width: 3.86rem;
        height: 3.86rem;
        border: 2px solid #FFC600;
        border-radius: 3.86rem;
   }
   .head-right {
        float: right;
        margin-right: 0.86rem;
        width: 13rem;
        height: 5.5rem;
        font-size: 12px;
        color: #FFC600;
   }
   .head-right-day {
        width: 13rem;
        height: 1rem;
        text-align: right;
   }
   .head-right-weather {
        width: 13rem;
        height: 3rem;
        line-height: 3rem;
        text-align: right;
   }
   .head-right-time {
        width: 13rem;
        height: 1.5rem;
        line-height: 1.5rem;
        text-align: right;
   }
   .head-right-weather > div {
        float: right;
   }
   .head-right-weather-ar {
        padding-left: 0.71rem
   }
   .head-right-weather-tp {
        padding-left: 0.31rem
   }
   .head-right-weather-img {
        width: 1.5rem;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
   }
   .head-right-weather-height {
        height: 1rem
   }
</style>