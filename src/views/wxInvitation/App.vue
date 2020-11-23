<template>
  <section class="wx_invitation">
    <div class="back" @click="back"></div>
    <div class="wx_content" v-if="actInfo">
      <div class="attention">
        <h1>公众号：{{actInfo.wechatName}}</h1>
        <!--<div class="attention_btn">点击去关注</div>-->
      </div>
      <div class="info">长按保存二维码在微信中打开即可关注</div>
      <div class="qrcode">
        <img :src="actInfo.wechatImg|filter" alt="" id="img">
        <!--<qrcode tag="img"  id="img" :value="qrCodeUrl" name="img"></qrcode>-->
      </div>
      <div class="attention">
        <h1>微信号：{{actInfo.wechatId}}</h1>
        <div class="attention_btn" v-clipboard:copy="actInfo.wechatId" v-clipboard:success="onCopy"
             v-clipboard:error="onError">复制
        </div>
      </div>
      <div class="info">复制微信号，在微信中搜索也可关注</div>
    </div>
  </section>
</template>

<script>
  import {activityInfo} from './utils/api'
  import qrcode from '@xkeshi/vue-qrcode'
  export default {
    name: 'wxInvitation',
    components: {
      qrcode
    },
    data () {
      return {
        wxCode: 'duoduowan',
        qrCodeUrl: 'https://www.baidu.com',
        actInfo: null
      }
    },
    computed: {},
    async mounted () {
      GLOBALS.marchSetsPoint('P_H5PT0352', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      let {code, data} = await activityInfo()
      if (code == 200) {
        this.actInfo = data
        if (this.actInfo.cdkExchanged) {
          this.$toast.show({
            message: '您已经参加过活动了'
          })
        }
      }
    },
    methods: {
      back () {
        history.back(-1)
      },
      onCopy () {
        GLOBALS.marchSetsPoint('A_H5PT0352004486')
        this.$toast.show({message: '复制成功'})
      },
      onError () {
        GLOBALS.marchSetsPoint('A_H5PT0352004486')
        this.$toast.show({message: '复制失败 '})
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .wx_invitation {
    width: 7.2rem;
    height: 17.3rem;
    background: url("./img/bg.png");
    background-size: 100% 100%;
    position: relative;
    .back {
      position: absolute;
      top: .36rem;
      left: 0;
      width: .6rem;
      height: .52rem;
      background: url("./img/back.png");
      background-size: 100% 100%;
    }
    .wx_content {
      position: absolute;
      top: 6.2rem;
      left: 0;
      right: 0;
      margin: auto;
      .attention {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .26rem;
        font-weight: bold;
        color: #000000;
        .attention_btn {
          margin-left: .16rem;
          padding: .03rem .07rem;
          font-size: .2rem;
          font-weight: 500;
          color: #037A54;
          border: 1px solid #037E57;
          border-radius: .13rem;
        }
      }
      .info {
        margin-top: .08rem;
        text-align: center;
        font-size: .2rem;
        font-weight: 500;
        color: #858585;
      }
      .qrcode {
        width: 2.04rem;
        height: 2.04rem;
        margin: .23rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        #img{
          width: 2.04rem;
          height: 2.04rem;
          margin: .23rem auto;
        }
      }
    }
  }
</style>
