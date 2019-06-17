<template>
  <transition name="scalc">
    <div class="dialog" @touchmove.prevent v-if="showDialog">
      <div class="mask"></div>
      <div class="dialog-loader" v-if="dialogStatus== 'loader'">
        <div class="bg">
          <img src="../images/pop_tv.png" alt="">
        </div>
        <div class="content">
          <p>
            {{jyzUserInfo.betRecordNum ?'新增':'免费'}}<span>{{jyzUserInfo.betIncreaseNum}}</span> 次金叶翻倍
          </p>
          <div class="btn" @click="going(true)">
            翻倍{{jyzUserInfo.betStage}}金叶
          </div>
        </div>
        <div class="closed" @click="hideDialog"></div>
      </div>
      <div class="dialog-success" v-if="dialogStatus == 'success'">
        <div class="bg">
          <img src="../images/congratulations.png" alt="">
        </div>
        <div class="content">
          <div class="price">
            <img :src="priceData.data.awardsImg | filter">
            <!-- <img :src="priceData.data.awardsImg"> -->
          </div>
          <p class="explain">金叶翻{{priceData.data&&priceData.data.returnRatio}}倍,共<span>得{{priceData.data&&priceData.data.awardsAmount}}金叶</span></p>
          <div v-if="priceData.data.betStage>0" class="btn" @click="going(true)">
            继续翻倍{{priceData.data.betStage }}金叶
          </div>
          <div v-else class="btn" @click="going(false)">
            知道了
          </div>
          <p class="other" v-if="priceData.data.betStage>0">最多得{{priceData.data.betStage * 8 > 10000? Math.floor(priceData.data.betStage * 8 / 1000) / 10+'万' : priceData.data.betStage * 8}}金叶</p>
        </div>
        <div class="closed" @click="hideDialog"></div>
      </div>
      <div class="dialog-error" v-if="dialogStatus == 'error'">
        <div class="bg">
          <img src="../images/sorry.png" alt="">
        </div>
        <div class="content">
          <div class="no-yezi" v-if="priceData.code == 202 ">
            <div class="price">
              <img src="../images/dialog-error-icon1.png" alt="">
            </div>
            <div class="explain">
              <p>
                金叶不足
              </p>
              差<span>{{priceData.message}}金叶</span>可继续翻倍
              <br>
              最多得<span>{{jyzUserInfo.betStage * 8 > 10000? Math.floor(jyzUserInfo.betStage * 8 / 1000) / 10 + '万' : jyzUserInfo.betStage * 8}}金叶</span>
            </div>
            <div class="btn" @click="goShopping(true)">
              充{{Math.ceil(parseInt(priceData.message) / 1000)}}元补金叶
            </div>
          </div>
          <div class="no-time" v-if="priceData.code == 201">
            <div class="price">
              <img src="../images/dialog-error-icon2.png" alt="">
            </div>
            <div class="explain">
              <p>
                翻倍次数不足
              </p>
              充值<span>{{priceData.message}}元</span>继续翻倍
              <br>
              最多得<span>{{jyzUserInfo.betStage * 8 > 10000? Math.floor(jyzUserInfo.betStage * 8 / 1000) / 10 +'万' : jyzUserInfo.betStage * 8}}金叶</span>
            </div>
            <div class="btn" @click="goShopping(true)">
              去充{{priceData.message}}元
            </div>
          </div>
        </div>
        <div class="closed" @click="hideDialog"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'turntableDialog',
  data: () => ({
    imgList: {
      '1.1': require('../images/1.1_big.png'),
      '1.2': require('../images/1.2_big.png'),
      '1.4': require('../images/1.4_big.png'),
      '1.6': require('../images/1.6_big.png'),
      '1.8': require('../images/1.8_big.png'),
      '2.2': require('../images/2.2_big.png'),
      '2.5': require('../images/2.5_big.png'),
      '2': require('../images/2_big.png'),
      '5': require('../images/5_big.png'),
      '8': require('../images/8_big.png')
    }
  }),
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    dialogStatus: {
      type: String,
      default: 'loader'
    },
    priceData: {
      type: Object,
      default: null
    },
    jyzUserInfo: {
      type: Object,
      default: null
    }
  },
  methods: {
    hideDialog () {
      this.$emit('hideDialog')
    },
    goShopping (status) {
      if (status) {
        GLOBALS.marchSetsPoint('A_H5PT0074001132')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0074001133')
      }

      localStorage.setItem('originDeffer', window.location.href)
      window.location.href = 'https://wap.beeplay123.com/payment/#/mall'
    },
    going (status) {
      if (status) {
        GLOBALS.marchSetsPoint('A_H5PT0074001135')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0074001131')
      }

      this.$emit('going')
    }
  }
}
</script>

<style scoped lang="less">
img {
  vertical-align: top;
  width: 100%;
}
.dialog {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 10;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .dialog-loader {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    .bg {
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-size: 0.48rem;
      color: #ffdfdd;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      p {
        position: absolute;
        top: 3.26rem;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
        span {
          color: #fedf63;
        }
      }
      .btn {
        font-size: 0.36rem;
        color: #a04f17;
        margin: 5.74rem auto 0;
        width: 3.7rem;
        height: 1.12rem;
        line-height: 1.12rem;
        text-align: center;
        background: url("../images/border_btn_long.png") no-repeat center top /
          100% 100%;
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      background: url("../images/closed_icon.png") no-repeat center center /
        100% 100%;
    }
  }
  .dialog-success {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    .bg {
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      .price {
        margin: 3.8rem auto 0;
        width: 2.24rem;
        height: 2.24rem;
        justify-content: center;
        align-items: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .explain {
        margin: 0.3rem auto 0.3rem;
        width: 100%;
        color: #f5eede;
        font-size: 0.3rem;
        text-align: center;
        span {
          color: #fff261;
          font-weight: bold;
        }
      }
      .btn {
        margin: 0 auto;
        width: 3.6rem;
        height: 1.06rem;
        line-height: 0.94rem;
        font-size: 0.3rem;
        color: #a04f17;
        text-align: center;
        font-weight: bold;
        background: url("../images/btn_long.png") no-repeat center top / 100%
          100%;
      }
      .other {
        color: #580a09;
        font-size: 0.24rem;
        text-align: center;
        font-weight: bold;
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      background: url("../images/closed_icon.png") no-repeat center center /
        100% 100%;
    }
  }
  .dialog-error {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    .bg {
    }
    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      font-family: "Avenir", Helvetica, Arial, sans-serif;
      .no-yezi {
        .price {
          margin: 3.5rem auto 0;
          width: 3.2rem;
          height: 2.3rem;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .explain {
          margin: 0 auto 0.2rem;
          width: 100%;
          color: #f5eede;
          font-size: 0.3rem;
          text-align: center;
          font-weight: bold;
          p {
            font-size: 0.36rem;
            margin-bottom: 0.06rem;
          }
          span {
            color: #fff261;
          }
        }
        .btn {
          margin: 0 auto;
          width: 3.6rem;
          height: 1.06rem;
          line-height: 0.94rem;
          font-size: 0.3rem;
          color: #a04f17;
          text-align: center;
          font-weight: bold;
          background: url("../images/btn_long.png") no-repeat center top / 100%
            100%;
        }
      }
      .no-time {
        .price {
          margin: 3.8rem auto 0;
          width: 1.91rem;
          height: 1.95rem;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .explain {
          margin: 0 auto 0.2rem;
          width: 100%;
          color: #f5eede;
          font-size: 0.3rem;
          text-align: center;
          font-weight: bold;
          p {
            font-size: 0.36rem;
            margin-bottom: 0.06rem;
          }
          span {
            color: #fff261;
          }
        }
        .btn {
          margin: 0 auto;
          width: 3.6rem;
          height: 1.06rem;
          line-height: 0.94rem;
          font-size: 0.3rem;
          color: #a04f17;
          text-align: center;
          font-weight: bold;
          background: url("../images/btn_long.png") no-repeat center top / 100%
            100%;
        }
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      background: url("../images/closed_icon.png") no-repeat center center /
        100% 100%;
    }
  }
}
.scalc-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}
@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
