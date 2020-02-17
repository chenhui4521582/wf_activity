<template>
  <section class="horn-and-more">
    <section class="text-btn" @click="jumpRankingList"><span>幸运榜单</span></section>
        <horn-list :notice-list="noticeList" v-if="noticeList.length"></horn-list>
    <section class="text-btn">
      <div v-if="unreceived" class="mark">{{unreceived}}</div>
      <a href="#/myPrize" @click="getAwards">获得奖品</a>
    </section>
  </section>
</template>

<script>
/* eslint-disable no-undef */
import hornList from './hornList'
import { NoticeList } from '../../../apis/box'
import { Unreceived } from '../../../apis/user'

export default {
  name: '',
  components: {
    hornList
  },
  data () {
    return {
      noticeList: [],
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
    // 跳转幸运榜单
    jumpRankingList () {
      GLOBALS.marchSetsPoint('A_H5PT0225002851')
      this.$router.push({
        name: 'RankingList'
      })
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
  background: #1b1f29 url(../assets/top-btn-wrap.png) no-repeat center top /
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
}
</style>
