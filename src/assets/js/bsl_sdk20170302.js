var bsl = {
    is_kingkr_obj: function () {
        var type = this.sdk_judge();
        if (type.ios == true) {
            if (typeof window.webkit == 'undefined' || typeof window.webkit.messageHandlers.local_kingkr_obj == 'undefined') {
                return false
            } else {
                return true
            }
        } else {
            if (typeof local_kingkr_obj == 'undefined') {
                return false
            } else {
                return true
            }
        }
    },
    share:function ()
    {
        switch (arguments[0]) {
            case 'share':
                this.shareOnly(arguments[1], arguments[2], arguments[3], arguments[4]);
                break;
            case 'image':
                this.shareImage(arguments[1]);
                break;
            case 'screenshot':
                this.shareCutImage();
                break;
            default:
                this.shareOnly(arguments[0], arguments[1], arguments[2], arguments[3]);
                break;
    }
},

    shareOnly:function (content, imageurl, targetUrl, title) {
    // if (!this.sdk_judge()) return false;
    // type = this.sdk_judge();
    // if (type.ios == true) {
    //     var message = {
    //         'methodName': 'share',
    //         'content': content,
    //         'imageurl': imageurl,
    //         'targetUrl': targetUrl,
    //         'title': title,
    //         'callbackMethod': 'shareCallback'
    //     };
    //     window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    // } else {
        var share = "{\"content\":\"" + content + "\",\"imageurl\": \"" + imageurl + "\",\"targetUrl\": \"" + targetUrl + "\",\"title\": \"" + title + "\"}";
        local_kingkr_obj.share(share)
    // }
},

    shareImage:function (imageurl) {
    // if (!this.sdk_judge()) return false;
    // type = this.sdk_judge();
    // if (type.ios == true) {
    //     var message = {'methodName': 'shareImage', 'imageurl': imageurl, 'callbackMethod': 'shareCallback'};
    //     window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    // } else {
        var share = "{\"content\":\"\",\"imageurl\": \"" + imageurl + "\",\"targetUrl\": \"\",\"title\": \"\"}";
        local_kingkr_obj.shareImage(share)
    // }
},

    shareCutImage:function () {
    // if (!this.sdk_judge()) return false;
    // type = this.sdk_judge();
    // if (type.ios == true) {
    //     var message = {'methodName': 'shareCutImage', 'callbackMethod': 'shareCallback'};
    //     window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    // } else {
        var share = "{\"content\":\"\",\"imageurl\": \"\",\"targetUrl\": \"\",\"title\": \"\"}";
        local_kingkr_obj.shareCutImage(share)
    // }
},

    openDownLoad:function () {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {

    } else {
        local_kingkr_obj.openDownLoadFile();
    }
},

    downloadFile:function (url) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {

    } else {
        local_kingkr_obj.downloadFile(url);
    }
},

    login:function (platform, forwardurl, callbackMethod) {
    //     alert('1');
    // if (!this.sdk_checkinside()) return false;
    //     alert('2');
    // type = this.sdk_judge();
    //     alert('3');
    // if (type.ios == true) {
    //     alert('4');
    //     var message = {
    //         'methodName': 'login',
    //         'platform': platform,
    //         'forwardurl': forwardurl,
    //         'callbackMethod': callbackMethod
    //     };
    //     window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    //     alert('ios');
    // } else {
        var login = "{\"platform\":\"" + platform + "\",\"forwardurl\":\"" + forwardurl + "\",\"callbackMethod\":\"" + callbackMethod + "\"}";
        local_kingkr_obj.login(login);
    // }
},

    payType:function (order, paytype, callbackMethod) {
    if (!this.sdk_checkinside()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'pay', 'order': order, 'paytype': paytype, 'callbackMethod': callbackMethod};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        var payType = '{"paytype":\"' + paytype + '\","callbackMethod":\"' + callbackMethod + '\"}';
        local_kingkr_obj.payType(order, payType)
    }
},

    audioPlay:function (operator) {
    if (!this.sdk_checkinside()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {

    } else {
        var data = "{\"operator\":" + operator + "}";
        local_kingkr_obj.audioPlay(data);
    }
},

    qrcode:function () {
    if (!this.sdk_checkinside()) return false;
    var resulttype = 1;
    if (arguments[0] != null)
        resulttype = arguments[0];
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'qrcoder', 'controlQRCodeResult': resulttype, 'callbackMethod': 'qrcodeCallback'};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.qrcoderWithCallback(resulttype);
    }
},

    cleanCache:function () {
    if (!this.sdk_checkinside()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'cleancache'};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.cleanCache();
    }
},

    controlBottomTabLayout:function (param) {
    if (!this.sdk_checkinside()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        if (param == null)
            var message = {'methodName': 'controlBottomTabLayout'};
        else
            var message = {'methodName': 'controlBottomTabLayout', 'show': '' + param + ''};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        if (param == null)
            param = '';
        local_kingkr_obj.controlBottomTabLayout(param);
    }
},

    controllNavigateLayout:function (param) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        if (param == null)
            var message = {'methodName': 'controllNavigateLayout'};
        else
            var message = {'methodName': 'controllNavigateLayout', 'show': '' + param + ''};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        if (param == null)
            param = '';
        local_kingkr_obj.controlNavigatorLayout(param);
    }
},

    controlLeftMenuLayout:function (state) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'controlLeftMenuLayout', 'show': state};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.controlLeftMenuLayout(state);
    }
},

    getDeviceIdentifier:function (callbackMethod) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'getDeviceIdentifier', 'callbackMethod': callbackMethod};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.getDeviceIndentify(callbackMethod);
    }
},

    setScreenOrientation:function (orientation) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'setScreenOrientation', 'orientation': orientation};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.setScreenOrientation(orientation);
    }
},

    copyUrlToClipboard:function () {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'copyUrlToClipboard'};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.clipboardManager();
    }
},

    awakeOtherBrowser:function (url) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        if (url == '') {
            var message = {'methodName': 'awakeOtherWebview'}
            window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
        } else {
            var message = {'methodName': 'awakeOtherWebview', 'webviewUrl': url}
            window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
        }
    } else {
        local_kingkr_obj.awakeOtherWebview(url);
    }
},

    registerPushTag:function (tag, callbackmethod) {
    if (tag == '') {
        return false;
    }
    tag = tag.split(',');
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'registerPushTag', 'tag': tag, 'callbackMethod': callbackmethod};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        var message = "{'tag':" + JSON.stringify(tag) + ",'callbackMethod':" + callbackmethod + "}";
        local_kingkr_obj.registerPushTag(message);
    }
},

    getBuild:function () {
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'getBuild', 'callbackMethod': 'getBuildResult'}
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        var b = local_kingkr_obj.getBuild();

    }
},

    getBuildResult:function (buildVersion) {

},

    sdk_judge:function () {
    var u = navigator.userAgent;
    return {
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
    }
},

    sdk_checkinside:function () {
    if (!this.is_kingkr_obj()) {
        alert("请在App内打开");
        return false;
    }
    return true;
},

    getLocation:function (callbackMethod) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'getLocation', 'callbackMethod': callbackMethod}
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.getLocation(callbackMethod);
    }
},

    copyText:function (txt) {
    if (!this.sdk_judge()) return false;
    type = this.sdk_judge();
    if (type.ios == true) {
        var message = {'methodName': 'copyText', 'content': txt};
        window.webkit.messageHandlers.local_kingkr_obj.postMessage(message);
    } else {
        local_kingkr_obj.copyText(txt);
    }
},
}
export default bsl;