<template>
  <transition :name="transitionname">
    <div class="pop-window">
      <div class="pop-mask" @touchmove.prevent></div>
      <div class="bonus-success" v-if="count==1">
        <div class="desc">
          <p>1. 活动时间：{{dataStr}}</p>
          <p>2. 参与方式：每天进入活动页面报名且当日付费任意金额。每场开始前5分钟截止当场报名。</p>
          <p>3. 每场瓜分时间：{{timetxt}}点整。</p>
          <p>4. 终极大奖瓜分时间：{{dividetimetxt}}。</p>
          <p>5. 终极大奖瓜分规则：活动期间报名3天即可拥有瓜分机会,参与天数越多,瓜分中奖率更高。参与5天以上必中奖哟。</p>
          <p>6. 奖品发放：红包奖励可能为话费券或优惠券或未中奖。进入活动页面领取后的奖励将直接发放至我的资产。活动期间内所得的奖励,若用户在活动结束时仍未领取,则自动失效。</p>
          <p>7. 如有其他疑问,请点击<i @click="concat"
              style="text-decoration: underline">咨询客服</i>。活动最终解释权归平台所有。</p>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <div class="bonus-success profit" v-if="count==2">
        <div class="desc">
          <slot></slot>
        </div>
        <div class="bottom">
          仅展示{{timeline}}场次瓜分记录
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <!--报名成功-->
      <div class="bonus-success baomingsuccess" v-if="count==3">
        <div class="desc">
          每天{{timetxt}}:00准时开奖哟~<br>
          <template v-if="appointmentday<=3">
            任意报名3天即有机会瓜分终极大奖!
          </template>
          <template v-else>
            任意报名5天终极大奖必中哟！
          </template>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <!--预报名成功-->
      <div class="bonus-success unbaomingsuccess" v-if="count==4">
        <div class="desc" style="font-size: .26rem">
          付费任意金额即可报名成功<br />
          每天{{timetxt}}:00瓜分千元红包
          <div class="btn" @click="gotoshop">马上参与</div>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <!--报名挽留-->
      <div class="bonus-success unbaomingsuccess wanliu" v-if="count==5">
        <div class="desc">
          报名成功<br>有机会瓜分千元红包奖励呢！<br>真的要走了吗？
          <div class="btn" @click="appointmentBonus">去报名</div>
        </div>
        <div class="close" @click="goback"></div>
      </div>
      <!--报名挽留-->
      <div class="bonus-success zhongji_guafen" v-if="count==6||count==7">
        <div class="desc">
          <p class="info1" v-if="count==6">任意报名3天即有机会参与瓜分</p>
          <div class="buqian_leaf">
            <span>{{makeupPackageData&&makeupPackageData.amount}}金叶子</span>
          </div>
          <p class="info2" v-if="count==6">补签卡可补1天未报名场次</p>
          <p class="info2" v-else>
            已任意报名4天,购买补签卡<br>
            可补1天未报名场次,任意报名5天<br>
            拥有终极大奖必中机会！
          </p>
          <div class="btn" @click="gotopay(makeupPackageData)">
            {{makeupPackageData&&makeupPackageData.price}}元</div>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
    </div>
  </transition>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      telPhone: ''
    }
  },
  props: {
    count: {
      type: Number,
      default: '0'
    },
    dataStr: {
      type: String,
      default: ''
    },
    timetxt: {
      type: Number,
      default: 0
    },
    num: {
      type: Number,
      default: 0
    },
    dividetimetxt: {
      type: String,
      default: ''
    },
    makeupPackageData: {
      type: Object,
      default: null
    },
    appointmentday: {
      type: Number,
      default: 0
    },
    timeline: {
      type: String,
      default: ''
    }
  },
  computed: {
    isRight () {
      let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      return this.telPhone && reg.test(this.telPhone)
    },
    transitionname () {
      return this.count == 6 || this.count == 7 ? 'slide' : ''
    }
  },
  methods: {
    fetch (url, params) {
      if (url.startsWith('/ops/api')) {
        url = '//ops-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api')) {
        url = '//platform-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api')) {
        url = '//shop-api.beeplaying.com' + url
      }
      return this.axios.post(url, params, {})
    }, // 请求封装方法
    async besure () {
      if (!this.isRight) {
        this.$toast.show({
          message: '请输入正确的手机号',
          duration: 2000
        })
        return
      } else {
        // 接口
        let { data } = await this.fetch('/ops/api/jackpot/userOpenSms', { value: this.telPhone })
        if (data.code == 200) {
          this.$toast.show({
            message: '提交成功',
            duration: 2000
          })
          this.$emit('refresh')
          this.$emit('close')
        } else {
          this.$toast.show({
            message: data.message,
            duration: 2000
          })
        }
      }
    },
    close (flag) {
      if (flag) {
        if (this.flag == 5) {
          GLOBALS.marchSetsPoint('A_H5PT0074001817')
        }
        if (this.flag == 6 || this.flag == 7) {
          GLOBALS.marchSetsPoint('A_H5PT0074001814')
        }
        this.$emit('close')
      } else {
        this.$emit('closemobile')
      }
    },
    concat () {
      if (window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) == 'xmWap') {
        location.href = 'https://wap.beeplaying.com/xmWap/#/my/customerService'
      } else {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, false, '#/problem?tab=contact_personal')
      }
    },
    async gotoshop () {
      await GLOBALS.marchSetsPoint('A_H5PT0074001593')
      location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
    },
    appointmentBonus () { // 去报名
      GLOBALS.marchSetsPoint('A_H5PT0074001816')
      this.$emit('close')
      this.$emit('appointmentBonus', true)
    },
    goback () {
      this.$emit('close')
      history.go(-1)
    },
    gotopay (item) {
      localStorage.setItem('originDeffer', window.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0074001813', { recharge_rmb: item.price, product_id: item.bizId })   // HH5平台-奖池瓜分页面-补签卡弹窗-购买点击
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    }
  },
  mounted () {
    this.$refs.telPhone && this.$refs.telPhone.focus()
  }
}
</script>
<style lang="less" scoped>
.pop-window {
  position: relative;
  z-index: 11;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  .pop-close {
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    right: -0.34rem;
    top: -0.34rem;
  }
}

.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.bonus-success {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 5.1rem;
  height: 6.2rem;
  background: url("../images/rule_bg.png");
  background-size: 100% 100%;
  z-index: 11;
  &.profit {
    background: url("../images/record_bg.png");
    background-size: 100% 100%;
    .bottom {
      position: absolute;
      height: 0.66rem;
      bottom: 0;
      left: 0rem;
      right: 0;
      background: rgba(175, 14, 38, 1);
      border-radius: 0 0 0.4rem 0.4rem;
      line-height: 0.66rem;
      text-align: center;
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(249, 184, 115, 1);
    }
  }
  .title {
    position: absolute;
    top: 0.61rem;
    left: 0.9rem;
    right: 1.04rem;
    font-size: 0.36rem;
    font-weight: bold;
    color: rgba(255, 247, 243, 1);
    text-align: center;
    &.title0 {
      top: 0.34rem;
    }
  }
  .desc {
    position: absolute;
    top: 1rem;
    left: 0.2rem;
    right: 0.2rem;
    font-size: 0.22rem;
    font-weight: 400;
    color: rgba(255, 225, 229, 1);
    line-height: 0.32rem;
    i {
      color: #ffd619;
    }
  }
  .info {
    position: absolute;
    bottom: 0.95rem;
    left: 0.55rem;
    right: 0.45rem;
    font-size: 0.22rem;
    font-weight: 400;
    color: rgba(255, 223, 142, 1);
    line-height: 0.36rem;
  }
  .btnsure {
    position: absolute;
    left: 0.57rem;
    top: 2.87rem;
    line-height: 0.76rem;
    text-align: center;
    width: 3.9rem;
    height: 0.76rem;
    background: rgba(253, 192, 40, 1);
    border-radius: 0.38rem;
    font-size: 0.36rem;
    font-weight: bold;
    color: rgba(253, 21, 51, 1);
  }
  .close {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.8rem;
    width: 0.57rem;
    height: 0.57rem;
    background: url("../images/close.png");
    background-size: 100% 100%;
  }
  &.baomingsuccess {
    height: 3.58rem;
    background: url("../images/baoming_success_bg.png");
    background-size: 100% 100%;
    .desc {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0.5rem;
      right: 0.5rem;
      font-size: 0.3rem;
      line-height: 0.4rem;
      font-weight: 400;
      color: #ffe1e5;
    }
  }
  &.unbaomingsuccess {
    height: 3.58rem;
    background: url("../images/gobaoming_bg.png");
    background-size: 100% 100%;
    &.wanliu {
      height: 5.58rem;
      background: url("../images/new2/tips_pop.png");
      background-size: 100% 100%;
    }
    .desc {
      position: absolute;
      left: 0.3rem;
      right: 0.3rem;
      font-size: 0.3rem;
      line-height: 0.4rem;
      font-weight: 400;
      color: #ffe1e5;
      top: 40%;
      text-align: center;
      i {
        color: #ffd76a;
      }
      .btn {
        width: 3.9rem;
        height: 0.76rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.36rem;
        font-weight: bold;
        color: rgba(253, 21, 51, 1);
        line-height: 0.76rem;
        background: rgba(248, 202, 142, 1);
        border-radius: 0.38rem;
        margin: 0.3rem auto 0;
      }
    }
    &.wanliu .desc {
      top: 1.5rem;
      line-height: 0.5rem;
      .btn {
        width: 3.3rem;
        height: 0.9rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.43rem;
        font-weight: bold;
        color: rgba(150, 48, 8, 1);
        background: url("../images/new2/btn.png");
        background-size: 100% 100%;
        margin: 1rem auto 0;
        border-radius: 0;
      }
    }
  }
  &.zhongji_guafen {
    width: 6rem;
    height: 8.4rem;
    background: url("../images/new2/buqian_guafen.png");
    background-size: 100% 100%;
    .desc {
      position: absolute;
      top: 3.4rem;
      bottom: 0.4rem;
      left: 0.2rem;
      right: 0.2rem;
      font-size: 0.3rem;
      font-weight: bold;
      color: rgba(123, 24, 0, 1);
      line-height: 0.32rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .info1 {
        font-size: 0.36rem;
        color: rgba(245, 198, 131, 1);
      }
      .info2 {
        line-height: 0.4rem;
      }
      .buqian_leaf {
        width: 3.5rem;
        height: 1.96rem;
        background: url("../images/new2/buqian_bg.png");
        background-size: 100% 100%;
        font-size: 0.36rem;
        color: #fff;
        font-weight: 400;
        position: relative;
        span {
          position: absolute;
          top: 1.2rem;
          left: 1rem;
        }
      }
      .btn {
        width: 3.3rem;
        height: 0.9rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.43rem;
        font-weight: bold;
        color: rgba(150, 48, 8, 1);
        background: url("../images/new2/btn.png");
        background-size: 100% 100%;
        border-radius: 0;
      }
    }
  }
  &.zhongji_bizhong {
    width: 6rem;
    height: 8.4rem;
    background: url("../images/new2/buqian_bizhong.png");
    background-size: 100% 100%;
  }
}

.slide-enter,
.slide-leave-to {
  transform-origin: right bottom;
  transform: translateY(-60%) scale(0);
}

.slide-enter-to,
.slide-leave {
  transform: translateY(60%) scale(2);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
</style>
