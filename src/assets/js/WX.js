import wx from "weixin-js-sdk";
import Lib from "assets/js/Lib";
export default {
	//判断客户端是否为微信
	// is_weixin:function (title='海外投资服务平台',desc='这是一个拥有海外权威专家、全球移民项目、海外深度资讯的智能互联网海外服务平台 | 美移',link=location.href,imgUrl='https://oss.meiyi.ai/upload/image/201707/e49097a9-21d4-40ba-85e5-e3b2caf58599.jpg',type='link') {
    is_weixin:function (title='海外投资服务平台',desc='这是一个拥有海外权威专家、全球移民项目、海外深度资讯的智能互联网海外服务平台 | 美移',link=location.href,imgUrl='https://oss.meiyi.ai/upload/image/201808/e1027b33-55dc-46a3-9b48-ea7045c12f78.png',type='link') {
		const ua = navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == "micromessenger") {
			Lib.M.ajax({
				url: `/wechat/share_param`,  //share_activity
				type: 'post',
				data: {url: location.href.split('#')[0].toString() },
				success: data => {
					const wxConfig=data;
                    console.log(location.href.split('#')[0].toString());

					let checkWxjs=setTimeout(function () {
						// if(wx){
							let wxObj={
								title: title, // 分享标题
								desc: desc, // 分享描述
								link: link, // 分享链接
								imgUrl: imgUrl, // 分享图标
								type: type, // 分享类型,music、video或link，不填默认为link
							};

							wx.config({
							    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
							    appId:wxConfig.appid, // 必填，公众号的唯一标识wx03d9cbf580dfbbcc
							    timestamp:wxConfig.timestamp, // 必填，生成签名的时间戳
							    nonceStr:wxConfig.noncestr, // 必填，生成签名的随机串
							    signature:wxConfig.signature,// 必填，签名，见附录1
							    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone'], // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
							});

							wx.ready(()=>{

								wx.onMenuShareAppMessage(wxObj); //分享给朋友
								wx.onMenuShareTimeline(wxObj); //分享到朋友圈
								wx.onMenuShareQQ(wxObj);
								wx.onMenuShareWeibo(wxObj);
								wx.onMenuShareQZone(wxObj);
								clearTimeout(checkWxjs);
							});
						// };
					},1000);
				}
			});
            if(window.__wxjs_environment === 'miniprogram'){//判断当前如果是小程序的话载入小程序的jssdk
                let scriptTag = document.createElement('script');
                scriptTag.type = "text/javascript";
                scriptTag.src = 'https://hm.baidu.com/hm.js?ea4ca590fa32c52bb7a41b12bcf79212';
                document.body.appendChild(scriptTag);
            }
			return true;
		} else {
			return false;
		}

	},

    onBridgeReady:function (wxObj,paymentPluginId,sn,uid,token){
        WeixinJSBridge.invoke(
    		// 'getBrandWCPayRequest',
    		// wxObj,
            'getBrandWCPayRequest', {
                "appId":wxObj.appId,     //公众号名称，由商户传入
                "timeStamp":wxObj.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":wxObj.nonceStr, //随机串
                "package":wxObj.package,
                "signType":"MD5",         //微信签名方式：
                "paySign":wxObj.paySign //微信签名
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                	Lib.M.ajax({
                	  url:'/order/query_order_status',
                	  type:'post',
                	  data: {
                	    paymentPluginId,
                        sn,
                        uid,
                        token,
                	  },
                	  success:(res)=>{
                	    location.reload(true);
                	  }
                	});
				}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    },
    onBridgeReady2:function (wxObj,paymentPluginId,sn,uid,token){//用于在办项目支付
        WeixinJSBridge.invoke(
    		// 'getBrandWCPayRequest',
    		// wxObj,
            'getBrandWCPayRequest', {
                "appId":wxObj.appId,     //公众号名称，由商户传入
                "timeStamp":wxObj.timeStamp,         //时间戳，自1970年以来的秒数
                "nonceStr":wxObj.nonceStr, //随机串
                "package":wxObj.package,
                "signType":"MD5",         //微信签名方式：
                "paySign":wxObj.paySign //微信签名
            },
            function(res){
                if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                	Lib.M.ajax({
                	  url:'/online_signing/query_online_signing_status',
                	  type:'post',
                	  data: {
                	    paymentPluginId,
                        sn,
                        uid,
                        token,
                	  },
                	  success:(res)=>{
                	    location.reload(true);
                	  }
                	});
				}     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    }
}