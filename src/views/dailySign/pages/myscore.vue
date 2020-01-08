<template>
    <div>
        <div class="activity_time">活动时间: 2019.12.25-2020.01.01</div>
        <div class="pnl_header">
            <a href="javascript:history.go(-1)" class="back">< 返回</a>
        </div>
        <img src="../images/img_dailyCard.png" class="img_dailyCard" />
        <div class="pnl pnl_score">
            <div class="wrapper">
                <div class="primary_title">我的战绩记录</div>
                <div class="pnl_myScore">
                    <ul>
                        <li>
                            <div class="title">累计打卡</div>
                            <div class="cnt"><b>{{recordInfo.days}}</b>天</div>
                        </li>
                        <li>
                            <div class="title">累计瓜分(话费券)</div>
                            <div class="cnt"><b>{{recordInfo.totalAmount}}</b>元</div>
                        </li>
                    </ul>
                </div>
                 <div class="table_wrapper">
                    <table v-if="recordInfo.recordList.length>0" cellspacing="0">
                        <thead>
                            <tr>
                                <th>参与期数</th>
                                <th>参与状态</th>
                                <th>瓜分金额</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="padding">
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr v-for="info in recordInfo.recordList">
                                <td>
                                    {{info.period}}
                                </td>
                                <td v-html="formatStatus(info.status)"></td>
                                <td>{{info.amount!=null?info.amount+'元话费券':'--'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="pnl_noData" v-else>
                        <img src='../images/bg_noDate.png' />
                        <div>暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/common/js/utils.js'
import API from '@/api';
import _get from 'lodash.get';

export default {
    data(){
        return{
           recordInfo:{
               recordList:[]
           }
        }
    },
    components:{
      
    },
    methods:{
        formatStatus(status){
            if(status==0)
            {
                return '<span>待瓜分</span>'
            }
            else if(status==1)
            {
                return '已瓜分'
            }
            else if(status==2)
            {
                return '忘瓜分'
            }
        },
        getRecordInfo(){
            this.axios.post('//ops-api.beeplaying.com/ops/daily/cost/sharing/myRecord',{
                page:1,
                pageSize:1000
            }).then(res => {
                this.recordInfo = _get(res,'data.data',{});
                //console.log('rankInfo:'+JSON.stringify(this.recordInfo));
            })
        }
    },
    mounted(){
        GLOBALS.marchSetsPoint('A_H5PT0238002764');
        this.getRecordInfo();
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
    
    .pnl_score
    {
        margin:0.55rem auto;

        .wrapper{
            padding-bottom:0.5rem;
            min-height:5rem;
            .pnl_myScore
            {
                background:url('../images/bg_score.png') no-repeat;
                background-size: cover;
                width:6.4rem;
                height:1.5rem;
                margin: 0.47rem auto 0 auto;
                li{
                    float:left;
                    width:3.2rem;
                    height:1.5rem;
                    .title{
                        color:#FFE0C9;
                        font-size:0.24rem;
                        font-weight: bold;
                        text-align: center;
                        margin-top:0.17rem;
                    }
                    .cnt{
                        color:#fff;
                        margin-top:0.32rem;
                        font-size: 0.24rem;
                        text-align: center;
                        b{
                            font-size:0.6rem;
                        }
                    }
                }
            }
            .pnl_noData
            {
                margin-top: 0.8rem;
                text-align: center;
                img{
                    width:1rem;
                }
                div{
                    margin-top:0.1rem;
                    font-size:0.22rem;
                    color:#b7b7b7;
                }
            }
            table{
                width:6.4rem;
                margin: 0.34rem auto 0 auto;
                thead{
                    th{
                        font-size:0.24rem;
                        color:#A05836;
                        text-align: center;
                        background:#FFE5C0;
                        height: 0.44rem;
                        line-height: 0.44rem;
                    }
                }
                tbody{                
                    tr{
                        &:nth-child(even)
                        {
                            background: #FDEDD3
                        }
                        td{
                            text-align: center;
                            font-size:0.22rem;
                            height:0.44rem;
                            position: relative;
                            span{
                                color:red;
                            }
                        }
                        &.padding
                        {
                            td{
                                height:0.18rem;
                            }
                        }
                    }
                }
            }
        }

        
    }
   
</style>
