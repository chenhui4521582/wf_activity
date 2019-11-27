<template>
  <section class="box-wrapper">
    <div class="box">
      <img src="./assets/box-pink.png">
      <p>iPhone 11</p>
    </div>
    <p class="refresh"><img src="./assets/refresh.png">换一盒</p>
    <Side-Bar class="side-bar" />
  </section>
</template>

<script>
import SideBar from '../sideBar'

export default {
  components: {
    SideBar
  }
}
</script>

<style lang="less" scoped>
.box-wrapper {
  width: 6.52rem;
  height: 6.58rem;
  padding-top: 1.2rem;
  margin: 0 auto;
  background: url("./assets/shine.png") no-repeat;
  background-size: cover;
  position: relative;
  .side-bar {
    position: absolute;
    right: -0.34rem;
    top: 1.34rem;
  }
  .box {
    margin-bottom: 1.2rem;
    font-size: 0.3rem;
    color: #b8bbcb;
    text-align: center;
    img {
      width: 3.2rem;
      height: 3.72rem;
      display: block;
      margin: 0 auto 0.24rem;
    }
  }
  .refresh {
    font-size: 0.26rem;
    color: #b6b9cb;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 0.32rem;
      height: 0.37rem;
      margin-right: 0.2rem;
    }
  }
}
</style>
