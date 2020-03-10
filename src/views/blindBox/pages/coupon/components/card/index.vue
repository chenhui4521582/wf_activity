<template>
  <section class="card-wrapper">
    <img class="img" :src="info.image | imgFilter" />
    <div class="text">
      <p class="title">{{info.name}}</p>
      <p>有效期至 {{info.effectiveEndTime}}</p>
      <p class="tip">{{info.useRules}}</p>
    </div>
    <slot />
  </section>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
  .card-wrapper {
    border-radius: .16rem;
    background: #fff;
    font-size: .2rem;
    color: #999;
    padding: .3rem .25rem;
    display: flex;
    align-items: center;
    .img {
      width:1.53rem;
    }
    .text {
      flex: 1;
      padding-left:.16rem;
      .title {
        font-size: .26rem;
        color: #1B1F29;
        padding-bottom:.25rem;
      }
      .tip {
        padding-top: .13rem;
      }
    }
  }
</style>
