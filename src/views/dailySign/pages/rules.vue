<template>
    <div>
        <div class="pnl_header">
            <a href="javascript:history.go(-1)" class="back">< 返回</a>
        </div>
        <div class="activity_time">活动时间: {{activityInfo.timeline}}</div>
         <img src="../images/img_dailyCard.png" class="img_dailyCard" />
        <!--活动规则-->
        <div class="pnl pnl_rules">
            <div class="wrapper">
                <div class="primary_title">活动规则</div>
                <div class="title title_activity">活动玩法</div>
                <div class="rules">
                    1. 任意付费成功即打卡成功。<br/> 
                    2. 次日00:00 - 23:59（北京时间）参与瓜分。<br/> 
                    3. 当期挑战赛结束后，挑战成功用户可随机瓜分奖励金总额。 <br/> 
                    4. 奖励金总额随报名人数增加而扩大。<br/> 
                    5. 活动时间：{{activityInfo.timeline}}
                </div>
                <div class="title title_normal">常见问题</div>
                <ul class="list_questions">
                    <li>
                        <div class="question">Q：如何完成每日打卡？</div>
                        <div class="answer">A：每日23:59前任意付费视作打卡成功，在次日00:00 - 23:59回到活动页面即可参与瓜分。</div>
                    </li>
                    <li>
                        <div class="question">Q：如何获得奖励金？</div>
                        <div class="answer">A：打卡成功后次日回回到活动页面，随机瓜分本期奖励金总额。</div>
                    </li>
                    <li>
                        <div class="question">Q：奖励如何发放？</div>
                        <div class="answer">A：瓜分后立即到账。可至【我的】-【我的资产】查看。</div>
                    </li>
                    <li>
                        <div class="question">Q：如果未完成打卡，保证金退还吗？</div>
                        <div class="answer">A：瓜分时间为打卡次日00:00 - 23:59，若未在规定时间内瓜分，则打卡当期奖励失效，无法获得奖励。</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/common/js/utils.js'
import API from '@/api';
import _get from 'lodash.get'

export default {
    data(){
        return{
           activityInfo:{}
        }
    },
    components:{
      
    },
    methods:{
        getActivityInfo(){
            this.axios.post('//ops-api.beeplaying.com/ops/daily/cost/sharing/getActivityInfo').then(res => {
                this.activityInfo = _get(res,'data.data',{});
            })
        }
    },
    mounted(){
        GLOBALS.marchSetsPoint('A_H5PT0238002765');
        this.getActivityInfo();
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
    
    .pnl_rules{
        margin: 0.54rem auto 0 auto;

        .wrapper{
            padding-bottom: 0.5rem;
            
            .title_activity{
                margin-top: 0.76rem;
            }
            .rules
            {
                margin: 0.3rem auto 0 0.35rem;
                color:#666;
                font-size:0.22rem;
                line-height:0.36rem;
                width:5.84rem;
                
            }
            .title_normal{
                margin-top: 0.53rem;
            }
            .list_questions
            {
                margin: 0.18rem auto 0 0.2rem;
                li{
                    width:6.4rem;
                    .question{
                        padding-left: 0.15rem;
                        height:0.44rem;
                        background:#FDEDD3;
                        line-height: 0.44rem;
                        color:#A05836;
                        font-size:0.22rem;
                    }
                    .answer{
                        margin: 0.18rem 0 0.36rem 0;
                        padding-left: 0.15rem;
                        line-height: 0.44rem;
                        font-size:0.22rem;
                        color:#666;
                    }
                }
            }
        }
    }
   
</style>
