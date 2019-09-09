<template>
  <div class="eggs-container" :class="{header1:level==1,header2:level==2,header3:level==3}">
    <!--返回-->
    <img src="../images/back.png" class="e-back" @click.stop="back">
    <!--规则-->
    <rule></rule>
    <!--礼包-->
    <package></package>
    <!--攻略-->
    <gonglue></gonglue>
    <!--走马灯-->
    <message ref="message"></message>
    <div class="btn">
      <!--头部的信息-累计翻牌点、下级奖励-->
      <div class="top_container">
        <div class="top_containeritem" @click="showrecord">
          <div class="r-item1">翻牌点</div>
          <div class="r-item1">记录</div>
        </div>
        <div class="top_containeritem">
          <div class="r-item1">剩余翻牌点：</div>
          <div class="r-item2">{{userData&&userData.remanentNum||0}}</div>
        </div>
        <div class="top_containeritem" @click.stop="rankClick(0)">
          <div class="r-item1">下级奖励：</div>
          <div class="r-item2">{{userData&&userData.nextAwards||''}}</div>
        </div>
      </div>
      <!--排行榜-->
      <img src="../images/rank.png" class="rank" @click.stop="rankClick(1)">
      <!--文案-->
      <div class="index_info">翻出翻倍卡后,再翻出任意奖品,翻出奖励翻倍!</div>
      <!--升级场次按钮-->
      <div class="grade_btn" :class="{header1:level==1,header2:level==2,header3:level==3}" v-if="userData">
        <div class="txt" v-if="level<3" @click="gameUpgradeStageClick">用<i>{{userData.nextStageConsumeNum}}翻牌点</i>升级中级场</div>
        <div class="txt" v-else>当前最高场</div>
      </div>
      <!--重置-->
      <div class="reset" :class="{header1:level==1,header2:level==2,header3:level==3}" @click="resetClick"></div>
    </div>
    <!--翻牌区域-->
    <card :level="level" :isReset="isReset" @reset="isReset=false" :cardData="styleItemsArr"  v-if="userData&&styleItemsArr.length" @refreshUserInfo="getUserInfo" @refreshCardInfo="getBetProgress" @getawards="getcardawards" :isBeginAnimate="isBeginAnimate"></card>
    <!--获得更多翻牌点-->
    <drop-down ref="dropDown" :data="userData" v-if="userData" @getUserInfo="getUserInfo"></drop-down>
    <!--翻牌点记录-->
    <record v-if="isshowrecord" :show="isshowrecord" @close="isshowrecord=false" @package="$refs.dropDown.handleTab(0)"></record>
    <!--通用弹窗1-10场景-->
    <com-pop v-if="flag" :from="flag" :level="level" @close="closecomPop" @sureGrade="sureGrade" @package="$refs.dropDown.handleTab(0)" @sureCard="sureCard" :carddata="cardawardsdata" @card="isReset=true"></com-pop>
  </div>
</template>
<script type="text/javascript">
import { betProgress,userInfo,gameUpgradeStage,gameResetProgress} from '../utils/api'
export default {
  name: 'index',
  data () {
    return {
      styleItemsArr: [],
      level:1,
      isReset:false,
      isshowrecord:false,
      flag:0,//1.首次赠送 2.恭喜升级 3.翻倍点不足 4.正常奖励 5.翻倍开出 6.获得翻倍卡 7.重置-翻倍卡-提醒弹窗 8.抱歉不能升级 9.是否升级中级场 10.是否升级高级场 11 升级-翻倍卡-提醒弹窗
      userData:null,
      cardawardsdata:[],
      isBeginAnimate:false,//牌是否要有开场动画
    }
  },
  components: {
    rule: () => import('../components/rule'),
    message: () => import('../components/message'),
    dropDown: () => import('./dropDown'),
    package: () => import('../components/package'),
    gonglue: () => import('../components/gonglue'),
    card: () => import('../components/card'),
    record: () => import('../components/record'),
    comPop:() => import('../components/comPop'),
  },
  async beforeRouteEnter (to, from, next) {
    next()
  },
  methods: {
    async sureCard(flag){//flag1 有翻倍卡-确定重置 flag2 有翻倍卡-确定升级
      if(flag==1){//确定重置
        let {code,data,message}=await gameResetProgress()
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
      }else{//确定升级
        if(this.level==1){
          this.flag=9
        }else{
          this.flag=10
        }
      }
    },
    rankClick(flag){
      GLOBALS.marchSetsPoint(flag?'A_H5PT0156001771':'1767')//H5平台-翻牌活动-中间区域-排行榜按钮点击
      this.$router.push('/after')
    },
    //恭喜开出和牌点数不足弹窗
    getcardawards(arr){
      if(arr){
        this.cardawardsdata=arr
        if(arr.length==2){
          this.flag=6
        }else{
          if(arr[0].doubleState){
            this.flag=5
          }else{
            this.flag=4
          }
        }
      }else{
        this.flag=3
      }
    },
    //重置按钮点击
    async resetClick(){
      GLOBALS.marchSetsPoint('A_H5PT0156001773')//H5平台-翻牌活动-中间区域-重置按钮点击
      if(this.userData.haveDoubleCard){//拥有翻倍卡
        this.flag=7
      }else{
        let {code,data,message}=await gameResetProgress()
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
    async getUserInfo(){
      let {code,data}=await userInfo()
      if(code==200){
        this.userData=data
        this.level=data.stage
        if(data.firstLoad){//首次进入免增1翻牌点
          this.flag=1
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
    //展示翻牌点记录
    showrecord(){
      GLOBALS.marchSetsPoint('A_H5PT0156001766')//H5平台-翻牌活动-顶部区域-翻牌点记录点击
      this.isshowrecord=true
    },
    //点击返回
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0156001768')   //点击返回
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    //获取翻牌数据
    async getBetProgress () {
      const { code, data } = await betProgress()
      if (code === 200) {
        this.styleItemsArr = data
        if(location.href.includes('from=')){//从入口进入动效条件无免增1翻牌点且牌中无成功翻开的数据
          this.isBeginAnimate=this.flag!=1&&data.filter(item=>item.status).length==0
        }
      }
    }
  },
  async mounted () {
    location.href.includes('from=')&&GLOBALS.marchSetsPoint('P_H5PT0156',{
      source_address:GLOBALS.getUrlParam('from')||''
    })//H5平台-翻牌活动-页面加载完成
    //活动信息
    await this.getUserInfo()
    //获取翻牌数据
    await this.getBetProgress()
    //活动地址：shufflinggame.html?from=index
    history.pushState({}, '', location.href.split(/\?|\&/)[0])//shufflinggame.html
    // GLOBALS.marchSetsPoint('A_H5PT0075001453')   // H5平台-砸金蛋-活动进行中-页面
  }
}
</script>
<style lang="less" scoped>
@import "./css/index.less";
</style>
