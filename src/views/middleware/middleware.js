import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import shareMiddleware from './http'
shareMiddleware.init()
Vue.config.productionTip = false
new Vue({
    render: r => r(App)
}).$mount('#app')
