<template>
  <transition name="scalc">
    <article class="popup-wrapper">
      <section class="mask"></section>
      <section class="content" :class="`type-${type}`">
        <template v-if="type === 0">
          <ul class="awards-list">
            <li v-for="(item,index) in productList">
              <div class="award-icon"><img :src="item.productIcon|filter" alt=""></div>
              <div class="award-content" v-html="contentText(item.content)"></div>
              <div class="btn award-btn" @click="toPay(item)">¥ {{item.price}}</div>
            </li>
          </ul>
          <p class="to-mall" @click="toMall">点击前往 更多礼包>>></p>
          <ul class="other-desc">
            <li>
              加成卡获得瓜分奖励后可立即获得随机加成,购买礼包金额越高，加成金额越高哦
            </li>
            <li>
              注意：加油包每日仅限购买一个哦（三选一，不可叠加购买）
            </li>
          </ul>
        </template>
        <template v-if="type === 1">
          <div class="cake-unlocked"></div>
          <div class="tips">小提示：任意付费即可解锁蛋糕</div>
          <div class="btn" @click="closePop">马上瓜分</div>
        </template>
        <template v-if="type === 2">
          <div class="crying-face"></div>
          <div class="tips">
            温馨提示<br>
            瓜分时间为参与当日-次日10:00<br>
            再试一下吧
          </div>
          <div class="btn" @click="closePop">参与活动</div>
        </template>
        <template v-if="type === 3">
          <ul class="top">
            <template v-for="(item,key) in divideList">
              <li v-if="item.status===1" :key="key">
                <span>第{{item.level|numberToText}}层蛋糕</span>
                <em>x{{item.awardsName}}</em>
              </li>
            </template>
          </ul>
          <div class="bottom">
            <p class="add-card-info">
              <img src="../img/add-img.png" alt="">
              <span class="has-card" v-if="haveAddCard" @click="useMarkup">点击使用加成卡 >></span>
              <span v-else>暂无加成卡</span>
            </p>
            <div class="btn" @click="closePop">继续参与瓜分</div>
            <p>{{applyDate}}场次瓜分</p>
          </div>
        </template>
        <template v-if="type === 4">
          <p>{{awardInfo.awardsName}}</p>
          <div class="btn" @click="closePop">继续参与瓜分</div>
        </template>
        <div class="close-icon" @click="closePop"></div>
      </section>
    </article>
  </transition>
</template>

<script>
import { GetMallProductList, UseMarkup } from '../services/api'
import _get from 'lodash.get'
export default {
  name: '',
  components: {

  },
  props: {
    type: {
      type: Number,
      default: null
    },
    divideInfo: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      productList: [],
      awardInfo: {}
    }
  },
  filters: {
    numberToText (number) {
      switch (number) {
        case 1:
          return '一'
        case 2:
          return '二'
        case 3:
          return '三'
        default:
          return number
      }
    }
  },
  computed: {
    applyDate () {
      return _get(this.divideInfo, 'applyDate', '')
    },
    divideList () {
      return _get(this.divideInfo, 'divideList', {})
    },
    haveAddCard () {
      return !!_get(this.divideInfo, 'markupNum', false)
    }
  },
  mounted () {
  },
  methods: {
    async getMallProductList () {
      const res = await GetMallProductList()
      this.productList = _get(res, 'data.mallBizConfigs', [])
    },
    async useMarkup () {
      const res = await UseMarkup()
      let code = _get(res, 'code', 0)
      if (code === 200) {
        this.awardInfo = _get(res, 'data', {})
        this.$emit('change-type', 4)
      } else {
        this.closePop()
        this.$toast.show({
          message: '正在结算中，请稍后再试',
          isOneLine: true,
          duration: 3000
        })
      }
    },
    contentText (content) {
      if (content) {
        return content.split('+').join('<br>+')
      } else {
        return ''
      }
    },
    toPay (payInfo) {
      localStorage.setItem('originDeffer', location.href)
      localStorage.setItem('JDD_PARAM', JSON.stringify(payInfo))
      localStorage.setItem('payment', JSON.stringify(payInfo))
      let url = '//wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      location.href = url
    },
    toMall () {
      let url = 'xmWap/#/payment'
      location.href = url
    },
    closePop () {
      this.$emit('on-close')
    }
  },
  watch: {
    type: {
      handler (val, oldVal) {
        if (val === 0) {
          this.getMallProductList()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg-center (@url) {
  background: url(@url) no-repeat center top;
  background-size: 100% 100%;
}
.popup-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.content {
  width: 5rem;
  position: relative;
  margin: 0 auto;
  z-index: 1;
  box-sizing: border-box;
  .close-icon {
    width: 0.76rem;
    height: 0.76rem;
    position: absolute;
    right: -0.2rem;
    .bg-center("../img/close-icon.png");
  }
  .btn {
    width: 2.56rem;
    height: 0.72rem;
    line-height: 0.64rem;
    text-align: center;
    font-size: 0.28rem;
    font-weight: bold;
    color: #bf1d19;
    margin: auto;
    .bg-center("../img/btn-long.png");
  }

  &.type-0 {
    height: 7.28rem;
    margin-top: 1.42rem;
    .bg-center("../img/pop-type-0-bg.png");
    padding: 1.6rem 0.34rem 0;
    .close-icon {
      top: 1rem;
    }
    .awards-list {
      li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ffeea9;
        background: #5c2829;
        height: 1.1rem;
        border-radius: 0.12rem;
        margin-bottom: 0.1rem;
        padding: 0 0.26rem 0 0.12rem;
        .award-icon {
          width: 0.98rem;
          height: 0.84rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .award-content {
          flex: 1;
          margin-left: 0.24rem;
        }
        .award-btn {
          width: 1.2rem;
          height: 0.56rem;
          line-height: 0.52rem;
          font-size: 0.24rem;
          .bg-center("../img/btn-short.png");
        }
      }
    }
    .to-mall {
      height: 0.5rem;
      background: #673637;
      border-radius: 0.12rem;
      font-size: 0.2rem;
      color: #d5ae76;
      text-align: center;
      line-height: 0.5rem;
      margin-bottom: 0.2rem;
    }
    .other-desc {
      li {
        margin-left: 0.2rem;
        list-style: disc;
        color: #8d6664;
      }
    }
  }
  &.type-1 {
    height: 5.7rem;
    margin-top: 2.38rem;
    .bg-center("../img/pop-type-1-bg.png");
    padding-top: 1.92rem;
    .close-icon {
      top: 1rem;
    }
    .cake-unlocked {
      width: 2.14rem;
      height: 1.88rem;
      .bg-center("../img/cake-unlocked.png");
      margin: 0 auto 0.24rem;
    }
    .tips {
      text-align: center;
      color: #8d6664;
      margin-bottom: 0.24rem;
    }
  }
  &.type-2 {
    height: 5.62rem;
    margin-top: 2.38rem;
    .bg-center("../img/pop-type-2-bg.png");
    padding-top: 1.84rem;
    .close-icon {
      top: -0.24rem;
    }
    .crying-face {
      width: 1.22rem;
      height: 1.22rem;
      .bg-center("../img/crying-face.png");
      margin: 0 auto 0.2rem;
    }
    .tips {
      text-align: center;
      color: #ffd941;
      margin-bottom: 0.3rem;
    }
  }
  &.type-3 {
    height: 6.08rem;
    margin-top: 2.38rem;
    .bg-center("../img/pop-type-3-bg.png");
    padding: 2.4rem 0.6rem 0;
    .close-icon {
      top: 1.7rem;
    }
    .top {
      width: 100%;
      height: 1.28rem;
      display: flex;
      justify-content: center;
      align-content: space-around;
      flex-wrap: wrap;
      margin-bottom: 0.28rem;
      li {
        width: 100%;
        text-align: center;
        span {
          color: #bc7571;
        }
        em {
          color: #ffd941;
          font-style: normal;
          margin-left: 0.1rem;
        }
      }
    }
    .bottom {
      height: 2.08rem;
      border-top: 0.01rem #7a3432 solid;
      text-align: center;
      color: #8d6664;
      font-size: 0.2rem;
      line-height: 0.26rem;
      .add-card-info {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.22rem;
        color: #b8cd0a;
        margin: 0.14rem auto;
        img {
          width: 0.56rem;
          height: 0.56rem;
          margin-right: 0.1rem;
        }
        .has-card {
          text-decoration: underline;
        }
      }
    }
  }
  &.type-4 {
    height: 3.26rem;
    margin-top: 2.38rem;
    .bg-center("../img/pop-type-4-bg.png");
    padding: 1.26rem 0.6rem 0;
    .close-icon {
      top: 0.1rem;
    }
    p {
      color: #ffd941;
      font-size: 0.24rem;
      margin-bottom: 0.54rem;
      text-align: center;
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
