<template>
  <section>
    <div class="entrance-header-item" @click="showPop=true">
      <img class="entrance-header-img" src="../../images/cat_supply/biaoxianbox.png">
      <div class="entrance-header-text">保险箱</div>
    </div>
    <common-pop :title="title" v-if="showPop" @close="showPop = false" :btn-name="btnName" @besure="besure">
      <section v-html="mainHtml">
      </section>
    </common-pop>
  </section>
</template>

<script>
export default {
  name: '',
  components: {
    commonPop: () => import('./commonPopNew')
  },
  data () {
    return {
      showPop: true,
      saveBoxInfo: {
        balance: null, // 保险箱余额
        bankLv: null, // 保险箱等级
        isFreeze: null, // 是否已冻结 0: 否 1是
        isOpen: null, // 是否已开通 0：未开通 1：已开通
        maxNum: null, // 当前最大存入金叶数
        nextNum: null // 下级最大存入金页数
      },
      clickType: 0 // 0 未点击 1 点击存入 2 点击取出
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    saveBoxStatus () {
      if (!this.saveBoxInfo.isOpen) {
        return 0 // 未开启
      }
      if (this.clickType === 1 && this.saveBoxStatus.isFreeze) {
        return 2
      }
      if (this.clickType === 2 && this.saveBoxStatus.isFreeze) {
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
        default:
          break
      }
    },
    btnName () {
      switch (this.saveBoxStatus) {
        case 0:
          return '去招财猫开启权益'
        default:
          break
      }
    },
    mainHtml () {
      switch (this.saveBoxStatus) {
        case 0:
          return '<p class="mt28">保险箱为招财猫Lv.30权益：<br>可用于存储保底金叶子，<br>游戏再嗨 ，也不怕消耗完您的所有金叶</p>'

        default:
          break
      }
    }
  },
  methods: {
    async init () {
      const res = await this.axios.post('//trans-api.beeplaying.com/trans/api/bank/status')
      const { data, code } = res.data
      if (code === 200) {
        this.saveBoxInfo = data
      }
    },
    besure () {
      switch (this.saveBoxStatus) {
        case 0:
          this.goCat()
          break

        default:
          break
      }
    },
    goCat () {
      WapCall.openGame('/cat/')
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
</style>
