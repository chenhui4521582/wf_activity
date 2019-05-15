<template>
    <div class="giant-leaf-container">
        <div class="g-head1">
            <div class="fh-box">
                <a href="javascript:" class="btn" @click.stop="handleBack">首页</a>
                <a href="javascript:" class="btn" @click.stop="handRule">规则</a>
            </div>
            <div class="title">
                <div class="item-move" v-if="lamp.length" >
                    <ul  :class="{'anim':isMove}">
                        <li v-for="item in lamp">恭喜<span class="lamp-text">{{item.nickName}}</span>金叶奖励翻{{item.returnRatio}}倍</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="g-head2"></div>
        <div class="zp-box">
            <div class="turn-bg" :class="{'turn-animate':turnAnimate}" ref="wheel">
                <ul v-if="awardsList">
                    <li v-for="(item,index) in awardsList" :style="rotate[index]">
                        <!-- <span>{{item.awardsName}}</span><br> -->
                        <!-- <img :src="item.awardsImage | filter"> -->
                    </li>
                </ul>
            </div>
            <img src="./images/btn-big-dot.png" class="btn-big-dot">
            <img src="./images/icon-arrow.png" class="icon-arrow">
            <!-- 抽奖按钮 -->
            <div class="btn-start" v-if="getRecordNum == 0" @click.stop="circle(false)">
                <div class="btn-start-text">
                    <p v-if="jyzUserInfo&&jyzUserInfo.betStage == 0">您已经完成此活动</p>
                    <p v-else >点我投资{{jyzUserInfo&&jyzUserInfo.betStage}}金叶</p>
                </div>
            </div>
            <div class="btn-end" @click.stop="circle(true)" v-else>
                <div class="btn-end-text">
                    <p>点我投资{{jyzUserInfo&&jyzUserInfo.betStage}}金叶</p>
                    <span>抽奖次数：{{getRecordNum}}次</span>
                </div>
            </div>
            <div class="count-down-clock">
                <img src="./images/icon-clock.png" />距离活动结束：{{countTime}}
            </div>
        </div>
        <rule
            :showRule="showRule"
            @hideRule="hideRule"
        />
        <turntable-dialog
            :priceData="priceData"
            :showDialog="showDialog"
            :dialogStatus="dialogStatus"
            @hideDialog="hideDialog"
            @going="going"
        />
    </div>
</template>
<script type="text/javascript">
    import rule from './components/rule'
    import turntableDialog from './components/turntableDialog'
    export default {
        data() {
            return {
                turnAnimate :false,
                lenCloc : 0,
                isStatr : false,
                finalAwards :null, // 奖品列表
                getFinalIndex : null,
                awardsList : null,
                jyzUserInfo: null,
                activityInfo: null,
                showRule: false,
                countTime: '',
                dialogStatus: 'error',
                showDialog: false,
                priceData: {},
                isMove : false,
                lamp: [
                    // {name:'11111'},
                    // {name:'11112'},
                    // {name:'11113'},
                    // {name:'11114'},
                    // {name:'11115'}
                ],
                ylbScroll: null,
                timer1: null,
                timer2: null,
                isClicked : false,
                curChannel: localStorage.getItem('APP_CHANNEL')
            }
        },
        components: {
            rule,
            turntableDialog
        },
        computed: {
            getRecordNum() {
                if(this.jyzUserInfo) {
                    return this.jyzUserInfo.betNum - this.jyzUserInfo.betRecordNum
                }
            },  
            rotate() {
                var rotateArr = [];
                var d = 1/10;
                for(var i=0; i< 10; i++) {
                    rotateArr.push('transform: rotate(' + d * i + 'turn)');
                }
                return rotateArr;
            },
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
            getFinalAwards(){
                if(this.isClicked) return
                    this.isClicked = true

                this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/betting', {
                    value: this.jyzUserInfo.betStage
                }).then(data => {
                    let params = this.priceData = data.data
                    if(params.code == 200){
                        this.finalAwards = params.data;
                        this.jyzUserInfo.betNum = params.data .betNum
                        this.jyzUserInfo.betRecordNum = params.data.betRecordNum
                        this.jyzUserInfo.betStage = params.data.betStage
                        let that = this
                        for(let i=0,len=that.awardsList.length;i<len;i++){
                            if(params.data.returnRatio == that.awardsList[i].returnRatio){
                                that.getFinalIndex = i
                            }
                        }
                        that.operation(that.$refs.wheel,that.getFinalIndex,function() {
                            that.isStatr = false;
                            that.isClicked = false;
                            that.showDialog = true;
                            that.dialogStatus = 'success'
                            that.getAwardsList()
                            that.getUserInfo()
                        });
                    }else {
                        this.isClicked = false;
                        if(params.code == 201 || params.code == 202) {
                            this.dialogStatus = 'error'
                            this.showDialog = true;
                        }else {
                            this.$toast.show({
                                message:params.message,
                                duration: 3000
                            });
                        }

                    }
                })

            },
            circle(status){
                if(status) {
                    GLOBALS.marchSetsPoint('A_H5PT0074001128')
                }else {
                    GLOBALS.marchSetsPoint('A_H5PT0074001130')
                }
                let that = this
                if(that.awardsList && that.awardsList.length == 0){
                    that.$toast.show({
                      message: '转盘活动未开启',
                      duration: 3000
                    });
                    return
                }
                // 最终奖品
                this.getFinalAwards()
            },
            operation(wheel, ran, fn) {
                if (!this.isStatr) {
                    this.isStatr = true;
                    this.lenCloc++;
                    let sun = 9 * 360 //最小圈数 * 360
                    if (ran >= 10) {
                        ran = 0;
                    }
                    var soBuom = parseInt(Math.floor(Math.random() * 36) - 18);
                    /*    旋转度数 = 上次度数+  + 当前数字 * 36 +随机角度  = 最终旋转度数     */
                    wheel.style.transform = "rotate(-" + ((this.lenCloc * sun + ran * 36) + soBuom) + "deg)";
                    setTimeout(function () {
                        if (fn) {
                            fn();
                        }
                    }, 3000);
                }
            },
            getUserInfo(){
                this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/getUserInfo').then(res => {
                    if(res.data.code == 200) {
                        this.jyzUserInfo = res.data.data
                        if(this.jyzUserInfo && this.jyzUserInfo.betIncreaseNum != 0) {
                            this.dialogStatus = 'loader'
                            this.showDialog = true
                            GLOBALS.marchSetsPoint('A_H5PT0074001134')
                        }
                    }
                })
            },
            getAwardsList(){
                this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/getActivityInfo').then(data => {
                    let params = data.data
                    if(params.code == 200){
                        this.awardsList = params.data.ratioList
                        this.activityInfo = params.data
                        this.countDown(this.activityInfo.countdown)
                    }else{
                        this.$toast.show({
                          message:params.message,
                          duration: 3000
                        });
                    }
                })
            },
            countDown (item) {
                if(!item) return false
                let date = item / 1000
                this.timer = setInterval(() => {

                    date = date-1
                    console.log('data:', date)
                    if(date <= 0) {
                        date = 0
                        clearInterval(this.timer)
                    }
                    let day =  Math.floor(parseInt(date  / 60 / 60 / 24))
                    let hourse =  Math.floor(parseInt(date  / 60 / 60) % 24)
                    let minute =  Math.floor(parseInt(date / 60) % 60)
                    let second =  Math.floor(parseInt(date) % 60)
                    let countDay = day >= 10 ? day : '0'+day
                    let countHourse = hourse >= 10 ? hourse : '0'+hourse
                    let countMinute = minute >= 10 ? minute : '0'+minute
                    let countSecond = second >= 10 ? second : '0'+second
                    this.countTime = `${countDay}天${countHourse}时${countMinute}分${countSecond}`
                }, 1000)
            },
            handleBack () {
                GLOBALS.marchSetsPoint('A_H5PT0074001126')
                location.href = window.linkUrl.getBackUrl(this.curChannel)
                // window.history.go(-1)
            },
            handRule() {
                GLOBALS.marchSetsPoint('A_H5PT0074001127')
                this.showRule = true
            },
            hideRule () {
                this.showRule = false
            },
            hideDialog () {
                this.showDialog = false
            },
            going () {
                this.showDialog=false
                this.circle()
            },
            getNotice() {
                this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/getNoticeList').then(res => {
                    if(res.data.code == 200) {
                        this.lamp = res.data.data
                    }
                })
            }
        },
        mounted() {
            GLOBALS.marchSetsPoint('A_H5PT0074001125')
            this.getAwardsList()
            this.getUserInfo()
            this.getNotice()
             // 导航滚动
            clearInterval(this.ylbScroll)
            this.ylbScroll = setInterval(this.scroll,2500)


        },
    }
</script>
<style lang="less" scoped>
    .count-down-clock {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.24rem;
        color: #F88762;
        font-weight: bold;
        margin-top: 0.2rem;
        img {
            width: 0.31rem;
            height: 0.31rem;
            margin-right: 0.13rem;
        }
    }
    .fh-box {
        margin-top: .49rem;
        .btn {
            display: block;
            width: 0.95rem;
            height: 0.58rem;
            line-height: 0.58rem;
            background:rgba(14,199,197,.61);
            border-radius:0 0.25rem 0.25rem 0;
            font-size: 0.24rem;
            color: #FFFDF3;
            font-weight: 500;
            text-decoration: none;
            text-indent: 0.18rem;
            &:first-child {
                margin-bottom: 2px;
            }
        }
    }
    .giant-leaf-container {
        height: 100vh;
        background: #41081e;
    }
    .g-head1 {
        width: 100%;
        height: 5.66rem;
        background: url(./images/head1.png) no-repeat center top;
        background-size: 100% 100%;
        overflow: hidden;
        .title {
            margin-top: .32rem;
            height: .58rem;
            line-height: .58rem;
            color: #012E32;
            font-size: .24rem;
            text-align: center;
        }
        .item-move {
            height: .58rem;
            position: relative;
            overflow: hidden;
            transition: all .3s;
            ul {
                width: 100%;
            }
            li {
                height: .58rem;
                line-height: .62rem;
                display: flex;
                justify-content: center;
            }
        }
    }
    .g-head2 {
        width: 100%;
        height: 7.16rem;
        background: url(./images/head2.png) no-repeat center top;
        background-size: 100% 100%;
        overflow: hidden;
    }
    .lamp-text {
            display: inline-block;
            width: 1rem;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
        }
    .zp-box {
        width: 5.14rem;
        height: 5.14rem;
        position: absolute;
        left: 50%;
        top: 3.1rem;
        margin-left: -2.57rem;
        .btn-start {
            width: 4.47rem;
            height: 1.65rem;
            line-height: 1.45rem;
            text-align: center;
            background: url(./images/btn-init.png) no-repeat;
            background-size: 100% 100%;
            font-size: 0.36rem;
            font-weight:bold;
            color:rgba(81,16,34,1);
            margin: 0.48rem auto 0;
        }
        .btn-end ,.btn-start {
            width: 4.47rem;
            height: 1.48rem;
            font-size: 0.36rem;
            background: url(./images/btn-active.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            margin: 5.9rem auto 0;
            .btn-end-text {
                line-height: 1;
                padding-top: 0.28rem;
                color: #511022;
                p {
                    font-size: .36rem;
                }
                span {
                    font-size: 0.2rem;
                }
            }
            .btn-start-text{
                line-height: .7rem;
                padding-top: 0.28rem;
                color: #511022;
                p {
                    font-size: .36rem;
                }
                span {
                    font-size: 0.2rem;
                }
            }

        }
        .jp-zp {
            width: 5.14rem;
            height: 5.14rem;

        }
        
        .turn-bg {
            width: 5.14rem;
            height: 5.14rem;
            position: absolute;
            left: 0;
            top: 0;  
            transition: all 3s cubic-bezier(0.68, 0.01, 0.13, 1);
            background: url(./images/jp-zp.png) no-repeat;
            background-size: 100% 100%;
            ul {
                height: 5.14rem;
            } 
            li {
                width: 1.5rem;
                height: 5.14rem;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                color: #fff;
                font-size: .28rem;
                font-weight: bold;
                text-align: center;
            }
        }
        .btn-big-dot {
            width: 1.21rem;
            height: 1.21rem;
            position: absolute;
            left: 50%;
            top: 50%;
            margin-left: -0.605rem;
            margin-top: -0.605rem;
        }
        .icon-arrow {
            width: 0.78rem;
            height: 0.79rem;
            position: absolute;
            left: 50%;
            top: 0;
            margin-left: -0.39rem;
            margin-top: -0.43rem;
        }
    }
    .anim{
        transition: all 1s;
        margin-top: -.58rem;
    }
</style>