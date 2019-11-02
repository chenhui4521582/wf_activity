<template>
  <div class="eggs-container">
    <!--返回-->
    <img src="../images/back.png" class="e-back" @click.stop="back">
    <template v-if="actInfoData&&actInfoData.state==1">
      <!--规则-->
      <rule :ruleMain="actInfoData.timeline"></rule>
      <!--记录-->
      <record></record>
      <richrecord ref="richrecord" :list="actInfoData.awardsPoolList"></richrecord>
      <img src="../images/title.png" alt="" class="header-title">
      <h4 class="e-time">活动时间：{{actInfoData.timeline}}</h4>
      <div class="container">
        <div class="container_top">
          <div class="container_top_all" @click="prizeAll"></div>
          <div class="container_top_content">
            <div class="container_top_item" v-for="(item,index) in currentItemRiches">
              <div class="item">
                <div class="pic" :class="{level2:level==2,level3:level==3,level4:level==4}">
                  <img :src="`${require(`../images/demoimg/${item.awardsType}.png`)}`" alt="">
                </div>
                <div class="txt">{{item.awardsName}}</div>
              </div>
              <div class="item">剩余{{item.totalNum-item.useNum}}张</div>
            </div>
          </div>
        </div>
        <div class="container_bottom">
          <swiper :options="swiperOption" class="swiper-no-swiping" ref="mySwiper" v-if="actInfoData.awardsPoolList.length">
            <swiper-slide v-for="(item,index) in actInfoData.awardsPoolList" :key="index">
              <img :src="`${require(`../images/rich_pic${index+1}.png`)}`" alt="">
            </swiper-slide>
          </swiper>
          <div class="swiper-button-prev" slot="button-prev" @click="prevClick"></div>
          <div class="swiper-button-next" slot="button-next" @click="nextClick"></div>
        </div>
      </div>
      <div class="bottombtn">
        <div class="item" @click.stop.prevent="gotoprize(0)">
          <div class="btn_item">
            <i>随机开启1次</i>(消耗2张福袋券）
          </div>
          <div class="btn_item" @click.stop.prevent="gotoprize(1)">
            <i>随机开启10次</i>(消耗20张福袋券）
          </div>
        </div>
        <div class="item">当前剩余福袋券：{{actInfoData.remanentNum}}张</div>
      </div>
      <!--获得更多-->
      <drop-down ref="dropDown" :data="actInfoData" @getUserInfo="getActInfo"></drop-down>
    </template>
    <comPop :flag="flag" :have-gif="haveGif" :ticketNum="ticketNum" ref="comPop" :list="prizeData" @close="flag=0" @package="openDropDown"></comPop>
  </div>
</template>
<script type="text/javascript">
import 'vue-awesome-swiper/node_modules/swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { betSingle,userIncrement} from '../utils/api'
export default {
  name: 'index',
  data () {
    return {
      level:1,
      flag:0,//1.福袋券不足 2.购买成功 3.十连抽 4.单抽
      isEnd:false,
      countdown: {// 倒计时
        time: ''
      },
      options: {
        // autoplay:true,
        slidesPerView: 'auto',
        spaceBetween: 0,
        loop: true,
        loopFillGroupWithBlank: false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        centeredSlides: true
      },
      timer:null,
      actInfoData:null,
      ticketNum:0,
      prizeData:[],
      haveGif:false
    }
  },
  computed:{
    currentItemRiches(){
      if(this.actInfoData){
        let item=this.actInfoData.awardsPoolList.filter(item=>item.level==this.level)[0]
        return (item&&item.itemList||[]).slice(0,4)
      }
      return []
    },
    fontsize(){
      return parseFloat(localStorage.getItem('fontsize')||'100')
    },
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    swiperOption() {
      return Object.assign(this.options, {
        spaceBetween: 0 * this.fontsize
      })
    },
  },
  components: {
    rule: () => import('../components/rule'),
    dropDown: () => import('./dropDown'),
    record: () => import('../components/record'),
    richrecord: () => import('../components/richrecord'),
    comPop:() => import('../components/comPop'),
    swiper,
    swiperSlide,
  },
  methods: {
    async getActInfo(){
      let {code,data}=(await this.axios.post('//ops-api.beeplaying.com/ops/api/lucky-bag/activity-info')).data
      if(code==200){
        this.isEnd=data.state!=1
        !this.countdown.time && data.countdown && GLOBALS.remainingTime(
          this,
          data.countdown,
          this.countdown
        )
        this.actInfoData=data
      }
    },
    //点击返回
    back () {
      // location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      history.back(-1)
    },
    async prevClick(){
      if(!this.timer){
        this.timer = window.setTimeout(()=>{
          this.level=parseInt(document.querySelectorAll('.swiper-slide.swiper-slide-active')[0].getAttribute('data-swiper-slide-index'))+1
          window.clearTimeout(this.timer)
          this.timer=null
        },300)
      }
    },
    async nextClick(){
      if(!this.timer){
        this.timer = window.setTimeout(()=>{
          this.level=parseInt(document.querySelectorAll('.swiper-slide.swiper-slide-active')[0].getAttribute('data-swiper-slide-index'))+1
          window.clearTimeout(this.timer)
          this.timer=null
        },300)
      }
    },
    async gotoprize(flag){
      GLOBALS.marchSetsPoint(flag?'A_H5PT0209002204':'A_H5PT0209002203')//H5平台-双十一超值福袋活动-随机开启1次点击 H5平台-双十一超值福袋活动-随机开启10次点击
      if((flag&&this.actInfoData.remanentNum<20)||(!flag&&this.actInfoData.remanentNum<2)){
        GLOBALS.marchSetsPoint('A_H5PT0209002215')//H5平台-双十一超值福袋活动-福袋券不足-引导购买页面加载完成
        this.flag=1
        this.$refs.comPop.showPop()
      }else{
        this.haveGif = true
        try{
          let {data,code,message}=await betSingle({value:flag?10:1})
          if(code==200){
            this.prizeData=data
            if(flag){//多抽
              this.flag=3
            }else{//单抽
              this.flag=4
            }
            GLOBALS.marchSetsPoint('A_H5PT0209002212')//H5平台-双十一超值福袋活动-福袋抽取页面加载完成
            setTimeout(()=>{
              this.haveGif = false
              this.$refs.comPop.showPop()
              this.getActInfo()
            },1600)
          }else{
            this.haveGif = false
            this.$toast.show({
              message: message,
              duration: 1500
            })
          }
        }catch (e) {
          this.haveGif = false
        }
      }
    },
    async getuserIncrement(){
      let {data,code}=await userIncrement()
      if(code==200&&data){
        this.ticketNum=data
        this.flag=2
      }
    },
    prizeAll(){
      GLOBALS.marchSetsPoint('A_H5PT0209002205')//全览按钮点击
      this.$refs.richrecord.showPop()
    },
    openDropDown(){
      this.$refs.dropDown.outHandleTab(0)
    }
  },
  async mounted () {
    location.href.includes('from=')&&GLOBALS.marchSetsPoint('P_H5PT0209',{
      source_address:GLOBALS.getUrlParam('from')||''
    })//页面加载完成
    await this.getActInfo()
    //活动信息
    await this.getuserIncrement()
    //活动地址：double11.html?from=index
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
              background:rgba(86,89,222,1);
              &.level2{
                background:rgba(175,185,214,1);
              }
              &.level3{
                background:rgba(225,176,35,1);
              }
              &.level4{
                background:rgba(233,81,180,1);
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
        /*width: 50%  !important;*/
        height: 50% !important;
        opacity: 0.55  !important;
        top: .6rem !important;
        &.swiper-slide-next{
          justify-content: flex-start !important;
        }
        &.swiper-slide-prev {
          justify-content: flex-end !important;
        }
        img{
          width: 50% !important;
        }
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
    top:9rem;
    width: 100%;
    padding-bottom: .5rem;
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
      margin-top: .1rem;
      font-size:.24rem;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: center;
    }
  }
</style>
