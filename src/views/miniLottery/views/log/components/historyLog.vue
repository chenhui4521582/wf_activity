<template>
  <div class="history-log">
    <div class="title">
      <div class="item">夺宝名称</div>
      <div class="item">幸运儿信息</div>
      <div class="item">夺宝结果</div>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="goDetail(item)">
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
  </div>
</template>
<script>
import Services from '../../../services/services'
import _get from 'lodash.get'
export default {
  name: 'myLog',
  data: () => ({
    list: []
  }),
  methods: {
    _getHistoryList() {
      Services.getHistoryList().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          this.list = _get(res, 'data.data.historyList', [])
        }
      })
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
  top: .96rem;
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
  ul {
    height: calc(100% - .96rem);
    padding-bottom: .2rem;
    background: #FFFAD4;
    border-radius: 0 0 .16rem  .16rem;
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
</style>