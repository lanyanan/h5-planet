/**
 * @author lanyanan
 * @date   2017-10-19
 * @description 音频播放vue的封装
 */


<template>
    <section class="audio-play"> 
        <div class="audio-play-show">
            <div v-bind:class="audioplayclass" @click="startPlay"></div>
            <div class="audio-play-start-time">{{formatTime(currentTimes)}}</div>
            <div class="audio-play-slider">
                <div v-bind:id="'palyOut'+audioDom" class="audio-play-slider-out">
                    <div class="audio-play-slider-in" v-bind:style="{width:domcurrentWidth}"></div>
                </div>   
            </div>
            <div class="audio-play-length-time">{{formatTime(allTime)}}</div>
        </div>
    </section>
</template>


<script>
  'use strict';
  export default {
    props:["audioDom"],
    data (){
        return {
            audioD:'',
            allTime:0,
            currentTimes:0,
            currentWidth:0,
            playStatus:true,
        }
    },
    computed: {
        domcurrentWidth: function () {
            return this.currentWidth
        },
        audioplayclass: function() {
            return this.playStatus?"audio-play-btn":"audio-play-btn-pause"
        }
    },
    mounted () {
        let _this = this;

        //设置domid
        let dom = $("audio").eq(_this.audioDom);
        dom.attr('id', "audio"+_this.audioDom);
        dom.attr('preload', "auto");

        let domId = document.getElementById("audio"+_this.audioDom);

        _this.allTime = dom.attr('duration');

        document.addEventListener("WeixinJSBridgeReady", function () {
            domId.load();
        }, false);
        //设置音频加载完场获取时长
        domId.onloadedmetadata=function(){
            
        }
        //监听播放是否结束播放结束
        domId.onended=function(){
            _this.playStatus = true;
            _this.currentTimes = 0;
            _this.currentWidth = 0;
        }

        let palyWidth = $(".audio-play-slider-out").width()
        
        //绑定ontauchstart事件
        
        let touchDom = document.getElementsByClassName("audio-play-slider-out");

        touchDom[0].addEventListener("touchstart",function(e){
            var touch = e.touches[0];
            if(touch.pageX-$(this).offset().left > 0 && touch.pageX-$(this).offset().left <= palyWidth){
                if(!domId.paused){
                    domId.pause();
                }else{

                }
                _this.currentWidth =  touch.pageX-$(this).offset().left+"px";
                domId.currentTime =  _this.currentTimes =  Math.ceil(((touch.pageX-$(this).offset().left)/palyWidth)*_this.allTime);
            }

        })

        //绑定ontauchmove事件

        // touchDom[0].addEventListener("touchmove",function(e){
        //     var touch = e.touches[0];
        //     if(touch.pageX-$(this).offset().left > 0 && touch.pageX-$(this).offset().left <= palyWidth){
        //         domId.pause();
        //         _this.currentWidth =  touch.pageX-$(this).offset().left+"px";
        //          domId.currentTime =  _this.currentTimes =  Math.ceil(((touch.pageX-$(this).offset().left)/palyWidth)*_this.allTime);
        //     }
        // })

        //绑定ontauchmend事件

        touchDom[0].addEventListener("touchend",function(e){
            var touch = e.touches[0];
            if(!_this.playStatus){
                domId.play();
            }
        })
        
    },
    methods: {
        startPlay(){
            let _this = this;
            let domId = document.getElementById("audio"+_this.audioDom)
            if(_this.playStatus){
                _this.playStatus = false;
                if(domId.ended){
                    domId.currentTime = _this.currentTimes = 0;
                }
                domId.play();
                this.getcurrentTime(domId)
            }else{
                _this.playStatus = true;
                domId.pause();
            }           
        },
        getcurrentTime(dom) {
            let _this = this;
            dom.currentTime =  _this.currentTimes;
            let palyWidth = $(".audio-play-slider-out").width()
            //监听时长的变化实时显示播放的位置
            dom.addEventListener("timeupdate",function(){
                _this.currentTimes = parseInt(this.currentTime);
                _this.currentWidth =  _this.currentTimes*palyWidth/parseInt(_this.allTime)+"px"
            });
        },
        formatTime(time) {
            let min = parseInt(time/60);
            let sec = parseInt(time%60);
            min = min < 10 ? "0" + min : min;
            sec = sec < 10 ? "0" + sec : sec;
            return min + ":" + sec;
        }
    },

  }
</script>


<style>
.audio-play {
    margin-top:10rem;
    width: 92%;
    height: 3.71rem;
    background: #FFEDAE;
    border-radius: 5px;
    position:relative
}
.audio-play-hidden {
    position: absolute;
    left: 0;
    top: 0;
    display: block 
}
.audio-play-show {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
.audio-play-btn-pause {
    float: left;
    width: 2.5rem;
    height: 3.71rem;
    background: url('../assets/suspend_icon@2x.png') no-repeat center center;
    background-size: 1.71rem 1.71rem;
}
.audio-play-btn {
    float: left;
    width: 2.5rem;
    height: 3.71rem;
    background: url('../assets/play_icon@2x.png') no-repeat center center;
    background-size: 1.71rem 1.71rem;
}
.audio-play-start-time {
    float: left;
    font-family: PingFangSC-Light;
    font-size: 1.1rem;
    color: #81723D;
    line-height: 3.71rem;
}
.audio-play-slider {
    float: left;
    width: 13rem;
    height: 100%;
    font-family: PingFangSC-Light;
    font-size: 1.1rem;
    color: #81723D;
    line-height: 1.1rem;
    position: relative;
    margin:0 1rem; 
}
.audio-play-slider-out {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 0.43rem;
    background: #fff;
    margin: 1.64rem 0;
    border-radius: 10px;
}
.audio-play-slider-in {
    width:0;
    height: 0.43rem;
    background: #FFC600;
    border-radius: 10px;
    z-index: 0;
}
.audio-play-length-time {
    float: left;
    font-family: PingFangSC-Light;
    font-size: 1.1rem;
    color: #81723D;
    line-height:  3.71rem;
}
</style>