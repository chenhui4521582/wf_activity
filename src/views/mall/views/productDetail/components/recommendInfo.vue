<template>
  <section class="recommend-info"
    v-if="currentInfo.comment&&currentInfo.comment.recommendRemark&&currentInfo.comment.commentNum>1">
    <div class="title-wrapper">
      <p class="tilte">商品评价<span>({{currentInfo.comment.commentNum}})</span></p>
      <p class="look-all" @click="checkAllEvaluation">查看全部<i class="iconfont icon-next"></i></p>
    </div>
    <div class="user-info">
      <img :src="(currentInfo.comment.recommendProfilePhoto||avatar)|filter" alt="">
      <span>{{currentInfo.comment.recommendNickname}}</span>
    </div>
    <p class="evaluate-info">
      {{currentInfo.comment.recommendRemark}}
    </p>
  </section>
</template>

<script>
export default {
  name: 'recommendInfo',
  props: {
    currentInfo: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.recommend-info {
  margin-top: 0.2rem;
  padding: 0.2rem;
  background: #fff;
  border-radius: 0.16rem;
  .title-wrapper {
    margin-bottom: 0.12rem;
    font-size: 0.28rem;
    font-weight: bold;
    color: #000;
    display: flex;
    justify-content: space-between;
    .tilte {
      span {
        font-size: 0.2rem;
        font-weight: 400;
      }
    }
    .look-all {
      font-size: 0.24rem;
      color: #ff7800;
      font-weight: 400;
      .iconfont {
        font-size: 0.16rem;
      }
    }
  }
  .user-info {
    font-size: 0.2rem;
    color: #bbb;
    margin-bottom: 0.12rem;
    img {
      width: 0.3rem;
      height: 0.3rem;
    }
  }
  .evaluate-info {
    color: #000;
    font-size: 0.24rem;
    line-height: 0.3rem;
  }
}
</style>
