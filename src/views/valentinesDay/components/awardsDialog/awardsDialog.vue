<template>
  <div class="awards-dialog" v-show="value">
    <div class="mask"></div>
    <div class="dialog-content">
      <div class="title">
        <img v-if="titleImg" :src="titleImg" alt="" />
        <img v-else src="./img/title.png" alt="" />
      </div>
      <div class="wrapper">
        <!-- 关闭按钮 -->
        <div class="closed iconfont icon-close" @click="hideDialog"></div>
        <div class="tips">{{tipsTxt}}
          <p v-if="tipsOtherText">{{tipsOtherText}}</p>
        </div>
        <!--奖品-->
        <div class="awards" v-if="showAwards">
          <!--奖品图片-->
          <div class="awards-img">
            <img v-if="awards.nofilter" :src="awards.awardsImage" alt="">
            <img v-else :src="awards.awardsImage | filter" alt="" />
          </div>
          <!--奖品名称-->
          <div class="awards-name">
            {{ awards.awardsName }}
          </div>
        </div>
        <!-- 说明 -->
        <div class="explain" v-if="explainText.text" :style="`color:${explainText.color}`">
          {{ explainText.text }}
        </div>
        <div class="explain" v-if="explainText.html" v-html="explainText.html">
        </div>
        <!-- 确认按钮 -->
        <div class="confirm-btn" @click="confirmCallback">
          {{ confirmBtnText }}
        </div>
        <div class="bottom-link" v-if="bottomLink.text" @click="bottomLink.callback">
          {{ bottomLink.text }}
        </div>
      </div>
      <!-- 强广位置 -->
      <div class="recommend" v-if="showRecommend" @click="recommendClick">
        <img :src="recommend.cdnImage | filter" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import newUtils from '../utils.js'
export default {
  name: 'awardsDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    /** 头部图片 **/
    titleImg: {
      type: String,
      default: ''
    },
    /** 确认按钮文字 **/
    confirmBtnText: {
      type: String,
      default: '朕收下了'
    },
    /** 底部链接 **/
    bottomLink: {
      type: Object,
      default: () => ({
        text: '',
        callback: function () { }
      })
    },
    /** 说明文字 **/
    explainText: {
      type: Object,
      default: () => ({
        text: '',
        color: '#ACACAC'
      })
    },
    /** 奖品 **/
    awards: {
      type: Object,
      default: () => ({
        awardsImage: '',
        awardsName: ''
      })
    },
    /** 推广位 **/
    recommend: {
      type: Object,
      default: () => ({
        cdnImage: '',
        url: ''
      })
    },
    tipsTxt: {
      type: String,
      default: '恭喜你奖品兑换成功'
    },
    tipsOtherText: {
      type: String,
      default: ''
    }
  },
  methods: {
    /** 关闭弹出框 **/
    hideDialog () {
      this.$emit('input', false)
      this.$emit('closedCallback')
    },
    /** 确认按钮回掉 **/
    confirmCallback () {
      this.$emit('callback')
    }
  },
  computed: {
    showAwards () {
      return this.awards.awardsImage || this.awards.awardsName
    },
    showRecommend () {
      return this.recommend.cdnImage && this.recommend.url
    }
  }
}
</script>

<style scoped lang="less">
.awards-dialog {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    background: rgba(0, 0, 0, 0.7);
  }
  .dialog-content {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 11;
    width: 4.7rem;
    transform: translate(-50%, -50%);
    .title {
      position: absolute;
      left: 50%;
      top: -.78rem;
      transform: translate(-50%, 0);
      width: 2.75rem;
      height: 1.55rem;
      img {
        vertical-align: top;
        width: 100%;
      }
    }
    .wrapper {
      padding: .78rem 0 .43rem;
      width: 100%;
      background: #fff;
      overflow: visible;
      border-radius: .32rem;
      .closed {
        position: absolute;
        right: .3rem;
        top: .3rem;
        color: #666666;
        font-size: .26rem;
      }
      .tips {
        margin-top: .15rem;
        font-size: .28rem;
        font-weight: bold;
        color: #000;
        text-align: center;
      }
      .awards {
        margin-top: .19rem;
        .awards-img {
          margin: 0 auto;
          // width: 250px;
          height: 1.6rem;
          text-align: center;
          img {
            max-width: 90%;
            height: 100%;
            vertical-align: top;
          }
        }
        .awards-name {
          margin-top: .18rem;
          color: #ff4141;
          font-size: .24rem;
          text-align: center;
        }
      }
      .explain {
        margin-top: .06rem;
        font-size: .2rem;
        color: #bbbbbb;
        text-align: center;
      }
      .confirm-btn {
        margin: .28rem auto 0;
        width: 2.5rem;
        height: .7rem;
        line-height: .7rem;
        text-align: center;
        font-size: .24rem;
        color: #fff;
        border-radius: .16rem;
        overflow: hidden;
        background: #ff4141;
      }
      .bottom-link {
        margin: .2rem auto 0;
        color: #5186ca;
        text-align: center;
        font-size: .24rem;
      }
    }
    .recommend {
      margin: .2rem auto 0;
      width: 4.7rem;
      text-align: center;
      border-radius: .16rem;
      overflow: hidden;
      img {
        max-width: 100%;
        vertical-align: top;
      }
    }
  }
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
