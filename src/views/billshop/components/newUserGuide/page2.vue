<template>
  <div class="newUser" v-if="isShow">
    <div class="mask">
    </div>
    <div class="center">
      <div class="tip1">
        <div class="bg" :class="{'animation': isAnimation}"></div>
        <div class="text" @click="handleClick">
          <img src="./images/page2/huafei.jpg" alt="">
          <p class="name">50元话费卡</p>
          <p class="residues">剩余库存：999</p>
          <p class="btn">50话费券可兑</p>
        </div>
      </div>
      <div class="tip2" :class="{'animation': isAnimation}"/>
      <div class="tip3" :class="{'animation': isAnimation}"/>
      <div class="tip4" :class="{'animation': isAnimation}"/>
      <div class="tip5" :class="{'animation': isAnimation}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'user-guide-page2',
  props: {
    accountBalance: String,
    required: true
  },
  data: () => ({
    isAnimation: false,
    isShow: true
  }),
  computed: {
  },
  methods: {
    handleClick () {
      this.isShow = false
    },
    save () {
      let url = '//platform-api.beeplay123.com/wap/api/plat/newUser/set-guide-position'
      this.axios.post(url, {version: 3, position: 1001})
    },
    init () {
      let url = '//platform-api.beeplay123.com/wap/api/plat/newUser/get-guide-position'
      this.axios.post(url, {version: 3}).then(res => {
        if (res.data.data == '1001') {
          this.$nextTick(function () {
            this.isAnimation = true
          })
          this.save()
        }
      })
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="less" scope>
.newUser{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  .mask{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: .8;
    background: rgba(0,0,0,.8)
  }
  .center{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 2;
    .tip1{
      position: absolute;
      top:2.6rem;
      left: 0;
      width: 3.6rem;
      height: 3.87rem;
      .text{
        padding: .22rem;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        font-size: .28rem;
        text-align: center;
        color: #fff;
        background:#141F33;
        border-radius:8px;
        text-align: center;
        img{
          width: 1.7rem;
          height: .87rem;
          display: block;
          margin: .32rem auto .34rem;
        }
        .name {
          margin-bottom: .2rem; 
          line-height: .29rem;
          font-size: .3rem;
          color:#fff;
        }
        .residues {
          margin-bottom: .2rem; 
          line-height: .22rem;
          font-size: .22rem;
          color:#8792A5;
        }
        .btn {
          margin: 0 auto;
          width: 2.55rem;
          height:.44rem;
          line-height: .44rem;
          border:1px solid rgba(255,255,255,1);
          border-radius:22px;
          color: #FFFFFF;
          font-size: .22rem;
        }
      }
      .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: url('./images/page2/kuang.png') no-repeat center 0;
        background-size:3.6rem 3.87rem; 
        opacity: 0;
        &.animation {
          animation: prople 1s 0s forwards
        }
      }
    }
    .tip2{
      position: absolute;
      top: 6.6rem;
      left: .3rem;
      width: 2.62rem;
      height: 3.31rem;
      background: url('./images/page1/prople.png') no-repeat center 0;
      background-size: 100% 100%;
      opacity: 0;
      &.animation {
        animation: prople 2s 1s forwards
      }
    }
    .tip3{
      position: absolute;
      top: 4rem;
      left: 3.3rem;
      width: 1.3rem;
      height: 1.51rem;
      background: url('./images/page1/finger.png') no-repeat center 0;
      background-size: 100% 100%;
      opacity: 0;
      z-index: 2;
      &.animation {
        animation: finger 1s 2.5s infinite;
      }
    }
    .tip4{
      position: absolute;
      top: 7.6rem;
      left: 2.83rem;
      width: 4.07rem;
      height: 1.64rem;
      background: url('./images/page2/tips.png') no-repeat center 0;
      background-size: 100% 100%;
      transform: scale(0);
      &.animation {
        animation: tips .5s 2s forwards
      }
    }
    .tip5{
      position: absolute;
      top: 3.5rem;
      left: 2.5rem;
      width: 1.17rem;
      height: 1.17rem;
      border: 5px solid rgba(180,226,255,1);
      border-radius:50%;
      transform: scale(0);
      &.animation {
        animation: round 1s 3s infinite
      }
    }
  }
}
@keyframes tips {
  0%{
    transform: scale(0) 
  }
  25% {
    transform: scale(1.2)
  }
  50% {
    transform: scale(1)
  }
  75% {
    transform: scale(1.1)
  }
  100% {
    transform: scale(1) 
  }
}
@keyframes finger {
  0%{
    opacity: 1;
    transform: translateX(0);
  }
  25% {
    opacity: 1;
    transform: rotateZ(-8deg);
  }
  50% {
    opacity: 1;
    transform: rotateZ(-15deg);
  }
  75% {
    opacity: 1;
    transform: rotateZ(-8deg);
  }
  100% {
    opacity: 1;
    transform: rotateZ(0);
  }
}
@keyframes round {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  100% {
    opacity: 0;
    transform: scale(1);
  }
}
@keyframes prople {
  0%{
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>