<template>
  <div class="goods-description">
    <div class="title">奖品详情</div>
    <div class="desc">{{details.description}}</div>
  </div>
</template>
<script>
export default {
  name: 'goodsDesc',
  props: {
    details: {
      type: Object,
      default: ()=> ({})
    },
    isAwards: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.goods-description{
  margin-top: .2rem;
  padding: .2rem;
  background:#fff;
  border-radius: .16rem;
  .title {
    margin-bottom: .12rem;
    font-size: .28rem;
    font-weight:bold;
    color: #000;
  }
  .desc {
    font-size: .24rem;
    color: #888888;
    line-height: .36rem;
  }
}
</style>