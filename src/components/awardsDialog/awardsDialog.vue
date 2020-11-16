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
        <!-- <div class="closed iconfont icon-close" @click="hideDialog"></div> -->
        <div class="tips">{{tipsTxt}}
          <p v-if="tipsOtherText">{{tipsOtherText}}</p>
        </div>
        <slot>
          <!--奖品-->
          <div class="awards" v-if="showAwards">
            <!--奖品图片-->
            <div class="awards-img" :class="{'height-auto':awards.autoHeight}">
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
        </slot>
        <!-- 确认按钮 -->
        <div class="confirm-btn" v-if="confirmBtnText" @click="confirmCallback">
          {{ confirmBtnText }}
        </div>
        <div class="normal-btn" v-if="normalBtnText && normalBtnText.length">
          <div @click="confirmCallback('cancel')">{{normalBtnText[0]}}</div>
          <div v-if="normalBtnText[1]" @click="confirmCallback('sure')">{{normalBtnText[1]}}</div>
        </div>
        <div class="bottom-link" v-if="bottomLink.text" @click="bottomLink.callback">
          {{ bottomLink.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import utils from '@/common/js/utils'
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
    /** 确认按钮文字 **/
    normalBtnText: {
      type: Array,
      default: () => ([])
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
        awardsName: '',
        nofilter: false,
        autoHeight: false
      })
    },
    tipsTxt: {
      type: String,
      default: '恭喜您获得'
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
      this.$emit('closedCallback', 'close')
    },
    /** 确认按钮回掉 **/
    confirmCallback (type) {
      this.$emit('callback', type)
    }
  },
  computed: {
    showAwards () {
      return this.awards.awardsImage || this.awards.awardsName
    }
  },
  watch: {
    value (val) {
      if (val) {
        utils.ScrollNoMove()
      } else {
        utils.ScrollMove()
      }
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
      top: -0.78rem;
      transform: translate(-50%, 0);
      width: 2.75rem;
      height: 1.55rem;
      img {
        vertical-align: top;
        width: 100%;
      }
    }
    .wrapper {
      padding: 0.78rem 0 0.01rem;
      width: 100%;
      background: #fff;
      overflow: visible;
      border-radius: 0.32rem;
      .closed {
        position: absolute;
        right: 0.3rem;
        top: 0.3rem;
        color: #666666;
        font-size: 0.18rem;
      }
      .tips {
        margin-top: 0.15rem;
        font-size: 0.28rem;
        font-weight: bold;
        color: #000;
        text-align: center;
        p {
          font-weight: 400;
        }
      }
      .awards {
        margin-top: 0.19rem;
        .awards-img {
          margin: 0 auto;
          height: 1.6rem;
          text-align: center;
          img {
            max-width: 90%;
            height: 100%;
            vertical-align: top;
          }
          &.height-auto {
            height: auto;
            img {
              max-width: 100%;
              height: auto;
            }
          }
        }
        .awards-name {
          margin-top: 0.18rem;
          color: #ff4141;
          font-size: 0.24rem;
          text-align: center;
        }
      }
      .explain {
        margin-top: 0.06rem;
        font-size: 0.2rem;
        color: #bbbbbb;
        text-align: center;
      }
      .confirm-btn {
        margin: 0.28rem auto 0.42rem;
        width: 2.5rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
        border-radius: 0.16rem;
        overflow: hidden;
        background: #ff4141;
      }
      .normal-btn {
        color: #000;
        text-align: center;
        border-top: 0.01rem solid #eee;
        line-height: 0.9rem;
        font-size: 0.24rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        div {
          flex: 1;
          &:last-child {
            color: #ff4141;
          }
        }
      }
      .bottom-link {
        margin: 0.2rem auto 0;
        color: #5186ca;
        text-align: center;
        font-size: 0.24rem;
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
<style>
.explain .fs24 {
  font-size: 0.24rem;
  line-height: 0.36rem;
}
.explain .margin30auto {
  margin: 0.3rem auto;
}
.explain .color888 {
  color: #888;
}
.explain .red-text {
  color: #ff4141;
}
</style>