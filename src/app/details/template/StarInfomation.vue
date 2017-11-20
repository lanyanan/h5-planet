<template>
    <section class="star-info">
        <div class="star-info-head">
            <div class="star-info-head-left">
                <div class="star-info-head-pic">
                    <img :src="starPic" alt="">
                </div>
                <div class="star-info-head-name">
                    <div class="star-info-head-name-pic">
                        <img src="../assets/yizhouzhutui_logo@2x.png" alt="">
                    </div>
                    <div class="star-info-head-name-txt">{{starName}}</div>
                </div>
            </div>
            <div class="star-info-head-right">
                <span @click="callback">围观主页</span>
            </div>
        </div>
        <div class="star-info-history">
            <p>{{starInfo}}
            </p>
        </div>
    </section>
</template>


<script>
'use strict';
  export default {
    props:['starPic','starName','starInfo','callback'],
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
    .star-info {
        overflow: hidden;

    }
    .star-info-head {
        width: 100%;
        height: 5rem;
        margin-top: 1.43rem;
    }
    .star-info-head-left {
        padding-left: 0.86rem;
        height: 5rem;
        float: left;
    }
    .star-info-head-right {
        margin-right: 0.86rem;
        float: right;
        height: 5rem;
    }
    .star-info-head-pic {
        float: left;
        width: 3.5rem;
        height: 3.5rem;
        margin-right: 0.56rem;
        border-radius: 3.5rem;
        overflow: hidden;
    }
    .star-info-head-name {
        float: left;
        width: 6rem;
        height: 3.5rem;
    }
    .star-info-head-name-pic {
        width: 5.37rem;
        height: 1.07rem;
        margin: 0.47rem 0;
    }
    .star-info-head-name-txt {
        font-size: 15px;
        line-height: 15px;
        color: #333333;
    }
    .star-info-head-right {
        margin-top: 0.5rem;
        width: 5.14rem;
        height: 2rem;
        border-radius: 2rem;
        background: #FF7154;
        font-size:12px;
        line-height: 2rem;
        text-align: center;
        margin-right: 0.86rem;
        color: #fff;
    }
    .star-info-history {
        padding: 0 0.86rem;
        font-size: 15px;
        color: #333333;
        margin-bottom: 2.14rem;
    }
</style>