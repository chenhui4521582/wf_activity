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

export default AppCall