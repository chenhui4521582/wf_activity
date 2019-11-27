<template>
  <div id="app">
    <section class="after" id="after">
      <div class="container">
        <img src="./images/back.png" class="e-back" @click.stop="back">
        <rule ref="rule" :ruleMain="myInfo.activityStartTime+'~'+myInfo.activityEndTime" v-if="myInfo&&myInfo.openFlag"></rule>
        <!--v-if="myInfo&&myInfo.openFlag"-->
        <div class="tabs" :class="{tab1:tabIndex==0,tab2:tabIndex==1}">
          <div class="item" :class="{selected:tabIndex==0}" @click="settabIndex(0)">限购礼包</div>
          <div class="item" :class="{selected:tabIndex==1}" @click="settabIndex(1)">幸运币兑换</div>
        </div>
      </div>
      <div class="container1">
        <span class="total-num">我的幸运币：100</span>
        <div class="container1_container">
          <template v-if="tabIndex==0">
            <div class="packgaes">
              <div class="item" v-for="(item,index) in taskInfo">
                <template v-if="index<3">
                  <div class="sec1">
                    <div class="item" v-for="(item1,index1) in item.awardsList.sort((a,b)=>(b.awardsType-a.awardsType))">
                      <img src="./images/fudai.png" alt="" v-if="item1.awardsType==28">
                      <img src="./images/package_leaf.png" alt="" v-if="item1.awardsType==1">
                      <span v-if="item1.awardsType==28">幸运币福袋</span>
                      <span v-if="item1.awardsType==1">{{item1.awardsNum}}</span>
                    </div>
                    <div class="tip">{{item.name}}</div>
                  </div>
                  <div class="sec2">
                    <div class="item">
                      <img :src="item.icon|filter" alt="">
                      <span>{{item.amount}}</span>
                    </div>
                    <div class="btn">{{item.price}}元抢购</div>
                  </div>
                </template>
                <template v-else>
                  <div class="btn-all">{{item.price}}元全部抢购</div>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="awards">
              <div class="item" v-for="(item,index) in myInfo.weekAwards" :class="{surplus:(myInfo.weekAwards.length%3==1&&myInfo.weekAwards.length-index==1)||(myInfo.weekAwards.length%3==2&&myInfo.weekAwards.length-index<=2),tabIndex:!tabIndex}">
                <!--<img src="./images/singleday/20元@2x.png" alt="">-->
                <img :src="item.awardsImg|filter" alt="">
                <div class="btn" v-if="item.status!=2" @click="gain(item)">{{item.cost}}勋章领取</div>
                <div class="btn btn-gray" v-else>今日已领取</div>
              </div>
            </div>
          </template>
          <p style="display: flex;align-items: center;justify-content: center;font-size: .2rem;color:rgba(233,226,255,1);padding-bottom: .25rem;">*每种礼包每天限购1次，每天0点刷新购买次数 <img src="./images/rule.png" alt="" @click="showrule" style="width: .3rem;height: .3rem;margin-left: .14rem"></p>
        </div>
      </div>
      <!--myInfo&&myInfo.openFlag-->
      <common-pop :is-show-pop="isShowPop" :fail="fail"  :surplus='surplus' :awardData="awardData" @close-pop="isShowPop=false" @gototask="gototask"></common-pop>
    </section>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';

  export default {
    name: 'App',
    data() {
      return {
        tabIndex:0,
        isShowPop: false,
        awardsList: [],
        myInfo: {},
        taskInfo:[],
        fail:false,//兑换失败
        surplus:0,//勋章换取奖励的差额
        awardData:null
      }
    },
    components: {
      rule: () => import('./components/rule'),
      commonPop: () => import('./components/commonPop')
    },
    methods:{
      showrule(){
        GLOBALS.marchSetsPoint('A_H5PT0199002025')
        this.$refs.rule.showPop()
      },
      back(){
        if(parent&&parent.closeWebView){
          parent.closeWebView()
        }else{
          history.go(-1)
        }
      },
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')||url.startsWith('/task/api')) {
          url = '//platform-api.beeplaying.com' + url
        }
        if (url.startsWith('/shop/api')) {
          url = '//shop-api.beeplaying.com' + url
        }
        return this.axios.post(url, params, {})
      },//请求封装方法
      async getActInfo(flag){
        // let {data,code}=(await this.fetch('/task/api/activity/week/task/info')).data
        // if(code==200){
        //   this.myInfo=data
        //   if(this.myInfo.openFlag){
        //     GLOBALS.marchSetsPoint('P_H5PT0199')
        //     GLOBALS.marchSetsPoint('A_H5PT0199002017')
        //     flag&&this.getTaskInfo()
        //   }
        // }
        this.getTaskInfo()
      },
      async getTaskInfo(){
        let {data,code}=(await this.fetch('/shop/api/mall/dayLimitWelfare')).data
        if(code==200){
          this.taskInfo=data
        }
      },
      gotocomplete(item){
        GLOBALS.marchSetsPoint('A_H5PT0199002024',{
          task_id:item.gameType,
          task_name:item.taskName
        })
        if(parent&&parent.closeWebView){
          // parent.closeWebView()
          GLOBALS.jumpOutsideGame(item.url,true)
        }else{
          GLOBALS.jumpOutsideGame(item.url)
        }
      },
      async gain(item){
        GLOBALS.marchSetsPoint('A_H5PT0199002019',{
          task_id:item.id,
          task_name:`${item.cost}勋章领取${item.awardsName}`
        })
        this.awardData=item;
        if(item.status==1){
          this.fail=false;
          this.surplus=0;
          let {code}=(await this.fetch('/task/api/activity/week/exchange',{
            value:item.id,source:this.tabIndex
          })).data
          if(code==200){
            this.isShowPop=true
            GLOBALS.marchSetsPoint('A_H5PT0199002020',{
              task_id:item.id,
              task_name:`${item.cost}勋章领取${item.awardsName}`
            })
            this.getActInfo(false)
          }
        }else{
          this.fail=true
          this.surplus=Math.abs((this.tabIndex==0?this.myInfo.todayMedals:this.myInfo.totalMedals)-item.cost)
          this.isShowPop=true
          GLOBALS.marchSetsPoint('A_H5PT0199002022',{
            task_id:item.id,
            task_name:`${item.cost}勋章领取${item.awardsName}`
          })
        }
      },
      settabIndex(flag){
        this.tabIndex=flag;
        GLOBALS.marchSetsPoint(flag?'A_H5PT0199002018':'A_H5PT0199002017')
      },
      gototask(){
        this.tabIndex=0;
        setTimeout(()=>{
          this.getAnchor('moretask')
        })
      },
      getAnchor(name) {
        // if(window==window.top){
        //   document.body.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
        //   !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76)
        // }else{
          document.getElementById('after').scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
        // }
      },
    },
    created(){
      localStorage.setItem('APP_CHANNEL','100039')
      localStorage.setItem('ACCESS_TOKEN','5f497fc55cc243df9d32d735ad00fb9d')
      this.getActInfo(true)
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*color: #fff;*/
    /*height: 100%;*/
  /*}*/
  .after .rule {
    z-index: 4 !important;
  }

  .after .rule img {
    top: 1.3rem;
    left: 0.1rem;
  }

  .after {
    width: 100vw;
    height: 11.36rem;
    position: relative;
    background: #fff;
    padding: 0.26rem 0;
    box-sizing: border-box;
    font-size:.28rem;
    color:rgba(21,0,43,1);
    .container{
      position: absolute;
      top:0;
      width: 100%;
      height: 11.36rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      .text{
        position: absolute;
        top:.75rem;
        bottom: 1.52rem;
        left: .48rem;
        display: flex;
        flex-direction: column;
        font-size:.3rem;
        color:#fff;
        .item{
          &:nth-child(1){
            font-size:.44rem;
            margin-bottom: .2rem;
          }
        }
      }
      .tabs{
        position: absolute;
        top: 2.74rem;
        left: .6rem;
        text-align: center;
        display: flex;
        margin: auto;
        .item{
          flex: 1;
          line-height:.7rem;
          width:3rem;
          height:.7rem;
          background:rgba(223,140,247,1);
          color:rgba(110,30,209,1);
          &.selected{
            color:rgba(255,255,255,1);
            background:rgba(136,54,237,1);
          }
          &:nth-child(1){
            border-radius: .35rem 0 0 .35rem;
          }
          &:nth-child(2){
            border-radius:0 .35rem .35rem 0;
          }
        }
        font-size:.28rem;
        font-weight:bold;
      }
    }
    .container1{
      position: absolute;
      top: 3.6rem;
      width: 100%;
      margin-bottom: .5rem;
      .title{
        display: flex;
        align-items: center;
        font-weight:bold;
        color:rgba(21,0,43,1);
        margin-bottom: .3rem;
        i{
          display: inline-block;
          width: .06rem;
          height: .28rem;
          background: url("./images/i.png");
          background-size: 100% 100%;
          margin-right: .13rem;
        }
      }
      .total-num{
        display: inline-block;
        position: relative;
        top:.27rem;
        left: 50%;
        transform: translateX(-50%);
        padding: 0 .25rem;
        min-width: 1.7rem;
        height: .5rem;
        background:#940C9F;
        border-radius:.25rem;
        font-size:.22rem;
        font-weight:bold;
        color:#fff;
        box-sizing: border-box;
        text-align: center;
        line-height: .55rem;
      }
      .container1_container{
        position: relative;
        top: .51rem;
        padding: 0 .2rem;
        /*margin-bottom: 1.25rem;*/
        .awards{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: .38rem;
          .item{
            min-width:2.2rem;
            height:2.6rem;
            background:rgba(243,242,244,1);
            margin-bottom: .1rem;
            border-radius:.12rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            padding: .42rem 0 .26rem;
            box-sizing: border-box;
            &.tabIndex{
              height: 2.1rem;
              padding: .2rem 0;
            }
            img{
              width: 1.8rem;
              height: 1.24rem;
            }
            .btn{
              width:1.6rem;
              height:.44rem;
              text-align: center;
              line-height: .44rem;;
              background:rgba(255,114,37,1);
              border-radius:.22rem;
              font-size:.24rem;
              font-weight:bold;
              color:rgba(255,255,255,1);
              &.btn-gray{
                background:rgba(179,179,179,1);
              }
            }
            &.surplus{
              width: 3.35rem;
            }
          }
        }
        .packgaes{
         .item{
           position: relative;
           height:1.6rem;
           font-size: .22rem;
           margin-bottom: .25rem;
           .sec1{
             position: absolute;
             width:3.58rem;
             height:1.6rem;
             background:rgba(255,210,139,1);
             border-radius:.1rem;
             display: flex;
             padding: 0 .6rem;
             box-sizing: border-box;
             justify-content: space-around;
             z-index: 1;
             color:#633900;
             .item{
               display: flex;
               flex-direction: column;
               text-align: center;
               justify-content: center;
               img{
                 width: .94rem;
                 height: .94rem;
               }
               span{
                 margin-top: .12rem;

               }
             }
             &:before{
               content: '';
               position: absolute;
               width: .68rem;
               height: .6rem;
               background: url("./images/plus_corner.png");
               background-size: 100% 100%;
               left: 0;
             }
             .tip{
               position: absolute;
               top:-.1rem;
               left: .7rem;
               width: 1.8rem;
               height: .42rem;
               line-height: .32rem;
               background: url("./images/tips.png");
               background-size: 100% 100%;
               font-size:.18rem;
               font-weight:bold;
               color:rgba(142,86,0,1);
               text-align: center;
               padding-bottom: .1rem;
               box-sizing: border-box;
             }
           }
           .sec2{
             position: absolute;
             width: 6.8rem;
             height: 1.38rem;
             background: url("./images/package_bg.png");
             background-size: 100% 100%;
             padding-left: 3.7rem;
             box-sizing: border-box;
             display: flex;
             align-items: center;
             justify-content: space-around;
             top:0;
             bottom: 0;
             margin: auto;
             .item{
               display: flex;
               flex-direction: column;
               justify-content: center;
               text-align: center;
               width: .94rem;
               height: 100%;
               margin: auto 0;
               img{
                 /*width: .94rem;*/
                 height: 1.03rem;
               }
               span{
                 color:rgba(28,11,80,1);
               }
             }
             .btn{
               width:1.5rem;
               height:.6rem;
               line-height: .6rem;
               text-align: center;
               background:linear-gradient(0deg,rgba(249,104,48,1) 0%,rgba(234,62,98,1) 0%,rgba(254,160,117,1) 99%);
               border-radius:.3rem;
               color:rgba(255,255,255,1);
             }
           }
           &:nth-child(4){
             height:.8rem;
             .btn-all{
               width:3rem;
               height:.8rem;
               line-height: .8rem;
               text-align: center;
               background:linear-gradient(0deg,rgba(252,232,74,1) 0%,rgba(254,173,45,1) 99%);
               border-radius:.4rem;
               font-size:.32rem;
               font-weight:bold;
               color:rgba(116,55,3,1);
               margin: auto;
             }
           }
         }
        }
      }
    }
    .e-back {
      width: 0.17rem;
      position: absolute;
      top: 0.26rem;
      left: 0.25rem;
      z-index: 4;
    }
    .rule-icon{
      width: 0.74rem;
      height: 0.4rem;
      line-height: 0.42rem;
      position: absolute;
      right: 0;
      top: .5rem;
      font-size: .24rem;
      font-weight: bold;
      color: #ff7225;
      text-align: center;
      background: #ffffff;
      border-radius: .2rem 0px 0px .2rem;
    }
  }
</style>
