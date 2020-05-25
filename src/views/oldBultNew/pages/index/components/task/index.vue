<template>
  <section class="task">
    <img v-if="info.active"
      class="title"
      src="./assets/activate.png"
      alt="">
    <img v-else
      class="title"
      src="./assets/on-activate.png"
      alt="">
    <p class="invite">
      邀请<span class="count">{{info.needInviteNum}}</span>位好友
    </p>
    <div class="line" />
    <p class="tip">{{info.rate}}好友充值返利</p>
  </section>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: []
    }
  }
}
</script>

<style lang="less" scoped>
.task {
  width: 2rem;
  background: #ffe4c9;
  border-radius: 0.32rem;
  text-align: center;
  font-size: 0.2rem;
  color: #000;
  padding-bottom: 0.22rem;
  margin-bottom: 0.3rem;
  .line {
    width: 100;
    background: #ffbea1;
    height: 1px;
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
    white-space: nowrap;
    color: #4c4a49;
    font-size: 0.24rem;
    font-weight: bold;
    padding: 0.25rem 0 0.12rem;
  }
  .tip {
    padding: 0.14rem 0 0;
  }
}
</style>
