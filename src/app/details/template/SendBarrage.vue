<template>
    <section class="send-info">
        <div class="send-info-btns">
            <div class="btn-send" @click="sendBarrage">发弹幕</div>
            <div class="hidden-barrage" @click="openBarrage">{{show}}</div>
        </div>
        <div class="send-info-send">
            <div class="send-info-input"><input @focus="sendBarrage" v-model="message" maxlength="20" type="text"></div>
            <div class="send-info-select"></div>
        </div>
    </section>
</template>


<script>
'use strict';
  export default {
    props:['openBarrage','barrageShow','sendBarrage'],
    components: {
    },
    data (){
        return {
            show:"关闭弹幕",
            message:''
        }
    },
    created () {
        
    },
    methods: {

    },
    watch:{
       barrageShow:function(){
            this.show = this.barrageShow ? "关闭弹幕" : "打开弹幕" 
       } 
    }
  }
</script>


<style>
    .send-info {
        overflow: hidden;    
    }
    .send-info-btns {
        width: 100%;
        height: 2.7rem;
        padding: 0 0.86rem;
        border-bottom: 1px solid #F3F3F3;
    }
    .btn-send {
       float: left;
       line-height: 2rem;
    }
    .hidden-barrage {
        float: right;
        width: 5.14rem;
        height: 2rem;
        border: 1px solid #FF5E58;
        border-radius: 2rem;
        color: #FF5E58;
        font-size: 12px;
        text-align: center;
        line-height: 2rem;
    }
    .send-info-send {
        padding:0 0.86rem;
        height: 3.72rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .send-info-send input {
        padding-left: 5%;
        width: 95%;
        height: 100%;
        background: #F3F3F3;
    }
    .send-info-input {
        width: 21.86rem;
        max-width:500px;
        height: 1.86rem;
    }
    .send-info-select {
        width: 1.7rem;
        height: 1.7rem;
        background: url('../assets/input_box_expression_icon_normal@2x.png') no-repeat left top;
        background-size: cover;
    }
</style>