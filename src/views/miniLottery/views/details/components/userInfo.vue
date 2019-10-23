<template>
  <div class="header">
    <div class="userInfo">
      <div class="leaf">
        <img src="../img/leaf-icon.png" alt="">
        {{userInfo.leaf}}
      </div>
      <div class="phone">
        <img src="../img/phone-icon.png" alt="">
        {{userInfo.phone}}
      </div>
      <div class="lottery">
        <img src="../img/lottery-card.png" alt="">
        {{userInfo.lotteryCard}}
      </div>
    </div>
    <div class="my-log">
      我的夺宝记录
      <span class="iconfont icon-next"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'userInfo',
  props: {
    userInfo: {
      type: Object,
      default: ()=> ({})
    }
  },
}
</script>
<style lang="less" scoped>
.header {
  padding: .24rem 0;
  display: flex;
  justify-content: space-between;
  .userInfo {
    display: flex;
    justify-content: flex-start;
    font-size: .28rem;
    color: #888888;
    .leaf,.phone,.lottery {
      padding: 0 .3rem 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-right: .1rem;
        vertical-align: top;
        width: .3rem;
        height: .3rem;
      }
    }
  }
  .my-log {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: .24rem;
    .iconfont {
      font-size: .2rem;
    }
  }
}
</style>