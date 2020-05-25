<template>
  <section class="task">
    <p class="invite">邀请好友完成</p>
    <p class="invite">
      新手任务<img src="./assets/arrow.png"
        alt="">
    </p>
    <p class="get">
      可得<span class="count">1000</span>金叶
    </p>
    <div class="line" />
    <p class="tip">共获得{{price}}金叶</p>
  </section>
</template>

<script>
export default {
  filters: {
    // 格式化金叶子数量
    formatAmount (val) {
      if (!val) return 0
      if (val < 10000) return val
      return `${(val / 10000).toFixed(2)}万`
    }
  },
  props: {
    price: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.task {
  width: 2rem;
  background: rgba(255, 228, 201, 0.5);
  border-radius: 0.32rem;
  text-align: center;
  font-size: 0.2rem;
  color: #000;
  padding-top: 0.31rem;
  padding-bottom: 0.22rem;
  margin-bottom: 0.2rem;
  .line {
    width: 100;
    background: #ffbea1;
    height: 0.01rem;
    transform: scaleY(0.5);
    margin-top: 0.15rem;
  }
  .title {
    width: 1.26rem;
    margin: 0 auto;
  }
  .count {
    color: #e93232;
    font-size: 0.32rem;
    font-weight: bold;
  }
  .invite {
    color: #4c4a49;
    font-size: 0.24rem;
    font-weight: bold;
    img {
      width: 0.18rem;
      margin-left: 0.03rem;
    }
  }
  .get {
    padding-top: 0.14rem;
  }
  .tip {
    padding: 0.14rem 0 0;
  }
}
</style>
