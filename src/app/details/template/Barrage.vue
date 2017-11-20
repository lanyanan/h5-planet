<template>
    <section class="barrage">
        <div id="oneTxt" class="one-txt">
            
        </div>
        <div id="TwoTxt"  class="two-txt">
            
        </div>
        <div id="threeTxt"  class="three-txt">
            
        </div>
    </section>
</template>


<script>
'use strict';
import tools from '../../../common/tools.js';
import request from '../../../common/request.js';
  export default {
    props:['barrageCount','weekRecommendId'],
    components: {
    },
    data (){
        return {
           
        }
    },
    mounted() {
        
    },
    created () {
    
    },
    methods: {
        getImgData() {
            
        },
        creatDom(dom, txtArr){
            let _this = this;
            let i = 0;
            setInterval(function(){
                if(i<txtArr.length){
                    var startLength = dom.getElementsByTagName("span").length;
                    var para=document.createElement("span");
                    para.style.webkitTransition = "left 10s linear";
                    para.style.transition = "left 10s linear";
                    para.innerHTML = txtArr[i].content.expression(2,'../assets/');
                    dom.appendChild(para);
                    let tim =1000 + 3000*Math.random();
                    setTimeout(function(){
                        let arr = dom.getElementsByTagName("span");
                        arr[arr.length-1].style.left="-200%";
                    },tim)
                    i++;
                     _this.animationEnd(dom); 
                }else{
                    i=0
                }
            },5000)
        },
        animationEnd(dom){
            var spanArr = dom.getElementsByTagName("span");
            for(var i = 0; i<spanArr.length; i++){
                spanArr[i].removeEventListener("webkitTransitionEnd",function(){},true)
                spanArr[i].addEventListener("webkitTransitionEnd", function(){ //动画结束时事件
                    if(this.parentNode) this.parentNode.removeChild(this);
                    
                    }, false);
            }
        },
        getBarrage(id) {
            let _this = this;
            let oneArr = [],
                twoArr = [],
                three = [];
            request.doGet('/router?method=jz.reinforce.week.recommend.barrage.list', {weekRecommendId:id}).then(function(res){
                if(res.list){
                    oneArr = _this.getArr(res.list, 0);
                    twoArr = _this.getArr(res.list, 1);
                    three = _this.getArr(res.list, 2);
                }
                console.log(oneArr)
                console.log(twoArr)
                console.log(three)
                let oneTxt = document.getElementById("oneTxt");
                let TwoTxt = document.getElementById("TwoTxt");
                let threeTxt = document.getElementById("threeTxt");
                _this.creatDom(oneTxt, oneArr);
                _this.creatDom(TwoTxt, twoArr);
                _this.creatDom(threeTxt, three);  
            });
        },
        getArr(arr,d){
            let distArr = [];
            for(var i = d; i< arr.length; i+=3){
                distArr.push(arr[i])
            }
            return distArr;
        }
    },
    watch:{
        weekRecommendId:function(){
            //if(barrageCount)
            console.log(this.weekRecommendId)
            this.getBarrage(this.weekRecommendId)
        }
    }
  }
</script>


<style>
    .barrage {
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;
        margin: 0.57rem 0;
        z-index: 100
    }
    .one-txt, .two-txt, .three-txt{
        width: 100%;
        height: 2.29rem;
        margin: 0.57rem 0;
    }
    .one-txt span, .two-txt span, .three-txt span {
        
        padding: 0.57rem 1.14rem;
        background: rgba(0,0, 0,0.5);
        border-radius: 1rem;
        color: #fff;
        font-size: 15px;
        line-height: 20px;
    }
    .one-txt span img, .two-txt span img, .three-txt span img{
        line-height: 20px;
        display: inline;
    }
    .one-txt {
        width:100%;
        position: absolute;
        left: 100%;
        top: 0.57rem;
    }
    .one-txt span {
        position: absolute;
        left: 0;
        top: 0;
    }
    .two-txt {
        width:100%;
        position: absolute;
        left: 100%;
        top: 3.42rem;
    }
    .two-txt span {
        position: absolute;
        left: 0;
        top: 0;
    }
    .three-txt {
        width:100%;
        position: absolute;
        left: 100%;
        top: 6.37rem;
    }
    .three-txt span {
        position: absolute;
        left: 0;
        top: 0;
    }
</style>