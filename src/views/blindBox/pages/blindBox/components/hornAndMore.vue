<template>
  <section class="horn-and-more">
    <section class="text-btn" @click="showRule"><span>活动规则</span></section>
    <NewYearSwiper :notice-list="noticeList" v-if="noticeList.length" />
    <section class="text-btn">
      <div v-if="unreceived" class="mark">{{unreceived}}</div>
      <a href="#/myPrize" @click="getAwards">获得奖品</a>
    </section>
    <Dialog :show="isShowRule" title="活动规则" :close="true" @onClose="closeRule()">
      <p class="rule-content">
        1.用户支付15元即可购买一个盲盒，选择想要的盲盒打开，即可获得惊喜奖品；<br>
        2.购买盲盒可100%开出奖品；<br>
        3.选择一个盲盒，支付5元购买一张透视卡，可查看盲盒内是否是想要的商品；<br>
        4.盲盒获得的奖品可在“我的奖品”中领取，满2件奖品即可包邮，不满2件需支付8元邮费；<br>
        5.奖品领取成功后我们会在1-2天内给您发货；如有疑问可联系在线客服； <br>
        6.盲盒和透视卡购买后不支持退换哦；<br>
        7.盲盒购买金额不计入游戏平台的累充活动；<br>
        玩蜂对此具有最终解释权
      </p>
      <section class="rule-btn-wrapper" slot="footer">
        <div class="confirm" @click="closeRule()">
          我知道了
        </div>
      </section>
    </Dialog>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import NewYearSwiper from './new-year-swiper'
import Dialog from '../../../components/dialog'
import { NoticeList } from '../../../apis/box'
import { Unreceived } from '../../../apis/user'

export default {
  name: '',
  components: {
    Dialog, NewYearSwiper
  },
  data () {
    return {
      noticeList: [],
      isShowRule: false,
      unreceived: 0
    }
  },
  mounted () {
    this.getNoticeList()
    this.getUnreceived()
  },
  methods: {
    async getNoticeList () {
      // 获取跑马灯信息
      const res = await NoticeList()
      const { data } = res.data
      this.noticeList = data || []
    },
    // 获取用户未领取数量
    async getUnreceived () {
      ({data: {data: this.unreceived}} = await Unreceived())
    },
    showRule () {
      this.isShowRule = true
      GLOBALS.marchSetsPoint('A_H5PT0225002543') // H5平台-盲盒页面-活动规则点击
    },
    closeRule () {
      this.isShowRule = false
    },
    getAwards () {
      GLOBALS.marchSetsPoint('A_H5PT0225002544') // H5平台-盲盒页面-获得奖品点击
    }
  }
}
</script>

<style lang="less" scoped>
.horn-and-more {
  height: 1.16rem;
  background: #f4d6b0 url(../assets/top-btn-wrap.png) no-repeat center top /
    100% 103%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 0.14rem 0.5rem;
  color: #edeef1;
  font-size: 0.24rem;
  .text-btn {
    display: flex;
    font-weight: bold;
    color: #edeef1;
    position: relative;
    a {
      color: #edeef1;
    }
    .mark {
      background: #F53434;
      border-radius: 50%;
      color: #fff;
      box-sizing: border-box;
      width: 0.36rem;
      height: 0.36rem;
      font-size: 0.22rem;
      position: absolute;
      padding: 0.02rem;
      right: -0.02rem;
      top: -0.26rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    // background: linear-gradient(
    //   0deg,
    //   rgba(240, 243, 252, 1) 0%,
    //   rgba(228, 223, 203, 1) 98.92578125%
    // );
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    &::after {
      content: "";
      margin-left: 0.04rem;
      display: inline-block;
      width: 0.24rem;
      height: 0.24rem;
      background: url(../assets/arrow-icon.png) no-repeat center center / 100%
        100%;
    }
  }
  .rule-content {
    font-size: 0.24rem;
    font-weight: 500;
    color: #888888;
    line-height: 0.36rem;
    text-align: left;
    padding: 0 0.44rem 0.2rem;
  }
  .rule-btn-wrapper {
    padding: 0.2rem 0;
    .confirm {
      width: 4.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #d1ac42;
      border-radius: 0.16rem;
      margin: auto;
      color: #fff;
      font-size: 0.24rem;
      font-weight: bold;
    }
  }
}
</style>
