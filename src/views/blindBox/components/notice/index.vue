<template>
  <Dialog :show="show" title="快递停运通知"
    confirm="<span style='color:#000000;font-weight: bold '>我知道了</span>" @onConfirm="close">
    <p class="notice-content">
      因疫情暂未好转，平台将全力做好疫情防控工作，最新发货通知如下：<br />
      湖北全省快递暂时无法发出，其他城市根据当地疫情变化，以快递公司当天揽件情况安排，暂时无法保证发货和到货时间。<br />
      快递恢复后，我们将第一时间处理订单，请您理解。<br />
      感谢您等待，如有任何疑问，请及时联系在线客服。<br />
      注意：如果疫情继续恶化，发货时间会根据实际情况做出调整，届时将发布新的通知，请及时关注。
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
