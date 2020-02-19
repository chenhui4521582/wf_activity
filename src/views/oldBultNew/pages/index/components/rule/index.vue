<template>
  <Modal :show="show" @onClose="$emit('onClose')">
    <p class="title">玩法说明</p>
    <p class="button" @click="$emit('onClose')">知道了</p>
  </Modal>
</template>

<script>
import Modal from '../../../../components/modal'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  padding-top: .42rem;
  text-align: center;
  font-size: .28rem;
  color: #000000;
  font-weight: bold;
}
.content {
  padding: .24rem .44rem .3rem;
  font-size: .24rem;
  color: #888888;
}
.button {
  font-size: .24rem;
  color: #FF4141;
  border-top: 1px solid #EEEEEE;
  padding: .3rem 0 .37rem;
  text-align: center;
}
</style>
