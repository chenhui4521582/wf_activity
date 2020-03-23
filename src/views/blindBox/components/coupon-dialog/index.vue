<template>
  <Dialog :show="show"
    title="恭喜获得"
    @onClose="$emit('onClose')"
    :close="true">
    <section v-if="couponInfo">
      <img class="coupon"
        :src="couponInfo.image | imgFilter"
        alt="">
      <p class="title">{{couponInfo.name}}</p>
      <p class="tip">开盲盒100%中奖</p>
      <div class="button"
        @click="$emit('onConfirm')">立即使用</div>
    </section>
  </Dialog>
</template>

<script>
import Dialog from '../dialog'

export default {
  data () {
    return {
    }
  },
  components: {
    Dialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    couponInfo: {
      type: Object
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.coupon {
  display: block;
  width: 2.26rem;
  margin: 0 auto;
}
.title {
  color: #ff4141;
  font-size: 0.24rem;
  padding: 0.5rem 0 0.15rem;
  text-align: center;
}
.tip {
  color: #888888;
  font-size: 0.2rem;
  padding-bottom: 0.3rem;
  text-align: center;
}
.button {
  width: 4.1rem;
  line-height: 0.7rem;
  border-radius: 0.16rem;
  background: #d1ac42;
  color: #fff;
  font-size: 0.24rem;
  text-align: center;
  margin: 0 auto 0.6rem;
}
</style>
