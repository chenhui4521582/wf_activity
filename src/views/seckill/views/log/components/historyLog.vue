<template>
  <div class="history-log">
    <div class="title">
      <div class="item">夺宝名称</div>
      <div class="item">幸运儿信息</div>
      <div class="item">夺宝结果</div>
    </div>
    <div class="wrap">
      <scroll ref="scroll" :data="scrollData" :listenScroll="true" :probeType="3" @scroll="scrollMove">
        <ul>
          <li v-for="(item, index) in scrollData" :key="index" @click="goDetail(item)">
            <div class="item">第{{item.periodId}}期</div>
            <div class="item">
              <p>{{item.nickName}}</p>
              <p>参与{{item.bettingCount}}次</p> 
            </div>
            <div class="item">
              <p>{{item.endTime | formatTime('m-d h:f')}}结束</p>
              <p>幸运码：{{item.code}}</p>
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
  computed: {
    showList() {
      return this.list.length
    }
  },
  methods: {
    _getHistoryList() {
      Services.getHistoryList({pageSize: 30, page: this.currentPage}).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          let list = _get(res, 'data.data.historyList', [])
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
          this._getHistoryList()
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
    this._getHistoryList()
    GLOBALS.marchSetsPoint('A_H5PT0202002098')
  }
}
</script>
<style lang="less" scoped>
.history-log {
  position: absolute;
  left: 0;
  top: 1.86rem;
  right: 0;
  bottom: .96rem;
  padding: 0 .24rem;
  overflow: hidden;
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
        width: 1.7rem;
      }
      &:nth-child(2) {
        width: 2.5rem;
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
            width: 1.7rem;
          }
          &:nth-child(2) {
            width: 2.5rem;
          }
          &:nth-child(3) {
            flex: 1;
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