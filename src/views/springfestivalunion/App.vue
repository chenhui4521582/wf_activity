<template>
  <main id="app" class="springfestivalunion" :class="{aoke:curChannel==100006&&isHasIframe}">
    <header class="header">
      <div class="back" @click="back">返回</div>
    </header>
    <template v-if="detailData">
      <div class="header_container">
        <div class="timelines" :class="{fixed:isShowTopIcon}">
          <div class="timelines_item" v-for="(item,index) in detailData" :class="{selected:index==currentIndex}"
               @click="setCurrentIndex(index)">
            <div class="timelines_item_time">{{item.timeSlot}}</div>
            <div class="timelines_item_title">{{index==0?'惊喜年末':(index==1?'新春狂欢':'喜乐元宵')}}</div>
          </div>
        </div>
        <div class="timelines" :class="{static:isShowTopIcon}" v-if="isShowTopIcon" @click="setCurrentIndex(index)">
          <div class="timelines_item" v-for="(item,index) in detailData" :class="{selected:index==0}">
            <div class="timelines_item_time">{{item.timeSlot}}</div>
            <div class="timelines_item_title">{{index==0?'惊喜年末':(index==1?'新春狂欢':'喜乐元宵')}}</div>
          </div>
        </div>
        <div class="timelines_act_list" id="timelines_act_list">
          <div class="timelines__act_item" v-for="item in detailData[currentIndex].opsAggregationActivityPageRsps"
               @click="gotoact(item,index)">
            <img :src="item.picture|filter" alt="">
            <div class="timelines__act_state"
                 :class="{green:item.activityState==0||item.activityState==1,purple:item.activityState==2,gray:item.activityState==3}">
              <template v-if="item.activityState==0">
                敬请期待
              </template>
              <template v-else-if="item.activityState==1">
                <!--有确定时间未开始的：大于24小时，显示“X月X日开始”；小于24小时，显示“XX:YY:ZZ后开始”倒计时-->
                <template v-if="item.countDown">
                  {{item.countTime}}后开始
                </template>
                <template v-else>
                  {{item.activityBeginTime}}开始
                </template>
              </template>
              <template v-else-if="item.activityState==2">
                <!--进行中的：大于24小时，显示“X月X日结束”；小于24小时，显示“XX:YY:ZZ后结束”倒计时-->
                <template v-if="item.countDown">
                  {{item.countTime}}后结束
                </template>
                <template v-else>
                  {{item.activityEndTime}}结束
                </template>
              </template>
              <template v-else>
                活动结束
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="act_bottom"></div>
      <div class="games">
        <div class="games_title"></div>
        <div class="games_list">
          <div class="games_item" v-for="(item,index) in detailData[currentIndex].opsAggregationGamePageRsps"
               @click="gotogame(item)">
            <img :src="item.picture|filter" alt="">
          </div>
        </div>
      </div>
      <div class="back_top" v-if="isShowTopIcon" @click="getAnchor('app')" id="backTop"></div>
    </template>
  </main>
</template>
<script>
  import '../../common/js/window.js';
  import common from "../../common/js/utils";

  export default {
    data() {
      return {
        curChannel: null,
        isFoldRule: false,//折叠规则默认折叠
        isShowTopIcon: false,//是否显示回到顶部图标
        detailData: null,//myDetail接口数据
        currentIndex: 0,
        listTimers: []
      }
    },
    computed: {
      currentItem() {
        return this.detailData && this.detailData.length > this.currentIndex && this.detailData[this.currentIndex] && this.detailData[this.currentIndex].opsAggregationActivityPageRsps
      },
      countdownText() {//倒计时文案 红包榜外显倒计时，最后一天显示
        if (this.countdown.time) {
          let hourText = this.countdown.time.split(':')[0]
          let days = Math.floor(hourText / 24)
          if (days == 0) {
            return this.countdown.time
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      showTask() {
        if (this.detailData) {
          return this.countdown.time && this.countdown.time != '00:00:00'
        } else {
          return true
        }

      },
      isHasIframe() {
        return window != window.top
      },
      fontsize() {
        return parseFloat(localStorage.getItem('fontsize') || '100')
      },
    },
    components: {},
    methods: {
      dealTime(time) {
        let date = time.split(' ')[0]
        return date.substring(date.indexOf('-') + 1).replace('-', '.')
      },
      /** 多组倒计时 **/
      countDownArr() {
        /** 清除多组倒计时列队 **/
        this.clearCountDown()
        let length = this.currentItem.length
        length && this.currentItem.forEach((item, index) => {
          let _index = index
          if (item.activityState == 1 || item.activityState == 2) {
            this.initTime(item.countDown, _index)
            this.countDownTime(item.countDown, _index)
          }
        })
      },
      /** 计算倒计时时间 **/
      initTime(info, index) {
        if (!info) return false
        if (info <= 0) {
          info = 0
          this.myDetails(false)
        }
        let date = info / 1000
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(parseInt(date) % 60)
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.$set(
          this.currentItem,
          index,
          {...this.currentItem[index], ...{countTime: `${countHour}:${countMinute}:${countSecond}`}}
        )
      },
      countDownTime(info, index) {
        if (!info) return false
        let date = info / 1000
        this.listTimers[index] = window.setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            window.clearInterval(this.listTimers[index])
            this.myDetails(false)
          }
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(parseInt(date) % 60)
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          this.$set(
            this.currentItem,
            index,
            {...this.currentItem[index], ...{countTime: `${countHour}:${countMinute}:${countSecond}`}}
          )
        }, 1000)
      },
      /** 清除多组倒计时列队 **/
      clearCountDown() {
        this.listTimers.length && this.listTimers.forEach(item => {
          window.clearInterval(item)
        })
      },
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0235002743') // H5平台-活动聚合页-不同时间段TAB点击
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))+'&time='+new Date().getTime()
      },
      setCurrentIndex(index) {
        GLOBALS.marchSetsPoint('A_H5PT0235002744', {
          task_id: index,
          task_name: this.detailData[index].timeSlot
        }) // H5平台-活动聚合页-不同时间段TAB点击
        if (this.currentIndex != index) {
          this.myDetails(false)
          this.currentIndex = index
          if(this.isShowTopIcon){
            if (window == window.top) {
              document.body.scrollTop = 4.32 * this.fontsize
              !document.body.scrollTop && (document.documentElement.scrollTop = 4.32 * this.fontsize)
            } else {
              document.getElementById('app').scrollTop = 4.32 * this.fontsize
            }
          }
        }
      },
      gotoact(item, index) {
        GLOBALS.marchSetsPoint('A_H5PT0235002745', {
          task_id: item.sort,
          task_name: item.name
        }) // H5平台-活动聚合页-活动点击
        if ((item.activityState <= 1 && item.activityBeginFlag == 1) || item.activityState == 2 || (item.activityState == 3 && item.activityEndFlag == 1)) {
          if (item.linkUrl) {
            location.href = item.linkUrl
          } else {
            (item.activityState <= 1 || item.activityState === 3) && this.$toast.show({
              message: item.activityState <= 1 ? '活动未开始' : '活动已结束',
              duration: 3000
            })
          }
        } else {
          this.$toast.show({
            message: item.activityState <= 1 ? '活动未开始' : '活动已结束',
            duration: 3000
          })
        }
      },
      gotogame(item) {
        GLOBALS.marchSetsPoint('A_H5PT0235002746', {
          target_project_id: item.linkUrl
        }) // H5平台-活动聚合页-推荐游戏点击
        GLOBALS.jumpOutsideGame(item.linkUrl)
      },
      getAnchor(name) {
        GLOBALS.marchSetsPoint('A_H5PT0235002747') // H5平台-活动聚合页-回到页面顶部点击
        if (window == window.top) {
          document.body.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76)
        } else {
          document.getElementById('app').scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          this.isShowTopIcon = false
        }
      },
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//platform-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//shop-api.beeplaying.com' + url
        }
        return this.axios.post(url, params, {})
      },//请求封装方法
      async myDetails(flag) {
        try {
          const res = await this.fetch('/ops/api/aggregation/activity/pageInfo')
          if (res.data.code == 200 && res.data.data) {
            this.detailData = res.data.data;
            if (flag) {
              GLOBALS.marchSetsPoint('P_H5PT0235') // H5平台-活动聚合页面加载完成
              this.currentIndex = this.detailData.findIndex(item => item.currentFlag)
            }
            this.countDownArr()
          }
        } catch (e) {

        }
      }//获取myDetails数据
    },
    created() {
      this.myDetails(true)
    },
    mounted() {
      if (window == window.top) {
        window.onscroll = () => {
          //超过一屏就显示回到顶部的图标
          //console.log('document',(document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop))
          this.isShowTopIcon = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) >= 4.32 * this.fontsize
        }
      } else {
        window.ontouchmove = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = document.getElementById('app').scrollTop >= 4.32 * this.fontsize
        }
      }
    },
  }

</script>
<style lang="less" scoped>
  @import '../../common/css/base.css';

  .springfestivalunion {
    background: url("./images/layer.png");
    min-height: 100vh;
    position: relative;
    .header {
      background: url(./images/header.jpg) no-repeat;
      background-size: cover;
      height: 4.32rem;
      position: relative;
      .back {
        position: absolute;
        top: .16rem;
        width: .52rem;
        height: .38rem;
        line-height: .38rem;
        text-align: center;
        font-size: .22rem;
        font-weight: bold;
        color: rgba(250, 183, 148, 1);
        background: rgba(47, 7, 38, 1);
        border: 2px solid rgba(250, 183, 148, 1);
        border-radius: 0 .18rem .18rem 0;
      }
    }
    .header_container {
      position: relative;
      top: -.01rem;
      left: 0;
      right: 0;
      margin: auto;
      background: url("./images/act_layer.png");
      background-size: 7.2rem 3.75rem;
      .timelines {
        display: flex;
        justify-content: center;
        .timelines_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 1.82rem;
          height: .91rem;
          background: url("./images/unselected.png");
          background-size: 100% 100%;
          font-weight: bold;
          color: rgba(252, 185, 157, 1);
          font-size: .24rem;
          margin-right: .24rem;
          .timelines_item_title {
            margin-top: .09rem;
            font-size: .3rem;
          }
          &:nth-child(3) {
            margin-right: 0;
          }
          &.selected {
            background: url("./images/selected.png");
            background-size: 100% 100%;
            color: rgba(165, 12, 34, 1);
          }
        }
        &.fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          margin: auto;
          background: #d71031;
          z-index: 1;
        }
        &.static {
          opacity: 0;
        }
      }
      .timelines_act_list {
        padding: .21rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .timelines__act_item {
          width: 5.88rem;
          height: 2.2rem;
          margin-top: .2rem;
          border: .03rem solid rgba(245, 179, 131, 1);
          border-radius: .2rem;
          position: relative;
          img {
            position: absolute;
            width: 5.88rem;
            height: 2.2rem;
            border-radius: .2rem;
          }
          .timelines__act_state {
            width: 1.7rem;
            height: .43rem;
            border-radius: 0 .16rem 0 .16rem;
            position: absolute;
            right: 0;
            font-size: .22rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: .43rem;
            border-left: .02rem solid #fff;
            border-bottom: .02rem solid #fff;
            box-sizing: border-box;
            &.green {
              background: rgba(0, 176, 149, 1);
            }
            &.purple {
              background: rgba(187, 24, 89, 1);
            }
            &.gray {
              background: rgba(123, 99, 108, 1);
            }
          }
          &:nth-child(1) {
            margin-top: 0;
          }
        }
      }
    }
    .act_bottom {
      background: url(./images/act_bottom.png) no-repeat;
      background-size: 100% 100%;
      height: .99rem;
      position: relative;
      top: -.01rem;
    }
    .games {
      position: relative;
      padding-bottom: .63rem;
      .games_title {
        width: 4.7rem;
        height: .8rem;
        background: url("./images/recommend_game_nav.png");
        background-size: 100% 100%;
        margin: auto;
      }
      .games_list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        padding: .23rem .3rem 0;
        .games_item {
          img {
            width: 2.2rem;
            height: 2.63rem;
          }
        }
      }
    }
    .back_top {
      position: fixed;
      right: .05rem;
      bottom: 4rem;
      width: .77rem;
      height: .77rem;
      background: url("./images/backtop.png");
      background-size: 100% 100%;
    }
  }
</style>
