<template>
  <section class="container">
    <ShortSwiper class="container-swiper" />
    <div class="content">
      <img src=""
        alt="头像">
      <span class="name">刘德华</span>
      <span class="id">ID:8888888</span>
    </div>
  </section>
</template>

<script>
import ShortSwiper from '../../../../components/shortSwiper'

export default {
  components: {
    ShortSwiper
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 2.99rem;
  background: url("./assets/bg.png") no-repeat;
  background-size: cover;
  padding-left: 0.23rem;
  position: relative;
  .container-swiper {
    position: absolute;
    left: 0.23rem;
    top: 0.12rem;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 1.02rem;
      height: 1.02rem;
      border-radius: 50%;
      margin-top: 0.24rem;
    }
    .name {
      color: #ffe3b2;
      font-weight: bold;
      font-size: 0.3rem;
      padding: 0.21rem 0 0.12rem;
    }
    .id {
      color: #ffe3b2;
      font-size: 0.24rem;
    }
  }
}
</style>
