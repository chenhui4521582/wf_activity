<template>
  <main class="official-account">
    <div class="header">
      <img src="./img/back.png" alt="" @click="goBack">
      <span>关注多多玩官方公众号</span>
    </div>
    <div class="title">
      <p>公众号：多多玩vip</p>
      <p>长按二维码识别即可关注</p>
    </div>
    <div class="content">
      <img src="./img/ddwgame.png" alt="">
      <p class="wx-number">微信号: {{wechatName}}<span v-clipboard:copy="wechatName"
          v-clipboard:success="onCopy" v-clipboard:error="onError">复制</span></p>
      <p>复制微信号，在微信中搜索也可关注</p>
    </div>
    <div class="sub-title">关注公众号 福利多多</div>
    <ul>
      <li>
        <img src="./img/gift.png" alt="">
        <p>福利活动一手掌握</p>
      </li>
      <li>
        <img src="./img/message.png" alt="">
        <p>优惠信息及时获取</p>
      </li>
      <li>
        <img src="./img/service.png" alt="">
        <p>留言反馈快速解决</p>
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: 'officialAccount',
  components: {

  },
  data () {
    return {
      wechatName: 'ddwgame'
    }
  },
  mounted () {

  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    onCopy () {
      this.$toast.show({ message: '复制成功' })
    },
    onError () {
      this.$toast.show({ message: '复制失败' })
    }
  }
}
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  border: none;
  list-style: none;
}
.official-account {
  padding: 0.3rem;
  font-size: 0.24rem;
  text-align: center;
  .header {
    position: relative;
    font-size: 0.3rem;
    color: #333;
    line-height: 0.44rem;
    text-align: center;
    font-weight: bold;
    img {
      position: absolute;
      width: 0.44rem;
      height: 0.44rem;
      top: 0;
      left: 0;
    }
  }
  .title {
    margin-top: 1rem;
    color: #d1ac42;
    p:first-child {
      font-size: 0.36rem;
      font-weight: bold;
      margin-bottom: 0.16rem;
    }
  }
  .content {
    color: #999;
    img {
      display: block;
      margin: 0.16rem auto;
      width: 2.68rem;
      height: 2.68rem;
    }
    .wx-number {
      font-size: 0.3rem;
      color: #333;
      margin-bottom: 0.1rem;
      span {
        display: inline-block;
        font-size: 0.24rem;
        color: #65a6ff;
        line-height: 0.24rem;
        border-bottom: 1px solid #65a6ff;
        margin-left: 0.06rem;
      }
    }
  }
  .sub-title {
    color: #999;
    position: relative;
    margin-top: 1.38rem;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      width: 1.78rem;
      height: 1px;
      background: #eee;
      top: 50%;
    }
    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      flex: 1;
      font-size: 0;
      img {
        margin: 0.32rem 0 0.28rem;
        width: 0.88rem;
        font-size: 0;
      }
      p {
        font-size: 0.24rem;
        color: #333;
      }
    }
  }
}
</style>
