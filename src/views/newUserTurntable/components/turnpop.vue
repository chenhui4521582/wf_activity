<template>
  <div class="turnpop">
    <div class="pop-mask"></div>
    <div class="turnpop-wrap">
      <div class="turnpop-content" :class="`type-${popType}`">
        <template v-if="popType===0">
          <p>
            非常遗憾
          </p>
          <p>
            您的抽奖机会已用完
          </p>
          <p class="sub-desc">
            <template v-if="info.newUserInfo.envelopeRmb>=info.convertConsumeRmb">
              达到提现门槛，快去领话费吧
            </template>
            <template v-else>
              还差{{info.convertConsumeRmb-info.newUserInfo.envelopeRmb|floatFilter}}元就可以提现了
            </template>
          </p>
          <div class="btn" @click="close(true)">获得更多抽奖机会</div>
        </template>
        <template v-if="popType===1">
          <p>
            话费红包
            <span class="red-text">
              x{{awardsInfo.awardsEnvelopeNum}}
            </span>&nbsp;&nbsp;
            预计<span class="red-text">{{awardsInfo.awardsEnvelopeRmb}}元</span><br />
            <template v-if="awardsInfo.envelopeRmb>=info.convertConsumeRmb">
              达到提现门槛，快去领话费吧
            </template>
            <template v-else>
              还差
              <span class="red-text">
                {{info.convertConsumeRmb-awardsInfo.envelopeRmb|floatFilter}}元
              </span>
              就可以提现了
            </template>
          </p>
          <div class="btn" @click="close(true)">再抽一次</div>
        </template>
        <template v-if="popType===2||popType===3">
          <p>
            {{awardsInfo.awardsNum}}次转盘抽奖的机会<br />
            <template v-if="popType===3">
              <span>小提示：抽奖机会可以抽话费红包哦,</span><br />
              <span>每天登录都可获得1次抽奖机会~</span>
            </template>
          </p>
          <div class="btn" @click="close(popType===2)">去抽奖</div>
        </template>
        <template v-if="popType===4">
          <p>
            {{awardsInfo.awardsName}}领取成功
          </p>
          <div class="btn" @click="close(true)">去充话费</div>
        </template>
        <template v-if="popType===5">
          <p>
            系统开小车了，刷新一下吧
          </p>
          <p>
            如果刷新后仍无法领取<br />
            <span @click="close(true)">点击联系客服</span>处理
          </p>
          <div class="btn" @click="close()">去抽奖</div>
        </template>
        <template v-if="popType===6">
          <p>
            本活动仅限平台新用户参加哦<br />
            悄悄为您准备了一点小礼物，请收下
          </p>
          <div class="btn" @click="toIndex()">去游戏大厅领取</div>
        </template>
        <template v-if="popType===7">
          <p>
            本活动仅限平台新用户参加哦<br />
            更多精彩活动<br />
            去游戏大厅看看吧
          </p>
          <div class="btn" @click="toIndex()">去游戏大厅</div>
        </template>
        <template v-if="popType===8">
          <p>
            <template v-if="info.newUserInfo.envelopeRmb>=info.convertConsumeRmb">
              达到提现门槛，快去领话费吧<br />
            </template>
            <template v-else>
              还差{{info.convertConsumeRmb-info.newUserInfo.envelopeRmb|floatFilter}}元就可以提现喽<br />
            </template>
            抽奖页面可以从<br />
            “好看视频-我的-游戏大厅”进入哦
          </p>
          <div class="guide">
            <img src="../img/guide.gif" alt="">
          </div>
          <div class="btn" @click="toIndex()">去游戏大厅</div>
        </template>
      </div>
      <div class="close" @click="handleClose()"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  props: {
    popType: {
      type: Number,
      default: 0 // 0 没有机会 1 转盘抽奖 2
    },
    awardsInfo: {
      type: Object,
      default: () => ({})
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    floatFilter (val) {
      if (val.toString().length > 5) {
        return val.toFixed(2)
      }
      return val
    }
  },
  methods: {
    close (type) {
      this.$emit('on-close', type)
    },
    handleClose () {
      if (this.popType === 6 || this.popType === 7 || this.popType === 8) {
        this.back()
      } else if (this.popType === 2) {
        this.close(true)
      } else {
        this.close()
      }
    },
    toIndex () {
      WapCall.openGame('/xmWap/#/')
    },
    back () {
      let curChannel = localStorage.getItem('APP_CHANNEL')
      if (curChannel === '100039') {
        location.href = 'baiduhaokan://action/goback'
      } else {
        history.go(-1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/css/base.css';
.bgWithFull(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
}
.turnpop {
  .turnpop-wrap {
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    .turnpop-content {
      width: 5.2rem;
      height: 7.2rem;
      box-sizing: border-box;
      font-size: 0.24rem;
      font-weight: 500;
      color: #666666;
      line-height: 0.36rem;
      .btn {
        width: 2.8rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        color: #fff;
        margin: auto;
        .bgWithFull('../img/btn-bg.png');
      }
      &.type-0 {
        padding: 3.96rem 0.44rem 0;
        text-align: center;
        .bgWithFull('../img/error-bg.png');
        color: #fdfdeb;
        line-height: 0.48rem;
        p:nth-child(1) {
          font-size: 0.36rem;
        }
        p:nth-child(2) {
          font-size: 0.3rem;
        }
        p:nth-child(3) {
          color: #666;
          font-size: 0.26rem;
          margin-top: 0.3rem;
        }
        .btn {
          margin-top: 0.3rem;
        }
      }
      &.type-1 {
        .bgWithFull('../img/success-bg.png');
        p {
          color: #666;
          padding: 4.8rem 0 0;
          text-align: center;
          font-size: 0.26rem;
        }
        .btn {
          margin-top: 0.4rem;
        }
      }
      &.type-2,
      &.type-3 {
        .bgWithFull('../img/turn-times-bg.png');
        p {
          color: #666;
          text-align: center;
          font-size: 0.26rem;
        }
        .btn {
          margin-top: 0.4rem;
        }
      }
      &.type-2 {
        p {
          padding: 4.8rem 0 0.3rem;
        }
      }
      &.type-3 {
        p {
          padding: 4.6rem 0 0;
          span {
            display: inline-block;
            margin-top: 0.2rem;
            &:last-child {
              margin-top: 0;
            }
          }
        }
        .btn {
          margin-top: 0.2rem;
        }
      }
      &.type-4 {
        .bgWithFull('../img/hf-bg.png');
        p {
          color: #666;
          padding: 5rem 0 0.1rem;
          text-align: center;
          font-size: 0.26rem;
        }
        .btn {
          margin-top: 0.4rem;
        }
      }
      &.type-5 {
        width: 5.12rem;
        height: 3.46rem;
        .bgWithFull('../img/no-top-bg.png');
        p {
          color: #666;
          padding: 0.6rem 0 0.1rem;
          text-align: center;
          font-size: 0.26rem;
          line-height: 0.36rem;
          span {
            display: inline-block;
            text-decoration: underline;
            color: #d46900;
          }
        }
        p:nth-child(2) {
          padding: 0.1rem 0 0;
        }
        .btn {
          margin-top: 0.4rem;
        }
      }
      &.type-6 {
        width: 5.12rem;
        height: 4.88rem;
        .bgWithFull('../img/old-user-bg.png');
        p {
          color: #666;
          padding: 0.6rem 0 0.1rem;
          text-align: center;
          font-size: 0.26rem;
          line-height: 0.36rem;
        }
        .btn {
          margin-top: 2.2rem;
        }
      }
      &.type-7 {
        width: 5.12rem;
        height: 3.46rem;
        .bgWithFull('../img/no-top-bg.png');
        p {
          color: #666;
          padding: 0.7rem 0 0;
          text-align: center;
          font-size: 0.26rem;
          line-height: 0.36rem;
        }
        .btn {
          margin-top: 0.4rem;
        }
      }
      &.type-8 {
        width: 5.12rem;
        height: 7.46rem;
        .bgWithFull('../img/long-bg.png');
        p {
          color: #666;
          padding: 0.6rem 0 0;
          text-align: left;
          font-size: 0.26rem;
          line-height: 0.36rem;
          width: 4.2rem;
          margin: auto;
        }
        .guide {
          width: 4.2rem;
          height: 4.1rem;
          background: #ffe8c5;
          font-size: 0;
          margin: 0.2rem auto;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .btn {
          margin-top: 0.3rem;
        }
      }
      .red-text {
        color: #ff4330;
      }
    }
    .close {
      width: 0.7rem;
      height: 0.7rem;
      .bgWithFull('../img/close.png');
      margin: 0.3rem auto 0;
    }
  }
}
</style>
