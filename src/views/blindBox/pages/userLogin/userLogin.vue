<template>
  <div class="code-login">
    <nav-bar title="开盲盒 100%中奖" :showBack="false"/>
    <div class="logo">
      <img src="./img/logo.png" alt="">
    </div>
    <div class="title">登录即可领取优惠</div>
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
    <div v-if="isSubmit" class="code-submit" @click="codeSubmit">立即登录</div>
    <div v-else class="code-submit disable" @click="codeSubmit">立即登录</div>
  </div>
</template>
<script>
import {getRequestToken, sendCode, getAccessToken} from '../../apis/bindPhone'
import navBar from '../../components/navBar/'
import _get from 'lodash.get'
export default {
  name: 'bindPhone',
  data: () => ({
    mobile: '',
    code: '',
    countTime: ''
  }),
  computed: {
    isSubmit () {
      let reg = /^1\d{10}/
      return this.code.length == 6 && reg.test(this.mobile)
    }
  },
  components: {
    navBar
  },
  methods: {
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
      sendCode({
        receiveRange: 1,
        username: this.mobile
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
    /** 获取token **/
    _getAccessToken(requestToken) {
      getAccessToken({
        token: requestToken,
        type: 1
      }).then(res => {
        let {code, data, message} = _get(res, 'data', {})
        if(code == 200) {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken)
          this.$toast.show({message: '登录成功',duration: 2000},()=> {
            this.$router.push({
              name: 'BlindBox'
            })
          })
        }else {
          this.$Toast.show({message})
        }
      })
    },
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
      getRequestToken({
        smsCode: this.code,
        username: this.mobile,
        visitorToken: ""
      }).then(res=> {
        let {code, data, message} = _get(res, 'data', {})
        if(code === 200) {
          this._getAccessToken(data)
        }else {
          this.$toast.show({message})
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.code-login {
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
}
</style>