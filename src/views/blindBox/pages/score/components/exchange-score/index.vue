<template>
  <section class="exchange-wrapper">
    <Title title="积分兑好礼" />
    <div class="content">
      <Gift class="gift"
        v-for="(item, index) in awardsList"
        :key="index"
        :exchange="item"
        @exchange="exchange"
        :score="score" />
    </div>
    <Dialog :show="show"
      title="温馨提示"
      cancel="取消"
      :close="true"
      @onClose="close"
      @onCancel="cancel"
      @onConfirm="show=false"
      :confirm="`<p style='color:#FF4141'>${confirm}</p>`">
      <p class="subtitle">{{subTitle}}</p>
      <p class="des">当前可用积分为<span class="count">{{score}}</span></p>
      <p class="des">兑换需要<span class="count">{{score}}</span>积分</p>
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
      show: false,
      goodsScore: 0
    }
  },
  components: {
    Title,
    Gift,
    Dialog
  },
  methods: {
    exchange (val) {
      this.goodsScore = val
    }
  },
  computed: {
    isBalance () {
      return this.score - this.goodsScore >= 0
    },
    subTitle () {
      if (this.isBalance) return '确认兑换吗？'
      return '您的积分不足'
    },
    confirm () {
      if (this.isBalance) return '确认'
      return '如何获取积分'
    }
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
  .sbutitle {
    color: #1A1E28;
    font-size: .24rem;
    padding-bottom: .4rem;
  }
  .des {
    color: #888888;
    font-size: .24rem;
    line-height: 1.6;
    .count {
      color: #FF2828;
      font-size: .3rem;
    }
  }
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
