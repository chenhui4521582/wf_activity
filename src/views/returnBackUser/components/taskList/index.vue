<template>
  <article class="task-list">
    <section class="title">做任务，赚话费红包</section>
    <p class="desc">领取奖励时，随机获得1~10个话费红包，游戏任务奖励更多</p>
    <section class="task-list-wrapper">
      <ul class="list">
        <li v-for="item in list">
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
export default {
  name: 'taskList',
  components: {

  },
  data () {
    return {
      list: [
      ]
    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.task-list {
  position: relative;
  margin-top: 0.3rem;
  .title {
    width: 6.24rem;
    height: 0.7rem;
    background: url('../../img/title-bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 0.3rem;
    color: #ffd5d5;
    text-align: center;
    line-height: 0.56rem;
    margin: auto;
  }
  .desc {
    font-size: 0.2rem;
    color: #fffdfc;
    text-align: center;
    font-weight: 400;
    line-height: 0.36rem;
  }
  .task-list-wrapper {
  }
}
</style>
