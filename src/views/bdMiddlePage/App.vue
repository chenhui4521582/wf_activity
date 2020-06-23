<template>
  <main>
    <article>
      <div @click="download">立即下载领奖</div>
      <p class="desc">用户已绑定手机号登录，奖品即可到账</p>
      <p>
        游戏服务由第三方多多玩提供<br />
        如有问题咨询多多玩客服:
        <span v-clipboard:copy="wechatName" v-clipboard:success="onCopy"
          v-clipboard:error="onError">
          {{wechatName}}
        </span>
      </p>
    </article>
  </main>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      wechatName: 'youxikefu2020'
    }
  },
  computed: {
    channel () {
      return localStorage.getItem('APP_CHANNEL') || ''
    }
  },
  mounted () {
    this.download()
  },
  methods: {
    download () {
      switch (this.channel) {
        case '100039':
          location.href = 'https://wap.beeplaying.com/m/apk/hk_ddw_100097.apk'
          break
        case '100042':
          location.href = 'https://wap.beeplaying.com/m/apk/qm_ddw_100098.apk'
          break

        default:
          break
      }
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
main {
  height: 100vh;
  width: 100vw;
  font-size: 0;
  background: #bb2ace url(./img/bg.png) no-repeat center top;
  background-size: 100% auto;
  article {
    font-size: 0.24rem;
    text-align: center;
    position: fixed;
    left: 50%;
    bottom: 0;
    width: 100vw;
    margin-left: -50vw;
    height: 3.96rem;
    background: radial-gradient(
      21rem at 50% -20.6rem,
      transparent 20.96rem,
      #fff
    );
    div {
      width: 4.6rem;
      height: 0.9rem;
      line-height: 0.9rem;
      background: #ff4141;
      border-radius: 0.16rem;
      color: #fff;
      margin: 0.94rem auto 0.2rem;
    }
    p {
      color: #bbb;
      font-size: 0.2rem;
      line-height: 0.3rem;
      span {
        color: #5186ca;
        border-bottom: 1px solid #5186ca;
      }
    }
    .desc {
      color: #888;
      margin-bottom: 0.4rem;
      font-size: 0.24rem;
      line-height: 0.36rem;
    }
  }
}
</style>
