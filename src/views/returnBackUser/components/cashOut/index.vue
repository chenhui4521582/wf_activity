<template>
  <article class="cash-out">
    <section class="cash-out-wrapper">
      <section class="cash-out-content">
        <section class="percent-block">
          <p>0</p>
          <div class="percent">
            <div class="percent-wrapper">
              <div class="percent-content"
                :style="{width:`${info.userRedPack/info.convertRedPack*100}%`}"></div>
            </div>
            <div class="percent-tips"
              v-if="info.userRedPack&&info.convertRedPack-info.userRedPack>0&&!info.redPackConvert"
              :style="{left:`calc(${info.userRedPack/info.convertRedPack*100}% - 0.02rem)`}">
              已获得{{(info.userRedPack/10).toFixed(1)}}元</div>
          </div>
          <p>10元红包</p>
        </section>
        <p class="other">
          <span>集满10元红包即可提现10元话费</span>
          <span class="line"></span>
          <span class="history" @click="showHistory">
            领取记录>>
          </span>
        </p>
      </section>
      <section :class="`btn-wrapper status-${convertStatus}`">
        <button type="button" @click="convert()">{{convertStatus?'立即提现':'未达提现资格'}}</button>
      </section>
      <section class="desc">最晚提现时间为 {{info.convertEndDate}} 逾期作废</section>
    </section>
    <section class="cash-out-end" v-if="info.redPackConvert">
      <img src="../../img/cash-out.png" alt="">
    </section>
  </article>
</template>

<script>
/* eslint-disable no-undef */
import { redPackConvert } from '../../services/api'
import _get from 'lodash.get'
export default {
  name: 'cashOut',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    convertStatus () {
      return (this.info.convertRedPack - this.info.userRedPack <= 0) ? 1 : 0
    }
  },
  data () {
    return {
    }
  },
  mounted () {

  },
  methods: {
    showHistory () {
      if (this.info.userRedPack) {
        this.$emit('show-pop', 'history', null, '话费红包记录')
      } else {
        this.$toast.show({
          message: '暂无记录',
          duration: 3000
        })
      }
      GLOBALS.marchSetsPoint('A_H5PT0312003883') // H5平台-累充0用户回流活动-领取记录点击
    },
    async convert () {
      if (this.convertStatus) {
        const res = await redPackConvert()
        const code = _get(res, 'code', 0)
        const data = _get(res, 'data', 0)
        if (code === 200) {
          let award = {
            name: data.awardName
          }
          this.$emit('show-pop', 'cashout', award, '恭喜您!!')
          GLOBALS.marchSetsPoint('A_H5PT0312003884') // H5平台-累充0用户回流活动-提现点击
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cash-out {
  position: relative;
  .cash-out-wrapper {
    width: 6.62rem;
    height: 2.8rem;
    margin: 0.4rem auto 0;
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
  .status-1 {
    button {
      background-image: url('../../img/yellow-long-btn.png');
    }
  }
  .cash-out-end {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 6.62rem;
    height: 2.8rem;
    margin: 0 auto 0;
    border-radius: 0.16rem;
    background: rgba(0, 0, 0, 0.7);
    text-align: center;
    box-sizing: border-box;
    padding: 0.4rem 0;
    img {
      width: 1.74rem;
    }
  }
}
</style>
