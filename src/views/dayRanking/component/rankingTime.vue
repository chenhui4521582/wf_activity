<template>
  <div class="ranking-time">
    <img class="bg" src="../images/time-bg.png" alt="" />
    <div class="time-body">
      <ul v-if="showTimeLine">
        <li v-for="item in timeLine" :key="item.id" :class="statusClass(item)">
          <div class="title" v-if="item.status==1">
            倒计时{{countDown(item)}}
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
      timeLine: []
    }),
    computed: {
	  showTimeLine () {
	    return this.timeLine.length
      },

    },
    methods: {
	  statusClass (item) {
		return item.status == 0 ? 'over' : item.status == 1 ? 'now' : item.status == 2 ? 'future' : 'over'
	  },
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
        })
      },
      countDown (item) {
        console.log(item)

      }
    },
    created () {
      this.getTimeLine()
    }
  }
</script>

<style scoped lang="less">
.ranking-time {
  position: relative;
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
          height: 1.14rem;
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
          margin: .08rem auto;
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
