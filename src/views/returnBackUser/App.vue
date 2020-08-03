<template>
  <main class="return-back-user">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back">
      <img src="./img/back-icon.png" alt="">
    </div>
    <div class="problem" @click="openRule">
      <img src="./img/problem-icon.png" alt="">
    </div>
    <p class="endtime">活动截至{{info.endDate}}</p>
    <cash-out :info="info" @show-pop="showPop" />
    <template v-if="info.state===1">
      <sign-in :info="info" @show-pop="showPop" />
      <task-list :info="info" @show-pop="showPop" />
    </template>
    <template v-else>
      <div class="end">
        <img src="./img/end.png" alt="">
      </div>
    </template>
    <popup v-model="isShowPop" :title="title" :type="popType" :awards-info="awardsInfo"
      @on-confirm="callback" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import cashOut from './components/cashOut/index'
import signIn from './components/signIn/index'
import taskList from './components/taskList/index'
import popup from './components/popup/index'
import { activityHome } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'returnBackUser',
  components: {
    cashOut,
    signIn,
    taskList,
    popup
  },
  data () {
    return {
      info: {},
      isShowPop: false,
      popType: 'award',
      awardsInfo: {},
      title: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      await this._activityHome()
      GLOBALS.marchSetsPoint('P_H5PT0312', { 'source_address': GLOBALS.getUrlParam('from') || '' }) // H5平台-累充0用户回流活动-页面加载完成
    },
    async _activityHome () {
      const res = await activityHome()
      const code = _get(res, 'code', 0)
      const data = _get(res, 'data', 0)
      if (code === 200) {
        this.info = data
        if (data.awardNum) {
          let award = {
            name: `话费红包*${data.awardNum}，价值${data.awardNum / 10}元`,
            desc: '集满10元话费红包即可提现10元话费'
          }
          this.showPop('redpackage', award, '恭喜获得')
        }
      }
    },
    openRule () {
      this.showPop('rule', null, '活动规则')
    },
    showPop (type, info, title) {
      this.popType = type
      this.awardsInfo = info
      this.title = title
      this.isShowPop = true
    },
    callback (type) {
      switch (type) {
        case 'cashout':
          GLOBALS.marchSetsPoint('A_H5PT0312003885') // H5平台-累充0用户回流活动-提现成功-去充话费点击
          GLOBALS.jumpOutsideGame('/xmWap/#/my/prize')
          break
        case 'redpackage':
          this._activityHome()

        default:

          break
      }
    },
    closeCallback (type) {
      switch (type) {
        case 'redpackage':
          this._activityHome()
          break

        default:
          break
      }
    },
    back () {
      location.href = window.linkUrl.getBackUrl(this.curChannel)
    }
  }
}
</script>

<style lang="less" scoped>
.return-back-user {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(#b52a2e 9.2rem, #b7292e);
  padding-top: 0.01rem;
  box-sizing: border-box;
  font-size: 0.2rem;
  font-family: Alibaba PuHuiTi;
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    img {
      display: block;
      margin: auto;
      width: 7.2rem;
    }
  }
  .back {
    width: 0.66rem;
    height: 0.66rem;
    font-size: 0;
    margin-top: 0.25rem;
    margin-left: 0.16rem;
  }
  .problem {
    width: 0.66rem;
    height: 0.66rem;
    font-size: 0;
    margin-top: 0.15rem;
    margin-left: 0.16rem;
  }
  .endtime {
    position: relative;
    text-align: center;
    color: #fff;
    margin-top: 0.4rem;
  }
  .end {
    width: 2.48rem;
    margin: 1.32rem auto 0;
  }
}
</style>
