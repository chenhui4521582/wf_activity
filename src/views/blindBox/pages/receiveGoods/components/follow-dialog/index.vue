<template>
  <Dialog :show="show"
    title="关注公众号"
    :close="true"
    @onClose="$emit('onClose')"
    @onConfirm="onConfirm"
    confirm="立即查看">
    <p class="content">
      由于活动周期有限，为了能及时跟踪
      发货信息，请您立即关注公众号。
    </p>
    <section class="icon-group">
      <div>
        <img src="./assets/wl.png"
          alt="">
        <p>追踪发货物流</p>
      </div>
      <div>
        <img src="./assets/xx.png"
          alt="">
        <p>获取优惠信息</p>
      </div>
      <div>
        <img src="./assets/sh.png"
          alt="">
        <p>专属售后保障</p>
      </div>
    </section>
  </Dialog>
</template>

<script>
import Dialog from '../../../../components/dialog'
import { WechatUrl } from '../../../../global'

export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onConfirm () {
      location.href = WechatUrl
    }
  },
  components: {
    Dialog
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 0.24rem;
  color: #888;
  padding: 0 .42rem .4rem;
  line-height: 1.6;
}
.icon-group {
  font-size: 0.18rem;
  display: flex;
  justify-content: space-between;
  padding: 0 .1rem;
  margin: 0 auto;
  img {
    width: .73rem;
  }
  p {
    color: #888888;
    font-size: .18rem;
    padding: .24rem 0 .6rem;
  }
}
</style>
