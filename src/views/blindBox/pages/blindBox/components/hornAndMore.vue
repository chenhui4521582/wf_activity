<template>
  <section class="horn-and-more">
    <section class="text-btn"
      @click="showRule"><span>活动规则</span></section>
    <horn-list :notice-list="noticeList"
      v-if="noticeList.length"></horn-list>
    <section class="text-btn">
      <router-link to="/myPrize">获得奖品</router-link>
    </section>
    <Dialog :show="isShowRule"
      title="活动规则"
      :close="true"
      @onClose="closeRule()">
      <p class="rule-content">
        1.用户支付15元即可购买一个盲盒，选择想要的盲盒打开，即可获得惊喜奖品；<br>
        2.购买盲盒可100%开出奖品；<br>
        3.购买一张透视卡，使用后即可查看盲盒内是否是想要的奖品；<br>
        4.盲盒获得的奖品可在“我的奖品”中领取，领取成功后我们会尽快给您发货；<br>
        5.盲盒和透视卡一旦购买后不支持退换。<br>
        玩蜂对此具有最终解释权
      </p>
      <section class="rule-btn-wrapper"
        slot="footer">
        <div class="confirm"
          @click="closeRule()">
          我知道了
        </div>
      </section>
    </Dialog>
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
      noticeList: [],
      isShowRule: false
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
    },
    showRule () {
      this.isShowRule = true
    },
    closeRule () {
      this.isShowRule = false
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
