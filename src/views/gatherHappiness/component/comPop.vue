<template>
  <div class="mask" v-if="value">
    <div class="comPop-bc" id="cp-bc"
      :style="{background:`url(${require(`../img/comPop/default-bg.png`)})`}">
      <div class="title">
        <!-- 4字时的宽度 -->
        <img :src="`${require(`../img/comPop/${value}/title.png`)}`" alt
          style="width:1.56rem;height:0.38rem;" v-if="value===2||value===1" />
        <img :src="`${require(`../img/comPop/${value}/title.png`)}`"
          style="width:2.77rem;height:0.38rem" v-else-if="value===3" />
        <img :src="`${require(`../img/comPop/${value}/title.png`)}`"
          style="width:2.37rem;height:0.38rem" v-else-if="value===4" />
      </div>
      <div class="inner">
        <!-- 规则页面 -->
        <template v-if="value===1">
          <div class="inner-container">
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">①活动时间</span>
              <span style="color:#FFF5ED;font-size:0.22rem;">2020年1月27日0点-2月2日24点，2月3日-4日发榜</span>
            </p>
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">②每日返利</span>
              <span
                style="color:#FFF5ED;font-size:0.22rem;">活动期间，每天登录活动页可免费领取昨日总消耗金叶0.1%返利金叶（明天领取金叶=今天总消耗金叶*返利比）；充值随机获福气值，每天达到10000福气值，则次日金叶返利升级10倍（返利比1%）</span>
            </p>
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">③累计福气榜</span>
              <span span
                style="color:#FFF5ED;font-size:0.22rem;">活动期间所得福气可累计，前30名福气最高玩家可上榜赢取大奖。</span>
            </p>
            <p>
              <span style="color:#FFCB35;font-size:0.24rem">④小提示</span>
              <span style="color:#FFF5ED;font-size:0.22rem;">•
                每日返利需由玩家每天在“返利记录”页手动领取，2月4日24点前均可领取所得奖励，过时不予补偿； •
                福气榜统计截止时间为2月2日24点，福气在充值后将自动累计到玩家榜单。 • 平台保留对活动条款的最终解释权，如需咨询可联系在线客服。</span>
            </p>
          </div>
        </template>
        <!-- 攻略页面 -->
        <template v-if="value==2">
          <img src="../img/comPop/2/inner.png" alt style="width:4.18rem;height:4.50rem;" />
        </template>

        <!-- 查看福气记录 -->
        <template v-if="value==3">
          <div class="inner-container">
            <div style="display: flex;justify-content: space-evenly;">
              <div style="display:flex;align-items:center;">
                <span style="color:#FFF6DF;font-size:0.24rem">今日获得：</span>
                <span style="color:#FEEC21;font-size:0.24rem">{{todayBlessing}}</span>
              </div>
              <div style="display:flex;align-items:center;">
                <span style="color:#FFF6DF;font-size:0.24rem">累计获得：</span>
                <span style="color:#FEEC21;font-size:0.24rem">{{totalBlessing}}</span>
              </div>
            </div>
            <div class="inner-top">
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">获得日期</span>
              </div>
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">福气值</span>
              </div>
            </div>
            <div class="record-inner">
              <div v-for="(item,key) in blessingList" :key="key">
                <span>{{item.createTime}}</span>
                <span>{{item.blessing}}</span>
              </div>
            </div>
          </div>
        </template>

        <!-- 领取每日返利 -->
        <template v-if="value==4">
          <div class="everyday-container">
            <div class="everyday-total">
              <span>累计返利金叶：</span>
              <span>{{totalRebate}}</span>
            </div>
            <div class="inner-top">
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">返利日期</span>
              </div>
              <div>
                <span style="color:#FFF5ED;font-size:0.22rem">返利金叶数</span>
              </div>
              <span style="width:1rem"></span>
            </div>
            <div class="record-inner">
              <div v-for="(item,key) in rebateList" :key="key">
                <span>{{item.createDate}}</span>
                <span>{{item.rebate}}</span>
                <span
                  style="width:1.72rem;height:0.69rem; display: flex;justify-content: space-evenly;"><img
                    src="../img/comPop/4/lingqu.png" alt="" style="width:1.72rem;height:0.69rem"
                    v-if="item.state === 0" @click="rebateReceive(item.id)"></span>
              </div>
            </div>
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
import { findRecord, rebateRecord, rebateReceive } from "../services/api";
import _get from "lodash.get";
export default {
  data () {
    return {
      blessingList: [],
      rebateList: [],
      totalRebate: '',
      totalBlessing: '',
      todayBlessing: ''
    };
  },
  methods: {
    comPopback () {
      this.$emit('input', 0)
    },
    async getFindRecord () {
      const res = await findRecord()
      this.blessingList = _get(res, 'data.blessingList', [])
      this.totalBlessing = _get(res, 'data.totalBlessing', '')
      this.todayBlessing = _get(res, 'data.todayBlessing', '')
    },
    async getRebateRecord () {
      const res = await rebateRecord()
      this.rebateList = _get(res, 'data.rebateList', [])
      this.totalRebate = _get(res, 'data.totalRebate', '')
    },
    async rebateReceive (id) {
      const res = await rebateReceive(id)
      this.getRebateRecord()
    }
  },
  props: {
    value: {
      type: Number,
      default: 0 // 0:关闭 1:规则,2:攻略,3查看记录
    }
  },
  watch: {
    value (val) {
      switch (val) {
        case 3:
          this.getFindRecord()
          break;
        case 4:
          this.getRebateRecord()
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.mask {
  width: 7.2rem;
  position: fixed;
  top: 0;
  height: 100vh;
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
    width: 4.34rem;

    margin: 0 auto;
    justify-content: center;
    align-items: center;
    margin-top: 3.1rem;
    .inner-container {
      width: 100%;
      height: 4.5rem;
      overflow-x: hidden;
    }

    p {
      display: grid;
      margin-top: 0.06rem;
    }
  }

  .title {
    position: relative;
    top: 2.8rem;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
.close {
  position: absolute;
  //   top: 11.43rem;
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
  justify-content: space-around;
  margin-top: 0.2rem;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("../img/comPop/3/biankuang.png");
    background-size: 100% 100%;
    width: 1.558rem;
    height: 0.466rem;
  }
}
.record-inner {
  margin-top: 0.2rem;
  height: 3.2rem;
  overflow-x: hidden;
  div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 0.58rem;
    justify-content: space-around;
    align-items: center;
  }
  span {
    font-size: 0.2rem;
    text-align: center;
    font-weight: bold;
    color: #fff5ed;
    overflow: hidden;
    white-space: nowrap;
    width: 50%;
  }
}
.everyday-container {
  .everyday-total {
    display: flex;
    justify-content: center;
    margin-top: 3.2rem;
    span:first-child {
      color: #fff6df;
      font-size: 0.28rem;
      font-weight: 400;
    }
    span:last-child {
      color: #feec21;
      font-size: 0.28rem;
      font-weight: 400;
    }
  }
}
</style>