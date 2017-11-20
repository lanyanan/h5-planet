<template>
    <section class="audio">
        <h5>主推视频</h5>
        <div class="audio-list">
             <video
                id="my-player" 
                class="video-js vjs-fluid"
                preload="auto"
                controls 
                webkit-playsinline
               v-bind:poster="videoCover.toString()"
                data-setup='{}'>
              <source v-bind:src="audioSrc.toString()" type="video/mp4"></source>
              <p class="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                  supports HTML5 video
                </a>
              </p>
            </video>
            <div class="time-length">{{videoTime}}</div>
        </div>
    </section>
</template>


<script>
'use strict';
  export default {
    props:['audioSrc','videoCover',"videoTime"],
    components: {
    },
    data (){
        return {
        }
    },
    mounted (){
        let _this = this;
        let vshare = videojs('my-player'); 
        vshare.on("firstplay", function(e){
           _this.hidden(e);
        });
    },
    created () {
    
    },
    methods: {
        getImgData() {
            
        },
        hidden(e){
            let btn = e.target.parentNode.getElementsByClassName('time-length');
            btn[0].style.display="none"
        },
    },
    watch:{
        audioSrc:function(){
            this.srcAudio = this.audioSrc
        },
        videoCover:function(){
            this.srcCover = this.videoCover
        }
    }
  }
</script>


<style>
    .audio {
        padding: 0 0.86rem;
        height: auto;
        margin-bottom: 2.14rem;
        position: relative;
    }
    .audio h5 {
        font-size: 15px;
        font-weight: 900;
        margin-bottom: 0.37rem;
    }
    .audio-list {
        width: 100%;
        height: auto;
        margin-bottom: 2.86rem
    }
    .audio .video-js .vjs-big-play-button {
        height: 1.2em;
        line-height: 1.1em;
        width: 1.2em;
        position: absolute;
        top: 100%;
        left: 10%;
        margin-left: -0.9em;
        margin-top: -1.8em;
        border-radius: 1.2em;
    }
    .time-length {
        position: absolute;
        right: 5%;
        bottom: 1.2rem;
        padding: 0.4rem;
        background: #000;
        color:#fff;
        opacity: 0.65;
        border-radius: 100px;
        font-size: 12px;
    }
</style>