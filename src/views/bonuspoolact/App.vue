<template>
    <div id="app" :class="{aoke:curChannel==100006&&isHasIframe}">
        <!--回到顶部-->
        <div class="rule" @click="showrule">规则</div>
        <!--返回按钮-->
        <div class="back" @click="back"></div>
        <!--第一屏-->
        <div class="section1" id="section1" :class="{noopen:detailData&&!detailData.activityIsOpen}">
            <div class="time" v-if="detailData">活动时间：{{getDateInfo(detailData.activityBeginDate)}}-{{getDateInfo(detailData.activityEndDate)}}</div>
            <div class="bonus">
                <img :src="detailData.activityImage|filter" alt="" v-if="detailData">
            </div>
            <template v-if="detailData">
                <!--活动未开启-->
                <div class="btn" v-if="!detailData.activityIsOpen">{{countdown.time}}后准时开启</div>
                <!--活动开启-->
                <template v-else>
                    <!--未报名-->
                    <div class="btn" :class="{finger:showfinger}" v-if="detailData.userState==1" @click="appointmentBonus">立即报名瓜分奖池</div>
                    <!--已报名未瓜分-->
                    <div class="btn" v-if="detailData.userState==2">{{countdown.time}}开启奖池</div>
                    <!--开始瓜分-->
                    <div class="btn" @click="divideBonus" v-if="detailData.userState==3">立即瓜分奖池{{countdown.time}}</div>
                </template>
            </template>
            <div class="tip" v-if="switches.tzo!=null">
                <span class="label" :class="{open:switches.tzo}">{{switches.tzo?'开':'关'}}</span><switches v-model="switches.tzo" class="notice-sw" theme="bulma" color="default" type-bold="true"></switches>
                <div class="txt">奖池开启提醒</div>
            </div>
            <div class="info" v-if="detailData&&detailData.activityIsOpen">已有{{detailData.activityApplyCount}}人参与瓜分</div>
        </div>
        <!--瓜分记录-->
        <div class="section2" id="section2" v-if="bonusListData.length">
            <div class="container">
                <!--红包记录-->
                <bonus-record :data="bonusListData"></bonus-record>
            </div>
        </div>
        <!--攻略-->
        <div class="section3" id="section3" :class="{norecord:!showTask}">
            <div class="container"></div>
        </div>
        <!--更多游戏活动-->
        <div class="section6" id="section6" v-if="showTask">
            <div class="package">
                <div class="item" v-for="(item,index) in packageData" @click="gotopay(item)">
                    <img src="./images/bonus/gift1.png" alt="" class="pic" v-if="index==0">
                    <img src="./images/bonus/gift2.png" alt="" class="pic" v-if="index==1">
                    <img src="./images/bonus/gift3.png" alt="" class="pic" v-if="index==2">
                    <div class="text">
                        <span>{{item.content.split('+')[0]}}</span>
                        <span v-if="item.content.split('+')[1]">+{{item.content.split('+')[1]}}</span>
                    </div>
                    <div class="package_btn">¥{{item.price}}</div>
                </div>
                <div class="btn" @click="morepackage">更多礼包推荐</div>
            </div>
        </div>
        <!--以下都是弹窗-->
        <!--规则-->
        <bonus-success v-if="showrulepop" :count="0"
                       @close="showrulepop=false" :dataStr="detailData&&(detailData.activityBeginDate+'-'+detailData.activityEndDate)||''"></bonus-success>
        <!--绑定手机号-->
        <bonus-success v-if="isOpen" :count="1"
                       @close="isOpen=false" @closemobile="closemobile" @refresh="myDetails"></bonus-success>
        <!--开启红包弹窗-->
        <bonus-opened v-if="isshowBonusOpened" :awards="awards" @closePop="closeBonusRes"></bonus-opened>
    </div>
</template>
<script>
    import '../../common/js/window.js';
    import bonusSuccess from './components/bonusSuccess'
    import bonusOpened from './components/bonusOpened'
    import bonusRecord from './components/bonusRecord'
    import common from "../../common/js/utils";
    import Switches from 'vue-switches';
    export default {
        data() {
            return {
                curChannel: null,
                curToken: null,
                countdown: {//红包榜外显倒计时，最后一天显示
                    time: ''
                },
                showrulepop:false,
                switches: {
                    tzo:null
                },
                isOpen:false,
                showmobilepop:false,
                candivide:true,
                isshowBonusOpened: false,//是否显示开启红包弹窗
                packageData:[],//礼包数据
                bonusListData:[],//瓜分记录
                detailData:null,//活动信息
                awards:null,//瓜分奖品
                showfinger:false,
            }
        },
        async mounted() {
            this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
            this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
            await this. myDetails()
            document.querySelectorAll('#app .vue-switcher div')[0].style.backgroundColor='rgba(255,255,255,0.4)'
            document.querySelectorAll('#app .vue-switcher div')[0].style.width='100%'
            document.querySelectorAll('#app .vue-switcher div')[0].style.top=0
            document.querySelectorAll('#app .vue-switcher div')[0].style.left=0
            // document.querySelectorAll('#app .vue-switcher div')[0].style.transform='scale(1.5)'
            await GLOBALS.marchSetsPoint('A_H5PT0074001374')//H5平台-奖池瓜分页面加载
            this.bonusListClick()
            this.getPackage()
        },
        computed: {
            countdownText() {//倒计时文案 红包榜外显倒计时，最后一天显示
                if (this.countdown.time) {
                    let hourText = this.countdown.time.split(':')[0]
                    let days = Math.floor(hourText / 24)
                    if (days == 0) {
                        return this.countdown.time
                    } else {
                        return ''
                    }
                } else {
                    return ''
                }
            },
            showTask(){
                return true
            },
            isHasIframe(){
                return window!=window.top
            }
        },
        methods: {
            getDateInfo(date){
               let dateObj=new Date(date);
               let month=dateObj.getMonth()+1;
               let day=dateObj.getDate();
               return `${month}月${day}日`
            },
            showrule(){
                this.showrulepop=true
            },
            //获取地址栏问号后面的参数值
            getUrlParam: function (ename) {
                // var url = document.referrer;
                var url = window.location.href;
                var Request = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.split('?')[1];
                    var strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                    }
                } else {
                    return '';
                }
                return Request[ename];
            },
            back() {
                top.location.href=window.linkUrl.getBackUrl(this.curChannel)
            },//回到首页
            getComputedStyle(ele, attr) {
                return window.getComputedStyle(ele, null)[attr]
            },
            fetch(url, params) {
                if (url.startsWith('/ops/api')) {
                    url = '//ops-api.beeplay123.com' + url
                }
                if (url.startsWith('/wap/api')) {
                    url = '//platform-api.beeplay123.com' + url
                }
                if (url.startsWith('/wap/api')) {
                    url = '//shop-api.beeplay123.com' + url
                }
                return this.axios.post(url, params, {})
            },//请求封装方法
            async bonusListClick() {
                try {
                    const res = await this.fetch('/ops/api/jackpot/getWinningRecord', {
                        page: 1,
                        pageSize: 500
                    })
                    if (res.data.code == 200 && res.data.data) {
                        this.bonusListData = res.data.data||[]
                    }
                } catch (e) {

                }
            },
            async myDetails() {
                try {
                    const res = await this.fetch('/ops/api/jackpot/getActivityInfo')
                    if (res.data.code == 200 && res.data.data) {
                        this.detailData = res.data.data;
                        this.showfinger=res.data.data.status==1
                        this.switches= {
                            tzo:this.detailData.userIsOpenSms
                        }
                        !this.countdown.time && this.detailData.activityCountdown && GLOBALS.remainingTime(
                            this,
                            this.detailData.activityCountdown,
                            this.countdown
                        );
                    }
                } catch (e) {

                }
            },//获取myDetails数据
            async openBonus() {//点击开启红包
                if (this.detailData && this.detailData.availableAmount) {
                    this.burryPoint('1207003025', '春节红包-开红包')
                    try {
                        const res = await this.fetch('/ops/api/springFestival/redEnvelope/open')
                        if (res.data.code == 200 && res.data.data) {
                            this.bonusOpenedData = res.data.data;
                            this.bonusOpenedData.num = this.detailData && this.detailData.availableAmount || 0
                            this.isshowBonusOpened = true
                            this.myDetails();
                        }
                    } catch (e) {

                    }
                } else {
                    this.$nextTick(() => {
                        this.getAnchor('section2')
                    })
                }
            },
            //礼包
            async getPackage() {//获取礼包数据
                try {
                    const {data:data} = await this.axios.post('https://shop-api.beeplay123.com/shop/api/mall/leaguePacksList')
                    if (data.code == 200) {
                        this.packageData =data.data.leaguePacksList||[]
                        console.log('this.packageData',data.data.leaguePacksList.length)
                    }
                } catch (e) {

                }
            },
            gotopay(val) {
                GLOBALS.marchSetsPoint('A_H5PT0074001379',{product_id:val.bizId})
                localStorage.setItem('JDD_PARAM', JSON.stringify(val))
                if (window.linkUrl.getBackUrlFlag(this.curChannel)=='bdWap'&&this.curChannel!='100001') {//好看、全民小视频
                    top.location.href = 'https://wap.beeplay123.com/payment/#/bdPayment';
                } else {
                    top.location.href = 'https://wap.beeplay123.com/payment/#/payment';
                }
            },
            morepackage(){
                top.location.href = window.linkUrl.getBackUrl(this.curChannel,'',false,true,'&from=treasureCeremony')
            },
            async divideBonus(){//开始瓜分
                GLOBALS.marchSetsPoint('A_H5PT0074001376')
                let {data:data}=await this.fetch('/ops/api/jackpot/divideUp')
                if(data.code==200){
                    this.awards=data.data//瓜分奖品
                    this.isshowBonusOpened=true
                    this.myDetails()
                }else{
                    if(data.code!=101){
                        this.$toast.show({
                            message:data.message,
                            duration:2000
                        })
                    }
                }
            },
            async appointmentBonus(){//报名
                this.showfinger=false
                GLOBALS.marchSetsPoint('A_H5PT0074001375')
                let {data:data}=await this.fetch('/ops/api/jackpot/userApply')
                if(data.code==200){
                    this.$toast.show({
                        message:'报名成功',
                        duration:2000
                    })
                    this.myDetails()
                }else{
                    this.$toast.show({
                        message:data.message,
                        duration:2000
                    })
                }
            },
            closeBonusRes(){
                this.isshowBonusOpened=false
            },
            closemobile(){
                this.switches.tzo=false
                this.isOpen=false
            }
        },
        components: {
            bonusSuccess, bonusOpened, bonusRecord,Switches
        },
        watch:{
            "switches.tzo":function(open,o){
                //n代表0开启1关闭,盈利榜奖励到账通知
                if(o === null) return
                if(open){
                    GLOBALS.marchSetsPoint('A_H5PT0074001377')//H5平台-奖池瓜分页面-开启消息提醒
                    if(!this.detailData.userIsBindPhone){
                        this.isOpen=true
                    }else{
                        this.fetch('/ops/api/jackpot/userOpenSms')
                    }
                }else{
                    GLOBALS.marchSetsPoint('A_H5PT0074001378')//H5平台-奖池瓜分页面-关闭消息提醒
                    this.fetch('/ops/api/jackpot/userCloseSms')//用户关闭短信提醒
                }
            },
            "countdown.time":function (val) {
                if(!val){
                    this.myDetails()
                }
            }
        },
    }

</script>
<style lang="less" scoped>
    @import '../../common/css/base.css';
    #app{
        max-height: 2.383rem;
        background: #3359F3;
    }
    .aoke{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        overflow-y: scroll;
    }
    .rule {
        font-size:.24rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
        position: fixed;
        top: .18rem;
        right: .13rem;
        width: 1.08rem;
        height: .44rem;
        line-height:.44rem;
        background:rgba(47,68,235,0.38);
        border-radius:.22rem;
        z-index: 10;
    }
    .back {
        position: fixed;
        top: .18rem;
        left: .23rem;
        width: .44rem;
        height: .44rem;
        background: url("./images/bonus/backhome.png");
        background-size: 100% 100%;
        z-index: 10;
    }
    .section1 {
        position: relative;
        width: 7.2rem;
        height: 10.81rem;
        background: url("./images/bonus/section1_bg.png");
        background-size: 100% 100%;
        &.noopen{
            background: url("./images/bonus/section0_bg.png");
            background-size: 100% 100%;
        }
        .time{
            position: absolute;
            top: 2.3rem;
            left: 2.15rem;
            font-size: .22rem;
            color: #fff;
        }
        .bonus{
            position: absolute;
            top:3.11rem;
            left: 2.1rem;
            width: 2.09rem;
            height: 2.73rem;
            img{
                position: absolute;
                bottom: -.5rem;
                width: 2.8rem;
                height: 3.45rem;
            }
        }
        .btn{
            position: absolute;
            top:7.07rem;
            left: 1.62rem;
            width: 3.91rem;
            height: 1.41rem;
            padding-top: .25rem;
            text-align: center;
            font-size:.28rem;
            font-weight:bold;
            color:rgba(182,89,29,1);
            box-sizing: border-box;
            background: url("./images/bonus/btn1.png");
            background-size: 100% 100%;
            &.finger{
                -webkit-animation: ychange 3s infinite;
                &:before{
                    content: '';
                    position: absolute;
                    left: 2.9rem;
                    bottom: .6rem;
                    width: 1.11rem;
                    height: .9rem;
                    background: url("./images/bonus/finger.png");
                    background-size: 100% 100%;
                    -webkit-animation: myPlay1 3s infinite;
                }
            }
        }
        .info{
            position: absolute;
            bottom: 1.35rem;
            left: 1.3rem;
            right: 1.3rem;
            font-size: .3rem;
            font-weight: 400;
            color: #6ae3fd;
            text-align: center;
        }
        .tip{
            position: absolute;
            top:5.4rem;
            left: .2rem;
            display: flex;
            flex-direction: column;
            .label{
                position: absolute;
                top: 4px;
                right: .29rem;
                z-index: 1;
                font-size: 16px;
                font-weight: 400;
                color: #0a1354;
                &.open{
                    left: .2rem;
                }
            }
            .txt{
                margin-top: .2rem;
                font-size:.18rem;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
    }

    .section2 {
        position: relative;
        padding: 0 .42rem .27rem .4rem;
        top: -.99rem;
        z-index: 1;
        background: #3359F3;
        box-sizing: border-box;
        .container{
            width: 6.38rem;
            height: 5.27rem;
            background: url("./images/bonus/record.png");
            background-size: 100% 100%;
        }
    }
    .section3 {
        position: relative;
        padding: 0 .42rem .27rem .4rem;
        top:-1.01rem;
        z-index: 1;
        background: #3359F3;
        box-sizing: border-box;
        .container{
            width: 6.38rem;
            height: 2.53rem;
            background: url("./images/bonus/gonglue.png");
            background-size: 100% 100%;
        }
    }
    .section6 {
        position: relative;
        padding: 0 .42rem .41rem .4rem;
        top:-1.02rem;
        width: 7.2rem;
        background: #3359F3;
        z-index: 1;
        box-sizing: border-box;
        .package {
            width: 6.38rem;
            height: 5.27rem;
            background: url("./images/bonus/bonusplus.png");
            background-size: 100% 100%;
            display: flex;
            justify-content: space-between;
            padding: 1.13rem .28rem 0 .23rem;
            box-sizing: border-box;
            position: relative;
            .item {
                width: 1.8rem;
                height: 2.48rem;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                background:rgba(51,89,243,1);
                border-radius:.1rem;
                position: relative;
                .pic{
                    position: absolute;
                    top:.14rem;
                    width: 1.04rem;
                    height: 1.15rem;
                }
                .text{
                    position: absolute;
                    top:1.33rem;
                    bottom: .68rem;
                    font-size:.2rem;
                    font-weight:400;
                    color:rgba(255,255,255,1);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                }
                .package_btn{
                    position: absolute;
                    left: .44rem;
                    bottom: .17rem;
                    width:.96rem;
                    height:.39rem;
                    line-height:.39rem;
                    text-align: center;
                    background:rgba(87,181,255,1);
                    border-radius:.2rem;
                    font-size:.24rem;
                    font-weight:bold;
                    color:rgba(236,244,255,1);
                }
                overflow: hidden;
            }
            .btn{
                width: 6.01rem;
                position: absolute;
                left: .18rem;
                bottom:.35rem;
                height: 1.16rem;
                line-height:1.16rem;
                font-size:.36rem;
                font-weight:bold;
                text-align: center;
                color:rgba(168,78,11,1);
                background: url("./images/bonus/btn2.png");
                background-size: 100% 100%;
            }
        }
    }
    @keyframes myPlay1 {
        0% {
            transform: rotate(45deg);
        }
        100% {
            transform: rotate(0deg);
        }
    }

    @-webkit-keyframes ychange {
        0% {
            background: url("./images/bonus/btn1.png");
            background-size: 100% 100%;
        }
        100% {
            background: url("./images/bonus/btn1_press.png");
            background-size: 100% 100%;
        }
    }

</style>
