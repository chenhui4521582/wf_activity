<template>
  <main>
    <article>
      <div v-if="isIOS" v-clipboard:copy="copyText" v-clipboard:success="onCopyUrl"
        v-clipboard:error="onError">复制下载链接</div>
      <div v-else @click="download">立即下载领奖</div>
      <p class="desc">用户已绑定手机号登录，奖品即可到账</p>
      <p>
        游戏服务由第三方多多玩提供<br />
        如有问题咨询多多玩客服微信:
        <span v-clipboard:copy="wechatName" v-clipboard:success="onCopy"
          v-clipboard:error="onError">
          {{wechatName}}
        </span>
      </p>
    </article>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import utils from '../../common/js/utils'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      wechatName: 'youxikefu2020',
      copyText: 'https://wap.beeplaying.com/ddwgame/'
    }
  },
  computed: {
    channel () {
      return localStorage.getItem('APP_CHANNEL') || ''
    },
    isIOS () {
      return utils.isIOS()
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('P_H5PT0305', {
      source_address: GLOBALS.getUrlParam('from') || ''
    }) // H5平台-百度联运包-下载中间页加载完成
    if (this.isIOS) {
      return
    }
    switch (this.channel) {
      case '100039':
        this.createIframe('https://wap.beeplaying.com/m/apk/hk_ddw_100097.apk')
        break
      case '100042':
        this.createIframe('https://wap.beeplaying.com/m/apk/qm_ddw_100098.apk')
        break
      default:
        break
    }
  },
  methods: {
    download () {
      GLOBALS.marchSetsPoint('A_H5PT0305003707') // H5平台-百度联运包-下载中间页-下载按钮点击
      switch (this.channel) {
        case '100039':
          this.createIframe('https://wap.beeplaying.com/m/apk/hk_ddw_100097.apk')
          break
        case '100042':
          this.createIframe('https://wap.beeplaying.com/m/apk/qm_ddw_100098.apk')
          break
        default:
          break
      }
    },
    onCopyUrl () {
      GLOBALS.marchSetsPoint('A_H5PT0305003707') // H5平台-百度联运包-下载中间页-下载按钮点击
      this.$toast.show({ message: '链接已复制，请在浏览器打开。', isOneLine: true })
    },
    onCopy () {
      GLOBALS.marchSetsPoint('A_H5PT0305003708') // H5平台-百度联运包-下载中间页-复制客服微信点击
      this.$toast.show({ message: '已复制' })
    },
    onError () {
      this.$toast.show({ message: '复制失败' })
    },
    createIframe (url) {
      let iframe = document.createElement('iframe')
      iframe.src = url
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      setTimeout(() => {
        iframe.remove()
      }, 1000)
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
    background: #fff;
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
      font-size: 0.26rem;
      font-weight: bold;
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
