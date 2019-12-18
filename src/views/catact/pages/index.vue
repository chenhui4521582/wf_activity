<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <img src="./images/index/back.png" class="e-back" @click.stop="back">
    <rule :rule-main="rulesInfo" from="0"></rule>
    <div class="header1">
      <h4 class="e-time">价值<i>2000元大奖</i>等你抢</h4>
      <h4 class="e-time e-time-act" v-if="activityInfoData">活动时间：{{getActTime(activityInfoData)}}</h4>
    </div>
    <div class="header3" v-if="activityInfoData">
      <div class="e-items">
        <div class="sign-container">
          <div class="container">
            <div class="item" v-for="(item,index) in 6">
              <div class="leaf_div">
                <template v-if="index<5">
                  <img src="./images/index/leaf_gray.png" alt=""  class="leaf" v-if="activityInfoData.timeAxisInfos[index].taskStatus==0">
                  <img src="./images/index/leaf_light.png" alt=""  class="leaf" v-else>
                </template>
                <template v-else>
                  <template v-if="activityInfoData.extAwardInfo">
                    <img src="./images/index/leaf_extra_gray.png" alt="" class="leaf leaf_extra" v-if="activityInfoData.extAwardInfo.status==0">
                    <img src="./images/index/leaf_extra_light.png" alt="" class="leaf leaf_extra leaf_extra_light" v-else-if="activityInfoData.extAwardInfo.status==1" @click="getExtraAward(true)">
                    <img src="./images/index/leaf_extra_gained.png" alt="" class="leaf leaf_extra" v-else>
                  </template>
                </template>
              </div>
              <div class="leaf_info" :class="{extra:index==5}">
                <template v-if="index<5">
                  <div class="item">{{activityInfoData.timeAxisInfos[index].taskDate.split('-').splice(1).join('.')}}</div>
                  <div class="item" :class="{complete:activityInfoData.timeAxisInfos[index].taskStatus}">{{activityInfoData.timeAxisInfos[index].taskSpeed}}</div>
                </template>
                <template v-else>
                  <div class="item" v-if="activityInfoData.extAwardInfo">{{activityInfoData.extAwardInfo.awardsNum}}{{activityInfoData.extAwardInfo.awardsName}}</div>
                </template>
              </div>
            </div>
          </div>
          <div class="progress">
          </div>
        </div>
        <div class="task-container">
          <div class="title">
            <div class="item">{{getActTime(activityInfoData)}}任意4天完成当日所有任务,还可额外领取{{activityInfoData.extAwardInfo.awardsNum}}{{activityInfoData.extAwardInfo.awardsName}}</div>
            <div class="item">每日任务列表</div>
          </div>
          <div class="task_list">
            <div class="item" v-for="(item,index) in activityInfoData.taskInfos">
              <img src="./images/index/task_img.png" alt="" class="task_img" v-if="index==0">
              <img src="./images/index/task_maoqiu.png" alt="" class="task_img" v-else-if="index==1">
              <img src="./images/index/task_cat.png" alt="" class="task_img" v-else>
              <div class="info">
                <div class="item1">{{item.taskName}}</div>
                <div class="item2">
                  <img :src="item.awardsImg|filter" alt="" class="task_fish">
                  <span>{{item.awardsName}}</span>
                </div>
              </div>
              <div class="btn">
                <div @click="slideclick(index,item)">{{index==0?'如何喂猫':(index==1?'如何逗猫':'如何迅速获得鱼干')}}></div>
                <img src="./images/index/task_complete.png" alt="" class="task_btn" v-if="item.status==0" @click="gotocat(item)">
                <img src="./images/index/task_gain.png" alt="" class="task_btn" v-else-if="item.status==1" @click="gettaskaward(item)">
                <img src="./images/index/task_gained.png" alt="" class="task_btn" v-else                                                                                                                                                        >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <drop-down ref="dropDown" :rules-explain="rulesExplain" @show-eggs-info="showDefaultEggs()"></drop-down>
    <common-pop :pop-type="popType" :have-gif="haveGif" :is-show-pop="isShowPop" :awards-list="awardsList"
                @close-pop="isShowPop=false" @get-more="getExtraAward"></common-pop>
    <slide ref="slide" :task="taskItem"></slide>
  </div>
</template>
<script type="text/javascript">
  import {activityInfo,receiveAwards,receiveExtAwards} from '../utils/api'

  export default {
    name: 'index',
    data() {
      return {
        isEggsInfoShow: false,
        styleItemsArr: [],
        activedLev: 1,
        currentLev: 0,
        currentIndex: null,
        currentItem: {},
        awardsList: [{

        }],
        popType: 0,
        endTime: '',
        countTime: null,
        rulesInfo: '',
        rulesExplain: '',
        haveGif: false,
        isHitted: false,
        progresswidth:[0,'13%','31%','48.5%','66%','84.5%','100%'],
        isShowPop: false,
        activityInfoData:null,
        progressValue:0,
        taskItem:null
      }
    },
    components: {
      rule: () => import('../components/rule'),
      commonPop: () => import('../components/commonPop'),
      dropDown: () => import('./dropDown'),
      slide: () => import('../components/slide'),
    },
    async beforeRouteEnter(to, from, next) {
      const {code, data} = await activityInfo()
      if (code === 200) {
        if (data.state==1) {
          next(vm => {
            vm.activityInfoData=data
            vm.rulesInfo = vm.getActTime(data)
            vm.rulesExplain = data.rulesExplain
            vm.endTime = data.endTime
            vm.countDown(data.countdown)
          })
        } else if (data.countdown) {
          next({path: '/'})
        } else {
          next({path: '/after'})
        }
      } else {
        next()
      }
    },
    methods: {
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0201002053')// H5平台-撸猫活动-返回按钮点击(跳转平台首页)
        location.href= window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      },
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        this.timer = setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(this.timer)
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          // let countDay = day >= 10 ? day : '0' + day
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day >= 2) {
            this.countTime = 0
          } else if (day > 0) {
            this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
      },
      slideclick(index,item){
        this.taskItem=item
        GLOBALS.marchSetsPoint('A_H5PT0201002056',{
          task_id:item.taskId,
          task_name:item.taskName
        })//H5平台-撸猫活动-每日任务任务攻略按钮点击
        this.$refs.slide&&this.$refs.slide.showPop(index)
      },
      getActTime(activityInfoData){
        if(activityInfoData){
          return `${activityInfoData.beginDate.split('-').splice(1).join('.')}-${activityInfoData.endDate.split('-').splice(1).join('.')}`
        }else{
          return ''
        }
      },
      async gettaskaward(item){
        GLOBALS.marchSetsPoint('A_H5PT0201002057',{
          task_id:item.taskId,
          task_name:item.taskName
        })//H5平台-撸猫活动-每日任务领取按钮点击
        try{
          const {code, data} = await receiveAwards({value:item.taskId})
          if(code==200){
            this.awardsList=[{
              awardsType:item.awardsType,
              awardsName:item.awardsName
            }]
            this.haveGif=data==1//表示有额外奖励领取
            this.isShowPop=true
          }else{
            this.$toast.show({
              message:'领取异常',
              duration:2000
            })
          }
        }catch (e) {
          this.$toast.show({
            message:'领取异常',
            duration:2000
          })
        }finally {
          this.getActivityInfo()
        }

      },
      async getExtraAward(isbtn=true){
        if(isbtn){
          GLOBALS.marchSetsPoint('A_H5PT0201002059')//H5平台-撸猫活动-额外奖励icon点击
        }
        try{
          const {code, data} = await receiveExtAwards()
          if(code==200){
            GLOBALS.marchSetsPoint('A_H5PT0201002060')//H5平台-撸猫活动-额外奖励领取成功弹窗加载完成
            this.awardsList=[{
              awardsType:1,
              awardsName:`${this.activityInfoData.extAwardInfo.awardsNum}${this.activityInfoData.extAwardInfo.awardsName}`
            }]
            this.haveGif=false
            this.isShowPop=true
          }else{
            this.$toast.show({
              message:'领取异常',
              duration:2000
            })
          }
        }catch (e) {
          this.$toast.show({
            message:'领取异常',
            duration:2000
          })
        }finally {
          this.getActivityInfo()
        }
      },
      async getActivityInfo(){
        const {code, data} = await activityInfo()
        if (code === 200) {
          if (data.state==1) {
            this.activityInfoData=data
            this.rulesInfo = this.getActTime(data)
            this.rulesExplain = data.rulesExplain
            this.endTime = data.endTime
            this.countDown(data.countdown)
          }else if (data.countdown) {
            next({path: '/'})
          } else {
            next({path: '/after'})
          }
        }

      },
      gotocat(item){
        GLOBALS.marchSetsPoint('A_H5PT0201002055',{
          task_id:item.taskId,
          task_name:item.taskName
        })//H5平台-撸猫活动-每日任务去完成按钮点击
        location.href= `https://wap.beeplaying.com/petcat?channel=${localStorage.getItem('APP_CHANNEL')}`
      },
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0201',{
        source_address:GLOBALS.getUrlParam('from')
      })   //H5平台-撸猫活动-页面加载完成
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";
  @import "./css/index.less";
</style>
