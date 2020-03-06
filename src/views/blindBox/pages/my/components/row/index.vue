<template>
  <section class="main-content">
    <img :src="icon">
    <div class="content"
      @click="$emit('jump')"
      :class="border?'border':''">
      <span>{{title}}</span>
      <p>
        <span class="tip" v-if="tip">{{tip}}</span>
        <img src="./assets/arrow.png">
      </p>
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
    tip: {
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
.main-content {
  font-size: 0.28rem;
  color: #000;
  display: flex;
  align-items: center;
  padding: 0 0 0 0.23rem;
  padding-right: 0.31rem;
  height: 0.85rem;
  .tip {
    font-size: .22rem;
    color: #FF2828;
    padding-right: .2rem;
  }
  img {
    width: 0.36rem;
    height: 0.36rem;
    margin-right: 0.26rem;
    margin-bottom: 0.04rem;
  }
  .content {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    position: relative;
    &.border {
      border-bottom: 0.01rem solid #eee;
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
