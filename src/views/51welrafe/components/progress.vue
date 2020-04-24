<template>
  <div class="wrap">
    <div class="progress">
      <div class="progress-bg">
        <div class="arrows"></div>
      </div>
    </div>
    <div class="task">
      <div class="item" v-for="(item, index) in list.progressList" :key="index">
        <div class="unit" :class="{'received': item.status == 2}">
          <div class="award">{{item.awards}}</div>
          <div class="amount">{{unit(item.amount)}}</div>
        </div>
        <!-- 去完成 -->
        <div class="btn go-finished" v-if="item.status == 0" @click="openPopup">
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
</template>
<script>
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
  methods: {
    unit(value) {
      if(value > 10000 && this.status == 1) {
        return `${(value / 10000)}万`
      }
      return `${value}元`
    },
    openPopup () {
      this.$emit('openPopup', this.status)
    },
    taskFinish (item) {
      this.$emit('taskFinish', {
        type: this.status,
        sort: item.sort
      })
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  .progress {
    margin-bottom: .1rem;
    position: relative;
    height: .2rem;
    border-radius: .1rem;
    background:linear-gradient(90deg,rgba(40,55,209,1) 0%,rgba(127,85,247,1) 100%);
    .progress-bg {
      position: absolute;
      top: .06rem;
      left: .06rem;
      width: 50%;
      height: .08rem;
      background:linear-gradient(90deg,rgba(187,166,255,1) 0%,rgba(10,228,248,1) 100%);
      border-radius: .04rem;
      .arrows{
        position: absolute;
        right: -.5rem;;
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
          font-size: .28rem;
          color: #FF6622;
        }
        .amount {
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
</style>