<template>
  <div class="list-info">
    <div class="corner"></div>
    <div class="goods-img">
      <img :src="info.picture | filter" alt="">
    </div>
    <div class="goods-name">{{info.name}}</div>
    <div class="btn" @click="goDetail(info)">{{info.purchasePrice}}话费券抽奖</div>
  </div>
</template>
<script>
export default {
  name: 'listInfo',
  props: ['info'],
  methods: {
    goDetail(item) {
      this.$router.push({
        name: 'lotteryDetail',
        query:{
          id: item.id
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.list-info {
  float: left;
  overflow: hidden;
  position: relative;
  margin: 0 .3rem .3rem 0;
  width: 3.15rem;
  height: 3.8rem;
  background: #fff;
  border-radius: .3rem;
  &:nth-child(even) {
    margin: 0 0 .3rem 0;
  }
  .corner {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 1.07rem;
    height: .65rem;
    background: url(../../../img/lotter-list-icon.png) no-repeat center center;
    background-size: 100% 100%
  }
  .goods-img {
    margin: .2rem auto 0;
    width: 2.2rem;
    height: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .goods-name {
    margin-bottom: .1rem;
    text-align: center;
    color: #421F94;
    font-size: .28rem;
    font-weight:bold;   

  }
  .btn {
    margin: 0 auto;
    width: 2.7rem;
    height: .77rem;
    background: url(../../../img/lottery-list-btn.png) no-repeat center center;
    background-size: 100% 100%;
    font-size: .24rem;
    color: #fff;
    line-height: .77rem;
    font-weight: 600;
    text-align: center;
  }
}
</style>