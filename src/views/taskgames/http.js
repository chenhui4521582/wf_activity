/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'

// import router from './router'
import Vue from 'vue'
import utils from '../../common/js/utils'
import '../../common/js/window'
// axios 配置
axios.defaults.timeout = 10000;



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if(!config.headers.Authorization) {
        config.headers.Authorization = localStorage.getItem('ACCESS_TOKEN');
    }
    
    if(!config.headers['App-Channel']) {
        config.headers['App-Channel'] = localStorage.getItem('APP_CHANNEL');
    }
    

    localStorage.setItem('APP_VERSION','2.9.4.1')
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


axios.interceptors.response.use(
    response => {
        var res = JSON.parse(response.request.response);
        if(res && res.code && res.code != 200) {
            switch (res.code) {
                case 400:
                    Vue.prototype.$toast.show({
                        message: '请求处理失败',
                        duration: 1500
                    });
                    break;
                case 401:
                    Vue.prototype.$toast.show({
                        message: '未授权，请登录！',
                        duration: 1500
                    });
                    break;
                case 404:
                    Vue.prototype.$toast.show({
                        message: '请求地址出错！',
                        duration: 1500
                    });
                    break;
                 case 408:
                    Vue.prototype.$toast.show({
                        message: '请求超时',
                        duration: 1500
                    });
                    break;
                case 500:
                    Vue.prototype.$toast.show({
                        message: '服务器内部错误',
                        duration: 1500
                    });
                    break;

                case 501:
                    Vue.prototype.$toast.show({
                        message: '服务未实现',
                        duration: 1500
                    });
                    break;

                case 502:
                    Vue.prototype.$toast.show({
                        message: '网关错误',
                        duration: 1500
                    });
                    break;

                case 503:
                    Vue.prototype.$toast.show({
                        message: '服务不可用',
                        duration: 1500
                    });
                    break;

                case 504:
                    Vue.prototype.$toast.show({
                        message: '网关超时',
                        duration: 1500
                    });
                    break;
                case 122,128:
                    break;
                default:
                    var  result = response.config && response.config.data;
                     if(result) {
                        result = JSON.parse(result);
                        if(result && result.isShowToast == 'false') {
                            break;
                        }
                     }
                     Vue.prototype.$toast.show({
                        message: res.message,
                        duration: 1500
                    });
            }

        }
        return response;
    },
    error => {
        // let aa = `timeout of ${axios.defaults.timeout}ms exceeded`;
        // error = JSON.stringify(error);

        // console.log(error.response.status)
        if(error && error.response) {

        }else {
            error = JSON.stringify(error);
            if(error.indexOf('timeout') != -1) {
                
                return;
            }
        }
        return Promise.reject(error);
    }
)
export default axios;
