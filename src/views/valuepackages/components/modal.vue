<template>
  <div class="modal-warp" v-show="show" @touchmove.self.prevent>
    <transition name="mask">
      <div class="modal-mask" v-show="show"></div>
    </transition>
    <div class="modal-content">
      <div class="header">
        <span>下载多多玩APP 领取充值加赠</span>
      </div>
      <div class="content">
        <div class="bind-header">
          <div class="step" :class="{'active': step == 1}">
            <div class="wrap">
              <div class="icon">
                <img src="../images/phone-icon.png" alt="">
              </div>
            </div>
            <p v-if="step == 1">第1步<br>绑定手机号</p>
            <p v-if="step == 2">第1步<br>{{hidePhone}}绑定成功</p>
          </div>
          <div class="step" :class="{'active': step == 2}">
            <div class="wrap">
              <div class="icon">
                <img src="../images/down-icon.png" alt="">
              </div>
            </div>
            <p>第2步<br>下载并登录多多玩</p>
          </div>
          <div class="line">
            <div class="progress" :style="{width: countWidth}"></div>
          </div>
        </div>
        <!-- 绑定手机号 -->
        <div class="bind-phone" v-if="step == 1">
          <div class="binding-warp">
            <div class="input-wrap">
              <input v-model.trim="phone" maxlength="11" type="tel" placeholder="手机号">
            </div>
            <div class="input-wrap">
              <input v-model.trim="code" maxlength="6" type="tel" placeholder="验证码">
              <div class="get-code" @click="getCode">
                <div class="code-warp">{{countdownText}}</div>
              </div>
            </div>
          </div>
          <div class="submit" @click="saveBinding">立即绑定</div>
          <div class="explain">绑定手机号，加赠才能发放到账</div>
        </div>
        <!-- 绑定完成 -->
        <div class="bind-finish" v-if="step == 2">
          <div class="explain">
            用绑定手机号登录多多玩，即能领取加赠
          </div>
          <div v-if="isIOS" class="submit" v-clipboard:copy="copyText" v-clipboard:success="onCopy"
            v-clipboard:error="onError">复制前往</div>
          <div v-else class="submit" @click="toMiddle">立即下载</div>
          <!-- <div class="copy">
          复制下载链接
        </div> -->
          <div class="explain1">
            游戏服务由多多玩官方提供，如有问题<br>
            咨询多多玩客服微信：youxikefu2020
          </div>
        </div>
      </div>
      <div class="close-icon" @click="closeModal"></div>
    </div>
  </div>
</template>
<script>
import utils from '@/common/js/utils.js'
import { getPhoneBindInfo, bindMobilePhone, getPhoneCode, btcDownLoad } from '../utils/api'
export default {
  name: 'Modal',
  data () {
    return {
      show: this.value,
      step: 1,
      countdown: 60,
      countdownText: '获取验证码',
      phone: null,
      code: null,
      copyText: 'https://wap.beeplaying.com/ddwgame/'
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    centerScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    countWidth () {
      if (this.step === 2) {
        return `100%`
      }
      return ''
    },
    hidePhone () {
      var reg = /^(\d{3})\d{4}(\d{4})$/
      return this.phone.replace(reg, '$1****$2')
    },
    isIOS () {
      return utils.isIOS()
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
      if (val && !this.centerScroll) {
        utils.ScrollNoMove()
      } else {
        utils.ScrollMove()
      }
    }
  },
  methods: {
    closeModal () {
      this.show = false
      this.$emit('on-close', 0)
    },
    // 关闭弹框
    close () {
      this.show = false
      this.$emit('on-close', 1)
    },
    // 确认按钮
    save () {
      this.$emit('on-save')
    },
    onCopy () {
      this.$toast.show({ isOneLine: true, duration: 1500, message: '链接已复制，请在浏览器打开。' })
    },
    onError () {
      this.$toast.show({ isOneLine: true, duration: 1500, message: '复制失败' })
    },
    // 前往中间页
    toMiddle () {
      GLOBALS.marchSetsPoint('A_H5PT0348004399')// H5平台-B端多多玩APP充值加赠-领取加赠提示弹窗-立即下载点击
      btcDownLoad().then(res => {
        const { code, data } = res
        if (code === 200) {
          this.$toast.show({ isOneLine: true, duration: 1500, message: '正在下载多多玩，请稍候' }, () => {
            parent.location.href = data
          })
        }
      })
    },
    /** 获取绑定手机数据 **/
    getBindPhone () {
      getPhoneBindInfo().then(res => {
        const { code, data } = res
        if (code === 200) {
          /** 没有绑定手机号的时候打开弹框 **/
          const { existsFlag, phone } = data
          if (existsFlag) {
            this.phone = phone
            this.step = 2
          } else {
            this.step = 1
          }
        }
      })
    },
    // 绑定手机号码
    async saveBinding () {
      GLOBALS.marchSetsPoint('A_H5PT0348004398')// H5平台-B端多多玩APP充值加赠-领取加赠提示弹窗-立即绑定点击
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (this.phone === '') {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '请输入手机号码' })
        return
      }
      if (!phoneReg.test(this.phone)) {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '请输入正确的手机号码' })
        return
      }
      if (this.code === '') {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '请输入短信验证码' })
        return
      }
      const { code, message } = await bindMobilePhone(this.phone, this.code)
      if (code === 200) {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '绑定成功' }, () => {
          this.step = 2
        })
      } else {
        this.$toast.show({ isOneLine: true, duration: 1500, message: message })
      }
    },
    // 获取短信验证吗
    async getCode () {
      let phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (this.countdown !== 60) {
        return
      }
      if (this.phone === '') {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '请输入手机号码' })
        return
      }
      if (!phoneReg.test(this.phone)) {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '请输入正确的手机号码' })
        return
      }
      const { code, data, message } = await getPhoneCode(this.phone)
      if (code === 200) {
        this.$toast.show({ isOneLine: true, duration: 1500, message: '短信验证码已发送，注意查收' })
        this.countdownFn()
      } else {
        this.$toast.show({ isOneLine: true, duration: 1500, message: message })
        clearInterval(this.time)
      }
    },
    // 验证码倒计时计算
    countdownFn () {
      if (this.countdown === 0) {
        this.countdown_text = '重新获取'
        this.countdown = 60
        this.code = ''
        clearTimeout(this.time)
        return false
      } else {
        this.countdown--
        if (this.countdown === 0) {
          this.countdownText = '重新获取'
        } else {
          this.countdownText = this.countdown + 's'
        }
        this.time = setTimeout(() => {
          this.countdownFn()
        }, 1000)
      }
    }
  },
  created () {
    this.getBindPhone()
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.modal-warp {
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}
.modal-mask {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}
.modal-content {
  position: absolute;
  width: 4.7rem;
  min-height: 2rem;
  z-index: 2;
  background-color: #ffffff;
  border-radius: 0.32rem;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);

  .header {
    margin-top: 0.3rem;
    width: 100%;
    position: relative;
    font-size: 0.28rem;
    font-weight: bold;
    color: #000000;
    line-height: 0.4rem;
    text-align: center;
    &:not(.notitile) {
      height: 0.4rem;
      margin-top: 0.36rem;
    }
  }
  .content {
    padding: 0.08rem 0.3rem 0.23rem;
    .bind-header {
      position: relative;
      margin: 0.1rem auto 0.3rem;
      width: 4.1rem;
      display: flex;
      justify-content: space-between;
      .step {
        position: relative;
        z-index: 3;
        text-align: center;
        font-size: 0.2rem;
        color: #bbbbbb;
        .wrap {
          margin: 0 auto 0.15rem;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 0.9rem;
          height: 0.9rem;
          border-radius: 50%;
          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.72rem;
            height: 0.72rem;
            border-radius: 50%;
          }
        }
        p {
          white-space: nowrap;
        }
        &:nth-child(1) {
          .icon {
            background: #ffbd82;
            img {
              width: 0.26rem;
              height: 0.4rem;
            }
          }
        }
        &:nth-child(2) {
          .icon {
            background: #ffe7a9;
            img {
              width: 0.33rem;
              height: 0.3rem;
            }
          }
        }
        &.active {
          color: #000000;
          .wrap {
            background: #ffd7b3;
          }
          .icon {
            background: #ff7800;
          }
        }
      }
      .line {
        position: absolute;
        top: 0.42rem;
        left: 0;
        width: 2.9rem;
        height: 0.06rem;
        background: #ffe7a9;
        .progress {
          width: 1.8rem;
          height: 0.06rem;
          background: #ff7800;
        }
      }
    }
    .bind-phone {
      overflow: hidden;
      .binding-warp {
        padding-top: 0.3rem;
        border-top: 0.01rem solid #eeeeee;
        .input-wrap {
          margin-bottom: 0.2rem;
          display: flex;
          justify-content: space-between;
          background: #f7f7f7;
          border-radius: 0.16rem;
          input {
            padding: 0.1rem 0 0.1rem 0.2rem;
            width: 100%;
            height: 0.7rem;
            line-height: 0.5rem;
            font-size: 0.24rem;
            color: #000;
            background: transparent;
          }
          input::-webkit-input-placeholder {
            color: #cdcdcd;
          }
          input::-moz-input-placeholder {
            color: #cdcdcd;
          }
          input::-ms-input-placeholder {
            color: #cdcdcd;
          }
          &:last-child {
            input {
              width: 1.64rem;
            }
          }
          .code-warp {
            margin-top: 0.15rem;
            width: 1.53rem;
            height: 0.4rem;
            font-size: 0.24rem;
            color: #ff7800;
            text-align: center;
            line-height: 0.4rem;
            border-left: 0.01rem solid #e6e6e6;
          }
        }
      }
      .submit {
        margin: 0 auto 0.2rem;
        width: 4.1rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background: #ff4141;
        text-align: center;
        font-size: 0.24rem;
        color: #ffffff;
        border-radius: 0.16rem;
      }
      .explain {
        text-align: center;
        font-size: 0.2rem;
        color: #bbbbbb;
      }
    }
    .bind-finish {
      padding-top: 0.13rem;
      border-top: 0.01rem solid #eeeeee;
      .explain {
        margin-bottom: 0.27rem;
        font-size: 0.24rem;
        color: #000000;
      }
      .submit {
        margin: 0 auto 0.2rem;
        width: 4.1rem;
        height: 0.7rem;
        line-height: 0.7rem;
        background: #ff4141;
        text-align: center;
        font-size: 0.24rem;
        color: #ffffff;
        border-radius: 0.16rem;
      }
      .explain1 {
        text-align: center;
        font-size: 0.2rem;
        color: #bbbbbb;
      }
    }
  }
  .close-icon {
    position: absolute;
    height: 0.18rem;
    width: 0.18rem;
    top: 0.2rem;
    right: 0.2rem;
    text-align: center;
    line-height: 0.4rem;
    background: url('../images/small-close.png') no-repeat;
    background-size: 100% 100%;
    i {
      font-size: 0.18rem;
      color: #888888;
    }
  }
}
// 动画
.mask-enter {
  opacity: 0;
}
.mask-enter-active {
  transition: opacity 0.3s;
}
.mask-leave-to {
  opacity: 0;
}
.mask-leave-active {
  transition: opacity 0.3s;
}
</style>


