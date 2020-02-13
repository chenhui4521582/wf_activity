<template>
  <section class="user">
    <img class="head" src="" alt="">
    <div class="content">
      <p class="info">
        <span>用户昵称</span>
        <span>获得了</span>
      </p>
      <p class="name">TCLLLLLLLLLLLLLLLLLLLLL</p>
      <p class="time">2020.02.20</p>
    </div>
    <img class="goods" src="" alt="">
  </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
  .user {
    padding: .26rem .22rem .25rem;
    background: #fff;
    box-sizing: border-box;
    border-radius:.16rem;
    margin-bottom: .2rem;
    display: flex;
    .head {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    .goods {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: .08rem;
      margin-top: -.11rem;
    }
    .content {
      flex: 1;
      padding-right: .5rem;
      padding-left: .1rem;
      .info {
        color: #AF8226;
        font-size: .22rem;
        display: flex;
        justify-content: space-between;
      }
      .name {
        font-size: .26rem;
        color: #000;
        padding: .14rem 0 .23rem;
      }
      .time {
        color: #888888;
        font-size: .2rem;
      }
    }
  }
</style>
