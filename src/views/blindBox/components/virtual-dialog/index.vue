<template>
  <Dialog :close="true" :show="show" @onClose="dialogText.onClose" @onCancel="dialogText.onCancel"
    @onConfirm="dialogText.onConfirm" :cancel="dialogText.cancel" :confirm="dialogText.confirm"
    title="温馨提示">
    <p class="subtitle">{{dialogText.subtitle}}</p>
    <p class="content">当前金叶子账户余额为<span class="count-red">{{formatBalance}}</span></p>
    <p class="content" v-html="dialogText.des"></p>
  </Dialog>
</template>

<script>
import Dialog from '../dialog'
import { PayPoint } from '../../apis/box'
import { Pay } from '../../utils'
import { LeafsAccount, LeafsPay } from '../../apis/user'
import { setTimeout } from 'timers'

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
    },
    source: {
      type: String
    }
  },
  mounted () {
    this.getLeafsAccount()
  },
  components: {
    Dialog
  },
  methods: {
    // 格式化金叶子数量
    formatAmount (val) {
      if (!val) return 0
      if (val < 10000) return val
      return `${(val / 10000).toFixed(2)}万`
    },
    // 获取用户金叶子数
    async getLeafsAccount () {
      const { data: { data } } = await LeafsAccount()
      this.balance = data.userLeafsNum
      this.deduct = data.buyBoxNum
      this.isBalance = data.ableBuy
      if (this.isBalance) {
        GLOBALS.marchSetsPoint('A_H5PT0225002695', {
          source_address: this.source
        })
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0225002691', {
          source_address: this.source
        })
      }
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
          onClose: () => {
            this.$emit('close')
            GLOBALS.marchSetsPoint('A_H5PT0225002698', {
              source_address: this.source
            })
          },
          onConfirm: async () => {
            GLOBALS.marchSetsPoint('A_H5PT0225002696', {
              source_address: this.source
            })
            await LeafsPay()
            this.$toast.show({
              message: '支付成功',
              duration: 1000
            })
            this.$emit('updateUserInfo')
            this.$emit('close')
          },
          onCancel: () => {
            this.$emit('close')
            GLOBALS.marchSetsPoint('A_H5PT0225002697', {
              source_address: this.source
            })
          }
        }
      }
      return {
        subtitle: '您的金叶子不足',
        des: `需要<span style="color: #FF8E8E;">${this.formatDeduct}</span>金叶子才能购买1个盲盒`,
        cancel: `<span style="color: #FF8E8E;">19.9元直接购买</span>`,
        confirm: '补给金叶子',
        onClose: () => {
          this.$emit('close')
          GLOBALS.marchSetsPoint('A_H5PT0225002694', {
            source_address: this.source
          })
        },
        onConfirm: () => {
          GLOBALS.marchSetsPoint('A_H5PT0225002692', {
            source_address: this.source
          })
          location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
        },
        onCancel: async () => {
          this.$emit('close')
          GLOBALS.marchSetsPoint('A_H5PT0225002693', {
            source_address: this.source
          })
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
