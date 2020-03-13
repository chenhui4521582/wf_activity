<template>
  <section>
    <p class="title">{{index}}.Q: {{info.problemTopic}}</p>
    <p class="content">A: {{info.problemAnswer}}</p>
  </section>
</template>

<script>
export default {
  props: ['info', 'index']
}
</script>

<style lang="less" scoped>
.title {
  color: #d1ac42;
  font-size: 0.3rem;
  padding: 0.4rem 0 0.3rem 0.3rem;
}
.content {
  color: #333333;
  font-size: 0.28rem;
  padding: 0 0.32rem 0.1rem 0.57rem;
  line-height: 1.6;
}
</style>
