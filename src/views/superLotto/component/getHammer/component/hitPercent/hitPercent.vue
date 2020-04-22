<template>
  <div class="hit-percent">
    <div class="hb-task-box">
      <div class="percent-box"
        :style="{background:$moduleConfig.superLotto.dropDown.inner.bg.background}">
        <div class="percent-number"
          :style="{width:wpercent,background:$moduleConfig.superLotto.dropDown.inner.percentBg}">
        </div>
      </div>
      <ul>
        <li v-for="(item,index) in envelopsItem" v-if="!item.dot">
          <h2>支持金叶</h2>
          <h4 v-if="envelopsItem.length<6">{{item.amount | conversion}}</h4>
          <template v-else>
            <h4 v-if="index<envelopsItem.length-1">{{item.amount | conversion}}</h4>
            <h4 v-else>终极档位</h4>
          </template>
          <div class="hb-line">
            <img :src="require(`./images/icon${item.propType}.png`)" alt="">
          </div>
          <div class="envelopes">{{item.awards}}个</div>
          <div class="btn btn-complete"
            :style="{color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}"
            v-if="item.status == 2">完成
          </div>
          <div class="btn btn-receive" v-else-if="item.status == 1" @click="gotoact(item)">领取</div>
          <div class="btn btn-default" v-else @click="gotocomplete(item)">去完成</div>
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
    <loading v-show="showLoading"></loading>
  </div>
</template>
<script type="text/javascript">
import { gameReceive } from '../../../../services/api'

export default {
  data () {
    return {
      hbTestData: [],
      popType: 0,
      awardData: null,
      showLoading: false
    }
  },
  props: {
    hbItems: {
      type: Array,
      default: []
    },
    gameBetting: {
      type: Number,
      default: 0
    },
    countTime: {
      type: Number,
      default: 0
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value
      }
    }
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
    }, // this.gameBetting
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
              return parseFloat(5 * 100 / 6).toFixed(2) + '%'
            } else {
              if (idArr == 0) {
                return parseFloat((idArr + this.gameBetting / (minUnfinished.amount)) * 100 / 12) + '%'
              } else {
                return parseFloat((1 / 12 + (idArr - 1) / 6 + this.gameBetting / (minUnfinished.amount) / 6) * 100) + '%'
              }
            }
          } else {
            if (idArr == 0) {
              return parseFloat((idArr + this.gameBetting / (minUnfinished.amount)) * 100 / 12) + '%'
            } else {
              return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + this.gameBetting / (minUnfinished.amount) * 5 / 24) * 100) + '%'
            }
          }
        }
      } else {
        return 0
      }
    }
  },
  methods: {
    getList (newArr, completeArr, maxItem) {
      if (newArr.length < 4) {
        var len = 4 - newArr.length
        return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
          return a.amount - b.amount
        })
      }
    },
    gotocomplete (item) {
      GLOBALS.marchSetsPoint('A_H5PT0248002912', {
        task_id: item.sort,
        task_name: '消耗金叶' + item.amount
      })   // 玩游戏去完成点击
      this.showPop(7)
    },
    async gotoact (item) { // 领取
      // GLOBALS.marchSetsPoint('A_H5PT0248002913', {
      //   task_id: item.sort,
      //   task_name: '消耗金叶' + item.amount
      // })// 玩游戏奖励领取点击
      this.showLoading = true
      gameReceive(item.sort).then((res) => {
        if (res.code == 200) {
          this.showPop(8, res.data)
          this.$emit('refresh', res.data)
        } else {
          this.$toast.show({
            message: res.message,
            duration: 1000
          })
        }
        this.showLoading = false
      }).catch(e => {
        this.showLoading = false
      })
    },
    showPop (type, awardData) {
      this.$emit('showPop', type, awardData)
    }
  },
  components: {
    loading: () => import('../../../../../../components/common/loading')
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
    background: rgba(255, 171, 129, 1);
    border-radius: 0.08rem;
    position: absolute;
    left: 0.3rem;
    top: 1rem;
    border-radius: 0.08rem;
    .percent-number {
      height: 0.15rem;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(220, 50, 42, 1);
      border-radius: 0.08rem;
      max-width: 100%;
      &:after {
        content: '';
        width: 0.23rem;
        height: 0.23rem;
        background: url(./images/percent-dot.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: -0.1rem;
        top: -0.04rem;
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
      padding-top: 0.28rem;
      color: #ff4330;
      height: 0.3rem;
    }
    h4 {
      font-size: 0.22rem;
      font-weight: 800;
      color: #ff4330;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 0.3rem;
    }
    &:last-child h4 {
      max-width: 1.2rem;
    }
    .hb-line {
      width: 2px;
      height: 0.4rem;
      position: relative;
      img {
        width: 0.46rem;
        height: 0.46rem;
        position: absolute;
        top: -0.02rem;
        left: -0.2rem;
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
      height: 0.25rem;
      font-weight: 500;
      color: #e74615;
      text-align: center;
      white-space: nowrap;
      margin-bottom: 0.08rem;
      font-size: 0.24rem;
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
      color: rgba(255, 255, 255, 1);
      border-radius: 0.2rem;
      &.btn-receive {
        background: #ff4330;
      }
      &.btn-default {
        background: #f89f2c;
      }
      &.btn-complete {
        color: rgba(192, 112, 2, 1);
      }
    }
  }
}
</style>
