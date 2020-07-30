<template>
  <article class="cash-out">
    <section class="cash-out-wrapper">
      <section class="cash-out-content">
        <section class="percent-block">
          <p>0</p>
          <div class="percent">
            <div class="percent-wrapper">
              <div class="percent-content"></div>
            </div>
            <div class="percent-tips">已获得1.5元</div>
          </div>
          <p>10元红包</p>
        </section>
        <p class="other">
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
      <section class="desc">最晚提现时间为 x月x日 23:59:59 逾期作废</section>
    </section>
  </article>
</template>

<script>
export default {
  name: 'cashOut',
  components: {

  },
  data () {
    return {
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
.cash-out {
  position: relative;
  .cash-out-wrapper {
    width: 6.62rem;
    height: 2.8rem;
    margin: 1.06rem auto 0;
    background: #f35171;
    border-radius: 0.16rem;
    .percent-block {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 0.42rem;
      p {
        font-size: 0.24rem;
        color: #ffd99b;
      }
      .percent {
        position: relative;
        margin: 0 0.22rem;
        .percent-wrapper {
          position: relative;
          background: #fff;
          width: 4.36rem;
          height: 0.22rem;
          border-radius: 0.11rem;
          overflow: hidden;
          .percent-content {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            background: #ffa842;
          }
        }
        .percent-tips {
          position: absolute;
          bottom: 0.08rem;
          height: 0.78rem;
          width: 1.8rem;
          background: url('../../img/tips-bg.png') no-repeat center center;
          background-size: 100% 100%;
          line-height: 0.52rem;
          text-align: center;
          font-size: 0.22rem;
          color: #f0232c;
          font-weight: bold;
          margin-left: -0.9rem;
        }
      }
    }
    .other {
      color: #f9d4d4;
      text-align: center;
      line-height: 0.36rem;
      .line {
        width: 0.01rem;
        height: 0.16rem;
        background: #f9d4d4;
        font-size: 0;
        display: inline-block;
        margin: 0 0.12rem 0 0.1rem;
      }
      .history {
        font-size: 0.22rem;
        color: #7c1472;
        text-decoration: underline;
      }
    }
  }
  .desc {
    color: #4c1922;
    text-align: center;
  }
  button {
    background: url('../../img/grey-long-btn.png') no-repeat center center;
    background-size: 100% 100%;
    border: none;
    color: #313131;
    text-align: center;
    text-decoration: none;
    display: block;
    font-size: 0.3rem;
    width: 6.06rem;
    font-weight: bold;
    margin: 0.26rem auto 0;
    line-height: 1;
    padding: 0.2rem 0 0.42rem;
  }
}
</style>
