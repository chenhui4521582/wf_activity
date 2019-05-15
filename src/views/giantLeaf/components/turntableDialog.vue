<template>
  <transition name="scalc">
    <div class="dialog" v-if="showDialog">
      <div class="mask"></div>
      <div class="dialog-loader" v-if="dialogStatus== 'loader'">
        <div class="bg">
          <img src="../images/dialog-loader.png" alt="">
        </div>
        <div class="content">
          <div class="btn" @click="going">
            <img src="../images/dialog-loader-btn.png" alt="">
          </div>
        </div>
        <div class="closed" @click="hideDialog"></div>
      </div>
      <div class="dialog-success" v-if="dialogStatus == 'success'">
        <div class="bg">
          <img src="../images/dialog-success.png" alt="">
        </div>
        <div class="content">
          <div class="price">
            <img :src="priceData.data.awardsImg | filter">
          </div>
          <p class="explain">金叶翻{{priceData.data&&priceData.data.returnRatio}}倍,共得{{priceData.data&&priceData.data.awardsAmount}}金叶</p>
          <div class="btn" @click="going">
            <img src="../images/dialog-success-btn.png" alt="">
          </div>
        </div>
        <div class="closed" @click="hideDialog"></div>
      </div>
      <div class="dialog-error" v-if="dialogStatus == 'error'">
        <div class="bg">
          <img src="../images/dialog-error.png" alt="">
        </div>
        <div class="content">
          <div class="no-yezi" v-if="priceData.code == 201 ">
            <div class="price">
              <img src="../images/dialog-error-icon1.png" alt="">
            </div>
            <p class="explain" v-html="priceData.message"></p>
            <div class="btn" @click="goShopping">
              <img src="../images/dialog-error-btn.png" alt="">
            </div>
          </div>
          <div class="no-time" v-if="priceData.code == 202">
            <div class="price">
              <img src="../images/dialog-error-icon2.png" alt="">
            </div>
            <p class="explain" v-html="priceData.message"></p>
            <div class="btn" @click="goShopping">
              <img src="../images/dialog-error-btn1.png" alt="">
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
      '1.1': require('../images/1.1time.png'),
      '1.2': require('../images/1.2time.png'),
      '1.4': require('../images/1.4time.png'),
      '1.6': require('../images/1.6time.png'),
      '1.8': require('../images/1.8time.png'),
      '2.2': require('../images/2.2time.png'),
      '2.5': require('../images/2.5time.png'),
      '2': require('../images/2time.png'),
      '5': require('../images/2time.png'),
      '8': require('../images/8time.png'),
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
    }
  },
  methods: {
	hideDialog () {
	  this.$emit('hideDialog')
	},
    goShopping () {
      localStorage.setItem('originDeffer', window.location.href)
	   window.location.href = 'https://wap.beeplay123.com/payment/#/mall'
    },
	going () {
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
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(0,0,0,.6);
  }
  .dialog-loader {
    position: absolute;
    width: 5.4rem;
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
      .btn {
        margin: 5.4rem auto 0;
        width: 4.12rem;
        height: 1.12rem;
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -.3rem;
      width: .6rem;
      height: .6rem;
      background: url("../images/closed.png") no-repeat center center / 100% 100%;
    }
  }
  .dialog-success {
    position: absolute;
    width: 6.69rem;
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
      .price {
        margin: 4rem auto 0;
        width: 2.28rem;
        height: 2.28rem;
        justify-content: center;
        align-items: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .explain {
        margin: .3rem auto .3rem;
        width: 100%;
        color: #F5EEDE;
        font-size: .3rem;
        text-align: center;
      }
      .btn {
        margin: 0 auto;
        width: 4.12rem;
        height: 1.12rem;
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -.3rem;
      width: .6rem;
      height: .6rem;
      background: url("../images/closed.png") no-repeat center center / 100% 100%;
    }
  }
  .dialog-error {
    position: absolute;
    width: 6.69rem;
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
      .no-yezi {
        .price {
          margin: 3.8rem auto 0;
          width: 2.9rem;
          height: 2.1rem;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .explain {
          margin: .3rem auto .3rem;
          width: 100%;
          color: #F5EEDE;
          font-size: .3rem;
          text-align: center;
        }
        .btn {
          margin: 0 auto;
          width: 4.12rem;
          height: 1.12rem;
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
          margin: .3rem auto .3rem;
          width: 100%;
          color: #F5EEDE;
          font-size: .3rem;
          text-align: center;
        }
        .btn {
          margin: 0 auto;
          width: 4.12rem;
          height: 1.12rem;
        }
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -.3rem;
      width: .6rem;
      height: .6rem;
      background: url("../images/closed.png") no-repeat center center / 100% 100%;
    }
  }
}
.scalc-enter-active{
  animation: fadeAnimation .3s ease-in-out;
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
