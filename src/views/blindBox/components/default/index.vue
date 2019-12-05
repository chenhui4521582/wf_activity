<template>
  <section class="wrapper">
    <img src="./assets/default.png">
    <p class="title">{{title}}</p>
    <div class="button"
      @click="$emit('onConfirm')">{{button}}</div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '什么记录都没有~'
    },
    button: {
      type: String,
      default: '去抽盲盒'
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding-top: 1.26rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 1.21rem;
    height: 0.78rem;
  }
  .title {
    font-size: 0.24rem;
    color: #888;
    padding: 0.29rem 0 0.97rem;
  }
  .button {
    padding: 0 0.64rem;
    border-radius: 0.16rem;
    background: #d1ac42;
    color: #fff;
    line-height: 0.56rem;
  }
}
</style>
