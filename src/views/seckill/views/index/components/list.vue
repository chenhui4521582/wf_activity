<template>
  <div class="list">
    <ul v-if="showList">
      <template v-for="(item, index) in allList">
        <li v-if="index == 0" :key="index" :class="{'hot':index == 0}" @click="goDetail(item)">
          <div class="img">
            <img :src="item.picture | filter" alt="">
            <div class="icon">
              <img src="../img/hot-icon.png" alt="">
            </div>
          </div>
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="desc">
              {{item.description}}
            </div>
            <div class="edit">
              已抢<span>{{item.participantsNumber || 0}}</span>次
            </div>
            <div class="progress">
              <div class="wrap">
                <div class="bg" :style="{width: countProgress(item)}"></div>
              </div>
              <div class="num">
                {{item.participantsNumber}}/{{item.limitTotalAmount}}
              </div>
            </div>
            <div class="count-down" v-if="item.underway">
              开奖剩余时间 <br>
              {{item.countDownTime}}
            </div>
            <div class="count-down no" v-if="!item.underway">
              {{item.countDownTime}}
              <br>
               后即将开始
            </div>
            <div class="btn" :class="{'no': !item.underway}">立即夺宝</div>
          </div>
        </li>
        <li v-else :key="index" class="item" @click="goDetail(item)">
          <div class="count-down" v-if="item.underway">
            开奖剩余时间 {{item.countDownTime}}
          </div>
          <div class="count-down no" v-if="!item.underway">
            {{item.countDownTime}} 后即将开始
          </div>
          <div class="img">
            <img :src="item.picture | filter" alt="">
          </div>
          <div class="title">{{item.title}}</div>
          <div class="edit">
            已抢<span>{{item.participantsNumber || 0}}</span>次
          </div>
          <div class="progress">
            <div class="wrap">
              <div class="bg" :style="{width: countProgress(item)}"></div>
            </div>
            <div class="num">
              {{item.participantsNumber}}/{{item.limitTotalAmount}}
            </div>
          </div>
          <div class="btn" :class="{'no': !item.underway}">立即夺宝</div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
import { clearInterval } from 'timers'
export default {
  name: 'list',
  props: {
    list: {
      type: Array,
      default: () =>({})
    }
  },
  data: ()=> ({
    allList: [],
    timers: []
  }),
  computed: {
    showList() {
      return this.list.length
    }
  },
  methods: {
    allCountDown() {
      this.allList.map((item, index) => {
        this.$set(this.allList[index], 'countDownTime', '00时00分00秒')  
        if (item.endCountDown <= 0) return false
        let date = item.endCountDown / 1000
        this.timers[index] = window.setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            window.clearInterval(this.timers[index])
            this.clearTimeoutFn()
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.allList[index].countDownTime = `${day}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.allList[index].countDownTime = `${countHour}时${countMinute}分${countSecond}秒`
          }
        }, 1000)
      })
    },
    goDetail(item) {
      this.$router.push({
        name: 'details',
        query: {
          periodId: item.periodId,
          smallTreasureId: item.smallTreasureId
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0202002082', {
        task_id: item.smallTreasureId,
        task_name: item.title
      })
    },
    clearTimeoutFn() {
      this.timers && this.timers.map((item, index) => {
        window.clearInterval(this.timers[index])
        this.timers[index] = null
      })
      setTimeout(()=> {
        this.$emit('refreshList')
      }, 1000)
    },
    countProgress(item) {
      if(item.participantsNumber / item.limitTotalAmount >= 1) {
        return '100%'
      }
      return parseInt(item.participantsNumber / item.limitTotalAmount)
    }
  },
  beforeDestroy() {
    this.clearTimeoutFn()
  },
  watch: {
    list(value) {
      if(value) {
        this.allList = JSON.stringify(value)
        this.allList = JSON.parse(this.allList)
        this.allCountDown()
      }
    }
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.list {
  min-height: 4rem;
  padding: .3rem .4rem .6rem;
  ul {
    overflow: hidden;
    li {
      float: left;
      background: #FEF3E8;
      border-radius: .16rem;
      margin-bottom: .21rem;
      &.hot {
        
        display: flex;
        justify-content: flex-start;
        padding: .33rem .1rem .26rem;
        width: 100%;
        flex: 1;

        .img {
          position: relative;
          flex-shrink: 0;
          margin-top: .09rem;
          width: 2.4rem;
          height: 1.8rem;
          border-right: 1px solid #e8e2e2;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
          .icon {
            position: absolute;
            width: .7rem;
            height: .3rem;
            top: -.25rem;
            left: .1rem;
            img {
              vertical-align: top;
              width: 100%;
              height: 100%;
            }
          }
        }
        .text {
          overflow: hidden;
          position: relative;
          padding-left: .22rem; 
          .title {
            margin-bottom: .1rem;
            font-size: .32rem;
            font-weight: bold;
            color: #404040;
          }
          .desc {
            margin-bottom: .1rem;
            font-size: .22rem;
            color: #404040;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .edit {
            margin-bottom: .1rem;
            font-size: .22rem;
            text-align: left;
            color: #818181;
            span {
              color: #FF4141;
            }
          }
          .progress {
            margin-bottom: .15rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .wrap {
              position: relative;
              overflow: hidden;
              margin-right: .17rem;
              width: 1.5rem;
              height: .16rem;
              background: #FFFFFF;
              border-radius: .08rem;
              .bg {
                position: absolute;
                width: 0;
                height: 100%;
                background: #FF5400
              }
            }
            .num {
              font-size: .2rem;
              color: #818181
            }
          }
          .count-down {
            width: 1.96rem;
            line-height: .26rem;
            font-size: .22rem;
            color: #FF4141;
            white-space: nowrap;
            &.no {
              color: #FF7800;
            }
          }
          .btn {
            position: absolute;
            left: 2.2rem;
            bottom: 0;
            width: 1.4rem;
            height: .56rem;
            line-height: .56rem;
            background: #FF4141;
            text-align: center;
            line-height: .56rem;
            border-radius: .1rem;
            font-size: .24rem;
            color: #fff;
            &.no {
              background: #C0C0C0;
            }
          }
        }
      }
      &.item {
        margin-right: .19rem;
        padding: .16rem .24rem;
        width: 3.1rem;
        &:nth-of-type(odd) {
          margin-right: 0;
        }
        .count-down {
          margin-bottom: .1rem;
          font-size: .22rem;
          color: #FF4141;
          text-align: center;
          white-space: nowrap;
          &.no {
            color: #FF7800;
          }
        }
        .img {
          margin: 0 auto .2rem;
          padding-bottom: .06rem;
          width: 2.4rem;
          height: 1.8rem;
          border-bottom: 1px solid #e8e2e2;
          text-align: center;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        .title {
          margin-bottom: .14rem;
          font-size: .32rem;
          color: #404040;
          font-weight: Bold;
        }
        .edit {
          margin-bottom: .08rem;
          text-align: left;
          font-size: .22rem;
          color: #818181;
          span {
            color: #FF4141;
          }
        }
        .progress {
          margin-bottom: .15rem;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .wrap {
            position: relative;
            overflow: hidden;
            margin-right: .17rem;
            width: 1.5rem;
            height: .16rem;
            background: #FFFFFF;
            border-radius: .08rem;
            .bg {
              position: absolute;
              width: 0;
              height: 100%;
              background: #FF5400
            }
          }
          .num {
            font-size: .2rem;
            color: #818181
          }
        }
        .btn {
          margin: 0 auto;
          width: 1.4rem;
          height: .56rem;
          line-height: .56rem;
          background: #FF4141;
          text-align: center;
          line-height: .56rem;
          border-radius: .1rem;
          font-size: .24rem;
          color: #fff;
          &.no {
            background: #C0C0C0;
          }
        }
      }
    }
  }
}
</style>