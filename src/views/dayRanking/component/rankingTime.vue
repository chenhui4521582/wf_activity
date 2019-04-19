<template>
  <div class="ranking-time">
    <img class="bg" src="../images/time-bg.png" alt="" />
    <div class="time-body">
      <ul v-if="showTimeLine">
        <li
          v-for="(item, index) in timeLine"
          :key="item.id"
          :class="{'over': item.status == 0, 'now': item.status == 1, 'future': item.status == 2 , 'current': currentIndex == index}"
          @click="handleClick(item, index)">
          <div class="title" v-if="item.status==1">
            倒计时{{countTime}}
          </div>
          <div class="title" v-else>{{statusTitle(item)}}</div>
          <div class="time">
            {{item.beginTime}} - {{item.endTime}}
          </div>
          <div class="status">
            {{statusText(item)}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'rankingTime',
    data: () => ({
      timeLine: [],
      timer: null,
      countTime: '',
	  currentIndex: 1
    }),
    computed: {
	  showTimeLine () {
	    return this.timeLine.length
      }
    },
    methods: {
	  statusText (item) {
		return item.status == 0 ? '已过期' : item.status == 1 ? '正在进行' : item.status == 2 ? '即将开始' : '已过期'
	  },
	  statusTitle (item) {
		return item.status == 0 ? '时间结束' : item.status == 2 ? '敬请期待' : '时间结束'
	  },
      getTimeLine () {
        let url = '//ops-api.beeplay123.com/ops/api/hoursRanking/getTimeline'
        this.axios.post(url).then(res => {
          this.timeLine = res.data.data || []
          this.timeLine.map((item, index) => {
            if(item.status == 1 && item.countdown) {
              this.countDown(item)
            }
          })
        })
      },
      countDown (item) {
        if(!item.countdown) return false
		let date = item.countdown / 1000

        this.timer = setInterval(() => {
          if(date <= 0) {
            date = 0
            clearInterval(this.timer)
          }
		  date = date-1
		  let minute = Math.floor(parseInt(date / 60) % 60)
		  let second = Math.floor(date % 60)
		  let countMinute = minute > 10 ? minute : '0'+minute
		  let countSecond = second > 10 ? second : '0'+second
		  this.countTime = `${countMinute}:${countSecond}`
		}, 1000)
      },
	  handleClick (item, index) {
	    this.currentIndex = index
	    if(item.status == 1) {
		  this.$emit('switchTime', 'now')
        }else if (item.status == 2) {
		  this.$emit('switchTime', 'future')
        }else {
		  this.$emit('switchTime',item.id)
        }

      }
    },
    created () {
      this.getTimeLine()
    },
    destroyed() {
	  clearInterval(this.timer)
	}
  }
</script>

<style scoped lang="less">
.ranking-time {
  position: relative;
  min-height: 1.41rem;
  .bg {
    width: 100%;
    vertical-align: top;
  }
  .time-body {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    padding: .15rem .65rem;
    box-sizing: border-box;
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      li {
        width: 1.89rem ;
        margin-right: .12rem;
        text-align: center;
        &.over {
          height: 1rem;
          background: url("../images/end-time.png") no-repeat center top / 100% 100%;
          color: #342C29;
          &.title {
            color: #484443;
          }
        }
        &.now {
          height: 1rem;
          background: url("../images/now-time.png") no-repeat center top / 100% 100%;
          color: #73402D;
          .title {
            font-size: .22rem;
            color: #66291B;
          }
          .status {
            color: #fff;
          }
        }
        &.future {
          height: 1rem;
          background: url("../images/future-time.png") no-repeat center top / 100% 100%;
          color: #885E48;
          .title {
            color: #3C261E;
          }
        }
        &.current {
          height: 1.14rem;
          background: url("../images/current-time.png") no-repeat center top / 100% 100%;
        }
        &.last {
          margin-right: 0;
        }
        .title {
          text-align: center;
          height: .36rem;
          line-height: .36rem;
          font-size: .2rem;
        }
        .time {
          margin: .07rem auto;
          font-weight: bold;
        }
        .status {
          font-size: .18rem;
        }
      }
    }
  }
}
</style>
