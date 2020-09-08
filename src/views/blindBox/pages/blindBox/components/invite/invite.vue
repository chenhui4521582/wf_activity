<template>
  <aside class="invite" v-if="info.showEntrance">
    <section class="invite-icon" @click="showInvite()">
      <img src="./img/invite-icon.png" alt="">
    </section>
    <Dialog :show="isShowInvite" title="送你一个免费的盲盒" :close="true" :titleStyle='titleStyle'
      :layout='layout' @onClose="closeInvite()">
      <section class="invite-wrapper">
        <div class="icon-wrapper">
          <img src="./img/gift-icon-big.png" alt="">
          <p class="rule" @click="showRule()">活动规则</p>
        </div>
        <p class="info-number" v-if="info.inviteNum">已邀请<em>{{info.inviteNum}}</em>位好友</p>
        <p class="info-desc">
          <template v-if="!info.inviteNum">
            邀请好友下载多多玩APP 得免费盲盒
          </template>
          <template v-else-if="info.couponAwards.inviteNum-info.inviteNum>0">
            再邀请{{info.couponAwards.inviteNum-info.inviteNum}}位好友，即可获得{{info.couponAwards.awardsRemark}}优惠券
          </template>
          <template v-else-if="info.openBoxAwards.inviteNum-info.inviteNum>0">
            再邀请{{info.openBoxAwards.inviteNum-info.inviteNum}}位好友，即可获得{{info.openBoxAwards.awardsRemark}}个免费盲盒
          </template>
          <template v-else>
            恭喜获得1个免费盲盒
          </template>
        </p>
        <ul class="user-list-wrapper">
          <li class="user-icon invite" v-for="item in info.inviteNum" :key="`invite-${item}`">
            <img src="./img/invited-user.png" alt="">
          </li>
          <template v-if="info.inviteNum<2">
            <li class="user-icon empty" v-for="item in (2-info.inviteNum)" :key="`empty-${item}`">
              <img src="./img/empty-user.png" alt="">
              <img class="plus-icon" src="./img/plus-icon.png" alt="">
            </li>
          </template>
          <li class="user-icon dot" v-if="info.inviteNum<4">
            ......
          </li>
          <template v-if="info.inviteNum>=4">
            <li class="user-icon empty" v-for="item in (6-info.inviteNum)" :key="`empty-${4+item}`">
              <img src="./img/empty-user.png" alt="">
              <img class="plus-icon" src="./img/plus-icon.png" alt="">
            </li>
          </template>
          <template v-if="info.inviteNum<4&&info.inviteNum<info.openBoxAwards.inviteNum">
            <li class="user-icon empty">
              <img src="./img/empty-user.png" alt="">
              <img class="plus-icon" src="./img/plus-icon.png" alt="">
            </li>
          </template>
        </ul>
        <div class="btn-wrapper">
          <div class="btn" v-if="info.inviteNum>=info.openBoxAwards.inviteNum">领取免费盲盒</div>
          <div class="btn" v-else-if="info.inviteNum>=info.couponAwards.inviteNum">领取优惠券</div>
          <div class="btn" v-if="info.inviteNum<info.openBoxAwards.inviteNum">立即邀请</div>
        </div>
        <section class="award-info-list">
          <section class="award-info">
            <div class="coupon">
              <div class="img">
                <img src="./img/coupon-icon.png" alt="">
              </div>
              <p class="name">即可获得<em>{{info.couponAwards.awardsRemark}}</em>盲盒优惠券</p>
              <p class="desc">邀请<em>{{info.couponAwards.inviteNum}}</em>位好友</p>
            </div>
            <div class="box">
              <div class="img">
                <img src="./img/gift-icon-small.png" alt="">
                <img class="free" src="./img/free-icon.png" alt="">
              </div>
              <p class="name">即可获得<em>{{info.openBoxAwards.awardsRemark}}</em>个免费盲盒</p>
              <p class="desc">邀请<em>{{info.openBoxAwards.inviteNum}}</em>位好友</p>
            </div>
          </section>
          <div class="line">
            <img src="./img/line.png" alt="">
          </div>
        </section>
      </section>
    </Dialog>
    <Dialog :show="isShowRule" title="活动规则" :close="true" :titleStyle='titleStyle' :layout='layout'
      @onClose="closeRule()">
      <p class="rule-content">
        <span>活动时间：<em>{{info.beginDate}}—{{info.endDate}}</em></span><br>
        <span>1.<em>邀请{{info.couponAwards.inviteNum}}位好友</em>下载多多玩APP（安卓版），可获得<em>{{info.couponAwards.awardsRemark}}盲盒优惠券</em>；如在领取免费盲盒之前未领取优惠券，视为放弃。优惠券可在购买盲盒时抵扣；</span><br>
        <span>2.<em>邀请{{info.openBoxAwards.inviteNum}}位好友</em>下载多多玩APP（安卓版），可获得<em>{{info.openBoxAwards.awardsRemark}}个免费盲盒</em>；</span><br>
        <span>3.邀请成功的标准为：安卓用户下载多多玩App并登录，即为邀请成功；苹果用户暂无法参与活动。</span><br>
        <span>4.被邀请的用户需未在平台注册过，才视为新用户，邀请成功后才能获得奖励哦；</span><br>
        <span>5.若被平台系统检测到：参与活动的用户有非正常邀请行为，平台将不再继续发放活动奖励。情节严重者，平台将取消其参与活动的资格，并扣除相应奖励不予结算；</span><br>
        <span>6.多多玩游戏平台对本活动具有最终解释权。</span>
      </p>
    </Dialog>
  </aside>
</template>

<script>
import Dialog from '../../../../components/dialog'
import * as fissionService from '../../../../apis/fission'
export default {
  name: 'invite',
  components: {
    Dialog
  },
  data () {
    return {
      isShowInvite: false,
      isShowRule: false,
      isShowCoupon: true,
      titleStyle: {
        paddingBottom: '0.16rem'
      },
      layout: {
        width: '5rem'
      },
      info: {}
    }
  },
  mounted () {
    this.getActivityInfo()
  },
  methods: {
    showInvite () {
      this.isShowInvite = true
    },
    closeInvite () {
      this.isShowInvite = false
    },
    showRule () {
      this.isShowRule = true
    },
    closeRule () {
      this.isShowRule = false
    },
    showCoupon () {
      this.isShowCoupon = true
    },
    closeCoupon () {
      this.isShowCoupon = false
    },
    async getActivityInfo () {
      const { code, data } = await fissionService.fissionActivityInfo()
      if (code && code === 200) {
        this.info = data
      }
    },
    async fissionReceiveBox () {
      const { code, data } = await fissionService.fissionReceiveBox()
      if (code && code === 200) {
        this.info = data
      }
    },
    async fissionReceiveCoupon () {
      const { code } = await fissionService.fissionReceiveCoupon()
      if (code && code === 200) {
        this.$emit('refresh')
      }
    }
  }
}
</script>

<style lang="less" scoped>
img {
  max-width: 100%;
  max-height: 100%;
}
.invite {
  .invite-icon {
    z-index: 102;
    position: fixed;
    bottom: 3rem;
    left: 0;
    width: 1.68rem;
    height: 1.84rem;
  }
  .rule-content {
    color: #000;
    font-size: 0.24rem;
    text-align: left;
    padding: 0 0.35rem 0.38rem 0.5rem;
    line-height: 0.36rem;
    em {
      color: #ff4141;
    }
  }
  .invite-wrapper {
    padding-bottom: 0.3rem;
    .icon-wrapper {
      height: 1.7rem;
      margin: 0 auto 0.24rem;
      position: relative;
      .rule {
        position: absolute;
        top: 0.1rem;
        right: 0;
        width: 1rem;
        height: 0.44rem;
        background: #ff4141;
        border-radius: 0.22rem 0 0 0.22rem;
        color: #fff;
        font-size: 0.2rem;
        line-height: 0.44rem;
        text-align: center;
      }
    }
    .info-number {
      font-size: 0.2rem;
      color: #000;
      line-height: 0.3rem;
      em {
        color: #ff4141;
      }
    }
    .info-desc {
      font-size: 0.2rem;
      color: #888;
      margin-top: 0.05rem;
      margin-bottom: 0.25rem;
      line-height: 0.3rem;
    }
    .user-list-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      .user-icon {
        width: 0.6rem;
        height: 0.6rem;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.1rem;
        font-size: 0;
        .plus-icon {
          position: absolute;
          width: 0.2rem;
          height: 0.2rem;
          bottom: -0.08rem;
        }
        &.dot {
          font-size: 0.2rem;
          color: #bbb;
          margin: 0;
        }
      }
    }
    .btn-wrapper {
      margin-top: 0.28rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn {
        width: 2rem;
        height: 0.7rem;
        background: #ff4141;
        border-radius: 0.16rem;
        line-height: 0.7rem;
        text-align: center;
        color: #fff;
        font-size: 0.24rem;
      }
    }
    .award-info-list {
      height: 2.5rem;
      position: relative;
      display: flex;
      width: 100%;
      .award-info {
        width: 100%;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
        .name {
          margin-top: 0.16rem;
          font-size: 0.2rem;
          color: #bbb;
        }
        .desc {
          font-size: 0.24rem;
          color: #000;
          margin-top: 0.58rem;
        }
        em {
          color: #ff4141;
        }
        .coupon {
          .img {
            width: 1.06rem;
            height: 0.7rem;
            margin: auto;
          }
        }
        .box {
          .img {
            position: relative;
            width: 0.66rem;
            height: 0.76rem;
            margin: auto;
          }
          .free {
            position: absolute;
            width: 0.6rem;
            height: 0.42rem;
            top: -0.3rem;
            right: -0.46rem;
          }
        }
      }
      .line {
        position: absolute;
        bottom: 0.4rem;
        width: 4.56rem;
        left: 50%;
        margin-left: -2.28rem;
      }
    }
  }
}
</style>
