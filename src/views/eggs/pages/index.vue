<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <p style="width: 50px;height: 50px;background: red;position: fixed;
  	right: 0;bottom: 0;font-size: 18px;" @click="isDropDown = true">openProfit test</p>
    <div class="header1">
      <img src="./images/index/header-title.png" class="header-title">
      <h4 class="e-time">截止时间：7月7日23:59:59</h4>
      <img src="./images/index/back.png" class="e-back" @click="back">
      <rule></rule>
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
          <li :class="getLiClass(index)" v-for="(item,index) in styleItemsArr" :key="index" @click.stop="clickEgg(item,index)" :style="{left:eggStyle[index][0]+'rem',bottom:eggStyle[index][1]+'rem'}">
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
    <common-pop :pop-type="popType" :is-show-pop="isShowPop" :awards-list="awardsList" @close-pop="closePop" @keep-hit="keepHit" @get-more="getMore"></common-pop>
    <dropDown @close="closeDropDown" v-if="isDropDown" />
  </div>
</template>
<script type="text/javascript">
import { betProgress, betAwards, betSingle, betBatch } from '../utils/api'
export default {
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
      isDropDown: true
    }
  },
  components: {
    smallEgg: () => import('../components/smallEgg'),
    myAwards: () => import('../components/myAwards'),
    commonPop: () => import('../components/commonPop'),
    rule: () => import('../components/rule'),
    dropDown: () => import('./dropDown')
  },
  computed: {

  },
  methods: {
    back () {
      history.go(-1)
    },
    getLiClass (index) {
      return `e-item${index + 1}`
    },
    async goHit () {
      const { code, data } = await betSingle({ value: this.currentItem.sort })
      if (code === 200) {
        this.awardsList = data
        this.isShowPop = true
      }
    },
    async goHitAll () {
      this.currentIndex = null
      this.currentLev = this.activedLev
      const { code, data } = await betBatch({ value: this.activedLev })
      if (code === 200) {
        this.awardsList = data
        this.isShowPop = true
      }
    },
    clickEgg (item, index) {
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
    async init () {
      const { code, data } = await betProgress()
      if (code === 200) {
        this.styleItemsArr = data
        for (let index = 0; index < data.length; index++) {
          if (data[index].status === 0) {
            if (!index) {
              this.$toast.show({
                message: '新蛋生成',
                duration: 3000
              })
            }
            this.currentLev = 0
            this.currentIndex = index
            this.currentItem = data[index]
            this.activedLev = data[index].awardsLev
            return
          }
        }
      }
    },
    closePop () {
      this.isShowPop = false;
    },
    keepHit () { },
    getMore () { },
    closeDropDown () {
      this.isDropDown = false
    }
  },
  mounted () {
    this.init()
    this.getBetAwards()
  }
}
</script>
<style lang="less" scoped>
@import "./css/index.less";
</style>