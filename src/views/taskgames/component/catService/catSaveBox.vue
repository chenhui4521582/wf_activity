<template>
  <section>
    <div class="entrance-header-item" @click="handleCatSaveBox">
      <img class="entrance-header-img" src="../../images/cat_supply/biaoxianbox.png">
      <div class="entrance-header-text">保险箱</div>
    </div>
    <common-pop :title="title" v-if="showOutPop" @close="showOutPop = false">
      <div slot="text" class="text" :class="{catFlag1:saveBoxStatus===1}">
        <template v-if="saveBoxStatus === 0">
          <div>保险箱为招财猫Lv.30权益：</div>
          <div>可用于存储保底金叶子，</div>
          <div>游戏再嗨 ，也不怕消耗完您的所有金叶</div>
        </template>
        <template v-if="saveBoxStatus===1">
          <div class="capacity">当前保险箱容量{{saveBoxInfo.maxNum}}</div>
          <div class="haved-leaf">已存金叶<i>{{saveBoxInfo.balance}}</i></div>
        </template>
        <template v-if="saveBoxStatus===2">
          <div style="margin-top:0.4rem">
            <div>您的招财猫生病了</div>
            <div>无法继续存入（可全部取出）</div>
          </div>
        </template>
        <template v-if="saveBoxStatus===3">
          <div style="margin-top:0.4rem">
            <div>您的招财猫生病了，保险箱仅能全部取出</div>
            <div>解封权益后恢复全部功能</div>
          </div>
        </template>
        <template v-if="saveBoxStatus===4">
          <div class="input-wrap">
            <input v-model.number="leafNumber" type="tel" placeholder="请输入要存入的金叶子数">
            <span v-if="errorString">{{errorString}}</span>
            <div>还可继续存入{{moreNumber}} <a href="javascript:;" @click="allIn()">全部存入</a> </div>
          </div>
        </template>
        <template v-if="saveBoxStatus===5">
          <div class="input-wrap">
            <input v-model.number="leafNumber" type="tel" placeholder="请输入要取出的金叶子数">
            <span v-if="errorString">{{errorString}}</span>
            <div>您可取出{{saveBoxInfo.balance}} <a href="javascript:;" @click="allIn()">全部取出</a></div>
          </div>
        </template>
      </div>
      <div class="btn-wrap" slot="btn">
        <template v-if="saveBoxStatus === 1">
          <div class="btn besure actived-1" @click="saveLeaf()">存入</div>
          <div class="btn besure actived" @click="getOutLeaf()">取出</div>
        </template>
        <template v-if="saveBoxStatus === 0 || saveBoxStatus === 2 || saveBoxStatus === 3">
          <div v-if="saveBoxStatus === 3" class="btn besure actived long" @click="besure(31)">全部取出</div>
          <div class="btn besure actived-1 long" @click="besure(saveBoxStatus)">去招财猫解封权益</div>
        </template>
        <template v-if="saveBoxStatus === 4">
          <div class="btn besure middle" :class="{actived:leafNumber}" @click="besure(saveBoxStatus)">存入</div>
        </template>
        <template v-if="saveBoxStatus === 5">
          <div class="btn besure middle" :class="{actived:leafNumber}" @click="besure(saveBoxStatus)">取出</div>
        </template>
      </div>
      <div class="cat_surplusinfo" slot="other" v-if="saveBoxStatus===1||saveBoxStatus===4||saveBoxStatus===5">
        <div class="line"></div>
        <div class="desc">
          * 金叶存入保险箱之后，<em>相应金叶数将会被减去，且不可被消耗。</em>取出之后，可正常消耗。
        </div>
        <div class="desc">
          * 提升招财猫等级，可提高保险箱容量，<span class="gobaoxian" @click="goCat()">去提升保险箱容量></span>
        </div>
      </div>
    </common-pop>
    <common-pop class="pop-second" v-if="showEndPop" :title="endTitle" @close="closeEndPop">
      <div slot="text" class="text">
        <template v-if="endPopType === 4">
          <div>剩余的金叶子数量将减去{{leafNumber}}</div>
          <div>这些金叶存在保险箱不可被消耗</div>
          <div>重新取出后，恢复正常。</div>
        </template>
        <template v-if="endPopType === 5">
          <div>{{leafNumber}}金叶子已被取出</div>
          <div>已可正常消耗</div>
        </template>
      </div>
      <div class="btn-wrap" slot="btn">
        <div class="btn besure actived long" @click="showEndPop = false">好的</div>
      </div>
    </common-pop>
  </section>
</template>

<script>
export default {
  name: 'catSaveBox',
  data () {
    return {
      showOutPop: false,
      saveBoxInfo: {
        // balance: 222, // 保险箱余额
        // bankLv: 1, // 保险箱等级
        // isFreeze: 0, // 是否已冻结 0: 否 1是
        // isOpen: 1, // 是否已开通 0：未开通 1：已开通
        // maxNum: 1000, // 当前最大存入金叶数
        // nextNum: 10000 // 下级最大存入金页数
      },
      clickType: 0, // 0 未点击 1 点击存入 2 点击取出
      catFlag: 0,
      leafNumber: null,
      errorString: null,
      timer: '',
      showEndPop: false,
      endPopType: 4
    }
  },
  watch: {
    leafNumber (val) {
      if (!/^\d+$/.test(val) || val === 0) {
        this.leafNumber = null
        this.errorString = null
        return
      }
      if (this.saveBoxStatus === 4) {
        if (val > this.userInfo.amount) {
          this.leafNumber = this.userInfo.amount
          this.errorString = '剩余金叶子不足!'
          return
        }
        if (val > this.moreNumber) {
          this.leafNumber = this.moreNumber
          this.errorString = '超出保险箱容量!'
          return
        }
        return
      }
      if (this.saveBoxStatus === 5) {
        if (val > this.saveBoxInfo.balance) {
          this.leafNumber = this.saveBoxInfo.balance
          this.errorString = '超出已存金叶子数量!'
          return
        }
        return
      }
      this.errorString = null
      return
    },
    errorString (val) {
      if (val) {
        this.timer = setTimeout(() => {
          this.errorString = null
        }, 2000)
      } else {
        clearTimeout(this.timer)
      }
    }
  },
  components: {
    commonPop: () => import('./commonPopNew')
  },
  props: {
    userInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    moreNumber () {
      return this.saveBoxInfo.maxNum - this.saveBoxInfo.balance
    },
    saveBoxStatus () {
      if (!this.saveBoxInfo.isOpen) {
        return 0 // 未开启
      }
      if (this.clickType === 1 && this.saveBoxInfo.isFreeze) {
        return 2
      }
      if (this.clickType === 2 && this.saveBoxInfo.isFreeze) {
        return 3
      }
      if (this.clickType === 1) {
        return 4
      }
      if (this.clickType === 2) {
        return 5
      }
      return 1
    },
    title () {
      switch (this.saveBoxStatus) {
        case 0:
          return '权益未开启'
        case 2:
          return '权益被冻结 无法存入'
        case 3:
          return '权益被冻结'
        case 4:
          return '存入金叶子'
        case 5:
          return '取出金叶子'
        default:
          return `金叶子保险箱Lv.${this.saveBoxInfo.bankLv}`
      }
    },
    endTitle () {
      switch (this.endPopType) {
        case 4:
          return '存入成功'
        case 5:
          return '取出成功'
      }
      return ''
    },
    btnName () {
      switch (this.saveBoxStatus) {
        case 0:
          return '去招财猫开启权益'
        default:
          return ''
      }
    }
  },
  methods: {
    async handleCatSaveBox () { // 招财猫保险箱
      await this.init()
      this.clickType = 0
      this.leafNumber = null
      this.showOutPop = true
    },
    async init () {
      const res = await this.axios.post('//trans-api.beeplaying.com/trans/api/bank/status')
      const { data, code } = res.data
      if (code === 200) {
        this.saveBoxInfo = data
      }
    },
    closeCat () {
      this.showOutPop = false
    },
    closeEndPop () {
      this.showEndPop = false
    },
    besure (val) {
      switch (val) {
        case 0:
          this.goCat()
          break
        case 2:
          this.goCat()
          break
        case 3:
          this.goCat()
          break
        case 31:
          this.updateBankNumber(-this.saveBoxInfo.balance)
          break
        case 4:
          this.updateBankNumber(this.leafNumber)
          break
        case 5:
          this.updateBankNumber(-this.leafNumber)
          break

        default:
          break
      }
    },
    saveLeaf () {
      this.leafNumber = null
      this.clickType = 1
    },
    getOutLeaf () {
      this.leafNumber = null
      this.clickType = 2
    },
    goCat () {
      parent.location.href = '//wap.beeplaying.com/petcat/?channel=' + GLOBALS.channel + '&time=' + (new Date().getTime())
    },
    allIn () {
      if (this.saveBoxStatus === 4) {
        this.leafNumber = this.moreNumber
      } else if (this.saveBoxStatus === 5) {
        this.leafNumber = this.saveBoxInfo.balance
      }
    },
    async updateBankNumber (changeNum) {
      if (!changeNum) {
        return
      }
      const res = await this.axios.post('//trans-api.beeplaying.com/trans/api/bank/update', { changeNum })
      const { code } = res.data
      switch (code) {
        case 200:
          this.showEndPop = true
          this.endPopType = this.saveBoxStatus
          this.clickType = 0
          this.$emit('getUserInfo')
          this.init()
          break
        case 201:
          this.errorString = '剩余金叶子不足!'
          break
        case 203:
          this.errorString = '超出已存金叶子数量!'
          break
        case 204:
          this.errorString = '超出保险箱容量!'
          break

        default:
          this.$Toast('交易失败，请稍后重试')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.entrance-header-item {
  font-size: 0.16rem;
  font-weight: 400;
  color: rgba(239, 196, 90, 1);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 0.6rem;
  .entrance-header-img {
    width: 0.4rem;
    height: 0.4rem;
  }
  &:nth-child(3) {
    color: rgba(88, 114, 163, 1);
  }
}
.text {
  margin-top: 0.32rem;
}
.receive-pop {
  div.btn-wrap {
    flex-wrap: wrap;
    .btn {
      min-width: 1rem;
      &.actived-1 {
        background: #ff4b28;
        color: #fff;
      }
      &.long {
        width: 2rem;
        margin: 0.08rem 0.8rem;
      }
      &.middle {
        width: 1.5rem;
      }
    }
  }

  .haved-leaf {
    font-size: 0.18rem;
    color: #707070;
    font-weight: 500;
    padding: 0.3rem 0 0;
    i {
      position: relative;
      color: #fff;
      font-size: 0.22rem;
      &::before {
        content: "";
        display: inline-block;
        width: 0.16rem;
        height: 0.16rem;
        background: url("../../img/cat/leaf-icon.png") no-repeat center top /
          100% 100%;
        margin: 0 0.08rem 0 0.1rem;
      }
    }
  }
  .capacity {
    width: 2.52rem;
    height: 0.28rem;
    position: absolute;
    top: -0.3rem;
    left: 50%;
    margin-left: -1.26rem;
    background: url("../../img/cat/number-bg.png") no-repeat center top / 100%
      100%;
    color: #394a69;
    font-size: 0.16rem;
    line-height: 0.28rem;
  }
  .input-wrap {
    width: 100%;
    padding: 0 0.26rem 0;
    text-align: left;
    color: #707070;
    font-size: 0.18rem;
    position: relative;
    box-sizing: border-box;
    input {
      box-sizing: border-box;
      height: 0.58rem;
      line-height: 0.58rem;
      font-size: 0.2rem;
      background: #141f33;
      width: 100%;
      padding: 0 0.18rem;
      border-radius: 0.08rem;
      color: #5e6c85;
      &::-webkit-input-placeholder {
        color: #2f3b52;
      }
    }
    p {
      margin-top: 0.12rem;
      margin-left: 0.02rem;
    }
    span {
      color: #db201e;
      position: absolute;
      top: 0.14rem;
      right: 0.44rem;
      white-space: nowrap;
      animation: tikShow 0.5s ease-in-out 1;
    }
    a {
      color: #e39b25;
      text-decoration: underline;
    }
  }
  .cat_surplusinfo {
    padding: 0 0.26rem 0.26rem;
    font-size: 0.16rem;
    color: #8b8b8c;
    text-align: left;
    line-height: 0.26rem;
    font-weight: 400;
    em {
      font-size: 0.18rem;
      color: #fff;
    }
    span {
      color: #e39b25;
      text-decoration: underline;
    }
    .line {
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin-bottom: 0.18rem;
    }
  }
}

@keyframes tikShow {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  2% {
    transform: translate(-1px, 1.5px) rotate(1.5deg);
  }
  4% {
    transform: translate(1.3px, 0px) rotate(-0.5deg);
  }
  6% {
    transform: translate(1.4px, 1.4px) rotate(-2deg);
  }
  8% {
    transform: translate(-1.3px, -1px) rotate(-1.5deg);
  }
  10% {
    transform: translate(1.4px, 0px) rotate(-2deg);
  }
  12% {
    transform: translate(-1.3px, -1px) rotate(-2deg);
  }
  14% {
    transform: translate(1.5px, 1.3px) rotate(1.5deg);
  }
  16% {
    transform: translate(1.5px, -1.5px) rotate(-1.5deg);
  }
  18% {
    transform: translate(1.3px, -1.3px) rotate(-2deg);
  }
  20% {
    transform: translate(1px, 1px) rotate(-0.5deg);
  }
  22% {
    transform: translate(1.3px, 1.5px) rotate(-2deg);
  }
  24% {
    transform: translate(-1.4px, -1px) rotate(2deg);
  }
  26% {
    transform: translate(1.3px, -1.3px) rotate(0.5deg);
  }
  28% {
    transform: translate(1.6px, -1.6px) rotate(-1.5deg);
  }
  30% {
    transform: translate(-1.3px, -1.3px) rotate(-1.5deg);
  }
  32% {
    transform: translate(-1px, 0px) rotate(2deg);
  }
  34% {
    transform: translate(1.3px, 1.3px) rotate(-0.5deg);
  }
  36% {
    transform: translate(1.3px, 1.6px) rotate(1.5deg);
  }
  38% {
    transform: translate(1.3px, -1.6px) rotate(1.5deg);
  }
  40% {
    transform: translate(-1.4px, -1px) rotate(-0.5deg);
  }
  42% {
    transform: translate(-1.4px, 1.3px) rotate(-0.5deg);
  }
  44% {
    transform: translate(-1.6px, 1.4px) rotate(0.5deg);
  }
  46% {
    transform: translate(-2.1px, -1.3px) rotate(-0.5deg);
  }
  48% {
    transform: translate(1px, 1.6px) rotate(1.5deg);
  }
  50% {
    transform: translate(1.6px, 1.6px) rotate(1.5deg);
  }
  52% {
    transform: translate(-1.4px, 1.6px) rotate(0.5deg);
  }
  54% {
    transform: translate(1.6px, -1px) rotate(-2deg);
  }
  56% {
    transform: translate(1.3px, -1.6px) rotate(-2deg);
  }
  58% {
    transform: translate(-1.3px, -1.6px) rotate(0.5deg);
  }
  60% {
    transform: translate(1.3px, 1.6px) rotate(-0.5deg);
  }
  62% {
    transform: translate(0px, 0px) rotate(-1.5deg);
  }
  64% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  66% {
    transform: translate(1.6px, -1.6px) rotate(0.5deg);
  }
  68% {
    transform: translate(0px, -1.6px) rotate(-2deg);
  }
  70% {
    transform: translate(-1.6px, 1px) rotate(1.5deg);
  }
  72% {
    transform: translate(-1.6px, 1.6px) rotate(2deg);
  }
  74% {
    transform: translate(1.3px, -1.6px) rotate(-0.5deg);
  }
  76% {
    transform: translate(1.4px, 1px) rotate(-0.5deg);
  }
  78% {
    transform: translate(-1px, 1.4px) rotate(2deg);
  }
  80% {
    transform: translate(1.4px, 1.6px) rotate(2deg);
  }
  82% {
    transform: translate(-1.6px, -1.6px) rotate(-0.5deg);
  }
  84% {
    transform: translate(-1.4px, 1.4px) rotate(-2deg);
  }
  86% {
    transform: translate(1px, 1.4px) rotate(-2deg);
  }
  88% {
    transform: translate(-1.4px, 1.4px) rotate(-1.5deg);
  }
  90% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  92% {
    transform: translate(-1.4px, 1.6px) rotate(2deg);
  }
  94% {
    transform: translate(-1.6px, -1.6px) rotate(-2deg);
  }
  96% {
    transform: translate(-1.4px, 1.3px) rotate(-2deg);
  }
  98% {
    transform: translate(1.3px, 1px) rotate(-0.5deg);
  }
}
</style>
<style scoped>
.pop-second >>> .pop-mask-new {
  z-index: 11;
}
</style>