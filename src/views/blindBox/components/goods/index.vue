<template>
  <section class="wrapper">
    <div class="des">
      <div class="goods-img">
        <img :img="img"
          alt="商品">
      </div>
      <div class="goods-info">
        <p class="goods-name">{{name}}</p>
        <div></div>
        <div class="goods-count">
          <p>数量：{{count}}个</p>
          <slot name='left' />
        </div>
      </div>
    </div>
    <slot name='right' />
  </section>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    },
    count: {
      type: Number
    },
    img: {
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  width: 6.6rem;
  box-sizing: border-box;
  background: #fff;
  border-radius: 0.16rem;
  margin: 0 auto 0.2rem auto;
  padding: 0.32rem 0.7rem 0.39rem 0.3rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  .des {
    flex: 1;
    display: flex;
    .goods-img {
      width: 1.22rem;
      height: 1.22rem;
      background: #eee;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
    .goods-info {
      font-size: 0.22rem;
      color: #bbb;
      padding-left: 0.19rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .goods-name {
        font-size: 0.28rem;
        color: #000;
      }
      .goods-count {
        text-align: left;
      }
    }
  }
}
</style>
