<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <img src="./images/index/back.png" class="e-back" @click="back">
    <rule :rule-main="rulesInfo"></rule>
    <message></message>
    <div class="header1">
      <img src="./images/index/header-title.png" class="header-title">
      <h4 v-if="countTime" class="e-time">剩余时间：{{countTime}}</h4>
      <h4 v-else class="e-time">截止时间：{{endTime}}</h4>
    </div>
    <div class="header2">
      <div class="eggs-info" :class="{show:isEggsInfoShow}">
        <h4>可砸出</h4>
        <ul>
          <li v-for="(item,index) in eggsInfoList" :key="index">{{item.awardsName}}</li>
        </ul>
      </div>
    </div>
    <div class="header3">
      <div class="e-items">
        <ul>
          <li :class="getLiClass(index)" v-for="(item,index) in styleItemsArr" :key="index" @click.stop="clickEgg(index)" :style="{left:eggStyle[index][0]+'rem',bottom:eggStyle[index][1]+'rem'}">
            <small-egg :awards-item="item" :isActived="index === currentIndex || item.awardsLev === currentLev && !item.status"></small-egg>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn-wrp">
      <my-awards></my-awards>
      <a href="javascript:" v-if="currentItem.awardsLev === activedLev" class="btn-hit" @click.stop="goHit">消耗锤子砸彩蛋</a>
      <a href="javascript:" v-else class="btn-hit disabled">请按序砸蛋</a>
      <a href="javascript:" class="bit-hit-all" @click.stop="goHitAll"></a>
    </div>
    <drop-down ref="dropDown" :rules-explain="rulesExplain" @show-eggs-info="showDefaultEggs"></drop-down>
    <common-pop :pop-type="popType" :have-gif="haveGif" :is-show-pop="isShowPop" :awards-list="awardsList" @close-pop="closePop" @keep-hit="keepHit" @get-more="getHammer"></common-pop>
    <new-user-page @set-big-egg="setBigEgg" @get-hammer="getHammer"></new-user-page>
  </div>
</template>
<script type="text/javascript">
import { betProgress, betAwards, betSingle, betBatch, userIncrement, activityInfo } from '../utils/api'
export default {
  name: 'index',
  data () {
    return {
      isEggsInfoShow: false,
      styleItemsArr: [],
      activedLev: 1,
      currentLev: 0,
      currentIndex: null,
      currentItem: {},
      eggStyle: [[3, 0.56], [4.3, 1.12], [5.46, 1.66], [4.26, 2.36], [2.36, 2.18], [1.12, 2.8], [1.8, 3.84], [3, 4.4], [4.14, 4.24], [5.46, 4.78], [4.26, 5.4], [3.1, 6.02], [1.84, 5.68], [0.66, 6.4], [2.4, 7.4]],
      allEggsInfo: [],
      eggsInfoList: [],
      awardsList: [],
      popType: 0,
      isShowPop: false,
      endTime: '',
      countTime: 0,
      rulesInfo: '',
      rulesExplain: '',
      haveGif: false
    }
  },
  components: {
    rule: () => import('../components/rule'),
    commonPop: () => import('../components/commonPop'),
    newUserPage: () => import('../components/newUserPage'),
    smallEgg: () => import('../components/smallEgg'),
    myAwards: () => import('../components/myAwards'),
    message: () => import('../components/message'),
    dropDown: () => import('./dropDown')
  },
  async beforeRouteEnter (to, from, next) {
    const { code, data } = await activityInfo()
    if (code === 200) {
      if (data.open) {
        next(vm => {
          vm.rulesInfo = data.rulesInfo
          vm.rulesExplain = data.rulesExplain
          vm.endTime = data.endTime
          vm.countDown(data.countdown)
        })
      } else if (data.countdown) {
        next({ path: '/before' })
      } else {
        next({ path: '/after' })
      }
    } else {
      next()
    }
  },
  methods: {
    setBigEgg () {
      this.clickEgg(this.styleItemsArr.length - 1)
    },
    showDefaultEggs () {
      for (let index = 0; index < this.styleItemsArr.length; index++) {
        if (this.styleItemsArr[index].status === 0) {
          this.clickEgg(index)
          this.activedLev = this.styleItemsArr[index].awardsLev
          return
        }
      }
    },
    back () {
      history.go(-1)
    },
    getLiClass (index) {
      return `e-item${index + 1}`
    },
    async goHit () {
      const { code, data, message } = await betSingle({ value: this.currentItem.sort })
      if (code === 200) {
        this.awardsList = data
        this.haveGif = true
        setTimeout(() => {
          this.isShowPop = true
          this.isEggsInfoShow = false
          this.popType = 0
          this.$refs.dropDown.init()
          setTimeout(() => {
            this.haveGif = false
          }, 500)
        }, 1300)
      } else if (code === 101) {
        this.$toast.show({
          message,
          duration: 3000
        })
      } else if (code === 102) {
        this.awardsList = [{
          awardsType: 'hammer'
        }]
        this.isShowPop = true
        this.isEggsInfoShow = false
        this.popType = 3
      }
    },
    async goHitAll () {
      this.currentIndex = null
      this.currentLev = this.activedLev
      const { code, data, message } = await betBatch({ value: this.activedLev })
      if (code === 200) {
        this.awardsList = data
        this.haveGif = true
        setTimeout(() => {
          this.isShowPop = true
          this.isEggsInfoShow = false
          this.popType = 1
          this.$refs.dropDown.init()
          setTimeout(() => {
            this.haveGif = false
          }, 500)
        }, 1300)
      } else if (code === 101) {
        this.$toast.show({
          message,
          duration: 3000
        })
      } else if (code === 102) {
        this.awardsList = [{
          awardsType: 'hammer'
        }]
        this.isShowPop = true
        this.isEggsInfoShow = false
        this.popType = 3
      }
    },
    getHammer () {
      this.isShowPop = false
      this.$refs.dropDown.handleTab(0)
    },
    clickEgg (index) {
      let item = this.styleItemsArr[index]
      if (item.status) return
      this.currentLev = 0
      this.currentIndex = index
      this.currentItem = item
      this.isEggsInfoShow = true
      this.eggsInfoList = this.allEggsInfo.filter(element => {
        return element.awardsLev === item.awardsLev
      })
    },
    async getBetAwards () {
      const { code, data } = await betAwards()
      if (code === 200) {
        this.allEggsInfo = data
      }
    },
    async getBetProgress () {
      const { code, data } = await betProgress()
      if (code === 200) {
        this.styleItemsArr = data
        this.showDefaultEggs()
        this.$nextTick(() => {
          if (!this.currentIndex) {
            this.$toast.show({
              message: '新蛋生成',
              duration: 3000
            })
          }
        })
      }
    },
    async getUserIncrement () {
      const { code, data } = await userIncrement()
      if (code === 200 && data) {
        this.awardsList = [{
          awardsType: 'hammer',
          awardsName: '新增' + data + '个锤子'
        }]
        this.popType = 2
        this.isShowPop = true
        this.isEggsInfoShow = false
      }
    },
    async closePop () {
      this.isShowPop = false
      await this.getBetProgress()
    },
    async keepHit (type) {
      await this.closePop()
      if (this.popType === 1) {
        await this.goHitAll()
        return
      }
      await this.goHit()
    },
    countDown (item) {
      if (!item) return false
      let date = item / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day >= 2) {
          this.countTime = 0
        } else {
          this.countTime = `${countDay}天${countHour}:${countMinute}:${countSecond}`
        }
      }, 1000)
    }
  },
  async mounted () {
    await this.getBetAwards()
    this.getBetProgress()
    this.getUserIncrement()
  }
}
</script>
<style lang="less" scoped>
@import "./css/index.less";
</style>