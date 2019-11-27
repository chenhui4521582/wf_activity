<template>
  <aside class="aside">
    <div @click="useCard"
      class="nav nav-reverse">
      <p>透视卡</p>
      <img src="./assets/card.png">
      <span class="count">2</span>
    </div>
    <div @click="$router.push({name:'My'})"
      class="nav">
      <img src="./assets/my.png">
      <p>我的</p>
    </div>
    <Dialog :show="show"
      title="透视卡"
      cancel="取消"
      confirm="<p style='color:#FF4141'>购买一张</p>">
      <p class="subtitle">您有2张透视卡</p>
      <p class="des">
        透视卡能帮你看出盲盒中是否是你
        心仪的商品哦。
      </p>
    </Dialog>
  </aside>
</template>

<script>
import Dialog from '../../../../components/dialog'

export default {
  data () {
    return {
      show: true
    }
  },
  components: {
    Dialog
  },
  methods: {
    // 使用透视卡
    useCard () {

    }
  }
}
</script>

<style lang="less" scoped>
.aside {
  width: 1.2rem;
  height: 3.4rem;
  border-top-left-radius: 1.2rem;
  border-bottom-left-radius: 1.2rem;
  background: rgba(62, 67, 87, 1);
  border: 0.02rem solid rgba(107, 110, 130, 1);
  // box-shadow: 0px 1px 30px 0px rgba(75, 64, 230, 0.5);
  .subtitle {
    font-size: 0.24rem;
    color: #1a1e28;
    text-align: center;
    font-weight: bold;
  }
  .des {
    padding: 0.34rem 0.56rem;
    color: #888;
    font-size: 0.24rem;
    text-align: left;
    line-height: 1.6;
  }
  .nav {
    height: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding-top: 0.2rem;
    position: relative;
    .count {
      color: #ff4141;
      font-weight: bold;
      font-size: 0.3rem;
      position: absolute;
      top: 0.4rem;
      right: 0.15rem;
    }
    &-reverse {
      flex-direction: column-reverse;
      padding-bottom: 0.2rem;
      padding-top: 0;
    }
    img {
      width: 0.6rem;
    }
    p {
      color: #ecd69a;
      font-weight: bold;
      font-size: 0.26rem;
      padding-top: 0.06rem;
    }
  }
}
</style>
