<template>
  <div class="eggs-container">
    <!--返回-->
    <img src="../images/back.png" class="e-back" @click.stop="back">
    <!--规则-->
    <rule></rule>
    <!--翻牌点记录-->
    <record @package="$refs.dropDown.handleTab(0)"></record>
    <img src="../images/title.png" alt="" class="header-title">
    <h4 class="e-time">活动时间：2019年10月24日-10月31日</h4>
    <div class="container">
      <div class="container_top">
        <div class="container_top_all"></div>
        <div class="container_top_content">
          <div class="container_top_item" v-for="(item,index) in currentItemRiches">
            <div class="item">
              <div class="pic" :class="{level2:level==2,level3:level==3,level4:level==4}">
                <img :src="item.awardImage" alt="">
              </div>
              <div class="txt">{{item.awardName}}</div>
            </div>
            <div class="item">剩余1个</div>
          </div>
        </div>
      </div>
      <div class="container_bottom">
        <swiper :options="swiperOption" class="swiper-no-swiping" ref="mySwiper" v-if="list.length">
          <swiper-slide v-for="(item,index) in list" :key="index">
            <img :src="`${require(`../images/rich_pic${index+1}.png`)}`" alt="">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
        <div class="swiper-button-prev" slot="button-prev" @click="prevClick"></div>
        <div class="swiper-button-next" slot="button-next" @click="nextClick"></div>
      </div>
    </div>
    <div class="bottombtn">
      <div class="item">
        <div class="btn_item">
          <i>随机开启1次</i>(消耗2张福袋券）
        </div>
        <div class="btn_item">
          <i>随机开启10次</i>(消耗20张福袋券）
        </div>
      </div>
      <div class="item">当前剩余福袋券：40张</div>
    </div>
    <!--获得更多翻牌点-->
    <drop-down ref="dropDown" :data="userData" @getUserInfo="getUserInfo"></drop-down>
  </div>
</template>
<script type="text/javascript">
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
      isEnd:false,
      countdown: {// 倒计时
        time: ''
      },
      list:[{
        level:1,
        list:[{
          awardName:'2000京东卡',
          awardImage:`${require('../images/demoimg/jd.png')}`
        },
          {
            awardName:'2000话费券',
            awardImage:`${require('../images/demoimg/bill.png')}`
          },
          {
            awardName:'2000鱼干',
            awardImage:`${require('../images/demoimg/fish.png')}`
          },
          {
            awardName:'2000金叶子',
            awardImage:`${require('../images/demoimg/leaf.png')}`
          }]
      },{
        level:2,
        list:[{
          awardName:'3000京东卡',
          awardImage:`${require('../images/demoimg/jd.png')}`
        },
          {
            awardName:'3000话费券',
            awardImage:`${require('../images/demoimg/bill.png')}`
          },
          {
            awardName:'3000鱼干',
            awardImage:`${require('../images/demoimg/fish.png')}`
          },
          {
            awardName:'3000金叶子',
            awardImage:`${require('../images/demoimg/leaf.png')}`
          }]
      },{
        level:3,
        list:[{
          awardName:'4000京东卡',
          awardImage:`${require('../images/demoimg/jd.png')}`
        },
          {
            awardName:'4000话费券',
            awardImage:`${require('../images/demoimg/bill.png')}`
          },
          {
            awardName:'4000鱼干',
            awardImage:`${require('../images/demoimg/fish.png')}`
          },
          {
            awardName:'4000金叶子',
            awardImage:`${require('../images/demoimg/leaf.png')}`
          }]
      },{
        level:4,
        list:[{
          awardName:'5000京东卡',
          awardImage:`${require('../images/demoimg/jd.png')}`
        },
          {
            awardName:'5000话费券',
            awardImage:`${require('../images/demoimg/bill.png')}`
          },
          {
            awardName:'5000鱼干',
            awardImage:`${require('../images/demoimg/fish.png')}`
          },
          {
            awardName:'5000金叶子',
            awardImage:`${require('../images/demoimg/leaf.png')}`
          }]
      }],
      options: {
        // autoplay:true,
        slidesPerView: 'auto',
        spaceBetween: 30,
        loop: true,
        loopFillGroupWithBlank: true,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: false
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        centeredSlides: true
      },
      timer:null
    }
  },
  computed:{
    currentItemRiches(){
      let item=this.list.filter(item=>item.level==this.level)[0]
      return item&&item.list||[]
    },
    fontsize(){
      return parseFloat(localStorage.getItem('fontsize')||'100')
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    swiperOption() {
      return Object.assign(this.options, {
        spaceBetween: 0.1 * this.fontsize
      })
    },
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
    swiper,
    swiperSlide,
  },
  async beforeRouteEnter (to, from, next) {
    next()
  },
  methods: {
    async getActInfo(){
      let {code,data}=(await this.axios.post('//ops-api.beeplaying.com/ops/api/open-card/activity-info')).data
      if(code==200){
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
        let {code,data,message}=await gameResetProgress()
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
          this.flag=6
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
    // async gameUpgradeStageClick(){
    //   if(this.userData.nextStageConsumeNum>this.userData.remanentNum){
    //     this.flag=8//不够升级
    //   }else{
    //     if(this.userData.haveDoubleCard){//拥有翻倍卡
    //       this.flag=11
    //     }else{
    //       if(this.level==1){
    //         this.flag=9
    //       }else{
    //         this.flag=10
    //       }
    //     }
    //   }
    // },
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
        // this.level=data.stage
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
    },
    async prevClick(){
      await GLOBALS.marchSetsPoint('A_LOADINGH50112000779',{net:'net',entrance:this.platSource,plat_version:1})//H5平台-中间页-左箭头点击
      if(this.level==1){
        this.level=4
      }else{
        this.level=this.level-1
      }
    },
    async nextClick(){
      await GLOBALS.marchSetsPoint('A_LOADINGH50112000778',{net:'net',entrance:this.platSource,plat_version:1})//H5平台-中间页-右箭头点击
      if(this.level==4){
        this.level=1
      }else{
        this.level=this.level+1
      }
    }
  },
  async mounted () {
    location.href.includes('from=')&&GLOBALS.marchSetsPoint('P_H5PT0156',{
      source_address:GLOBALS.getUrlParam('from')||''
    })//H5平台-翻牌活动-页面加载完成
    await this.getActInfo()
    //活动信息
    await this.getUserInfo()
    //获取翻牌数据
    await this.getBetProgress()
    //活动地址：shufflinggame.html?from=index
    history.pushState({}, '', location.href.split(/\?|\&/)[0])//shufflinggame.html
    // GLOBALS.marchSetsPoint('A_H5PT0075001453')   // H5平台-砸金蛋-活动进行中-页面
    document.querySelectorAll('.swiper-wrapper')[0]&&(document.querySelectorAll('.swiper-wrapper')[0].style["align-items"]='center')
  },
  watch: {
    'countdown.time': function (val) {
      if (!val) {
        this.getActInfo()
      }
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../../common/css/base.css";
@import "./css/index.less";
  .container{
    width: 100%;
    height: 6.46rem;
    position: absolute;
    top:2.24rem;
    .container_top{
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 5.93rem;
      height: 1.94rem;
      background: url("../images/rich_simple.png");
      background-size: 100% 100%;
      padding-bottom: .32rem;
      box-sizing: border-box;
      z-index: 10;
      display: flex;
      .container_top_all{
        width: .66rem;
        height: 1.64rem;
      }
      .container_top_content{
        width: 5.27rem;
        height: 1.64rem;
        display: flex;
        justify-content: space-between;
        padding: .1rem;
        box-sizing: border-box;
        .container_top_item{
          width: 1.19rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item:nth-child(1){
            display: flex;
            flex-direction: column;
            .pic{
              height:.79rem ;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius:.1rem .1rem 0 0;
              background:rgba(233,81,180,1);
              &.level2{
                background:rgba(86,89,222,1);
              }
              &.level3{
                background:rgba(175,185,214,1);
              }
              &.level4{
                background:rgba(225,176,35,1);
              }
              img{
                width: .78rem;
              }
            }
            .txt{
              height:.36rem;
              background: rgba(255,255,255,1);
              border-radius:0 0 .1rem .1rem;
              line-height:.36rem;
              text-align: center;
              font-size:.2rem;
              font-weight:bold;
              color:rgba(51,13,157,1);
            }
          }
          .item:nth-child(2){
            font-size:.18rem;
            font-weight:400;
            color:rgba(255,255,255,1);
            text-align: center;
          }
        }
      }
    }
    .container_bottom{
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 5.47rem;
      .swiper-container {
        position: absolute  !important;
        top: 0 !important;
        bottom: 0 !important;
        margin: auto  !important;
      }

      .swiper-container {
        overflow: hidden !important;
        list-style: none !important;
        padding: 0 !important;
        z-index: 1 !important;
        height: 5.47rem !important;
        width: 100% !important;
      }

      .swiper-slide {
        text-align: center !important;
        font-size: .38rem !important;
        font-weight: 700 !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        flex-shrink: 0 !important;
        width: 4.67rem  !important;
        height: 100% !important;
        position: relative !important;
        transition-property: transform !important;
      }

      .swiper-slide img {
        height: 100% !important;
        width: 100% !important;
      }

      .swiper-slide-next, .swiper-slide-prev {
        width: 4.67*0.5rem  !important;
        height: 5.47*0.5rem !important;
        opacity: 0.55  !important;
        top: .6rem !important;
      }
      .swiper-button-prev, .swiper-button-next {
        position: absolute !important;
        top: 50% !important;
        width: 1.08rem  !important;
        height: 1.08rem  !important;
        margin-top: -.5rem  !important;
        z-index: 10 !important;
        cursor: pointer !important;
        background-size: .92rem .99rem  !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        outline: none  !important;
      }

      .swiper-button-prev {
        background-image: url("../images/arrow_leaf.png")  !important;
        left: .6rem !important;
      }

      .swiper-button-next {
        background-image: url("../images/arrow_right.png")  !important;
        right: .6rem !important;
        position: relative;
      }

      /*.enter-index {*/
        /*position: absolute !important;*/
        /*right: .21rem !important;*/
        /*bottom: .4rem !important;*/
        /*width: 2.1rem !important;*/
        /*height: .46rem !important;*/
        /*background: url("./images/img/enter-index.png") no-repeat !important;*/
        /*background-size: 100% 100% !important;*/
      /*}*/

      .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: -.2rem  !important;
      }
    }
  }
  .bottombtn{
    position: absolute;
    top:9.06rem;
    width: 100%;
    .item:nth-child(1){
      display: flex;
      justify-content: center;
      .btn_item{
        width: 3.07rem;
        height: .97rem;
        text-align: center;
        padding-top: .1rem;
        padding-bottom: .3rem;
        box-sizing: border-box;
        justify-content: space-around;
        &:nth-child(1){
          background: url("../images/open_one.png");
          background-size: 100% 100%;
          margin-right: .34rem;
        }
        &:nth-child(2){
          background: url("../images/open_ten.png");
          background-size: 100% 100%;
        }
        font-size:.18rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        display: flex;
        flex-direction: column;
        i{
          font-size:.3rem;
          font-weight:bold;
        }
      }
    }
    .item:nth-child(2){
      margin-top: .18rem;
      font-size:.24rem;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: center;
    }
  }
</style>
