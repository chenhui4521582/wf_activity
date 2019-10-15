<template lang="html">
    <div class="recharge-wrap">
        <div class="recharge-text"></div>
        <div class="recharge-content">
            <p class="joinbtn" @click="showMall"></p>
            <ul>
                <li>
                    <span class="line left"></span>
					活动规则
					<span class="line right"></span>
                </li>
                <li>即日起，只要在游戏平台充值任意金额，立即畅享每日幸运转盘VIP特权(30天内有效)</li>
                <li>幸运转盘每24小时刷新一次，您可以在刷新时间结束后直接参与幸运转盘，获得丰厚的游戏奖励 </li>
                <li>幸运转盘VIP特权自参与活动起30个自然日内有效，该特权将在您最后一次充值的第31天后自动解除  </li>
                <li>本活动最终解释权归官方所有</li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script>


export default {
    methods:{
        showMall(){
            location.href = '//wap.beeplaying.com/payment/#/shopping'
        }
    }
}
</script>

<style lang="less" scoped>
@import "../index.less";
</style>
