<template>
    <section class = "container" :style="{minHeight:onlyAudioShow?'47.64rem':'0'}">
        <div :style="{visibility:onlyAudioShow?'visibile':'hidden'}" class = "container-txt" id = "containerTxt" > 
            <span id="container"></span>
        </div> 
    </section>
</template>


<script>
    'use strict'; 
      import Audios from './Audios.vue';
    export default {
        props: ['diaryContent', 'type', 'onlyAudio', 'callBack'],
        data (){
            return {
                domlist:[],
                onlyAudioShow: true
            }
        },
        components: {
            'Audios': Audios
        },
        created () {
            this.onlyAudioShow = (this.onlyAudio);

        },
        mounted() {
            let containerTxt = document.getElementById("containerTxt");
            if(!this.onlyAudioShow){
                containerTxt.style.height = "0"
                containerTxt.style.overflow = "hidden"
            }
        },
        methods: {
            changeHtml() {
                let container = document.getElementById("container");
                if(container){
                    container.innerHTML = this.diaryContent;
                    let domarr = [];
                    for(let i = 0; i < $("audio").length; i++){
                        domarr.push(i)
                    }
                    this.callBack(domarr)
                } 
            },
            changePosition() {
                let containerTxt = document.getElementById("containerTxt");
                if(containerTxt){
                    switch(this.type){
                    case 1:
                        containerTxt.style.textAlign = "left"
                        break;
                    case 2:
                        containerTxt.style.textAlign = "center"
                        break;
                    case 3:
                        containerTxt.style.textAlign = "right"
                        break;
                    }
                } 
               
            }
        },
        watch: {
            diaryContent:function() {
                this.changeHtml();
            },
            type:function() {
                this.changePosition();
            },
            onlyAudio:function(){
                this.onlyAudioShow = (this.onlyAudio)
            }
        }
    }
</script>


<style>
   .container {
        width: 100%;
        background: url('../assets/bg.png') repeat left 1.5rem;
        background-size: 100% 47.64rem;
        overflow: hidden;  
   }
   .container-txt {
        margin: 0 2.14rem 0 2.14rem;
        font-size: 16px;
        line-height: 3.14rem;
        color:#81723D;
        text-align: center;  
   }
   .container-txt p {
        line-height: 3.14rem;
        background:url('../assets/line.png') repeat left top;
        background-size: 100% 3.15rem
   }
   .container-txt img {
        display:block
   }
   
</style>