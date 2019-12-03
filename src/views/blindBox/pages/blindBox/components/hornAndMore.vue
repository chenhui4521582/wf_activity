<template>
  <section class="horn-and-more">
    <section class="text-btn"><span>活动规则</span></section>
    <horn-list :notice-list="noticeList"
      v-if="noticeList.length"></horn-list>
    <section class="text-btn">
      <router-link to="/myPrize">获得奖品</router-link>
    </section>
    <dialog :show="true"></dialog>
  </section>
</template>

<script>
import hornList from './hornList'
import Dialog from '../../../components/dialog'
import { NoticeList } from '../../../apis/box'
export default {
  name: '',
  components: {
    Dialog, hornList
  },
  data () {
    return {
      noticeList: []
    }
  },
  mounted () {
    this.getNoticeList()
  },
  methods: {
    async getNoticeList () {
      // 获取跑马灯信息
      const res = await NoticeList()
      const { data } = res.data
      this.noticeList = data || []
    }
  }
}
</script>

<style lang="less" scoped>
.horn-and-more {
  height: 1.16rem;
  background: #1b1f29 url(../assets/top-btn-wrap.png) no-repeat center bottom /
    100% 100%;
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
    background: linear-gradient(
      0deg,
      rgba(240, 243, 252, 1) 0%,
      rgba(228, 223, 203, 1) 98.92578125%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
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
