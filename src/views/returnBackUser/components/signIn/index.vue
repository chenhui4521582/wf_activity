<template>
  <article class="sign-in">
    <section class="title">累计登陆，赚话费红包</section>
    <section class="sign-in-wrapper">
      <p class="desc">
        已累计登陆
        <span>3天</span>
      </p>
      <ul class="list">
        <li v-for="item in list">
          <template v-if="item.day%2">{{item.day}}天</template>
          <template v-else>{{item.day}}个 <br /><span>话费红包</span> </template>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
export default {
  name: 'signIn',
  components: {

  },
  data () {
    return {
      list: [
        { day: 1, status: 1 },
        { day: 2, status: 0 },
        { day: 3, status: 0 },
        { day: 4, status: 0 },
        { day: 5, status: 0 },
        { day: 6, status: 0 }
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
.sign-in {
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
  .sign-in-wrapper {
    width: 6rem;
    height: 2.36rem;
    margin: 0.1rem auto 0;
    background: url('../../img/sign-bg.png') no-repeat center center;
    background-size: 100% 100%;
    .desc {
      font-size: 0.3rem;
      color: #783111;
      text-align: center;
      line-height: 0.46rem;
      span {
        color: #dd2930;
        font-weight: bold;
      }
    }
  }
}
</style>
