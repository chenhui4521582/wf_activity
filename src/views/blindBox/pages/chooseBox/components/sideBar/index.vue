<template>
  <aside class="aside">
    <div class="nav nav-reverse">
      <p @click="useCard">透视卡</p>
      <img @click="useCard"
        src="./assets/card.png">
      <span @click="useCard"
        class="count">{{userInfo && userInfo.transparentTimes || 0}}</span>
      <div class="pop"
        :class="{'active': isActive}">透视卡可偷看奖品哦~</div>
    </div>
    <div @click="toMy"
      class="nav">
      <img src="./assets/my.png">
      <p>我的</p>
    </div>
    <Dialog :show="show"
      title="透视卡"
      cancel="取消"
      :close="true"
      @onClose="close"
      @onCancel="cancel"
      @onConfirm="show=false;$emit('use')"
      :confirm="`<p style='color:#FF4141'>${userInfo && userInfo.transparentTimes ? '立即使用' : '购买一张'}</p>`">
      <p class="subtitle">您有{{userInfo && userInfo.transparentTimes || 0}}张透视卡</p>
      <p class="des">
        透视卡能帮你看出盲盒中是否是你
        心仪的商品哦。
      </p>
    </Dialog>
  </aside>
</template>

<script>
import Dialog from '../../../../components/dialog'
import { setTimeout } from 'timers'
import { Popup } from '../../../../apis/user'

export default {
  data () {
    return {
      isFirstIn: false,
      show: false,
      isActive: false
    }
  },
  async mounted () {
    // 从首页透视卡购买引导弹窗过来，弹窗提示购买
    if (this.$route.query.guide) this.show = true;
    ({ data: { data: this.isFirstIn } } = await Popup(2))
    if (this.isFirstIn) {
      setTimeout(() => {
        this.isActive = true
      }, 2000)
    }
  },
  props: {
    userInfo: {
      type: Object
    }
  },
  watch: {
    userInfo: {
      deep: true,
      handler (val, oldVal) {
        if (val.transparentTimes && val.transparentTimes !== (oldVal ? oldVal.transparentTimes : 0)) this.show = true
      }
    }
  },
  components: {
    Dialog
  },
  methods: {
    // 使用透视卡
    useCard () {
      this.show = true
      this.isActive = false
      GLOBALS.marchSetsPoint("A_H5PT0225002555", {
        awards_id: this.userInfo.transparentTimes || 0
      }) // H5平台-盲盒页面-选盲盒页面-透视卡点击
    },
    toMy () {
      this.$router.push({ name: 'My' })
      GLOBALS.marchSetsPoint("A_H5PT0225002556") // H5平台-盲盒页面-选盲盒页面-我的点击
    },
    close () {
      this.show = false
      GLOBALS.marchSetsPoint("A_H5PT0225002561") // H5平台-盲盒页面-选盲盒页面-透视卡弹窗-关闭点击
    },
    cancel () {
      this.show = false
      GLOBALS.marchSetsPoint("A_H5PT0225002560") // H5平台-盲盒页面-选盲盒页面-透视卡弹窗-取消点击
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
      position: relative;
      .pop {
        position: absolute;
        font-size: 0.22rem;
        color: #2b2e3c;
        right: 0.3rem;
        top: -0.12rem;
        width: 2.5rem;
        height: 0.58rem;
        text-align: center;
        padding-top: 0.11rem;
        transform: scale(0);
        transform-origin: right bottom;
        background: url("./assets/pop.png") no-repeat;
        background-size: 100% 100%;
        transition: transform 0.7s ease-in-out;
        &.active {
          transform: scale(1);
        }
      }
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
