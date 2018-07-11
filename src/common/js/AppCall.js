/**
 * App 调用接口
 * @date 2014-12-22
 */

(function () {
    var ua = navigator.userAgent.toLowerCase();
    // 判断系统类型
    var isAndroid = ua.indexOf("android") !== -1 ? true : false;
    var isIOS = ua.indexOf("mac") !== -1 ? true : false;
    var isIPhone = ua.indexOf("iphone") !== -1 ? true : false;
    var isMyNewApp = (ua.indexOf('jscp/ios') > -1 ||
                      ua.indexOf('jscp/android') >-1 ||
                      ua.indexOf('lkcz/ios') >-1 ||
                      ua.indexOf('lkcz/android') >-1) ? true : false;

    // iOS支持的接口
    var iOSInterface = [];

    var AppCall = {
        call: function () {
            var arr = [].slice.call(arguments),
                name = arr.shift(),
                callback, data;

            // 提取回调函数
            if (arr[0] && typeof arr[arr.length - 1] === "function") {
                callback = arr.pop();
            } else {
                callback = function (response) { };
            }

            if (isAndroid) {

                if (this.has(name)) {
                    // AppCall.alert('getRequestSign');
                    data = NativeCall[name].apply(NativeCall, arr) || null;
                    // 执行回调函数
                    callback && callback(data);
                    return data;
                }
            }
            else if (isIOS) {
                // ios没有判断接口是否存在
                return this.callIOSHandler(name, arr, callback);
            }
            return false;
        },
        has: function (name) {
            if (isAndroid) {

                return window.NativeCall && NativeCall[name] ? true : false;

            }
            else if (isIOS && iOSInterface.join(",").indexOf(name) >= 0) {
                return true;
            }
            return false;
        },
        extend: function (obj) {
            for (var i in obj) {
                this[i] = obj[i];
            }
            return this;
        },

        callIOSHandler: function (name, params, callback1) {
            var i, obj = {};
            // 生成传参
            for (i = 0; i < params.length; i++) {
                obj['arg' + (i + 1)] = params[i];
            }

            // console.log(name);
            if(isIOS && isMyNewApp){
                setupWebViewJavascriptBridge(function(bridge) {

                    bridge.callHandler(name,obj,callback1);
                });

                //log('isIOS && window.WebViewJavascriptBridge');
                // WebViewJavascriptBridge.callHandler(name, obj, callback);
                return true;
            }else if (isIOS && window.WebViewJavascriptBridge) {
                //log('isIOS && window.WebViewJavascriptBridge');
                WebViewJavascriptBridge.callHandler(name, obj, callback1);
                return true;
            }
            return false;
        }
    };


    function init() {
        if(!isMyNewApp){
            if (isIOS) {
                AppCall.system = isIPhone ? "iPhone" : "iOS";
                // 如果是ios，初始化Bridge
                // @from  https://github.com/marcuswestin/WebViewJavascriptBridge
                if (!window.WebViewJavascriptBridge) {
                    document.addEventListener('WebViewJavascriptBridgeReady', function () {
                        //callback(WebViewJavascriptBridge)
                        //alert('WebViewJavascriptBridgeReady');
                        // 初始化下
                        WebViewJavascriptBridge.init(function (message, responseCallback) {
                            responseCallback();
                        });

                        AppCall.callIOSHandler("getInterface", [], function (data) {
                            // 获取iOS支持的接口
                            iOSInterface = JSON.parse(data);
                        });
                    }, false);
                }else {
                    callback(WebViewJavascriptBridge);
                }
            }
            else if (isAndroid) {
                AppCall.system = "Android";
            }

        }else{
            if (isIOS) {
                AppCall.system = isIPhone ? "iPhone" : "iOS";
                // 如果是ios，初始化Bridge
                // @from  https://github.com/marcuswestin/WebViewJavascriptBridge

                window.setupWebViewJavascriptBridge = function(callback) {
                    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
                    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
                    window.WVJBCallbacks = [callback];
                    var WVJBIframe = document.createElement('iframe');
                    WVJBIframe.style.display = 'none';
                    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                    document.documentElement.appendChild(WVJBIframe);
                    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
                }

                AppCall.callIOSHandler("getInterface", [], function (data) {
                    // 获取iOS支持的接口
                    iOSInterface = JSON.parse(data);
                    // AppCall.alert(JSON.parse(data));
                });
            }
            else if (isAndroid) {
                AppCall.system = "Android";
            }
        }
    }
    init();

    window.AppCall = AppCall;
})();

// 信息接口
AppCall.extend({
    // 获取个人参数
    getUserData: function (callback) {
        return this.call("getUserData", callback);
    },
    // 获取app参数
    getProductData: function (callback) {
        return this.call("getProductData", callback);
    },
    // 获取所有信息（个人和app）
    getAppData: function (callBack) {
        var params = {};
        AppCall.getProductData(function (data) {

            data = JSON.parse(data);
            // AppCall.alert('getProductData loaded');
            params.cmdId = data.cmdId;
            params.cmdName = data.cmdName;

            params.uuid = data.deviceId || data.appVersion;
            params.platformCode = data.platformCode;
            params.platformVersion = data.platformVersion;
            params.appVersion = data.appVersion;
            AppCall.getUserData(function (data) {
                //log('name=getUserData' + data);
                data = JSON.parse(data);
                // AppCall.alert('getUserData loaded');
                params.UserID = data.userId;
                params.usertype = data.userType;
                params.token = data.userToken;
                params.username = data.userName;
                params.islogin = false;
                if (!!params.UserID)
                    params.islogin = true;
                if (callBack && typeof callBack === "function") {
                    callBack(params);
                }
            });
        });
    },
    //行为调起
    navigate: function (action) {
        return this.call("navigate", JSON.stringify(action));
    },
    //登录调起
    gameLogin: function () {
        return this.call("gameLogin");
    },
    //充值调起
    gameRecharge: function (params) {
        return this.call("gameRecharge", JSON.stringify(params));
    },

    //充值返回
    gameBack: function (callback) {
        return this.call("gameBack", callback);
    },
    //
    openUrl: function (callback) {
        return this.call("openUrl", callback);
    },
    openAndroidUrl: function (params) {
        return this.call("openAndroidUrl", JSON.stringify(params));
    },
    closeLoaderWindows: function () {
        return this.call("closeLoaderWindows");
    },
    backHome: function() {
        return this.call("backHome");
    },
    jumpHome: function(callback) {
        return this.call("jumpHome", callback);
    },
    clickEvent : function (callback) {
        return this.call("clickEvent",callback);
    },
    downloadApk: function (callback) {
        return this.call("downloadApk",callback);
    },
});

export default AppCall;
