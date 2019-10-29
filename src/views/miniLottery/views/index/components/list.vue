<template>
  <div class="list">
    <ul v-if="showList">
      <template v-for="(item, index) in allList">
        <li v-if="index == 0" :key="index" :class="{'hot':index == 0}" @click="goDetail(item)">
          <div class="img">
            <img :src="item.picture | filter" alt="">
          </div>
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="desc">三网直充 / 3~5个工作日到帐</div>
            <div class="edit">
              已抢{{item.participantsNumber || 0}}次，至少开奖 {{item.limitTotalAmount || 0}} 次
            </div>
            <div class="count-down" v-if="item.underway">
              夺宝剩余 <br>
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
            夺宝剩余 {{item.countDownTime}}
          </div>
          <div class="count-down no" v-if="!item.underway">
            {{item.countDownTime}} 后即将开始
          </div>
          <div class="img">
            <img :src="item.picture | filter" alt="">
          </div>
          <div class="title">{{item.title}}</div>
          <div class="edit">
            已抢{{item.participantsNumber || 0}}次，至少开奖 {{item.limitTotalAmount || 0}} 次
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
          this.$set(this.allList[index], 'countDownTime', '00时00分00秒')  
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
      this.$emit('refreshList')
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
  padding: .4rem;
  ul {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      background: #FEF3E8;
      border-radius: .16rem;
      margin-bottom: .21rem;
      &.hot {
        display: flex;
        justify-content: flex-start;
        padding: .33rem .3rem;
        width: 100%;
        flex: 1;
        .img {
          position: relative;
          height: 1.78rem;
          width: 2.22rem;
          border-right: 1px solid #e8e2e2;
          img {
            vertical-align: top;
            margin-top: .13rem;
            width: 2.03rem;
            height: 1.51rem;
          }
        }
        .text {
          position: relative;
          padding-left: .22rem; 
          .title {
            margin-bottom: .1rem;
            font-size: .32rem;
            font-weight: bold;
            color: #404040;
          }
          .desc {
            margin-bottom: .19rem;
            font-size: .22rem;
            color: #404040;
          }
          .edit {
            margin-bottom: .27rem;
            font-size: .22rem;
            color: #818181;
          }
          .count-down {
            width: 1.96rem;
            height: .3rem;
            line-height: .3rem;
            font-size: .22rem;
            color: #FF4141;
            white-space: nowrap;
            &.no {
              color: #FF7800;
            }
          }
          .btn {
            position: absolute;
            left: 2.18rem;
            top: 1.28rem;
            width: 1.4rem;
            height: .56rem;
            line-height: .56rem;
            background: #FF4141;
            text-align: center;
            line-height: .56rem;
            border-radius: .16rem;
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
          font-size: .22rem;
          color: #FF4141;
          text-align: center;
          white-space: nowrap;
          &.no {
            color: #FF7800;
          }
        }
        .img {
          margin: 0 auto .21rem;
          padding: .22rem 0 .19rem;
          width: 2.45rem;
          border-bottom: 1px solid #e8e2e2;
          text-align: center;
          img {
            vertical-align: top;
            width: 1.84rem;
            height: .92rem;
          }
        }
        .title {
          margin-bottom: .19rem;
          text-align: center;
          font-size: .32rem;
          color: #404040;
          font-weight: Bold;
        }
        .edit {
          margin-bottom: .2rem;
          text-align: center;
          font-size: .22rem;
          color: #818181;
        }
        .btn {
          margin: 0 auto;
          width: 1.4rem;
          height: .56rem;
          line-height: .56rem;
          background: #FF4141;
          text-align: center;
          line-height: .56rem;
          border-radius: .16rem;
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