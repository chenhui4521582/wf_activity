<template>
  <div class="hit-percent">
    <div class="hb-task-box">
      <div class="percent-box">
        <div class="percent-number" :style="{width:wpercent}"></div>
      </div>
      <ul>
        <li v-for="(item,index) in envelopsItem" v-if="!item.dot">
          <h2>支持金叶</h2>
          <h4 v-if="envelopsItem.length<6">{{item.amount | filterPrice}}</h4>
          <template v-else>
            <h4 v-if="index<envelopsItem.length-1">{{item.amount | filterPrice}}</h4>
            <h4 v-else>终极档位</h4>
          </template>
          <div class="hb-line"></div>
          <div class="envelopes">{{item.awards}}张</div>
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
import { gameProgress,gameReceive} from '../../../../../utils/api'
export default {
  data () {
    return {
      hbItems: null,
      hbTestData: [],
      detailData:null
    }
  },
  mounted () {
    this.getGameProgress()
  },
  computed: {
    envelopsItem() {
      if (!this.hbItems) {
        return []
      }

      // 获取最大值
      let maxItem = this.hbItems&&this.hbItems.length&&this.hbItems.sort((a, b) => {
        return a.amount - b.amount
      })[this.hbItems.length - 1]

      // 删除数组最后一位
      const data=this.hbItems.slice()
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

    },//this.detailData.totalBetting
    wpercent() {
      if (!this.hbItems||this.hbItems.length==0) {
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
                return parseFloat((idArr + this.detailData.totalBetting / (minUnfinished.amount)) * 100 / 12) + '%'
              } else {
                return parseFloat((1 / 12 + (idArr - 1) / 6 + this.detailData.totalBetting / (minUnfinished.amount) / 6) * 100) + '%'
              }
            }
          } else {
            if (idArr == 0) {
              return parseFloat((idArr + this.detailData.totalBetting / (minUnfinished.amount)) * 100 / 12) + '%'
            } else {
              return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + this.detailData.totalBetting / (minUnfinished.amount) * 5 / 24) * 100) + '%'
            }
          }
        }
      } else {
        return 0
      }

    },
  },
  methods: {
    async gotoact (item) { // 领取
      GLOBALS.marchSetsPoint('A_H5PT0209002207',{
        task_name:`支持金叶：${item.amount}`,
        task_id:item.sort
      })//H5平台-双十一超值福袋活动-玩游戏领福袋-奖励领取按钮点击

      gameReceive({value:item.sort}).then((res) => {
        if (res.code == 200) {
          this.$toast.show({
            message:'领取成功',
            duration:2000
          })
          this.getGameProgress()
          this.$emit('refresh')
        }
      })
    },
    // 获取红包任务列表
    getGameProgress () {
      gameProgress().then((res) => {
        if (res.code == 200) {
          this.detailData=res.data
          this.hbItems = res.data.progressList
          this.$emit('detailData',this.detailData)
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
    gotocomplete (item) {
      GLOBALS.marchSetsPoint('A_H5PT0209002208',{
        task_name:`支持金叶：${item.amount}`,
        task_id:item.sort
      })//H5平台-双十一超值福袋活动-玩游戏领福袋-奖励去完成按钮点击
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
    background:rgba(93,96,254,1);
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
      background:rgba(229,11,93,1);
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
      font-weight: 500;
      color:rgba(56,8,177,1);
      padding-top: 0.28rem;
    }
    h4 {
      font-size: 0.22rem;
      font-weight: 800;
      margin: 0.1rem auto 0.05rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color:rgba(56,8,177,1);
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
        width: 0.56rem;
        height: 0.35rem;
        background: url(../../../../../images/bottom/icon.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: -0.18rem;
        top: 0;
        bottom: 0;
        margin: auto;
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
        background:rgba(56,8,177,1);
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
      font-weight:500;
      color:rgba(93,96,254,1);
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
        background: url(../../../../../images/bottom/btn.png) no-repeat;
        background-size: 100% 100%;
        color:rgba(255,255,255,1);
      }
      &.btn-default {
        background: url(../../../../../images/bottom/btn_gray.png) no-repeat;
        background-size: 100% 100%;
        color:rgba(255,255,255,1);
      }
      &.btn-complete {
        font-size: 0.24rem;
        color:rgba(229,11,93,1);
      }
    }
  }
}
</style>
