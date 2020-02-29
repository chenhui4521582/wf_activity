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
              活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则
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
        </div>
        <div v-if="btnText" class="btn" @click="confirm">{{btnText}}</div>
      </div>
      <div class="close-btn" @click="close()"></div>
    </section>
  </article>
</template>

<script>
import utils from '@/common/js/utils'
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

        default:
          break
      }
    },
    btnText () {
      switch (this.type) {
        case 0:
          return '去多多玩APP签到'
        case 2:
        case 3:
        case 6:
          return '去购买礼包'
        case 4:
          return '再试一次'
        case 5:
          return '去玩游戏'

        default:
          break
      }
    }
  },
  mounted () {

  },
  methods: {
    confirm () {
      this.$emit('input', false)
      this.$emit('on-confirm')
    },
    close () {
      this.$emit('input', false)
      this.$emit('on-close')
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (val) {
        utils.ScrollNoMove()
      } else {
        utils.ScrollMove()
      }
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
      padding: 0.5rem;
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
