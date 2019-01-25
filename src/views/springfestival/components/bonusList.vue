<template>
    <div  v-if="show">
        <div class="pop-window">
            <div class="pop-mask"></div>
        </div>
        <div class="bonus-list">
                <div class="counttime" v-if="data">
                    {{countdownText}}
                </div>
                <!--amount: 0-->
                <!--awardName: "暂无奖励"-->
                <!--countDown: 2868189729-->
                <!--myRanking: "未上榜"-->
                <div class="mine">
                    <div class="item">
                        <div>我的排名</div>
                        <div>{{data&&data.myRanking||'未上榜'}}</div>
                    </div>
                    <div class="item">
                        <div>拥有红包</div>
                        <div>{{data&&data.amount||0}}个</div>
                    </div>
                    <div class="item">
                        <div>当前奖励</div>
                        <div>{{data&&data.awardName||'暂无奖励'}}</div>
                    </div>
                </div>
                <ul class="title">
                    <li>
                        <div>排名</div>
                        <div>红包达人</div>
                        <div>红包数</div>
                        <div>奖励</div>
                    </li>
                </ul>
                <div class="content">
                    <scroll :data="list">
                        <ul>
                            <li v-for="(item,index) in list" :class="{rank:userid==item.userId}">
                                <!--amount: 88-->
                                <!--awardName: "1000万金叶子+加赠5000元京东卡"-->
                                <!--nickname: "曹翠"-->
                                <!--ranking: 1-->
                                <!--userId: 1-->
                                <div>
                                    <img src="../images/pop/first.png" alt="" style="width: .19rem;height: .19rem"
                                         v-if="item.ranking==1">
                                    <img src="../images/pop/second.png" alt="" style="width: .19rem;height: .19rem"
                                         v-else-if="item.ranking==2">
                                    <img src="../images/pop/third.png" alt="" style="width: .19rem;height: .19rem"
                                         v-else-if="item.ranking==3">
                                    <template v-else>{{item.ranking}}</template>
                                </div>
                                <div>{{item.nickname}}</div>
                                <div>{{item.amount}}</div>
                                <div>{{item.awardName.replace('加赠','')}}</div>
                            </li>
                        </ul>
                    </scroll>
                </div>
                <div class="line line1"></div>
                <div class="line line2"></div>
                <div class="line line3"></div>
                <div class="close" @click="besure"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
    import scroll from './scroll'

    export default {
        data() {
            return {
                countdown: {
                    time: ''
                },
            }
        },
        props: {
            show: {
                type: Boolean,
                default: false
            },
            data: {
                type: Object,
                default: null
            },
            userid:{
                type:Number,
                default:0
            }
        },
        components: {
            scroll
        },
        mounted() {
        },
        computed: {
            list() {
                return this.data && this.data.rankingItemList || []
            },
            countdownText(){
                if(this.countdown.time){
                    let hourText=this.countdown.time.split(':')[0]
                    let days=Math.floor(hourText/24)
                    let hour=parseInt(this.countdown.time.split(':')[0])-Math.floor(hourText/24)*24
                    //发榜倒计时: {{countdownText}}
                    if(days<3){
                        if(days){
                            return `结算倒计时：${days}天${[hour,...this.countdown.time.split(':').splice(1)].join(':')}`
                        }else{
                            if(!this.countdown.time||this.countdown.time=='00:00:00'){
                                return `提奖时间：2月23日起奖励将在消息中心发放`
                            }else{
                                return `结算倒计时：${this.countdown.time}`
                            }
                        }
                    }else{
                        return  `结算时间：${this.data.settlementTime}`
                    }
                }else{
                    return `提奖时间：2月23日起奖励将在消息中心发放`
                }
            }
        },
        methods: {
            besure() {
                GLOBALS.buriedPoint('1207003024','春节红包-红包榜-关闭')
                this.$emit('close')
            }
        },
        // mounted(){
        //     if(this.show&&this.data){
        //         !this.countdown.time&&this.data.countDown&&GLOBALS.remainingTime(
        //             this,
        //             this.data.countDown,
        //             this.countdown
        //         );
        //     }
        // },
        watch:{
            show(val){
                if(val){
                    !this.countdown.time&&this.data.countDown&&GLOBALS.remainingTime(
                        this,
                        this.data.countDown,
                        this.countdown
                    );
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .pop-window {
        position: fixed;
        z-index: 11;
        width: 100%;
        height: 100%;
        min-height: 100%;
        max-height: 100%;
        left: 0;
        top: 0;
        .pop-close {
            width: 0.68rem;
            height: 0.68rem;
            position: absolute;
            right: -0.34rem;
            top: -0.34rem;
        }
    }

    .pop-mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .7);
        z-index: 10;
    }

    .bonus-list {
        position: fixed;
        top: 1rem;
        left: 50%;
        width: 6.8rem;
        height: 8.3rem;
        margin-left: -3.4rem;
        background: url("../images/pop/bonuslistbottom.png");
        background-size: 100% 100%;
        z-index: 11;
        .counttime {
            position: absolute;
            top: 1.22rem;
            left: 0;
            right: 0;
            text-align: center;
            font-size: .18rem;
            font-weight: bold;
            color: rgba(255, 196, 196, 1);
        }
        .mine {
            position: absolute;
            top: 2.51rem;
            left: .75rem;
            right: .81rem;
            display: flex;
            justify-content: space-between;
            .item {
                display: flex;
                flex-direction: column;
                &:before {
                    content: '';
                    position: absolute;
                    width: .05rem;
                    height: .44rem;
                    background: rgba(243, 221, 184, 1);
                    border-radius: .03rem;
                }
                div {
                    font-size: .18rem;
                    font-weight: 800;
                    margin-left: .12rem;
                    &:nth-child(1) {
                        color: rgba(255, 200, 82, 1);
                        margin-bottom: .1rem;
                    }
                    &:nth-child(2) {
                        font-weight: 400;
                        color: rgba(255, 240, 211, 1);
                    }
                }
            }
        }
        .title {
            position: absolute;
            top: 3.26rem;
            left: .81rem;
            right: .82rem;
            font-size: .2rem;
            font-weight: bold;
            color: rgba(205, 39, 39, 1);
            li {
                display: flex;
                width: 5.24rem;
                div {
                    text-align: center;
                    &:nth-child(1) {
                        width: .66rem;
                    }
                    &:nth-child(2) {
                        width: 1.2rem;
                    }
                    &:nth-child(3) {
                        width: .85rem;
                    }
                    &:nth-child(4) {
                        width: 2.45rem;
                    }
                }
            }
        }
        .content {
            position: absolute;
            height: 4.2rem;
            top: 3.59rem;
            left: .81rem;
            right: .82rem;
            font-size: .18rem;
            font-weight: bold;
            overflow: hidden;
            ul:not(.title) {
                display: flex;
                flex-direction: column;
                li {
                    height: .36rem;
                    display: flex;
                    align-items: center;
                    color: rgba(196, 119, 35, 1);
                    position: relative;

                    div {
                        text-align: center;
                        height: 100%;
                        line-height: .36rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        padding-top: 0.06rem;
                        &:nth-child(1) {
                            width: .75rem;
                        }
                        &:nth-child(2) {
                            width: 1.35rem;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-align: left;
                            text-indent: 0.05rem;
                        }
                        &:nth-child(3) {
                            width: 1rem;
                            text-align: center;
                        }
                        &:nth-child(4) {
                            width: 2.6rem;
                            text-align: left;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            padding-left: 0.1rem;
                        }
                    }
                    &:nth-child(2n+1) {
                        background: rgba(244, 214, 163, 1);
                    }
                    &.rank{
                        color:#CF2C29;
                        /*&:nth-child(1) {*/
                            /*width: .75rem;*/
                        /*}*/
                        &:before{
                            content: '';
                            position: absolute;
                            left: .05rem;
                            width:0;
                            height:0;
                            border-width:.06rem 0 .06rem .06rem;
                            border-style:solid;
                            border-color:transparent transparent transparent #CF2C29;/*透明 透明 透明 灰*/
                            /*margin:40px auto;*/
                            /*position:relative;*/
                        }
                    }
                }
            }
        }
        .close {
            position: absolute;
            left: 3.34rem;
            bottom: -.9rem;
            width: .57rem;
            height: .57rem;
            background: url("../images/pop/close.png");
            background-size: 100% 100%;
            font-size: .37rem;
            font-weight: bold;
            color: rgba(194, 38, 13, 1);
        }
        .line {
            position: absolute;
            top: 3.25rem;
            width: 1px;
            height: 4.48rem;
            background: rgba(236, 188, 108, 1);
            &.line1 {

                left: 1.47rem;
            }
            &.line2 {
                left: 2.67rem;
            }
            &.line3 {
                left: 3.58rem;
            }
        }
    }
</style>
