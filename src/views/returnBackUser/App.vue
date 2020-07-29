<template>
  <main class="return-back-user">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back">
      <img src="./img/back-icon.png" alt="">
    </div>
    <div class="problem">
      <img src="./img/problem-icon.png" alt="">
    </div>
    <article>
      <section class="cash-out">
        <section>
          <p>0</p>
          <div class="percent">
            <div class="percent-wrapper">
              <div class="percent-content"></div>
            </div>
            <div class="percent-tips">已获得1.5元</div>
          </div>
          <p>10元红包</p>
        </section>
        <p>
          <span>集满10元红包即可提现10元话费</span>
          <span class="line"></span>
          <span class="history">
            领取记录>>
          </span>
        </p>
      </section>
      <section :class="`btn-wrapper status-${status}`">
        <button type="button">{{status?'未达提现资格':'立即提现'}}</button>
      </section>
      <section>最晚提现时间为 x月x日 23:59:59 逾期作废</section>
    </article>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import { } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'returnBackUser',
  components: {
  },
  data () {
    return {
      info: {},
      isShowPop: false,
      isShowGame: false,
      popType: 'award',
      awardsInfo: {},
      status: 1
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.return-back-user {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(#b52a2e 9.2rem, #b7292e);
  padding-top: 0.01rem;
  box-sizing: border-box;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    img {
      display: block;
      margin: auto;
      width: 7.2rem;
    }
  }
  .back {
    width: 0.66rem;
    height: 0.66rem;
    font-size: 0;
    margin-top: 0.25rem;
    margin-left: 0.16rem;
  }
  .problem {
    width: 0.66rem;
    height: 0.66rem;
    font-size: 0;
    margin-top: 0.15rem;
    margin-left: 0.16rem;
  }
}
</style>
