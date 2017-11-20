import tools from '../common/tools';
import ajax from '../common/ajax';
import cookie from '../common/jquery.cookie';
import client from '../common/client.interactive';
/*
 * 评论时间格式转换
 * createTime:发表时间
 * currentTime:服务器当前时间
 */
function commentTime(createTime,currentTime){
	var createTime = (typeof createTime == 'number') ? createTime : Number(createTime),
		currentTime = (typeof currentTime == 'number') ? currentTime : Number(currentTime),
		createYear = new Date(createTime).getFullYear(),//发布的年份
		currentYear = new Date(currentTime).getFullYear(),//当前的年份
		timeSpan = currentTime - createTime,
		s = parseInt(timeSpan / 1000),
		h = parseInt(s / (60 * 60)),
		m = parseInt(s / 60);
		
	if(m < 60){
		if(m == 59){
			return 1 + '小时前';
		}else{
			return m + 1 + '分钟前';
		}
	}else if(h < 24){
		return h + 1 + '小时前';
	}else if(currentYear == createYear){
		return new Date(createTime).format("MM-dd hh:mm");	
	}else{
		return new Date(createTime).format("yyyy-MM-dd hh:mm");	
	}
}

/* 
 * 发表评论 
 * commentData:json格式,客户端传过的来值
 * data:json格式
 * {commentType:'',session:'',modelId:'',bussinessId:''}
 */
function publishComment(element,commentData,data){
	if(commentData == '' || commentData == null) return;
	var data = data || {};
	var itemUrl = data.itemUrl || '/router?method='; //项目路径
	
	var str = '' , 
		default_photo = 'http://images.9zhitx.com/7bbc269c-d557-43a0-8d26-d87f4d2dbc7b.png';
	
	var no_comment = $(element).find('.no_comment');
	if(no_comment.is(':visible')) no_comment.remove();
	
	var commentData = JSON.parse(commentData);
	
	var totalComment = parseInt($('#totalFloor').attr('totalfloor'))+1;//总评论数
	var totalFloor = parseInt($('#commentList li:eq(0) .time span').text() || 0)+1;//总楼层
	
	var zanData = { //点赞的参数
		id:data.modelId + '-0-' +commentData.id,
		commentType:data.commentType,
		session:data.session,
		modelId:data.modelId,
		bussinessId:data.bussinessId
	};
	
	if(data.commentType == 4){
		var client_data = {
			modelId:$('#modelId').val(),
			bussinessId:$('#bussinessId').val(),	
			toNickName:commentData.nickName,
			toUserId:commentData.userId,
			commentId:(commentData.id).split("-")[1]
		};
		
		var replayCount = parseInt($('#replayComment').attr('replaycount'))+1;
		$('#replayComment').attr('replaycount',replayCount).text(function(i,text){
			return shortNumber(replayCount,2);
		});
		
		str += '<li startIndex="'+ commentData.startIndexStr +'" onclick=\'clientComment(this,'+ JSON.stringify(client_data) +')\'>';
	}else{
		str += '<li startIndex="'+ commentData.startIndexStr +'">';
	}
	str += '<div class="cnt">';
	str += '<div class="t box-vm">';
	
	var USER_BIRTHDAY_TAG = ''; // 添加生日,等级 , v3.4.2
	var USER_LEVEL = '';
	var LEVELNUM = 1;
	
	if(commentData.honorTag){
		if(commentData.honorTag.indexOf('USER_LEVEL') != -1){
			LEVELNUM = commentData.honorTag.split(',')[0].replace('USER_LEVEL_','');
			if(LEVELNUM != 1){
				USER_LEVEL = '<img src="/h5/common/images/common/level/'+ (commentData.honorTag.split(',')[0]) +'.png" class="level"/>';
			}
		}
		if(commentData.honorTag.indexOf('USER_BIRTHDAY_TAG') != -1 && LEVELNUM >= 4){
			USER_BIRTHDAY_TAG = '<img src="/h5/common/images/common/USER_BIRTHDAY_TAG.png" class="birthday"/>';
		}
	}
	
	str += '<div class="h img-url" onclick="clientUserCenter(\''+ commentData.userId +'\')">'+ USER_BIRTHDAY_TAG +'<img src="'+ (commentData.portrait || default_photo) +'" class="portrait" /></div>';
	str += '<div class="flex">';
	if(commentData.userType == 1){
		str += '<div class="n" style="color:#fda139"><span onclick="clientUserCenter(\''+ commentData.userId +'\')">'+ commentData.nickName +' </span>'+ USER_LEVEL +'<img src="http://images.9zhitx.com/f1ff72f5-0a72-4c38-8340-a51d9fc8ea97.png" class="vm stars"></div>';
	}else{
		str += '<div class="n"><span onclick="clientUserCenter(\''+ commentData.userId +'\')">'+ commentData.nickName +'</span>'+ USER_LEVEL +'</div>';
	}
	if(data.commentType != 4){
		str += '<div class="time">1分钟前<span class="ml10">'+ (totalFloor || 1) +'楼</span></div>';
	}else{
		str += '<div class="time">1分钟前</div>';
	}
	str += '</div>';
	str += '<div>';
	str += '<div class="box-vm">';
	str += "<span class='zan' praisecount='0' data-zan='"+ JSON.stringify(zanData) +"'></span>";//3.0修改
	/* 牙牙星球不要回复
	if(data.commentType != 4){
		var replayUrl = itemUrl + 'comments/reply_list_view?modelId='+data.modelId+'&bussinessId='+data.bussinessId+'&commentId='+ (commentData.id) +'&session='+ data.session;
		str += '<span class="replay"></span>';
		str += '<div onclick="location.href=\''+ replayUrl +'\'" ><img src="http://images.9zhitx.com/981207d5-4318-4b19-aee9-c298955d587a.png" width="18" height="16"/></div>';
	}
	*/
	str += '</div>';
	str += '</div>';
	str += '</div>';
	if(commentData.toNickName){
		str += '<div class="detail"><span class="tonickname" tonickname="'+commentData.toNickName+'" touserid="'+commentData.toUserId+'">@'+ commentData.toNickName +'</span> '+ commentData.replyContent.expression() +'</div>';
	}else{
		str += '<div class="detail">'+ commentData.replyContent.expression() +'</div>';
	}
	str += '</div>';
	str += '</li>';

	$(element).prepend(str);
	$(element).parent().show();
	$('#totalFloor').text('('+totalComment+')').attr('totalfloor',totalComment);
}

/* 
 * 生成评论列表
 *  commentObjec:json格式
 *  {modelId:'',categoryId:'',bussinessId:'',startIndex:'',pageSize:'',type:'',pageNo:''}
 */
function appendComent(commentObjec){//滑动加载评论 
	var commentObjec = commentObjec || {};
	var element = null;
	var session = commentObjec.session || tools.getUrlParam('session')||client.clientGetSession();
	var share = commentObjec.share || 1; //2为分享页面
	var commentType = commentObjec.commentType || 1; //1-全部评论, 2-是热门评论,3-自已的评论,4-回复列表
	var itemUrl = commentObjec.itemUrl || '/router?method='; //项目路径
	var url = commentObjec.url || (itemUrl + 'jz.planet.interact.comment.list'), 
		param = {};
	
	if(commentType == 1){
		element = commentObjec.element || $('#commentList');	
		param = {
			'modelId':commentObjec.modelId || '19',//19=投票,拼图
			'categoryId':commentObjec.categoryId || '0', //分类
			'bussinessId':commentObjec.bussinessId || tools.getUrlParam('interactId'),//业务
			'startIndex':commentObjec.startIndex || 0,
			'pageSize':commentObjec.pageSize || 10,
			'type':commentObjec.type || 1, //1-new, 2-old
			'pageNo':commentObjec.pageNo || 1
		};
	}else if(commentType == 2){
		element = commentObjec.element || $('#hotCommentList');
		param = {
			'modelId':commentObjec.modelId || '19',//1-娱乐, 2-视频, 3-互动, 4-嘉宾
			'bussinessId':commentObjec.bussinessId || tools.getUrlParam('interactId')//业务
		};
	}else if(commentType == 3){
		element = commentObjec.element || $('#myCommentList');
		param = {
			'modelId':commentObjec.modelId || '19',//1-娱乐, 2-视频, 3-互动, 4-嘉宾
			'bussinessId':commentObjec.bussinessId || tools.getUrlParam('interactId'),//业务
			'session':commentObjec.session
		};
	}else{
		element = commentObjec.element || $('#replayCommentList');
		param = {
			'modelId':commentObjec.modelId || '19',//1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
			'bussinessId':commentObjec.bussinessId || $('#bussinessId').val(),//业务
			'commentId':commentObjec.commentId || $('#commentId').val(),
			'startIndex':commentObjec.startIndex || 0,
			'pageSize':commentObjec.pageSize || 10,
			'pageNo':commentObjec.pageNo || 1
		};
		
	}
	var count = element.find('li:not(.no_comment)').length;
	
	$.ajax({
		type: 'post',
		url: ajax.drawUrl(url),
		beforeSend: ajax.beforeAjax,
		dataType: 'json',
		data:param,
		success: function(listData) {
			if(commentType == 1 && !param.startIndex){ //显示总数
				(listData.totalFloor) ? $('#totalFloor').text('('+listData.totalFloor+')').attr('totalFloor',listData.totalFloor) 
						: $('#totalFloor').attr('totalFloor',listData.totalFloor);
			}
			
			var infoData = {
				count:count,
				share:share,
				session:session,
				commentType:commentType,
				itemUrl:itemUrl
			};
			
			var str = commentList(element,listData,infoData);
			
			if(commentType == 2 && str == ''){
				$(element).parent().remove();
			}else if(str != ''){
				$(element).append(str);
				$(element).parent().show();
				//显示展开
				if(commentType == 3 && $(element).find('li').length>2){
					var tags = '<div class="box-vm myCommentIsShow" style="font-size:14px; color:#666; height:40px; background:#fff;">'
					+				'<div>展开</div>'
					+				'<div><img src="http://images.9zhitx.com/f4205953-a0f1-4198-bdc4-bc88d8483689.png" width="12" style="margin-left:5px;"></div>'
					+			'</div>';
					$(element).after(tags);
				}
			}
		},
		error: function() {
			tools.promptMsg('系统异常，请稍后再试~', 'center');
		}
	});
}

/* 
 * 评论列表 - 数据 
 * data:json格式
 * {count:'',share:'',commentType:'',session:'',itemUrl:''} 
 * 
 */
function commentList(element,listData,data){
	var list = {};
	if(data.commentType == 1){
		list = listData.comments;
	}else if(data.commentType == 2){
		list = listData.hotComments;
	}else if(data.commentType == 3){
		list = listData.myComments;
	}
	var data = data || {};
	var str = '';
	var itemUrl = data.itemUrl || '/router?method=';

	if(typeof list != 'object') return str;
	var default_photo = 'http://images.9zhitx.com/3e2014ff-12ec-4f31-a0c5-8f6369c3baad.png';
	var no_comment = element.find('.no_comment');
	if (!list.length && !data.count && (data.commentType==1 || data.commentType == 4)) {
		if(!no_comment.length) {
			str += '<li class="no_comment">';
//			str += '<img src="http://images.9zhitx.com/c4c0dc6e-53b5-4105-98b9-eac3eebfd723.png" />';
			str += '<p>看！豪华版沙发在向你招手~</p>';
			str += '</li>';
		}
	} else {
		no_comment.remove();
		if((data.commentType == 1 || data.commentType==4) && list.length < 10) {
			$(document).off('scroll');
		}
		if(!list.length) return str; 
		
		$.each(list,function(i){
			var isZan = '';
			try{
				isZan = $.cookie(list[i].id);
			}catch(e){
				isZan = '';
			}
			
			var zanData = { //点赞的参数
				id:list[i].id,
				commentType:data.commentType,
				session:data.session,
				modelId:list[i].modelId,
				bussinessId:list[i].bussinessId
			};
			
			if(data.commentType == 4){
				var client_data = {
					modelId:$('#modelId').val(),
					bussinessId:$('#bussinessId').val(),
					toNickName:list[i].nickName,
					toUserId:list[i].userId,
					commentId:$("#commentId").val()
				};
				str += '<li startIndex="'+ list[i].startIndex +'" onclick=\'clientComment(this,'+ JSON.stringify(client_data) +')\'>';
			}else if(data.commentType == 3){
				if(i>1){
					str += '<li startIndex="'+ list[i].startIndexStr +'" style="display:none;">';
				}else{
					str += '<li startIndex="'+ list[i].startIndexStr +'">';
				}
			}else{
				str += '<li startIndex="'+ list[i].startIndexStr +'">';
			}
			str += '<div class="cnt">';
			str += '<div class="t box-vm">';
			
			var USER_BIRTHDAY_TAG = ''; // 添加生日,等级 , v3.4.2
			var USER_LEVEL = '';
			var LEVELNUM = 1;
			
			if(list[i].honorTag){
				if(list[i].honorTag.indexOf('USER_LEVEL') != -1){
					LEVELNUM = list[i].honorTag.split(',')[0].replace('USER_LEVEL_','');
					if(LEVELNUM != 1){
						USER_LEVEL = '<img src="/h5/common/images/common/level/'+ (list[i].honorTag.split(',')[0]) +'.png" class="level"/>';
					}
				}
				if(list[i].honorTag.indexOf('USER_BIRTHDAY_TAG') != -1 && LEVELNUM >= 4){
					USER_BIRTHDAY_TAG = '<img src="/h5/common/images/common/USER_BIRTHDAY_TAG.png" class="birthday"/>';
				}
			}
			
			if(list[i].portrait == 'http://fake_icon'){
				if(data.commentType == 3 && i){//自已的评论头像只有一个
					str += '<div class="h img-url"></div>';
				}else{
					str += '<div class="h img-url" onclick="clientUserCenter(\''+ list[i].userId +'\')">'+ USER_BIRTHDAY_TAG +'<img src="'+ default_photo +'" class="portrait"/></div>';
				}
			}else{
				if(data.commentType == 3 && i){
					str += '<div class="h img-url"></div>';
				}else{
					str += '<div class="h img-url" onclick="clientUserCenter(\''+ list[i].userId +'\')">'+ USER_BIRTHDAY_TAG +'<img src="'+ (list[i].portrait || default_photo) +'" class="portrait"/></div>';
				}
			}
			
			str += '<div class="flex">';
			if(list[i].userType == 1){
				str += '<div class="n" style="color:#fda139" ><span onclick="clientUserCenter(\''+ list[i].userId +'\')">'+ list[i].nickName +' </span>'+ USER_LEVEL +'<img src="http://images.9zhitx.com/f1ff72f5-0a72-4c38-8340-a51d9fc8ea97.png" class="vm stars"></div>';
			}else{
				str += '<div class="n" ><span onclick="clientUserCenter(\''+ list[i].userId +'\')">'+ list[i].nickName +'</span>'+ USER_LEVEL +'</div>';
			}
			if(data.commentType != 4){
				if(list[i].modelId == 19){ // 互动显示楼层
					str += '<div class="time">'+ commentTime(list[i].commentDate,listData.systemTime) +'<span class="ml10">'+ (list[i].floor ? list[i].floor+'楼':'') +'</span></div>';
				}else{
					str += '<div class="time">'+ commentTime(list[i].commentDate,listData.systemTime) +'</div>';
				}
			}else{
				str += '<div class="time">'+ commentTime(list[i].replyDate,listData.systemTime) +'</div>';
			}
			str += '</div>';
			str += '<div>';
			str += '<div class="box-vm">';
			if(data.share == 1){
				if(!isZan){
					str += "<span class='zan' praisecount='"+list[i].praiseCount+"' data-zan='"+ JSON.stringify(zanData) +"'>"+ shortNumber(list[i].praiseCount,1) +"</span>";
				}else{
					str += '<span class="zan on" praisecount="'+list[i].praiseCount+'">'+ shortNumber(list[i].praiseCount,1) +'</span>';
				}
				/*
				if(data.commentType != 4){
					var replayUrl = itemUrl + 'comments/reply_list_view?modelId='+list[i].modelId+'&bussinessId='+list[i].bussinessId+'&commentId='+ (list[i].id).split("-")[2] +'&session='+ data.session;
					str += '<span class="replay" >'+ shortNumber(list[i].replyCount,2) +'</span>';
					str += '<div onclick="location.href=\''+ replayUrl +'\'" ><img src="http://images.9zhitx.com/981207d5-4318-4b19-aee9-c298955d587a.png" width="18" height="16"/></div>';
				}
				*/
			}else{
				str += '<span class="zan">'+ shortNumber(list[i].praiseCount,1) +'</span>';
				str += '<span class="replay">'+ shortNumber(list[i].replyCount,2) +'</span>';
			}
			str += '</div>';
			str += '</div>';
			str += '</div>';
			if(data.commentType != 4){
				str += '<div class="detail">'+ list[i].commentContent.expression() +'</div>';
			}else{
				if(list[i].toNickName){
					str += '<div class="detail"><span class="tonickname" tonickname="'+list[i].toNickName+'" touserid="'+list[i].toUserId+'">@'+ list[i].toNickName +'</span> '+ list[i].replyContent.expression() +'</div>';
				}else{
					str += '<div class="detail">'+ list[i].replyContent.expression() +'</div>';
				}
			}
			str += '</div>';
			str += '</li>';
		});
	}
	return str;
}

/*
 * 评论点赞
 * data:json格式
 * {id:'',commentType:'',session:'',modelId:'',bussinessId:'',itemUrl:''}
 * itemUrl:项目路径 ,默认/router?method=
 */
function zanComment(elem,data){
	var data = JSON.parse(data) || {};
	var itemUrl = data.itemUrl || '/router?method=';
	window.event.stopPropagation();
	if($.cookie(data.id)) return;
	var pId = data.id.split('-');
	var url = '',param = {};
	if(data.commentType != 4){ //全部评论,我的评论,热门评论
		url = data.praiseUrl || (itemUrl + 'jz.planet.interact.comment.praise');
		param = {
			modelId : pId[0],
			categoryId : pId[1],
			commentId : pId[2],
			session : data.session,
			modelId:data.modelId,
			bussinessId:data.bussinessId
		};
	}else{ //回复评论
		url = data.replyPraiseUrl || (itemUrl + 'jz.planet.interact.comment.replyPraise');
		param = {
			commentId : pId[0],
			replyId :pId[1],
			session : data.session,
			modelId:data.modelId,
			bussinessId:data.bussinessId
		};
	}
	if(client.clientIsNetwork() != 0){
		$.cookie(data.id,data.id,{expires:365});
		$(elem).addClass('on');
		var addNumber = '<span style="color:#e53c5f; top:-12px; right:14px; position:absolute;">+1</span>';
		var praiseCount = parseInt($(elem).attr('praisecount'))+1;
		
		$(elem).attr('praisecount',praiseCount).text(function(index,text){
			return shortNumber(praiseCount,1);
		});
		$(elem).append(addNumber).find('span').animate({
			opacity:0,
			top:'-22px'
		},800,function(){
			$(this).remove();
		});
		
		$.ajax({
			type: 'post',
			url: ajax.drawUrl(url),
			beforeSend: ajax.beforeAjax,
			dataType: 'json',
			data:param,
			success: function(listData) {
			},
			error: function() {
				tools.promptMsg('系统异常，请稍后再试~', 'center');
			}
		});
		
	}else{
		promptMsg('网络异常,请查看网络','center');
	}
	
}

/*赞数,评论数缩简,type=1为点赞数,type=2为评论数*/
function shortNumber(num,type){
	var num = parseInt(num);
	if(num == 0) return '';//3.0版修改
	if(num >=10000) return Math.floor(num/1000)/10+' 万';
	else return num;
}

/* 我的评论显示隐藏 */
function myCommentIsShow(element,id){
	var tags = '<div>展开</div>'
		+	   '<div><img src="http://images.9zhitx.com/f4205953-a0f1-4198-bdc4-bc88d8483689.png" width="12" style="margin-left:5px;"></div>';
	
	var tags_on = '<div>隐藏</div>'
		+		  '<div><img src="http://images.9zhitx.com/27eaf6d8-71d9-42dd-9859-8b00e0b67c3a.png" width="12" style="margin-left:5px;"></div>';
	
	if($(element).hasClass('on')){
		$(element).removeClass('on').html(tags);	
		$(id).find('li:gt(1)').hide();
	}else{
		$(element).addClass('on').html(tags_on);	
		$(id).find('li').show();
	}
}

/*
 * 数据类型:json
 * {
 * 	id: div.allCommentListId
 * 	commentStatus:是否显示评论 , 1-显示,0关闭
 * 	all:{
 * 		url:全部评论请求地址
 * 		element:全部评论ul的对象
 * 	},
 * 	hot:{
 * 		url:热门评论请求地址
 * 		element:热门评论ul的对象
 * },
 * 	my:{
 * 		url:我的评论请求地址
 * 		element:我的评论ul的对象
 * },
 * 	share:是否为分享页 ,1-详情页面,2-分享页面
 * 	commentType:评论类型, 1-全部评论,2-热门评论,3-我的评论
 *  itemUrl:项目路径 ,默认/router?method=
 * }
 */
function showCommentList(data){
	var data = data || {};
	
	if(data.commentStatus == 0) return; //评论关闭
	
	var itemUrl = data.itemUrl || '/router?method='; //项目路径
	
	var all = data.all || {} , my = data.my || {} , hot = data.hot || {};
	var tags = '', myTags = '';
	
	tags += '<div class="comment_list">'
		 +		'<div class="title"><span>热门评论</span></div>'
		 +		'<ul class="list" id="hotCommentList"></ul>'
		 +	'</div>'
		 +	'<div class="comment_list">'
		 +		'<div class="title"><span>全部评论<b id="totalFloor"></b></span></div>'
		 +		'<ul class="list" id="commentList"></ul>'
		 +	'</div>';
	$(data.id || '#allCommentListId').append(tags);
	
	var commentObjec = { //全部评论
		element:$('#commentList'),	
		url : all.url || (itemUrl +'jz.planet.interact.comment.list'),
		commentType : data.commentType || 1,
		modelId : data.modelId || '19',//1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
		categoryId:data.categoryId || '0', //分类
		bussinessId:data.bussinessId || tools.getUrlParam('interactId'),//业务
		startIndex:data.startIndex || 0,
		pageSize:data.pageSize || 10,
		type:data.type || 1, //1-new, 2-old
		pageNo:data.pageNo || 1,
		share:data.share || 1
	};
	var hotCommentObjec = { //热门评论
		element:$('#hotCommentList'),	
		url : hot.url || (itemUrl + 'jz.planet.interact.hot.comment.list'),
		commentType:data.commentType || 2,
		modelId : data.modelId || '19',//1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
		bussinessId:data.bussinessId || tools.getUrlParam('interactId'),//业务
		share:data.share || 1
	};
	appendComent(commentObjec);
	appendComent(hotCommentObjec);
	
	if(data.share == 2) return; //为分享页面  , 没有我的评论和下拉加载
	
	myTags += '<div class="comment_list">'
		   +		'<div class="title"><span>我的评论</span></div>'
		   +		'<ul class="list" id="myCommentList"></ul>'
		   +	'</div>';
	
	$(data.id || '#allCommentListId').prepend(myTags);
	
	var myCommentObjec = { //我的评论
		element:$('#myCommentList'),	
		url : my.url || (itemUrl + 'jz.planet.interact.my.comment.list'),
		commentType:data.commentType || 3,
		session:data.session,
		modelId : data.modelId || '19',//1=娱乐, 2=视频,3=互动,4=嘉宾,5=明星动态,6=粉丝动态,7=明星问答, 8=明星公益 ,9=明星票务, 10=手游帖子
		bussinessId:data.bussinessId || tools.getUrlParam('interactId'),//业务
		share:data.share || 1
	};
	
	if(myCommentObjec.session){
		appendComent(myCommentObjec);
	}
	
	setTimeout(function(){
		var STARTINDEX = ''; // 解决网络慢的情况数据未加载完,再次发请求
		$(document).on('scroll',function(){
			var dh = $(this).height();
			var wh = window.innerHeight || document.body.clientHeight;
			var st = $(this).scrollTop();
			if(dh - wh - st == 0){
				commentObjec.pageNo += 1 ;
				commentObjec.startIndex = commentObjec.element.find('li:last').attr('startIndex');
				commentObjec.type = 2;
				
				if(STARTINDEX != commentObjec.startIndex){
					STARTINDEX = commentObjec.startIndex;
					appendComent(commentObjec);
				}
			}	
		});
	},2000);
	
	$('#allCommentListId').on('click','.zan',function(){
		var data = $(this).attr('data-zan');
		zanComment($(this),data);
	});
	$('#allCommentListId').on('click','.myCommentIsShow',function(){
		myCommentIsShow(this,'#myCommentList');
	});
}

export default {
	showCommentList,
	publishComment
}

