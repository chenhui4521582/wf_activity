<template>
  <div class="list-info" @click="goDetail(info)">
    <div class="corner" v-if="info.stock>0">
      <img :src="info.cornerImg | filter" alt="">
    </div>
    <div class="sell-out" v-else></div>
    <div class="goods-img">
      <img :src="info.picture | filter" alt="">
    </div>
    <div class="goods-name">{{info.name}}</div>
    <div class="btn">{{info.purchasePrice}}话费券抽奖</div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
export default {
  name: 'listInfo',
  props: ['info'],
  methods: {
    goDetail (item) {
      console.log(item)
      GLOBALS.marchSetsPoint('A_H5PT0264003107', {
        awards_id: item.id,
        awards_name: item.name
      })
      this.$router.push({
        name: 'lotteryDetail',
        query: {
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
  margin: 0 0.3rem 0.3rem 0;
  width: 3.15rem;
  height: 3.8rem;
  background: #fff;
  border-radius: 0.3rem;
  &:nth-child(even) {
    margin: 0 0 0.3rem 0;
  }
  .corner {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 1.07rem;
    height: 0.65rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .sell-out {
    position: absolute;
    left: 0.24rem;
    top: 0.16rem;
    z-index: 2;
    width: 1.1rem;
    height: 0.94rem;
    background: url(../../../img/sell-out.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .goods-img {
    margin: 0.2rem auto 0;
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
    margin-bottom: 0.1rem;
    text-align: center;
    color: #421f94;
    font-size: 0.28rem;
    font-weight: bold;
  }
  .btn {
    margin: 0 auto;
    width: 2.7rem;
    height: 0.77rem;
    background: url(../../../img/lottery-list-btn.png) no-repeat center center;
    background-size: 100% 100%;
    font-size: 0.24rem;
    color: #fff;
    line-height: 0.77rem;
    font-weight: 600;
    text-align: center;
  }
}
</style>