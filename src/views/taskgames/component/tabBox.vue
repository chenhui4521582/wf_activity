<template>
  <div class="sdk-tab-box">
    <ul class="tabs">
      <li class="tab_item" :class="{'actived':isActived === item.name}" v-for="(item,index) in tabList" :key="index" @click="changeTab(item)"><img :src="require('../images/'+item.name+(isActived === item.name?'_actived':'')+'.png')" alt="">{{item.label}}</li>
      <div class="red" v-if="unreadQuantity">{{unreadQuantity}}</div>
    </ul>
    <img :src="showegg.icon|filter" alt="" class="egg" @click="kickegg" v-if="showegg&&showegg.show">
    <template v-if="isActived === 'tasks'">
      <!-- <h4 class="crush-master-task" v-if="currentGameType">成就任务</h4> -->
      <slot>
      </slot>
    </template>
    <template v-else>
      <ul class="activities" v-if="activitiesList.length>0">
        <li class="activity-item" v-for="(item,index) in activitiesList" :key="index" @click="openPop(item,index)">
          <div class="img-container" v-html="item.description"></div>
          <div class="red" v-if="!item.hasRead"></div>
        </li>
      </ul>
      <div class="noting" v-else>
        <img src="../images/noting.png" alt="">
        <span>活动敬请期待</span>
      </div>
    </template>
    <div class="mask" v-if="confirm"></div>
    <transition name="fade">
      <div class="confirm" v-if="confirm">
        <div class="title">
          温馨提示
          <div class="closed" @click="hideConfirm"></div>
        </div>
        <div class="content">
          即将离开当前游戏<br>
          是否前往参与活动?
        </div>
        <div class="btn">
          <div class="cancel-btn" @click="hideConfirm(1)">
            取消
          </div>
          <div class="confirm-btn" @click="jump">
            确定
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  props: {
    currentGameType: {
      default: 0
    },
    id:{
      default: 0
    }
  },
  data () {
    return {
      isActived: 'tasks',
      // isActived: 'activities',
      tabList: [{ label: '任务', name: 'tasks', eventId: 'A_H5PT0061001229' }, { label: '活动', name: 'activities', eventId: 'A_H5PT0061001230' }],
      activitiesList: [],
      unreadQuantity: 0,
      confirm: false,
      selectedActivity: {},
      showegg:null,//是否显示砸金蛋
    }
  },
  methods: {
    //切换tab
    changeTab (item) {
      this.isActived = item.name
      GLOBALS.marchSetsPoint(item.eventId, { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB点击
      if (item.name === 'activities') {
        this.getDetail()
      }
    },
    getDetail () {
      let url = 'https://ops-api.beeplay123.com/ops/api/sdk/operation/details'
      this.axios.post(url).then(response => {
        let res = response.data && response.data.data
        if (res) {
          this.activitiesList = res.activities || []
          this.unreadQuantity = res.unreadQuantity || 0
        }
      })
    },
    openPop (item, index) {
      let url = 'https://ops-api.beeplay123.com/ops/api/sdk/operation/read'
      let self = this
      this.axios.post(url).then(response => {
        let res = response.data
        if (res.code === 200) {
          GLOBALS.marchSetsPoint('A_H5PT0061001231', {
            project_id: self.currentGameType,
            position_id: index + 1,
            task_id: item.id,
            task_name: item.name
          }) // H5平台-游戏内SDK-活动TAB-广告点击
          self.selectedActivity = item
          self.confirm = true
        }
      })
    },
    hideConfirm (val) {
      if (val) {
        GLOBALS.marchSetsPoint('A_H5PT0061001233', { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB-广告点击-离开弹窗取消
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0061001234', { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB-广告点击-离开弹窗关闭
      }
      this.getDetail()
      this.selectedActivity = {}
      this.confirm = false
    },
    jump () {
      GLOBALS.marchSetsPoint('A_H5PT0061001232', { project_id: this.currentGameType }) // H5平台-游戏内SDK-活动TAB-广告点击-离开弹窗确定
      this.confirm = false
      let linkUrl = this.selectedActivity.linkUrl
      this.switchUrl(linkUrl)
    },
    async switchUrl (url) {
      let self = this
      if (url.startsWith('/') || url.includes('external=1')) {
        GLOBALS.jumpOutsideGame(url, true)
        return
      }
      switch (url) {
        case 'show_task':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/taskview')
          break// 打开任务
        case 'feedback':
          break// 打开充值回馈
        case 'open_payTurntable':
              parent&&parent.closeTaksPage()
              let url5 = `https://wap.beeplay123.com/payment/#/payTurntable?channel=${localStorage.getItem('APP_CHANNEL')}&token=${localStorage.getItem('ACCESS_TOKEN')}`
              parent && parent.GameEval('openweb',url5)
          break
        case 'recharge':
          if (localStorage.getItem('ACCESS_TOKEN')) {
            parent.location.href = GLOBALS.shopUrl
          }
          break// 打开充值
        case 'profit_list':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, false, '#/profitlist/0?from=index')
          break// 打开排行榜
        case 'luck_draw':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/luckdraw')
          break// 打开套圈
        case 'exchange':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/luckdraw')
          break// 打开限时兑换
        case 'spring_benefit':
          break // 打开新春特惠
        case 'daygift_info':
          break
        case 'open_sign':
          break

        case 'league_matches':
          break// 五大联赛接口
        case 'treasureCeremony':
          break
        case 'platform':
          parent.location.href = 'https://wap.beeplay123.com/activities/platform.html?from=bdWap'
          break
        case 'halloween':
          // 万圣节活动
          // self.AFiveLink('halloween')
          break
        case 'thanksgiving':
          // 感恩节活动
          // self.AFiveLink('thanksgiving')
          break
        case 'open_member':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/member')
          break// 新页面
        case 'js_integration': // 积分抽奖活动
          // this.$router.push({
          //   // name:'integrationActivity'
          //   name: 'newIntegrationActivity'
          // })
          break
        case 'open_gift_eaf':
          // self.ifShowgiftLeaf = true
          break
        case 'open_week_card_guide':
          // this.noBuyWeekCard = true
          // this.showWeekCard = true
          break
        case 'ipxs':
          // this.startXs()
          break
        case 'double11':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/double11')
          // self.$router.push('/double11')
          break // 跳到双十一礼包
        // 打开大神榜单
        case 'dashenList':
          parent.location.href = 'https://wap.beeplay123.com/activities/dashenlist.html'
          break
        // 打开抽奖
        case 'openluckdraw':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/luckdraw')
          break
        // 打开我的
        case 'openmine':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/personal')
          break
        // 打开抽奖转盘
        case 'openLottery':
          // this.showLottery()
          break
        // 打开新人签到
        case 'openNewSign':
          // await this.getNewuserawardReceive()
          // setTimeout(() => {
          //   this.SET_RAW_SIGN_FLAG(true)
          // }, 500)
          break
        // 打开一元破冰
        case 'openOneLottery':
          // this.openBeginnerLottery()
          break
        // 打开春节红包
        case 'festivalPackage':
          parent.location.href = `https://wap.beeplay123.com/activities/springfestival.html?from=bdWap&source=hb-lunbo`
          break
        // 打开我的奖品
        case 'schedule':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/schedule')
          // this.$router.replace('/schedule')
          break
        // 打开帮助反馈
        case 'problem':
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/problem')
          break
        // 打开在线反馈
        case 'feedback_personal':
          // history.pushState({}, '', location.href.split(/\?|\&/)[0])
          parent.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, false, '#/problem?tab=feedback_personal')
          break
        // 成就任务中心
        case 'taskListHome':
          parent.location.href = '//wap.beeplay123.com/activities/taskListHome.html?from=bdWap'
          break
        // 打开话费券中心
        case 'huafeiquan':
          parent.location.href = '//wap.beeplay123.com/activities/billshop.html?from=bdWap'
          break
        case 'moneyTreeShowRank':
          parent.location.href = 'https://wap.beeplay123.com/moneyTree?time=' + (new Date().getTime())
          break
        case 'moneyTreePage':
          parent.location.href = 'https://wap.beeplay123.com/moneyTree?time=' + (new Date().getTime())
          break
        case 'openGiantLeaf':
          parent.location.href = 'https://wap.beeplay123.com/activities/giantLeaf.html?channel=' + localStorage.getItem('APP_CHANNEL') + '&time=' + (new Date().getTime())
          break
          case 'openGameTreasureGift': //打开夺宝礼包
              parent&&parent.closeTaksPage()
              let url1 = `https://wap.beeplay123.com/payment/#/treasure/gift?channel=${localStorage.getItem('APP_CHANNEL')}&token=${localStorage.getItem('ACCESS_TOKEN')}`
              parent && parent.GameEval('openweb',url1)
              break
          case 'openGameHalloween': //打开超值礼包
              parent&&parent.closeTaksPage()
              let url2 = `https://wap.beeplay123.com/payment/#/halloween?channel=${localStorage.getItem('APP_CHANNEL')}&token=${localStorage.getItem('ACCESS_TOKEN')}`
              parent && parent.GameEval('openweb',url2)
              break
          case 'openGameMiniFeedBack': //打开葫芦娃
              parent&&parent.closeTaksPage()
              let url3 = `https://wap.beeplay123.com/payment/#/miniFeedBack?channel=${localStorage.getItem('APP_CHANNEL')}&token=${localStorage.getItem('ACCESS_TOKEN')}`
              parent && parent.GameEval('openweb',url3)
              break
          case 'openGamePopGame': //打开盈利榜
              parent&&parent.closeTaksPage()
              let url4 = `https://wap.beeplay123.com/jsWap/#/popGame?channel=${localStorage.getItem('APP_CHANNEL')}&token=${localStorage.getItem('ACCESS_TOKEN')}`
              parent && parent.GameEval('openweb',url4)
              break              
              
        default:
          url.includes('//') && (parent.location.href = url)
          break
      }
    },
    kickegg(){
      GLOBALS.marchSetsPoint('A_H5PT0061001502',{
        from_project_id:this.currentGameType,
        task_name: this.showegg.url
      })
      this.$emit('kickegg',this.showegg.url)
    }
  },
  computed: {
  },
  created () {
    this.getDetail()
    this.axios.post('//ops-api.beeplay123.com/ops/api/activity/sdk-state',{
      "value": this.currentGameType
    }).then(res=>{
      this.showegg=res.data.code==200&&res.data.data||null
      if(this.showegg&&this.showegg.show){
        GLOBALS.marchSetsPoint('A_H5PT0061001501',{
          from_project_id:this.currentGameType
        })
        if(this.showegg.popup){
          this.$emit('kickegg',this.showegg.url)
        }
      }
    })
  }
}
</script>

<style scoped lang="less">
.sdk-tab-box {
  padding: 0.3rem 0.3rem 0;
  .egg{
    width: 1.04rem;
    height: 1.08rem;
    position: fixed;
    right: 0;
    top: .8rem;
    z-index: 11;
  }
  .tabs {
    position: relative;
    margin: 0 0.68rem;
    height: 0.6rem;
    line-height: 0.6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.02rem solid #1e2e4c;
    border-radius: 0.08rem;
    overflow: hidden;
    margin-bottom: 0.3rem;
    color: #8b8b8c;
    .tab_item {
      flex: 1;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        height: 0.23rem;
        // vertical-align: middle;
        margin-right: 0.06rem;
      }
      &.actived {
        background-color: #141f33;
        color: #efc35c;
      }
    }
    .red {
      position: absolute;
      top: 0.1rem;
      right: 0.3rem;
      background-image: url(../images/top-red-bg.png);
      background-position: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      font-size: 0.16rem;
      font-weight: bold;
      color: #fff;
      width: 0.26rem;
      height: 0.18rem;
      line-height: 0.18rem;
      text-align: center;
    }
  }
  .activities {
    .activity-item {
      position: relative;
      margin: 0 auto 0.24rem;
      // height: 1.48rem;
      // width: 4.5rem;
      .img-container {
        width: inherit;
        height: inherit;
        background-color: #1b2538;
        overflow: hidden;
        border-radius: 0.1rem;
      }
      .red {
        position: absolute;
        right: -0.08rem;
        top: -0.08rem;
        width: 0.18rem;
        height: 0.18rem;
        background-color: #f92a0f;
        border-radius: 50%;
        z-index: 1;
      }
    }
  }
  .noting {
    text-align: center;
    margin-top: 1.5rem;
    img {
      width: 2.76rem;
      height: 1.96rem;
    }
    span {
      margin-top: 0.18rem;
      display: flex;
      color: #2f435b;
      font-size: 0.2rem;
      font-weight: 500;
      align-items: center;
      justify-content: center;
      &::before {
        content: "";
        display: block;
        width: 0.38rem;
        height: 0.02rem;
        background-color: #2a3d53;
      }
      &::after {
        content: "";
        display: block;
        width: 0.38rem;
        height: 0.02rem;
        background-color: #2a3d53;
      }
    }
  }
  .crush-master-task {
    margin: 0.3rem 0 0;
    font-size: 0.28rem;
  }
  .mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .confirm {
    padding-bottom: 0.4rem;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 3.5rem;
    z-index: 10;
    background: #0f1726;
    .title {
      position: relative;
      padding: 0.28rem;
      font-size: 0.22rem;
      text-align: center;
      background: #141f33;
      .closed {
        position: absolute;
        top: 0;
        right: 0;
        width: 0.2rem;
        height: 0.2rem;
        padding: 0.28rem;
        background: url("../images/closed.png") no-repeat center center / 0.2rem
          0.2rem;
      }
    }
    .content {
      padding: 0.44rem 0;
      font-size: 0.2rem;
      text-align: center;
      line-height: 0.3rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      font-size: 0.18rem;
      .confirm-btn,
      .cancel-btn {
        margin: 0 0.2rem;
        width: 1.5rem;
        height: 0.5rem;
        line-height: 0.5rem;
        text-align: center;
        border-radius: 0.04rem;
      }
      .confirm-btn {
        background: #ef6f0c;
      }
      .cancel-btn {
        background: #2b3a55;
      }
    }
  }
}
.fade-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}

@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
