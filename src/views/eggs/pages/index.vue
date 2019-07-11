<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <div class="header1">
      <img src="./images/index/header-title.png" class="header-title">
      <h4 class="e-time">截止时间：7月7日23:59:59</h4>
      <img src="./images/index/back.png" class="e-back">
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
            <small-egg :awards-item="item" :isActived="currentIndex === index"></small-egg>
          </li>
        </ul>
      </div>
    </div>
    <a href="javascript:" v-if="canHit" class="btn-hit" @click.stop="goHit">消耗锤子砸彩蛋</a>
    <a href="javascript:" v-else class="btn-hit disabled">请按序砸蛋</a>
  </div>
</template>
<script type="text/javascript">
import { betProgress, betAwards } from '../utils/api'
export default {
  data () {
    return {
      isEggsInfoShow: false,
      styleItemsArr: [],
      nodeList: [4, 8, 11, 13],
      currentIndex: 0,
      currentItem: 0,
      activedIndex: 0,
      eggStyle: [[3, 0.56], [4.3, 1.12], [5.46, 1.66], [4.26, 2.36], [2.36, 2.18], [1.12, 2.8], [1.8, 3.84], [3, 4.4], [4.14, 4.24], [5.46, 4.78], [4.26, 5.4], [3.1, 6.02], [1.84, 5.68], [0.66, 6.4], [2.4, 7.4]],
      awardsList: [],
      eggsInfoList: [],
      canHit: true
    }
  },
  components: {
    smallEgg: () => import('../components/smallEgg')
  },
  methods: {
    getLiClass (index) {
      return `e-item${index + 1}`
    },
    goHit () {

    },
    clickEgg (item, index) {
      if (item.status) return
      this.currentIndex = index
      this.currentItem = item
      this.isEggsInfoShow = true
      this.eggsInfoList = this.awardsList.filter(element => {
        return element.awardsLev === item.awardsLev
      })
      if (index <= this.nodeList[this.nodeList.findIndex(element => this.activedIndex < element)]) {
        this.canHit = true
      } else {
        this.canHit = false
      }
    },
    async getBetAwards () {
      const { code, data } = await betAwards()
      if (code === 200) {
        this.awardsList = data
      }
    },
    async init () {
      const { code, data } = await betProgress()
      if (code === 200) {
        this.styleItemsArr = data.map((element, index) => {
          switch (index) {
            case 0:
              element.status = 1
              element.awardsType = 'hfq'
              break;
            case 1:
              element.status = 1
              element.awardsType = 'jdk'
              break;
            case 2:
              element.status = 1
              element.awardsType = 'yg'
              break;

            default:
              break;
          }
          return element
        })
        for (let index = 0; index < data.length; index++) {
          if (data[index].status === 0) {
            this.currentIndex = index
            this.currentItem = data[index]
            this.activedIndex = index
            return
          }
        }
      }
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