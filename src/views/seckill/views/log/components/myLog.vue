<template>
  <div class="my-log">
    <div class="title">
      <div class="item">夺宝名称</div>
      <div class="item">夺宝时间</div>
      <div class="item">夺宝结果</div>
    </div>
    <div class="wrap">
      <scroll ref="scroll" :data="scrollData" :listenScroll="true" :probeType="3" @scroll="scrollMove">
        <ul>
          <li v-for="(item, index) in scrollData" :key="index" @click="goDetail(item)">
            <div class="item">{{item.title}}</div>
            <div class="item">
              {{item.lotteryTime | formatTime}}
            </div>
            <div class="item">
              <div class="pass" v-if="item.status!=0 && item.ifReturn">
                <p>流拍</p>
                <p>夺宝卡已退回</p>
              </div>
              <div class="yes" v-if="item.status!=0 && !item.ifReturn && item.ifWin">
                中奖
              </div>
              <div class="no" v-if="item.status!=0 && !item.ifReturn && !item.ifWin">
                <p>未中奖</p>
                <p>点击查看幸运码</p>
              </div>
              <div class="not-over" v-if="item.status==0">
                <p>未开奖</p>
                <p>等待开奖</p>
              </div>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>
<script>
import Scroll from '@/components/scroll/scroll'
import Services from '../../../services/services'
import _get from 'lodash.get'
export default {
  name: 'myLog',
  data: () => ({
    scrollData: [],
    currentPage: 1,
    scrollLock: true
  }),
  components: {
    Scroll
  },
  methods: {
    _getList() {
      Services.getMyLotteryLog({pageSize: 30, page: this.currentPage}).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          let list = _get(res, 'data.data.list', [])
          /** 列表数据 **/
          this.scrollData = this.scrollData.concat(list)
          if(list.length == 30) {
            /** 解除滚动限制 **/
            this.scrollLock = false
          }
        }
      }).catch(error => {
        /** 解除滚动限制 **/
        this.scrollLock = false
      })
    },
    /** 列表滚动到底部重新获取数据 **/
    scrollMove(pos) {
      let height = document.querySelector('.wrap ul').clientHeight
      let boxHeight = document.querySelector('.wrap').clientHeight
      let endPosition = height - boxHeight
      if (Math.abs(Math.round(pos.y)) > endPosition) {
        /** 添加滚动锁数据没有回来不允许加载数据**/
        if (this.scrollLock) {
          return false
        }
        this.scrollLock = true
        this.timer && clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          // 向列表添加数据
          this.currentPage++
          this._getList()
        }, 1000)
      }
      /** 是否显示返回顶部 **/
      if (Math.abs(Math.round(pos.y)) > 200) {
        this.isBackTop = true
      } else {
        this.isBackTop = false
      }
    },
    goDetail(item) {
      this.$router.push({
        name: 'details',
        query: {
          periodId: item.periodId,
          smallTreasureId: item.smallTreasureId
        }
      })
    }
  },
  mounted() {
    this._getList()
    GLOBALS.marchSetsPoint('A_H5PT0202002097')
  }
}
</script>
<style lang="less" scoped>
.my-log {
  position: absolute;
  left: 0;
  top: 1.86rem;
  right: 0;
  bottom: .96rem;
  padding: 0 .24rem;
  .title {
    height: .5rem;
    line-height: .5rem;
    background: #FFFAD4;
    display: flex;
    justify-content: flex-start;
    box-shadow:0px 3px 6px rgba(0,0,0,0.08);
    border-radius: .16rem .16rem 0px 0px;
    .item {
      text-align: center;
      font-size: .24rem;
      color: #000;
      &:nth-child(1) {
        width: 33.33%;
      }
      &:nth-child(2) {
        width: 33.33%;
      }
      &:nth-child(3) {
        flex: 1;
      }
    }
  }
  .wrap {
    overflow: hidden;
    padding-bottom: .2rem;
    position: absolute;
    left: .24rem;
    top: .5rem;
    right: .24rem;
    bottom: 0;
    background: #FFFAD4;
    border-radius: 0 0 .16rem  .16rem;
    ul {
      height: calc(100% - 1.86rem);
      padding-bottom: .2rem;
      background: #FFFAD4;
      border-radius: 0 0 .16rem  .16rem;
      overflow-y: scroll;
      li {
        height: .9rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        &:nth-child(odd) {
          background: #FFFFFF;
        }
        &:nth-child(even) {
          background: #FFFDEF;
        }
        .item {
          text-align: center;
          font-size: .24rem;
          color: #000;
          &:nth-child(1) {
            width: 33.33%;
          }
          &:nth-child(2) {
            width: 33.33%;
            line-height: .28rem;
          }
          &:nth-child(3) {
            flex: 1;
          }
          .pass {
            color: #BBBBBB;
          }
          .yes {
            color: #FF4141;
          }
          .no {
            p {
              &:last-child{
                color: #5186CA;
              }
            }
          }
          .not-over {
            p {
              &:last-child{
                color: #FF7800;
              }
            }
          }
          p {
            line-height: .3rem;
          }
        }
      }
    }
  }
}
</style>