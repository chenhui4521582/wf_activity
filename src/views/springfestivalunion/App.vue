<template>
  <main id="app" class="springfestivalunion" :class="{aoke:curChannel==100006&&isHasIframe}">
    <header class="header">
      <div class="back">返回</div>
      <div class="header_container">
        <div class="timelines" :class="{fixed:isShowTopIcon}">
          <div class="timelines_item" v-for="(item,index) in timelines" :class="{selected:index==0}">
            <div class="timelines_item_time">{{item.time}}</div>
            <div class="timelines_item_title">{{item.title}}</div>
          </div>
        </div>
        <div class="timelines" :class="{static:isShowTopIcon}" v-if="isShowTopIcon">
          <div class="timelines_item" v-for="(item,index) in timelines" :class="{selected:index==0}">
            <div class="timelines_item_time">{{item.time}}</div>
            <div class="timelines_item_title">{{item.title}}</div>
          </div>
        </div>
        <div class="timelines_act_list">
          <div class="timelines__act_item" v-for="item in 3">
            <img src="./images/game_icon.png" alt="">
            <div class="timelines__act_state" :class="{green:true,purple:false,gray:false}">
              1.18开始
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="games">
      <div class="games_title"></div>
      <div class="games_list">
        <div class="games_item" v-for="item in 9">
          <img src="./images/game_icon.png" alt="">
        </div>
      </div>
    </div>
    <div class="back_top" v-if="isShowTopIcon" @click="getAnchor('app')" id="backTop"></div>
  </main>
</template>
<script>
  import '../../common/js/window.js';
  import common from "../../common/js/utils";

  export default {
    data() {
      return {
        userInfo: null,
        curChannel: null,
        curToken: null,
        isFoldRule: false,//折叠规则默认折叠
        isShowTopIcon: false,//是否显示回到顶部图标
        isshowHand: true,//是否显示小手
        noticeList: [],//广播
        isshowBonusList: false,//是否显示红包榜弹窗
        isshowBonusRecoed: false,//是否显示红包记录弹窗
        isshowBonusSuccess: false,//是否显示加赠红包获得弹窗
        isshowBonusFailure: false,//是否显示加赠红包点击去完成弹窗
        isshowBonusOpened: false,//是否显示开启红包弹窗
        bonusListData: null,//红包榜数据
        bonusRecordData: null,//红包记录数据
        bonusOpenedData: null,//红包开启数据
        detailData: null,//myDetail接口数据
        countdown: {//红包榜外显倒计时，最后一天显示
          time: ''
        },
        packageData: [],//福袋开福礼包数据
        jiazengbonusNumber: 0,//加赠红包点击领取获得红包个数
        hbItems: null,
        batchRedDotData: null,
        timer1: null,
        timer2: null,
        userID: 0,
        isMove: false,
        lamp: [],
        ylbScroll: null,
        timelines: [{
          time: '1.9-1.23',
          title: '惊喜年末',
          list: [{}, {}, {}]
        }, {
          time: '1.24-1.3',
          title: '新春狂欢',
          list: [{}, {}, {}]
        }, {
          time: '2.1-2.11',
          title: '喜乐元宵',
          list: [{}, {}, {}]
        }]
      }
    },
    computed: {
      backUrl() {
        return (this.getUrlParam('from') || '').toLowerCase();
      },
      countdownText() {//倒计时文案 红包榜外显倒计时，最后一天显示
        if (this.countdown.time) {
          let hourText = this.countdown.time.split(':')[0]
          let days = Math.floor(hourText / 24)
          if (days == 0) {
            return this.countdown.time
          } else {
            return ''
          }
        } else {
          return ''
        }
      },
      envelopsItem() {
        if (!this.hbItems) {
          return []
        }

        // 获取最大值
        let maxItem = this.hbItems && this.hbItems.length && this.hbItems.sort((a, b) => {
          return a.taskOps - b.taskOps
        })[this.hbItems.length - 1]

        // 删除数组最后一位
        const data = this.hbItems.slice()
        data.pop()

        let nArr = data.filter((item) => {
          return item.taskStatus != 2
        }).sort((a, b) => {
          return a.taskOps - b.taskOps
        })
        let tArr = data.filter((item) => {
          return item.taskStatus == 2
        }).sort((a, b) => {
          return a.taskOps - b.taskOps
        })
        let result = []
        if (nArr.length > 4) {
          result = nArr.splice(0, 4)
          // result.push(nArr.pop())
          // 个数大于5个的时候加个dot
          result.splice(4, 0, {dot: true})
          result.push(maxItem)
          return result
        } else if (nArr.length == 4) {
          result = nArr.splice(0, 4)
          result.push(maxItem)
          return result
        } else {
          result = [...this.getList(nArr, tArr), maxItem]
          return result
        }

      },
      jiazengyuan() {//领下级红包还需消费多少元
        let minUnfinished = this.hbItems.filter((item) => {
          return item.taskStatus == 1
        }).sort((a, b) => {
          return a.taskOps - b.taskOps
        })[0]
        return minUnfinished.taskOps - minUnfinished.finishNum
      },
      wpercent() {
        if (!this.hbItems || this.hbItems.length == 0) {
          return
        }
        if (this.hbItems && this.envelopsItem) {
          if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].taskStatus != 1) {
            return '100%'
          } else {
            let minUnfinished = this.hbItems.filter((item) => {
              return item.taskStatus == 1
            }).sort((a, b) => {
              return a.taskOps - b.taskOps
            })[0]
            let idArr = [...this.envelopsItem.map(c => c.taskId)].indexOf(minUnfinished.taskId)
            if (this.envelopsItem.length == 6) {
              if (idArr == -1) {//在省略号里
                console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
                return parseFloat(5 * 100 / 6).toFixed(2) + '%'
              } else {
                if (idArr == 0) {
                  return parseFloat((idArr + minUnfinished.finishNum / (minUnfinished.taskOps)) * 100 / 12) + '%'
                } else {
                  return parseFloat((1 / 12 + (idArr - 1) / 6 + minUnfinished.finishNum / (minUnfinished.taskOps) / 6) * 100) + '%'
                }
              }
            } else {
              if (idArr == 0) {
                return parseFloat((idArr + minUnfinished.finishNum / (minUnfinished.taskOps)) * 100 / 12) + '%'
              } else {
                return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + minUnfinished.finishNum / (minUnfinished.taskOps) * 5 / 24) * 100) + '%'
              }
            }
          }
        } else {
          return 0
        }

      },
      showTask() {
        if (this.detailData) {
          return this.countdown.time && this.countdown.time != '00:00:00'
        } else {
          return true
        }

      },
      isHasIframe() {
        return window != window.top
      },
      fontsize () {
        return parseFloat(localStorage.getItem('fontsize') || '100')
      },
    },
    components: {},
    methods: {
      // 跑马灯滚动
      scroll() {
        this.isMove = true
        setTimeout(() => {
          this.lamp.push(this.lamp[0]);
          this.lamp.shift();
          this.isMove = false;
        }, 1000)

      },
      bounceRemove() {
        clearInterval(this.timer2)
        this.timer2 = setTimeout(() => {
          this.$refs.bounce.className = "bonusrecord"
        }, 1000)
      },
      //获取地址栏问号后面的参数值
      getUrlParam: function (ename) {
        // var url = document.referrer;
        var url = window.location.href;
        var Request = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.split('?')[1];
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
          }
        } else {
          return '';
        }
        return Request[ename];
      },
      getAnchor(name) {
        if (window == window.top) {
          document.body.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76)
        } else {
          document.getElementById('app').scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          this.isShowTopIcon = document.getElementById('app').scrollTop > 0
        }
      },
      ruleClick() {
        this.isFoldRule = !this.isFoldRule
        this.$nextTick(() => {
          this.getAnchor('section5')
        })
      },//点击规则按钮 展开折叠
      back(page) {
        if (this.backUrl) {
          if (!page) {
            this.burryPoint('1207003003', '春节红包-回到平台')
            switch (this.backUrl) {
              case 'wap':
                window.location.href = 'https://wap.beeplaying.com/wap/home?channel=' + this.curChannel;
                break;
              case 'jswap':
                window.location.href = 'https://wap.beeplaying.com/bdWap?channel=' + this.curChannel;
                break;
              case 'bdwap':
                window.location.href = 'https://wap.beeplaying.com/bdWap?channel=' + this.curChannel;
                break;
            }
          } else {
            this.burryPoint('1207003030', '春节红包-玩游戏得红包(每日任务)')
            switch (this.backUrl) {
              case 'wap':
                window.location.href = 'https://wap.beeplaying.com/wap/home?channel=' + this.curChannel + '#/' + page;
                break;
              case 'jswap':
                window.location.href = 'https://wap.beeplaying.com/bdWap?channel=' + this.curChannel + '#/' + page;
                break;
              case 'bdwap':
                window.location.href = 'https://wap.beeplaying.com/bdWap?channel=' + this.curChannel + '#/' + page;
                break;
            }
          }
        }
      },//回到首页、平台任务页面逻辑
      gainbonus() {
        this.burryPoint('1207003002', '春节红包-获取更多红包')
        this.isshowHand = false;
        this.$nextTick(() => {
          this.getAnchor('section2')
        })
      },//页面“获取更多红包”按钮
      getComputedStyle(ele, attr) {
        return window.getComputedStyle(ele, null)[attr]
      },
      getNoticeList() {
        let self = this
        this.$nextTick(() => {
          var iMax = this.noticeList && this.noticeList.length;
          if (this.$refs.hornUl && this.$refs.hornUl.children) {
            var oLiHeight =
              this.$refs.hornUl.children.length &&
              this.$refs.hornUl.children[0].offsetHeight;
            var oUlWidth = this.$refs.hornUl.offsetWidth;
            var oDiv = this.$refs.hornDiv;
            var oLiWidth =
              this.$refs.hornUl.children.length &&
              this.$refs.hornUl.children[0].offsetWidth;
            var speed = oLiHeight;
            var that = this;
            var oUl = that.$refs.hornUl;
            var remarked = [];
            oUl.innerHTML = oUl.innerHTML + oUl.innerHTML;
            // oUl.style.height = oUl.children.length * oLiHeight + "px";
            clearInterval(this.timer);
            remark();
            this.timer = setInterval(sliders, 3500);
            var timer1 = setTimeout(() => {
              horizontalSlider();
            }, 1000);
          }

          function sliders() {
            clearTimeout(timer1);
            if (-oUl.offsetTop >= oLiHeight * (iMax - 1)) {
              oUl.style.webkitTransition = "all 0s";
              // oUl.style.top = oLiHeight+'px';
              oUl.style.top = speed + "px";
            }
            oUl.style.top = oUl.offsetTop - speed + "px";
            oUl.style.webkitTransition = "all .5s";
            setTimeout(() => {
              horizontalSlider();
            }, 500);
          }

          function horizontalSlider() {
            var fontSize = document.children[0].style.fontSize;
            for (let i = 0; i < remarked.length; i++) {
              remarked[i].li.style.marginLeft = "";
              if (remarked[i].top == -oUl.offsetTop) {
                remarked[i].li.style.marginLeft = `${remarked[i].left /
                fontSize.substring(0, fontSize.length - 2)}rem`;
                break;
              }
            }
          }

          function remark() {
            if (oUl.children) {
              for (let i = 0; i < oUl.children.length; i++) {
                if (
                  oUl.children[i].offsetWidth > oDiv.offsetWidth &&
                  oUl.children[i].offsetWidth - oDiv.offsetWidth > 10
                ) {
                  /* oUl.children[i].style.position='absolute';
                                        oUl.children[i].style.left=`-${oUl.children[i].offsetWidth-oDiv.offsetTop}px`; */
                  remarked.push({
                    li: oUl.children[i],
                    left: oDiv.offsetWidth - oUl.children[i].offsetWidth,
                    top: oUl.children[i].offsetTop + 1
                  });
                }
              }
            }
          }
        });
      },//走马灯
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//platform-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//shop-api.beeplaying.com' + url
        }
        return this.axios.post(url, params, {})
      },//请求封装方法
      async bonusListClick(val) {
        if (val) {
          this.burryPoint('1207003022', '春节红包-下级奖励和当前排名')
        } else {
          this.burryPoint('1207003023', '春节红包-红包榜')
        }
        try {
          const res = await this.fetch('/ops/api/springFestival/redEnvelope/ranking', {
            page: 1,
            pageSize: 500
          })
          if (res.data.code == 200 && res.data.data) {
            this.isshowBonusList = true
            this.bonusListData = res.data.data
          }
        } catch (e) {

        }
      },//点击红包榜
      async bonusRecordClick() {
        this.burryPoint('1207003020', '春节红包-红包记录')
        try {
          const res = await this.fetch('/ops/api/springFestival/redEnvelope/receiveLog', {
            page: 1,
            pageSize: 100
          })
          if (res.data.code == 200 && res.data.data) {
            this.isshowBonusRecoed = true
            this.bonusRecordData = res.data.data
          }
        } catch (e) {

        }
      },//点击红包记录
      async myDetails() {
        try {
          const res = await this.fetch('/ops/api/springFestival/redEnvelope/myDetails')
          if (res.data.code == 200 && res.data.data) {
            // availableAmount (integer, optional): 待开启红包数量 ,
            // countDown (integer, optional): 红包榜倒计时：离结算时间毫秒数 ,
            // currentAwardName (string, optional): 当前奖励 ,
            // horseRaceLampList (Array[string], optional): 跑马灯列表 ,
            // nextAwardName (string, optional): 下级奖励 ,
            // ranking (string, optional): 我的排名 ,
            // settlementTime (string, optional): 榜单结算时间 ,
            // totalAmount (integer, optional): 我的红包数量
            // res.data.data.availableAmount=100 测试代码
            this.detailData = res.data.data;
            this.lamp = [{
              name: '下级奖励',
              desc: this.detailData && this.detailData.nextAwardName,
            }, {
              name: '红包榜排名',
              desc: this.detailData && this.detailData.ranking
            }]


            !this.countdown.time && this.detailData.countDown && GLOBALS.remainingTime(
              this,
              this.detailData.countDown,
              this.countdown
            );
            this.noticeList = res.data.data.horseRaceLampList || []
            //获取广播
            this.getNoticeList()
          }
        } catch (e) {

        }
      },//获取myDetails数据
      async openBonus() {//点击开启红包
        // //测试代码
        // this.bonusOpenedData ={awardList:[{
        //         "awardAmount": 100,
        //         "awardName": "京东卡"
        //     },{
        //         "awardAmount": 101,
        //         "awardName": "金叶子"
        //     },{
        //         "awardAmount": 101,
        //         "awardName": "话费"
        //     }]};
        // this.bonusOpenedData.num=this.detailData&&this.detailData.availableAmount||0
        // this.isshowBonusOpened = true
        if (this.detailData && this.detailData.availableAmount) {
          this.burryPoint('1207003025', '春节红包-开红包')
          try {
            const res = await this.fetch('/ops/api/springFestival/redEnvelope/open')
            if (res.data.code == 200 && res.data.data) {
              this.bonusOpenedData = res.data.data;
              this.bonusOpenedData.num = this.detailData && this.detailData.availableAmount || 0
              this.isshowBonusOpened = true
              this.myDetails();
            }
          } catch (e) {

          }
        } else {
          this.$nextTick(() => {
            this.getAnchor('section2')
          })
        }
      },
      async getPackage() {//获取福袋礼包数据
        try {
          const res = await this.axios.get('//shop-api.beeplaying.com/shop/api/activity/spring')
          if (res.data.code == 200 && res.data.data) {
            this.packageData = res.data.data
          }
        } catch (e) {

        }
      },
      gotopay(val) {
        if (val.price == 188) {
          this.burryPoint(1207003051, '春节红包-开福袋领红包-立即购买188')
        }
        if (val.price == 1888) {
          this.burryPoint(1207003052, '春节红包-开福袋领红包-立即购买1888')
        }
        localStorage.setItem('JDD_PARAM', JSON.stringify(val))
        if (window.linkUrl.getBackUrlFlag(this.curChannel) == 'bdWap') {//好看、全民小视频
          top.location.href = 'https://wap.beeplaying.com/payment/#/bdPayment';
        } else {
          top.location.href = 'https://wap.beeplaying.com/payment/#/payment';
        }
      },//福袋礼包购买
      burryPoint(id, name, params) {
        GLOBALS.buriedPoint(id, name, null, null, params || {})
      },//埋点方法封装
      share() {
        this.burryPoint('1207003060', '春节红包-邀好友得红包-去分享')
        window.location.href = 'https://wap.beeplaying.com/activities/packetSharing.html'
      },//去分享
      // 获取红包任务列表
      getEnvelopesList() {
        this.axios.post('//platform-api.beeplaying.com/task/api/usertask/platCommonTaskByBatch', {
          value: "SpringFestival-recharge"
        }).then((res) => {
          if (res.data.code == 200) {
            this.hbItems = res.data.data
            // this.hbItems = this.hbTestData

          }
        })
      },
      getList(newArr, completeArr, maxItem) {
        if (newArr.length < 4) {
          var len = 4 - newArr.length;
          return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
            return a.taskOps - b.taskOps
          })
        }
      },
      async getjiazbonus(item) {//点击加赠红包领取
        let res = await this.axios.post('//platform-api.beeplaying.com/task/api/usertask/finish', {taskId: item.taskId})
        if (res.data.code == 200) {
          this.burryPoint('1207003041', '春节红包-加赠红包-红包获得弹窗')
          this.jiazengbonusNumber = item.awardsNum
          this.isshowBonusSuccess = true;
          //刷新
          //加赠红包接口
          //详情数据
          this.getEnvelopesList()
          this.myDetails()
        }
      },
      gotocomplete() {//点击加赠红包去完成
        this.burryPoint('1207003044', '春节红包-加赠红包-去完成')
        // this.isshowBonusFailure = true
        top.location.href = 'https://wap.beeplaying.com/payment/#/mall'
      },
      async getBatchRedDot() {
        let res = await this.fetch('//platform-api.beeplaying.com/task/api/usertask/batchTaskStatus', {
          value: 'dayTask'
        })
        if (res.data.code == 200) {
          this.batchRedDotData = res.data.data;
        }
      },
      gotoplay(index) {
        if (index == 1) {
          this.burryPoint('1207003080', '春节红包-更多游戏-去玩游戏捕鱼')
          common.jumpToGame({url: '/fish'})
        } else if (index == 2) {
          this.burryPoint('1207003081', '春节红包-更多游戏-去玩游戏桌球')
          common.jumpToGame({url: '/billiards'})
        } else {
          this.burryPoint('1207003082', '春节红包-更多游戏-去玩游戏糖果')
          common.jumpToGame({url: '/crush'})
        }
      },
      async getaccountInfo() {
        let res = await this.fetch('//trans-api.beeplaying.com/trans/api/trans/accountInfo')
        if (res.data.code == 200) {
          this.userID = res.data.data && res.data.data.userId || 0
          this.getAnchor('section1')
        }
      }
    },
    mounted() {
      if (window == window.top) {
        window.onscroll = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) > 4.2*this.fontsize
        }
      } else {
        window.ontouchmove = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = document.getElementById('app').scrollTop > 4.2*this.fontsize
        }
      }
    },
  }

</script>
<style lang="less" scoped>
  @import '../../common/css/base.css';

  .springfestivalunion {
    background: url("./images/layer.png");
    min-height: 100vh;
    position: relative;
    .header {
      background: url(./images/bg.png) no-repeat;
      background-size: cover;
      height: 13.5rem;
      position: relative;
      .back {
        position: absolute;
        top: .16rem;
        width: .52rem;
        height: .38rem;
        line-height: .38rem;
        text-align: center;
        font-size: .22rem;
        font-weight: bold;
        color: rgba(250, 183, 148, 1);
        background: rgba(47, 7, 38, 1);
        border: 2px solid rgba(250, 183, 148, 1);
        border-radius: 0 .18rem .18rem 0;
      }
      .header_container {
        position: absolute;
        top: 4.2rem;
        left: 0;
        right: 0;
        margin: auto;
        .timelines {
          display: flex;
          justify-content: center;
          .timelines_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 1.82rem;
            height: .91rem;
            background: url("./images/unselected.png");
            background-size: 100% 100%;
            font-weight: bold;
            color: rgba(252, 185, 157, 1);
            font-size: .24rem;
            margin-right: .24rem;
            .timelines_item_title {
              margin-top: .09rem;
              font-size: .3rem;
            }
            &:nth-child(3) {
              margin-right: 0;
            }
            &.selected {
              background: url("./images/selected.png");
              background-size: 100% 100%;
              color: rgba(165, 12, 34, 1);
            }
          }
          &.fixed {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            margin: auto;
            background: #d71031;
            z-index: 1;
          }
          &.static {
            opacity: 0;
          }
        }
      }
      .timelines_act_list {
        padding: .21rem 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        .timelines__act_item {
          width: 5.88rem;
          height: 2.2rem;
          margin-top: .2rem;
          border: .03rem solid rgba(245, 179, 131, 1);
          border-radius: .2rem;
          position: relative;
          img {
            position: absolute;
            width: 5.88rem;
            height: 2.2rem;
          }
          .timelines__act_state {
            width: 1.7rem;
            height: .43rem;
            border-radius: 0 .16rem 0 .16rem;
            position: absolute;
            right: 0;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            text-align: center;
            line-height: .43rem;
            &.green {
              background: rgba(0, 176, 149, 1);
            }
            &.purple {
              background: rgba(187, 24, 89, 1);
            }
            &.gray {
              background: rgba(123, 99, 108, 1);
            }
          }
          &:nth-child(1) {
            margin-top: 0;
          }
        }
      }
    }
    .games {
      position: relative;
      padding-bottom: .63rem;
      .games_title {
        width: 4.7rem;
        height: .8rem;
        background: url("./images/recommend_game_nav.png");
        background-size: 100% 100%;
        margin: auto;
      }
      .games_list {
        display: flex;
        flex-wrap: wrap;
        margin: 0 auto;
        padding: .23rem .3rem 0;
        .games_item {
          img {
            width: 2.2rem;
            height: 2.63rem;
          }
        }
      }
    }
    .back_top {
      position: fixed;
      right: .05rem;
      bottom: 5.56rem;
      width: .77rem;
      height: .77rem;
      background: url("./images/backtop.png");
      background-size: 100% 100%;
    }
  }
</style>
