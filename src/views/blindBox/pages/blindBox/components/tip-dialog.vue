<template>
  <Dialog :show="show"
    class="tip-dialog"
    title="温馨提示"
    :close="true"
    confirm="<span style='color:#FF4141'>我也试试</span>"
    cancel="去选盒"
    @onCancel="onCancel"
    @onConfirm="toChoose"
    @onClose="onClose">
    <div class="subtitle">
      该盒子正在被透视<br>请选择其他盒子~
    </div>
    <p class="content">
      透视卡能帮你看出盲盒中是否是你心仪的商品哦。
    </p>
  </Dialog>
</template>

<script>
import Dialog from '../../../components/dialog'
import { ChangeOne } from '../../../apis/box'

export default {
  props: {
    show: {
      default: false,
      type: Boolean
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225002687')
  },
  components: {
    Dialog
  },
  methods: {
    async toChoose () {
      GLOBALS.marchSetsPoint('A_H5PT0225002689')
      const { data: { data } } = await ChangeOne()
      const sort = data.sort
      const type = data.newColor
      this.$router.push({
        name: 'ChooseBox',
        params: {
          type
        },
        query: {
          sort,
          guide: true
        }
      })
    },
    onCancel () {
      GLOBALS.marchSetsPoint('A_H5PT0225002688')
      this.$emit('close')
    },
    onClose () {
      this.$emit('close')
      GLOBALS.marchSetsPoint('A_H5PT0225002690')
    }
  }
}
</script>

<style lang="less" scoped>
.tip-dialog {
  line-height: 1.6;
  .subtitle {
    color: #1a1e28;
    font-size: 0.24rem;
    text-align: center;
  }
  .content {
    color: #888888;
    font-size: 0.24rem;
    text-align: left;
    padding: 0.2rem 0.56rem 0;
  }
}
</style>
