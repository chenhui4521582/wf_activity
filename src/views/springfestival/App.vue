<template>
    <div id="app">
        <div class="section0">
            <div class="left">
            </div>
            <div class="right">
                <div class="item">
                    <div class="r-item1">拥有红包</div>
                    <div class="r-item2">10000个</div>
                </div>
                <div class="item">
                    <div class="r-item1">待开启红包</div>
                    <div class="r-item2">未上榜</div>
                </div>
                <div class="item">
                    <div class="r-item1">下级奖励</div>
                    <div class="r-item2">1000京东卡+10000金叶子</div>
                </div>
            </div>
        </div>
        <!--红包榜-->
        <div class="bonusrecord"></div>
        <div class="section1">
            <!--返回按钮-->
            <div class="back"></div>
            <div class="openbonus opened"></div>
            <div class="text">待开启 <br> 50个红包</div>
        </div>
        <div class="section2">
            <div class="gainbonusbtn"></div>
            <ul>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/signicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">春节好运到 送你大红包</div>
                        <div class="item_item_item">春节见面礼 登录领红包</div>
                    </div>
                    <div class="item_item">今日已领取</div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/gameicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">玩游戏 得红包</div>
                        <div class="item_item_item">每日最高领100个红包</div>
                    </div>
                    <!--<div class="item_item">今日已完成</div>-->
                    <div class="item_item unfinished">去完成</div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/chargeicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">加赠红包 超值回馈</div>
                        <div class="item_item_item">405个红包等你来领</div>
                    </div>
                    <!--<div class="item_item">今日已领取</div>-->
                    <div class="item_item unfinished" v-anchor="'section3'">去领红包</div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/luckicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">新春好运 礼包开服</div>
                        <div class="item_item_item">春节特惠，冲榜必备</div>
                    </div>
                    <!--<div class="item_item">今日已领取</div>-->
                    <div class="item_item unfinished" v-anchor="'section4'">去领红包</div>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/askicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">邀好友 得红包</div>
                        <div class="item_item_item">邀请成功，免费拿红包</div>
                    </div>
                    <!--<div class="item_item">今日已分享</div>-->
                    <div class="item_item unfinished">去分享</div>
                </li>
            </ul>
        </div>
        <div class="section3" id="section3">
            <div class="sec1"></div>
            <div class="sec2">
                <div class="item"><i>我的目前充值</i> 12023元</div>
                <div class="item"><i>充值所得红包数量</i>1696个</div>
            </div>
        </div>
        <div class="section4" id="section4">
            <div class="package">
                <div class="item">

                </div>
                <div class="item">

                </div>
            </div>
        </div>
        <div class="section5" :class="{fold:isFoldRule,expand:!isFoldRule}" id="section5">
            <div class="title" @click="isFoldRule=!isFoldRule">活动说明
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                userInfo: null,
                curChannel: null,
                curToken: null,
                isFoldRule: true,
                anchorID:''
            }
        },
        mounted() {
            this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
            this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
            if (this.curChannel && this.curChannel.indexOf('100') != -1) {
                this.getUserInfo()
            }
            console.log()
        },
        computed: {
            isHideMenu() {
                return this.hideBackArr.includes(this.curChannel)
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
            getUserInfo() {
                this.axios.post('//uic-api.beeplay123.com/uic/api/user/login/transInfo', {}, {
                    headers: {
                        'App-Channel': this.curChannel,
                        'Authorization': this.curToken
                    }
                })
                    .then((res) => {
                        if (res.data.code == 200) {
                            this.userInfo = res.data.data
                        }
                    })
            },
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector)
                document.documentElement.scrollTop = anchor.offsetTop
            }
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
        right: 0;
        width: .84rem;
        height: 1.34rem;
        background: url("./images/bonusrecordicon.png");
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
            line-height: .25rem;
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
            &.opened {
                background: url("./images/openedbonus.png");
                background-size: 100% 100%;
            }
        }
    }

    .section2 {
        position: absolute;
        top: 8.66rem;
        width: 7.2rem;
        height: 9.4rem;
        background: url("./images/gainbonusbottom.png");
        background-size: 100% 100%;
        z-index: 1;
        .gainbonusbtn {
            position: absolute;
            top: 1.26rem;
            right: 2.02rem;
            width: 3.29rem;
            height: .86rem;
            background: url("./images/gainbonus.png") no-repeat;
            background-size: 100% 100%;
        }
        &:before {
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
            content: '活动期间累计充值达到指定金额，即可领取大量红包';
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
                &:nth-child(1) {
                    background: url("./images/188package.png");
                    background-size: 100% 100%;
                }
                &:nth-child(2) {
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
</style>
