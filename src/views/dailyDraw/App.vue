<template>
    <div id="app" class="daily-main">
        <div class="pop-window dailyMain">
            <div class="daily-wrap" v-if="!showLoading">
                <div class="daily-draw">
                    <img src="./images/top-text.png" class="top-text">
                    <img src="./images/close.png" class="close" @click="closeDailtDraw">
                    <div class="cj_box">
                        <img src="./images/hd_entry.png" class="hd_entry" @click="openHdXq">
                        <div class="l-title">
                            <ul class="l-lamp"  :class="{'anim':isMove&&lamp.length>1}">
                                    <li v-for="item in lamp">恭喜<i>{{item.nickName}}</i>获得<i>{{item.awardsName}}</i></li>
                            </ul>
                        </div>
                        <lottery v-if="isLottery"  :beginAwardData="beginAwardData" @isAwardMessage="handleAwardMessage"></lottery>
                    </div>
                    <div class="f-title f-tz-text">今日累计投注金额：{{bettingStatArr&&bettingStatArr.bettingAmount}}</div>
                    <div class="cy-box">
                        <div class="group-items">
                            <ul v-if="bettingStatArr">
                                <li >
                                    <div class="pic"><img src="./images/leaf_500.png"></div>
                                    <div class="text">
                                        <h4>累计消耗500金叶子</h4>
                                        <p>当日累计消耗≥500金叶子送1张抽奖券</p>
                                    </div>
                                    <div class="btn-box">
                                        <a href="javascript:" class="btn btn-wc" v-if="!bettingStatArr.betting500" @click="closeDailtDraw">玩游戏</a>
                                        <a href="javascript:" class="btn btn-gray" v-else>已完成</a>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic"><img src="./images/leaf_1500.png"></div>
                                    <div class="text">
                                        <h4>累计消耗1500金叶子</h4>
                                        <p>当日累计消耗≥1500金叶子送1张抽奖券</p>
                                    </div>
                                    <div class="btn-box">
                                        <a href="javascript:" class="btn btn-wc" v-if="!bettingStatArr.betting1500" @click="closeDailtDraw">玩游戏</a>
                                        <a href="javascript:" class="btn btn-gray" v-else>已完成</a>
                                    </div>
                                </li>

                                <li>
                                    <div class="pic"><img src="./images/leaf_5000.png"></div>
                                    <div class="text">
                                        <h4>累计消耗5000金叶子</h4>
                                        <p>当日累计消耗≥5000金叶子送1张抽奖券</p>
                                    </div>
                                    <div class="btn-box">
                                        <a href="javascript:" class="btn btn-wc" v-if="!bettingStatArr.betting5000" @click="closeDailtDraw">玩游戏</a>
                                        <a href="javascript:" class="btn btn-gray" v-else>已完成</a>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic"><img src="./images/leaf_24000.png"></div>
                                    <div class="text">
                                        <h4>累计消耗24000金叶子</h4>
                                        <p>当日累计消耗≥24000金叶子送1张抽奖券</p>
                                    </div>
                                    <div class="btn-box">
                                        <a href="javascript:" class="btn btn-wc" v-if="!bettingStatArr.betting24000"  @click="closeDailtDraw">玩游戏</a>
                                        <a href="javascript:" class="btn btn-gray" v-else>已完成</a>
                                    </div>
                                </li>
                                <li>
                                    <div class="pic"><img src="./images/amount_10.png"></div>
                                    <div class="text">
                                        <h4>单笔充值≥10元</h4>
                                        <p>每天单笔充值≥10元可获赠1张抽奖券</p>
                                    </div>
                                    <div class="btn-box">
                                        <a href="javascript:" class="btn btn-wc" v-if="!bettingStatArr.pay10" @click="goShopping">去充值</a>
                                        <a href="javascript:" class="btn btn-gray" v-else>已完成</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="cy-container">
                            <div class="f-title">热门推荐</div>
                            <div class="cy-items">
                                <ul>
                                    <li><img src="./images/crush.png" @click="goGame('/crush/')">糖果夺宝</li>
                                    <li><img src="./images/billiards.png" @click="goGame('/billiards/')">梦想桌球</li>
                                    <li><img src="./images/legion.png" @click="goGame('/legion/')">热血军团</li>
                                    <li><img src="./images/samguk.png" @click="goGame('/samguk/')">貂蝉保卫战</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 活动详情 -->
            <div class="hd_xq_container" v-if="isHdXq">
                <div class="pop-mask"></div>
                <div class="hd_xq">
                    <img src="./images/white_close.png" class="white_close" @click="closeHdXq">
                    <div class="title">活动详情</div>
                    <div class="hd-content">
                        <h4>一、活动名称</h4>
                        <p>玩游戏抽iPhone X</p>
                        <h4>二、活动时间</h4>
                        <p>2018年4月20日10:00-2018年4月27日10:00</p>
                        <h4>三、活动参与方式以及流程</h4>
                        <p>1、参与条件：活动期间，自然人用户每天游戏大厅玩游戏，累计消耗金叶子达到指定量级，即可获取1张抽奖券。累计消耗金叶子量级可以在单游戏内累计，也可以在多游戏内合计消耗的累计（套圈，三张类等游戏不计入流水）。</p>
                        <p>2、累计消耗金叶子条件：</p>
                        <p>当天累计消耗≥500金叶子，得一张抽奖券。</p>
                        <p>当天累计消耗≥1500金叶子，得一张抽奖券。</p>
                        <p>当天累计消耗≥5000金叶子，得一张抽奖券。</p>
                        <p>当天累计消耗≥24000金叶子，得一张抽奖券。</p>
                        <p>当天单笔充值≥10元，得一张抽奖券。</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import '../../common/js/window.js';
import API from '../../api';
import lottery from './lottery';

export default {
        name : 'app',
        data() {
            return {
                beginAwardData: '',
                isLottery: false,
                lamp: '',
                timer:null,
                isMove : false,
                dayTaskArr: null,
                isPopLottery: false,
                lotteryParmas: '',
                isHdXq: false,
                showLoading: true,
                timer: null,
                bettingStatArr: null
            }
        },
        components: {
            lottery,
        },

        methods: {
            goShopping() {
                localStorage.setItem('showLoadPage',false)
                setTimeout(() => {
                    parent.location.href = '../../../payment/#/mall';
                })
            },
            goGame(type) {
                if(type.indexOf('external=1') != -1){
                    // let url = this.trimStr(type) + '&channel=' + localStorage.getItem('APP_CHANNEL') + '&gurl='+ type.split('?')[0]+'&pf=wap';
                    parent.location.href = GLOBALS.getJumpToGameUrl(type);
                    return;
                }
                // 这里区分澳客（游戏地址不一样）
                if (localStorage.getItem('APP_CHANNEL') == 100006) {
                    parent.location.href = '../../../channel/newokooo' + type + '?channel=' + localStorage.getItem('APP_CHANNEL')
                } else {
                    parent.location.href = type + '?channel=' + localStorage.getItem('APP_CHANNEL')
                }
            },
            closeDailtDraw() {
                if(parent.closeWebView){
                    parent.closeWebView()
                }
            },
            openHdXq() {
                this.isHdXq = true;
            },
            closeHdXq() {
                this.isHdXq = false;
            },
            getRichwheel (val) {
                this.axios.post(API.richwheel, {
                    'value': val
                }).then((response) => {
                    if(response.data.code == 200) {
                        if(parent.loadPage){
                            parent.loadPage()
                        }
                        this.beginAwardData = response.data.data;
                    }
                    this.isLottery = true;
                    setTimeout(()=> {
                        this.showLoading = false;
                    }, 500)

                })
            },
            closePopLottery() {
                this.isPopLottery = false;
            },
            handleReceive(item, str) {
                this.axios.post(API.UserTaskFinish, {
                    taskId: item.taskId,
                    taskLogId: item.taskLogId
                }).then((response) => {
                    if(response.data.code === 200) {
                        item.taskStatus = 2;
                        this.$toast.show({
                            message: '领取成功',
                            duration: 1500
                        });
                    }
                })
            },
            geThouseLamp() {
                let that = this
                this.axios.post(API.houseLamp, {
                    'value': 4
                }).then((response) => {
                    if(response.data.code == 200) {
                        this.lamp = response.data.data;
                    }
                })
            },
            handleAwardMessage(result) {
                this.isPopLottery = true;
                this.lotteryParmas = result;
            },
            // 跑马灯滚动
            scroll(){
                this.isMove = true
                if(!(this.lamp&&this.lamp.length)) {
                    return;
                }
                setTimeout(() => {
                    this.lamp.push(this.lamp[0]);
                    this.lamp.shift();
                    this.isMove= false;
                },1000)

            },
            getBettingStat() {
                this.axios.post(API.bettingStat).then((response) => {
                    if(response && response.data.code == 200) {
                        this.bettingStatArr = response.data.data;
                    }
                })
            }
        },
        mounted() {
            this.getBettingStat();
            // 转盘
            this.getRichwheel(4);
            // 跑马灯
            this.geThouseLamp();
            setInterval(this.scroll,2500)
        }
    }

</script>

<style lang="less" scoped>
    @import './index.less';
</style>

