<template>
    <section id="view" class="view">
        <div v-if="imgShow" class="view-img">
            <img src="../assets/currency_pic@2x.png" alt="">
        </div>
        <div v-else id="wrapper">
            <div id="scroller">
                <div id="pullDown">
                    <span class="pullDownIcon"></span>
                </div>

                <ul id="thelist">
                    <li v-for="item in list">
                        <div class="list">
                            <div class="list-left">{{item.content}}</div>
                            <div class="list-center">{{item.integralType==1?('-'+item.integralNum):('+'+item.integralNum)}}</div>
                            <div class="list-right">{{format(item.createTime)}}</div>
                        </div>
                    </li>
                </ul>
                <div v-if="uploadshow" id="pullUp">
                    <span class="pullUpIcon"></span>
                </div>
            </div>
        </div>
        <div id="footer"></div>
    </section>
</template>


<script>
'use strict';
//import common from '../../../common/common.css';
import tools from '../../../common/tools.js';
import request from '../../../common/request.js';
import Download from './Download.vue';


  export default {
    components: {
       'Download':Download,
    },
    data (){
        return {
            list:[],
            uploadshow:true,
            imgShow:false,
            startIndex:0

        }
    },
    updated (){
        if(window.myScroll) window.myScroll.refresh();
    },
    mounted () {
        let _this = this;
        ;
        var pullDownEl, pullDownOffset,
            pullUpEl, pullUpOffset,
            generatedCount = 0;

        function pullDownAction () {
            setTimeout(function () {   
                _this.getImgData();
                myScroll.refresh();     
            }, 1000);
        }

        function pullUpAction () {
            if(_this.uploadshow){
                setTimeout(function () {   
                _this.getMoreData();
                myScroll.refresh();    
                }, 1000); 
            }
        }

        window.loaded = function () {
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');   
            pullUpOffset = pullUpEl?pullUpEl.offsetHeight : 0;
            
            window.myScroll = new iScroll('wrapper', {
                useTransition: true,
                topOffset: pullDownOffset,
                onRefresh: function () {
                    pullDownEl = document.getElementById('pullDown');
                    pullDownOffset = pullDownEl.offsetHeight;
                    pullUpEl = document.getElementById('pullUp');   
                    pullUpOffset = pullUpEl?pullUpEl.offsetHeight : 0;
                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                    } else if (pullUpEl && pullUpEl.className.match('loading')) {
                        pullUpEl.className = '';
                    }
                },
                onScrollMove: function () {
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        this.minScrollY = 0;
                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        this.minScrollY = -pullDownOffset;
                    } else if (this.y < (this.maxScrollY - 5) && pullUpEl && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        this.maxScrollY = this.maxScrollY;
                    } else if (this.y > (this.maxScrollY + 5) && pullUpEl && pullUpEl.className.match('flip')) {
                        pullUpEl.className = '';
                        this.maxScrollY = pullUpOffset;
                    }
                },
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';           
                        pullDownAction();   // Execute custom function (ajax call?)
                    } else if (pullUpEl&&pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';    
                        pullUpAction(); // Execute custom function (ajax call?)
                    }
                }
            });
            
            setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
        }

        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        document.addEventListener('DOMContentLoaded', function () { setTimeout( window.loaded, 200); }, false);
    },
    created () {
       this.getImgData();
    },
    methods: {
        format(time) {
            let date = new Date(time);
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let month = date.getMonth()+1;
            let dates = date.getDate();
            hours = hours < 10 ? "0" + hours :hours;
            minutes = minutes < 10 ? "0" + minutes :minutes;
            month = month < 10 ? "0" + month :month;
            dates = dates < 10 ? "0" + dates :dates;
            return month + "-" + dates + " " + hours + ":" + minutes;
        },
        getImgData() {
            let _this = this;
            request.doGet('/router?method=jz.reinforce.score.user.detail.list', {type:1,pageSize:20,session:_this.getQueryString('session')}).then(function(res){
                _this.list = res.list;
                if(_this.list.length<20){
                    _this.uploadshow=false
                }else{
                    _this.uploadshow=true
                }
                if(res.list.length==0){
                    tools.promptMsg('暂时没有数据','center');
                    _this.imgShow = true;
                }
                if(res.list.length>0){
                    _this.startIndex = res.list[res.list.length-1].startIndex
                }
            });
        },
        getMoreData() {

            let _this = this;console.log(_this.uploadshow);
            request.doGet('/router?method=jz.reinforce.score.user.detail.list', {type:2,pageSize:20,session:_this.getQueryString('session'),startIndex:_this.startIndex}).then(function(res){
                _this.list = _this.list.concat(res.list)
                if(res.list.length==0){
                    tools.promptMsg('数据已经加载完','center');
                }
                if(res.list.length<20){
                    _this.uploadshow=false
                }else{
                    _this.uploadshow=true
                    _this.startIndex = _this.list[_this.list.length-1].startIndex
                }
            });
        },
        getQueryString(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if(r!=null)return  unescape(r[2]); return null;
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
        height: 100%;
    }
    .view-img {
        width: 100%;
        height: 100%;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
    }
    .view-img img{
        width: 8.5rem;
        height: 6rem;
    }
    .list {
        padding: 0 1.43rem;
        height: 2.86rem;
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        align-items: center;
        -webkit-align-items: center;
        z-index: 1;
    }
    .list-left {
        width: 45%;

    }
    .list-right {
        width: 45%;
        text-align: right;
    }
    .list-center {
        width: 10%;
        text-align: center;
        color:#FF5E58
    }
    body,ul,li {
        padding:0;
        margin:0;
        border:0;
    }

    body {
        font-size:12px;
        -webkit-user-select:none;
        -webkit-text-size-adjust:none;
        font-family:helvetica;
    }


    #wrapper {
        position:absolute; z-index:1;
        top:0; bottom:0; left:-9999px;
        width:100%;
        overflow:auto;
    }

    #scroller {
        position:absolute; z-index:1;
    /*  -webkit-touch-callout:none;*/
        -webkit-tap-highlight-color:rgba(0,0,0,0);
        width:100%;
        padding:0;
    }

    #scroller ul {
        list-style:none;
        padding:0;
        margin:0;
        width:100%;
        text-align:left;
    }

    #scroller li {
        padding:0 10px;
        height: 2.86rem;
        line-height:2.86rem;
        font-size:15px;
    }
    #scroller li:nth-of-type(even){
        background: #F5F5F5;
    }
    #myFrame {
        position:absolute;
        top:0; left:0;
    }



    /**
     *
     * Pull down styles
     *
     */
    #pullDown, #pullUp {
        background:#fff;
        height:40px;
        line-height:40px;
        padding:5px 10px;

        font-weight:bold;
        font-size:14px;
        color:#888;
    }
    #pullDown .pullDownIcon, #pullUp .pullUpIcon  {
        display: block;
        margin: 0 auto;
        width:20px;
        height:20px;
    }
    #pullDown .pullDownIcon {
        -webkit-transform:rotate(0deg) translateZ(0);
    }
    #pullUp .pullUpIcon  {
        -webkit-transform:rotate(-180deg) translateZ(0);
    }

    #pullDown.flip .pullDownIcon {
        -webkit-transform:rotate(-180deg) translateZ(0);
    }

    #pullUp.flip .pullUpIcon {
        -webkit-transform:rotate(0deg) translateZ(0);
    }

    #pullDown.loading .pullDownIcon, #pullUp.loading .pullUpIcon {
        background:url('../assets/run.gif') 0 0 no-repeat;
        -webkit-background-size:20px 20px; background-size:20px 20px;
    }
</style>