<template>
  <section class="exchange-wrapper">
    <Title title="积分兑好礼" />
    <div class="content">
      <Gift class="gift"
        v-for="(item, index) in awardsList"
        :key="index"
        :exchange="item"
        :score="score" />
    </div>
    <Dialog :show="show"
      title="温馨提示"
      cancel="取消"
      :close="true"
      @onClose="close"
      @onCancel="cancel"
      @onConfirm="show=false"
      :confirm="`<p style='color:#FF4141'>${userInfo && userInfo.transparentTimes ? '如何获取积分' : '如何获取积分'}</p>`">
      <p class="subtitle">您有{{userInfo && userInfo.transparentTimes || 0}}张透视卡</p>
      <p class="des">
        透视卡能帮你看出盲盒中是否是你
        心仪的商品哦。
      </p>
    </Dialog>
  </section>
</template>

<script>
import Title from '../title'
import Gift from '../gift'
import { Exchange } from '../../../../apis/score'
import Dialog from '../../../../components/dialog'

export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    Title,
    Gift,
    Dialog
  },
  props: {
    awardsList: {
      type: Array
    },
    score: {}
  }
}
</script>

<style lang="less" scoped>
.exchange-wrapper {
  padding-bottom: 0.25rem;
  .content {
    display: flex;
    padding: 0 0.3rem;
    flex-wrap: wrap;
    .gift {
      margin-bottom: 0.2rem;
      margin-right: 0.2rem;
      &:nth-child(even) {
        margin-right: 0;
      }
    }
  }
}
</style>
