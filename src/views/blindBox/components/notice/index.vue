<template>
  <Dialog :show="show" title="快递停运通知" confirm="<span style='color:#000000;font-weight: bold '>我知道了</span>" @onConfirm="close">
    <p class="notice-content">
      因全力做好配合疫情防控工作，原定2月3日恢复发货延期至2月10日陆续发货（适用于大部分商品，纸品、小家电发货时间待定）。<br>
      快递发出后因部分地区自发性封路将导致派件异常无法上门，请您理解。<br>
      感谢您等待，如有任何疑问，请及时联系在线客服。<br>
      注意：如果疫情继续恶化，发货时间会根据实际情况做出调整，届时将发布新的通知，请及时关注。<br>
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
