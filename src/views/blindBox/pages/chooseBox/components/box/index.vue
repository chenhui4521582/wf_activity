<template>
  <section class="box-wrapper">
    <div v-if="activity"
      class="box">
      <div class="box__img--box">
        <div class="img-wrapper">
          <img :src="isTransparent?activity.boxTransparent:activity.box">
          <img :src="isTransparent?activity.boxTransparent:activity.box">
        </div>
      </div>
      <p v-if="isTransparent">iPhone 11</p>
      <img class="box__img--goods"
        v-if="isTransparent"
        :src="goods">
    </div>
    <p @click="refresh"
      class="refresh"><img src="./assets/refresh.png">换一盒</p>
    <Side-Bar @use="useCard"
      class="side-bar" />
  </section>
</template>

<script>
import SideBar from '../sideBar'
import { boxGroup } from '../../../../config/box'

export default {
  data () {
    return {
      isTransparent: false,
      activity: null,
      goods: null
    }
  },
  mounted () {
    this.activity = boxGroup.find(res => res.type === this.$route.params.type)
  },
  methods: {
    // 使用透视卡
    useCard () {
      this.isTransparent = true
      this.goods = require('../../assets/goods.png')
    },
    // 换一盒
    refresh () {

    }
  },
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
    position: relative;
    &__img--box {
      width: 3.2rem;
      height: 3.72rem;
      display: block;
      margin: 0 auto 0.24rem;
      overflow: hidden;
      .img-wrapper {
        width: 6.4rem;
        height: 3.72rem;
        display: flex;
        img {
          width: 3.2rem;
          height: 3.72rem;
        }
      }
    }
    &__img--goods {
      width: 2.3rem;
      height: 2.3rem;
      position: absolute;
      top: 1.42rem;
      left: 2.11rem;
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
