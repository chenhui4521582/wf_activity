<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="fade">
      <div class="bonus-success" v-if="count==1">
        <div class="desc">
          <p>1. 活动时间：{{dataStr}}</p>
          <p>2. 参与方式：每天进入活动页面报名且当日付费任意金额即可获得瓜分机会。每天09:55截止当日报名。</p>
          <p>3. 瓜分时间：每日{{timetxt}}点整准时开始瓜分。</p>
          <p>4. 终极大奖瓜分规则：连续报名5天即可开启,是免费瓜分的哟。</p>
          <p>5. 终极大奖瓜分时间：{{dividetimetxt}}。</p>
          <p>6.奖品发放：现金奖励为话费券,进入活动页面领取奖励,奖励发放至我的资产。活动期间内所得的奖励,若用户在活动结束时仍未领取,则自动失效。</p>
          <p>7. 如有其他疑问，请点击<i @click="concat" style="text-decoration: underline">咨询客服</i>。活动最终解释权归平台所有。</p>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <div class="bonus-success profit" v-if="count==2">
        <div class="desc">
          <slot></slot>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <!--报名成功-->
      <div class="bonus-success baomingsuccess" v-if="count==3">
        <div class="desc">
          每日{{timetxt}}点开奖，一定要准时来哟~连续报名5天还可免费瓜分终极奖池哦
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
      <!--预报名成功-->
      <div class="bonus-success unbaomingsuccess" v-if="count==4">
        <div class="desc">
          您将是第 <i>{{num+1}}</i>位报名成功的用户
          报名成功后可瓜分千元话费奖励
          <div class="btn" @click="gotoshop">马上参与</div>
        </div>
        <div class="close" @click="close(1)"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        telPhone: ''
      }
    },
    props: {
      count: {
        type: Number,
        default: '0'
      },
      dataStr: {
        type: String,
        default: ''
      },
      timetxt: {
        type: Number,
        default: 0
      },
      num:{
        type: Number,
        default: 0
      },
      dividetimetxt: {
        type: String,
        default: ''
      }
    },
    computed: {
      isRight() {
        let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
        return this.telPhone && reg.test(this.telPhone)
      },
    },
    methods: {
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//platform-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//shop-api.beeplaying.com' + url
        }
        return this.axios.post(url, params, {})
      },//请求封装方法
      async besure() {
        if (!this.isRight) {
          this.$toast.show({
            message: '请输入正确的手机号',
            duration: 2000
          })
          return
        } else {
          //接口
          let {data: data} = await this.fetch('/ops/api/jackpot/userOpenSms', {value: this.telPhone})
          if (data.code == 200) {
            this.$toast.show({
              message: '提交成功',
              duration: 2000
            })
            this.$emit('refresh')
            this.$emit('close')
          } else {
            this.$toast.show({
              message: data.message,
              duration: 2000
            })
          }
        }
      },
      close(flag) {
        if (flag) {
          this.$emit('close')
        } else {
          this.$emit('closemobile')
        }
      },
      concat() {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, false, '#/problem?tab=contact_personal')
      },
      async gotoshop(){
        await GLOBALS.marchSetsPoint('A_H5PT0074001593')
        location.href = 'https://wap.beeplaying.com/payment/#/mall'
      }
    },
    mounted() {
      this.$refs.telPhone && this.$refs.telPhone.focus()
    }
  }
</script>
<style lang="less" scoped>
  .pop-window {
    position: relative;
    z-index: 11;
    width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    .pop-close {
      width: 0.68rem;
      height: 0.68rem;
      position: absolute;
      right: -0.34rem;
      top: -0.34rem;
    }
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    z-index: 10;
  }

  .bonus-success {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.1rem;
    height: 6.2rem;
    background: url("../images/rule_bg.png");
    background-size: 100% 100%;
    z-index: 11;
    &.profit {
      background: url("../images/record_bg.png");
      background-size: 100% 100%;
    }
    .title {
      position: absolute;
      top: .61rem;
      left: .9rem;
      right: 1.04rem;
      font-size: .36rem;
      font-weight: bold;
      color: rgba(255, 247, 243, 1);
      text-align: center;
      &.title0 {
        top: .34rem;
      }
    }
    .desc {
      position: absolute;
      top: 1rem;
      left: .2rem;
      right: .2rem;
      font-size: .22rem;
      font-weight: 400;
      color: rgba(255, 225, 229, 1);
      line-height: .32rem;
      i {
        color: #FFD619;
      }
    }
    .info {
      position: absolute;
      bottom: .95rem;
      left: .55rem;
      right: .45rem;
      font-size: .22rem;
      font-weight: 400;
      color: rgba(255, 223, 142, 1);
      line-height: .36rem;
    }
    .btnsure {
      position: absolute;
      left: .57rem;
      top: 2.87rem;
      line-height: .76rem;
      text-align: center;
      width: 3.9rem;
      height: .76rem;
      background: rgba(253, 192, 40, 1);
      border-radius: .38rem;
      font-size: .36rem;
      font-weight: bold;
      color: rgba(253, 21, 51, 1);
    }
    .close {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -.8rem;
      width: .57rem;
      height: .57rem;
      background: url("../images/close.png");
      background-size: 100% 100%;
    }
    &.baomingsuccess{
       height: 3.58rem;
       background: url("../images/baoming_success_bg.png");
       background-size: 100% 100%;
       .desc{
         position: absolute;
         top: 50%;
         transform: translateY(-50%);
         left: .5rem;
         right: .5rem;
         font-size: .3rem;
         line-height: .4rem;
         font-weight: 400;
         color: #ffe1e5;
       }
     }
    &.unbaomingsuccess{
      height: 3.58rem;
      background: url("../images/gobaoming_bg.png");
      background-size: 100% 100%;
      .desc{
        position: absolute;
        left: .3rem;
        right: .3rem;
        font-size: .3rem;
        line-height: .4rem;
        font-weight: 400;
        color: #ffe1e5;
        top: 40%;
        text-align: center;
        i{
          color: #FFD76A;
        }
        .btn{
          width:3.9rem;
          height:.76rem;
          line-height: .8rem;
          text-align: center;
          font-size:.36rem;
          font-weight:bold;
          color:rgba(253,21,51,1);
          line-height:.76rem;
          background:rgba(248,202,142,1);
          border-radius:.38rem;
          margin: .3rem auto 0;
        }
      }
    }
  }
  .fade-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  @keyframes fadeAnimation {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
