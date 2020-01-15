<template>
  <div class="mask" v-if="value">
    <div class="comPop-bc" id="cp-bc"
      :style="{background:`url(${require(`../img/comPop/default-bg.png`)})`}">
      <div class="title">
        <img :src="`${require(`../img/comPop/${value}/title.png`)}`" alt />
      </div>
      <div class="inner">
        <!-- 规则页面 -->
        <template v-if="value===1">
          <ul class="inner-container">
            <li>
              <p class="rule-header">①活动时间</p>
              <p>•活动时间为2020年1月27日-2月2日</p>
              <p>•发榜时间为2020年2月3日-2月4日</p>
            </li>
            <li>
              <p class="rule-header">②每日返利</p>
              <p>
                •活动期间，每天登录活动页可免费领取昨日金叶总消耗的0.1%金叶返利（明天领取金叶=今天总消耗金叶*返利比），且在斗地主、麻将、跑得快、枪火英雄、套圈、天天飞机大战中消耗金叶不计入活动；
              </p>
              <p>
                • 充值随机获福气值，每天达到1万福气值，则次日金叶返利比升级10倍（返利比1%）；
              </p>
              <p>
                • 次日返利金叶均取整数，当天消耗金叶需达到1千以上，次日才可返利。
              </p>
            </li>
            <li>
              <p class="rule-header">③累计福气榜</p>
              <p>• 活动期间所得福气可累计，前30名福气最高玩家可上榜赢取大奖；</p>
              <p>• 最终累计福气值一样，则先达成排名靠前。</p>
            </li>
            <li>
              <p class="rule-header">④小提示</p>
              <p>•每日返利需由玩家每天在“返利记录”页手动领取，2月4日24点前均可领取所得奖励，过时不予补偿；</p>
              <p>•福气榜统计时间截至2月2日24点，福气在充值后将自动累计到玩家榜单，上榜奖励将由系统自动发放到账。</p>
              <p>•平台保留对活动条款的最终解释权，如需咨询可联系在线客服。</p>
            </li>
          </ul>
        </template>
        <!-- 攻略页面 -->
        <template v-if="value===2">
          <div class="inner-container">
            <img src="../img/comPop/2/inner.png" class="guide-image" alt />
          </div>
        </template>

        <!-- 查看福气获得记录 -->
        <template v-if="value===3">
          <div class="inner-container">
            <div class="record-container">
              <div>
                <span>今日获得：</span>
                <span class="number">{{todayBlessing}}</span>
              </div>
              <div>
                <span>累计获得：</span>
                <span class="number">{{totalBlessing}}</span>
              </div>
            </div>
            <div class="inner-top">
              <div>
                <span>获得日期</span>
              </div>
              <div>
                <span>福气值</span>
              </div>
            </div>
            <!-- 循环福气获得记录列表 -->
            <template v-if="blessingList.length>0">
              <ul class="record-inner">
                <li class="record-inner-li" v-for="(item,key) in blessingList" :key="key">
                  <div>{{item.createTime}}</div>
                  <div>{{item.blessing}}</div>
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="empty">
                <img src="../img/comPop/empty.png" alt=""><br>
                <span>暂无记录</span>
              </div>
            </template>
          </div>
        </template>

        <!-- 领取每日返利 (金叶返利记录)-->
        <template v-if="value===4">
          <!-- 领取成功提示 -->
          <div v-if="isShowTips" class="success-tips">
          </div>

          <div class="everyday-container">
            <div class="everyday-total">
              <span>累计返利金叶：</span>
              <span class="number">{{totalRebate}}</span>
            </div>
            <div class="inner-top">
              <div>
                <span>返利日期</span>
              </div>
              <div class="rebate-cell">
                <span>返利金叶数</span>
              </div>
              <span></span>
            </div>

            <!-- 循环列表 -->
            <template v-if="rebateList.length>0">
              <ul class="record-inner">
                <li class="rabate-list" v-for="(item,key) in rebateList" :key="key">
                  <div>{{item.createDate}}</div>
                  <div class="rebate-cell">{{item.rebate}}</div>
                  <!-- 领取按钮 -->
                  <div v-show='item.state === 0' class="btn receive"
                    @click="toRebateReceive(item.id)">
                  </div>
                  <!-- 已领取 -->
                  <div v-show="item.state === 1" class="btn received">
                  </div>
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="empty">
                <img src="../img/comPop/empty.png" alt=""><br>
                <span>暂无记录</span>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="close" @click="comPopback">
      <img src="../img/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import { findRecord, rebateRecord, rebateReceive } from '../services/api'
import _get from 'lodash.get'
export default {
  data () {
    return {
      blessingList: [],
      rebateList: [],
      totalRebate: '',
      totalBlessing: '',
      todayBlessing: '',
      isShowTips: false,
      timer: null
    }
  },
  methods: {
    comPopback () {
      clearTimeout(this.timer)
      this.isShowTips = false
      this.$emit('input', 0)
    },
    async getFindRecord () {
      const res = await findRecord()
      this.blessingList = _get(res, 'data.blessingList', [])
      this.totalBlessing = _get(res, 'data.totalBlessing', '')
      this.todayBlessing = _get(res, 'data.todayBlessing', '')
      GLOBALS.marchSetsPoint('A_H5PT0234002733') // H5平台-集福气赢大奖页-福气值获得记录弹窗加载完成
    },
    async getRebateRecord () {
      const res = await rebateRecord()
      this.rebateList = _get(res, 'data.rebateList', [])
      this.totalRebate = _get(res, 'data.totalRebate', '')
      GLOBALS.marchSetsPoint('A_H5PT0234002730') // H5平台-集福气赢大奖页-金叶返利记录弹窗加载完成
    },
    async toRebateReceive (id) {
      clearTimeout(this.timer)
      const res = await rebateReceive(id)
      if (_get(res, 'code', 0)) {
        this.isShowTips = true
        this.$parent.getActivityInfo()
        this.timer = setTimeout(() => {
          clearTimeout(this.timer)
          this.isShowTips = false
        }, 2000)
      }
      this.getRebateRecord()
    }
  },
  props: {
    value: {
      type: Number,
      default: 0 // 0:关闭 1:规则,2:攻略,3:查看记录,4:返利记录
    }
  },
  watch: {
    value (val) {
      switch (val) {
        case 3:
          this.getFindRecord()
          break
        case 4:
          this.getRebateRecord()
          break

        default:
          break
      }
    }
  },
  destroyed () {
    clearTimeout(this.timer)
    this.isShowTips = false
  }
}
</script>
<style lang="less" scoped>
// 提示图片
.success-tips {
  background: url("../img/comPop/4/tips.png");
  background-size: 100% 100%;
  width: 1.66rem;
  height: 1.92rem;
  position: absolute;
  top: 4.95rem;
  left: 2.4rem;
  z-index: 5;
}
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
}

.comPop-bc {
  background-size: 100% 100% !important;
  width: 6.46rem;
  height: 9.72rem;
  margin: 0 auto;
  position: relative;
  .inner {
    margin: 3.1rem auto 0;
    padding: 0 1rem;
    justify-content: center;
    align-items: center;
    .inner-container {
      width: 100%;
      height: 4.5rem;
      overflow-x: hidden;
      overflow-y: scroll;
      color: #fff5ed;
      font-size: 0.22rem;
      -webkit-overflow-scrolling: touch;
      .rule-header {
        color: #ffcb35;
        font-size: 0.24rem;
      }
    }
    .guide-image {
      width: 4.18rem;
      display: block;
      margin: auto;
    }
  }
  .empty {
    text-align: center;
    margin-top: 0.9rem;
    font-weight: bold;
    font-size: 0;
    img {
      width: 1rem;
      height: 1rem;
    }
    span {
      display: block;
      margin-top: 0.3rem;
      font-size: 0.24rem;
      color: #850f1d;
    }
  }
  .title {
    position: relative;
    top: 2.8rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
    img {
      height: 0.38rem;
    }
  }
}
.close {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  img {
    width: 0.52rem;
    height: 0.52rem;
  }
}
// 查看福气记录的内容样式
.inner-top {
  display: flex;
  margin-top: 0.2rem;
  color: #fff5ed;
  font-size: 0.22rem;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../img/comPop/3/biankuang.png") no-repeat;
    background-size: contain;
    background-position: center center;
    height: 0.54rem;
    flex: 1;
  }
  & > span {
    min-width: 1.22rem;
    display: block;
  }
}
.record-container {
  display: flex;
  justify-content: space-around;
  div {
    color: #fff6df;
    font-size: 0.24rem;
  }
  .number {
    color: #feec21;
    font-size: 0.24rem;
  }
}
.record-inner {
  // 单调福气获得记录的样式
  margin: 0.1rem auto;
  height: 3.3rem;
  overflow-x: hidden;
  .record-inner-li {
    display: flex;
    height: 0.58rem;
    align-items: center;
    justify-content: space-around;
    text-align: center;
    font-size: 0.2rem;
    font-weight: bold;
    color: #fff5ed;
    div {
      flex: 1;
      white-space: nowrap;
    }
  }
  .rabate-list {
    display: flex;
    height: 0.58rem;
    justify-content: space-around;
    align-items: center;
    div {
      flex: 1;
      font-size: 0.2rem;
      text-align: center;
      font-weight: bold;
      color: #fff5ed;
      overflow: hidden;
      white-space: nowrap;
      width: 1.65rem;
      margin-left: 0.12rem;
    }
    .rebate-cell {
      margin-left: 0.2rem;
    }
    .btn {
      background-size: cover;
      background-position: center right;
      min-width: 1.42rem;
      height: 0.69rem;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      margin-right: -0.2rem;
    }
    .receive {
      background-image: url("../img/comPop/4/lingqu.png");
    }
    .received {
      background-image: url("../img/comPop/4/yilingqu.png");
    }
  }
}
.rebate-cell {
  margin-right: -0.3rem;
}
.everyday-container {
  .everyday-total {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff6df;
    font-size: 0.28rem;
    line-height: 0.32rem;
    font-weight: bold;
    .number {
      color: #feec21;
    }
  }
}
</style>