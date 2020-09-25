<template>
  <div class="national-wrap" :class="{selected: selectedItem}" v-if="actInfo">
    <img src="./images/back.png" alt="" class="back">
    <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
    <div class="act_time" v-if="!isEnd">活动时间 {{actInfo.beginDate}}-{{actInfo.endDate}}{{countdown.time}}</div>
    <div class="act_time" v-else>活动已结束</div>
    <!-- 礼包 -->
    <div class="national-bags" v-if="!selectedItem">
      <div class="giftbg" v-for="item in actInfo.bagInfoList" :class="{end:isEnd}">
        <img class="giftimg" :src="`${require(`./images/pic${item.bagLevel-1}.png`)}`">
        <div class="gift-detail" v-html="item.bagName.replace('+','+<br>')"></div>
        <div class="gift-check">
          <div class="check_item" @click="selectTask(item)">选择奖品 <img src="./images/more.png" alt=""></div>
          <div class="check_item" @click="checkTask(item)">查看<br>任务</div>
        </div>
      </div>
    </div>
    <task :selectedItem="selectedItem" :isEnd="isEnd" @showPop="showPop" @refresh="_getInfo" v-else></task>
    <popTask :selectedIndex="selectedIndex" :selectedItem="popTaskItem" ref="popTask"></popTask>
    <comPop :popType="popType" :actInfoData="actInfo" :awardData="awardData" ref="comPop" @refresh="_getInfo"></comPop>
  </div>
</template>

<script>
  import {
    activityInfo
  } from './utils/api'
  export default {
    name: 'app',
    data() {
      return {
        popType: 0,
        actInfo: null,
        awardData: null,
        selectedItem: null,
        selectedIndex:0,
        popTaskItem: null,
        isEnd: false,
        countdown:{
          time:''
        }
      }
    },
    mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0334', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this._getInfo()
    },
    components: {
      loading: () => import('../../components/common/loading.vue'),
      task: () => import('./components/task'),
      popTask: () => import('./components/popTask'),
      comPop: () => import('./components/comPop')
    },
    methods: {
      //获取活动信息
      async _getInfo() {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.selectedIndex=0
          this.actInfo = data
          this.isEnd=data.state!=1
          this.selectedItem=data.userBagInfo
          !this.countdown.time && this.actInfo.countdown && GLOBALS.remainingTime(
            this,
            this.actInfo.countdown,
            this.countdown
          )
          if(!this.selectedItem){
            GLOBALS.marchSetsPoint('A_H5PT0334004213')//H5平台-欢乐国庆礼-选择奖品页加载完成
          }
        }
      },
      //弹窗
      showPop(type, data) {
        this.popType = type
        let point = ''
        //["活动规则", "温馨提示", "大家都在玩", "恭喜获得"]
        switch (type) {
          case 1:
            point = 'A_H5PT0334004216';
            break;//H5平台-欢乐国庆礼-规则按钮点击
          case 3:
            point = 'A_H5PT0334004220';
            break;//H5平台-欢乐国庆礼-大家都在玩弹窗加载完成
          case 4:
            point = 'A_H5PT0334004223';
            break;//H5平台-欢乐国庆礼-国庆礼盒奖励领取弹窗加载完成
        }
        data && (this.awardData = data)
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      //返回上一层
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0334004215')//H5平台-欢乐国庆礼-返回按钮点击
        history.back(-1)
      },
      //选择任务
      selectTask(item) {
        GLOBALS.marchSetsPoint('A_H5PT0334004217')//H5平台-欢乐国庆礼-确认选择框加载完成
        this.showPop(2, {
          bagLevel: item.bagLevel
        })
      },
      //查看任务
      checkTask(item) {
        this.popTaskItem = item
        this.selectedIndex=item.bagLevel
        this.$refs.popTask.showPop()
        GLOBALS.marchSetsPoint('A_H5PT0334004214')//H5平台-欢乐国庆礼-各奖品任务预览框加载完成
      }
    },
    watch: {
      "countdown.time"(value) {
        if (!value) {
          this._getInfo()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../common/css/base.css';

  * {
    box-sizing: border-box;
  }

  .national-wrap {
    width: 7.2rem;
    min-height: 100vh;
    background: #D92A26;
    box-sizing: border-box;
    position: relative;
    &:not(.selected) {
      padding: 3.91rem 0 0;
      &:before {
        content: '';
        width: 100%;
        height: 11.35rem;
        background: url("./images/bg0.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0
      }
    }
    &.fixed {
      position: fixed;
      left: 0;
      right: 0;
      margin: auto;
    }
    .back, .rule {
      width: .68rem;
      height: .68rem;
      position: absolute;
      top: .19rem;
      left: .08rem;
      z-index: 1;
      &.rule {
        top: 1.1rem;
      }
    }
    .act_time {
      width: 2.78rem;
      height: .59rem;
      background: url("./images/counttime.png");
      background-size: 100% 100%;
      position: absolute;
      top: -.23rem;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 0.24rem;
      font-weight: 400;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: .23rem;
      box-sizing: border-box;
      z-index: 1;
    }
    .national-bags {
      padding: 0 .66rem;
      box-sizing: border-box;
      position: relative;
      display: flex;
      flex-wrap: wrap;
      .giftbg {
        width: 2.87rem;
        height: 3.51rem;
        background: url("./images/pic_bg.png");
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .16rem 0;
        box-sizing: border-box;
        position: relative;
        margin-bottom: .18rem;
        &.end:before {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: url("./images/over.png");
          background-size: 100% 100%;
          z-index: 100;
        }
        &:nth-child(2n+1) {
          margin-right: .14rem;
        }
        .giftimg {
          width: 1.43rem;
          height: 1.71rem;
        }
        .gift-detail {
          text-align: center;
          font-size: .24rem;
          color: #9B4C05;
          height: .65rem;
          display: flex;
          align-items: center;
        }
        .gift-check {
          position: absolute;
          left: .16rem;
          right: .16rem;
          margin: auto;
          top: 2.6rem;
          height: .85rem;
          display: flex;
          align-items: center;
          .check_item {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #D92A26;
            img {
              width: .22rem;
              height: .22rem;
              margin-left: .14rem;
            }
            &:nth-child(1) {
              flex: 1.5;
              font-size: .3rem;
            }
            &:nth-child(2) {
              flex: .5;
              font-size: .18rem;
              border-left: 1px solid #D92A26;
            }
          }
        }
      }
    }
  }
</style>
