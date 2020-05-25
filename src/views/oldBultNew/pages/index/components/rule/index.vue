<template>
  <Modal :show="show"
    @onClose="$emit('onClose')">
    <p class="title">活动介绍：</p>
    <p class="content">
    活动时间：{{begin}}—{{end}}
    1.活动期间点击页面下方邀请按钮邀请好友，好友接受邀请后并登录，即可获得1000金叶子奖励；<br>
    2.邀请好友完成平台新手任务，好友获得任务奖励，你可再得2000金叶子奖励；<br>
    3.邀请好友在平台充值，你可得好友充值的金叶子返利，返利比例为1%起。邀请的好友越多，返利比例越高，返利无上限封顶！<br>
    4.邀请成功的标准为：安卓用户下载多多玩App并用邀请时填写的手机号登录，即为邀请成功；苹果用户用浏览器打开多多玩官方网站并用邀请时填写的手机号登录，即为邀请成功；<br>
    5.被邀请的用户填写的手机号，需未在平台注册过，才视为新用户，邀请成功后才能获得奖励哦。<br>
    6.若被平台系统检测到：参与活动的用户有非正常邀请行为，平台将不再继续发放活动奖励。情节严重者，平台将取消其参与活动的资格，并扣除相应奖励不予结算。<br>
    7.多多玩游戏平台对本活动具有最终解释权。<br>
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
