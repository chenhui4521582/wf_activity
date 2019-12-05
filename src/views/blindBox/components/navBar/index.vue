<template>
  <section class="header">
    <img @click="$emit('back')"
      src="./assets/back.png"
      alt="返回">
    <span>{{title}}</span>
    <span></span>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String
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
