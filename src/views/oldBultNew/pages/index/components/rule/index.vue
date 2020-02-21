<template>
  <Modal :show="show"
    @onClose="$emit('onClose')">
    <p class="title">玩法说明</p>
    <p class="content">
      1.活动时间：{{begin}}~{{end}}<br>
      2.活动期间可以分享页面邀请好友，邀请好友接受邀请后可获得对应奖励。<br>
      3.成功邀请好友后，可根据邀请数量获得活动期间好友的充值金额返利。<br>
      4.返利方式按照充值金额比例的金叶子返利，无上限封顶。<br>
      5.邀请好友完成全部新手任务后可获得1000金叶子奖励，无上限封顶。<br>
      6.好友邀请成功标准：安卓用户下载多多玩APP使用邀请时填写的手机号进行注册即邀请成功。IOS用户使用浏览器打开平台并使用邀请时填写的手机号进行注册即邀请成功。<br>
      7.本活动最终解释权归多多玩游戏平台。
    </p>
    <p class="button"
      @click="$emit('onClose')">知道了</p>
  </Modal>
</template>

<script>
import Modal from '../../../../components/modal'

export default {
  components: {
    Modal
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    begin: {},
    end: {}
  }
}
</script>

<style lang="less" scoped>
.title {
  padding-top: 0.42rem;
  text-align: center;
  font-size: 0.28rem;
  color: #000000;
  font-weight: bold;
}
.content {
  padding: 0.24rem 0.44rem 0.3rem;
  font-size: 0.24rem;
  color: #888888;
  text-align: left;
  line-height: 1.5;
}
.button {
  font-size: 0.24rem;
  color: #ff4141;
  border-top: 1px solid #eeeeee;
  padding: 0.3rem 0 0.37rem;
  text-align: center;
}
</style>
