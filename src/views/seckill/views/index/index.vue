<template>
  <div class="index">
    <div class="header">
      <div class="bg">
        <img src="./img/header-bg.png" alt="">
      </div>
      <div class="back" @click="back">
        <img src="./img/back.png" alt="">
      </div>
      <div class="flower">
        <img src="./img/flower.png" alt="">
      </div>
    </div>
    <div class="center">
      <div class="nav">
        <div class="items">
        <template v-for="(item, index) in nav" >
          <div class="item" :class="{active: handIndex == index}" :key="index" @click="handleNav(item, index)">
            <div class="date">{{versionDate(item)}}</div>
            <div class="status" v-if="index < currentIndex">已结束</div>
            <div class="status" v-if="index == currentIndex">进行中</div>
            <div class="status" v-if="index > currentIndex">即将开始</div>
            <div class="line"></div>
          </div>
        </template>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
          <div class="item-img">
            <img :src="item.icon | filter" alt="">
          </div>
          <div class="item-text">
            <div class="item-name">{{item.title}}</div>
            <div class="item-progress">
              <div class="wrap">
                <div class="bg" :style="{width: progress(item) + '%'}"></div>
              </div>
              <div class="text">已抢{{ progress(item)}}%</div>
            </div>
            <div class="item-title">限时秒杀价</div>
            <div class="item-price">
              <div class="current-price">
                <span>{{(item.seckillPrice / 10).toFixed(2)}}</span><i>话费券</i> 
              </div>
              <div class="mask-price">原价:{{(item.awardPrice / 10).toFixed(2)}}</div>
            </div>
          </div>
          <div class="btn before" v-if="item.status == 0">即将开始</div>
          <div class="btn current" v-if="item.status == 1">
            <span>马上抢</span>
            <img src="./img/right-icon.png" alt="">
          </div>
          <div class="btn end" v-if="item.status == 2">已结束</div>
          <div class="icon before" v-if="item.status == 0">{{versionDate(item.startTime, 1)}}开始</div>
          <div class="icon current" v-if="item.status == 1">{{item.countTime}}后结束</div>
          <div class="icon end" v-if="item.status == 2">已结束</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Services from "../../services/services"
import _get from 'lodash.get'
export default {
  name: 'index',
  data: ()=> ({
    showPopup: false,
    nav: [],
    list: [],
    nowDay: '',
    currentIndex: -1,
    handIndex: -1,
    listTimers: [],
    fragment: ''
  }),
  components: {
    // Popup
  },
  computed: {
  },
  methods: {
    /** 导航点击 **/
    handleNav(item,index) {
      this.handIndex = index
      this._getActivityList(item)
      GLOBALS.marchSetsPoint('A_H5PT0237002752',{
        awards_id: item
      })
    },
    /** 获取活动页数据 **/
    _getActivityInfo () {
      Services.getActivityInfo().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.nav = _get(res, 'data.data.seckillDay', [])
          this.list = _get(res, 'data.data.periodList', [])
          this.nowDay = _get(res, 'data.data.nowDay', '')
          this.fragment = _get(res, 'data.data.fragment', '')
          this.currentIndex = this.nav.indexOf(this.nowDay)
          this.handIndex = this.nav.indexOf(this.nowDay)
          this.countDownArr()
        }
      })
    },
    /** 获取秒杀列表 **/
    _getActivityList (item) {
      Services.getList({value: item}).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = _get(res, 'data.data.list', [])
          this.countDownArr()
        }
      })
    },
    /** 转换时间 **/
    versionDate(time, type) {
      let timesTamp = new Date(time)
      let mounth = timesTamp.getMonth() + 1
      let day = timesTamp.getDate()
      let hour = timesTamp.getHours()
      let minute = timesTamp.getMinutes()
      let second = timesTamp.getSeconds()
      let countMounth = mounth >= 10 ? mounth : '0' + mounth
      let countDay = day >= 10 ? day : '0' + day
      let countHour = hour >= 10 ? hour : '0' + hour
      let countMinute = minute >= 10 ? minute : '0' + minute
      let countSecond = second >= 10 ? second : '0' + second
      if(type == '1'){
        return `${countHour}:${countMinute}`
      }
      return `${countMounth}月${countDay}日`
    },
    /** 多组倒计时 **/
    countDownArr () { 
      /** 清除多组倒计时列队 **/
      this.clearCountDown()
      let length = this.list.length
      length && this.list.forEach((item, index) => { 
        if (item.status == 1) {
          let _index = index
          let start = new Date().getTime()
          let endTime = item.endTime.replace(/(-)/g, '/')
          let endTimeStamp = new Date(endTime).getTime()
          let coutDownTime = endTimeStamp - start
          this.initTime(coutDownTime, _index)
          this.countDownTime(coutDownTime, _index)
        }
        if(item.status == 0) {
          let _index = index
          let start = new Date().getTime()
          let endTime = item.startTime.replace(/(-)/g, '/')
          let endTimeStamp = new Date(endTime).getTime()
          let coutDownTime = endTimeStamp - start
          this.initTime(coutDownTime, _index)
          this.countDownTime(coutDownTime, _index)
        }
      })
    },
    /** 计算倒计时时间 **/
    initTime (info, index) {
      if (!info) return false
      if (info <= 0) {
        info = 0
      }
      let date = info / 1000
      let hour = Math.floor(parseInt(date / 60 / 60) % 24)
      let minute = Math.floor(parseInt(date / 60) % 60)
      let second = Math.floor(date % 60)
      let countHour = hour >= 10 ? hour : '0' + hour
      let countMinute = minute >= 10 ? minute : '0' + minute
      let countSecond = second >= 10 ? second : '0' + second
      this.$set(
        this.list,
        index,
        { ...this.list[index], ...{ countTime: `${countHour}:${countMinute}:${countSecond}` } }
      )
    },
    /** 倒计时 **/
    countDownTime (info, index) {
      if (!info) return false
      let date = info / 1000
      this.listTimers[index] = window.setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          window.clearInterval(this.listTimers[index])
          this._getActivityList(this.handIndex)
        }
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.$set(
          this.list,
          index,
          { ...this.list[index], ...{ countTime: `${countHour}:${countMinute}:${countSecond}` } }
        )
      }, 1000)
    },
    /** 进度条 **/
    progress(item) {
      if(item.status == 0) {
        return 0
      }
      if(item.status == 2) {
        return 100
      }
      if(item.status == 1) {
        return Math.floor(item.useNum / item.awardNum * 100)
      }
    },
    /** 清除多组倒计时列队 **/
    clearCountDown () {
      this.listTimers.length && this.listTimers.forEach(item => {
        window.clearInterval(item)
      })
    },
    /** 去详情页 **/
    goDetail(item) {
      this.$router.push({
        name: 'details',
        query: {
          id: item.id
        }
      })

    },
    back () {
      window.location.href = `https://wap.beeplaying.com/xmWap/`
    }
  },
  mounted() {
    this._getActivityInfo()
    GLOBALS.marchSetsPoint('P_H5PT0237')
  },
  beforeDestroy() {
    this.clearCountDown()
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.index {
  min-height: 100vh;
  background: #AA0707;
  .header {
    position: relative;
    height: 3.78rem;
    .bg {
      width: 100%;
      height: 3.78rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 3.78rem;
      }
    }
    .back {
      position: absolute;
      left: 0;
      top: .33rem;
      width: .83rem;
      height: .72rem;
      img {
        vertical-align: top;
        width: 100%;
      }
    }
    .flower {
      position: absolute;
      top: 2.68rem;
      left: 0;
      width: 1.96rem;
      height: 1.28rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
  }
  .center {
    background:url(./img/bg.png) no-repeat center top / 6.74rem 10rem ;
    .nav {
      padding:.03rem 0 0 1.2rem;
      height: .76rem;
      background: url(./img/nav-bg.png) no-repeat left center / 100% 100%;
      .items {
        width: 100%;
        height: .69rem;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-x: auto; 
        -webkit-overflow-scrolling: touch;  
        .item {
          position: relative;
          text-align: center;
          width: 1.1rem;
          height: .69rem;
          flex-shrink: 0;
          .date {
            padding-top: .06rem;
            white-space: nowrap;
            font-weight:600;
            font-size: .22rem;
            color: #FFB97A;
          }
          .status {
            padding-top: .05rem;
            font-size: .2rem;
            color: #FFB97A;
          }
          .line {
            position: absolute;
            right: 0;
            top: .07rem;
            width: 1px;
            height: .56rem;
            background: #AA0707;
          }
          &.active {
            background: url(./img/nav-acitve.png) no-repeat center center / 100% 100%;
            .line {
              display: none;
            }
            .date {
              color: #A2010E;
            }
            .status {
              color: #A2010E;
            }
          }
        }
      }
    }
    .list {
      overflow: hidden;
      padding: .15rem .3rem 0;
      .item {
        position: relative;
        margin-bottom: .2rem;
        padding: .2rem;
        height: 2rem;
        background:#FFE4C9;
        border-radius:.24rem;
        display: flex;
        justify-content: flex-start;
        .item-img {
          flex-shrink: 0;
          margin-right: .2rem;
          width: 1.6rem;
          height: 1.6rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .item-text {
          flex: 1;
          padding-top: .11rem;
          .item-name {
            margin-bottom: .17rem;
            font-weight:800;
            font-size: .28rem;
            color: #404040;
          }
          .item-progress {
            margin-bottom: .17rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .wrap {
              position: relative;
              width: 3.3rem;
              height: .26rem;
              background: #fff;
              border-radius: .08rem;
              overflow: hidden;
              .bg {
                position: absolute;
                height: .26rem;
                left: 0;
                top: 0;
                background: #FFA200;
              }
            }
            .text {
              font-size: .2rem;
              color: #404040;
            }
          }
          .item-title {
            margin-bottom: .02rem;
            font-size: .2rem;
            color: #404040;
          }
          .item-price {
            display: flex;
            justify-content: flex-start;
            align-items: flex-end;
            .current-price {
              margin-right: .12rem;
              display: flex;
              justify-content: flex-start;
              align-items: flex-end;
              font-size: .2rem;
              color: #E9301A;
              span {
                line-height: .9;
                font-size: .32rem;
                font-weight: bold;
              }
            }
            .mask-price {
              text-decoration: line-through;
              font-size: .2rem;
              color: #A1A1A1;
            }
          }
        }
        .btn {
          position: absolute;
          right: .2rem;
          top: 1.29rem;
          width: 1.4rem;
          height: .5rem;
          line-height: .5rem;
          font-size: .24rem;
          font-weight: bold;
          border-radius: .25rem;
          text-align: center;
          &.before {
            border:2px solid #E85700;
            color: #E85700;
          }
          &.current {
            color: #FFE4C9;
            background: #FF0078;
            img {
              width: .11rem;
              height: .19rem;
            }
          }
          &.end {
            border:2px solid #A28573;
            color: #A28573;
          }
        }
        .icon {
          position: absolute;
          top: 0;
          right: 0;
          height: .38rem;
          line-height: .38rem;
          font-size: .2rem;
          text-align: center;
          &.before {
            color: #FFE0E0;
            width: 1.4rem;
            background: url(./img/start-icon.png) no-repeat center center / 100% 100%;
          }
          &.current {
            color: #FFE4C9;
            width: 1.9rem;
            background: url(./img/cout-down-icon.png) no-repeat center center / 100% 100%;
          }
          &.end {
            color: #FFE4C9;
            width: 1.4rem;
            background: url(./img/end-icon.png) no-repeat center center / 100% 100%;
          }
        }
      }
    }
  }
}
</style>