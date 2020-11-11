<template>
  <section class="wx_invitation">
    <div class="back" @click="back"></div>
    <div class="wx_content">
      <div class="attention">
        <h1>公众号：多多玩VIP</h1>
        <div class="attention_btn">点击去关注</div>
      </div>
      <div class="info">长按保存二维码在微信中打开即可关注</div>
      <div class="qrcode">
        <qrcode tag="img"  id="img" :value="qrCodeUrl" name="img"></qrcode>
      </div>
      <div class="attention">
        <h1>微信号：{{wxCode}}</h1>
        <div class="attention_btn" v-clipboard:copy="wxCode" v-clipboard:success="onCopy"
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
    name: 'adventure',
    components: {
      qrcode
    },
    data () {
      return {
        wxCode: 'duoduowan',
        qrCodeUrl: 'https://www.baidu.com'
      }
    },
    computed: {},
    mounted () {
    },
    methods: {
      back () {
        history.back(-1)
      },
      onCopy () {
        this.$toast.show({message: '复制成功'})
      },
      onError () {
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
        #img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>
