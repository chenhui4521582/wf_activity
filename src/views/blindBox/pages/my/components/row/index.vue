<template>
  <section class="content">
    <img :src="icon">
    <div class="content"
      @click="$emit('jump')"
      :class="border?'border':''">
      <span>{{title}}</span>
      <span></span>
      <img src="./assets/arrow.png">
    </div>
  </section>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    },
    border: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 0.28rem;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 0 0 0.23rem;
  height: 0.85rem;
  img {
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.26rem;
    margin-bottom: 0.04rem;
  }
  .content {
    padding-right: 0.31rem;
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    position: relative;
    &.border {
      border-bottom: 0.01rem solid #bbbbbb;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 200%;
      //   height: 1px;
      //   background: #bbbbbb;
      //   transform: scale(0.5);
      //   transform-origin: 0 0 0;
      //   bottom: 0;
      // }
    }
    img {
      width: 0.16rem;
      height: 0.28rem;
      margin: 0;
    }
  }
}
</style>
