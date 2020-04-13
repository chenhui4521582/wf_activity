<template>
  <section class="good-info">
    <div class="img-wrapper">
      <img :src="info.picture" alt="">
    </div>
    <div class="detail-wrapper">
      <div class="top">
        <p class="name">{{info.name}}</p>
        <p class="">¥{{info.payPrice}}</p>
      </div>
      <div class="bottom">
        <p>
          <span class="label">所选型号</span><br>
          <span>{{info.specs}}</span>
        </p>
        <p>x{{info.num}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'goodInfo',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.good-info {
  padding: 0.3rem 0.2rem 0.3rem 0.3rem;
  background: #fff;
  border-radius: 0.16rem;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  .img-wrapper {
    min-width: 1.2rem;
    max-width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.16rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail-wrapper {
    flex: 1;
    display: flex;
    height: 1.2rem;
    align-content: space-between;
    flex-wrap: wrap;
    div {
      min-width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 0.24rem;
      &.top {
        color: #000;
        line-height: 0.36rem;
      }
      &.bottom {
        align-items: flex-end;
        color: #888;
        line-height: 0.36rem;
        .label {
          color: #bbb;
          font-size: 0.2rem;
        }
      }
    }
  }
}
</style>
