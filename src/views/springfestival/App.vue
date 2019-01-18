<template>
    <div id="app">
        <div class="section0" @click="bonusRecordClick">
            <div class="left">
            </div>
            <div class="right">
                <div class="item">
                    <div class="r-item1">拥有红包</div>
                    <div class="r-item2">{{detailData&&detailData.totalAmount}}个</div>
                </div>
                <div class="item">
                    <div class="r-item1">待开启红包</div>
                    <div class="r-item2">{{detailData&&detailData.availableAmount}}个</div>
                </div>
                <div class="item">
                    <div class="r-item1">下级奖励</div>
                    <div class="r-item2">{{detailData&&detailData.nextAwardName||''}}</div>
                </div>
            </div>
        </div>
        <!--红包榜-->
        <div class="bonusrecord" @click.stop="bonusListClick">
            <div class="count_time" v-if="countdownText">{{countdownText}}</div>
        </div>
        <!--回到顶部-->
        <div class="backTop" v-if="isShowTopIcon" v-anchor="'section1'"></div>
        <!--第一屏-->
        <div class="section1" id="section1">
            <!--返回按钮-->
            <div class="back" @click="back"></div>
            <div class="openbonus" :class="{opened:!detailData||!detailData.availableAmount}" @click="openBonus"></div>
            <div class="text" v-if="detailData&&detailData.availableAmount">待开启 <br>{{detailData&&detailData.availableAmount}}个红包
            </div>
            <div class="c-horn">
                <div ref="hornDiv" class="c-horn-text">
                    <ul ref="hornUl">
                        <li v-for="(item,index) in noticeList" ref="hornLi">
                            <span v-html="item" style="white-space:normal;line-height: .25rem"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--任务-->
        <div class="section2" id="section2" :class="{showHand:isshowHand,share:curChannel==100039}">
            <div class="gainbonusbtn" @click="gainbonus"></div>
            <ul>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/signicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">春节好运到 送你大红包</div>
                        <div class="item_item_item">登录成功即领1个红包</div>
                    </div>
                    <div class="item_item">今日已领取</div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/gameicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">玩游戏 得红包</div>
                        <div class="item_item_item">金叶话费京东卡 海量奖励不设限</div>
                    </div>
                    <!--<div class="item_item">今日已完成</div>-->
                    <div class="item_item unfinished" @click="back('taskview')">去完成</div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/chargeicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">加赠红包 超值回馈</div>
                        <div class="item_item_item">1696个红包等你来领</div>
                    </div>
                    <!--<div class="item_item">今日已领取</div>-->
                    <div class="item_item unfinished" :class="{baidu:curChannel==100039}"
                         style="display: flex;flex-direction: column;text-align: center">
                        <div class="item_item_item" v-anchor="'section3'">去领红包</div>
                        <div class="text" style="font-size: .18rem;color:rgba(240,150,118,1);font-weight:500;">您有红包待领取
                        </div>
                    </div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/luckicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">开福袋 领红包</div>
                        <div class="item_item_item">春节特惠，冲榜必备</div>
                    </div>
                    <!--<div class="item_item">今日已领取</div>-->
                    <div class="item_item unfinished" v-anchor="'section4'">去领红包</div>
                </li>
                <li class="item" v-if="curChannel==100039">
                    <div class="item_item">
                        <img src="./images/askicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">邀好友 得红包</div>
                        <div class="item_item_item">邀请成功，免费拿红包</div>
                    </div>
                    <!--<div class="item_item">今日已分享</div>-->
                    <div class="item_item unfinished" @click="share">去分享</div>
                </li>
            </ul>
        </div>
        <!--加赠红包-->
        <div class="section3" id="section3">
            <div class="sec1"></div>
            <div class="sec2">
                <div class="item"><i>领下级红包还需消费</i>10元</div>
                <div class="item"><i>获得加赠红包个数</i>1个</div>
            </div>
        </div>
        <!--礼包开福-->
        <div class="section4" id="section4">
            <div class="package">
                <div class="item" v-for="item in packageData" :class="{item188:item.price==188,item1888:item.price==1888}" @click="gotopay(item)">

                </div>
            </div>
        </div>
        <!--规则-->
        <div class="section5" :class="{fold:isFoldRule,expand:!isFoldRule}" id="section5">
            <div class="title" @click="ruleClick">活动说明
                <div :class="{fold:isFoldRule,expand:!isFoldRule}"></div>
            </div>
            <div class="content" v-if="!isFoldRule">
                <p> 1. 活动时间：1月25日至2月20日；
                </p>
                <P>红包榜单结算时间：2月20日18点整。</P>
                <p> 2. 红包获取途径：
                </p>
                <P>每日登录游戏中心免费领1个红包；
                </P>
                <P> 首次分享成功立得1个红包，之后每成功邀请1个好友玩游戏即可再
                    得1个红包（每天最多可获得8个红包）；
                </P>
                <P>完成每日任务可领红包；
                </P>
                <P>活动期间累积消费达到条件，可获得红包，也可参与红包礼包活动，
                    冲击榜单。</P>
                <p> 3. 奖励发放：
                </p>
                <P> 榜单结算后，对应奖励在3个工作日内发放。</P>
                <p> 4. 注意事项：
                </p>
                <P> 游戏里发放的红包不计入此活动；榜单刷新可能延时；
                </P>
                <P> 榜单结算后，玩家仍可继续获得红包奖励，但所得红包不计入榜单
                    排名。</P>

                <p>活动期间，禁止作弊行为，游戏官方有权对违规行为进行处理，必
                    要时追究法律责任。如有任何疑问，可在游戏中心-- "我的" -- "帮助反馈"中联系客服，或致电400-873-5311。</p>
            </div>
        </div>
        <!--以下都是弹窗-->
        <!--加赠红包领取成功-->
        <bonus-success :show="isshowBonusSuccess" :count="jiazengbonusNumber"></bonus-success>
        <!--加赠红包点击去完成-->
        <bonus-failure :show="isshowBonusFailure"></bonus-failure>
        <!--红包记录-->
        <bonus-record :show="isshowBonusRecoed" :data="bonusRecordData" @close="isshowBonusRecoed=false"></bonus-record>
        <!--红包榜-->
        <bonus-list :show="isshowBonusList" :data="bonusListData" @close="isshowBonusList=false"></bonus-list>
        <!--开启红包弹窗-->
        <bonus-opened :show="isshowBonusOpened" :data="bonusOpenedData" @close="isshowBonusOpened=false"
                      @gainmore="getAnchor('section2')"></bonus-opened>
    </div>
</template>
<script>
    import '../../common/js/window.js';
    import bonusSuccess from './components/bonusSuccess'
    import bonusFailure from './components/bonusFailure'
    import bonusList from './components/bonusList'
    import bonusOpened from './components/bonusOpened'
    import bonusRecord from './components/bonusRecord'

    export default {
        data() {
            return {
                userInfo: null,
                curChannel: null,
                curToken: null,
                isFoldRule: true,//折叠规则默认折叠
                isShowTopIcon: false,//是否显示回到顶部图标
                isshowHand: true,//是否显示小手
                noticeList: [],//广播
                isshowBonusList: false,//是否显示红包榜弹窗
                isshowBonusRecoed: false,//是否显示红包记录弹窗
                isshowBonusSuccess: false,//是否显示加赠红包获得弹窗
                isshowBonusFailure: false,//是否显示加赠红包点击去完成弹窗
                isshowBonusOpened: false,//是否显示开启红包弹窗
                bonusListData: null,//红包榜数据
                bonusRecordData: null,//红包记录数据
                bonusOpenedData: null,//红包开启数据
                detailData: null,//myDetail接口数据
                countdown: {//红包榜外显倒计时，最后一天显示
                    time: ''
                },
                packageData:[],//福袋开福礼包数据
                jiazengbonusNumber:0//加赠红包点击领取获得红包个数
            }
        },
        mounted() {
            this.burryPoint('1207003000','春节红包加载页',{poker_value:this.getUrlParam('source')})
            //4秒后隐藏小手
            setTimeout(() => {
                this.isshowHand = false
            }, 4000)
            this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
            this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
            this.myDetails()//myDetail接口数据
            this.getPackage()//福袋礼包数据
            window.onscroll = () => {
                // this.isShowTopIcon=(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop)>(window.innerHeight
                //     || document.documentElement.clientHeight
                //     || document.body.clientHeight)
                //超过一屏就显示回到顶部的图标
                this.isShowTopIcon = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) > 0
            }
        },
        computed: {
            backUrl() {
                return (this.getUrlParam('from') || '').toLowerCase();
            },
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
            }
        },
        methods: {
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
            getAnchor(name) {
                document.body.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
                !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76)
            },
            ruleClick() {
                this.isFoldRule = !this.isFoldRule
                this.$nextTick(() => {
                    this.getAnchor('section5')
                })
            },//点击规则按钮 展开折叠
            back(page) {
                if (this.backUrl) {
                    if (!page) {
                        this.burryPoint('1207003003','春节红包-回到平台')
                        switch (this.backUrl) {
                            case 'wap':
                                top.location.href = 'https://wap.beeplay123.com/wap/home?channel=' + this.curChannel;
                                break;
                            case 'jswap':
                                top.location.href = 'https://wap.beeplay123.com/jsWap?channel=' + this.curChannel;
                                break;
                            case 'bdwap':
                                top.location.href = 'https://wap.beeplay123.com/bdWap?channel=' + this.curChannel;
                                break;
                        }
                    } else {
                        this.burryPoint('1207003030','春节红包-玩游戏得红包(每日任务)')
                        switch (this.backUrl) {
                            case 'wap':
                                top.location.href = 'https://wap.beeplay123.com/wap/home?channel=' + this.curChannel + '#/' + page;
                                break;
                            case 'jswap':
                                top.location.href = 'https://wap.beeplay123.com/jsWap?channel=' + this.curChannel + '#/' + page;
                                break;
                            case 'bdwap':
                                top.location.href = 'https://wap.beeplay123.com/bdWap?channel=' + this.curChannel + '#/' + page;
                                break;
                        }
                    }
                }
            },//回到首页、平台任务页面逻辑
            gainbonus() {
                this.burryPoint('1207003002','春节红包-获取更多红包')
                this.isshowHand = false;
                this.$nextTick(() => {
                    this.getAnchor('section2')
                })
            },//页面“获取更多红包”按钮
            getComputedStyle(ele, attr) {
                return window.getComputedStyle(ele, null)[attr]
            },
            getNoticeList() {
                let self = this
                this.$nextTick(() => {
                    var iMax = this.noticeList && this.noticeList.length;
                    if (this.$refs.hornUl && this.$refs.hornUl.children) {
                        var oLiHeight =
                            this.$refs.hornUl.children.length &&
                            this.$refs.hornUl.children[0].offsetHeight;
                        var oUlWidth = this.$refs.hornUl.offsetWidth;
                        var oDiv = this.$refs.hornDiv;
                        var oLiWidth =
                            this.$refs.hornUl.children.length &&
                            this.$refs.hornUl.children[0].offsetWidth;
                        var speed = oLiHeight;
                        var that = this;
                        var oUl = that.$refs.hornUl;
                        var remarked = [];
                        oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
                        // oUl.style.height = oUl.children.length * oLiHeight + "px";
                        clearInterval(this.timer);
                        remark();
                        this.timer = setInterval(sliders, 3500);
                        var timer1 = setTimeout(() => {
                            horizontalSlider();
                        }, 1000);
                    }

                    function sliders() {
                        clearTimeout(timer1);
                        if (-oUl.offsetTop >= oLiHeight * (iMax - 1)) {
                            oUl.style.webkitTransition = "all 0s";
                            // oUl.style.top = oLiHeight+'px';
                            oUl.style.top = speed + "px";
                        }
                        oUl.style.top = oUl.offsetTop - speed + "px";
                        oUl.style.webkitTransition = "all .5s";
                        setTimeout(() => {
                            horizontalSlider();
                        }, 500);
                    }

                    function horizontalSlider() {
                        var fontSize = document.children[0].style.fontSize;
                        for (let i = 0; i < remarked.length; i++) {
                            remarked[i].li.style.marginLeft = "";
                            if (remarked[i].top == -oUl.offsetTop) {
                                remarked[i].li.style.marginLeft = `${remarked[i].left /
                                fontSize.substring(0, fontSize.length - 2)}rem`;
                                break;
                            }
                        }
                    }

                    function remark() {
                        if (oUl.children) {
                            for (let i = 0; i < oUl.children.length; i++) {
                                if (
                                    oUl.children[i].offsetWidth > oDiv.offsetWidth &&
                                    oUl.children[i].offsetWidth - oDiv.offsetWidth > 10
                                ) {
                                    /* oUl.children[i].style.position='absolute';
                                                          oUl.children[i].style.left=`-${oUl.children[i].offsetWidth-oDiv.offsetTop}px`; */
                                    remarked.push({
                                        li: oUl.children[i],
                                        left: oDiv.offsetWidth - oUl.children[i].offsetWidth,
                                        top: oUl.children[i].offsetTop + 1
                                    });
                                }
                            }
                        }
                    }
                });
            },//走马灯
            fetch(url, params) {
                if (url.startsWith('/ops/api')) {
                    url = '//ops-api.beeplay123.com' + url
                }
                if (url.startsWith('/wap/api')) {
                    url = '//platform-api.beeplay123.com' + url
                }
                if(url.startsWith('/wap/api')){
                    url = '//shop-api.beeplay123.com' + url
                }
                return this.axios.post(url, params)
            },//请求封装方法
            async bonusListClick() {
                this.burryPoint('1207003023','春节红包-红包榜')
                try {
                    const res = await this.fetch('/ops/api/springFestival/redEnvelope/ranking', {
                        page: 1,
                        pageSize: 100
                    })
                    if (res.data.code == 200 && res.data.data) {
                        this.isshowBonusList = true
                        this.bonusListData = res.data.data
                    }
                } catch (e) {

                }
            },//点击红包榜
            async bonusRecordClick() {
                this.burryPoint('1207003020','春节红包-红包记录')
                try {
                    const res = await this.fetch('/ops/api/springFestival/redEnvelope/receiveLog', {
                        page: 1,
                        pageSize: 100
                    })
                    if (res.data.code == 200 && res.data.data) {
                        this.isshowBonusRecoed = true
                        this.bonusRecordData = res.data.data
                    }
                } catch (e) {

                }
            },//点击红包记录
            async myDetails() {
                this.burryPoint('1207003022','春节红包-下级奖励和当前排名')
                try {
                    const res = await this.fetch('/ops/api/springFestival/redEnvelope/myDetails')
                    if (res.data.code == 200 && res.data.data) {
                        // availableAmount (integer, optional): 待开启红包数量 ,
                        // countDown (integer, optional): 红包榜倒计时：离结算时间毫秒数 ,
                        // currentAwardName (string, optional): 当前奖励 ,
                        // horseRaceLampList (Array[string], optional): 跑马灯列表 ,
                        // nextAwardName (string, optional): 下级奖励 ,
                        // ranking (string, optional): 我的排名 ,
                        // settlementTime (string, optional): 榜单结算时间 ,
                        // totalAmount (integer, optional): 我的红包数量
                        // res.data.data.availableAmount=100 测试代码
                        this.detailData = res.data.data;
                        !this.countdown.time && this.detailData.countDown && GLOBALS.remainingTime(
                            this,
                            this.detailData.countDown,
                            this.countdown
                        );
                        this.noticeList = res.data.data.horseRaceLampList || []
                        //获取广播
                        this.getNoticeList()
                    }
                } catch (e) {

                }
            },//获取myDetails数据
            async openBonus() {//点击开启红包
                // //测试代码
                // this.bonusOpenedData ={awardList:[{
                //         "awardAmount": 100,
                //         "awardName": "京东卡"
                //     },{
                //         "awardAmount": 101,
                //         "awardName": "金叶子"
                //     },{
                //         "awardAmount": 101,
                //         "awardName": "话费"
                //     }]};
                // this.bonusOpenedData.num=this.detailData&&this.detailData.availableAmount||0
                // this.isshowBonusOpened = true
                if (this.detailData && this.detailData.availableAmount) {
                    this.burryPoint('1207003025','春节红包-开红包')
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
                }
            },
            async getPackage(){//获取福袋礼包数据
                try {
                    const res = await this.axios.get('//shop-api.beeplay123.com/shop/api/activity/spring')
                    if (res.data.code == 200 && res.data.data) {
                        this.packageData = res.data.data
                    }
                } catch (e) {

                }
            },
            gotopay(val){
                if(val.price==188){
                    this.burryPoint(1207003051,'春节红包-开福袋领红包-立即购买188')
                }
                if(val.price==1888){
                    this.burryPoint(1207003052,'春节红包-开福袋领红包-立即购买1888')
                }
                localStorage.setItem('JDD_PARAM', JSON.stringify(val))
                if(this.curChannel==100039||this.curChannel==100042){//好看、全民小视频
                    top.location.href = 'https://wap.beeplay123.com/payment/#/bdPayment';
                }else{
                    top.location.href = 'https://wap.beeplay123.com/payment/#/payment';
                }
            },//福袋礼包购买
            burryPoint(id,name,params){
                GLOBALS.buriedPoint(id,name,null,null,params||{})
            },//埋点方法封装
            share(){
                this.burryPoint('1207003060','春节红包-邀好友得红包-去分享')
            }//去分享
        },
        components: {
            bonusSuccess, bonusFailure, bonusList, bonusOpened, bonusRecord
        }

    }

</script>
<style lang="less" scoped>
    @import '../../common/css/base.css';

    .section0 {
        position: fixed;
        width: 7.2rem;
        height: .76rem;
        background: url("./images/topstate.png");
        background-size: 100% 100%;
        z-index: 10;
        padding: .11rem 0 .11rem .38rem;
        box-sizing: border-box;
        display: flex;
        .left {
            margin-right: .2rem;
            width: .55rem;
            height: .58rem;
            background: url("./images/bonusrecord.png");
            background-size: 100% 100%;
        }
        .right {
            width: 100%;
            display: flex;
            .item {
                font-size: .22rem;
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                &:nth-child(1):after, &:nth-child(2):after {
                    content: '';
                    position: absolute;
                    top: .1rem;
                    right: .27rem;
                    width: .01rem;
                    height: .4rem;
                    background: rgba(255, 246, 205, .5);
                }
                &:nth-child(3) {
                    flex: 2;
                }
                .r-item1 {
                    font-weight: 800;
                    color: rgba(255, 200, 82, 1);
                }
                .r-item2 {
                    font-weight: 400;
                    color: rgba(255, 240, 211, 1);
                }
            }
        }
    }

    .bonusrecord {
        position: fixed;
        top: 1.32rem;
        right: .17rem;
        width: .87rem;
        height: .99rem;
        background: url("./images/bonusrecordicon.png");
        background-size: 100% 100%;
        z-index: 10;
        .count_time {
            position: absolute;
            top: .9rem;
            right: 0;
            width: .74rem;
            height: .22rem;
            line-height: .25rem;
            background: url("./images/counttime.png");
            background-size: 100% 100%;
            font-size: .17rem;
            font-weight: 500;
            color: rgba(213, 58, 40, 1);
        }
    }

    .backTop {
        position: fixed;
        bottom: 1.32rem;
        right: 0;
        width: .7rem;
        height: .7rem;
        background: url("./images/backtop.png");
        background-size: 100% 100%;
        z-index: 10;
    }

    .section1 {
        position: relative;
        top: .57rem;
        width: 7.2rem;
        height: 11.66rem;
        background: url("./images/headimg.png");
        background-size: 100% 100%;
        .back {
            position: absolute;
            top: .46rem;
            width: .75rem;
            height: .58rem;
            background: url("./images/backhome.png");
            background-size: 100% 100%;
        }
        .text {
            position: absolute;
            top: 6.45rem;
            right: 2.17rem;
            text-align: right;
            font-size: .22rem;
            line-height: .3rem;
            height: .48rem;
            font-weight: bold;
            color: rgba(255, 197, 71, 1);
        }
        .openbonus {
            position: absolute;
            top: 5.03rem;
            left: 2.86rem;
            width: 1.66rem;
            height: 1.66rem;
            background: url("./images/openbonus.png");
            background-size: 100% 100%;
            animation: myPlay 2s ease-in infinite;
            &.opened {
                background: url("./images/openedbonus.png");
                background-size: 100% 100%;
                animation: none;
            }
        }
        .c-horn {
            display: flex;
            align-items: center;
            width: 1.86rem;
            height: 1.72rem;
            overflow: hidden;
            position: absolute;
            top: 6.83rem;
            left: .2rem;
            z-index: 2;
            .c-horn-text {
                width: 100%;
                position: relative;
                height: 1.7rem;
                ul {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                }
                li {
                    width: 1.86rem;
                    height: .86rem;
                    float: left;
                    overflow: auto;
                    white-space: nowrap;
                    transition: all 1s ease 0.5s;
                    overflow: hidden;
                    padding-bottom: .1rem;
                    box-sizing: border-box;
                    span {
                        display: inline-block;
                        height: 0.76rem;
                        width: 1.86rem;
                        font-size: .2rem;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        background: url("./images/horn.png");
                        background-size: 100% 100%;
                        padding: .16rem;
                        box-sizing: border-box;
                    }
                }
            }
        }
    }

    .section2 {
        position: absolute;
        top: 8.66rem;
        width: 7.2rem;
        height: 9.4rem;
        background: url("./images/gainbonusbottom1.png");
        background-size: 100% 100%;
        z-index: 1;
        &.share {
            background: url("./images/gainbonusbottom.png");
            background-size: 100% 100%;
        }
        .gainbonusbtn {
            position: absolute;
            top: 1.26rem;
            right: 2.02rem;
            width: 3.29rem;
            height: .86rem;
            background: url("./images/gainbonus.png") no-repeat;
            background-size: 100% 100%;
        }
        &.showHand:before {
            content: '';
            position: absolute;
            top: 1.67rem;
            right: 1.81rem;
            width: 1.24rem;
            height: 1.39rem;
            background: url("./images/hand.png");
            background-size: 100% 100%;
            z-index: 1
        }
        ul {
            position: absolute;
            top: 3.25rem;
            left: .6rem;
            right: .6rem;
            height: 5.35rem;
            display: flex;
            flex-direction: column;
            .item {
                flex: 1;
                /*padding: .25rem;*/
                box-sizing: border-box;
                display: flex;
                align-items: center;
                .item_item {
                    &:nth-child(1) {
                        width: .83rem;
                        margin-left: .3rem;
                        img {
                            width: .7rem;
                            height: .7rem;
                        }
                    }
                    &:nth-child(2) {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        & div:nth-child(1) {
                            font-size: .26rem;
                            font-weight: bold;
                            color: rgba(237, 45, 7, 1);
                            margin-top: .04rem;
                            margin-bottom: .1rem;
                        }
                        & div:nth-child(2) {
                            font-size: .22rem;
                            font-weight: 500;
                            color: rgba(134, 102, 49, 1);
                        }
                    }
                    &:nth-child(3) {
                        width: 1.28rem;
                        position: absolute;
                        left: 4.3rem;
                        align-self: center;
                        margin-right: 0;
                        font-size: .24rem;
                        font-weight: bold;
                        color: rgba(234, 140, 18, 1);
                        &.unfinished {
                            width: 1.28rem;
                            height: .46rem;
                            color: rgba(255, 236, 203, 1);
                            text-align: center;
                            line-height: .46rem;
                            background: url("./images/taskbtnbottom.png") no-repeat;
                            background-size: 100% 100%;
                            &.baidu {
                                align-self: start;
                                margin-top: .15rem;
                            }
                        }
                    }
                }
            }
        }
    }

    .section3 {
        position: absolute;
        top: 18.06rem;
        width: 7.2rem;
        height: 5.79rem;
        background: #92140E;
        z-index: 1;
        &:before {
            content: '';
            position: absolute;
            top: .35rem;
            left: .91rem;
            width: 5.32rem;
            height: 1.17rem;
            background: url("./images/littletitle.png");
            background-size: 100% 100%;
        }
        &:after {
            content: '活动期间累计消费达到指定金额，即可领取大量红包';
            position: absolute;
            top: 1.53rem;
            left: 0;
            right: 0;
            font-size: .22rem;
            font-weight: 400;
            color: rgba(253, 223, 182, 1);
            text-align: center;
        }
        .sec1 {
            position: absolute;
            top: 1.94rem;
            left: .36rem;
            width: 6.46rem;
            height: 3.07rem;
            background: url("./images/plusbonusbottom1.png");
            background-size: 100% 100%;
        }
        .sec2 {
            position: absolute;
            top: 5.12rem;
            left: .36rem;
            width: 6.46rem;
            height: .67rem;
            background: url("./images/plusbonusbottom2.png");
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .22rem;
            color: rgba(255, 255, 255, 1);
            .item {
                text-align: center;
                flex: 1;
                &:nth-child(1) {
                    padding-left: .35rem;
                }
                &:nth-child(2) {
                    padding-right: .35rem;
                }
            }
            i {
                color: rgba(255, 216, 59, 1);
            }
            &:before {
                content: '';
                position: absolute;
                left: 3.27rem;
                width: .01rem;
                height: .34rem;
                background: rgba(255, 246, 205, .5);
            }
        }
    }

    .section4 {
        position: absolute;
        top: 23.84rem;
        width: 7.2rem;
        height: 6.2rem;
        background: #92140E;
        z-index: 1;
        &:before {
            content: '';
            position: absolute;
            top: .66rem;
            left: .87rem;
            width: 5.28rem;
            height: 1.17rem;
            background: url("./images/packagetittle.png");
            background-size: 100% 100%;
        }
        .package {
            width: 100%;
            position: absolute;
            top: 1.93rem;
            display: flex;
            justify-content: space-around;
            .item {
                width: 3.14rem;
                height: 4.27rem;
                &.item188 {
                    background: url("./images/188package.png");
                    background-size: 100% 100%;
                }
                &.item1888 {
                    background: url("./images/1888package.png");
                    background-size: 100% 100%;
                }
            }
        }
    }

    .section5 {
        position: absolute;
        top: 30.04rem;
        width: 100%;
        background: #92140E;
        &.fold {
            height: 1.17rem;
        }
        &.expand {
            height: 8.63rem;
        }
        .title {
            position: absolute;
            top: .7rem;
            left: 2.73rem;
            font-size: .3rem;
            font-weight: 400;
            color: rgba(217, 113, 108, 1);
            display: flex;
            align-items: center;
            .fold {
                width: .24rem;
                height: .24rem;
                background: url("./images/ruledownicon.png");
                background-size: 100% 100%;
                transform: rotate(180deg);
                margin-left: .1rem;
            }
            .expand {
                width: .24rem;
                height: .24rem;
                background: url("./images/ruledownicon.png");
                background-size: 100% 100%;
                margin-left: .1rem;
            }
        }
        .content {
            position: absolute;
            top: 1.17rem;
            left: .38rem;
            right: .36rem;
            font-size: .22rem;
            font-weight: 400;
            color: rgba(217, 113, 108, 1);
            line-height: .3rem;
            p:last-child {
                margin-top: .5rem;
            }
        }
    }

    @keyframes myPlay {
        0% {
            transform: scale(.5);
        }
        50% {
            transform: scale(.8);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
