<template>
  <div class="hit-percent">
    <div class="hb-task-box">
      <div class="percent-box">
        <div class="percent-number" :style="{width:wpercent}"></div>
      </div>
      <ul>
        <li v-for="(item,index) in envelopsItem" v-if="!item.dot">
          <h2>消耗金叶</h2>
          <h4 v-if="envelopsItem.length<6">{{item.amount | filterPrice}}</h4>
          <template v-else>
            <h4 v-if="index<envelopsItem.length-1">{{item.amount | filterPrice}}</h4>
            <h4 v-else>最终奖励</h4>
          </template>
          <div class="hb-line" :class="{gray:item.status == 0}"></div>
          <div class="envelopes"><i>{{item.awards| filterPrice}}个币</i></div>
          <div class="btn btn-complete" v-if="item.status == 2">完成</div>
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
  </div>
</template>
<script type="text/javascript">
  // import { gameProgress,gameReceive} from '../../../../../utils/api'
  import Services from '../../../../../../services/services'

  export default {
    data() {
      return {
        hbItems: null,
        hbTestData: [],
        gameBetting: 0
      }
    },
    props: {
      detailData: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      this.getGameProgress()
    },
    computed: {
      envelopsItem() {
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
          result.splice(4, 0, {dot: true})
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

      },//this.gameBetting
      wpercent() {
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
              if (idArr == -1) {//在省略号里
                console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
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

      },
    },
    methods: {
      async gotoact(item) { // 点击领取
        GLOBALS.marchSetsPoint('A_H5PT0229002671', {
          task_id: item.sort,
          task_name: '消耗金叶' + item.amount
        })   // H5平台-双旦活动页-获得抽奖机会页-玩游戏-领取奖励点击
        Services.gameReceive(item.sort).then((res) => {
          if (res.data.code == 200) {
            this.$toast.show({
              message: '领取成功',
              duration: 2000
            })
            this.getGameProgress()
            this.$emit('refresh', res.data.data)
          }
        })
      },
      // 获取红包任务列表
      getGameProgress() {
        Services.gameProgress().then((res) => {
          if (res.data.code == 200) {
            this.hbItems = res.data.data.progressList
            this.gameBetting = res.data.data.gameBetting
            this.$emit('gameinfo', {
              gameBetting: res.data.data.gameBetting,
              receiveNum: res.data.data.receiveNum
            })
            // 下面是测试数据
            // this.hbItems = this.hbTestData
          }
        })
      },
      getList(newArr, completeArr, maxItem) {
        if (newArr.length < 4) {
          var len = 4 - newArr.length
          return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
            return a.amount - b.amount
          })
        }
      },
      gotocomplete(item) {
        GLOBALS.marchSetsPoint('A_H5PT0229002670', {
          task_id: item.sort,
          task_name: '消耗金叶' + item.amount
        })   // H5平台-双旦活动页-获得抽奖机会页-玩游戏-去完成点击(跳到平台首页)
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
      background: rgba(153, 153, 153, 1);
      border: 3px solid rgba(15, 140, 62, 1);
      border-radius: 0.08rem;
      position: absolute;
      left: 0.3rem;
      top: .92rem;
      border-radius: 0.08rem;
      .percent-number {
        height: 0.15rem;
        position: absolute;
        left: 0;
        top: 0;
        background: url("./images/progress.png");
        border-radius: 0.08rem;
      }
    }
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      h2 {
        font-size: 0.2rem;
        font-weight: 800;
        color: #333333;
        padding-top: 0.2rem;
      }
      h4 {
        font-size: 0.24rem;
        font-weight: 800;
        margin: 0.1rem auto 0.05rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #FF001A;
      }
      &:last-child h4 {
        max-width: 1.2rem;
      }
      .hb-line {
        width: 2px;
        height: 0.48rem;
        position: relative;
        &:after {
          content: "";
          width: 0.4rem;
          height: 0.4rem;
          background: url(./images/icon1.png) no-repeat;
          background-size: 100% 100%;
          position: absolute;
          left: -0.18rem;
          top: 0;
          bottom: 0;
          margin: auto;
          z-index: 2;
        }
        &.gray:after {
          content: "";
          width: 0.33rem;
          height: 0.37rem;
          background: url(./images/icon0.png) no-repeat;
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
          background: #A15B42;
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
        color: #333333;
        text-align: center;
        white-space: nowrap;
        margin: .06rem 0 .09rem;
        font-weight: 800;
        i {
          color: #FF001A;
        }
      }
      .btn {
        display: block;
        width: 0.99rem;
        height: 0.46rem;
        line-height: 0.46rem;
        font-size: 0.24rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: .23rem;
        &.btn-receive {
          background: rgba(242, 55, 74, 1);
        }
        &.btn-default {
          background: rgba(15, 140, 62, 1);
        }
        &.btn-complete {
          background: rgba(153, 153, 153, 1);
        }
      }
    }
  }
</style>
