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
                            <div class="cnt"><b>13</b>天</div>
                        </li>
                        <li>
                            <div class="title">累计瓜分(话费券)</div>
                            <div class="cnt"><b>120.68</b>元</div>
                        </li>
                    </ul>
                </div>
                 <div class="table_wrapper">
                    <table cellspacing="0">
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
                            <tr v-for="i in 10">
                                <td>
                                    20191212
                                </td>
                                <td>已瓜分</td>
                                <td>1.5元话费券</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import utils from '@/common/js/utils.js'
import API from '@/api';
export default {
    data(){
        return{
           
        }
    },
    components:{
      
    },
    mounted(){
        
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
