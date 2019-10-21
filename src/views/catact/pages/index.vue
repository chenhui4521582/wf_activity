<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <img src="./images/index/back.png" class="e-back" @click.stop="back">
    <rule :rule-main="rulesInfo"></rule>
    <message ref="message"></message>
    <div class="header1">
      <h4 class="e-time">价值<i>2000元大奖</i>等你抢</h4>
      <h4 class="e-time e-time-act">活动时间：9.25-9.29</h4>
    </div>
    <div class="header3">
      <div class="e-items">
        <div class="sign-container">
          <div class="container">
            <div class="item" v-for="(item,index) in 6">
              <div class="leaf_div">
                <template v-if="index<5">
                  <img src="./images/index/leaf_gray.png" alt=""  class="leaf">
                </template>
                <template v-else>
                  <!--<img src="./images/index/leaf_extra_gray.png" alt="" class="leaf leaf_extra">-->
                  <img src="./images/index/leaf_extra_gained.png" alt="" class="leaf leaf_extra">
                  <!--<img src="./images/index/leaf_extra_light.png" alt="" class="leaf leaf_extra leaf_extra_light">-->
                </template>
              </div>
              <div class="leaf_info" :class="{extra:index==5}">
                <template v-if="index<5">
                  <div class="item">10.25</div>
                  <div class="item">3/3</div>
                </template>
                <template v-else>
                  <div class="item">1000金叶</div>
                </template>
              </div>
            </div>
          </div>
          <div class="progress">
            <div class="progress_bar complete"  :style="{width:progresswidth[5]}"></div>
          </div>
        </div>
        <div class="task-container">
          <div class="title">
            <div class="item">连续5天完成所有每日任务，还可额外领取xxx金叶</div>
            <div class="item">每日任务列表</div>
          </div>
          <div class="task_list">
            <div class="item" v-for="(item,index) in 3">
              <img src="./images/index/task_img.png" alt="" class="task_img" v-if="index==0">
              <img src="./images/index/task_maoqiu.png" alt="" class="task_img" v-else-if="index==1">
              <img src="./images/index/task_cat.png" alt="" class="task_img" v-else>
              <div class="info">
                <div class="item1" v-if="index==0">喂猫一次</div>
                <div class="item1" v-else-if="index==1">喂猫一次</div>
                <div class="item1" v-else>好感度达到100</div>
                <div class="item2">
                  <img src="./images/index/task_fish.png" alt="" class="task_fish" v-if="index<2">
                  <img src="./images/index/task_leaf.png" alt="" class="task_fish" v-else>
                  <span>100g鱼干</span>
                </div>
              </div>
              <div class="btn">
                <div>如何增加好感度></div>
                <img src="./images/index/task_complete.png" alt="" class="task_btn">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <drop-down ref="dropDown" :rules-explain="rulesExplain" @show-eggs-info="showDefaultEggs()"></drop-down>
    <common-pop :pop-type="popType" :have-gif="haveGif" :is-show-pop="isShowPop" :awards-list="awardsList"
                @close-pop="closePop" @keep-hit="keepHit" @get-more="getHammer"></common-pop>
  </div>
</template>
<script type="text/javascript">
  import {betProgress, betAwards, betSingle, betBatch, userIncrement, activityInfo, activityGuide} from '../utils/api'

  export default {
    name: 'index',
    data() {
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
        awardsList: [1],
        popType: 0,
        isNewUserShow: false,
        endTime: '',
        countTime: null,
        rulesInfo: '',
        rulesExplain: '',
        haveGif: false,
        isHitted: false,
        progresswidth:[0,'13%','31%','48.5%','66%','84.5%','100%'],
        isShowPop: true
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
    async beforeRouteEnter(to, from, next) {
      const {code, data} = await activityInfo()
      data.open = true
      if (code === 200) {
        if (data.open) {
          next(vm => {
            vm.rulesInfo = data.rulesInfo
            vm.rulesExplain = data.rulesExplain
            vm.endTime = data.endTime
            vm.countDown(data.countdown)
          })
        } else if (data.countdown) {
          next({path: '/before'})
        } else {
          next({path: '/after'})
        }
      } else {
        next()
      }
    },
    methods: {
      setBigEgg() {
        this.clickEgg(this.styleItemsArr.length - 1)
      },
      showDefaultEggs() {
        for (let index = 0; index < this.styleItemsArr.length; index++) {
          if (this.styleItemsArr[index].status === 0) {
            this.clickEgg(index)
            this.activedLev = this.styleItemsArr[index].awardsLev
            return
          }
        }
      },
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0075001458')   // H5平台-砸金蛋-点击返回
        history.back(-1)
      },
      getLiClass(index) {
        return `e-item${index + 1}`
      },
      async goHit() {
        if (this.isHitted) {
          return
        }
        this.isHitted = true
        GLOBALS.marchSetsPoint('A_H5PT0075001462')   // H5平台-砸金蛋-点击消耗锤子砸彩蛋
        const {code, data, message} = await betSingle({value: this.currentItem.sort})
        this.isHitted = false
        if (code === 200) {
          this.awardsList = data
          this.haveGif = true
          setTimeout(() => {
            GLOBALS.marchSetsPoint('A_H5PT0075001473')   // H5平台-砸金蛋-展现砸蛋成功弹窗
            this.isShowPop = true
            this.isEggsInfoShow = false
            this.popType = 0
            this.$refs.dropDown.init()
            this.$refs.message.init()
            setTimeout(() => {
              this.haveGif = false
            }, 500)
          }, 1500)
        } else if (code === 101) {
          this.$toast.show({
            message,
            duration: 3000
          })
        } else if (code === 102) {
          this.awardsList = [{
            awardsType: 'hammer'
          }]
          GLOBALS.marchSetsPoint('A_H5PT0075001477')   // H5平台-砸金蛋-展现砸蛋失败弹窗
          this.isShowPop = true
          this.isEggsInfoShow = false
          this.popType = 3
        }
      },
      async goHitAll() {
        if (this.isHitted) {
          return
        }
        this.isHitted = true
        GLOBALS.marchSetsPoint('A_H5PT0075001463')   // H5平台-砸金蛋-点击同色全砸
        this.currentIndex = null
        this.currentLev = this.activedLev
        const {code, data, message} = await betBatch({value: this.activedLev})
        this.isHitted = false
        if (code === 200) {
          this.awardsList = data
          this.haveGif = true
          setTimeout(() => {
            GLOBALS.marchSetsPoint('A_H5PT0075001473')   // H5平台-砸金蛋-展现砸蛋成功弹窗
            this.isShowPop = true
            this.isEggsInfoShow = false
            this.popType = 1
            this.$refs.dropDown.init()
            this.$refs.message.init()
            setTimeout(() => {
              this.haveGif = false
            }, 500)
          }, 1500)
        } else if (code === 101) {
          this.$toast.show({
            message,
            duration: 3000
          })
        } else if (code === 102) {
          this.awardsList = [{
            awardsType: 'hammer'
          }]
          GLOBALS.marchSetsPoint('A_H5PT0075001477')   // H5平台-砸金蛋-展现砸蛋失败弹窗
          this.isShowPop = true
          this.isEggsInfoShow = false
          this.popType = 3
        }
      },
      async getHammer() {
        await this.closePop()
        this.isNewUserShow = false
        this.isEggsInfoShow = false
        this.$refs.dropDown.handleTab(0)
      },
      clickEgg(index, isClick = false, isEggsInfoShow = true) {
        let item = this.styleItemsArr[index]
        if (item.status) return
        if (isClick) {
          GLOBALS.marchSetsPoint('A_H5PT0075001460')   // H5平台-砸金蛋-点击任意蛋
        }
        this.currentLev = 0
        this.currentIndex = index
        this.currentItem = item
        this.isEggsInfoShow = isEggsInfoShow
        this.eggsInfoList = this.allEggsInfo.filter(element => {
          return element.awardsLev === item.awardsLev
        })
      },
      async getBetAwards() {
        const {code, data} = await betAwards()
        if (code === 200) {
          this.allEggsInfo = data
        }
      },
      async getBetProgress() {
        const {code, data} = await betProgress()
        if (code === 200) {
          this.styleItemsArr = data
          this.showDefaultEggs()
        }
      },
      async getActivityGuide() {
        const {code, data} = await activityGuide()
        if (code === 200 && data) {
          this.isNewUserShow = true
          this.setBigEgg()
        }
        this.getUserIncrement()
      },
      async getUserIncrement() {
        const {code, data} = await userIncrement()
        if (code === 200 && data) {
          this.awardsList = [{
            awardsType: 'hammer',
            awardsName: '新增' + data + '个锤子'
          }]
          this.popType = 2
          if (!this.isNewUserShow) {
            GLOBALS.marchSetsPoint('A_H5PT0075001454')   // H5平台-砸金蛋-展现恭喜新增锤子弹窗
            this.isShowPop = true
            this.isEggsInfoShow = false
          }
        }
      },
      async closePop() {
        this.isShowPop = false
        await this.getBetProgress()
      },
      async keepHit() {
        await this.closePop()
        if (this.popType === 1) {
          await this.goHitAll()
          return
        }
        await this.goHit()
      },
      countDown(item) {
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
          // let countDay = day >= 10 ? day : '0' + day
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day >= 2) {
            this.countTime = 0
          } else if (day > 0) {
            this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
      }
    },
    async mounted() {
      await this.getBetAwards()
      await this.getBetProgress()
      await this.getActivityGuide()
      GLOBALS.marchSetsPoint('A_H5PT0075001453')   // H5平台-砸金蛋-活动进行中-页面
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";
  @import "./css/index.less";
</style>
