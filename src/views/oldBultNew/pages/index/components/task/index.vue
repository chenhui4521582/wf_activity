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
      邀请好友<img src="./assets/arrow.png"
        alt="">
    </p>
    <p>
      <span class="count">{{info.invitedNum}}/{{info.needInviteNum}}</span>人
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
  width: 2.2rem;
  background: #ffe4c9;
  border-radius: 0.32rem;
  text-align: center;
  font-size: 0.2rem;
  color: #000;
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
    padding: 0.25rem 0 0.12rem;
    img {
      width: 0.18rem;
      margin-left: 0.03rem;
    }
  }
  .tip {
    padding: 0.14rem 0 0;
  }
}
</style>
