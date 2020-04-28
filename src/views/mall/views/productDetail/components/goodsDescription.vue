<template>
  <div class="goods-description">
    <div class="title">商品详情</div>
    <div class="desc" v-html="currentInfo.description"></div>
  </div>
</template>
<script>
export default {
  name: 'goodsDesc',
  props: {
    currentInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
<style lang="less" scoped>
.goods-description {
  margin-top: 0.2rem;
  padding: 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  .title {
    margin-bottom: 0.12rem;
    font-size: 0.28rem;
    font-weight: bold;
    color: #000;
  }
  .desc {
    font-size: 0.24rem;
    color: #888888;
    line-height: 0.36rem;
  }
}
</style>
<style>
.goods-description .desc img {
  width: 100% !important;
  height: auto !important;
}
</style>
