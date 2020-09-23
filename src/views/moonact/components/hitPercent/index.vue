<template>
  <div class="hit-percent">
    <div class="hb-task-box">
      <div class="percent-box" :class="{e4:envelopsItem.length==4}">
        <div class="percent-number" :class="{zero:gameBetting<=envelopsItem[0].amount}"
          :style="{width:wpercent}">
        </div>
      </div>
      <ul>
        <li v-for="(item,index) in envelopsItem" v-if="!item.dot">
          <h2>{{item.amount | conversion}}<img src="../../images/flower.png" alt="" style="width: .31rem;height: .25rem;margin-left: .02rem"></h2>
          <h4>(累计获得)</h4>
          <div class="hb-line">
            <div class="item">{{item.awards}}个</div>
            <div class="item">话费碎片</div>
          </div>
          <div class="btn btn-complete"
            :style="{color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}"
            v-if="item.state == 2">完成
          </div>
          <div class="btn btn-receive" v-else-if="item.state == 1" @click="gotoact(item)">领取</div>
          <div class="btn btn-default" :class="{'btn-complete':actInfoData.state!=1}" v-else @click="gotocomplete(item)">去完成</div>
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
import { gameReceive } from '../../utils/api'

export default {
  data () {
    return {
      hbTestData: [],
      popType: 0,
      awardData: null,
      showLoading: false,
      percent1:[15,40,65,77,100],
      percent2:[15,43,72,100]
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
    actInfoData: {
      type: Object,
      default: null
    },
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
        return item.state != 2
      }).sort((a, b) => {
        return a.amount - b.amount
      })
      let tArr = data.filter((item) => {
        return item.state == 2
      }).sort((a, b) => {
        return a.amount - b.amount
      })
      let result = []
      if (nArr.length > 3) {
        result = nArr.splice(0, 3)
        // result.push(nArr.pop())
        // 个数大于4个的时候加个dot
        result.splice(3, 0, { dot: true })
        result.push(maxItem)
        return result
      } else if (nArr.length == 3) {
        result = nArr.splice(0, 3)
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
        if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].state != 0) {
          return '100%'
        } else {
          let idArr=this.envelopsItem.findIndex(item=>this.gameBetting==item.amount)
          if (this.envelopsItem.length == 5) {
            if (idArr == -1) { // 在省略号里
              if(this.gameBetting>this.envelopsItem[2].amount){
                return '77%'
              }else if(this.gameBetting>this.envelopsItem[1].amount){
                return parseFloat((this.gameBetting-this.envelopsItem[1].amount)*100*0.1/(this.envelopsItem[2].amount-this.envelopsItem[1].amount)+this.percent1[1]).toFixed(2)+'%'
              }else{
                return parseFloat((this.gameBetting-this.envelopsItem[0].amount)*100*0.1/(this.envelopsItem[1].amount-this.envelopsItem[0].amount)+this.percent1[0]).toFixed(2)+'%'
              }
            } else {
              return this.percent1[idArr]+'%'
            }
          } else {
            if (idArr == -1) {
              if(this.gameBetting>this.envelopsItem[2].amount){
                return parseFloat((this.gameBetting-this.envelopsItem[2].amount)*100*0.13/(this.envelopsItem[3].amount-this.envelopsItem[2].amount)+this.percent2[2]).toFixed(2)+'%'
              }else if(this.gameBetting>this.envelopsItem[1].amount){
                return parseFloat((this.gameBetting-this.envelopsItem[1].amount)*100*0.13/(this.envelopsItem[2].amount-this.envelopsItem[1].amount)+this.percent2[1]).toFixed(2)+'%'
              }else if(this.gameBetting>this.envelopsItem[0].amount){
                return parseFloat((this.gameBetting-this.envelopsItem[0].amount)*100*0.13/(this.envelopsItem[1].amount-this.envelopsItem[0].amount)+this.percent2[0]).toFixed(2)+'%'
              }else{
                return this.percent2[0]+'%'
              }
            } else {
              return this.percent2[idArr]+'%'
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
      if (newArr.length < 3) {
        var len = 3 - newArr.length
        return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
          return a.amount - b.amount
        })
      }
    },
    gotocomplete (item) {
      if(this.actInfoData.state==1){
        this.$emit('openDropDown')
      }
    },
    async gotoact (item) { // 领取
      GLOBALS.marchSetsPoint('A_H5PT0333004194', {
        task_id: item.sort,
        task_name: '累计获得荷花：' + item.amount,
        awards_id:item.id,
        awards_name:`${item.awards}个话费碎片`
      })//H5平台-中秋祈愿池-各时段话费碎片领取点击
      this.showLoading = true
      gameReceive(1,item.id).then((res) => {
        if (res.code == 200) {
          this.showPop(8,{
            awardsName: `${item.awards}个话费碎片`
          })
          this.$emit('refresh')
          GLOBALS.marchSetsPoint('A_H5PT0333004196', {
            task_id: item.sort,
            task_name: '累计获得荷花：' + item.amount,
            awards_id:item.id,
            awards_name:`${item.awards}个话费碎片`
          })//H5平台-中秋祈愿池-累计荷灯-恭喜获得弹窗加载完成
        } else {
          this.$toast.show({
            message: res.message,
            duration: 1000,
            isOneLine: true
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
    loading: () => import('../../../../components/common/loading'),
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
    width: 5.8rem;
    height: 0.15rem;
    background: #BDAD97;
    position: absolute;
    left: 0.37rem;
    top: 1.1rem;
    border-radius: 0.08rem;
    &.e4{
      width: 5.65rem;
      left: 0.45rem;
    }
    .percent-number {
      height: 0.15rem;
      position: absolute;
      left: 0;
      top: 0;
      background: #722CE6;
      border-radius: 0.08rem;
      max-width: 100%;
      &:not(.zero):after {
        content: '';
        width: 0.41rem;
        height: 0.41rem;
        background: url(./images/percent-dot.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: -.09rem;
        top: -.12rem;
      }
    }
  }
  li {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 0.3rem;
      font-weight: bold;
      color: #EB3618;
      height: 0.3rem;
      display: flex;
      align-items: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    h4 {
      font-size: 0.18rem;
      font-weight: 400;
      color: #CA6C1E;
      margin: 0 auto;
      height: .3rem;
      line-height: .3rem;
    }
    &:last-child h4 {
      max-width: 1.2rem;
    }
    .hb-line {
      width: 0.93rem;
      height: 1.18rem;
      background: url("./images/bonus.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: .45rem;
      box-sizing: border-box;
      .item{
        text-align: center;
        &:nth-child(1){
          font-size: .24rem;
          font-weight: bold;
          color: #FEEBC2;
        }
        &:nth-child(2){
          margin-top: .06rem;
          font-size: .18rem;
          font-weight: 400;
          color: #FEEBC2;
        }
      }
    }
    &.hb-dot-box {
      flex: 0 0 0.6rem;
    }
    .hb-dot {
      display: block;
      height: 0.06rem;
      font-size: 0;
      i {
        display: inline-block;
        width: 0.11rem;
        height: 0.11rem;
        background: #BEAC96;
        border-radius: 50%;
        &:nth-child(2) {
          margin: 0 0.04rem;
        }
      }
      &.hb-dot1 {
        margin: 0.8rem auto .56rem;
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
      width: 0.99rem;
      height: 0.46rem;
      font-size: 0.24rem;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 1);
      border-radius: 0.23rem;
      margin-top: .2rem;
      &.btn-receive {
        background: #722CE6;
      }
      &.btn-default {
        background: #FE7436;
      }
      &.btn-complete {
        background: #9A9A9A;
      }
    }
  }
}
</style>
