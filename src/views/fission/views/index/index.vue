<template>
  <div class="fission">
    <!-- 规则按钮 -->
    <div class="rule-btn" @click="openPopup(1)">
      <img src="../../img/rule-icon.png" class="inner-img" alt="">
    </div>
    <!-- 邀请记录按钮 -->
    <div class="invite-log-btn" @click="goLog">
       <img src="../../img/invite-icon.png" class="inner-img" alt="">
    </div>
    <!-- 跑马灯 -->
    <Horn />
    <!-- 我当前的钥匙 -->
    <div class="my-key">
      我目前钥匙数量为：<img src="../../img/key-icon.png" alt=""><span>X{{boxInfo.keyNum}}</span>
    </div>
    <!-- 宝箱 -->
    <Box @slideChange="slideChange"/>
    <!-- 宝箱内容 -->
    <div class="award-list">
      <div class="header" @click="openBox">
        <p class="name">当前为{{currentBox.name}}</p>
        <p class="key"><img src="../../img/red-key-icon.png" alt=""> x{{currentBox.cost}}可打开</p>
      </div>
      <!-- 内容列表 -->
      <Box-list :list="currentBox.awards"/>
      <div class="explain">宝箱价值大小：金宝箱>银宝箱>铜宝箱</div>
      <div class="box-name">{{currentBox.name}}内有</div>
      <div class="my-award" @click="goAward"></div>
    </div>
    <!-- 邀请步骤 -->
    <div class="invite-step">
      <img class="inner-img" src="../../img/invite-step.png" alt="">
    </div>
    <!-- 底部按钮 -->
    <div class="footer-btns">
      <div class="invite-btn" @click="openShare">邀请好友得<img src="../../img/red-key-icon.png" alt=""></div>
      <div class="open-box-btn" @click="openBox"><img src="../../img/red-key-icon.png" alt="">x{{currentBox.cost}}立即开箱</div>
    </div>
    <!-- share弹出框 -->
    <Share v-model="showShare" :hfqNum="boxInfo.hfqNum" :newSrc="newSrc" :qrCodeUrl="qrCodeUrl"/>
    <!-- 弹出框 -->
    <Popup
      v-model="showPopup"
      :popupType="popupType"
      :keyNum="boxInfo.keyNum"
      :currentBox="currentBox"
      :award="award"
      @openShare="openShare"
      @openBox="_getAward"
    />
    <template v-if="newSrc.length<3">
      <qrcode tag="img"  id="img" :value="qrCodeUrl" name="img"></qrcode>
      <canvas id="myCanvas" width="720vw" height="1023vw"></canvas>
    </template>
  </div>
</template>
<script>

import Horn from '../../components/horn'
import Box from '../../components/box'
import BoxList from '../../components/boxList'
import Share from '../../components/share'
import Popup from '../../components/popup'
import Services from '../../services/services'
import utils from '../../components/utils'
import _get from 'lodash.get'
import qrcode from '@xkeshi/vue-qrcode'
export default {
  name: 'fission',
  data: ()=>({
    boxInfo: {},
    boxAward: [],
    level: 1,
    showShare: false,
    showPopup: false,
    popupType: 1,
    award: {},
    newSrc:[]
  }),
  components: {
    Horn,
    Box,
    BoxList,
    Share,
    Popup,
    qrcode
  },
  computed: {
    currentBox () {
      if(utils.isEmptyArray(this.boxAward)) {
        return {}
      }
      return this.boxAward[this.level - 1] || {}
    },
    qrCodeUrl () {
      let userInfo = localStorage.getItem('user_Info')
      let {userId} = JSON.parse(userInfo)
      return `https://wap.beeplaying.com/ddwgame/?type=fission&userId=${userId}&token=${localStorage.getItem('ACCESS_TOKEN')}&channel=${localStorage.getItem('APP_CHANNEL')}`
    }
  },
  methods: {
    handleNavClick (index) {
      this.currentIndex = index
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code, data} = _get(res, 'data')
        if(code == 200) {
          this.boxInfo = data
          this.boxAward = data.boxList
        }
      })
    },
    /** 轮播图变化回调 **/
    slideChange (data) {
      this.level = data
    },
    /** 打开分享弹框 **/
    openShare () {
      this.showShare = true
      GLOBALS.marchSetsPoint('A_H5PT0308003735')
    },
    /** 打开popup **/
    openPopup (type) {
      this.popupType = type
      this.showPopup = true
      switch (type) {
        case 1 :
          GLOBALS.marchSetsPoint('A_H5PT0308003730')
          GLOBALS.marchSetsPoint('A_H5PT0308003744')
          break
        case 2:
          GLOBALS.marchSetsPoint('P_H5PT0308')
          break
        case 4:
          GLOBALS.marchSetsPoint('A_H5PT0308003746')
          break
      }
    },
    /** 开宝箱 **/
    openBox () {
      const keyNum = _get(this.boxInfo, 'keyNum', 0)
      const costNum = _get(this.currentBox, 'cost', 0)
      if(this.lock) {
        /** 开奖中弹框 **/
        this.$toast.show({message: '正在开奖中,请稍等！'})
      } else if(keyNum && costNum && keyNum >= costNum) {
        /** 钥匙足够 **/
        this.openPopup(3)
        GLOBALS.marchSetsPoint('A_H5PT0308003741')
      }else {
        /** 钥匙不够 **/
        this.openPopup(2)
        GLOBALS.marchSetsPoint('A_H5PT0308003738')
      }
      GLOBALS.marchSetsPoint('A_H5PT0308003734')
    },
    /** 获取宝箱数据 **/
    _getAward () {
      if(this.lock) return
      this.lock = true
      const level = this.currentBox.level
      Services.getAward(level).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.award = data
          this.openAnimation(() => {
            this.openPopup(4)
            this._getInfo()
            this.lock = false
          })
        }else {
          this.$toast.show({message})
        }
      })
    },
    /** 开箱动画 **/
    openAnimation (callback) {
      let element = document.querySelector('.swiper-slide-active')
      element.classList.add('active')
      setTimeout(()=> {
        element.classList.remove('active')
        callback && callback()
      }, 1300)
    },
    /** 跳转log **/
    goLog () {
      GLOBALS.marchSetsPoint('A_H5PT0308003731')
      this.$router.push({
        name: 'log'
      })
    },
    _register (id) {
      Services.register(`25052_${id}`).then(res=> {
        const {data} = _get(res, 'data')
        this.$toast.show( {message: data} )
      })
    },
    goAward () {
      this.$router.push({
        name: 'award'
      })
      GLOBALS.marchSetsPoint('A_H5PT0308003733')
    },
    backHome() {
      window.location.href = "//wap.beeplaying.com/xmWap/"
      GLOBALS.marchSetsPoint('A_H5PT0278003318')
    },
    drawImage (num) {
      let canvas2 = document.getElementById('myCanvas')
      let cans = document.getElementById('img')
      let cas2 = canvas2.getContext('2d')
      let img1 = new Image()
      let img2 = new Image()
      img1.src = cans.src
      img2.src = `static/images/pic${num}.png`
      let that = this
      img2.onload = function () {
        cas2.drawImage(img2, 0, 0, 720, 1023)
        cas2.drawImage(img1, 249, 611, 195, 195)
        that.newSrc.push(canvas2.toDataURL('images/png', 1))
      }
    }
  },
  mounted() {
    window._register = this._register
    this._getInfo()
    GLOBALS.marchSetsPoint('P_H5PT0308', {
      source_address: document.referrer
    })
    this.drawImage(1)
    this.drawImage(2)
    this.drawImage(3)
  }
}
</script>
<style lang="less">
* {
  box-sizing: border-box;
}
.fission {
  overflow: hidden;
  padding-bottom: 1.3rem;
  min-height: 100vh;
  background: url(../../img/bg.png) no-repeat center top #B46230;
  background-size: 100% auto;
  .rule-btn {
    position: fixed;
    left: 0;
    top: .2rem;
    z-index: 4;
    width: .82rem;
    height: .64rem;
  }
  .invite-log-btn {
    position: fixed;
    right: 0;
    top: .2rem;
    z-index: 4;
    width: .85rem;
    height: .64rem;
  }
  .my-key {
    margin-top: 2.36rem;
    text-align: center;
    height: .55rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FF9155;
    font-size: .26rem;
    img {
      margin-right: .06rem;
      width: .36rem;
      height: .43rem;
    }
    span {
      color: #FFFFFF;
    }
  }
  .award-list {
    position: relative;
    margin: 0 auto .05rem;
    width: 7rem;
    height: 3.7rem;
    background: url(../../img/award-list.png) no-repeat center top;
    background-size: 100% auto;
    .header {
      overflow: hidden;
      margin: 0 auto;
      width: 3rem;
      height: 1.2rem;
      text-align: center;

      .name {
        margin-top: .2rem;
        font-weight: 800;
        font-size: .3rem;
        color: #404040;
      }
      .key {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: .26rem;
        color: #9D0001;
        span {
          color: #780809;
        }
        img {
          margin-right: .05rem;
          width: .23rem;
          height: .28rem;
        }
      }
    }
    .explain {
      height: .4rem;
      line-height: .4rem;
      text-align: center;
      font-size: .2rem;
      color: #FFA279;
    }
    .my-award {
      position: absolute;
      right: 0rem;
      top: .84rem;
      width: 1.45rem;
      height: .37rem;
    }
    .box-name{
      position: absolute;
      left: .16rem;
      top: .78rem;
      width: 1.25rem;
      height: .37rem;
      text-align: center;
      font-size: .2rem;
      color: #FFB368;
      white-space: nowrap;
    }
  }
  .invite-step {
    width: 7rem;
    height: 2.84rem;
  }
  .footer-btns {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.3rem;
    padding-top: .12rem;
    display: flex;
    justify-content: center;
    background: #fff;
    border-radius: .2rem .2rem 0 0;
    .invite-btn,.open-box-btn {
      width: 50%;
      height: 1.14rem;
      display: flex;
      justify-content: center;
      font-size: .3rem;
      color: #9D0001;
      font-weight: 800;
      line-height: .92rem;
      img {
        margin: .25rem .08rem 0;
        width: .33rem;
        height: .4rem;
      }
    }
    .invite-btn {
      background: url(../../img/invite-btn.png) no-repeat center top;
      background-size: 100% auto;
    }
    .open-box-btn {
      background: url(../../img/open-box-btn.png) no-repeat center top;
      background-size: 100% auto;
    }

  }
}
</style>
