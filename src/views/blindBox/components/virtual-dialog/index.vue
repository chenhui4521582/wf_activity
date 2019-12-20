<template>
  <Dialog :close="true"
    :show="show"
    @onClose="$emit('close')"
    @onCancel="dialogText.onCancel"
    @onConfirm="dialogText.onConfirm"
    :cancel="dialogText.cancel"
    :confirm="dialogText.confirm"
    title="温馨提示">
    <p class="subtitle">{{dialogText.subtitle}}</p>
    <p class="content">当前金叶子账户余额为<span class="count-red">{{formatBalance}}</span></p>
    <p class="content"
      v-html="dialogText.des"></p>
  </Dialog>
</template>

<script>
import Dialog from '../dialog'
import { PayPoint } from '../../apis/box'
import { Pay } from '../../utils'

export default {
  data () {
    return {
      isBalance: false,
      deduct: 0,
      balance: 0
    }
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  components: {
    Dialog
  },
  methods: {
    // 格式化金叶子数量
    formatAmount (val) {
      if (val < 10000) return val
      return `${(val / 10000).toFixed(2)}万`
    }
  },
  computed: {
    // 格式化后扣除金叶子数量
    formatDeduct () {
      return this.formatAmount(this.deduct)
    },
    // 格式化后的余额
    formatBalance () {
      return this.formatAmount(this.balance)
    },
    dialogText () {
      if (this.isBalance) {
        return {
          subtitle: '确认使用金叶子购买盲盒吗？',
          des: `将扣除<span style="color: #FF8E8E;">${this.formatDeduct}</span>金叶子`,
          cancel: '取消',
          confirm: '<span style="color:#FF4141">确认</span>',
          onConfirm: () => {
            this.$emit('close')
            this.$toast.show({
              message: '购买成功',
              duration: 2000
            })
            this.$emit('updateUserInfo')
          },
          onCancel: () => {
            this.$emit('close')
          }
        }
      }
      return {
        subtitle: '您的金叶子不足',
        des: `需要<span style="color: #FF8E8E;">${this.formatDeduct}</span>金叶子才能购买1个盲盒`,
        cancel: `<span style="color: #FF8E8E;">15元直接购买</span>`,
        confirm: '补给金叶子',
        onConfirm: () => {
          location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
        },
        onCancel: async () => {
          this.$emit('close')
          const { data: { data: payInfo } } = await PayPoint(1)
          Pay.toPay({ payInfo })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  font-size: 0.24rem;
  text-align: center;
  line-height: 1.7;
  padding: 0 0.55rem;
  color: #888888;
  .subtitle {
    font-size: 0.24rem;
    color: #1a1e28;
    font-weight: bold;
    padding-bottom: 0.4rem;
  }
  .count-red {
    color: #ff8e8e;
  }
}
</style>
