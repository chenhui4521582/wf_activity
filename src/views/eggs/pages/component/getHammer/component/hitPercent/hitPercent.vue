<template>
  <div class="hit-percent">
    <div class="hb-task-box">
      <div class="percent-box">
        <div class="percent-number" :style="{width:wpercent}"></div>
      </div>
      <ul>
        <li v-for="item in envelopsItem" v-if="!item.dot">
          <h2>支持金叶</h2>
          <h4>{{item.amount | filterPrice}}</h4>
          <div class="hb-line"></div>
          <div class="envelopes">{{item.awards}}个</div>
          <div class="btn btn-complete" v-if="item.status == 1">完成</div>
          <div class="btn btn-default" v-else @click="gotocomplete">去完成</div>
        </li>
        <li class="hb-dot-box" v-else>
          <span class="hb-dot hb-dot1">
            <i></i><i></i><i></i>
          </span>
          <span class="hb-dot">
            <i></i><i></i><i></i>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
import { gameProgress } from '../../../../../utils/api'
export default {
  data () {
    return {
      hbItems: null,
      hbTestData: []
    }
  },
  props: {
    detailData: {
      type: Object,
      default: {}
    }
  },
  mounted () {
    this.getGameProgress()
  },
  computed: {
    envelopsItem () {
      if (!this.hbItems) {
        return []
      }

      // 获取最大值
      let maxItem = this.hbItems && this.hbItems.length && this.hbItems.sort((a, b) => {
        return a.amount - b.amount
      })[this.hbItems.length - 1]

      // 删除数组最后一位
      const data = this.hbItems.slice()
      data.pop()

      let nArr = data.filter((item) => {
        return item.status != 2
      }).sort((a, b) => {
        return a.amount - b.amount
      })
      let tArr = data.filter((item) => {
        return item.status == 2
      }).sort((a, b) => {
        return a.amount - b.amount
      })
      let result = []
      if (nArr.length > 4) {
        result = nArr.splice(0, 4)
        // result.push(nArr.pop())
        // 个数大于5个的时候加个dot
        result.splice(4, 0, { dot: true })
        result.push(maxItem)
        return result
      } else if (nArr.length == 4) {
        result = nArr.splice(0, 4)
        result.push(maxItem)
        return result
      } else {
        result = [...this.getList(nArr, tArr), maxItem]
        return result
      }
    },
    wpercent () {
      if (!this.hbItems || this.hbItems.length == 0) {
        return
      }
      if (this.hbItems && this.envelopsItem) {
        if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].status != 0) {
          return '100%'
        } else {
          let minUnfinished = this.hbItems.filter((item) => {
            return item.status == 0
          }).sort((a, b) => {
            return a.amount - b.amount
          })[0]
          let idArr = [...this.envelopsItem.map(c => c.sort)].indexOf(minUnfinished.sort)
          if (this.envelopsItem.length == 6) {
            if (idArr == -1) { // 在省略号里
              console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
              return parseFloat(5 * 100 / 6).toFixed(2) + '%'
            } else {
              if (idArr == 0) {
                return parseFloat((idArr + this.detailData.gameBetting / (minUnfinished.amount)) * 100 / 12) + '%'
              } else {
                return parseFloat((1 / 12 + (idArr - 1) / 6 + this.detailData.gameBetting / (minUnfinished.amount) / 6) * 100) + '%'
              }
            }
          } else {
            if (idArr == 0) {
              return parseFloat((idArr + this.detailData.gameBetting / (minUnfinished.amount)) * 100 / 12) + '%'
            } else {
              return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + this.detailData.gameBetting / (minUnfinished.amount) * 5 / 24) * 100) + '%'
            }
          }
        }
      } else {
        return 0
      }
    }

  },
  methods: {
    // 获取红包任务列表
    getGameProgress () {
      gameProgress().then((res) => {
        if (res.code == 200) {
          this.hbItems = res.data
          // 下面是测试数据
          // this.hbItems = this.hbTestData
        }
      })
    },
    getList (newArr, completeArr, maxItem) {
      if (newArr.length < 4) {
        var len = 4 - newArr.length
        return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
          return a.amount - b.amount
        })
      }
    },
    gotocomplete () {
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    }
  }
}
</script>
<style lang="less" scoped>
.hb-task-box {
  padding: 0 0.07rem;
  position: relative;
  ul {
    display: flex;
  }
  .percent-box {
    width: 5.86rem;
    height: 0.15rem;
    background: #acdef6;
    border-radius: 0.05rem;
    position: absolute;
    left: 0.3rem;
    top: 1.01rem;
    border-radius: 0.08rem;
    .percent-number {
      height: 0.15rem;
      position: absolute;
      left: 0;
      top: 0;
      background: #dc8d00;
      border-radius: 0.08rem;
      &:after {
        content: "";
        width: 0.33rem;
        height: 0.37rem;
        /*background: url(./images/icon-hit.png) no-repeat;*/
        background-size: 100% 100%;
        position: absolute;
        right: -0.01rem;
        top: -0.2rem;
      }
    }
  }
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 0.2rem;
      font-weight: 500;
      color: rgba(239, 97, 62, 1);
      padding-top: 0.28rem;
      color: #47810e;
    }
    h4 {
      font-size: 0.22rem;
      font-weight: 800;
      color: rgba(245, 49, 0, 1);
      margin: 0.1rem auto 0.05rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #47810e;
    }
    &:last-child h4 {
      max-width: 1.2rem;
    }
    .hb-line {
      width: 2px;
      height: 0.48rem;
      position: relative;
      /*background: rgba(242, 171, 67, 1);
                border-radius: 1px;*/
      &:after {
        content: "";
        width: 0.33rem;
        height: 0.37rem;
        background: url(./images/icon-hit.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: -0.18rem;
        top: 0;
        z-index: 2;
      }
    }
    &.hb-dot-box {
      flex: 0 0 0.6rem;
    }
    .hb-dot {
      display: block;
      width: 0.27rem;
      height: 0.06rem;
      font-size: 0;
      i {
        display: inline-block;
        width: 0.06rem;
        height: 0.06rem;
        background: rgba(220, 141, 0, 1);
        border-radius: 50%;
        &:nth-child(2) {
          margin: 0 0.04rem;
        }
      }
      &.hb-dot1 {
        margin: 0.54rem auto 1.15rem;
      }
    }
    .envelopes {
      width: 0.59rem;
      height: 0.25rem;
      color: #81942d;
      text-align: center;
      white-space: nowrap;
    }
    .btn {
      display: block;
      width: 0.89rem;
      height: 0.46rem;
      font-size: 0.24rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      &.btn-receive {
        background: url(./images/btn-receive.png) no-repeat;
        background-size: 100% 100%;
        color: rgba(255, 236, 203, 1);
      }
      &.btn-default {
        background: url(./images/btn-default.png) no-repeat;
        background-size: 100% 100%;
        color: #ffeccb;
      }
      &.btn-complete {
        font-size: 0.24rem;
        color: #ea8c12;
      }
    }
  }
}
</style>