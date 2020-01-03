<template>
  <Dialog :show="show"
    title="快递停运通知"
    confirm="<span style='color:#000000;font-weight: bold '>我知道了</span>"
    @onConfirm="close">
    <p class="notice-content">
      1月8号西藏、青海、宁夏、新疆停发 <br>
      1月11号甘肃、内蒙、黑龙江、吉林、辽宁、云南、海南停发 <br>
      1月13号贵州、司催、陕西、山西、广西停发 <br>
      1月14号其他省份停发 <br>
      2月3号开始陆续恢复发货 <br>
      请购买盲盒用户知悉。
    </p>
  </Dialog>
</template>

<script>
import Dialog from '../dialog'

export default {
  components: {
    Dialog
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  }
}
</script>

<style lang="less">
.notice-content {
  color: #888888;
  font-size: 0.24rem;
  text-align: left;
  padding: 0.3rem;
  padding-top: 0.1rem;
  line-height: 1.4;
}
</style>
