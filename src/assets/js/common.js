
import conf from './conf';
import wx from 'weixin-js-sdk';
import axios from 'axios';
const protocol=location.protocol;
var oproto = Object.prototype;
var serialize = oproto.toString;
var Rxports = {
	/**
	  * 封装axios，减少学习成本，参数基本跟jq ajax一致
	  * @param {String} type			请求的类型，默认post
	  * @param {String} url				请求地址
	  * @param {String} time			超时时间
	  * @param {Object} data			请求参数
	  * @param {String} dataType		预期服务器返回的数据类型，xml html json ...
	  * @param {Object} headers			自定义请求headers
	  * @param {Function} success		请求成功后，这里会有两个参数,服务器返回数据，返回状态，[data, res]
	  * @param {Function} error		发送请求前
	  * @param return
	*/
	ajax:function (opt){//全局ajax方法，封装成和jquery的ajax方法差不多。
		var opts = opt || {};
		if (!opts.url) {
			alert('请填写接口地址');
			return false;
		}
		axios({
			method: opts.type || 'post',
			url: opts.url,
			params: opts.data || {},
			headers: opts.headers || {
			  	'Content-Type':'application/x-www-form-urlencoded'
			},
            async:opts.async || false,
			// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  			// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
            //线上环境使用
            // baseURL:`${protocol}//${location.host}`,
            //开发环境使用
            baseURL:'/api',
			timeout: opts.time || 10*100000,
			responseType: opts.dataType || 'json',
			data:opts.data2||{},
		}).then(function(res){
			if(res.status == 200 ){
				if(opts.success){
					opts.success(res.data,res);
				}
			}else{
				if (data.error) {
					opts.error(error);
				}else{
					console.log('好多人在访问呀，请重新试试[timeout]');
				}
			}
		}).catch(function (error){
			console.log(error);
			if (opts.error) {
				opts.error(error);
			}else{
				console.log('好多人在访问呀，请重新试试[timeout]');
			}
		});
	},
	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	isArrayLike:function(obj) {
	    if (!obj)
	        return false
	    var n = obj.length
	    if (n === (n >>> 0)) { //检测length属性是否为非负整数
	        var type = serialize.call(obj).slice(8, -1)
	        if (/(?:regexp|string|function|window|global)$/i.test(type))
	            return false
	        if (type === "Array")
	            return true
	        try {
	            if ({}.propertyIsEnumerable.call(obj, "length") === false) { //如果是原生对象
	                return /^\s?function/.test(obj.item || obj.callee)
	            }
	            return true
	        } catch (e) { //IE的NodeList直接抛错
	            return !obj.window //IE6-8 window
	        }
	    }
	    return false
	},
	/*遍历数组与对象,回调的第一个参数为索引或键名,第二个或元素或键值*/
    each: function (obj, fn) {
    	var That = this;
        if (obj) { //排除null, undefined
            var i = 0
            if (That.isArrayLike(obj)) {
                for (var n = obj.length; i < n; i++) {
                    if (fn(i, obj[i]) === false)
                        break
                }
            } else {
                for (i in obj) {
                    if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
                        break
                    }
                }
            }
        }
    },
	/**
	  * 获取url传过来的参数
	  * @param name 	获取的参数
	  * @param Url 		自定义获取参数的链接
	  * @param return
	*/
	getUrlQuery:function (name,Url){//获取url内的参数。
	   //URL GET 获取值
　　   const reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"),
             url = Url || location.href;
　　     if (reg.test(url))
		 //console.log(decodeURI(RegExp.$2.replace(/\+/g, " ")).slice('?')[0]);
　　     return decodeURI(RegExp.$2.replace(/\+/g, " ").split("#")[0].split("?")[0]);
　　     return "";
	},
	//字数过滤器
	filterString : function (str,len) {//字数过滤器，超出字数显示“...”。
		if(str==null){
			return ' ';
		}else{
			if(str.length>len){
				return str.substring(0,len)+"...";
			}else if(!str.length){
				return '无';
			}else{
				return str;
			}
		}
	},
	// 去除html标签样式
	removeHTMLTag:function (str) {
        str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
        str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
        str = str.replace(/(^\s*)|(\s*$)/g, "");//去掉前后所有空格的字符串
        //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
        str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
        return str;
	},
    //过滤掉html代码中的img标签
    filterImg:function(str){
        var reTag = /<img(?:.|\s)*?>/g;
        var filterResult = str.replace(reTag,"");
        return filterResult
    },
	baseFn:function () {//全局事件，不需要DOM渲染完成后执行的全局方法。
		document.documentElement.style.fontSize = document.documentElement.clientWidth < 768 ? document.documentElement.clientWidth / 7.5 + 'px': 100 + 'px';
		// sid是跟踪来源信息
		let sid=this.getUrlQuery('sid');
		if(sid){
			sessionStorage.setItem('sid',sid);
		}
	},
	baseDomFn:function () {//全局事件，需要在DOM渲染完成后再执行的全局方法。
		const topBtn=document.querySelectorAll(".top_back");
		if(topBtn){
			for(let i=0;i<topBtn.length;i++){
				topBtn[i].onclick=function () {
					if(history.length>=2){
					history.back(-2);
					}else if(history.length==1&&document.referrer.length>0){
						history.back(-1);
					}else{
						location.href='/index.html';
					}
				}
			}
		}
		const closeBtn=document.querySelectorAll(".top_close");
		if(closeBtn.length){
			let ua = navigator.userAgent.toLowerCase();
			for(let i=0;i<closeBtn.length;i++){
				closeBtn[i].onclick=function () {
					if(ua.indexOf('micromessenger') != -1){
						WeixinJSBridge.call('closeWindow');
					}else{
						location.href="/";
					}
				}
			}
		};
		// 判断是否在小程序环境
		// if(this.checkMiniprogram()){
            this.setSeoFn();
		// }
		this.pageShow();
	},
	addHandler: function (element, type, handler) {//添加事件监听器。
       if (element.addEventListener) {
           element.addEventListener(type, handler, false);
       } else if (element.attachEvent) {
           element.attachEvent("on" + type, handler);
       } else {
           element["on" + type] = handler;
       }
	},
	getCookie:function (name){//获取cookie
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	},
	isLogin:function () {//判断用户是否登录，获取meiyi_user对象，对象属性uid,token。

		if(localStorage.meiyi_user){
			let meiyi_user=JSON.parse(localStorage.meiyi_user);
			return meiyi_user;
		}else{
			let meiyi_user={
				uid:'0',
				token:'0'
			}
			return meiyi_user;
			//alert("请登录后继续访问！")
			// if(type){
			// 	return false;
			// }
			// location.href="/login/login.html";
		}
	},
	checkPhone:function(phone,error=false,type=0){ //正则检测手机号格式  默认返回true，type=1时返回false
	  if(!(/^1[3|4|5|7|8|9][0-9]{9}$/.test(phone))){
	    return error;
	  }else if(type==1){
	   	return false;
	  }else{
	  	return true;
	  }
	},
	isCardNo:function(idCard,error){//正则检测身份证格式
	   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
	   let reg = /(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/;
	   if(reg.test(idCard) === false){
	        return  error;
	   }else{
	   		return false;
	   }
	},
	compare:function(val,type='desc'){ //type等于desc的时候为降序,默认是降序。 排序方法
		return function (obj1,obj2) {
			const val1=obj1[val],val2=obj2[val];
			if(type=='desc'){
				return val1 <= val2?1:-1;
			}else{
				return val1 <= val2?-1:1;
			}
		}
	},
	setSeoFn(title='美移移民',keywords='美移移民',description='美移移民'){
		let head=document.getElementsByTagName('head')[0];
		let oTitle=document.getElementsByTagName('title')[0];
		let oKeywords=document.createElement('meta');
		let oDescription=document.createElement('meta');
		oKeywords['name']='keywords';
		oKeywords['content']=keywords;
		oDescription['name']='description';
		oDescription['content']=description;
		oTitle.innerText=title;
		head.appendChild(oKeywords);
		head.appendChild(oDescription);
	},
	postUserInfo:function(obj,callBack){
	  this.ajax({
	   	type:'post',
	    url:'/activityuserinfo',
	    data:{
	      phone:obj.phone,
	      name:obj.name,
	      sourcePage:location.href,
	      sid:this.getSource(),
	    },
	    success:res=>{
	      if(!callBack){
	      	location.href=`/project/assess.html`;
	      }else{
			  callBack();
	      }
	    }
	  });
	},
	getSource(){
		let sid=sessionStorage.getItem('sid');
		if(window.__wxjs_environment === 'miniprogram'&&!sid){
			return 'miniprogram';
		}
		console.log('sid：'+sid);
		return  sid;
	},
	checkMiniprogram(){
		return window.__wxjs_environment === 'miniprogram';
	},
	checkBack(){
	  if(history.length>=2){
	    const topBtn=document.querySelectorAll(".top_back");
	    if(topBtn){
	    	for(let i=0;i<topBtn.length;i++){
	    		topBtn[i].onclick=function () {
	    			if(history.length>=2){
	    			history.back(-2);
	    			}else if(history.length==1&&document.referrer.length>0){
	    				history.back(-1);
	    			}else{
	    				location.href='/index.html';
	    			}
	    		}
	    	}
	    	return true;
	    }else{
	    	return false;
	    }

	  }
	},
    rsaString(){ //登陆注册用到的rsa加密
        let publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDfiIhWoRZffHs/cedr1MnBKzl36aQPiaZCfQp88Ydfs1b7Mgd63wpSEkQSZlWn9L6aCNgBYw+54b1IaErilSH/M/xRi2FimBG+LXiOUD7+myY14Fkus3fkEwm4EDRqkqs02aZ277IAD1IA0Oq72Z8mITiCgNcx5fFKUKHi7xI1fwIDAQAB';
        return publicKey
    },
	ifIos(){  //判断是否苹果手机
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		if(isiOS){
			return true
		}else{
			return false
		}
	},
    ifAndroid(){  //判断是否安卓手机
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            return true
        }else{
            return false
        }
    },
    ifMiniProgram(){
        if(window.__wxjs_environment === 'miniprogram'){
            return true;
        }
    },
	ifWeiXin(){
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            return true;
        }else{
            return false;
        }
	},
    getTopTitle:function (title) {   //自定义设置头部标题(待完善)
        document.title = title;
		let ios = this.ifIos();
        if(ios){
        	let t = title;
            document.setTitle = function(t) {
                document.title = t;
                var iframe = document.createElement('iframe');
                iframe.style.visibility = 'hidden';
                iframe.setAttribute('src', 'loading.png');
                var iframeCallback = function() {
                    setTimeout(function() {
                        iframe.removeEventListener('load', iframeCallback);
                        document.body.removeChild(iframe);
                    }, 0);
                };
                iframe.addEventListener('load', iframeCallback);
                document.body.appendChild(iframe);
            }
        }
    },
    // 解决由于ios和安卓机制不同，安卓会重新刷新主页面的ready， ios则不会的问题
    pageShow:function () {
        var isPageHide = false;
        window.addEventListener('pageshow', function () {
            if (isPageHide) {
                window.location.reload();
            }
        });
        window.addEventListener('pagehide', function () {
            isPageHide = true;
        });
    },
	// 图片预加载
	preloadImages(str){
		let loadedImage = 0;
		let newImages = [];
		let arr = str.match(/src="(.+)"\s{1}/g)
		console.log('arr:'+JSON.stringify(arr));
		return new Promise((resolve,reject)=>{
			for(let i=0;i<arr.length;i++){
				newImages[i] = new Image();
				newImages[i].src = arr[i].slice(5,-2);
				newImages[i].onload = ()=>{
					loadedImage++
					if(loadedImage === arr.length){
						resolve();
					}
				}
				newImages[i].onerror=()=>{
					reject();
				}
			}
		})
	},
};
export default Rxports;