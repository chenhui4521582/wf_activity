<template>
  <div id="app">
    <section class="after" id="after">
      <div class="container">
        <img src="./images/back.png" class="e-back" @click.stop="back">
        <div class="rule-icon" @click="showrule">规则</div>
        
        <div class="text">
          <div class="item">每日任务大升级</div>
          <div class="item">海量话费任性送</div>
        </div>
        <div class="tabs" :class="{tab1:tabIndex==0,tab2:tabIndex==1}" v-if="myInfo&&myInfo.openFlag">
          <div class="item" :class="{selected:tabIndex==0}" @click="settabIndex(0)">单日奖励</div>
          <div class="item" :class="{selected:tabIndex==1}" @click="settabIndex(1)">7日奖励</div>
        </div>
      </div>
      <div class="container1" v-if="myInfo&&myInfo.openFlag">
        <div class="total-num" v-if="tabIndex==1">累计勋章个数:{{myInfo.totalMedals}}个</div>
        <div class="total-num" v-else>今日获得勋章个数:{{myInfo.todayMedals}}个</div>
        <div class="container1_container">
          <div class="title"><i></i>用勋章换奖励</div>
          <template v-if="tabIndex==0">
            <div class="awards">
              <div class="item" v-for="(item,index) in myInfo.dayAwards" :class="{surplus:(myInfo.dayAwards.length%3==1&&myInfo.dayAwards.length-index==1)||(myInfo.dayAwards.length%3==2&&myInfo.dayAwards.length-index<=2),tabIndex:!tabIndex}">
                <!--<img src="./images/singleday/20元@2x.png" alt="">-->
                <img :src="item.awardsImg|filter" alt="">
                <div class="btn" v-if="item.status!=2"  @click="gain(item)">{{item.cost}}勋章领取</div>
                <div class="btn btn-gray" v-else>今日已领取</div>
              </div>
            </div>
            <div class="title"><i></i>获取更多勋章</div>
            <div class="game_tasks" id="moretask">
              <div class="item" v-for="(item,index) in taskInfo">
                <!--<img src="./images/sevendays/去玩斗地主@2x.png" alt="">-->
                <div class="icon" :class="{star:item.star}">
                  <img :src="item.icon|filter" alt="">
                </div>
                <div class="detail">
                  <div class="detail_item">{{item.taskName}}</div>
                  <div class="detail_item">每次完成可以得{{item.awardsNum}}个勋章
                    <div class="progress">
                      <div class="progress_bar" :style="{width:(item.finishedTimes/item.totalTimes)*100+'%'}"></div>
                    </div>
                    <div>{{item.finishedTimes+'/'+item.totalTimes}}</div>
                  </div>
                </div>
                <img src="./images/sevendays/complete.png" alt="" class="btn" v-if="item.finishedTimes<item.totalTimes" @click="gotocomplete(item)">
                <div class="btn btn-gray" style="" v-else>已完成</div>
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
        </div>
      </div>
      <!-- 公共弹框 -->
      <common-pop 
        :is-show-pop="isShowPop" 
        :fail="fail"  
        :surplus='surplus' 
        :awardData="awardData" 
        @close-pop="isShowPop=false" 
        @gototask="gototask"
      />
      <!-- 规则 -->
      <rule 
        v-if="myInfo&&myInfo.openFlag"
        ref="rule" 
        :ruleMain="myInfo.activityStartTime+'~'+myInfo.activityEndTime"
      />
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
        let {data,code}=(await this.fetch('/task/api/activity/week/task/info')).data
        if(code==200){
          this.myInfo=data
          if(this.myInfo.openFlag){
            GLOBALS.marchSetsPoint('P_H5PT0199')
            GLOBALS.marchSetsPoint('A_H5PT0199002017')
            flag&&this.getTaskInfo()
          }
        }
      },
      async getTaskInfo(){
        let {data,code}=(await this.fetch('/task/api/activity/week/task/list')).data
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
      this.getActInfo(true)
    }
  }
</script>

<style rel="stylesheet/less" lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    height: 100%;
  }

  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    background-color: #1F2A4D;
  }

  .after .rule {
    z-index: 4 !important;
  }

  .after .rule img {
    top: 1.3rem;
    left: 0.1rem;
  }

  .after {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
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
      height: 4.4rem;
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
        bottom: -.2rem;
        width: 7.16rem;
        height: 1.18rem;
        text-align: center;
        display: flex;
        .item{
          flex: 1;
          color: #fff;
          line-height:1.18rem;
          &.selected{
            color:rgba(255,114,37,1);
          }
        }
        font-size:.28rem;
        font-weight:bold;
        &.tab1{
          background: url("images/singleday/tabs.png");
          background-size: 100% 100%;

        }
        &.tab2{
          background: url("images/sevendays/tabs.png");
          background-size: 100% 100%;
        }
      }
    }
    .container1{
      position: absolute;
      top: 4.6rem;
      width: 100%;
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
        position: relative;
        top:.27rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 5.5rem;
        height: 1.1rem;
        background:rgba(255,236,202,1);
        border-radius:.55rem;
        font-size:.28rem;
        font-weight:bold;
        color:rgba(159,78,16,1);
        padding-left: 1.9rem;
        box-sizing: border-box;
        text-align: center;
        line-height: 1.1rem;
        &:before{
          content: '';
          position: absolute;
          top:-.225rem;
          left: .23rem;
          width: 1.7rem;
          height: 1.55rem;
          background: url("./images/xunzhang.png");
          background-size: 100% 100%;
        }
      }
      .container1_container{
        position: relative;
        top: .51rem;
        padding: 0 .2rem;
        margin-bottom: 1.25rem;
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
        .game_tasks{
          padding: .1rem .2rem;
          box-sizing: border-box;
          background:rgba(249,247,246,1);
          border-radius:.12rem;
          font-size: .2rem;
          color:#8E8892;
          font-weight:bold;
          .item{
            height: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0,0,0,0.1);
            &:last-child{
              border: none;
            }
            .detail{
              height: .62rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              width: 4.2rem;
              .detail_item:nth-child(1){
                font-size: .28rem;
                color:rgba(21,0,43,1);
              }
              .detail_item:nth-child(2){
                display: flex;
                justify-content: space-between;
              }
            }
            img{
              width: .8rem;
              height: .8rem;
              &.btn{
                width: 1.1rem;
                height: .44rem;
              }
            }
            .icon{
              width: .8rem;
              height: .8rem;
              position: relative;
              &.star:before{
                content: '';
                position: absolute;
                right: 0;
                width: .49rem;
                height: .48rem;
                background: url("./images/recommend.png");
                background-size: 100% 100%;
              }
            }
            .progress{
              width:1.4rem;
              height:.14rem;
              background:rgba(255,255,255,1);
              border-radius:.07rem;
              position: relative;
              .progress_bar{
                position: absolute;
                height:.14rem;
                width: 50%;
                border-radius:.07rem;
                background: #81DE14;
              }
            }
            .btn-gray{
              width:1.1rem;
              height:.44rem;
              line-height:.44rem;
              text-align: center;
              background:#B3B3B3;
              border-radius:.22rem;
              font-size:.24rem;
              font-weight: normal;
              color:rgba(255,255,255,1);
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
