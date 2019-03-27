<template>
  <div class="black-name">
      <div class="head">
          <a href="javascript:" class="btn-arrow" @click="goBack">
            <img src="./images/newback.png" alt="" class="h-arrow">
          </a>
          <span>申诉通道</span>
      </div>
      <div class="problemDetails">
        <textarea  maxlength="300" placeholder="请将您的情况填写下来，我们将在2~3个工作日内给您回复（字数限制在5~300以内）。注意：同一设备登录多个账号、游戏作弊、使用模拟器、插件、外挂等工具参与游戏等行为会引发账号登录异常。 "  cols="30" rows="10" class="detailsInput" v-model="description"></textarea>
        <div class="phone-box">
          <input class="phone-text" type="tel" placeholder="请留下您的手机号码，以便我们回复您。" v-model="phoneTxt">
          <a href="javascript:" class="small-close" @click="cleanPhoneTxt" v-show="phoneTxt.length"></a>
        </div>
        <div class="btn-box">
          <input type="text" name="" placeholder="请输入验证码" class="btn-code-text" v-model="yzm">
          <a href="javascript:" class="btn btn-code" @click="sendVECode" v-if="validatorText=='获取验证码'">获取验证码</a>
          <a href="javascript:" class="btn btn-djs" v-else v-html="validatorText" ></a>
        </div>
        <a href="javascript:" class="btn-submit" @click="submit">确认提交</a>
      </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        validatorText: '获取验证码',
        num: 0,
        djsNumber: 60,
        phoneTxt: '',
        description: '',
        yzm: '',
        isClick: false
      }
    },
    mounted() {
    },
    methods: {
      goBack() {
        history.go(-1)
      },
      cleanPhoneTxt() {
        this.phoneTxt = ''
      },
      submit() {

        if(!this.description) {
          this.$toast.show({
              message: '请填写反馈信息',
              duration: 1500
          })
          return
        }
        if(this.description.length < 5) {
          this.$toast.show({
              message: '不能少于5个字符信息',
              duration: 1500
          })
          return
        }
        if(!this.phoneTxt) {
          this.$toast.show({
              message: '手机号不能为空',
              duration: 1500
          })
          return
        }
        if(!(/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.phoneTxt))) {
          this.$toast.show({
              message: '手机格式不正确',
              duration: 1500
          })
          return
        }
        if(!this.yzm) {
          this.$toast.show({
              message: '请输入您的验证码',
              duration: 1500
          })
          return
        }
        if(!this.isClick) {
          this.axios.post('//platform-api.beeplay123.com/wap/api/feedback/newFeedback', {
              description: this.description,
              isLogin: 0,
              phone: this.phoneTxt,
              smsCode: this.yzm,
              typeId: 5,
              userId: this.getUrlParam('uid')
          }).then((res)=> {
              if(res.data.code == 200) {
                this.isClick = true
                this.$toast.show({
                    message: '提交成功，我们将在3个工作日内联系您，请耐心等待~',
                    duration: 1500
                })
                setTimeout(()=> {
                  history.go(-1)
                }, 2000)
              }
          })
        }else {
          this.$toast.show({
              message: '您已提交不能重复提交',
              duration: 1500
          })
        }
        

        
      },
      //获取地址栏问号后面的参数值
      getUrlParam: function (ename) {
          var url = window.location.href;
          var Request = new Object();
          if (url.indexOf("?") != -1) {
              var str = url.split('?')[1];
              var strs = str.split("&");
              for (var i = 0; i < strs.length; i++) {
                  Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
              }

          } else {
              return '';
          }
          let params = Request[ename] ? Request[ename].split('#')[0] : ''

          return params;

      },
      sendVECode() {
        if(!this.phoneTxt) {
          this.$toast.show({
              message: '手机号不能为空',
              duration: 1500
          })
          return
        }
        if(!(/(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/.test(this.phoneTxt))) {
          this.$toast.show({
              message: '手机格式不正确',
              duration: 1500
          })
          return
        }
        this.axios.post('//platform-api.beeplay123.com/wap/api/feedback/sendMsg/'+this.phoneTxt).then((res)=> {
            let message = res.data.code == 200 ? '验证码已发送注意查收' : res.data.message;
            if(res.data.code == 200) {
                clearInterval(this.timer);
                this.validatorText = this.djsNumber + 's后重发';
                this.timer = setInterval(() => {
                    this.num = this.num + 1;
                    if (this.num == this.djsNumber) {
                        clearInterval(this.timer); 
                        this.validatorText = '获取验证码';
                        this.num = 0;
                    } else {
                        this.validatorText = this.djsNumber - this.num + 's后重发';
                    }
                }, 1000);
            }
            this.$toast.show({
                message: message,
                duration: 1500
            });
        })

        
      }
    }
  }
</script>
<style lang="less" >
  a {
    text-decoration: none;
  }
  .alertBox .box{
    line-height: 0.38rem !important;
  }
  .black-name {
    width: 100%;
    height: 100%;
    background: #0F1726;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
      .head {
        display: flex;
        font-size: 0.32rem;
        font-weight: bold;
        padding: 0.3rem;
        text-align: center;
        color: #fff;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    .h-arrow {
      width: 0.3rem;
      height: 0.3rem;
      margin-top: 0.1rem;
    }
    .btn-arrow {
      width: 0.6rem;
      height: 0.5rem;
      position: absolute;
      left: 0.2rem;
      top: .28rem;
    }
    input,textarea {
      outline: none;
      border: none;
      resize: none;
      width: 100%;
      float: left;
      font-size: 0.26rem;
      color: #fff;
      box-sizing: border-box;
      border-radius: 0.08rem;
    }
    input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
           color: #5A6B89;
    }
    .problemDetails {
      padding: 0 0.3rem;
      .detailsInput {
        width: 100%;
        height: 2.7rem;
        background: #141F33;
        padding: .26rem .3rem 0;
        margin-bottom: 0.4rem;
      }
      .phone-box {
        height: 0.9rem;
        position: relative;
        clear: both;
        .small-close {
          display: block;
          width: 0.8rem;
          height: 0.9rem;
          background: url(./images/close.png) no-repeat center center;
          background-size: 0.27rem 0.27rem;
          position: absolute;
          right: 0;
          top: 0;
          z-index: 3;
        }
      }
      .phone-text {
        height: 0.9rem;
        background: #141F33;
        padding-left: .3rem;
        margin-bottom: 0.21rem;
        padding-right: 0.8rem;
      }
    }
    .btn-box {
      clear: both;
      display: flex;
      .btn-code-text {
        height: 0.9rem;
        flex: 1;
        margin-right: 0.2rem;
        background: #141F33;
        text-indent: 0.3rem;
      }
      .btn {
        display: block;
        width: 2.5rem;
        height: 0.9rem;
        line-height: 0.9rem;
        text-align: center;
        font-size: 0.26rem;
        border-radius: 0.08rem;
        &.btn-code {
          color:rgba(254,254,255,0.3);
          background: #22365b;  
        }
        &.btn-djs {
          background: #494949;
          color:rgba(254,254,255,0.3);
        }
      }
    }
    .btn-submit{
      display: block;
      width: 100%;
      height: 0.9rem;
      line-height: 0.9rem;
      text-align: center;
      font-size: 0.26rem;
      font-weight: bold;
      background: #EE6F0B;
      color: #fff;
      margin-top: 0.52rem;
      border-radius: 0.08rem;
    }
  }

</style>