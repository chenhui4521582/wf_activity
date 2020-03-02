<template>
  <Dialog :show="show"
    title="积分攻略"
    :close="true"
    @onClose="$emit('close')">
    <section class="content">
      <p class="title">兑换透视卡</p>
      1.现金购买盲盒可获得积分；<br>
      2.现金购买透视卡可获得积分；<br>
      3.不想要的盲盒奖品可换取积分；<br>
      4.每日签到可送积分，连续签到可获得更多积分，最高可获得7积分，中断则重新计算。<br>
      积分可兑换好礼，<span class="view"
        @click="viewGoods">去看看>></span>
      <div @click="open"
        class="footer">去开盲盒</div>
    </section>
  </Dialog>
</template>

<script>
import Dialog from '../../../../components/dialog'

export default {
  components: {
    Dialog
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225002944')
  },
  props: ['show'],
  methods: {
    open () {
      GLOBALS.marchSetsPoint('A_H5PT0225002946')
      this.$router.push({
        name: 'BlindBox'
      })
    },
    viewGoods () {
      GLOBALS.marchSetsPoint('A_H5PT0225002945')
      this.$emit('close')
      this.$emit('viewGoods')
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 0.24rem;
  color: #888888;
  line-height: 1.6;
  padding: 0 0.3rem 0.3rem;
  text-align: left;
  .title {
    color: #1b1f29;
    font-size: 0.26rem;
    font-weight: bold;
    padding-bottom: 0.1rem;
  }
  .view {
    color: #d1ac42;
  }
  .footer {
    width: 4.1rem;
    line-height: 0.7rem;
    background: #d1ac42;
    color: #fff;
    margin-top: 0.48rem;
    text-align: center;
    border-radius: 0.16rem;
  }
}
</style>
