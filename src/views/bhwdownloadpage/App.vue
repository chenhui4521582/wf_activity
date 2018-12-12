<template>
    <div id="app">
        <div class="btn" @click="download">立即安装</div>
    </div>
</template>

<script>
    import utils from '../../common/js/utils.js'
    import AppCall from '../../common/js/AppCall.js';
    import API from '../../api';
    export default {
        name: 'app',
        methods: {
            download(){
                var u = navigator.userAgent;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
                var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if(isAndroid){
                   window.location.href='https://wap.beeplay123.com/m/baohaowan/app-baohaowan-release.apk'
                }else{
                    window.location.href='itms-services:///?action=download-manifest&url=https://wap.beeplay123.com/m/baohaowan/bhw.plist'
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/css/base.css';

    #app {
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
        background: url('./images/bg.png') no-repeat;
        background-size: 100% 100%;
        .btn{
            position: absolute;
            top: 10.99rem;
            left: .69rem;
            width:5.78rem;
            height:.8rem;
            background: url('./images/bottom_btn.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            line-height: .8rem;
            font-size:.36rem;
            font-weight:bold;
            color:rgba(53,53,53,1);
        }
    }
</style>
