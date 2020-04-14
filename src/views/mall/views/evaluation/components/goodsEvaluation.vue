<template>
  <div class="goods-evaluation">
    <div class="goods-img">
      <img src="../img/good-img.png" alt="">
    </div>
    <div class="desc">
      <div class="goods-name">Apple/苹果iPhone11 128G 国行 全网通...</div>
      <div class="group">
        <div class="label">描述相符</div>
        <div class="star" v-for="(item, index) in 5" :key="index" @click="handleGoods(index)">
          <img src="../img/star.png" alt="" v-if="index > goodsIndex">
          <img src="../img/star-active.png" alt="" v-else>
        </div>
        <div class="text">{{evaluationText[goodsIndex]}}</div>
      </div>
      <div class="group">
        <div class="label">发货速度</div>
        <div class="star" v-for="(item, index) in 5" :key="index" @click="handleExpressage(index)">
          <img src="../img/star.png" alt="" v-if="index > expressageIndex">
          <img src="../img/star-active.png" alt="" v-else>
        </div>
        <div class="text">{{evaluationText[expressageIndex]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsEvaluation',
  data: () => ({
    goodsIndex: 4,
    expressageIndex: 4,
    evaluationText: ['非常差', '差', '一般', '好', '非常好']
  }),
  methods: {
    handleGoods(index) {
      this.goodsIndex = index
      this.$emit('goodsStars', this.goodsIndex + 1)
    },
    handleExpressage(index) {
      this.expressageIndex = index
      this.$emit('sendStars', this.expressageIndex + 1)
    }
  }
}
</script>
<style lang="less" scoped>
.goods-evaluation {
  margin-bottom: .2rem;
  padding: .3rem .3rem 0;
  background: #ffffff;
  border-radius: .16rem;
  display: flex;
  justify-content: flex-start;
  .goods-img {
    margin-right: .16rem;
    width: 1.2rem;
    height: 1.2rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .desc {
    .goods-name {
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: .25rem;
      font-size: .24rem;
      color: #000;
      white-space: nowrap;
    }
    .group {
      margin-bottom: .26rem;
      display: flex;
      justify-content: flex-start;
      font-size: .24rem;
      color: #BBBBBB;
      .label {
        margin-right: .23rem;
        height: .34rem;
        line-height: .44rem;
      }
      .star {
        margin-right: .17rem;
        width: .36rem;
        height: .34rem;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .text {
        height: .34rem;
        line-height: .44rem;
      }
    }
  }
}
</style>