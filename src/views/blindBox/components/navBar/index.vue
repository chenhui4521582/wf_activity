<template>
  <section class="header" v-if="isShowHeader">
    <div class="wrap">
      <img v-if="showBack" @click="$emit('back')" src="./assets/back.png" alt="返回">
    </div>
    <span>{{title}}</span>
    <span></span>
  </section>
</template>

<script>
import { isShowHeader } from '../../utils/index'
export default {
  props: {
    title: {
      type: String
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isShowHeader () {
      return isShowHeader()
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 0 0.3rem;
  justify-content: space-between;
  font-size: 0.3rem;
  align-items: center;
  color: #333;
  line-height: 1.03rem;
  img {
    width: 0.44rem;
    height: 0.44rem;
  }
}
</style>
