<template>
    <div id="app">
       <div class="bg">
           <div class="bg-top">
               <img src="./images/bg_top.png" alt="">
                <div class="title">多&nbsp;&nbsp;&nbsp;多&nbsp;&nbsp;&nbsp;玩&nbsp;&nbsp;&nbsp;发
                    &nbsp;&nbsp;&nbsp;现&nbsp;&nbsp;&nbsp;更&nbsp;&nbsp;&nbsp;多
                    &nbsp;&nbsp;&nbsp;惊&nbsp;&nbsp;&nbsp;喜</div>
                <div class="tips">下载体验<i>多多玩APP</i>即可参与抽奖</div>
                <!-- <div class="time">活动时间：2018/7/19-2018/7/25</div> -->
           </div>
           <div class="bg-bottom">
               <img src="./images/bg_bottom.png" alt="">
               <div class="awards">
                    <p class="desc">部分奖品展示</p>
                    <div>
                        <p>
                            <span><img src="./images/icon_jdcard.png"></span><br>
                            京东卡x500元
                        </p>
                        <p>
                            <span><img src="./images/icon_fee.png"></span><br>
                            话费x300元
                        </p>
                        <p>
                            <span><img src="./images/icon_leafes.png"></span><br>
                            金叶子x5万
                        </p>
                    </div>
                </div>
           </div>

           <div class="btn-download" @click="goDownload">立即下载</div>
       </div>
    </div>
</template>

<script>
import utils from '../../common/js/utils.js'
import AppCall from '../../common/js/AppCall.js';
import API from '../../api';
export default {
    name : 'app',
    data(){
        return{
            isIOS : false,
        }
    },
    beforeMount(){
        let ua = navigator.userAgent;
        this.isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    },
    methods:{
        getAndroidAPK(href){
            $.ajax({
                type:'get',
                url : '//wap.beeplaying.com/games/download.json',
                dataType : 'json',
                success : (data) => {
                    if(href == 'inapp'){
                        AppCall.downloadApk(data.android)
                    }else{
                        location.href = data.android
                    }
                }
            })
            // this.axios.get('https://wap.beeplaying.com/games/download.json').then(res => {
            //     this.androidAPK = res.android
            // })
        },
        goDownload(){
            if(utils.getUrlParam('from') == 'msg'){
                GLOBALS.buriedPoint(4001000201,'手机短信-下载');//事件ID 事件名称 游戏ID 游戏位置
                if(this.isIOS){
                    location.href = 'https://itunes.apple.com/cn/app/id1320447707?mt=8'
                }else{
                    this.getAndroidAPK()
                    // location.href = 'http://wap.beeplaying.com/m/apk/duoduowan_100030_1.0.1.apk'
                }
            }else{
                GLOBALS.buriedPoint(4001000101,'微竞猜-引流页面-立即下载');//事件ID 事件名称 游戏ID 游戏位置
                if(this.isIOS){
                    var _obj = {
                        prepay_url: 'https://itunes.apple.com/cn/app/id1320447707?mt=8',
                        orderNum: ''
                    }
                    AppCall.jumpOutAppMethod({'prepayurl': _obj, 'currenturl': location.href})
                }else{
                    this.getAndroidAPK('inapp')

                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../common/css/base.css';
.bg{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.bg-top{
    position: absolute;
    width: 100%;
    height: 60%;
    img{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .title{
        position: absolute;
        top: 10%;
        width: 100%;
        text-align: center;
        font-size: .24rem;
        color: #F21B35;
    }
    .tips{
        position: absolute;
        top: 33%;
        left: 50%;
        transform: translateX(-50%);
        width: 72%;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        background: rgba(255,255,255,.9);
        border-radius: .3rem;
        border: .01rem solid #f26704;
        font-size: .32rem;
        color: #841B13;
        i{
            color: #F52C2C;
        }
    }
    .time{
        position: absolute;
        bottom: .1rem;
        left: 50%;
        width: 50%;
        height: .44rem;
        line-height: .44rem;
        text-align: center;
        background: url(./images/desc_bg.png) no-repeat;
        background-size: 100% 100%;
        transform: translateX(-50%);
        font-size: .22rem;
        color: #fff;
    }
}
.bg-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40%;
    img{
        width: 100%;
        height: 100%;
    }
}
.btn-download{
    position: absolute;
    bottom: .76rem;
    left: 50%;
    transform: translateX(-50%);
    width: 3.43rem;
    height: .93rem;
    line-height: .93rem;
    font-size: .36rem;
    text-align: center;
    color: #fff;
    background: #FE3344;
    border-radius: .47rem;
}
.awards{
    position: absolute;
    top: .4rem;
    width: 100%;
    padding: 0 .5rem;
    text-align: center;
    box-sizing: border-box;
    .desc{
        font-size: .28rem;
        color: #831610;
        &:before{
            content: '';
            display: inline-block;
            margin-right: .08rem;
            width: .98rem;
            height: .03rem;
            vertical-align: middle;
            background: url(./images/line.png) no-repeat;
            background-size: 100% 100%;
        }
        &:after{
            content: '';
            display: inline-block;
            margin-left: .08rem;
            transform: rotate(180deg);
            width: .98rem;
            height: .02rem;
            vertical-align: middle;
            background: url(./images/line.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    div{
        display: flex;
        p{
            flex: 1;
            font-size: .22rem;
            color: #F5A05C;
            span{
                display: inline-block;
                margin: .2rem 0;
                width: 1.42rem;
                height: 1.42rem;
                background: #F5A05C;
                border-radius: 50%;
                img{
                    margin-top: .25rem;
                    width: 1.01rem;
                    height: .71rem;
                }
            }
        }
    }
}
@media (max-width:350px){
    .time{width: 55% !important;}
    .tips{width: 80% !important}
    .btn-download{
        bottom: .1rem;
    }
}
</style>
