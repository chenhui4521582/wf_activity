<template>
  <div class="empty">
    <img src="../../img/empty.png" alt="">
    <p>暂无高光时刻记录哦~</p>
    <div class="check" @click="handleClick">去围观大神>></div>
  </div>
</template>
<script>
export default {
  name: 'empty',
  methods: {
    handleClick () {
      this.$router.push({
        name: 'lsVideo',
        query: {
          from: this.$route.query.from
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.empty{
  text-align: center;
  img {
    margin: 3.5rem 0 .25rem;
    width: 1.52rem;
    height: .96rem;
  }
  p {
    margin-bottom: .45rem;
    text-align: center;
    font-size: .24rem;
    color: #717171;
  }
  .check {
    text-align: center;
    font-size: .3rem;
    color: #FF2525;
    font-weight:bold;
  }
}
</style>