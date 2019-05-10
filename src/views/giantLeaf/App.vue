<template>
    <div class="giant-leaf-container">
        <div class="g-head1">
            <div class="fh-box">
                <a href="javascript:" class="btn">首页</a>
                <a href="javascript:" class="btn">规则</a>
            </div>
            <div class="">dsfdsfdfs</div>
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
            <!-- <img src="./images/jp-zp.png" class="jp-zp"> -->
            <img src="./images/btn-big-dot.png" class="btn-big-dot">
            <img src="./images/icon-arrow.png" class="icon-arrow">

            <!-- 抽奖按钮 -->
            <div class="btn-start" v-if="getRecordNum == 0">点我投资{{jyzUserInfo&&jyzUserInfo.betStage}}金叶</div>
            <div class="btn-end" v-else @click.stop="circle">
                <div class="btn-end-text">
                    <p>点我投资{{jyzUserInfo&&jyzUserInfo.betStage}}金叶</p>
                    <span>抽奖次数：{{jyzUserInfo&&getRecordNum}}次</span>
                </div>
            </div>

            <div class="count-down-clock">
                <img src="./images/icon-clock.png">距离活动结束：{{activityInfo&&activityInfo.countdown}}
            </div>

        </div>
    </div>
</template>
<script type="text/javascript">
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
                activityInfo: null
            }
        },
        mounted() {
            this.getAwardsList()
            this.getUserInfo()
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
            getFinalAwards(){
                // let params = {}
                // params.data={description: "188金叶子", awardsType: "188金叶子", awardsName:"88金叶子"}
                // this.finalAwards = params.data;
                // let that = this
                // for(let i=0,len=that.awardsList.length;i<len;i++){
                //     if(params.data.awardsName == that.awardsList[i].awardsName){
                //         that.getFinalIndex = i
                //         that.finalImg = that.awardsList[i].awardsImage
                //     }
                // }
                // that.operation(that.$refs.wheel,that.getFinalIndex,function() {
                //     that.isStatr = false;
                //     that.showPop = true;
                //     setTimeout(function(){
                //         that.showPop = false
                //     },3500)
                // });

                this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/betting', {
                    value: this.jyzUserInfo.betStage
                }).then(data => {
                    let params = data.data
                    if(params.code == 200){
                        // params.data={description: "188金叶子", awardsType: "188金叶子", awardsName:"88金叶子"}
                        this.finalAwards = params.data;
                        let that = this
                        for(let i=0,len=that.awardsList.length;i<len;i++){
                            if(params.data.awardsName == that.awardsList[i].awardsName){
                                that.getFinalIndex = i
                                that.finalImg = that.awardsList[i].awardsImage
                            }
                        }
                        that.operation(that.$refs.wheel,that.getFinalIndex,function() {

                            console.log('123')
                            that.isStatr = false;
                            that.showPop = true;
                            setTimeout(function(){
                                that.showPop = false
                            },3500)
                        });
                    }else{
                        this.$toast.show({
                          message: params.message,
                          duration: 3000
                        });
                    }
                })

            },
            circle(){
                let that = this
                console.log(that.awardsList)
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
                    var soBuom = parseInt(Math.floor(Math.random() * 60) - 30);
                    /*    旋转度数 = 上次度数+  + 当前数字 * 60 +随机角度  = 最终旋转度数     */
                    wheel.style.transform = "rotate(-" + ((this.lenCloc * sun + ran * 60) + soBuom) + "deg)";
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
                    }
                })
            },
            getAwardsList(){
                this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/getActivityInfo').then(data => {
                    let params = data.data
                    if(params.code == 200){
                        // this.showPage = false
                        this.awardsList = params.data.betRuleList
                        this.activityInfo = params.data
                    }else{
                        this.$toast.show({
                          message:params.message,
                          duration: 3000
                        });
                    }
                })
            },
        }
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
        img {
            width: 0.31rem;
            height: 0.31rem;
            margin-right: 0.13rem;
        }
    }
    .fh-box {
        position: relative;
        top: 0.49rem;
        left: 0;
        .btn {
            display: block;
            width: 0.95rem;
            height: 0.58rem;
            line-height: 0.58rem;
            background:rgba(14,199,197,1);
            opacity:0.61;
            border-radius:0 0.25rem 0.25rem 0;
            font-size: 0.24rem;
            color: #FFFDF3;
            font-weight: 500;
            text-decoration: none;
            text-indent: 0.18rem;
            margin-bottom: 2px;
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
    }
    .g-head2 {
        width: 100%;
        height: 7.16rem;
        background: url(./images/head2.png) no-repeat center top;
        background-size: 100% 100%;
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
        .btn-end {
            width: 4.47rem;
            height: 1.48rem;
            font-size: 0.36rem;
            background: url(./images/btn-active.png) no-repeat;
            background-size: 100% 100%;
            text-align: center;
            margin: 5.4rem auto 0;
            .btn-end-text {
                line-height: 1;
                padding-top: 0.28rem;
            }
            span {
                font-size: 0.2rem;
                color: #511022;
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
</style>