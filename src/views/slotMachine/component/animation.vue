<template>
  <div class="animation" v-if="showAnimation">
    <div class="wrapper">
      <div class="groups animation-ease" 
        v-for="(item, index) in animationList" 
        :key="index" 
      >
        <div class="status">
          <div class="status2" v-if="item.state == 2">
            <div class="lock"><img src="../images/number-random.png" alt=""></div>
          </div>
          <div class="status3" v-if="item.state == 3">
            <div class="lock"><img src="../images/lock.png" alt=""></div>
            <div class="btn" v-if="userInfo.nextStage == item.stage"><img src="../images/lock-btn.png" alt=""></div>
            <div class="btn" v-else><img src="../images/unlock-btn.png" alt=""></div>
          </div>
        </div>
        <div class="groups-wrapper" ref="groups" @webkitTransitionEnd="endGame()">
          <ul class="group-item" 
            ref="groupItem"
            v-for="(item, index) in round" 
            :key="index"
          >
              <li :class="`prize-item prize-item${item}`"
                ref="item"
                v-for="(item, index) in prizes"
                :key="index"
              >
                <div class="number"></div>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="need-pay" v-if="userInfo.nextStage == 0">
      今日已达到最高奖励
    </div>
    <div class="need-pay" v-else>
        解锁{{userInfo.nextStage | unit}}数字: 
        <span>累计充值 {{userInfo.nextStageRecharge}} 元</span>
    </div>
    <div class="recharge">
      <div class="text">
        当前累充：{{userInfo.recharge}}元
      </div>
      <div class="btn" @click="goPay"></div>
    </div>
    <div class="has-play">当前可摇：{{ userInfo.upTimes }}位</div>
    <div class="activity-time">
      活动时间:<br>
      {{userInfo.beginDate}}-{{userInfo.endDate}}
    </div>
    <div @click.stop="startClick" class="start-btn"></div>
    <popup v-model="showPopup" :status="status" :AwardsList="AwardsList" :AwardsNumber="AwardsNumber" :userInfo="userInfo"></popup>
  </div>
</template>
<script>
import popup from './popup'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  props: {
    animationList: {
      type: Array
    },
    userInfo: {
      type: Object,
      default: () =>({})
    }
  },
  data(){
    return {
      round: 4,//转几回合后停下来
      prizes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      disClick: false,//防止多次点击
      groups: '', //单位元素
      groupItemHeight: '', // ul元素高度
      itemHeight: '',// 奖品元素高度
      AwardsList: [],
      showPopup: false,
      status: 2,
      AwardsNumber: 90000
    }
  },
  filters: {
    unit(value) {
      switch(value) {
        case 1 :
          return '个位'
          break;
        case 2 :
          return '十位'
          break;
        case 3 :
          return '百位'
          break;
        case 4 :
          return '千位'
          break;
        case 5 :
          return '万位'
          break;
        case 6 :
          return '十万位'
          break;
        case 7 :
          return '百万位'
          break;  
      }
    }
  },
  components: {
    popup
  },
  computed: {
    showAnimation() {
      return this.animationList.length
    }
  },
  methods:{
    animationArray(price) {
      let list = [...this.animationList]
      let data = [...(price+'')].reverse()
      data.map((item, index)=> {
        if(list[index].state == 2 || !list[index].number) {
          list[index].number = item
          list[index].state = 1
        }
      })
      this.AwardsList = list
      return list
    },
    /** 开始抽奖 **/
    startClick() {
      if(this.disClick) return
      this.disClick = true;
      Services.runAnimation().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200 && data) {
          this.status = 2
          this.AwardsNumber = data
          this.runGame(this.animationArray(data))
        }else {
          this.status = 1
          this.showPopup = true
          this.disClick = false;
        }
      })
    },
    /** 启动抽奖 **/
    runGame(indexArr){
      this.resetGame(indexArr);
      this.groups.map((item, index)=>{
        if(indexArr[index].state!=1) return false
        /** 获取每个单位停止位置 **/
        let groupsIndex = indexArr[index].number
        let pos = (groupsIndex * this.itemHeight) + (this.groupItemHeight * (this.round - 1))
        setTimeout(()=>{
          item.style.transform = 'translate(0, -' + pos + 'px)'
          item.classList.add('animation-ease')
        },index * 300)
      })
    },
    /** 重置状态 **/
    resetGame(indexArr){
      this.groups.map((item, index)=> {
        if(indexArr[index].state == 1) return false
        item.style.transform = ''
        item.classList.remove('animation-ease')
      })
    },
    /** 抽奖结束后的回调 **/
    endGame() {
      this.disClick = false;
      this.showPopup = true
      this.$emit('refersh')
    },
    /** 去支付 **/
    goPay() {
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
      if(['100039001','100069','100070','100073','100075','100080'].includes(APP_CHANNEL)) {
        window.location.href = `https://wap.beeplaying.com/xmWap/#/payment/?channel=${APP_CHANNEL}`
      }else {
        window.location.href = `https://wap.beeplaying.com/payment/#/mall?channel=${APP_CHANNEL}`
      }
    },
    init() {
      /** 价格单位元素 **/
      this.groups = this.$refs.groups
      /** 价格单位元素高度 **/
      this.groupsHeight =  this.$refs.groups[0].clientHeight
      /** 价格单位内容元素 **/
      this.groupItemHeight = this.$refs.groupItem[0].clientHeight
      /** 价格单位奖品 **/
      this.itemHeight = this.$refs.item[0].clientHeight
      /** 设置位置 **/
      this.groups.map((item, index)=>{
        /** 初始化位置 **/
        if(this.animationList[index].state!=1) return false
        /** 获取每个单位停止位置 **/
        let groupsIndex = this.animationList[index].number
        let pos = (groupsIndex * this.itemHeight) + (this.groupItemHeight * (this.round - 1))
        item.classList.remove('animation-ease')
        item.style.transform = 'translate(0, -' + pos + 'px)'
      })
    }
  },
  watch: {
    showAnimation: {
	      handler (newVal) {
          setTimeout(()=> {
            this.init()
          }, 30)
	      },
	      deep: true,
	      immediate: true
    }
  }
}
</script>
<style lang="less" scoped>
.animation {
  position:relative;
  margin: .48rem .65rem 0 .5rem;
  height: 1.97rem;
  .wrapper {
    overflow: hidden;
    height: 1.97rem;   
    .groups{
      position: relative;
      float: right;
      width: .82rem;
      margin-left: .05rem;
      background: url(../images/number-bg-active.png) no-repeat center top / 100% 100%;
      .status {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 2;
        width: 100%;
        height: 1.97rem;
        .lock {
          margin: .4rem auto .05rem;
          width: .63rem;
          height: .63rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .btn {
          margin: 0 auto;
          width: .76rem;
          height: .42rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .status2{
          overflow: hidden;
          width: 100%;
          height: 1.97rem;
          background: url(../images/number-bg.png) no-repeat center top / 100% 100%;
          .lock {
            margin: .69rem auto 0;
          }
        }
        .status3{
          overflow: hidden;
          width: 100%;
          height: 1.97rem;
          background: url(../images/number-bg.png) no-repeat center top / 100% 100%;
        }
      }
      &:first-child{
        border-radius: 0 16px 16px 0; 
        overflow: hidden;
        background: url(../images/number-right.png) no-repeat center top / 100% 100%;
      }
      &:last-child{
        border-radius: 16px 0 0 16px; 
        background: url(../images/number-left-active.png) no-repeat center top / 100% 100%;
        overflow: hidden;
        margin-left: 0;
        .status3 {
          background: url(../images/number-left.png) no-repeat center top / 100% 100%;
        }
      }
      .groups-wrapper{
        width: .82rem;
        height: 1.97rem;
        position: relative;
        z-index: 1;
      }
    }
    .group-item {
      vertical-align: top;
      width: 100%;
    }
    .prize-item{
      vertical-align: top;
      width: 100%;
      height: 1.97rem;
      &.prize-item0 {
        .number {
          width: 100%;
          height: 100%;
        }
      }
      &.prize-item1 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/1.png) no-repeat center center / .32rem .82rem;
        }
      }
      &.prize-item2 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/2.png) no-repeat center center / .64rem .82rem;
        }
      }
      &.prize-item3 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/3.png) no-repeat center center / .64rem .82rem;
        }
      }
      &.prize-item4 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/4.png) no-repeat center center / .66rem .82rem;
        }
      }
      &.prize-item5 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/5.png) no-repeat center center / .65rem .82rem;
        }
      }
      &.prize-item6 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/6.png) no-repeat center center / .64rem .82rem;
        }
      }
      &.prize-item7 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/7.png) no-repeat center center / .64rem .82rem;
        }
      }
      &.prize-item8 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/8.png) no-repeat center center / .64rem .82rem;
        }
      }
      &.prize-item9 {
        .number {
          width: 100%;
          height: 100%;
          background: url(../images/9.png) no-repeat center center / .64rem .82rem;
        }
      }
    }
  }
  .need-pay {
    margin: .6rem auto 0;
    height: .62rem;
    line-height: .62rem;
    text-align: center;
    color: #fff;
    font-size: .3rem;
    span {
      color: #FFFAA2;
    }
  }
  .recharge {
    position: relative;
    margin-top: .62rem;
    width: 4.4rem;
    height: .6rem;
    line-height: .6rem;
    text-align: center;
    .text {
      font-size: .3rem;
      height: .6rem;
      color: #F37B37;
    }
    .btn {
      position: absolute;
      right: -2.2rem;
      top: 0;
      width: 2rem;
      height: .68rem;
      background: url(../images/go-pay.png) no-repeat center center / 100% 100%;
    }
  }
  .has-play {
    margin-top: 1.75rem;
    height: .46rem;
    line-height: .49rem;
    text-align: center;
    color: #F37B37;
    font-size: .3rem;
  }
  .activity-time {
    margin-top: .9rem;
    height: 1rem; 
    text-align: center;
    font-size: .3rem;
    line-height: .49rem;
    color: #FB7422;
  }
  .start-btn {
    position: absolute;
    top: 4.75rem;
    left: .87rem;
    width: 4.44rem;
    height: 1.28rem;
    background: url(../images/click.png) no-repeat center center / 100% 100%;
  }
}
.animation-ease{
    transition-property: transform;
    transition-duration: 3s;
    transition-timing-function: ease;
}

</style>