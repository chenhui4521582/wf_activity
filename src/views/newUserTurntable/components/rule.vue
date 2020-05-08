<template>
  <div class="rule">
    <div class="pop-mask"></div>
    <div class="rule-wrap">
      <div class="rule-content">
        <p>1. 活动时间: {{info.beginDate}}至{{info.endDate}}
        </p>
        <p>2. 参与用户说明：首次进入多多玩游戏大厅的用户，自首次进入之日起14天内均可参与活动。
        </p>
        <p>3. 获取抽奖机会方法：每日登录和完成规定任务即可免费获得抽奖机会。
        </p>
        <p>4. 奖品说明：话费红包为三网通话费充值红包，100个话费红包=1元话费，由平台直接向您提供的手机号码充值。
        </p>
        <p>5. 话费提取门槛：话费红包达到10元。
        </p>
        <p>6. 话费提取方式：用户满足提现门槛后，可直接进入【我的话费】点击”立即提取“，输入验证信息后完成话费充值。
        </p>
        <p>
          7.话费提取期限：活动期间满足提现门槛的用户但未完成提现用户，最晚提现时间至{{info.newUserInfo.convertEndDate}}前，逾期失效，请及时完成提取；活动结束后未满足提现门槛的用户，活动期间拥有的奖励将自动失效。
        </p>
        <p>8 . 活动期间，一经发现作弊等违法、违规情形，立即取消活动参与资格与领奖资格，且该用户于活动中获得的奖励全部收回。
        </p>
        <p>9. 如出现不可抗力或情势变更的情况(包括但不限于重大灾害事件、活动遭受严重网络攻击或因系统故障需要暂停举办的),则多多玩可依相关法律法规的规定主张免责。
        </p>
        <p>10. 在法律允许范围内，多多玩将享有本活动的解释权。</p>
      </div>
      <div class="btn" @click="close(1)">我知道了</div>
      <div class="close" @click="close()"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  name: '',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0200002049') // H5平台-新手转盘活动页-玩法说明弹窗加载完成
  },
  methods: {
    close (type) {
      if (type) {
        GLOBALS.marchSetsPoint('A_H5PT0200002050') // H5平台-新手转盘活动页-玩法说明弹窗-我知道了点击
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0200002051') // H5平台-新手转盘活动页-玩法说明弹窗-关闭点击
      }
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../common/css/base.css';
.bgWithFull(@url) {
  background: url(@url) no-repeat center center / 100% 100%;
}
.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.55);
}
.rule {
  .rule-wrap {
    position: fixed;
    top: 37%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.2rem;
    height: 8.3rem;
    padding: 3rem 0.44rem 1.3rem;
    box-sizing: border-box;
    .bgWithFull('../img/rule-bg.png');
    .rule-content {
      width: 100%;
      height: 100%;
      font-size: 0.24rem;
      font-weight: 500;
      color: #666666;
      line-height: 0.36rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .btn {
      width: 2.8rem;
      height: 0.7rem;
      line-height: 0.7rem;
      text-align: center;
      color: #fff;
      margin: 0.18rem auto 0.78rem;
      .bgWithFull('../img/btn-bg.png');
    }
    .close {
      width: 0.7rem;
      height: 0.7rem;
      .bgWithFull('../img/close.png');
      margin: auto;
    }
  }
}
</style>
