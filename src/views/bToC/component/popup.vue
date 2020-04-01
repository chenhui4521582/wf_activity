<template>
  <article class="modal-warp" v-show="show">
    <transition name="mask">
      <section class="modal-mask" v-show="show">
      </section>
    </transition>
    <section class="popup-wrap">
      <div class="popup">
        <div class="title">{{title}}</div>
        <div class="container" :class="`type-${type}`">
          <template v-if="type===0">
            <div class="img">
              <img src="../img/ddw-icon.png" alt="">
            </div>
            <p class="text">
              立即去多多玩APP进行签到<br>
              充值礼包更有10%加赠
            </p>
          </template>
          <template v-if="type===1">
            <p class="text">
              1.活动时间: {{beginTime|timeFilter}}至{{endTime|timeFilter}}<br>
              2.活动期间用户可以去多多玩APP进行参与签到，签到后领取金叶子奖励。<br>
              3.进行签到前请确认当前帐号已绑定手机号，且使用绑定手机号的账号登录多多玩APP,绑定渠道：我的-点击头像-绑定手机号。<br>
              4.活动期间反馈福利礼包68元、88元、888元，用户购买对应礼包后可获得抽免单机会，抽中免单后可获得礼包同等金额金叶子。<br>
              5.每购买1次礼包可获得1次抽奖机会，抽中免单金额对应购买礼包金额，用户购买礼包金额无上限。<br>
              6.本期活动IOS设备不予以参与。<br>
              7.本活动最终解释权归多多玩游戏平台。
            </p>
          </template>
          <template v-if="type===2">
            <div class="img">
              <img src="../img/apple-icon.png" alt="">
            </div>
            <p class="text">
              苹果IOS系统手机暂不进行活动<br>
              去玩游戏赚取话费吧
            </p>
          </template>
          <template v-if="type===3||type===4||type===5">
            <div class="img">
              <img src="../img/nothing-icon.png" alt="">
            </div>
            <p class="text" v-if="type===3">
              你暂时没有抽奖机会哟<br>
              立刻购买礼包获得抽奖机会吧
            </p>
            <p class="text" v-else-if="type===4">
              很遗憾，好像什么都没抽中<br>
              再试试手气吧
            </p>
            <p class="text" v-else>
              你没有获得特权活动资格哟<br>
              去玩游戏赚取话费吧
            </p>
          </template>
          <template v-if="type===6">
            <div class="img">
              <img src="../img/leaf-icon.png" alt="">
            </div>
            <p class="num">
              {{leafNum}}金叶子
            </p>
            <p class="text">
              购买礼包更能抽取免单机会
            </p>
          </template>
          <template v-if="type===7">
            <div class="img">
              <img src="../img/coupon-icon.png" alt="">
            </div>
            <p class="text">
              免单奖励将按照金叶子的方式发放<br>
              免单金额为您最近1次购买礼包等额金叶子
            </p>
          </template>
        </div>
        <div v-if="btnText" class="btn" @click="confirm">{{btnText}}</div>
      </div>
      <div class="close-btn" @click="close()"></div>
    </section>
  </article>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      show: this.value
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 0
    },
    leafNum: {
      type: [Number, String],
      default: 0
    },
    beginTime: {
      type: String,
      default: ''
    },
    endTime: {
      type: String,
      default: ''
    }
  },
  filters: {
    timeFilter (time) {
      return time.split(' ')[0]
    }
  },
  computed: {
    title () {
      switch (this.type) {
        case 0:
          return '陛下你好'
        case 1:
          return '活动规则'
        case 2:
        case 3:
          return '不好意思! !'
        case 4:
        case 5:
          return '很遗憾! !'
        case 6:
          return '恭喜您获得'
        case 7:
          return '恭喜您抽中免单奖励'

        default:
          break
      }
    },
    btnText () {
      switch (this.type) {
        case 0:
          return '去多多玩APP签到'
        case 2:
        case 5:
          return '去玩游戏'
        case 3:
        case 6:
        case 7:
          return '去购买礼包'
        case 4:
          return '再试一次'

        default:
          break
      }
    },
    popTypeText () {
      switch (this.type) {
        case 0:
          return 'B端去多多玩App'
        case 1:
          return '活动规则'
        case 2:
          return '苹果手机不支持'
        case 3:
          return '没有机会'
        case 4:
          return '没抽中'
        case 5:
          return '没有资格'
        case 6:
          return '签到获得金叶子'
        case 7:
          return '抽奖获得免单'
      }
    }
  },
  mounted () {

  },
  methods: {
    confirm () {
      this.$emit('input', false)
      GLOBALS.marchSetsPoint('A_H5PT0249002922', { awards_name: this.popTypeText })// H5平台-现在用户引流活动-弹窗确认按钮点击
      this.$emit('on-confirm')
    },
    close () {
      this.$emit('input', false)
      this.$emit('on-close')
    }
  },
  watch: {
    value (val) {
      if (val) {
        GLOBALS.marchSetsPoint('A_H5PT0249002923', { awards_name: this.popTypeText }) // H5平台-现在用户引流活动-弹窗显示
      }
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
p,
section,
div,
ul {
  border: none;
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.bg-center(@url) {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(@url);
}
.modal-warp {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  font-weight: bold;
  font-family: Alibaba PuHuiTi;
  .modal-mask {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
  }
  .popup-wrap {
    position: absolute;
    z-index: 1;
    top: 41%;
    left: 50%;
    margin: -3.54rem 0 0 -2.96rem;
    .popup {
      width: 5.96rem;
      height: 7.14rem;
      .bg-center("../img/pop-bg.png");
      box-sizing: border-box;
      padding: 0.5rem 0;
      position: relative;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
      .title {
        position: absolute;
        width: 100%;
        text-align: center;
        top: 0.5rem;
        left: 0;
        font-size: 0.48rem;
        color: #fff;
      }
      .text {
        font-size: 0.28rem;
        font-weight: 400;
        color: #8c275c;
      }
      .btn {
        background-color: #f4ac4e;
        color: #fff;
        width: 3.68rem;
        height: 0.88rem;
        text-align: center;
        line-height: 0.88rem;
        border-radius: 0.44rem;
        font-size: 0.36rem;
        position: absolute;
        bottom: 0.5rem;
        left: 50%;
        margin-left: -1.74rem;
      }
      .img {
        margin: auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .type-0 {
        .img {
          width: 1.88rem;
          height: 1.88rem;
          margin-top: 1.6rem;
          margin-bottom: 0.44rem;
        }
      }
      .type-1 {
        margin-top: 1.3rem;
        height: 4.84rem;
        overflow-x: hidden;
        overflow-y: scroll;
        padding: 0 0.5rem;
        .text {
          text-align: justify;
        }
      }
      .type-2 {
        .img {
          width: 1.8rem;
          height: 2.24rem;
          margin-top: 1.6rem;
          margin-bottom: 0.44rem;
        }
      }
      .type-3,
      .type-4,
      .type-5 {
        .img {
          width: 2.2rem;
          height: 2.26rem;
          margin-top: 1.6rem;
          margin-bottom: 0.32rem;
        }
      }
      .type-6 {
        .img {
          width: 1.64rem;
          height: 1.64rem;
          margin-top: 1.6rem;
          margin-bottom: 0.32rem;
        }
        .num {
          color: #8c275c;
          font-size: 0.36rem;
          margin-bottom: 0.4rem;
        }
      }
      .type-7 {
        .img {
          width: 2.32rem;
          height: 2.28rem;
          margin-top: 1.6rem;
          margin-bottom: 0.32rem;
        }
      }
    }
    .close-btn {
      width: 0.6rem;
      height: 0.6rem;
      .bg-center("../img/close-icon.png");
      margin: 0.6rem auto 0;
    }
  }
}
// 动画
.mask-enter {
  opacity: 0;
}
.mask-enter-active {
  transition: opacity 0.3s;
}
.mask-leave-to {
  opacity: 0;
}
.mask-leave-active {
  transition: opacity 0.3s;
}
</style>
