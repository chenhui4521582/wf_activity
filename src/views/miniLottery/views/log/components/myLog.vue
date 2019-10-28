<template>
  <div class="my-log">
    <div class="title">
      <div class="item">夺宝名称</div>
      <div class="item">夺宝时间</div>
      <div class="item">夺宝结果</div>
    </div>
    <ul>
      <li v-for="(item, index) in list" :key="index" @click="goDetail(item)">
        <div class="item">第{{item.periodId}}期</div>
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
    _getList() {
      Services.getMyLotteryLog().then(res=> {
        console.log(res)
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          this.list = _get(res, 'data.data.list', [])
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
    this._getList()
    GLOBALS.marchSetsPoint('A_H5PT0202002097')
  }
}
</script>
<style lang="less" scoped>
.my-log {
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
</style>