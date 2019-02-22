var PAGEURL = "/introduce/";
var SERVERURL = "home/";

var REQUEST_URL = {
	GETABOUT : SERVERURL + "getAbout",
	GETEXPERIENCE : SERVERURL + "getExperience",
	GETPROJECT : SERVERURL + "getProject",
	GETBLOG : SERVERURL + "getBlog",
	SUBMITOPINIONS : SERVERURL + "submitOptions",
};

//ajax全局配置
$.ajaxSetup({
	type : "POST",
	contentType : "application/json;charset=UTF-8",
	data : "{}",
	dataType : "json",
	cache : false
});

// toastr参数全局配置
toastr.options = {
	closeButton : false, // 是否显示关闭按钮，（提示框右上角关闭按钮）
	debug : false, // 是否使用deBug模式
	progressBar : false, // 是否显示进度条，（设置关闭的超时时间进度条）
	positionClass : "toast-top-center", // 设置提示款显示的位置
	onclick : null, // 点击消息框自定义事件 
	showDuration : "300", // 显示动画的时间
	hideDuration : "1000", //  消失的动画时间
	timeOut : "3000", //  自动关闭超时时间 
	extendedTimeOut : "1000", //  加长展示时间
	showEasing : "swing", //  显示时的动画缓冲方式
	hideEasing : "linear", //   消失时的动画缓冲方式
	showMethod : "fadeIn", //   显示时的动画方式
	hideMethod : "fadeOut" //   消失时的动画方式
};

//post请求封装
$.myPost = function(url, param, callback) {

	//对中文处理规避tomacat乱码问题
	//    param = encodeURI(param).replace(/\+/g, "%2B");

	$.post(url, param, function(data) {

		$.responceHandle(data);
		callback(data);
	});
};


//responce数据处理
$.responceHandle = function(data) {
	switch (data.status) {
	case -4:
		layer.alert('登录超时，请重新登录', {
			skin : 'layui-layer-molv', //样式类名
			closeBtn : 0
		}, function() {
			location.href = "/dmp/login.html";
		});
		break;
	case -5:
		layer.alert('密码错误，请重新登录', {
			skin : 'layui-layer-molv', //样式类名
			closeBtn : 0
		}, function() {
			location.href = "/dmp/login.html";
		});
		break;
	default:
		//            if (REQUEST_RESULT[data.result]) {
		//                $.tips({content:REQUEST_RESULT[data.result].name});
		//            }
		break;
	}
}


//获得url参数
function getQueryStringByName(name) {
	var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return decodeURI(result[1]);
}
//获得hash参数
function getHash(name) {
	var result = location.hash.match(new RegExp("[\#\&]" + name + "=([^\&]+)", "i"));
	if (result == null || result.length < 1) {
		return "";
	}
	return decodeURI(result[1]);
}

//js对象转json
function stringify(obj) {
	var t = typeof (obj);
	if (t != "object" || obj == null) {
		if (t == "string")
			obj = '"' + obj + '"';
		obj = obj.replace(/[\n\r]/gi, "");
		return String(obj);
	} else {
		var n,
			v,
			json = [],
			arr = (obj && obj.constructor == Array);
		if (!arr) {
			for (n in obj) {
				v = obj[n];
				t = typeof (v);
				if (t == "string") {
					//                    if (v.match(/[\"\'\<\>]/gi)) {
					//                        throw('输入的内容不能包含\" \'<>字符');
					//                    }
					v = '"' + v + '"';
				//v = v.replace(/[\n\r]/gi,"");
				} else if (t == "object" && v !== null) {
					v = stringify(v);
				}
				json.push('"' + n + '":' + String(v));
			}
		} else {
			for (var i = 0; i < obj.length; i++) {
				json.push(stringify(obj[i]));
			}
		}
		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
}
//写cookies 

function setCookie(name, value) {
	var Days = 0.2;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//读取cookies 
function getCookie(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if (arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}

//删除cookies 
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}