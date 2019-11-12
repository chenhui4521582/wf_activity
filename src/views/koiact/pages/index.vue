<template>
  <div class="eggs-container" @click.prevent="isEggsInfoShow=false">
    <rule :rule-main="rulesInfo" from="0" ref="rule"></rule>
    <rule from="1" ref="games"></rule>
    <rule from="2" :lotteryDate="activityInfoData&&activityInfoData.lotteryDate" ref="openprize"></rule>
    <rule from="3" ref="lotteryrecord"></rule>
    <rule from="4" ref="lessstar"></rule>
    <rule from="7" ref="onlysign"></rule>
    <rule from="8" ref="onlygametask"></rule>
    <rule from="9" ref="signall"></rule>
    <rule from="10" ref="gametaskall"></rule>
    <div class="header1">
      <img src="./images/index/back.png" class="e-back" @click.stop="back">
      <div class="rule_icon" @click="$refs.rule.showPop()">活动规则</div>
      <div class="open_prize" @click="$refs.openprize.showPop()">锦鲤开奖</div>
      <h4 class="e-time e-time-act" v-if="activityInfoData">{{activityInfoData.activityDateRange}}</h4>
    </div>
    <div class="header3" v-if="activityInfoData&&activityInfoData.signInfoList">
      <div class="e-items">
        <div class="sign-container">
          <div class="container">
            <div class="item" v-for="(item,index) in activityInfoData.signInfoList">
              <div class="leaf_div">
                <img src="./images/index/leaf_gray.png" alt=""  class="leaf" v-if="!item.status">
                <img src="./images/index/leaf_light.png" alt=""  class="leaf leaf_light" v-else>
              </div>
              <div class="leaf_info">
                <div class="item">{{item.date}}</div>
              </div>
            </div>
          </div>
          <div class="progress">
            <div class="progress_bar":style="{width:progresswidth[activityInfoData.currentDay-1]}"></div>
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
                      <div class="rate">{{item.finishnum}}/{{item.totalnum}}</div>
                      <div class="progress_bar":style="{width:item.finishnum*100/item.totalnum+'%'}"></div>
                    </div>
                    <img src="./images/index/star.png" alt="" class="task_star">
                    <span>x1</span>
                  </div>
                </div>
                <div class="btn" :class="{btn0:item.status==0,btn1:item.status==1,btn2:item.status==2}" @click="taskclick(item)">
                  {{item.status==0?(item.sort==1?'去签到':'去完成'):(item.status==1?'点击领取':(item.sort==1?'已签到':'已完成'))}}
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
          <div class="item">当前累计打卡：<i>{{activityInfoData.cumulativeDays}}天</i></div>
          <div class="item">当前解锁锦鲤为：<i>{{activityInfoData.currentKoiName||'无'}}</i> {{activityInfoData.currentKoiAwardName||''}}</div>
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
          <div class="item">当前金星数量：<i>{{activityInfoData.currentStarNum}}颗</i></div>
        </div>
        <div class="container">
          <img src="./images/index/light1.png" alt="" class="turntable-light">
          <img src="./images/index/light2.png" alt="" class="turntable-light">
          <lottery :beginAwardData="activityInfoData.starAwardInfoVos" :starnum="activityInfoData.currentStarNum" @lessstar="$refs.lessstar.showPop()" @refresh="getActivityInfo"></lottery>
        </div>
        <div class="record" @click="$refs.lotteryrecord.showPop()">我的中奖记录>></div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {activityInfo,betProgress} from '../utils/api'

  export default {
    name: 'index',
    data() {
      return {
        rulesInfo: '',
        progresswidth:[0,'14%','31%','48.5%','66%','84.5%','100%'],
        activityInfoData:null,
      }
    },
    components: {
      rule: () => import('../components/rule'),
      lottery: () => import('../components/lottery'),
    },
    methods: {
      back() {
        history.back(-1)
      },
      async getActivityInfo(){
        const {code, data} = await activityInfo()
        if (code === 200) {
          if (data.state==1) {
            data.taskInfos=[{
              taskName:'每日活动页签到1次',
              status:data.todaySignInStatus?2:0,
              sort:1,
              finishnum:data.todaySignInStatus?1:0,
              totalnum:1
            },{
              taskName:`每日游戏累计消耗${data.configConsumption}金叶`,
              status:data.todayConsumptionStatus,
              sort:2,
              finishnum:data.todayConsumption,
              totalnum:data.configConsumption
            }]
            this.activityInfoData=data
            this.rulesInfo = data.activityDateRange
          }
        }
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
      },
      async taskclick(item){
        if(item.status==2) return
        if(item.sort==1){//去签到
          GLOBALS.marchSetsPoint('A_H5PT0211002231')
          let {code,data}=await betProgress({value:1})
          if(code==200){
            GLOBALS.marchSetsPoint('A_H5PT0211002233')
            if(this.activityInfoData.taskInfos.filter(item=>item.status==2).length==1){
              this.$refs.signall.showPop()
            }else{
              this.$refs.onlysign.showPop()
            }
          }
          this.getActivityInfo()
        }else{
          if(item.status==0){//去完成
            GLOBALS.marchSetsPoint('A_H5PT0211002232')
            this.$refs.games.showPop()
          }else{//点击领取
            GLOBALS.marchSetsPoint('A_H5PT0211002234')
            let {code,data}=await betProgress({value:2})
            if(code==200){
              if(this.activityInfoData.taskInfos.filter(item=>item.status==2).length==1){
                this.$refs.gametaskall.showPop()
              }else{
                this.$refs.onlygametask.showPop()
              }
            }
            this.getActivityInfo()
          }
        }
      }
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0211',{
        source_address:GLOBALS.getUrlParam('from')||''
      })
      this.getActivityInfo()
    }
  }
</script>
<style lang="less" scoped>
  @import "../../../common/css/base.css";
  @import "./css/index.less";
</style>
