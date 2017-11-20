/**
 * 牙牙星球公共的图片地址
 * 默认的头像图片：http://images.9zhitx.com/7bbc269c-d557-43a0-8d26-d87f4d2dbc7b.png
 * 点赞图标：http://images.9zhitx.com/8dc7c94e-6231-4206-94fb-798d3e68d5b4.png
 * 点过赞的图标：http://images.9zhitx.com/9a8ddd78-7108-4b70-8fab-643be454052f.png
 * 箭头向下图标：http://images.9zhitx.com/f4205953-a0f1-4198-bdc4-bc88d8483689.png
 * 箭头向上图标：http://images.9zhitx.com/27eaf6d8-71d9-42dd-9859-8b00e0b67c3a.png
 * 明星图标：http://images.9zhitx.com/f1ff72f5-0a72-4c38-8340-a51d9fc8ea97.png
 */

/**
 * date format
 *
 * @param f (eg: 'yyyy-MM-dd hh:mm:ss.S', 'yyyy年MM月dd日 hh小时mm分钟ss秒S毫秒')
 *
 */
Date.prototype.format = function(f) {
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S"  : this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(f))
        f = f.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if(new RegExp("(" + k + ")").test(f)) f = f.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); return f;
};

/**
 * 将字符串中 [XXX] 格式文字替换成表情
 */
String.prototype.expression = function(lagerIcon, path){
    var lagerIcon = lagerIcon || 3; //0-小图标不替换,1-中图标不替换,2-大图标不替换 ,默认不替换
    var path = path || '../../../images/app/emoji/';
    var emoArr = {
        emo: ['expression', 'emoji', 'yaya'],
        w: [20, 20, 100]
    };
    var icons = {
        '[呵呵]' : 'expression_01_45.png', '[愁]' : 'expression_02_45.png', '[花心]' : 'expression_03_45.png',
        '[思考]' : 'expression_04_45.png', '[酷]' : 'expression_05_45.png', '[大哭]' : 'expression_06_45.png',
        '[卖萌]' : 'expression_07_45.png', '[闭嘴]' : 'expression_08_45.png', '[睡觉]' : 'expression_09_45.png',
        '[快哭了]' : 'expression_10_45.png', '[尴尬]' : 'expression_11_45.png', '[怒]' : 'expression_12_45.png',
        '[挤眼]' : 'expression_13_45.png', '[呲牙大笑]' : 'expression_14_45.png', '[惊讶]' : 'expression_15_45.png',
        '[挥泪]' : 'expression_16_45.png', '[爱你]' : 'expression_17_45.png', '[加我]' : 'expression_18_45.png',
        '[抓狂]' : 'expression_19_45.png', '[吐]' : 'expression_20_45.png', '[偷笑]' : 'expression_21_45.png',
        '[微笑]' : 'expression_22_45.png', '[没看见]' : 'expression_23_45.png', '[懒得理你]' : 'expression_24_45.png',
        '[馋嘴]' : 'expression_25_45.png', '[困]' : 'expression_26_45.png', '[惊恐]' : 'expression_27_45.png',
        '[汗]' : 'expression_28_45.png', '[哈哈]' : 'expression_29_45.png', '[加油]' : 'expression_30_45.png',
        '[奋斗]' : 'expression_31_45.png', '[怒骂]' : 'expression_32_45.png', '[疑问]' : 'expression_33_45.png',
        '[嘘]' : 'expression_34_45.png', '[晕]' : 'expression_35_45.png', '[哼]' : 'expression_36_45.png',
        '[哀]' : 'expression_37_45.png', '[奥特曼]' : 'expression_38_45.png', '[敲打]' : 'expression_39_45.png',
        '[拜拜]' : 'expression_40_45.png', '[太开心]' : 'expression_41_45.png', '[挖鼻屎]' : 'expression_42_45.png',
        '[鼓掌]' : 'expression_43_45.png', '[生病]' : 'expression_44_45.png', '[坏笑]' : 'expression_45_45.png',
        '[左哼哼]' : 'expression_46_45.png', '[捂脸]' : 'expression_47_45.png', '[压历大]' : 'expression_48_45.png',
        '[鄙视]' : 'expression_49_45.png', '[委屈]' : 'expression_50_45.png', '[钱]' : 'expression_51_45.png',
        '[阴险]' : 'expression_52_45.png', '[亲亲]' : 'expression_53_45.png', '[黑线]' : 'expression_54_45.png',
        '[可怜]' : 'expression_55_45.png',  '[菜刀]' : 'expression_56_45.png', '[鸡蛋]' : 'expression_57_45.png',
        '[草泥马]' : 'expression_58_45.png', '[浮云]' : 'expression_59_45.png', '[给力]' : 'expression_60_45.png',
        '[沙发]' : 'expression_61_45.png', '[兵]' : 'expression_62_45.png', '[猪头]' : 'expression_63_45.png',
        '[玫瑰花]' : 'expression_64_45.png', '[凋谢]' : 'expression_65_45.png', '[香吻]' : 'expression_66_45.png',
        '[心]' : 'expression_67_45.png', '[伤心]' : 'expression_68_45.png', '[蛋糕]' : 'expression_69_45.png',
        '[药丸]' : 'expression_70_45.png', '[炸弹]' : 'expression_71_45.png', '[高跟鞋]' : 'expression_72_45.png',
        '[熊猫]' : 'expression_73_45.png', '[兔子]' : 'expression_74_45.png', '[太阳]' : 'expression_75_45.png',
        '[晚安]' : 'expression_76_45.png', '[蜡烛]' : 'expression_77_45.png', '[礼物]' : 'expression_78_45.png',
        '[发财]' : 'expression_79_45.png', '[good]' : 'expression_80_45.png', '[弱]' : 'expression_81_45.png',
        '[握手]' : 'expression_82_45.png', '[耶]' : 'expression_83_45.png', '[抱拳]' : 'expression_84_45.png',
        '[来]' : 'expression_85_45.png', '[靠]' : 'expression_86_45.png', '[不要]' : 'expression_87_45.png',
        '[OK]' : 'expression_88_45.png', '[德州]' : 'expression_89_45.png', '[吉他]' : 'expression_90_45.png',
        '[话筒]' : 'expression_91_45.png', '[钟]' : 'expression_92_45.png', '[台球]' : 'expression_93_45.png',
        '[足球]' : 'expression_94_45.png', '[篮球]' : 'expression_95_45.png', '[乒乓球]' : 'expression_96_45.png',

        '[笑]' : 'emoji_01.png', '[眯眼笑]' : 'emoji_02.png', '[花痴]' : 'emoji_03.png',
        '[吐舌头]' : 'emoji_04.png', '[大笑]' : 'emoji_05.png', '[耍酷墨镜]' : 'emoji_06.png',
        '[哭]' : 'emoji_07.png', '[拍手]' : 'emoji_08.png', '[吓]' : 'emoji_09.png',
        '[幻想]' : 'emoji_10.png', '[么么]' : 'emoji_11.png', '[自信]' : 'emoji_12.png',
        '[抠鼻]' : 'emoji_13.png', '[睡觉啦]' : 'emoji_14.png', '[生气]' : 'emoji_15.png',
        '[好委屈]' : 'emoji_16.png', '[恶魔]' : 'emoji_17.png', '[天使]' : 'emoji_18.png',
        '[真爱粉气球]' : 'emoji_19.png', '[花]' : 'emoji_20.png', '[我爱你]' : 'emoji_21.png',
        '[OK啦]' : 'emoji_22.png', '[赞]' : 'emoji_23.png', '[噢耶]' : 'emoji_24.png'
    };

    return this.replace(/(\[[\w\-\u4e00-\u9fa5a]+\])/g,function(val){
		var em = icons[val];
		
		for(var i = 0, len = emoArr.emo.length; i < len; i++){
			if(em && emoArr.emo.indexOf(em.substring(0,em.indexOf('_'))) != -1) {
				if(i == lagerIcon) return val;
				return '<img class="expression" src="'+path+icons[val]+'" width="'+ emoArr.w[i] +'" style="'+(i==2?'display:block;':'')+' width:'+ emoArr.w[i] +'px;">';	
			}else{
				return val;
			}
		}
	});	
};

/**
 * 倒计时
 *
 */
(function($){
    var CountDown = function(element,options){
        this.timeLength = options.timeLength || 4;
        this.element = element;
        this.sTime = null;
        this.currentTime = options.currentTime || '';
        this.startTime = options.startTime || '';
        this.endTime = options.endTime || '';
        this.format = options.format || 'dd天hh:mm:ss';
        this.delDay = options.delDay || false; // 天数为0时,是否不显示出来,true不显示,false显示
    };

    CountDown.prototype = {
        init:function(element,options){
            this.activeStatus(element,this.currentTime,this.startTime,this.endTime,options,this.format);
        },
        tags:function(arrTime,timeLength,format){

            var format = format.replace(/\w/g,'').split('');

            if(this.delDay && arrTime[0] === '00'){
                arrTime.shift();
                format.shift();
            }

            var tags = '';
            for(var i = 0 , len = arrTime.length; i < len ; i++){
                tags += '<span class="numberTime vm">'+ arrTime[i] +'</span>';
                if(i != len - 1){
                    tags += '<span class="vm">'+ format[i] +'</span>';
                }
            }

            return tags;
        },
        activeStatus:function(element,current,start,end,options,format){

            var current = current.replace(/-/g,'/'),
                start = start.replace(/-/g,'/'),
                end = end.replace(/-/g,'/'),
                format = format;

            var currentTime = Date.parse(new Date(current)),
                startTime = Date.parse(new Date(start)),
                endTime = Date.parse(new Date(end)),
                self = this,
                timeSpan = 0,
                iText = 0,
                activeFlag = true,
                start_time = Date.parse(new Date()) ;

            if(endTime >= currentTime){
                if(startTime >= currentTime){ //活动未开始
                    timeSpan = startTime - currentTime;
                    activeFlag = false;
                    options.activeStart(element,this.sTime); //开始前
                }else if(currentTime > startTime && endTime >= currentTime){ //活动正在进行
                    timeSpan = endTime - currentTime;
                    options.activeCurrent(element,this.sTime); //正在进行
                }

                var arrTime = this.dateFormat(timeSpan);
                var tags = this.tags(arrTime,this.timeLength,format);
                this.element.html(tags);
                this.sTime = setInterval(function(){
                    iText = timeSpan + start_time - Date.parse(new Date());

                    arrTime = self.dateFormat(iText);
                    tags = self.tags(arrTime,self.timeLength,format);
                    self.element.html(tags);

                    if(iText <= 0 && !activeFlag){
                        activeFlag = true;
                        timeSpan = endTime - currentTime + 1000;
                        iText = timeSpan + start_time - Date.parse(new Date());
                        options.activeCurrent(element,self.sTime); // 正在进行
                    }else if(iText <= 0 && activeFlag){
                        clearInterval(self.sTime);
                        options.activeFinish(element,self.sTime); //结束
                    }
                },1000);
            }else{ //活动已结束
                tags = this.tags(['00'],this.timeLength,format);
                this.element.html(tags);
                options.activeFinish(element,this.sTime); //结束
            }
        },
        dateFormat : function(timeSpan){
            var totals = timeSpan / 1000,
                d = parseInt(totals / (24 * 3600)),
                h = parseInt((totals - d * 24 * 3600) / 3600),
                m = parseInt((totals - d * 24 * 3600 - h * 3600) / 60),
                s = totals - d * 24 * 3600 - h * 3600 - m * 60;

            d = (d >= 10) ? d : '0' + d;
            h = (h >= 10) ? h : '0' + h;
            m = (m >= 10) ? m : '0' + m;
            s = (s >= 10) ? s : '0' + s;

            return (d + ':' + h + ':' + m + ':' + s).split(':');
        }
    };

    $.fn.timeCountDown = function(options){
        var option = new CountDown(this,$.extend({},$.fn.timeCountDown.defaults,options));
        var self = this;
        return this.each(function(){
            option.init(self,$.extend({},$.fn.timeCountDown.defaults,options));
        });
    }
    $.fn.timeCountDown.defaults = {
        activeStart : function(){},
        activeCurrent : function(){},
        activeFinish : function(){}
    };
})($);

/**
 * 格式化发布时间
 *
 * @param createTime
 * @param currentTime
 */
function formatPublishTime(createTime, currentTime) {
    var createTime = isNaN(Number(createTime)) ? (new Date(createTime).getTime()) : Number(createTime),
        currentTime = isNaN(Number(currentTime)) ? (new Date(currentTime).getTime()) : Number(currentTime),
        createYear = new Date(createTime).getFullYear(),//发布的年份
        currentYear = new Date(currentTime).getFullYear(),//当前的年份
        timeSpan = currentTime - createTime,
        s = parseInt(timeSpan / 1000),
        h = parseInt(s / (60 * 60)),
        m = parseInt(s / 60);

    if (m < 60) {
        if (m == 59) {
            return 1 + '小时前';
        } else {
            return m + 1 + '分钟前';
        }
    } else if (h < 24) {
        return h + 1 + '小时前';
    } else if (currentYear == createYear) {
        return new Date(createTime).format("MM-dd hh:mm");
    } else {
        return new Date(createTime).format("yyyy-MM-dd hh:mm");
    }
}

/**
 * YaYa 下载条
 * obj = {
 *     title: '' || '牙牙星球',
 *     slogan: '',
 *     btnText: '' || '马上下载',
 * }
 *
 */
function planetDownloadBar() {
    var obj = arguments[0] || {};
    var html = '';

    // style see common.css
    html += '<div class="download-bar-wrap">';
    html += '	<div class="download-bar">';
    html += '		<img src="http://images.9zhitx.com/f8ac1140-becd-4972-b5b4-6626a1f4b405.png">';
    html += '		<p class="title">' + (obj.title || '牙牙星球') + '</p>';
    html += '		<p class="slogan">' + (obj.slogan || '你的最佳追星神器') + '</p>';
    html += '		<a id="downloadBtn" href="http://www.9zhitx.com/yyxq/download.html?t=' + (+new Date()) + '">' + (obj.btnText || '马上下载') + '</a>';
    html += '	</div>';
    html += '</div>';
    var addDiv = !obj.addDiv ? '<div class="foot-bar-class" style="height: 60px;"></div>' : '';
    $('body').append(addDiv).append(html);
}

/**
 * 只有在webview或者网页版的情况下有用
 * 提示信息显示下屏幕下方
 * msg 提示文字；
 * prompt 提示框对象；
 * position 显示的位置（值为 center 显示在中间；值为 bottom 显示在底部）
 * delay 默认为2s
 */

function promptMsg(msg, position, flag) {
    var flag = flag || 'true';
    var prompt_st = null;
    if (flag == 'true') {
        clearTimeout(prompt_st);
        $('#promptMsg').remove();
    } else {
        if ($('#promptMsg').length) return;
    }
    var tags = '<div id="promptMsg"></div>';
    $('body').append(tags);
    var prompt = $('#promptMsg');
    var obj = arguments[3] || {};

    var w_width = window.innerWidth || document.documentElement.clientWidth,
        screen_height = window.innerHeight || document.body.clientHeight,
        prompt = prompt;
    prompt.css({
        'position':'fixed',
        'padding':'8px 20px',
        'max-width':'60%',
        'display':'none',
        'z-index':obj.zIndex || '5000',
        'opacity':'0',
        'background':obj.background || '#000',
        'background-size':obj.backgroundSize || '100% 100%',
        'color':obj.color || '#fff',
        'font-size':'14px',
        'line-height':obj.lineHeight || '18px',
        'border-radius':'8px',
        'background-repeat':'no-repeat'
    });

    var prompt_top = 0;
    switch(position) {
        case 'center':
            prompt_top = (screen_height-prompt.outerHeight()) / 2;
            break;
        case 'bottom':
            prompt_top = (screen_height - prompt.outerHeight() - 60);
            break;
        default:
            break;
    }

    prompt.html(msg).css({
        'top': prompt_top + 'px',
        'left': (w_width - prompt.innerWidth()) / 2 + 'px'
    }).show().animate({
        opacity:'1'
    }, 500);
    prompt_st = setTimeout(function(){
        prompt.animate({opacity:'0'},500,function(){
            $(this).remove();
            clearTimeout(prompt_st);
        });
    }, obj.delay || 3000);
}

/**
 * 登录成功后客户端回调获取用户信息
 */
function refreshWebView(data) {
    var dt = {};
    try{
        dt = JSON.parse(data);
    }catch(e){
        dt = data;
    }
    loginRefresh(location.href,{session:dt.session});
}
window.refreshWebView = refreshWebView;

/**
 * 登录成功后客户端回调这个方法,刷新页面,拼session ,client.interactive.js中调用
 * url要跳转的路径,
 * data:json
 * isLogin:是否要登录   1-要登录,0-不用登录
 * replace:是否替换页面刷新  1-不替换 , 0 - 替换
 */
function loginRefresh(url,data){
    var data = data || {};
    var params = [] , keys = [] , vals = [] , pathname= '';

    var replace = data.replace || 0;
    var isLogin = data.isLogin || 0;

    var session = data.session || clientGetSession() || '';

    if(url.indexOf('?') != -1){
        var paramStr = url.substring(url.lastIndexOf('?')+1);
        params = paramStr.split('&');
        pathname = url.substring(0,url.lastIndexOf('?'));

        for(var i = 0 , pLen = params.length; i < pLen; i++){
            var arr = params[i].split('=');
            keys.push(arr[0]);
            vals.push(arr[1]);
        }
    }else{
        pathname = url;
    }

    if (!session && isLogin){
        clientCheckLogin();
    }else{

        var pStr = '' , isFlagSession = false; //判断参数是否存在session,true存在,false不存在
        for(var m = 0 , len = keys.length; m <len; m++){
            if(m == 0) pStr += '?';

            if(keys[m] == 'session'){
                vals[m] = session;
                isFlagSession = true;
            }

            pStr += keys[m]+'='+vals[m];
            if(m != (len-1)) pStr += '&';
        }

        if(!isFlagSession) {
            if(url.indexOf('?') != -1){
                pStr += '&session='+session;
            }else{
                pStr += '?session='+session;
            }
        }
        if(replace){
            window.location.href = pathname + pStr;
        }else{
            window.location.replace(pathname + pStr);
        }
    }
}

/**
 * 检测平台系统
 *
 * @return system
 */
function detectPlatform(){
    var system = '';
    var browser = {
        versions: function() {
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                trident: u.indexOf('Trident') > -1,
                presto: u.indexOf('Presto') > -1,
                webKit: u.indexOf('AppleWebKit') > -1,
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
                iPhone: u.indexOf('iPhone') > -1 ,
                mac: u.indexOf('Mac') > -1,
                iPad: u.indexOf('iPad') > -1,
                webApp: u.indexOf('Safari') == -1 ,
                wx: u.indexOf('MicroMessenger') > -1 ,
                wb: u.indexOf('Weibo') > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
    if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) { // ios执行的方法
        system = 'ios';
    } else if (browser.versions.android) { // android执行的方法
        system = 'android';
    }else {
        system = 'pc';
    }
    return system;
}

/**
 * 判断所给版本号是否小于等于线上版本
 *
 * @param version 版本号
 * @return {boolean} true: 线上版本大于等于该版本 false: 线上版本小于该版本
 */
function isLeOnlineVersion(version) {
    // 获取设备信息
    let deviceInfo = clientGetDeviceInfo();

    if (version && deviceInfo) {
        let deviceInfoObj = JSON.parse(deviceInfo);
        let v1 = version.trim();
        let v2 = deviceInfoObj.appVer;
        let v1_arr = v1 ? v1.split('.') : [];
        let v2_arr = v2 ? v2.split('.') : [];
        let len = v1_arr.length <= v2_arr.length ? v1_arr.length : v2_arr.length;

        // alert('v1_arr = ' + v1_arr + ' v2_arr = ' + v2_arr);
        for (let i = 0; i < len; i++) {
            if (v1_arr[i] < v2_arr[i]) {
                return true;
            } else if (v1_arr[i] > v2_arr[i]) {
                return false;
            } else {
                if (i == 2) { // 只需取前三位作比较
                    return true;
                }
            }
        }
    }

    return false;
}

/**
 * loading Toast
 *
 * @param txt
 */
function loadingToast(txt) {
    var loadingToast = $('#loadingToast');
    // console.log('loadingToast.length = ' + loadingToast.length);

    if (loadingToast.length == 0) {
        $('body').append(
            '<div id="loadingToast" class="loading_toast">' +
            // '<div class="mask_transparent"></div>' +
            '<div class="toast">' +
            '<div class="loading">' +
            '<div class="loading_leaf loading_leaf_0"></div>' +
            '<div class="loading_leaf loading_leaf_1"></div>' +
            '<div class="loading_leaf loading_leaf_2"></div>' +
            '<div class="loading_leaf loading_leaf_3"></div>' +
            '<div class="loading_leaf loading_leaf_4"></div>' +
            '<div class="loading_leaf loading_leaf_5"></div>' +
            '<div class="loading_leaf loading_leaf_6"></div>' +
            '<div class="loading_leaf loading_leaf_7"></div>' +
            '<div class="loading_leaf loading_leaf_8"></div>' +
            '<div class="loading_leaf loading_leaf_9"></div>' +
            '<div class="loading_leaf loading_leaf_10"></div>' +
            '<div class="loading_leaf loading_leaf_11"></div>' +
            '</div>' + (txt ? '<p class="toast_content">' + txt + '</p>' : '') +
            '</div>' +
            '</div>'
        );

        if (!txt) {
            $('.toast').css({'width' : '5.6em', 'min-height' : '5.6em'});
            $('.loading').css('top', '50%');
        }
    } else {
        loadingToast.remove();
    }

}

/**
 * Returns a random integer between min (included) and max (included)
 *
 * @param min(included)
 * @param max(included)
 * @return integer number
 * */
function getRandomIntInclusive (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 获取 Url 参数值
 *
 * @param {String} name 参数名称
 * @return {Object} param  返回参数值
 */
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); // 匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null; // 返回参数值
}

export default {
    promptMsg,
    getUrlParam,
    loadingToast,
    detectPlatform,
    planetDownloadBar,
    isLeOnlineVersion,
    getRandomIntInclusive,
    formatPublishTime
}