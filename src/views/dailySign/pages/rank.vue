<template>
    <div>
        <div class="pnl_header">
            <a href="javascript:history.go(-1)" class="back">< 返回</a>
        </div>
        <!--打卡战况-->
        <div class="pnl pnl_rankList">
            <div class="wrapper">
                <div class="title">{{rankInfo.period}}期打卡战况</div>
                <div class="card_result">
                    <ul>
                        <li>{{rankInfo.successNum}}人成功</li>
                        <li>{{rankInfo.failNum}}人失败</li>
                    </ul>
                </div>
                <div class="table_wrapper">
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
                             <tr v-for="user in rankList" :key="user.rankIndex">
                                <td>
                                    <div class="icon">{{user.rankIndex}}</div>
                                </td>
                                <td>{{user.nickname}}</td>
                                <td>{{user.applyTime}}</td>
                                <td>{{user.amount!=null?user.amount+'元话费券':'-'}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <a @click="getRankingList" v-if="showMore" href="javascript:void(0)">点击加载更多</a>
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
           page:1,
           rankInfo:{},
           rankList:[],
           showMore:true
        }
    },
    methods:{
         getRankingList(){
            this.axios.post('//ops-api.beeplaying.com/ops/daily/cost/sharing/rank/list',{
                page:this.page,
                pageSize:20
            }).then(res => {
                this.rankInfo = _get(res,'data.data',{});
                this.rankList.push(...this.rankInfo.recordRspList)
                if(this.rankInfo.recordRspList.length<20)
                {
                    this.showMore = false
                }
                else
                {
                    this.page++;
                }
            })
        }
    },
    components:{
      
    },
    mounted(){
        GLOBALS.marchSetsPoint('A_H5PT0238002766');
        this.getRankingList();
    },
}
</script>
<style lang="less">
    body{
        background: url('../images/bg_rank.png') no-repeat #71230E;
        background-size: cover;
        font-family: 'PingFang-SC-Heavy';
    }
</style>
<style lang="less" scoped>
    @import '../index.less';
    
    .pnl_rankList{
        margin-top:1.6rem;
        .table_wrapper tbody
        {
            height: 5rem;
            overflow: auto;
        }
    }
   
</style>
