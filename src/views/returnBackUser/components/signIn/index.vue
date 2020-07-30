<template>
  <article class="sign-in">
    <section class="title">累计登陆，赚话费红包</section>
    <section class="sign-in-wrapper">
      <p class="desc">
        已累计登陆
        <span>3天</span>
      </p>
      <ul class="list">
        <li v-for="item in list" :class="`type-${item.day}${item.status}`">
          <p>
            <template v-if="item.day%2"><span class="fs24">{{item.day}}天</span></template>
            <template v-else-if="item.status===2">
              <span class="fs18">红包</span> <br /><span class="fs18">已领取</span>
            </template>
            <template v-else>
              <span class="fs20">{{item.day}}个</span> <br /><span class="fs18">话费红包</span>
            </template>
          </p>
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
        { day: 1, status: 2 },
        { day: 2, status: 1 },
        { day: 3, status: 1 },
        { day: 4, status: 1 },
        { day: 5, status: 1 },
        { day: 6, status: 1 }
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
    width: 6.62rem;
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
    .list {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      li {
        width: 0.86rem;
        height: 1.16rem;
        white-space: nowrap;
        font-weight: 400;
        position: relative;
        margin: 0.36rem 0.1rem 0;
        p {
          position: absolute;
          bottom: 0.1rem;
          width: 100%;
          line-height: 1;
        }
        .fs18 {
          font-size: 0.18rem;
        }
        .fs20 {
          font-weight: bold;
          font-size: 0.2rem;
        }
        .fs24 {
          font-size: 0.24rem;
        }
        background: no-repeat center center;
        background-size: 100% 100%;
        &.type-11,
        &.type-31,
        &.type-51 {
          color: #4e4c4c;
          background-image: url('../../img/odd-grey-bg.png');
        }
        &.type-12,
        &.type-32,
        &.type-52 {
          color: #e3292a;
          background-image: url('../../img/odd-orange-bg.png');
        }
        &.type-20,
        &.type-40,
        &.type-60 {
          color: #4e4c4c;
          background-image: url('../../img/even-grey-bg.png');
        }
        &.type-21,
        &.type-41,
        &.type-61 {
          color: #fff;
          background-image: url('../../img/even-red-bg.png');
        }
        &.type-22,
        &.type-42,
        &.type-62 {
          color: #e3292a;
          background-image: url('../../img/even-orange-bg.png');
        }
      }
    }
  }
}
</style>