<template>
  <article class="activity-title">
    <div class="title-img">
      <img src="../img/title.png" alt="">
    </div>
    <div class="horn-list-wrapper">
      <img src="../img/horn-icon.png" alt="">
      <div class="horn-list-content" v-if="hornList && hornList.length">
        <horn :list="hornList" />
      </div>
    </div>
    <div class="btn back-btn" @click="back()">
      <img src="../img/back-icon.png" alt="">
    </div>
    <div class="btn rule-btn" @click="openPop(1)">
      <img src="../img/rule-icon.png" alt="">
    </div>
    <div class="btn my-awards" @click="openPop(2)">
      <img src="../img/awards-icon.png" alt="">
    </div>
  </article>
</template>

<script>
import { noticeList } from '../services/api'
export default {
  name: 'activityTitle',
  components: {
    horn: () => import('./horn')
  },
  data () {
    return {
      hornList: []
    }
  },
  mounted () {
    this.getNoticeList()
  },
  methods: {
    async getNoticeList () {
      const { code, data } = await noticeList()
      if (code === 200) {
        this.hornList = data
      }
    },
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0301003586') // H5平台-疯狂翻倍活动-返回按钮点击
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    openPop (type) {
      switch (type) {
        case 1:
          GLOBALS.marchSetsPoint('A_H5PT0301003587') // H5平台-疯狂翻倍活动-规则按钮点击
          break

        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0301003588') // H5平台-疯狂翻倍活动-奖励按钮点击
          break
        default:
          break
      }
      this.$emit('open-pop', type)
    }
  }
}
</script>

<style lang="less" scoped>
.activity-title {
  font-size: 0;
  .title-img {
    img {
      width: 100%;
    }
  }
  .horn-list-wrapper {
    width: 6.24rem;
    height: 0.82rem;
    background: url(../img/horn-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 0.04rem 0.8rem 0 0.4rem;
    position: absolute;
    top: 2.52rem;
    left: 50%;
    margin-left: -3.12rem;
    img {
      width: 0.3rem;
      height: 0.26rem;
    }
    .horn-list-content {
      flex: 1;
    }
  }
  .btn {
    position: absolute;
    width: 0.8rem;
    height: 0.5rem;
    top: 0.2rem;
    right: 0.1rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .back-btn {
    width: 0.52rem;
    height: 0.5rem;
    right: auto;
    left: 0.1rem;
    top: 0.2rem;
  }
  .my-awards {
    top: 0.86rem;
  }
}
</style>
