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
      @onClose="onClose"
      @onCancel="onCancel"
      @onConfirm="onConfirm"
      :confirm="`<p style='color:#FF4141'>${confirm}</p>`">
      <p class="subtitle">{{subTitle}}</p>
      <p class="des">当前可用积分为<span class="count">{{score}}</span></p>
      <p class="des bottom">兑换需要<span class="count">{{goodsScore}}</span>积分</p>
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
      goodsScore: 0,
      id: null
    }
  },
  components: {
    Title,
    Gift,
    Dialog
  },
  methods: {
    exchange (val, id) {
      this.goodsScore = val
      this.id = id
      this.show = true
    },
    onClose () {
      this.show = false
    },
    onCancel () {
      this.show = false
    },
    async onConfirm () {
      this.show = false
      if (!this.isBalance) {
        this.$eventBus.$emit('showRule', true)
      } else {
        await Exchange(this.id)
        this.$toast.show({
          message: '兑换成功',
          duration: 2000
        })
        this.$emit('update')
      }
    }
  },
  beforeDestroy () {
    this.$eventBus.$off('showRule')
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
  .subtitle {
    color: #1a1e28;
    font-size: 0.24rem;
    padding-bottom: 0.3rem;
  }
  .des {
    color: #888888;
    font-size: 0.24rem;
    line-height: 1.4;
    &.bottom {
      padding-bottom: 0.3rem;
    }
    .count {
      color: #ff2828;
      font-size: 0.3rem;
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
