<template>
  <section class="card">
    <img v-if="info.awardsImage"
      :src="info.awardsImage | imgFilter"
      alt="">
    <div class="detail">
      <p>{{type[info.type] || info.awardsName}}</p>
      <p class="score">+{{info.score}}</p>
      <p class="time">{{info.createTime}}</p>
    </div>
  </section>
</template>

<script>

export default {
  props: ['info', 'type']
}
</script>

<style lang="less" scoped>
.card {
  display: flex;
  border-bottom: 1px solid #eeeeee;
  img {
    width: 1.66rem;;
  }
  .detail {
    flex: 1;
    padding: 0.3rem 0.25rem 0 .05rem;
    font-size: 0.28rem;
    color: #1b1f29;
    text-align: left;
    .time {
      font-size: 0.2rem;
      color: #999999;
      padding-top: 0.02rem;
      padding-bottom: 0.25rem;
    }
    .score {
      font-size: 0.32rem;
      color: #ff2828;
      margin-top: -0.04rem;
      text-align: right;
    }
  }
}
</style>
