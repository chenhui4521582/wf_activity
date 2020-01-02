<template>
    <div>
        <div class="pnl_header">
            <a href="javascript:history.go(-1)" class="back">< 返回</a>
        </div>
        <!--打卡战况-->
        <div class="pnl pnl_rankList">
            <div class="wrapper">
                <div class="title">20191211期打卡战况</div>
                <div class="card_result">
                    <ul>
                        <li>1000人成功</li>
                        <li>998人失败</li>
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
                            <tr v-for="i in 20">
                                <td>
                                    <div class="icon">{{i}}</div>
                                </td>
                                <td>我是昵称啊</td>
                                <td>08:23:12</td>
                                <td>1.5元话费券</td>
                            </tr>
                        </tbody>
                    </table>
                    <a href="###">点击加载更多</a>
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
