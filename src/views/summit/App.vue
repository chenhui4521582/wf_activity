<template lang="html">
  <div id="app">
    <div class="bg-img img-config" id="bg-img">
      <div class='header img-config'>
        <div class="time img-config">
          <!-- <div class='clock img-config'></div> -->
          <img src='./images/clock.png' class="clock">
          <span class="end-time-font">距冲顶截止还有：</span>
          <span class="end-time-h end-time img-config">{{time.hour}}</span>
          <span class="end-time-m end-time img-config">{{time.minute}}</span>
          <span class="end-time-s end-time img-config">{{time.second}}</span>
        </div>
      </div>
      <div class='count img-config'>
        <div class="box img-config">
          <div class="box-use img-config">
            <span>宝箱</span>
          </div>
        </div>
        <!-- <div class="present">
          <div v-if="!showEnd">
            <div class="icon">得</div>
            <span>{{present}}万金叶子</span>
          </div>
        </div> -->
        <div class='btn'>
          <div class="buy img-config" v-for="item in box" :key="item.amount" @click="getpayWays(item)">
            <p class="price">￥{{item.price}}</p>
            <p class="num">（购买{{item.amount/1000000}}个宝箱）</p>
          </div>
        </div>
        <div class='sum' v-on:click="gocharts">
          查看冲顶榜单>>
        </div>
        <div class="active-end img-config" v-if="showEnd">
          <div class="end-icon img-config"></div>
          <div class="end-look-charts" v-on:click="gocharts">查看榜单>></div>
        </div>
      </div>
      <charts v-if="charts" @closeCharts="closeCharts"></charts>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import charts from './components/charts';
  export default {
    data() {
      return {
        time: {
          hour: '',
          minute: '',
          second: ""
        },
        charts: false,
        present: 0,
        box: [],
        showEnd: false,
      }
    },
    mounted() {
      document.getElementById("bg-img").setAttribute('style', 'height:' + screen.height + 'px')
      this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
      this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
      this.start();
    },
    computed: {},
    components: {
      charts
    },
    methods: {
      async start() {
        try {
          let [{data: activityInfo}, {data: summitMeeting}] = await Promise.all([
            this.axios.get('//ops-api.beeplaying.com/ops/api/summit/activityInfo'),
            this.axios.get('//shop-api.beeplaying.com/shop/api/mall/summitMeeting')
          ]);
          if (activityInfo.code != 200 || summitMeeting.code != 200) {
            this.showEnd = true;
            this.time.second = '00';
            this.time.minute = '00';
            this.time.hour = '00';
            return;
          }
          this.box = summitMeeting.data.summitPacksList;
          let time = activityInfo.data.surplusTime;
          this.present = activityInfo.data.activityAmount
          let timeSet = setInterval(() => {
            this.formatSeconds(time);
            if (time == 0) clearInterval(timeSet);
            time--;
          }, 1000)
        } catch (e) {
          console.log(e);
        }
      },
      gocharts() {
        this.charts = true;
      },
      closeCharts() {
        this.charts = false;
      },
      formatSeconds(value) {
        //计时器
        let secondTime = parseInt(value);// 秒
        let minuteTime = 0;// 分
        let hourTime = 0;// 小时
        if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
          //获取分钟，除以60取整数，得到整数分钟
          minuteTime = parseInt(secondTime / 60);
          //获取秒数，秒数取佘，得到整数秒数
          secondTime = parseInt(secondTime % 60);
          //如果分钟大于60，将分钟转换成小时
          if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
          }
        }
        this.time.second = secondTime.toString().padStart(2, 0);
        this.time.minute = minuteTime.toString().padStart(2, 0);
        this.time.hour = hourTime.toString().padStart(2, 0);
      },
      getpayWays(params) {
        if (params.buyFlag == 0 || this.isClicked) {
          return
        }
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(params))
        if (window.linkUrl.getBackUrlFlag(this.curChannel) == 'bdWap' && this.curChannel != '100001') { // 好看、全民小视频
          top.location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
        } else {
          top.location.href = 'https://wap.beeplaying.com/payment/#/payment'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/css/base.css";
  #app {
    min-width: 3.2rem;
    width: 100%;
    margin: 0 auto;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  .bg-img{
    height: 100%;
    width: 100%;
    margin: 0;
    position: relative;
    background-image: url('./images/allbg.jpg');
    .header{
      background-image: url('./images/bgheader.png');
      height: 4.35rem;
      width: 100%;
      position: relative;
      padding-top: 3.45rem;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      z-index: 1;
      .time{
        background-image: url('./images/bgtime.png');
        height: 0.52rem;
        width: 4.39rem;
        margin: auto;
        position: inherit;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        padding: 0 0.3rem;
        .clock{
          height: 0.35rem;
          width: 0.35rem;
        }
        .end-time-font{
          display: inline-block;
          margin: 0.02rem 0 0 0.15rem;
          font-weight: 600;
          color: #FFE4A9;
        }
        .end-time{
          height: 0.26rem;
          width: 0.26rem;
          line-height: 0.28rem;
          text-align: center;
          background-image: url('./images/time.png');
          margin-left: 0.1rem;
          padding: 0.03rem;
          color: #269820;
        }
      }
    }
    .count{
      background-image: url('./images/bgcount.png');
      height: 7.4rem;
      width: 100%;
      margin-top: -0.1rem;
      position: relative;
      .box{
        background-image: url('./images/box.png');
        width: 5.5rem;
        height: 3.66rem;
        margin: auto;
        position: relative;
        .box-use{
          position: absolute;
          left: 50%;
          top: 0.2rem;
          margin-left: -0.3rem;
          background-image: url('./images/box-use.png');
          width: 0.92rem;
          height: 0.5rem;
          line-height: 0.43rem;
          text-align: center;
          color: white;
        }
      }
      .present{
        height: 0.7rem;
        width: 100%;
        text-align: center;
        line-height: 0.7rem;
        font-size: 0.5rem;
        font-weight: 600;
        margin-top: 0.08rem;
        .icon{
          font-size: 0.46rem;
          border-radius: 10rem;
          background-color: #57C90E;
          width: 0.7rem;
          display: inline-block;
          color: #fff;
        }
        span{
          color: #F8E2A6;
          display: inline-block;
        }
      }
      .btn{
        height: 1.14rem;
        padding: 0 0.55rem;
        display: flex;
        margin-top: 0.3rem;
        .buy{
          flex: 1;
          background-image: url('./images/btn.png');
          height: inherit;
          margin: 0 0.05rem;
          position: relative;
          text-align: center;
          p{
            width: 100%;
            position: absolute;
            font-weight: 600;
            color: #346C0D;
          }
          .price{
            font-size: 0.64rem;
            top:0.08rem;
          }
          .num{
            top:0.7rem;
          }
        }
      }
      .sum{
        text-align: center;
        margin-top: 0.3rem;
        font-size: 0.28rem;
        color: #FFE3D0;
      }
    }
    .active-end{
      width:90%;
      height:7.08rem;
      background: rgba(0,0,0,0.5);
      bottom:0.5rem;
      position: absolute;
      left: 50%;
      margin-left: -45%;
      z-index: 2;
      .end-icon{
        background-image: url('./images/active-end.png');
        height: 2.12rem;
        width: 2.12rem;
        margin: 1.46rem auto;
      }
      .end-look-charts{
        width:2.54rem;
        height:0.69rem;
        line-height: 0.69rem;
        border:rgba(255,255,255,1) 0.03rem solid;
        border-radius: 0.5rem;
        text-align: center;
        margin: auto;
        font-size: 0.3rem;
        color: #fff;
        font-weight: 600;
      }
    }
  }

  .img-config{
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
