<template>
    <div id="app" :class="{aoke:curChannel==100006}">
        <div class="section0">
            <div class="left" @click="bonusRecordClick">
            </div>
            <div class="right">
                <div class="item" @click="bonusRecordClick">
                    <div class="r-item1">拥有红包</div>
                    <div class="r-item2">{{detailData&&detailData.totalAmount}}个</div>
                </div>
                <div class="item" @click="bonusRecordClick">
                    <div class="r-item1">待开启红包</div>
                    <div class="r-item2">{{detailData&&detailData.availableAmount}}个</div>
                </div>
                <div class="item" @click.stop="bonusListClick('top')">
                    
                    <div class="r-item2 item-move-box" style="position: relative;z-index: 1"> 
                        <!-- <div class="r-item1" style="height: 0.35rem;overflow: hidden;position: relative;z-index: 5;">
                            <div v-for="item in lamp" :class="{'anim':isMove}" style="height: 0.35rem;"></div> 
                        </div> -->
                        <div class="item-move" v-if="lamp.length">
                            <ul  :class="{'anim':isMove}">
                                <li v-for="item in lamp">
                                    <div class="r-item1">{{item.name}}</div>
                                    {{item.desc}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--红包榜-->
        <div class="bonusrecord" ref="bounce" @click.stop="bonusListClick('')">
            <div class="count_time" v-if="countdownText">{{countdownText}}</div>
        </div>
        <!--回到顶部-->
        <div class="backTop" v-if="isShowTopIcon" v-anchor="'section1'" id="backTop"></div>
        <!--返回按钮-->
        <div class="back" @click="back('')"></div>
        <!--第一屏-->
        <div class="section1" id="section1" :class="{only:!showTask}">
            <div class="openbonus" :class="{opened:!detailData||!detailData.availableAmount}" @click="openBonus"></div>
            <div class="text" v-if="detailData&&detailData.availableAmount">待开启 <br>{{detailData&&detailData.availableAmount}}个红包
            </div>
            <div class="c-horn">
                <div ref="hornDiv" class="c-horn-text">
                    <ul ref="hornUl">
                        <li v-for="(item,index) in noticeList" ref="hornLi">
                            <div class="horn-div">
                                <p v-html="item"></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!--任务-->
        <div class="section2" id="section2" :class="{showHand:isshowHand,share:curChannel==100039}" v-if="showTask">
            <div class="gainbonusbtn" @click="gainbonus"></div>
            <ul>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/signicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">春节好运到 送你大红包</div>
                        <div class="item_item_item">每日登录即领1个红包</div>
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
                    <template v-if="batchRedDotData">
                        <div class="item_item unfinished"
                             :class="{baidu:curChannel==100039,have:true}"
                             style="display: flex;flex-direction: column;text-align: center" v-if="batchRedDotData.taskStatus==0">
                            <div class="item_item_item" @click="back('taskview')">去完成</div>
                            <div class="text" style="font-size: .18rem;color:rgba(240,150,118,1);font-weight:500;">
                                您有红包待领取
                            </div>
                        </div>
                        <div class="item_item unfinished" @click="back('taskview')" v-if="batchRedDotData.taskStatus==1">去完成</div>
                        <div class="item_item" v-if="batchRedDotData.taskStatus==2">今日已完成</div>
                    </template>
                    <template v-else>
                        <div class="item_item unfinished" @click="back('taskview')">去完成</div>
                    </template>
                </li>
                <li class="item">
                    <div class="item_item">
                        <img src="./images/chargeicon.png" alt="">
                    </div>
                    <div class="item_item">
                        <div class="item_item_item">加赠红包 超值回馈</div>
                        <div class="item_item_item">1696个红包等你来领</div>
                    </div>
                    <!--加赠红包领取个数是1696已完成-->
                    <div class="item_item"
                         v-if="detailData&&detailData.receiveByCumulativeTask==1696">
                        已完成
                    </div>
                    <!--1.有没有待领取的红包 2.没有待领取-->
                    <template v-else>
                        <div class="item_item unfinished"
                             :class="{baidu:curChannel==100039,have:envelopsItem.filter(i=>i.taskStatus==0).length>0}"
                             style="display: flex;flex-direction: column;text-align: center"
                             v-if="envelopsItem.filter(i=>i.taskStatus==0).length>0">
                            <div class="item_item_item" v-anchor="'section3'">去领红包</div>
                            <div class="text" style="font-size: .18rem;color:rgba(240,150,118,1);font-weight:500;">
                                您有红包待领取
                            </div>
                        </div>
                        <div class="item_item unfinished" v-anchor="'section3'" v-else>去领红包</div>
                    </template>
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
                <li class="item" v-if="curChannel==100039 || curChannel==100042">
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
        <div class="section3" id="section3" v-if="showTask">
            <div class="sec1">
                <div class="hb-task-box">
                    <div class="percent-box">
                        <!--:style="{width:wpercent}"-->
                        <div class="percent-number" :style="{width:wpercent}"></div>
                    </div>
                    <ul>
                        <li v-for="item in envelopsItem" v-if="!item.dot">
                            <h2>累计充值</h2>
                            <h4>满{{item.taskOps}}元</h4>
                            <div class="hb-line"></div>
                            <div class="envelopes">{{item.awardsNum}}个</div>
                            <div class="btn btn-complete" v-if="item.taskStatus == 2">已领取</div>
                            <div class="btn btn-receive" v-if="item.taskStatus == 0"
                               @click="getjiazbonus(item)">领取</div>
                            <div class="btn btn-default" v-if="item.taskStatus == 1"
                               @click="gotocomplete">去完成</div>
                        </li>
                        <li class="hb-dot-box" v-else>
                            <span class="hb-dot hb-dot1"></span>
                            <span class="hb-dot"></span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="sec2"
                 :class="{unfinished:envelopsItem&&envelopsItem[envelopsItem.length-1]&&envelopsItem[envelopsItem.length-1].taskStatus==1}">
                <template v-if="envelopsItem[envelopsItem.length-1]">
                    <!--最后一项未完成-->
                    <template v-if="envelopsItem[envelopsItem.length-1].taskStatus==1">
                        <div class="item"><i>领下级红包还需消费</i>{{jiazengyuan}}元</div><em class="i-line"></em>
                        <div class="item"><i>获得加赠红包个数</i>{{detailData&&detailData.receiveByCumulativeTask||0}}个</div>
                    </template>
                    <!--最后一项已完成-->
                    <template v-else>
                        <div class="item">已完成该活动，参与"福袋开福"</div>
                    </template>
                </template>
            </div>
        </div>
        <!--礼包开福-->
        <div class="section4" id="section4" v-if="showTask">
            <div class="package">
                <div class="item" v-for="item in packageData"
                     :class="{item188:item.price==188,item1888:item.price==1888}" @click="gotopay(item)">

                </div>
            </div>
        </div>
        <!--更多游戏活动-->
        <div class="section6" id="section6" v-if="showTask">
            <div class="package">
                <div class="item" v-for="item in 3" @click="gotoplay(item)">
                    <div class="pic">
                    </div>
                    <div class="btn"></div>
                </div>
            </div>
        </div>
        <!--规则-->
        <div class="section5" :class="{fold:isFoldRule,expand:!isFoldRule,only:!showTask}" id="section5">
            <template v-if="showTask">
                <div class="title" @click="ruleClick">活动说明
                    <div :class="{fold:!isFoldRule,expand:isFoldRule,only:!showTask}"></div>
                </div>
            </template>
            <template v-else>
                <div class="title">活动说明
                </div>
            </template>
            <div class="content" v-if="!isFoldRule||!showTask">
                <p> 1. 活动时间：1月25日至2月22日；
                </p>
                <P>榜单结算时间：2月20日23:59:59。</P>
                <p>2. 红包榜排名规则：
红包榜按照用户所拥有的红包数进行排名，用户可通过以下途径获得红包。</p>
                <p> 3. 红包获取途径：
                </p>
                <P>每日登录游戏中心免费领1个红包；
                </P>
                <P v-if="curChannel==100039||curChannel==100042"> 每成功邀请一个好友玩游戏可获得2个红包（每天最多获得8个红包）；
                </P>
                <P>完成每日任务可领红包；
                </P>
                <P>活动期间累积消费达到条件，可获得红包，也可参与红包礼包活动，
                    冲击榜单。</P>
                <p> 4. 奖励发放：
                </p>
                <P> 对应奖励将在2月23日开始，通过消息中心发放。</P>
                <p> 5. 注意事项：
                </p>
                <p>红包数目相同时，榜单排名有先后，实际发放奖励以较高奖励为准；</p>
                <P> 游戏里发放的红包不计入此活动；榜单刷新可能延时；
                </P>
                <P> 榜单结算后，玩家仍可继续获得红包奖励，但所得红包不计入榜单
                    排名。</P>
                <p style="margin-top: 0">活动期间，禁止作弊行为，游戏官方有权对违规行为进行处理，必
                    要时追究法律责任。如有任何疑问，可在游戏中心-- "我的" -- "帮助反馈"中联系客服，或致电400-873-5311。</p>
            </div>
        </div>
        <!--以下都是弹窗-->
        <!--加赠红包领取成功-->
        <bonus-success :show="isshowBonusSuccess" :count="jiazengbonusNumber"
                       @close="isshowBonusSuccess=false"></bonus-success>
        <!--加赠红包点击去完成-->
        <bonus-failure :show="isshowBonusFailure" @close="isshowBonusFailure=false"></bonus-failure>
        <!--红包记录-->
        <bonus-record :show="isshowBonusRecoed" :data="bonusRecordData" @close="isshowBonusRecoed=false"></bonus-record>
        <!--红包榜-->
        <bonus-list :show="isshowBonusList" :data="bonusListData" @close="isshowBonusList=false":userid="userID"></bonus-list>
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
    import common from "../../common/js/utils";
    export default {
        data() {
            return {
                userInfo: null,
                curChannel: null,
                curToken: null,
                isFoldRule: false,//折叠规则默认折叠
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
                packageData: [],//福袋开福礼包数据
                jiazengbonusNumber: 0,//加赠红包点击领取获得红包个数
                hbTestData: [{
                    "taskId": 412,
                    "taskOps": 10,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 1,
                }, {
                    "taskId": 413,
                    "taskOps": 28,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 2,
                }, {
                    "taskId": 414,
                    "taskOps": 58,
                    "finishNum": 57,
                    "taskStatus": 2,
                    "awardsNum": 3,
                }, {
                    "taskId": 415,
                    "taskOps": 128,
                    "finishNum": 64,
                    "taskStatus": 0,
                    "awardsNum": 6,
                }, {
                    "taskId": 416,
                    "taskOps": 320,
                    "finishNum": 2,
                    "taskStatus": 2,
                    "awardsNum": 20,
                }, {
                    "taskId": 417,
                    "taskOps": 620,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 30,
                }, {
                    "taskId": 418,
                    "taskOps": 1200,
                    "finishNum": 1200,
                    "taskStatus": 0,
                    "awardsNum": 58,
                }, {
                    "taskId": 421,
                    "taskOps": 16961,
                    "finishNum": 2,
                    "taskStatus": 2,
                    "awardsNum": 888,
                }, {
                    "taskId": 419,
                    "taskOps": 3080,
                    "finishNum": 1540,
                    "taskStatus": 2,
                    "awardsNum": 188,
                }, {
                    "taskId": 420,
                    "taskOps": 8080,
                    "finishNum": 0,
                    "taskStatus": 2,
                    "awardsNum": 500,
                }],
                hbItems: null,
                batchRedDotData:null,
                timer1: null,
                timer2: null,
                userID:0,
                isMove : false,
                lamp: [],
                ylbScroll: null
            }
        },
        mounted() {
            // 导航滚动
            clearInterval(this.ylbScroll)
            this.ylbScroll = setInterval(this.scroll,2500)

            this.getaccountInfo()
            this.$nextTick(()=> {
                clearInterval(this.timer1)
                this.timer1 = setInterval(()=> {
                    this.$refs.bounce.className="bonusrecord bounce"
                    this.bounceRemove()
                }, 5000)
            })
            this.burryPoint('1207003000', '春节红包加载页', {poker_value: this.getUrlParam('source')})
            //4秒后隐藏小手
            setTimeout(() => {
                this.isshowHand = false
            }, 8000)
            this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
            this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
            this.myDetails()//myDetail接口数据
            this.getBatchRedDot()
            this.getEnvelopesList()
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
            },
            envelopsItem() {
                if (!this.hbItems) {
                    return []
                }
                
                // 获取最大值
                let maxItem = this.hbItems&&this.hbItems.length&&this.hbItems.sort((a, b) => {
                    return a.taskOps - b.taskOps
                })[this.hbItems.length - 1]

                // 删除数组最后一位
                this.hbItems.pop()
                
                
                let nArr = this.hbItems.filter((item) => {
                    return item.taskStatus != 2
                }).sort((a, b) => {
                    return a.taskOps - b.taskOps
                })
                let tArr = this.hbItems.filter((item) => {
                    return item.taskStatus == 2
                }).sort((a, b) => {
                    return a.taskOps - b.taskOps
                })
                let result = []
                if (nArr.length > 4) {
                    result = nArr.splice(0, 4)
                    // result.push(nArr.pop())
                    // 个数大于5个的时候加个dot
                    result.splice(4, 0, {dot: true})
                    result.push(maxItem)
                    return result
                } else if (nArr.length == 4) {
                    result = nArr.splice(0, 4)
                    result.push(maxItem)
                    return result
                } else {
                    result = [...this.getList(nArr, tArr), maxItem]
                    return result
                }

            },
            jiazengyuan() {//领下级红包还需消费多少元
                let minUnfinished = this.hbItems.filter((item) => {
                    return item.taskStatus == 1
                }).sort((a, b) => {
                    return a.taskOps - b.taskOps
                })[0]
                return minUnfinished.taskOps - minUnfinished.finishNum
            },
            wpercent() {
                if (!this.hbItems||this.hbItems.length==0) {
                    return
                }
                if (this.hbItems && this.envelopsItem) {
                    if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].taskStatus != 1) {
                        return '100%'
                    } else {
                        let minUnfinished = this.hbItems.filter((item) => {
                            return item.taskStatus == 1
                        }).sort((a, b) => {
                            return a.taskOps - b.taskOps
                        })[0]
                        let idArr = [...this.envelopsItem.map(c => c.taskId)].indexOf(minUnfinished.taskId)
                        if (this.envelopsItem.length == 6) {
                            if (idArr == -1) {//在省略号里
                                console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
                                return parseFloat(5 * 100 / 6).toFixed(2) + '%'
                            } else {
                                if (idArr == 0) {
                                    return parseFloat((idArr + minUnfinished.finishNum / (minUnfinished.taskOps)) * 100 / 12) + '%'
                                } else {
                                    return parseFloat((1 / 12 + (idArr - 1) / 6 + minUnfinished.finishNum / (minUnfinished.taskOps) / 6) * 100) + '%'
                                }
                            }
                        } else {
                            if (idArr == 0) {
                                return parseFloat((idArr + minUnfinished.finishNum / (minUnfinished.taskOps)) * 100 / 12) + '%'
                            } else {
                                return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + minUnfinished.finishNum / (minUnfinished.taskOps) * 5 / 24) * 100) + '%'
                            }
                        }
                    }
                } else {
                    return 0
                }

            },
            showTask(){
                if(this.detailData){
                    return this.countdown.time&&this.countdown.time!='00:00:00'
                }else{
                    return true
                }

            }
        },
        methods: {
            // 跑马灯滚动
            scroll(){
                this.isMove = true
                setTimeout(() => {
                    this.lamp.push(this.lamp[0]);
                    this.lamp.shift();
                    this.isMove= false; 
                },1000)
                
            },
            bounceRemove() {
                clearInterval(this.timer2)
                this.timer2 = setTimeout(()=> {
                    this.$refs.bounce.className="bonusrecord"
                }, 1000)
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
                        this.burryPoint('1207003003', '春节红包-回到平台')
                        switch (this.backUrl) {
                            case 'wap':
                                window.location.href = 'https://wap.beeplay123.com/wap/home?channel=' + this.curChannel;
                                break;
                            case 'jswap':
                                window.location.href = 'https://wap.beeplay123.com/jsWap?channel=' + this.curChannel;
                                break;
                            case 'bdwap':
                                window.location.href = 'https://wap.beeplay123.com/bdWap?channel=' + this.curChannel;
                                break;
                        }
                    } else {
                        this.burryPoint('1207003030', '春节红包-玩游戏得红包(每日任务)')
                        switch (this.backUrl) {
                            case 'wap':
                                window.location.href = 'https://wap.beeplay123.com/wap/home?channel=' + this.curChannel + '#/' + page;
                                break;
                            case 'jswap':
                                window.location.href = 'https://wap.beeplay123.com/jsWap?channel=' + this.curChannel + '#/' + page;
                                break;
                            case 'bdwap':
                                window.location.href = 'https://wap.beeplay123.com/bdWap?channel=' + this.curChannel + '#/' + page;
                                break;
                        }
                    }
                }
            },//回到首页、平台任务页面逻辑
            gainbonus() {
                this.burryPoint('1207003002', '春节红包-获取更多红包')
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
                if (url.startsWith('/wap/api')) {
                    url = '//shop-api.beeplay123.com' + url
                }
                return this.axios.post(url, params, {})
            },//请求封装方法
            async bonusListClick(val) {
                if(val){
                    this.burryPoint('1207003022', '春节红包-下级奖励和当前排名')
                }else{
                    this.burryPoint('1207003023', '春节红包-红包榜')
                }
                try {
                    const res = await this.fetch('/ops/api/springFestival/redEnvelope/ranking', {
                        page: 1,
                        pageSize: 500
                    })
                    if (res.data.code == 200 && res.data.data) {
                        this.isshowBonusList = true
                        this.bonusListData = res.data.data
                    }
                } catch (e) {

                }
            },//点击红包榜
            async bonusRecordClick() {
                this.burryPoint('1207003020', '春节红包-红包记录')
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
                        this.lamp = [{
                            name: '下级奖励',
                            desc: this.detailData&&this.detailData.nextAwardName,
                        }, {
                            name: '红包榜排名',
                            desc: this.detailData&&this.detailData.ranking
                        }]
                        


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
            async getPackage() {//获取福袋礼包数据
                try {
                    const res = await this.axios.get('//shop-api.beeplay123.com/shop/api/activity/spring')
                    if (res.data.code == 200 && res.data.data) {
                        this.packageData = res.data.data
                    }
                } catch (e) {

                }
            },
            gotopay(val) {
                if (val.price == 188) {
                    this.burryPoint(1207003051, '春节红包-开福袋领红包-立即购买188')
                }
                if (val.price == 1888) {
                    this.burryPoint(1207003052, '春节红包-开福袋领红包-立即购买1888')
                }
                localStorage.setItem('JDD_PARAM', JSON.stringify(val))
                if (this.curChannel == 100039 || this.curChannel == 100042) {//好看、全民小视频
                    top.location.href = 'https://wap.beeplay123.com/payment/#/bdPayment';
                } else {
                    top.location.href = 'https://wap.beeplay123.com/payment/#/payment';
                }
            },//福袋礼包购买
            burryPoint(id, name, params) {
                GLOBALS.buriedPoint(id, name, null, null, params || {})
            },//埋点方法封装
            share() {
                this.burryPoint('1207003060', '春节红包-邀好友得红包-去分享')
                window.location.href='https://wap.beeplay123.com/activities/packetSharing.html'
            },//去分享
            // 获取红包任务列表
            getEnvelopesList() {
                this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platCommonTaskByBatch', {
                    value: "SpringFestival-recharge"
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.hbItems = res.data.data
                        // this.hbItems = this.hbTestData

                    }
                })
            },
            getList(newArr, completeArr, maxItem) {
                if (newArr.length < 4) {
                    var len = 4 - newArr.length;
                    return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
                        return a.taskOps - b.taskOps
                    })
                }
            },
            async getjiazbonus(item) {//点击加赠红包领取
                let res=await this.axios.post('//platform-api.beeplay123.com/task/api/usertask/finish',{taskId:item.taskId})
                if(res.data.code==200){
                    this.burryPoint('1207003041', '春节红包-加赠红包-红包获得弹窗')
                    this.jiazengbonusNumber = item.awardsNum
                    this.isshowBonusSuccess = true;
                    //刷新
                    //加赠红包接口
                    //详情数据
                    this.getEnvelopesList()
                    this.myDetails()
                }
            },
            gotocomplete() {//点击加赠红包去完成
                this.burryPoint('1207003044', '春节红包-加赠红包-去完成')
                // this.isshowBonusFailure = true
                top.location.href='https://wap.beeplay123.com/payment/#/mall'
            },
            async getBatchRedDot(){
                let res= await this.fetch('//platform-api.beeplay123.com/task/api/usertask/batchTaskStatus',{
                    value:'dayTask'
                })
                if(res.data.code==200){
                    this.batchRedDotData=res.data.data;
                }
            },
            gotoplay(index){
                if(index==1){
                    this.burryPoint('1207003080', '春节红包-更多游戏-去玩游戏捕鱼')
                    common.jumpToGame({url:'/fish'})
                }else if(index==2){
                    this.burryPoint('1207003081', '春节红包-更多游戏-去玩游戏桌球')
                    common.jumpToGame({url:'/billiards'})
                }else{
                    this.burryPoint('1207003082', '春节红包-更多游戏-去玩游戏糖果')
                    common.jumpToGame({url:'/crush'})
                }
            },
            async getaccountInfo(){
                let res=await this.fetch('//trans-api.beeplay123.com/trans/api/trans/accountInfo')
                if(res.data.code==200){
                    this.userID=res.data.data&&res.data.data.userId||0
                    this.getAnchor('section1')
                }
            }
        },
        components: {
            bonusSuccess, bonusFailure, bonusList, bonusOpened, bonusRecord
        }

    }

</script>
<style lang="less" scoped>
    @import '../../common/css/base.css';
    .aoke{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top: 0;
        overflow-y: auto;
    }
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
                flex: .9;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                position: relative;
                &:nth-child(1):after, &:nth-child(2):after {
                    content: '';
                    position: absolute;
                    top: .1rem;
                    right: .1rem;
                    width: 1px;
                    height: .4rem;
                    background: rgba(255, 246, 205, .5);
                }
                &:nth-child(3) {
                    flex: 2.5;
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
        width: 1.07rem;
        height: 1.22rem;
        background: url("./images/bonusrecordicon.png");
        background-size: 100% 100%;
        z-index: 10;
        .count_time {
            position: absolute;
                top: 1.1rem;
            right: 0.15rem;
            width: .74rem;
            height: .22rem;
            line-height: .25rem;
            background: url("./images/counttime.png");
            background-size: 100% 100%;
            font-size: .17rem;
            font-weight: 500;
            color: rgba(213, 58, 40, 1);
            text-align: center;
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
    .back {
        position: fixed;
        top: 1rem;
        width: .75rem;
        height: .58rem;
        background: url("./images/backhome.png");
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
        &.only{
            height: 18.58rem;
            background: url("./images/headimg1.png");
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
                height: 1.55rem;
                overflow: hidden;
                ul {
                    width: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    overflow: hidden;
                }
                li {
                    width: 1.86rem;
                    height: 0.8rem;
                    transition: all 1s ease 0.5s;
                    overflow: hidden;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    .horn-div {
                        height: 0.7rem;
                        font-size: .2rem;
                        font-weight: 400;
                        color: rgba(255, 255, 255, 1);
                        background: url("./images/horn.png");
                        background-size: 100% 100%;
                        display: flex;
                        align-items: center;
                        p {
                            height: 0.48rem;
                            overflow: hidden;
                            padding: 0 0.15rem;
                            line-height: 0.26rem;
                            text-overflow: -o-ellipsis-lastline;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;
                        }
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
            &:before {
                content: '';
                width: 3.29rem;
                height: 1rem;
                position: absolute;
                left: 0;
                top: 0.7rem;
                z-index: 10;
            };
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
            z-index: 1;
            animation: myPlay1 2s ease-in infinite;
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
                position: relative;
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
                        text-align: center;
                        width: 1.28rem;
                        position: absolute;
                        left: 4.4rem;
                        top: 50%;
                        transform: translateY(-50%);
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
                            &.baidu, &.have {
                                align-self: start;
                                margin-top: .15rem;
                                top: .3rem;
                                .text {
                                    font-size: 0.18rem;
                                    color: rgb(240, 150, 118);
                                    font-weight: 500;
                                    /*margin-top: .2rem;*/
                                    position: absolute;
                                    top:.4rem;
                                }
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
            .hb-task-box {
                padding: 0 0.07rem;
                ul {
                    display: flex;
                }
                .percent-box {
                    width: 5.86rem;
                    height: 0.15rem;
                    background: #fff;
                    border-radius: 0.05rem;
                    position: absolute;
                    left: 0.3rem;
                    top: 1.01rem;
                    border-radius: 0.08rem;
                    .percent-number {
                        /*width: 40%;*/
                        height: 0.15rem;
                        position: absolute;
                        left: 0;
                        top: 0;
                        background: #C93B34;
                        border-radius: 0.08rem;
                        &:after {
                            content: '';
                            width: 0.23rem;
                            height: 0.23rem;
                            background: url(./images/percent-dot.png) no-repeat;
                            background-size: 100% 100%;
                            position: absolute;
                            right: -0.1rem;
                            top: -0.04rem;
                        }
                    ;
                    }
                }
                li {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    h2 {
                        font-size: 0.2rem;
                        font-weight: 500;
                        color: rgba(239, 97, 62, 1);
                        padding-top: 0.28rem;
                    }
                    h4 {
                        font-size: 0.22rem;
                        font-weight: 800;
                        color: rgba(245, 49, 0, 1);
                        margin: 0.1rem auto 0.05rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap
                    }
                    &:last-child h4 {
                        max-width: 1.2rem;
                    };
                    .hb-line {
                        width: 2px;
                        height: 0.48rem;
                        background: rgba(242, 171, 67, 1);
                        border-radius: 1px;
                    }
                    &.hb-dot-box {
                        flex: 0 0 .6rem;
                    }
                    .hb-dot {
                        display: block;
                        width: 0.27rem;
                        height: 0.06rem;
                        background: url(./images/dot.png) no-repeat;
                        background-size: 100% 100%;
                        &.hb-dot1 {
                            margin: 0.54rem auto 1.15rem;
                        }
                    }
                    .envelopes {
                        width: 0.59rem;
                        height: 0.3rem;
                        background: url(./images/envelopes.png) no-repeat;
                        background-size: 100% 100%;
                        margin: 0.04rem auto 0.11rem;
                        font-size: 0.2rem;
                        color: #fff;
                        text-align: center;
                        padding-top: 0.51rem;
                    }
                    .btn {
                        display: block;
                        width: 0.89rem;
                        height: 0.46rem;
                        font-size: 0.24rem;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        &.btn-receive {
                            background: url(./images/btn-receive.png) no-repeat;
                            background-size: 100% 100%;
                            color: rgba(255, 236, 203, 1);
                        }
                        &.btn-default {
                            background: url(./images/btn-default.png) no-repeat;
                            background-size: 100% 100%;
                            color: #FFECCB;
                        }
                        &.btn-complete {
                            font-size: 0.24rem;
                            color: #EA8C12;
                        }
                    }
                }
            }
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
                display: inline-block;
                text-align: center;
                &:nth-child(1) {
                    padding-left: .35rem;
                }
                &:nth-child(2) {
                    padding-right: .35rem;
                }
            }
            .i-line {
                display: inline-block;
                width:1px;
                height:0.34rem;
                background:rgba(255,246,205,1);
                opacity:0.5;
                margin: 0 0.15rem;
            }
            i {
                color: rgba(255, 216, 59, 1);
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
    .section6 {
        position: absolute;
        top: 30.04rem;
        width: 7.2rem;
        height: 6.2rem;
        background: #92140E;
        z-index: 1;
        &:before {
            content: '';
            position: absolute;
            top: .66rem;
            left: .42rem;
            width: 6.3rem;
            height: 1.27rem;
            background: url("./images/playtitle.png");
            background-size: 100% 100%;
        }
        .package {
            width: 100%;
            position: absolute;
            top: 1.93rem;
            display: flex;
            justify-content: space-around;
            .item {
                width: 2rem;
                height: 3.68rem;
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                &:nth-child(1) .pic{
                    content: '';
                    position: absolute;
                    width: 2rem;
                    height: 2.96rem;
                    background: url("./images/playfish.png");
                    background-size: 100% 100%;
                }
                &:nth-child(2) .pic{
                    content: '';
                    position: absolute;
                    width: 2rem;
                    height: 2.96rem;
                    background: url("./images/playbrilliant.png");
                    background-size: 100% 100%;
                }
                &:nth-child(3) .pic{
                    content: '';
                    position: absolute;
                    width: 2rem;
                    height: 2.96rem;
                    background: url("./images/playcrush.png");
                    background-size: 100% 100%;
                }
                .pic .text{
                    position: absolute;
                    top:2.25rem;
                    left: .2rem;
                    right: .2rem;
                    text-align: center;
                    font-size:.22rem;
                    font-weight:bold;
                    color:rgba(255,216,59,1);
                    line-height:.3rem;
                }
                .btn{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    width: 1.97rem;
                    height: .56rem;
                    background: url("./images/playbtn.png");
                    background-size: 100% 100%;
                }
            }
        }
    }
    .section5 {
        position: absolute;
        top: 35.6rem;
        width: 100%;
        background: #92140E;
        &.fold {
            height: 1.17rem;
            &.only{
                height:0;
            }
        }
        &.expand {
            height: 8.63rem;
            &.only{
                height:0;
            }
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
                /*&.only{*/
                    /*background: url("./images/ruledownicon1.png");*/
                    /*background-size: 100% 100%;*/
                /*}*/
            }
            .expand {
                width: .24rem;
                height: .24rem;
                background: url("./images/ruledownicon.png");
                background-size: 100% 100%;
                margin-left: .1rem;
                /*&.only{*/
                    /*background: url("./images/ruledownicon1.png");*/
                    /*background-size: 100% 100%;*/
                /*}*/
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
                margin-top: .3rem;
            }
        }
        &.only{//活动结束后
            top:11.56rem;
            background: transparent;
            .title,.content{
                color:rgba(255,255,255,1);
            }
        }
    }

    @keyframes myPlay {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(.8);
        }
    }
    @keyframes myPlay1 {
        0% {
            transform: translateY(10%);
        }
        100% {
            transform: translateY(-10%);
        }
    }

    @keyframes bounce{0%,20%,53%,80%,to{
-webkit-animation-timing-function:cubic-bezier(.215,.61,.355,1);
animation-timing-function:cubic-bezier(.215,.61,.355,1);
-webkit-transform:translateZ(0);transform:translateZ(0)}
40%,43%{-webkit-transform:translate3d(0,-30px,0);transform:translate3d(0,-30px,0)}
40%,43%,70%{-webkit-animation-timing-function:cubic-bezier(.755,.05,.855,.06);animation-timing-function:cubic-bezier(.755,.05,.855,.06)}
70%{-webkit-transform:translate3d(0,-15px,0);transform:translate3d(0,-15px,0)}
90%{-webkit-transform:translate3d(0,-4px,0);transform:translate3d(0,-4px,0)}}
    .bounce{
        animation:bounce 1s forwards;
    }
    .anim{
        transition: all .5s;
        top: -0.8rem !important;
    }
    .item-move {
        height: 0.8rem;
        overflow: hidden;
        position: relative;
        top: -0.1rem;
        left:0.1rem;
        
    }
    .item-move-box {
        position: relative;
        left: 0.02rem;
        /*&:after {
            content: '';
            position: absolute;
            left: -0.05rem;
            top: 0.10rem;
            width: .01rem;
            height: .4rem;
            background: rgba(255, 246, 205, 0.5);
        };*/
    }
    .lamp-name{
        position: absolute;
        left: 0;
        top: -0.15rem;
    }
    .item-move ul {
        position: absolute;
        left: 0;
        top: 0;
        span {
            height: 0.4rem;
            line-height: 0.4rem;
        }
        li {
            height: 0.8rem;
            line-height: 0.38rem;
        }
    }
    
</style>
