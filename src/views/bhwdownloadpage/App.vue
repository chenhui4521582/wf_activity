<template>
    <div id="app">
        <div  v-show="isWx">
            <img src="./images/fc-bg.png" class="fc-bg">
            <p class="title">点击右上角，选择浏览器查看<img src="./images/arrow.png" class="arrow"></p>
            
        </div>
        <div class="bj-bg"  v-show="isWx"></div>
        <div class="btn" @click="download">立即安装</div>
    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import AppCall from '../../common/js/AppCall.js';
    import API from '../../api';
    export default {
        name: 'app',
        data() {
            return {
                isWx: false
            }
        },
        methods: {
            download(){
                GLOBALS.buriedPoint(1207002404,'H5平台-下载引导页加载-立即安装');
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                   window.location.href='https://wap.beeplaying.com/m/baohaowan/app-baohaowan-release.apk'
                }else{
                    window.location.href='itms-services:///?action=download-manifest&url=https://wap.beeplaying.com/m/baohaowan/bhw.plist'
                    setTimeout(()=> {
                        location.href = 'https://wap.beeplaying.com/bhwGuide/guide.html?channel='+GLOBALS.getUrlParam('channel')
                    }, 3000)
                }
            },
            isWeixn() {
                var ua = navigator.userAgent.toLowerCase();
                if(ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        mounted(){
            
            if(this.isWeixn()) {
                this.isWx = true;
                GLOBALS.buriedPoint(1207002403,'H5平台-下载引导页加载');
            }else{
                GLOBALS.buriedPoint(1207002409,'H5平台-下载页加载');
            }
            
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';
    .wx-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 10;
    }
    .title {
        font-size: 0.3rem;
        color: #000;
        position: relative;
        top: 0.5rem;
        z-index: 10;
        text-align: center;
        text-indent: -1.2rem;
    }
    .bj-bg {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        background: #000;
        opacity: 0.5;
        z-index: 1;
    }
    .fc-bg {
        width: 100%;
        height: 1.88rem;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
    }
    .arrow {
           width: 1.0rem;
        height: 0.6rem;
        position: absolute;
        right: 0.35rem;
        top: -0.26rem;
        z-index: 11;
    }
    #app {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        background: url('images/bg.png') no-repeat;
        background-size: 100% 100%;
        .btn{
            position: absolute;
            bottom:1.01rem ;
            left: .69rem;
            width:5.78rem;
            height:.8rem;
            background: url('images/bottom_btn.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: .8rem;
            font-size:.36rem;
            font-weight:bold;
            color:rgba(53,53,53,1);
        }
    }
</style>
