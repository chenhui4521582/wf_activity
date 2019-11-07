<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <rule :rule-main="rulesInfo" from="0" ref="rule"></rule>
    <div class="header1">
      <img src="./images/index/back.png" class="e-back" @click.stop="back">
      <div class="rule_icon" @click="$refs.rule.showPop()">活动规则</div>
      <div class="open_prize">锦鲤开奖</div>
      <h4 class="e-time e-time-act" v-if="activityInfoData">{{activityInfoData.activityDateRange}}</h4>
    </div>
    <div class="header3" v-if="activityInfoData&&activityInfoData.timeAxisInfos">
      <div class="e-items">
        <div class="sign-container">
          <div class="container">
            <div class="item" v-for="(item,index) in 7">
              <div class="leaf_div">
                <img src="./images/index/leaf_gray.png" alt=""  class="leaf" v-if="activityInfoData.timeAxisInfos[index].taskStatus==0">
                <img src="./images/index/leaf_light.png" alt=""  class="leaf leaf_light" v-else>
              </div>
              <div class="leaf_info">
                <div class="item">{{activityInfoData.timeAxisInfos[index].taskDate}}</div>
              </div>
            </div>
          </div>
          <div class="progress">
            <div class="progress_bar":style="{width:progresswidth[activityInfoData.currentDay]}"></div>
          </div>
        </div>
        <div class="task-container" :class="{complete:activityInfoData.taskInfos.filter(item=>item.status==2).length==2}">
          <template v-if="activityInfoData.taskInfos.filter(item=>item.status==2).length<2">
            <div class="title">
              今日打卡小任务 <i>(全部完成即打卡成功)</i>
            </div>
            <div class="task_list">
              <div class="item" v-for="(item,index) in activityInfoData.taskInfos">
                <div class="info">
                  <div class="item1"><i></i>{{item.taskName}}</div>
                  <div class="item2">
                    <div class="progress">
                      <div class="progress_bar":style="{width:progresswidth[0]}"></div>
                    </div>
                    <img src="./images/index/star.png" alt="" class="task_star">
                    <span>x{{item.awardsName}}</span>
                  </div>
                </div>
                <div class="btn" :class="{btn0:item.status==0,btn1:item.status==1,btn2:item.status==2}">
                  {{item.status==0?'去完成':(item.status==1?'点击领取':'已完成')}}
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="item">今日打卡任务已完成</div>
            <div class="item">记得明天再来哦~</div>
          </template>
        </div>
      </div>
      <div class="draw_koi">
        <div class="title">
          <img src="./images/index/left.png" alt="">
          <span>累计打卡抽锦鲤</span>
          <img src="./images/index/right.png" alt="">
        </div>
        <div class="info">
          <div class="item">当前累计打卡：<i>2天</i></div>
          <div class="item">当前解锁锦鲤为：<i>绿锦鲤</i> 50元话费</div>
        </div>
        <div class="container">
          <div class="container_div">
            <div>
              <div class="item" v-for="item in activityInfoData.koiAwardInfoVos">
                <div class="item_img" :class="{bg00:item.koiLevel==2&&item.currentUserStatus==0,bg01:item.koiLevel==2&&item.currentUserStatus==1,bg10:item.koiLevel==3&&item.currentUserStatus==0,bg11:item.koiLevel==3&&item.currentUserStatus==1,bg20:item.koiLevel==4&&item.currentUserStatus==0,bg21:item.koiLevel==4&&item.currentUserStatus==1,bg30:item.koiLevel==5&&item.currentUserStatus==0,bg31:item.koiLevel==5&&item.currentUserStatus==1,bg40:item.koiLevel==6&&item.currentUserStatus==0,bg41:item.koiLevel==6&&item.currentUserStatus==1,bg50:item.koiLevel==7&&item.currentUserStatus==0,bg51:item.koiLevel==7&&item.currentUserStatus==1}">
                  <div class="item_sec1">累计打卡{{item.koiLevel}}天</div>
                  <div class="item_sec2">
                    {{getkoiname(item.koiLevel)}}
                  </div>
                  <div class="item_sec3">
                    <div class="item_sec3_item">{{item.awardName}}<br>抽{{item.winnersNum}}位锦鲤</div>
                    <div class="item_sec3_item">{{item.currentUserStatus==0?'待解锁':'已参与'}}</div>
                  </div>
                </div>
                <div class="info1">当前参与人数：{{item.currentNum}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="turntable">
        <div class="title"><img src="./images/index/left.png" alt=""><span>每日大赚盘 100%中奖</span><img src="./images/index/right.png" alt=""></div>
        <div class="info">
          <div class="item">当前金星数量：<i>6颗</i></div>
        </div>
        <div class="container">

        </div>
      </div>
    </div>
    <common-pop :pop-type="popType" :have-gif="haveGif" :is-show-pop="isShowPop" :awards-list="awardsList"
                @close-pop="isShowPop=false" @get-more="getExtraAward"></common-pop>
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
        progresswidth:[0,'14%','31%','48.5%','66%','84.5%','100%'],
        isShowPop: false,
        activityInfoData:null,
        progressValue:0,
        taskItem:null
      }
    },
    components: {
      rule: () => import('../components/rule'),
      commonPop: () => import('../components/commonPop'),
    },
    async beforeRouteEnter(to, from, next) {
      const {code, data} = await activityInfo()
      data.timeAxisInfos=[{
        taskDate:'11.1',
        taskStatus:1
      },{
        taskDate:'11.2',
        taskStatus:0
      },{
        taskDate:'11.3',
        taskStatus:0
      },{
        taskDate:'11.4',
        taskStatus:0
      },{
        taskDate:'11.5',
        taskStatus:0
      },{
        taskDate:'11.6',
        taskStatus:0
      },{
        taskDate:'11.7',
        taskStatus:0
      }]
      data.taskInfos=[{
        taskName:'每日活动页签到1次',
        status:2,
        awardsName:'1'
      },{
        taskName:'每日游戏累计消耗5000金叶',
        status:2,
        awardsName:'2'
      }]
      if (code === 200) {
        // if (data.state==1) {
          next(vm => {
            vm.activityInfoData=data
            vm.rulesInfo = data.activityDateRange
            // vm.rulesExplain = data.rulesExplain
            // vm.endTime = data.endTime
            // vm.countDown(data.countdown)
          })
        // }
        // else if (data.countdown) {
        //   next({path: '/'})
        // } else {
        //   next({path: '/after'})
        // }
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
      getkoiname(koiLevel){
        switch (koiLevel) {
          case 2:return '橙锦鲤';break;
          case 3:return '蓝锦鲤';break;
          case 4:return '白锦鲤';break;
          case 5:return '绿锦鲤';break;
          case 6:return '红锦鲤';break;
          case 7:return '紫锦鲤';break;
        }
      }
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
