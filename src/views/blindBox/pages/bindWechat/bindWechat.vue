<template>
  <div class="code-login" v-if="show">
    <nav-bar title="关注公众号" @back="goBack"/>
    <!-- 步骤 -->
    <step :bindPhone="bindPhone"/>
    <!-- 绑定手机号 -->
    <template v-if="step == 1">
      <div class="from-group">
        <input v-model="mobile" maxlength="11" type="text" placeholder="请输入手机号" >
        <div class="clear" v-if="this.mobile" @click="clearMobile"></div>
      </div>
      <div class="from-group code">
        <div class="wrap">
          <input v-model="code" maxlength="6" type="text" placeholder="请输入验证码" >
          <div class="clear" v-if="this.code" @click="clearCode"></div>
        </div>
        <div class="send-code">
          <div class="btn" v-if="!countTime" @click="_sendCode">发送验证码</div>
          <div class="count-down" else>{{countTime}}</div>
        </div>
      </div>
      <div v-if="isSubmit" class="code-submit" @click="codeSubmit">立即绑定</div>
      <div v-else class="code-submit disable" @click="codeSubmit">立即绑定</div>
    </template>
    <template v-if="step == 2">
      <div class="wechat-title">公众号：幸运盲盒</div>
      <div class="wechat-title1">长按或截图保存二维码在微信中打开关注</div>
      <div class="wechat-img">
        <img src="./img/wechat-img.jpg" alt="">
      </div>
      <div class="wechat-name">
        微信号：
        <span>{{wechatName}}</span>
        <span class="copy"
          v-clipboard:copy="wechatName"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
        >复制</span>
      </div>
      <div class="wechat-explain">
        复制微信号，在微信中搜索也可关注
      </div>
    </template>
    <div class="welfare">
      <div class="welfare-title">
        <div class="text">关注公众号 福利多多</div>
        <div class="line"></div>
      </div>
      <div class="wrap">
        <div class="item">
          <img src="./img/icon1.png" alt="">
          <p>追踪发货物流</p>
        </div>
        <div class="item">
          <img src="./img/icon2.png" alt="">
          <p>获取优惠信息</p>
        </div>
        <div class="item">.
          <img src="./img/icon3.png" alt="">
          <p>专属售后保障</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {bindPhone, getSendCode, getUserBind} from '../../apis/bindPhone'
import navBar from '../../components/navBar/'
import step from './components/step'
import _get from 'lodash.get'
export default {
  name: 'bindWechat',
  data: () => ({
    mobile: '',
    code: '',
    countTime: '',
    bindPhone: '',
    wechatName: 'luckybox2020',
    show: false
  }),
  computed: {
    isSubmit () {
      let reg = /^1\d{10}/
      return this.code.length == 6 && reg.test(this.mobile)
    },
    step() {
      if(this.bindPhone) {
        return 2
      }
      return 1
    }
  },
  components: {
    navBar,
    step
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onCopy() {
      this.$toast.show({message: '复制成功'})
    },
    onError() {
      this.$toast.show({message: '复制失败'})
    },
    clearMobile() {
      this.mobile = ""
    },
    clearCode() {
      this.code = ""
    },
    /** 发送验证码 **/
    _sendCode() {
      let mobileReg = /^1\d{10}/
      if (!this.mobile|| !mobileReg.test(this.mobile)) {
        this.$toast.show({message: '手机号码有误'})
        return false
      }
      getSendCode({
        phone: this.mobile
      }).then(res => {
        let {code, data, message} = _get(res, 'data', {})
        if(code === 200) {
          this.countDown()
        }else {
          this.$toast.show({message})
        }
      })
    },
    /** 倒计时 60 **/
    countDown() {
      let date = 60
      this.timer = setInterval(() => {
        date = date - 1
        if (date < 0) {
          date = 0
          clearInterval(this.timer)
          this.countTime = ''
          return false
        }
        this.countTime = date+'后重发'
      }, 1000)
    },
    /** 绑定手机号 **/
    codeSubmit() {
      let mobileReg = /^1\d{10}/
      if (!this.mobile|| !mobileReg.test(this.mobile)) {
        this.$toast.show({message: '手机号码有误'})
        return false
      }
      if (!this.code || this.code.length < 6) {
        this.$toast.show({message: '请输入验证码'})
        return false
      }
      bindPhone({
        smsCode: this.code,
        phone: this.mobile,
      }).then(res=> {
        let {code, data, message} = _get(res, 'data', {})
        if(code === 200) {
          this.$toast.show({message: '绑定成功'}, () => {
            this.bindPhone = this.mobile
          })
        }else {
          this.$toast.show({message})
        }
      })
    },
    /** 获取用户是否绑定过手机号 **/
    _getUserBind() {
      getUserBind().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.bindPhone = _get(res, 'data.data.phone', '')
        }
        this.show = true
      }).catch(error => {
        this.show = true
      })
    }
  },
  watch: {
    step (val) {
      if (val === 2) {
        GLOBALS.marchSetsPoint('A_H5PT0225003140')
      }
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0225003139')
    this._getUserBind()
  }
}
</script>
<style lang="less" scoped>
.code-login {
  padding-bottom: .5rem;
  min-height: 100vh;
  background: #fff;
  .logo {
    margin: 1.13rem auto .6rem;
    width: 1.5rem;
    height: 2rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
  .title {
    font-size: .3rem;
    color: #D1AC42;
    text-align: center;
  }
  .from-group {
    margin: 0 .6rem;
    padding: .58rem 0 .33rem;
    display: flex;
    justify-self: space-between;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;
    input {
      flex: 1;
      height: .64rem;
      color: #CCCCCC;
      font-size: .3rem;
      background: none;
    }
    .send-code {
      flex-shrink: 0;
      width: 1.55rem;
      height: .64rem;
      color: #FFF;
      text-align: center;
      line-height: .66rem;
      .count-down {
        background: #DDDDDD;
        border-radius: .32rem;
      }
      .btn {
        background:#D1AC42;
        border-radius: .32rem;
      }
    }
    .clear {
      width: .4rem;
      height: .4rem;
      background: url(./img/clear.png) no-repeat center center;
      background-size: .38rem .38rem;
    }
    &.code {
      display: flex;
      justify-content: space-between;
      .wrap {
        width: calc( 100% - 1.55rem);
        display: flex;
        justify-content: space-between;
        align-items: center;
        input {
          width: 3rem;
          flex: 0;
        }
      }
      .clear {
        margin-right: .4rem;
      }
    }
  }
  .code-submit {
    margin: .55rem .6rem;
    height: .8rem;
    line-height: .8rem;
    text-align: center;
    border-radius: .16rem;
    background:#D1AC42;
    font-size: .32rem;
    color: #fff;
    &.disable {
      background:#E2E2E2;
    }
  }
  .welfare {
    overflow: hidden;
    padding: 0 .6rem;
    .welfare-title {
      margin-bottom: .33rem;
      position: relative;
      height: .4rem;
      .text {
        position: absolute;
        left: 50%;
        top: 0;
        z-index: 2;
        transform: translate(-50%, 0);
        height: .4rem;
        line-height: .48rem;
        text-align: center;
        color: #999999;
        font-size: .24rem;
      }
      .line {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        transform: translate(-50%, 50%);
        border-bottom: 1px solid #eee;
        height: 0;
        width: 100%;
      }
    }
    .wrap {
      display: flex;
      justify-content: space-around;
      .item {
        text-align: center;
        img {
          margin-bottom: .31rem;
          width: .88rem;
          height: 1.01rem;
        }
        p {
          white-space: nowrap;
          text-align: center;
        }
      }
    }
  }
  .wechat-title {
    padding: .4rem 0 .2rem;
    font-size: .36rem;
    color: #D1AC42;
    font-weight: bold;
    text-align: center;
  }
  .wechat-title1 {
    padding: 0 0 .36rem;
    font-size: .24rem;
    color: #D1AC42;
    text-align: center;
  }
  .wechat-img {
    margin-bottom: .5rem;
    text-align: center;
    img {
      width: 2.58rem;
      height: 2.58rem;
    }
  }
  .wechat-name {
    padding-bottom: .16rem;
    font-size: .30rem;
    color: #333;
    text-align: center;
    .copy {
      font-size: .24rem;
      color: #65A6FF;
      text-decoration: underline;
    }
  }
  .wechat-explain {
    padding-bottom: .65rem;
    text-align: center;
    color: #999999;
    font-size: .24rem;
  }
}
</style>
