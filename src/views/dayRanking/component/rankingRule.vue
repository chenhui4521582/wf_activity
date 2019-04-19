<template>
  <div class="rule">
    <div class="title">活动规则</div>
    <div class="content">
      1. 幸运分获取途径：<br>
      幸运分通过单次游戏支持结果进行计算，如：使用1000金叶子玩桌球，获得1500金叶子奖励，幸运分累积1500。<br>
      2. 排名规则：<br>
      根据用户当前幸运分值进行排名<br>
      3. 奖励发放：<br>
      排行榜每小时结算一次，结算后奖励自动发放至我的资产<br>
      4. 注意：<br>
      （1）斗地主、好物拍卖、热血军团中的物资争夺玩法中所消耗的金叶子产生的返奖结果不计入幸运积分<br>
      （2）击中奖池，获得的奖池金额不计入幸运积分
    </div>
  </div>
</template>

<script>
  export default {
	name: 'ranking-rule'
  }
</script>

<style scoped lang="less">
.rule {
  .title {
    font-size: .38rem;
    color: #584942;
    text-align: center;
    margin: .25rem auto 0;
    width: 6.13rem;
    height: .44rem;
    line-height: .44rem;
    font-weight: bold;
    background: url("../images/rule-title.png") no-repeat center top / 100% 100%;
  }
  .content {
    padding: .25rem .56rem .25rem .51rem;
    line-height: .34rem;
    font-size: .24rem;
    color: #584942;
  }
}
</style>
