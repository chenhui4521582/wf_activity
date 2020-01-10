<template>
    <div>
        <img src="../images/img_float.png" class="img_float" />
        <div class="activity_time">活动时间: {{activityInfo.timeline}}</div>
        <div class="pnl_header">
            <a href="javascript:history.go(-1)" class="back">< 返回</a>
            <a href="./dailySign.html#/score" class="score"><i class="icon_score"></i>我的战绩</a>
        </div>
        <img src="../images/img_dailyCard.png" class="img_dailyCard" />
        <!--瓜分奖励-->
        <div v-if="activityInfo.status==1" class="pnl_getAwards">
            <div class="pnl_awards_title">{{activityInfo.period}}期</div>
            <img src="../images/img_btnAwards.png" @click="doSharing()" class="btn_awards" />
            <div class="pnl_awardState">
                <div class="pnl_price">
                    <div class="price">{{activityInfo.amount}}元</div>
                    <div class="tips">奖励金总额(话费券)</div>
                </div>
                <div class="pnl_users">
                    <div class="userCount">{{activityInfo.applyNum}}人</div>
                    <div class="tips">报名人数</div>
                </div>
            </div>
        </div>
        <!--活动状态-->
        <div v-else class="pnl_getAwards">
            <div class="pnl_awards_title">{{activityInfo.period}}期<span>瓜分奖励金总额（话费券）</span></div>
            <div class="pnl_sum_price">
                <div class="sumPrice"><b>{{activityInfo.amount}}</b>元</div>
                <div class="signCount">已有<span>{{activityInfo.applyNum}}</span>人报名</div>
            </div>
            <div v-if="activityInfo.state == 0" class="btn_unstart">活动即将开启</div>
            <div v-if="activityInfo.state == 2" class="btn_unstart">活动已结束</div>
            <a v-if="activityInfo.state == 1 && !activityInfo.apply" @click="event('A_H5PT0238002760')" href="/xmWap/#/payment/" class="btn_start">立即打卡参与瓜分</a>
            <div v-if="activityInfo.state == 1 && activityInfo.apply" class="btn_success">报名成功</div>
            <div class="start_timer" v-if="countTime">
                {{activityInfo.state==1 ? '本期瓜分倒计时':'打卡开启倒计时'}} {{countTime}}
            </div>
        </div>
        <!--三步玩转打卡瓜分-->
        <div class="pnl_desc">
            <a href="./dailySign.html#/rules">查看活动规则>></a>
        </div>
        <!--打卡战况-->
        <div v-if="rankInfo.recordRspList.length>0" class="pnl pnl_rankList">
            <div class="wrapper">
                <div class="title">{{rankInfo.period}}期打卡战况</div>
                <div class="card_result">
                    <ul>
                        <li>{{rankInfo.successNum}}人成功</li>
                        <li>{{rankInfo.failNum}}人失败</li>
                    </ul>
                </div>
                <table cellspacing="0">
                    <thead>
                        <tr>
                            <th>排名</th>
                            <th>昵称</th>
                            <th>打卡时间</th>
                            <th>瓜分金额</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="padding">
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr v-for="user in rankInfo.recordRspList" :key="user.rankIndex">
                            <td>
                                <div class="icon">{{user.rankIndex}}</div>
                            </td>
                            <td>{{user.nickname}}</td>
                            <td>{{user.applyTime}}</td>
                            <td>{{user.amount!=null?user.amount+'元话费券':'-'}}</td>
                        </tr>
                    </tbody>
                </table>
                <a href="./dailySign.html#/rank">查看全部排行>></a>
            </div>
        </div>
        <!--弹框-->
        <pop :awardInfo="awardInfo" :isShowPop="isShowPop" />
    </div>
</template>
<script>
import utils from '@/common/js/utils.js'
import pop from '../components/pop'
import _get from 'lodash.get'
import { activityInfo } from '../../catact/utils/api'
export default {
    name : 'index',
    data(){
        return{
           activityInfo:{},
           rankInfo:{
               recordRspList:[]
           },
           awardInfo:{},
           isShowPop:false,
           countTime:null
        }
    },
    components:{
      pop
    },
    methods:{
        event(id){
            GLOBALS.marchSetsPoint(id)
        },
        doSharing(){
            GLOBALS.marchSetsPoint('A_H5PT0238002761')
            this.axios.post('//ops-api.beeplaying.com/ops/daily/cost/sharing/sharing').then(res => {
                if(res.data.code != 200)
                {
                     this.$toast.show({
                      message: res.data.message,
                      duration: 3000
                    });
                }
                else
                {
                    this.awardInfo = _get(res,'data.data',{});
                    this.isShowPop = true;
                }
                
            })
        },
        getActivityInfo(){
            this.axios.post('//ops-api.beeplaying.com/ops/daily/cost/sharing/getActivityInfo').then(res => {
                this.activityInfo = _get(res,'data.data',{});
                this.countDown(this.activityInfo.countdown);
            })
        },
        getRankingList(){
            this.axios.post('//ops-api.beeplaying.com/ops/daily/cost/sharing/rank/list',{
                page:1,
                pageSize:10
            }).then(res => {
                this.rankInfo = _get(res,'data.data',{});
            })
        },
        countDown(item) {
            if (!item) return false
            let date = item / 1000
            this.timer = setInterval(() => {
                date = date - 1
                if (date <= 0) {
                    date = 0
                    clearInterval(this.timer)
                }
                let day = Math.floor(date / 86400)
                let hour = Math.floor(parseInt(date / 60 / 60) % 24)
                let minute = Math.floor(parseInt(date / 60) % 60)
                let second = Math.floor(date % 60)
                // let countDay = day >= 10 ? day : '0' + day
                let countHour = hour >= 10 ? hour : '0' + hour
                let countMinute = minute >= 10 ? minute : '0' + minute
                let countSecond = second >= 10 ? second : '0' + second
                if (day >= 2) {
                    this.countTime = 0
                } else if (day > 0) {
                    this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
                } else {
                    this.countTime = `${countHour}:${countMinute}:${countSecond}`
                }
            }, 1000)
      }
    },
    mounted(){
        GLOBALS.marchSetsPoint('P_H5PT0238',{
            source_address:document.referrer
        })
        //获取活动信息
        this.getActivityInfo();
        //获取排行榜信息
        this.getRankingList();
        //
        //this.doSharing();
    },
}
</script>
<style lang="less">
    body{
        background: url('../images/bg_homeBack.png') no-repeat #71230E;
        background-size: cover;
        font-family: 'PingFang-SC-Heavy';
    }
</style>
<style lang="less" scoped>
    @import '../index.less';
    
    .pnl_getAwards
    {
        position: relative;
        background:url('../images/bg_getAwards.png') no-repeat;
        background-size: cover;
        width:6.98rem;
        height:4.78rem;
        margin: 0.2rem auto;
        overflow: hidden;

        .pnl_awards_title
        {
            background:url('../images/bg_awards_title.png') no-repeat;
            background-size: cover;
            width: 5.1rem;
            height: 0.72rem;
            margin: 0.32rem auto 0 auto;
            text-align: center;
            color: #fff;
            font-size:0.22rem;
            box-sizing: border-box;
            padding-top:0.26rem;

            span{
                display: inline-block;
                text-indent: 0.2rem;
                font-size:0.24rem;
            }
        }

        .pnl_sum_price
        {
            background: url('../images/bg_price.png') no-repeat;
            background-size: cover;
            width: 5.23rem;
            height: 2.08rem;
            margin: 0.12rem auto 0 auto;
            text-align: center;
            box-sizing: border-box;
            padding-top:0.65rem;

            .sumPrice
            {
                font-size:0.3rem;
                color:#FF0000;
                b{
                    font-size:0.72rem;
                }
            }

            .signCount
            {
                margin-top: 0.15rem;
                font-size:0.22rem;
                color:#C7563B;
                span{
                    color:#FF0000;
                }
            }
        }

        .btn_unstart,.btn_start,.btn_success
        {
            width:3.4rem;
            height:0.86rem;
            background: url('../images/btn_gray.png') no-repeat;
            background-size: cover;
            line-height: 0.86rem;
            box-sizing: border-box;
            font-size:0.32rem;
            color:#555;
            font-weight: bold;
            margin: 0 auto;
            text-align: center;
            display: block;

            &.btn_start{
                background-image: url('../images/btn_gold.png');
                color:#FF001E;
            }
            &.btn_success
            {
                background-image: url('../images/btn_success.png');
                color:#fff;
            }
        }
        
        .start_timer
        {
            font-size:0.22rem;
            color:#fff;
            text-align: center;
            margin: 0.15rem auto 0 auto;
        }

        .btn_awards
        {
            display: block;
            width:1.9rem;
            margin: 0.2rem auto 0 auto;
            animation: bigger 1.2s linear infinite;
        }
        .pnl_awardState
        {
            position: absolute;
            background: url('../images/bg_awardState.png') no-repeat;
            background-size: cover;
            width: 5.1rem;
            height: 0.98rem;
            margin: 0 auto;
            left: 0.95rem;
            bottom: 0.4rem;

            .pnl_price
            {
                position: relative;
                left: 0.1rem;
                top: 0.05rem;
                width:2.6rem;
                height:0.85rem;
                text-align: center;
                .price{
                    margin: 0.1rem 0 0.05rem 0;
                    color:#FFEA00;
                    text-align: center;
                    font-size:0.36rem;
                }
                .tips{
                    font-size:0.22rem;
                    color:#fff;
                    text-align: center;
                }
            }
            .pnl_users
            {
                position: absolute;
                width:1.5rem;
                height:0.85rem;
                right: 0.4rem;
                top: 0.05rem;
                text-align: center;

                .userCount{
                    margin: 0.1rem 0 0.1rem 0;
                    color:#fff;
                    font-size:0.3rem;
                }
                .tips{
                    font-size:0.22rem;
                    color:#fff;
                }
            }
        }
    }
    .pnl_desc
    {
        position: relative;
        background: url('../images/bg_desc.png') no-repeat;
        background-size: cover;
        margin:0.33rem auto;
        height:3.3rem;
        width:6.8rem;

        a{
            position: absolute;
            font-size:0.24rem;
            color:#E32601;
            bottom:0.25rem;
            width:100%;
            text-align: center;
        }
    }
    
</style>
