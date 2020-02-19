<template>
  <section class="task">
    <img class="title" src="./assets/activate.png" alt="">
    <p class="invite">
      邀请好友<img src="./assets/arrow.png" alt="">
    </p>
    <p>
      <span class="count">0/3</span>人
    </p>
    <div class="line" />
    <p class="tip">66%好友充值返利</p>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.task {
  width: 2.2rem;
  background: #FFE4C9;
  border-radius: .32rem;
  text-align: center;
  font-size: .2rem;
  color: #000;
  padding-bottom: 0.22rem;
  margin-bottom: .2rem;
  .line {
    width: 100;
    background: #FFBEA1;
    height: .01rem;
    transform: scaleY(.5);
    margin-top: .15rem;
  }
  .title {
    width: 1.26rem;
    margin: 0 auto;
  }
  .count {
    color: #E93232;
    font-size: .32rem;
    font-weight: bold;
  }
  .invite {
    color: #4C4A49;
    font-size: .24rem;
    font-weight: bold;
    padding: .25rem 0 .12rem;
    img {
      width: .18rem;
      margin-left: .03rem;
    }
  }
  .tip {
    padding: .14rem 0 0;
  }
}
</style>
