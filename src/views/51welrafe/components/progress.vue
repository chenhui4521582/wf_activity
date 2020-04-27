<template>
  <div class="gress-wrap">
    <BetterScroll 
      :scrollX="true" 
      :scrollY="false"
      :data="list"
      ref="scroll"
    > <div class="wrap">
        <div class="progress">
          <div class="progress-bg" :style="{width: `${countProgress}%`}">
            <div class="arrows" v-if="countProgress"></div>
          </div>
        </div>
        <div class="task">
          <div class="item" v-for="(item, index) in list.progressList" :key="index" ref="items">
            <div class="unit" :class="{'received': item.status == 2}">
              <div class="award">{{item.awards}}</div>
              <div class="amount">{{unit(item.amount)}}</div>
            </div>
            <!-- 去完成 -->
            <div class="btn go-finished" v-if="item.status == 0" @click="openPopup(item)">
              <img src="../img/go-finished-icon.png" alt="">
            </div>
            <!-- 领取 -->
            <div class="btn finish" v-if="item.status == 1" @click="taskFinish(item)">
              <img src="../img/get-icon.png" alt="">
            </div>
            <!-- 已经领取 -->
            <div class="btn unfinish" v-if="item.status == 2">
              <img src="../img/received-icon.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </BetterScroll>
  </div>
</template>
<script>
import BetterScroll from './scroll/scroll'
export default {
  name: 'task',
  props: {
    list: {
      type: Object,
      default: () => ({})
    },
    status: {
      type: Number,
      default: ''
    }
  },
  components: {
    BetterScroll
  },
  computed: {
    countProgress () {
      const progressList = this.list.progressList || []
      const finishedArray = progressList.filter(item => {
        return item.status == 2
      })
      return (finishedArray.length / progressList.length) * 100
    }
  },
  methods: {
    unit(value) {
      if(value > 10000 && this.status == 1) {
        return `${(value / 10000)}万`
      }
      return `${value}元`
    },
    openPopup (item) {
      this.$emit('openPopup', this.status)
      if(this.status == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0278003319',{
          task_id: item.sort
        })
      }
      if(this.status == 2) {
        GLOBALS.marchSetsPoint('A_H5PT0278003321',{
          task_id: item.sort
        })
      }
    },
    taskFinish (item) {
      this.$emit('taskFinish', {
        type: this.status,
        sort: item.sort
      })
      if(this.status == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0278003320',{
          task_id: item.sort
        })
      }
      if(this.status == 2) {
        GLOBALS.marchSetsPoint('A_H5PT0278003322',{
          task_id: item.sort
        })
      }
    }
  },
  mounted () {


  },
  watch: {
    list(value) {
      setTimeout(() => {
        const listArr = value.progressList
        for(let i = 0; i < listArr.length; i++) {
          const next = i+1
          if(listArr[i].status == 2 && listArr[next].status != 2) {
            const listElement = this.$refs.items
            this.$refs.scroll.scrollToElement(listElement[next])
            break
          }
        }
      },1000)
    }
  }
}
</script>
<style lang="less" scoped>
.gress-wrap{
  padding: 0 .17rem;
  position: relative;
  width: 100%;
  height: 2.3rem;
  .wrap {
    display: inline-block;
    .progress {
      margin: 0 .3rem .1rem;
      padding: .06rem .06rem 0;
      height: .2rem;
      border-radius: .1rem;
      background:linear-gradient(90deg,rgba(40,55,209,1) 0%,rgba(127,85,247,1) 100%);
      .progress-bg {
        position: relative;
        height: .08rem;
        background:linear-gradient(90deg,rgba(187,166,255,1) 0%,rgba(10,228,248,1) 100%);
        border-radius: .04rem;
        .arrows{
          position: absolute;
          right: -.4rem;;
          top: -.38rem;
          width: 1.22rem;
          height: .83rem;
          background: url(../img/arrow.png) no-repeat center;
          background-size: 100% 100%;
        }
      }
    }
    .task {
      display: flex;
      justify-content: flex-start;
      .item {
        .unit {
          padding-top: .32rem;
          margin: 0 auto;
          width: 1.22rem;
          height: 1.26rem;
          background: url(../img/unfinished-icon.png) no-repeat center center;
          background-size: 100% 100%;
          text-align: center;
          .award {
            height: .4rem;
            line-height: .36rem;
            font-size: .28rem;
            color: #5C5886;
          }
          .amount {
            height: .3rem;
            line-height: .28rem;
            font-size: .2rem;
            color: #fff;
          }
          &.received {
            background: url(../img/finished-icon.png) no-repeat center center;
            background-size: 100% 100%;
            .award {
              color: #FF6622;
            }
          }
        }
        .btn {
          margin-top: -.1rem;
          width: 1.49rem;
          height: .84rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>