/**
 * 禁用客户端返回按钮
 * string:提示文字
 */
function clientGoBackForbidden(string) {
	try{
		window.object.LotteryButtonClick(string);
	}catch(e){}
}

/**
 * 客户端返回按钮解除禁用
 */
function clientLotteryCompleted() {
	try{
        window.object.LotterySucceed();
	}catch(e){}
}

/**
 * 调用客户端登录
 * 登录成功之后客户端调用loginRefresh() 在global.js中
 */
function clientCheckLogin(){
	try{
		window.object.checkLogin();
	}catch(e){}
}

/**
 * 互动列表调用视频 
 */
function clientMovie(operateId){
	try{
		window.object.videoDetail(operateId);
	}catch(e){}
}

/**
 * 互动列表为空,点击调用互动频道
 */
function clientInteract(){
	try{
		window.object.InteractiveChannel();
	}catch(e){}
}

/**
 * 判断是否断网,默认为1 
 * 数据类型:int
 * 1-数据流量，2-wifi ,0-断网
 */
function clientIsNetwork(){
	try{
		return window.object.isNetwork();
	}catch(e){
		return 2;
	}
}

/**
 * 返回到webview的首页
 */
function clientGoBackTop(){
	try{
		window.object.goBackTop();
	}catch(e){
		setTimeout(function(){
			try{
				window.object.goBackTop();
			}catch(ev){}
		},1000);
	}
}

 /**
  * 关闭 webview
  */
function closeWebview(){
	try{
		window.object.closeWebview();
	}catch(e){
		setTimeout(function(){
			try{
				window.object.closeWebview();
			}catch(ev){}
		},1000);
	}
}

/**
 * 判断新老版本新加返回参数
 */
function clientIsNewVersion(){ 
	try{
		return window.object.isNewVersion();
	}catch(e){
		setTimeout(function(){
			try{
				return window.object.isNewVersion();
			}catch(ev){}
		},1000);
	}
}

/**
 * 跳转到外部浏览器,
 * 数据类型:json
 * url:地址
 */
function clientExternalBrowser(data){ 
	try{
		window.object.goExternalBrowser(JSON.stringify(data));
	}catch(e){}
}

/**
 * 删除列表项后回调,
 * 数据类型:int  
 * type:1-我的互动,2-我的奖品,3-我的积分
 */
function clientDelListItem(type){ 
	try{
		window.object.delListItem(type);
	}catch(e){}
}

/**
 * 分享
 * 数据类型:json
 * type:1-图文,2-视频
 * title:标题
 * detail:详情
 * url:路径
 * img:分享小图标
 * statistics:是否上报,0-不上报,1-上报
 * infoType:上报类型,1 资讯  2 视频  3 广告  4 嘉宾投票 5 软件  6互动明星, 7 兑奖页面， 8 我的兑奖奖品页，9 明星动态分享，10粉丝动态分享 ， 11  公益分享， 12 公益动态分享， 13 手游帖子分享 ，
    14 票务分享， 15 互动分享  (上报给文登辉用) 21 直播分享 22 晚会专区分享 , 23 晚会专区投票分享
 * platform:分享平台,0-全部,1-微信好友,2-朋友圈,3-qq好友,4-qq空间,5-新浪微博
 * nativeShareBtn:原生按钮,1-显示,0-不显示
 * isCallback:0 调,非0不回调，默认为0
 * platformArr:[1,2,3]没这个参数,默认为全部 ,分享面板改成可配的
 * 
 * 分享成功回调方法shareSuccess(platform) platform-平台参数
 */
function clientShareOut(data){ 
	try{
		window.object.shareOut(JSON.stringify(data));
	}catch(e){
		setTimeout(function(){
			try{
				window.object.shareOut(JSON.stringify(data));
			}catch(err){}
		},2000);
	}
}

/**
 * 获取手机序列号udid
 */
function clientGetUdid(){ 
	try{
		return window.object.getUdid();
	}catch(e){
		return null;
	}
}

/**
 * 获取session
 */
function clientGetSession(){
	try{
		return window.object.getSession();
	}catch(e){
		return null;
	}
}

/**
 * 获取用户信息
 * 数据类型:json
 * udid
 * session
 * id:用户id
 * guid
 * mobile:手机号
 * nickName:昵称
 * portrait:头像
 * signature:个性签名
 * age:年龄,-1保密
 * sex:性别,1-保密,2-男,3-女
 * userName:用户名称
 * userType:是否名星帐号
 * realName:明星真实姓名
 */
function clientGetUserInfo(){
	try{
		return window.object.getUserInfo();
	}catch(e){
		return null;
	}
}

/**
 * 获取用户的设备信息
 * 数据类型:json
 * imsi:
 * imei:
 * src:
 * cInt:
 * appVer:
 * appCode:
 * androidid:
 * platform:
 */ 
function clientGetDeviceInfo() {
	try {
		return window.object.getDeviceInfo();
	} catch(e){
		return null;
	}
}

/**
 * 评论头像跳转到个人中心
 * userId:用户id
 */
function clientUserCenter(userId){
	try{
		window.object.userCenter(userId);
	}catch(e){}
}
/**
 * web跳转原生
 * 数据类型:json
 * type:类型（1-个人信息;2-粉丝团;3-设置）
 * id:活动ID
 */
function clientGotoNativePage(data) {
    try {
        window.object.gotoNativePage(JSON.stringify(data));
    } catch(e){}
}

/**
 * 发表/回复评论 , 评论成功后客户端回调 pubComment()
 * 数据类型:json
 * nickname:用户昵称
 * modelId:1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
 * bussinessId:业务id
 * categoryId:0
 * toNickName:对评论回复的昵称
 * toUserId:对评论回复的用户Id
 * commentId：回复ID
 * showInput:1-显示，0-不显示，默认不显示
 * countLimit:100,默认为不限制
 * commentStatus:是否开启评论 1-打开, 0 – 关闭
 * share:是否显示分享按钮 1-显示, 0-不显示  , 点击按扭客户端调commentShare()
 */
function clientEnterComment(data) {
	try {
		window.object.enterComment(JSON.stringify(data));
	} catch(e){
		setTimeout(function(){
			try{
				window.object.enterComment(JSON.stringify(data));
			}catch(err){}
		},2000);
	}
}

/**
 * ios:显示title
 */
function clientGetTitle(title){
	try {
		window.object.getTitle(title);
	} catch(e){}
}

/**
 * 返回提示框
 * {
 * 	status:0 或 1, 0-点返回弹出提示,1-直接返回
 * 	msg:'弹框的提示文字'
 * }
 * */

function clientBackPrompt(data){
	try {
		window.object.backPrompt(JSON.stringify(data));
	} catch(e){}
}

/*loadReady() 客户端webview初始化完成后调用的方法*/

export default {
	clientGoBackForbidden,
	clientLotteryCompleted,
	clientCheckLogin,
	clientMovie,
	clientInteract,
	clientIsNetwork,
	clientGoBackTop,
	closeWebview,
	clientIsNewVersion,
	clientExternalBrowser,
	clientDelListItem,
	clientShareOut,
	clientGetUdid,
	clientGetSession,
	clientGetUserInfo,
	clientGetDeviceInfo,
	clientUserCenter,
    clientGotoNativePage,
    clientEnterComment,
    clientGetTitle,
    clientBackPrompt
}
