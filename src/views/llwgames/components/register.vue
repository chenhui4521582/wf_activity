<template>
  <div class="register">
    <headers text="注册" linkHref="#/"></headers>
    <!-- <div class="page-header">
			<div class="page-back">
				<a href="javascript:" @click="back">
					<img src="../assets/images/arrow_back.png" class="h-back">
				</a>
			</div>注册
		</div> -->
    <div class="r-phone">
      <div class="r-box">
        <div class="r-left">
          +86
        </div>
        <div class="r-right">
          <input type="text" placeholder="手机号" ref="rPhoneNumber" maxlength="11" />
        </div>
      </div>
    </div>
    <input-text :iVerification="true" iName="验证码" iText="" iPlaceholder="请输入验证码" @getCode="getCode" ref="dVerificationCode" @getVal="getVcode" :isShowVerification="true"></input-text>
    <!-- <div class="l-space"></div> -->
    <input-text iName="新密码" iText="" iPlaceholder="长度为6-16个字符（不能包含空格）" :line="false" @getVal="getNewCode" type="password"></input-text>
    <!--<div class="ck-box">-->
    <!--<input id="input" type="checkbox" v-model="checked"> <label id="label" for="input">同意</label>-->
    <!--<span @click="showProtocal">《用户注册协议》</span>-->
    <!--</div>-->
    <a href="javascript:" class="btn-register" @click="submit">注册</a>
    <div class="statement2" v-if=" channel == '700003' ">
      <div class="statement1">苏ICP备17060724号-1</div>@2017苏州玩蜂软件科技有限公司
    </div>
    <div class="statement2" v-if="host=='beeplay123'">
      <div class="statement1">苏ICP备17060724号-3<br /><a target="_blank" href="http://www.beian.miit.gov.cn/">增值电信业务经营许可证：苏B2-20190263</a><br /><a target="_blank" href="http://www.beian.miit.gov.cn/">苏网文 (2019) 1414-046号</a></div>
      <p>客服电话：400-873-5311</p>
      ©2017-2018 玩蜂科技（苏州）科技有限公司
    </div>
    <div class="statement2" v-else>
      <div class="statement1">蜀ICP备17017217号-1</div>@2018成都 六六五网络科技有限公司
    </div>
  </div>
</template>
<script type="text/javascript">
import inputText from './inputText';
import headers from './header';
import utils from '../../../common/js/utils';
export default {
  data () {
    return {
      title: '注册',
      vAccount: '',
      popBtn: "确定",
      showPop: false,
      popContent: '',
      vCode: '',
      vNewCode: '',
      checked: false,
      channel: localStorage.getItem('APP_CHANNEL')
    }
  },
  mounted () {

    document.title = '注册'

    //			Vue.http.headers.common['Authorization'] = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') :'';
    //			Vue.http.headers.common['App-Channel'] = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):'';
    //
    //			Vue.http.headers.common['App-Version'] = localStorage.getItem('APP_VERSION') ? localStorage.getItem('APP_VERSION'):'';
  },
  components: {
    headers,
    inputText
  },
  computed: {
    host () {
      return utils.getUrlParamObj('host')
    }
  },
  methods: {
    back () {
      history.go(-1);
    },
    getCode () {
      this.vAccount = this.$refs.rPhoneNumber.value;

      let vAccount = utils.checkValidate('phone', this.vAccount);
      if (this.vAccount == '') {
        this.$toast.show({
          message: '请输入您的手机号！',
          duration: 1500
        });
        return;
      } else if (vAccount != '') {
        this.$toast.show({
          message: '请输入您的手机号！',
          duration: 1500
        });
        return;
      }

      this.axios.post('//uic-api.beeplaying.com/uic/api/user/register/sendCode', {
        username: this.vAccount
      }).then((res) => {
        if (res.data.code == 200) {
          this.$refs.dVerificationCode.countDown();
        } else {
          this.$toast.show({
            message: res.data.message,
            duration: 1500
          });
        }
      })
    },
    getNewCode (val) {
      this.vNewCode = val;
    },
    getVcode (val) {
      this.vCode = val;
    },
    codePart () {
      var that = this;
      that.axios.post('//uic-api.beeplaying.com/uic/api/user/login/requestToken', {
        "username": that.vAccount,
        "password": that.vNewCode
      }).then((response) => {

        if (response.data.code == 200) {
          that.axios.post('//uic-api.beeplaying.com/uic/api/user/login/accessToken', {
            token: response.data.data,
            type: 1
          }).then((res) => {
            if (res.data.code == 200) {
              localStorage.setItem('ACCESS_TOKEN', res.data.data.accessToken);
              // localStorage.setItem('APP_CHANNEL', '100000');
              that.$toast.show({
                message: '注册成功！',
                duration: 1500
              });
              setTimeout(() => {
                location.replace('https://wap.beeplaying.com/llwWap?channel=' + this.channel)
              }, 2000);
            } else {
              that.$toast.show({
                message: res.data.message,
                duration: 1500
              });
            }
          })
        } else {
          that.$toast.show({
            message: response.data.message,
            duration: 1500
          });
        }
      })
    },
    submit () {
      var that = this;
      this.vAccount = this.$refs.rPhoneNumber.value;
      let vNewCode = utils.checkValidate('pswd', this.vNewCode);
      let vCode = utils.checkValidate('code', this.vCode);
      let vAccount = utils.checkValidate('phone', this.vAccount);
      if (this.vAccount == '') {
        this.$toast.show({
          message: '请输入您的手机号！',
          duration: 1500
        });
        return;
      } else if (vAccount != '') {        ;
        this.$toast.show({
          message: '手机号格式不正确！',
          duration: 1500
        });
        return;
      }
      if (this.vCode == '') {
        this.$toast.show({
          message: '请输入验证码',
          duration: 1500
        });
        return;
      } else if (vCode != '') {
        this.$toast.show({
          message: '验证码不正确',
          duration: 1500
        });
        return;
      }
      if (this.vNewCode == '') {
        this.$toast.show({
          message: '请输入新密码',
          duration: 1500
        });
        return;
      } else if (vNewCode != '') {
        this.$toast.show({
          message: '新密码格式不正确',
          duration: 1500
        });
        return;
      }
      // if(!this.checked) {
      //     this.$toast.show({
      // 		message: '请勾选注册协议',
      // 		duration: 1500
      // 	});
      //     return;
      // }

      let ykBindOrigin = localStorage.getItem('ykBindOrigin') ? localStorage.getItem('ykBindOrigin') : '';
      let userid = localStorage.getItem('userid') ? localStorage.getItem('userid') : '';
      if (!ykBindOrigin) {

        this.axios.post('//uic-api.beeplaying.com/uic/api/user/register/save', {
          "password": this.vNewCode,
          "smsCode": this.vCode,
          "username": this.vAccount,
        }).then((res1) => {
          if (res1.data.code == 200) {
            this.codePart();
          } else {
            this.$toast.show({
              message: res1.data.message,
              duration: 1500
            });
          }

        })
      } else {
        this.axios.post('//uic-api.beeplaying.com/uic/api/user/register/save', {
          "password": this.vNewCode,
          "smsCode": this.vCode,
          "username": this.vAccount,
          "visitorToken": userid
        }).then((res1) => {
          if (res1.data.code == 200) {
            this.codePart();
          } else {
            this.$toast.show({
              message: res1.data.message,
              duration: 1500
            });
          }
        })
      }

    },
    closePop () {
      this.showPop = false;
    },
    showProtocal () {
      location.href = '//wap.beeplaying.com/agreement/platformProtocol.html'

      // this.$router.replace('/protocol')
    }
  }
}
</script>
<style lang="less" scoped>
.page-header {
  width: 100%;
  height: 1.76/2rem;
  line-height: 1.76/2rem;
  position: relative;
  text-align: center;
  font-size: 0.68/2rem;
  color: #000;
}
.page-header .page-back {
  width: 1.24/2rem;
  height: 1.76/2rem;
  position: absolute;
  left: 0;
  top: 0;
}
.page-header .h-back {
  width: 0.4/2rem;
  height: 0.68/2rem;
  float: right;
  margin-top: 0.54/2rem;
}
.btn-register {
  display: block;
  width: 6.3rem;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  font-size: 0.32rem;
  color: #fff;
  border-radius: 0.45rem;
  margin: 0.8/2rem auto 0;
  background: #3269e4;
}

.ck-box {
  height: 1.6/2rem;
  display: flex;
  align-items: center;
  font-size: 0.48/2rem;
  color: #fff;
  input {
    margin: 0 0.24/2rem 0 0.6/2rem;
  }
  span {
    color: #5597ff;
    margin-left: 0.2/2rem;
  }
}
.register {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  /*background: #290127;*/
  /*background: url(../assets/images/payment/bodybj.png) repeat-x;*/
  /*background-size: 100% 100%;*/
}
.r-phone {
  /*background: #193b73;*/
  margin-left: 1.2/2rem;
  width: 6.3rem;
  background: #fff;
  border: 1px solid #bdbdbd;
  border-radius: 0.45rem;
  height: 0.9rem;
  box-sizing: border-box;
  padding-left: 0.1rem;
  margin-bottom: 0.5rem;
}
.phone-tip {
  width: 0.48/2rem;
  height: 0.68/2rem;
  margin-right: 0.48/2rem;
}
.r-box {
  height: 1.9/2rem;
  display: flex;
  margin-bottom: 1.28/2rem;
  position: relative;
  .r-left {
    flex: 0 0 3.1/2rem;
    display: flex;
    align-items: center;
    font-size: 0.6/2rem;
    color: #000;
    &:after {
      content: "";
      width: 0.08/2rem;
      height: 0.66/2rem;
      background: #2b5bb3;
      position: absolute;
      left: 2.4/2rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .r-right {
    flex: 1;
    input {
      width: 90%;
      /*height: 1.9/2rem;*/
      /*background: #193b73;*/
      font-size: 0.6/2rem;
      color: #000;
      padding-top: 0.65/2rem;
    }
  }
}
.group-input {
  padding: 0 0 0 1.2/2rem;
  /*background: #193b73;*/
  color: #000;
}
.page-login {
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #290127;

  display: flex;
  flex-direction: column;
  .toppart {
    flex: 5;
  }
  .page-link {
    padding: 0 1.2/2rem;
    height: 1/2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      font-size: 1.12/2rem;
      color: #fff;
      &.forget-code {
        color: #ccc;
      }
    }
  }
  .btn-box {
    padding: 1.6/2rem 0 1.28/2rem 0;
  }
  .btn-login {
    display: block;
    width: 15.12/2rem;
    height: 3.2/2rem;
    line-height: 3.2/2rem;
    text-align: center;
    font-size: 1.2/2rem;
    color: #ccc;
    /*background: url(../assets/images/login-bg.jpg) repeat-x;*/
    /*background-size: 100% 3.2/2rem;*/
    border-radius: 0.52/2rem;
    margin: 0 auto;
  }
}
.statement2 {
  width: 100%;
  position: fixed;
  bottom: 1rem;
  left: 0 !important;
  height: 2/2rem;
  font-size: 0.4/2rem;
  font-family: PingFangSC-Regular;
  color: #666;
  text-align: center;
  transform: translateX(0%) !important;
}
</style>
