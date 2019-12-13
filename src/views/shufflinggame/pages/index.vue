<template>
  <div class="eggs-container" :class="{header1:level==1,header2:level==2,header3:level==3}">
    <!--返回-->
    <img src="../images/back.png" class="e-back" @click.stop="back">
    <!--规则-->
    <rule :ruleMain="actData.beginDate+'~'+actData.endDate+'，'+actData.rankDate" v-if="actData"></rule>
    <game ref="game"></game>
    <!--&lt;!&ndash;礼包&ndash;&gt;-->
    <package ref="package"></package>
    <!--攻略-->
    <gonglue></gonglue>
    <!--走马灯-->
    <message ref="message"></message>
    <div class="btn">
      <!--头部的信息-累计翻牌点、下级奖励-->
      <div class="top_container">
        <div class="time" v-if="actData">{{actData.beginDate.split(' ')[0]}} ~ {{actData.endDate.split(' ')[0]}}</div>
      </div>
      <div class="tabs" :class="{header1:level==1,header2:level==2,header3:level==3}">
        <div class="item" v-for="item in 3" @click="switchTab(item)"></div>
      </div>
      <div class="eggs-info">
        <h4>可能翻出</h4>
        <!--<scroll :data="awards">-->
        <div class="container">
          <scroll :data="awards">
            <ul>
              <!--<li v-for="(item,index) in eggsInfoList" :key="index">{{item.awardsName}}</li>-->
              <li v-for="item in awards">{{item.awardsName}}</li>
            </ul>
          </scroll>
        </div>
        <!--</scroll>-->
      </div>
      <div class="record" @click="showrecord" :class="{header1:level==1,header2:level==2,header3:level==3}">已翻奖励</div>
      <!--重置-->
      <div class="reset" :class="{header1:level==1,header2:level==2,header3:level==3}" @click="resetClick"></div>
    </div>
    <!--翻牌区域-->
    <card :level="level" :isReset="isReset" @reset="isReset=false" :cardData="styleItemsArr"  v-if="userData&&styleItemsArr.length" @refreshUserInfo="getUserInfo" @refreshCardInfo="getBetProgress" @getawards="getcardawards" :isBeginAnimate="isBeginAnimate"></card>
    <!--获得更多翻牌点-->
    <drop-down ref="dropDown" :level="level" :data="userData" v-if="!isEnd&&userData" @getUserInfo="getUserInfo" @gotoplay="gotoplay"></drop-down>
    <!--翻牌点记录-->
    <record ref="record" @package="$refs.dropDown.handleTab(0)"></record>
    <!--通用弹窗1-10场景-->
    <com-pop v-if="flag" :from="flag" :level="level" @close="closecomPop" @sureGrade="sureGrade" @package="openpackage" @sureCard="sureCard" :carddata="cardawardsdata" @card="isReset=true" @gotoplay="gotoplay" @downpackage="$refs.dropDown.outHandleTab(0)" :rank="rank"></com-pop>
  </div>
</template>
<script type="text/javascript">
import { betProgress,userInfo,gameUpgradeStage,gameResetProgress,betAwards} from '../utils/api'
export default {
  name: 'index',
  data () {
    return {
      styleItemsArr: [],
      level:1,
      isReset:false,
      isshowrecord:false,
      flag:0,//1.排行榜已发榜fail 2.排行榜已发榜success 3.翻倍点不足 4.正常奖励 5.翻倍开出 6.获得翻倍卡 7.重置-翻倍卡-提醒弹窗 8.新的翻牌点 待领取
      userData:null,
      cardawardsdata:[],
      isBeginAnimate:false,//牌是否要有开场动画
      isEnd:false,
      countdown: {// 倒计时
        time: ''
      },
      data:null,
      actData:null,
      haveDoubleCard:false,
      rank:0
    }
  },
  computed:{
    awards(){
      if(this.data){
        let item=this.data.filter(item=>item.stage==this.level)[0]
        return item&&item.awardsList||[]
      }else{
        return []
      }
    }
  },
  components: {
    game: () => import('../components/game'),
    rule: () => import('../components/rule'),
    message: () => import('../components/message'),
    dropDown: () => import('./dropDown'),
    package: () => import('../components/package'),
    gonglue: () => import('../components/gonglue'),
    card: () => import('../components/card'),
    record: () => import('../components/record'),
    comPop:() => import('../components/comPop'),
    scroll:() => import('../components/scroll'),
  },
  async beforeRouteEnter (to, from, next) {
    next()
  },
  methods: {
    async getActInfo(){
      let {code,data}=(await this.axios.post('//ops-api.beeplaying.com/ops/api/open-card/activity-info')).data
      if(code==200){
        this.actData=data
        this.isEnd=data.state!=1
        !this.countdown.time && data.countdown && GLOBALS.remainingTime(
          this,
          data.countdown,
          this.countdown
        )
      }
    },
    async sureCard(flag){//flag1 有翻倍卡-确定重置 flag2 有翻倍卡-确定升级
      if(flag==1){//确定重置
        let {code,data,message}=await gameResetProgress(this.level)
        if(code==200){
          await this.getBetProgress()
          await this.getUserInfo()
          setTimeout(()=>{
            this.isReset=true
          },1000)
        }else{
          this.$toast.show({
            message:message,
            duration:2000
          })
        }
      }else{//确定升级
        if(this.level==1){
          this.flag=9
        }else{
          this.flag=10
        }
      }
    },
    rankClick(flag){
      GLOBALS.marchSetsPoint(flag?'A_H5PT0156001771':'A_H5PT0156001767')//H5平台-翻牌活动-中间区域-排行榜按钮点击
      this.$router.push('/after')
    },
    //恭喜开出和牌点数不足弹窗
    getcardawards(arr){
      if(arr){
        this.cardawardsdata=arr
        if(arr.length==2){
          if(arr.filter(item=>item.awardsType=='fbk').length){
            this.flag=6
          }else{
            this.flag=9
          }
        }else{
          if(arr[0].doubleState){
            this.flag=5
          }else{
            this.flag=4
          }
        }
        this.getBetProgress()
      }else{
        this.flag=3
      }
    },
    //重置按钮点击
    async resetClick(){
      GLOBALS.marchSetsPoint('A_H5PT0156001773')//H5平台-翻牌活动-中间区域-重置按钮点击
      if(this.haveDoubleCard){//拥有翻倍卡
        this.flag=7
      }else{
        let {code,data,message}=await gameResetProgress(this.level)
        if(code==200){
          await this.getBetProgress()
          setTimeout(()=>{
            this.isReset=true
          },1000)
        }else{
          this.$toast.show({
            message:message,
            duration:2000
          })
        }
      }
    },
    //升级按钮点击
    async gameUpgradeStageClick(){
      if(this.userData.nextStageConsumeNum>this.userData.remanentNum){
        this.flag=8//不够升级
      }else{
        if(this.userData.haveDoubleCard){//拥有翻倍卡
          this.flag=11
        }else{
          if(this.level==1){
            this.flag=9
          }else{
            this.flag=10
          }
        }
      }
    },
    //确定升级
    async sureGrade(){
      let {code,data,message}=await gameUpgradeStage()
      if(code==200){
        this.flag=2
        //活动信息
        this.getUserInfo()
        //获取翻牌数据
        this.getBetProgress()
      }else{
        this.$toast.show({
          message:message,
          duration:2000
        })
      }
    },
    //活动信息
    async getUserInfo(ismount=false){
      let {code,data}=await userInfo()
      if(code==200){
        this.userData=data
        if(this.isEnd){
          GLOBALS.marchSetsPoint(data.myRank?'A_H5PT0156002617':'A_H5PT0156002618')
          if(data.myRank==0){
            this.flag=1
          }else{
            data.currentAwards.split('+').map(item=>{
              if(item.includes('金叶')||item.includes('京东')){
                this.cardawardsdata.push({
                  awardsType:item.includes('金叶')?'jyz':'jdk',
                  awardsName:item
                })
              }
            })
            this.rank=data.myRank
            this.flag=2
          }
        }else{
          if(ismount&&data.gameUnreceive){
            GLOBALS.marchSetsPoint('A_H5PT0156002615')
            this.flag=8
          }
        }
      }
    },
    //关闭通用弹窗
    async closecomPop(flag){
      //活动信息
      await this.getUserInfo()
      // //获取翻牌数据
      // await this.getBetProgress()
      this.flag=0
    },
    //H5平台-翻牌活动-已翻奖励按钮点击
    showrecord(){
      GLOBALS.marchSetsPoint('A_H5PT0156002608')//H5平台-翻牌活动-已翻奖励按钮点击
      this.$refs.record.showPop()
    },
    //点击返回
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0156001768')   //点击返回
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    //获取翻牌数据
    async getBetProgress () {
      const { code, data } = await betProgress(this.level)
      if (code === 200) {
        this.haveDoubleCard=data.haveDoubleCard
        this.styleItemsArr = data.progressList
        if(location.href.includes('from=')){//从入口进入动效条件无免增1翻牌点且牌中无成功翻开的数据
          this.isBeginAnimate=this.flag!=1&&data.filter(item=>item.status).length==0
        }
      }
    },
    async getBetAwards() {
      const {code, data} = await betAwards()
      if (code === 200) {
        this.data = data
      }
    },
    gotoplay(){
      this.$refs.game.showPop()
    },
    openpackage(){
      this.$refs.package.showPop()
    },
    async switchTab(item){
      //获取翻牌数据
      let points=['A_H5PT0156002605','A_H5PT0156002606','A_H5PT0156002607']
      GLOBALS.marchSetsPoint(points[item-1])
      if(this.level!=item){
        this.level=item
        await this.getBetProgress()
      }
    }
  },
  async mounted () {
    localStorage.setItem('card_level',this.level)
    GLOBALS.marchSetsPoint('P_H5PT0156',{
      source_address:GLOBALS.getUrlParam('from')||'',
      classify:this.level
    })//H5平台-翻牌活动-页面加载完成
    await this.getActInfo()
    //活动信息
    await this.getUserInfo(true)
    //获取翻牌数据
    await this.getBetProgress()
    await this.getBetAwards()
    //活动地址：shufflinggame.html?from=index
    history.pushState({}, '', location.href.split(/\?|\&/)[0])//shufflinggame.html
    // GLOBALS.marchSetsPoint('A_H5PT0075001453')   // H5平台-砸金蛋-活动进行中-页面
  },
  watch: {
    'countdown.time': function (val) {
      if (!val) {
        this.getActInfo()
      }
    },
    level(val){
      localStorage.setItem('card_level',val)
    }
  }
}
</script>
<style lang="less" scoped>
@import "./css/index.less";
</style>
